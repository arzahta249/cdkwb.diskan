import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';
import { sendCitizenStatusUpdate } from '@/lib/whatsapp';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [rows]: any = await pool.query(
      'SELECT * FROM pengaduan WHERE id = ? OR nomor_tiket = ?',
      [id, id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Pengaduan tidak ditemukan' }, { status: 404 });
    }

    const item = rows[0];
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
    let bodyData: any = {};
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
      bodyData = await request.json();
      action = bodyData.action;
    }

    // Verify existing ticket
    const [existing]: any = await pool.query(
      'SELECT * FROM pengaduan WHERE id = ? OR nomor_tiket = ?',
      [id, id]
    );

    if (existing.length === 0) {
      return NextResponse.json({ error: 'Pengaduan tidak ditemukan' }, { status: 404 });
    }

    const currentTicket = existing[0];
    const ticketId = currentTicket.id;

    if (action === 'VERIFY_DISPOSIT') {
      const { petugas_bidang, sla_days } = bodyData;
      const days = parseInt(sla_days || '3', 10);
      const slaDate = new Date();
      slaDate.setDate(slaDate.getDate() + days);
      const slaFormatted = slaDate.toISOString().slice(0, 19).replace('T', ' ');

      await pool.query(
        `UPDATE pengaduan SET status = 'DIDISPOSISI', petugas_bidang = ?, sla_deadline = ? WHERE id = ?`,
        [petugas_bidang || 'Bidang Teknis', slaFormatted, ticketId]
      );

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

      await pool.query(
        `UPDATE pengaduan SET status = 'DITOLAK', alasan_penolakan = ? WHERE id = ?`,
        [alasan_penolakan, ticketId]
      );

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
      await pool.query(
        `UPDATE pengaduan SET status = 'DIPROSES' WHERE id = ?`,
        [ticketId]
      );

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

      await pool.query(
        `UPDATE pengaduan SET status = 'SELESAI', hasil_penyelesaian = ?, bukti_penyelesaian = ? WHERE id = ?`,
        [hasil_penyelesaian, proofUrl, ticketId]
      );

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

      await pool.query(
        `UPDATE pengaduan SET rating_kepuasan = ?, feedback_kepuasan = ?, status = 'DITUTUP' WHERE id = ?`,
        [ratingInt, feedback_kepuasan || '', ticketId]
      );

      return NextResponse.json({ success: true, message: 'Rating & feedback kepuasan berhasil disimpan' });
    }

    if (action === 'CLOSE_TICKET') {
      await pool.query(
        `UPDATE pengaduan SET status = 'DITUTUP' WHERE id = ?`,
        [ticketId]
      );

      return NextResponse.json({ success: true, message: 'Tiket berhasil ditutup & diarsipkan' });
    }

    return NextResponse.json({ error: 'Aksi tidak valid' }, { status: 400 });
  } catch (error) {
    console.error('Update status pengaduan error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui status pengaduan' }, { status: 500 });
  }
}

