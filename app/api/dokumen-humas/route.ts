import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { convertTimestamps } from '@/lib/firebase-utils';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const INITIAL_DOCS = [
  { judul: 'Laporan Tahunan CDKWB 2025', deskripsi: 'Ringkasan capaian program, data statistik, dan evaluasi kinerja sepanjang tahun 2025.', file_url: '#', tipe: 'PDF', ukuran: '4.2 MB', warna: '#0ea5e9', urutan: 1 },
  { judul: 'Profil CDKWB Batang-Pekalongan', deskripsi: 'Dokumen profil resmi berisi latar belakang, struktur organisasi, wilayah kerja, dan layanan utama CDKWB.', file_url: '#', tipe: 'PDF', ukuran: '2.1 MB', warna: '#10b981', urutan: 2 },
  { judul: 'Infografis Program Konservasi 2025', deskripsi: 'Visualisasi data program rehabilitasi mangrove, kawasan konservasi, dan pencapaian ekologis.', file_url: '#', tipe: 'PNG', ukuran: '1.8 MB', warna: '#8b5cf6', urutan: 3 },
  { judul: 'Brosur Layanan CDKWB', deskripsi: 'Panduan singkat seluruh layanan yang tersedia: SLO, konsultasi perikanan, pengaduan, dan konservasi.', file_url: '#', tipe: 'PDF', ukuran: '0.9 MB', warna: '#f59e0b', urutan: 4 },
  { judul: 'Maklumat Pelayanan Publik', deskripsi: 'Pernyataan resmi komitmen CDKWB dalam memberikan pelayanan publik yang transparan dan akuntabel.', file_url: '#', tipe: 'PDF', ukuran: '0.4 MB', warna: '#ef4444', urutan: 5 },
  { judul: 'Leaflet Kawasan Konservasi Karang Jeruk', deskripsi: 'Leaflet edukasi tentang Kawasan Konservasi Karang Jeruk — ekosistem, zonasi, dan aturan kunjungan.', file_url: '#', tipe: 'PDF', ukuran: '1.2 MB', warna: '#06b6d4', urutan: 6 }
];

// GET: all documents
export async function GET() {
  try {
    const snap = await adminDb.collection('dokumen_humas').get();
    if (snap.empty) {
      try {
        await Promise.all(
          INITIAL_DOCS.map(doc =>
            adminDb.collection('dokumen_humas').add({ ...doc, created_at: new Date().toISOString() })
          )
        );
        const newSnap = await adminDb.collection('dokumen_humas').get();
        const rows = newSnap.docs.map(doc => ({ id: doc.id, ...convertTimestamps(doc.data()) }));
        rows.sort((a: any, b: any) => (a.urutan || 0) - (b.urutan || 0));
        return NextResponse.json({ success: true, data: rows });
      } catch {
        return NextResponse.json({ success: true, data: INITIAL_DOCS.map((d, i) => ({ id: `doc-${i + 1}`, ...d })) });
      }
    }
    const rows = snap.docs.map(doc => ({ id: doc.id, ...convertTimestamps(doc.data()) }));
    rows.sort((a: any, b: any) => (a.urutan || 0) - (b.urutan || 0));
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Dokumen humas GET error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data dokumen' }, { status: 500 });
  }
}

// POST: create new document
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { judul, deskripsi, file_url, tipe, ukuran, warna, urutan } = body;

    if (!judul || !file_url) {
      return NextResponse.json({ error: 'Judul dan URL file wajib diisi' }, { status: 400 });
    }

    const docData = {
      judul: String(judul).trim(),
      deskripsi: deskripsi || '',
      file_url: String(file_url).trim(),
      tipe: tipe || 'PDF',
      ukuran: ukuran || '',
      warna: warna || '#0ea5e9',
      urutan: typeof urutan === 'number' ? urutan : 0,
      created_at: new Date().toISOString()
    };

    const docRef = await adminDb.collection('dokumen_humas').add(docData);
    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Dokumen humas POST error:', error);
    return NextResponse.json({ error: 'Gagal menyimpan dokumen' }, { status: 500 });
  }
}

// DELETE: delete by ?id=
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID wajib disertakan' }, { status: 400 });

    const docRef = adminDb.collection('dokumen_humas').doc(String(id));
    const snap = await docRef.get();
    if (!snap.exists) {
      return NextResponse.json({ error: 'Dokumen tidak ditemukan' }, { status: 404 });
    }
    await docRef.delete();
    return NextResponse.json({ success: true, message: 'Dokumen berhasil dihapus' });
  } catch (error) {
    console.error('Dokumen humas DELETE error:', error);
    return NextResponse.json({ error: 'Gagal menghapus dokumen' }, { status: 500 });
  }
}

// PUT: update document by id in body
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...rest } = body;

    if (!id || !rest.judul || !rest.file_url) {
      return NextResponse.json({ error: 'ID, Judul, dan URL file wajib diisi' }, { status: 400 });
    }

    const docRef = adminDb.collection('dokumen_humas').doc(String(id));
    const snap = await docRef.get();
    if (!snap.exists) {
      return NextResponse.json({ error: 'Dokumen tidak ditemukan' }, { status: 404 });
    }

    await docRef.update({
      ...rest,
      updated_at: new Date().toISOString()
    });

    return NextResponse.json({ success: true, message: 'Dokumen berhasil diperbarui' });
  } catch (error) {
    console.error('Dokumen humas PUT error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui dokumen' }, { status: 500 });
  }
}
