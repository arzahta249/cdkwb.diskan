import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { convertTimestamps } from '@/lib/firebase-utils';
import fs from 'fs/promises';
import path from 'path';
import { sendCitizenStatusUpdate } from '@/lib/whatsapp';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function findPengaduanDoc(id: string) {
  const docRef = adminDb.collection('pengaduan').doc(id);
  const snap = await docRef.get();
  if (snap.exists) {
    return { ref: docRef, data: { id: snap.id, ...convertTimestamps(snap.data()) } };
  }

  const querySnap = await adminDb.collection('pengaduan').where('nomor_tiket', '==', id).limit(1).get();
  if (!querySnap.empty) {
    const doc = querySnap.docs[0];
    return { ref: doc.ref, data: { id: doc.id, ...convertTimestamps(doc.data()) } };
  }

  return null;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const found = await findPengaduanDoc(id);

    if (!found) {
      return NextResponse.json({ error: 'Pengaduan tidak ditemukan' }, { status: 404 });
    }

    const item = found.data;
    const now = new Date();
    let isOverdue = false;
    if (item.sla_deadline && item.status !== 'SELESAI' && item.status !== 'DITUTUP' && item.status !== 'DITOLAK') {
      const deadline = new Date(item.sla_deadline);
      if (deadline < now) {
        isOverdue = true;
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        ...item,
        is_overdue: isOverdue
      }
    });
  } catch (error) {
    console.error('Fetch detail pengaduan error:', error);
    return NextResponse.json({ error: 'Gagal mengambil detail pengaduan' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contentType = request.headers.get('content-type') || '';

    let action = '';
    const bodyData: any = {};
    let proofFile: File | null = null;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      action = formData.get('action') as string;
      proofFile = formData.get('bukti_penyelesaian') as File | null;
      
      formData.forEach((val, key) => {
        if (key !== 'bukti_penyelesaian') {
          bodyData[key] = val;
        }
      });
    } else {
      const jsonBody = await request.json();
      action = jsonBody.action;
      Object.assign(bodyData, jsonBody);
    }

    // Verify existing ticket
    const found = await findPengaduanDoc(id);

    if (!found) {
      return NextResponse.json({ error: 'Pengaduan tidak ditemukan' }, { status: 404 });
    }

    const { ref: docRef, data: currentTicket } = found;

    if (action === 'VERIFY_DISPOSIT') {
      const { petugas_bidang, sla_days } = bodyData;
      const days = parseInt(sla_days || '3', 10);
      const slaDate = new Date();
      slaDate.setDate(slaDate.getDate() + days);
      const slaFormatted = slaDate.toISOString().slice(0, 19).replace('T', ' ');

      await docRef.update({
        status: 'DIDISPOSISI',
        petugas_bidang: petugas_bidang || 'Bidang Teknis',
        sla_deadline: slaFormatted
      });

      sendCitizenStatusUpdate({
        nomor_tiket: currentTicket.nomor_tiket,
        nama_pelapor: currentTicket.nama_pelapor,
        telepon_pelapor: currentTicket.telepon_pelapor,
        status: 'DIDISPOSISI',
        tindakan: `Pengaduan telah didisposisikan ke ${petugas_bidang || 'Bidang Teknis'}`
      }).catch(err => console.error('Error sending WA update:', err));

      return NextResponse.json({ success: true, message: 'Disposisi berhasil disimpan' });
    }

    if (action === 'REJECT') {
      const { alasan_penolakan } = bodyData;
      if (!alasan_penolakan) {
        return NextResponse.json({ error: 'Alasan penolakan wajib diisi' }, { status: 400 });
      }

      await docRef.update({
        status: 'DITOLAK',
        alasan_penolakan
      });

      sendCitizenStatusUpdate({
        nomor_tiket: currentTicket.nomor_tiket,
        nama_pelapor: currentTicket.nama_pelapor,
        telepon_pelapor: currentTicket.telepon_pelapor,
        status: 'DITOLAK',
        tindakan: `Alasan penolakan: ${alasan_penolakan}`
      }).catch(err => console.error('Error sending WA update:', err));

      return NextResponse.json({ success: true, message: 'Pengaduan telah ditolak' });
    }

    if (action === 'START_PROCESSING') {
      await docRef.update({
        status: 'DIPROSES'
      });

      sendCitizenStatusUpdate({
        nomor_tiket: currentTicket.nomor_tiket,
        nama_pelapor: currentTicket.nama_pelapor,
        telepon_pelapor: currentTicket.telepon_pelapor,
        status: 'PROSES',
        tindakan: 'Petugas sedang menindaklanjuti & memverifikasi laporan di lapangan.'
      }).catch(err => console.error('Error sending WA update:', err));

      return NextResponse.json({ success: true, message: 'Status diubah ke DIPROSES' });
    }

    if (action === 'SUBMIT_RESOLUTION') {
      const hasil_penyelesaian = bodyData.hasil_penyelesaian;
      if (!hasil_penyelesaian) {
        return NextResponse.json({ error: 'Hasil penyelesaian wajib diisi' }, { status: 400 });
      }

      let proofUrl = currentTicket.bukti_penyelesaian || '';

      if (proofFile && proofFile.name && proofFile.size > 0) {
        const bytes = await proofFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(proofFile.name);
        const filename = `bukti-${uniqueSuffix}${ext}`;

        const uploadDir = path.join(process.cwd(), 'public/upload/pengaduan/bukti');
        await fs.mkdir(uploadDir, { recursive: true });
        const filepath = path.join(uploadDir, filename);

        await fs.writeFile(filepath, buffer);
        proofUrl = `/upload/pengaduan/bukti/${filename}`;
      }

      await docRef.update({
        status: 'SELESAI',
        hasil_penyelesaian,
        bukti_penyelesaian: proofUrl
      });

      sendCitizenStatusUpdate({
        nomor_tiket: currentTicket.nomor_tiket,
        nama_pelapor: currentTicket.nama_pelapor,
        telepon_pelapor: currentTicket.telepon_pelapor,
        status: 'SELESAI',
        tindakan: hasil_penyelesaian
      }).catch(err => console.error('Error sending WA update:', err));

      return NextResponse.json({ success: true, message: 'Hasil penyelesaian berhasil disimpan' });
    }

    if (action === 'SUBMIT_RATING') {
      const { rating_kepuasan, feedback_kepuasan } = bodyData;
      const ratingInt = parseInt(rating_kepuasan || '5', 10);

      await docRef.update({
        rating_kepuasan: ratingInt,
        feedback_kepuasan: feedback_kepuasan || '',
        status: 'DITUTUP'
      });

      return NextResponse.json({ success: true, message: 'Rating & feedback kepuasan berhasil disimpan' });
    }

    if (action === 'CLOSE_TICKET') {
      await docRef.update({
        status: 'DITUTUP'
      });

      return NextResponse.json({ success: true, message: 'Tiket berhasil ditutup & diarsipkan' });
    }

    return NextResponse.json({ error: 'Aksi tidak valid' }, { status: 400 });
  } catch (error) {
    console.error('Update status pengaduan error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui status pengaduan' }, { status: 500 });
  }
}

