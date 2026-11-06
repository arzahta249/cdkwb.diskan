import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { convertTimestamps } from '@/lib/firebase-utils';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const INITIAL_PARTNERS = [
  {
    nama_mitra: 'Fakultas Perikanan dan Ilmu Kelautan, Universitas Pancasakti Tegal (UPS)',
    singkatan: 'FPIK UPS Tegal',
    kategori: 'akademik',
    nomor_pks_mitra: '444/K/L-5/FPIK-UPS/XII/2024',
    nomor_pks_dinas: '019.5/8689/XII/2024',
    tanggal_pks: '15 Des 2024',
    jangka_waktu: '4 Tahun (2024 — 2028)',
    status: 'aktif',
    level: 'Provinsi Jawa Tengah',
    penandatangan: 'Ir. Fendiawan Tiskiantoro, M.Si (Kepala DKP Jateng) & Dekan FPIK UPS',
    ringkasan: 'Program Pengembangan Sumberdaya Kelautan dan Perikanan serta penguatan Tri Dharma Perguruan Tinggi di kawasan Pantura.',
    ruang_lingkup: [
      'Peningkatan mutu dan pengembangan SDM kelautan & perikanan',
      'Penyelenggaraan riset terapan & pengabdian masyarakat pesisir',
      'Pertukaran data dan publikasi ilmiah kemaritiman',
      'Pemanfaatan bersama sarana-prasarana laboratorium & lapangan'
    ],
    prodi_terlibat: '',
    keluaran_program: '',
    pendanaan: '',
    file_dokumen_url: '',
    urutan: 1
  },
  {
    nama_mitra: 'Fakultas Perikanan, Universitas Pekalongan (UNIKAL)',
    singkatan: 'Fakultas Perikanan UNIKAL',
    kategori: 'akademik',
    nomor_pks_mitra: '0289/C.06.02/FPr/XII/2024',
    nomor_pks_dinas: '019.5/8688/XII/2024',
    tanggal_pks: '15 Des 2024',
    jangka_waktu: '4 Tahun (2024 — 2028)',
    status: 'aktif',
    level: 'Provinsi Jawa Tengah',
    penandatangan: 'Ir. Fendiawan Tiskiantoro, M.Si (Kepala DKP Jateng) & Dekan FPr UNIKAL',
    ringkasan: 'Sinergi riset budidaya perikanan, kajian mitigasi abrasi pesisir Pekalongan-Batang, dan program magang mahasiswa.',
    ruang_lingkup: [
      'Penelitian terapan teknologi budidaya dan kelautan',
      'Program magang mandiri dan MBKM di wilayah kerja CDKWB',
      'Pertukaran data saintifik perikanan berkelanjutan',
      'Pemberdayaan kelompok pembudidaya ikan dan nelayan lokal'
    ],
    prodi_terlibat: '',
    keluaran_program: '',
    pendanaan: '',
    file_dokumen_url: '',
    urutan: 2
  },
  {
    nama_mitra: 'Fakultas Sains & Teknologi Pertanian, Universitas Muhammadiyah Semarang (UNIMUS)',
    singkatan: 'FSTP UNIMUS',
    kategori: 'akademik',
    nomor_pks_mitra: '120/UNIMUS/AD/DN/2024',
    nomor_pks_dinas: '019.5/8690/XII/2024',
    tanggal_pks: '15 Des 2024',
    jangka_waktu: '4 Tahun (2024 — 2028)',
    status: 'aktif',
    level: 'Provinsi Jawa Tengah',
    penandatangan: 'Ir. Fendiawan Tiskiantoro, M.Si (Kepala DKP Jateng) & Dekan FSTP UNIMUS',
    ringkasan: 'Kolaborasi riset pascapanen hasil perikanan, uji mikrobiologi mutu produk olahan pesisir, serta pendampingan UMKM pengolah ikan binaan CDKWB.',
    ruang_lingkup: [
      'Riset pengolahan & diversifikasi produk hasil perikanan',
      'Pengujian laboratorium mikrobiologi dan jaminan mutu olahan',
      'Pendampingan sertifikasi kelayakan pengolahan (SKP) UMKM binaan',
      'Magang riset dan program pengabdian masyarakat dosen/mahasiswa'
    ],
    prodi_terlibat: 'S1 Teknologi Pangan, S1 Sains Data, S1 Statistika Terapan',
    keluaran_program: [
      'Kajian Karakteristik Mutu Produk Asap Ikan Tradisional Pantura',
      'Modul Higiene & Sanitasi Pengolahan Hasil Laut Skala Rumah Tangga',
      'Pelatihan Pengemasan Vakum & Standardisasi Label Produk Perikanan'
    ],
    pendanaan: 'Swadana Institusi & BOPTN Riset Terapan Kemendiktisaintek 2025',
    file_dokumen_url: '',
    urutan: 3
  },
  {
    nama_mitra: 'Yayasan Rekam Jejak Alam Nusantara (Rekam Nusantara Foundation)',
    singkatan: 'Rekam Nusantara Foundation',
    kategori: 'teknis',
    nomor_pks_mitra: '06/SPK/YRJAN/XI/2022',
    nomor_pks_dinas: '019.5/910/I/2023',
    tanggal_pks: '23 Nov 2022',
    jangka_waktu: 's.d. 1 Des 2024 (Evaluasi Perpanjangan)',
    status: 'perpanjangan',
    level: 'Provinsi Jawa Tengah',
    penandatangan: 'Kepala DKP Jateng & Direktur Eksekutif Yayasan Rekam Jejak Alam Nusantara',
    ringkasan: 'Pengelolaan perikanan demersal berkelanjutan (rajungan & kepiting), pendekatan Blue Carbon kawasan konservasi pesisir, dan monitoring ekologi.',
    ruang_lingkup: [
      'Pengelolaan perikanan demersal (rajungan Laut Jawa & kepiting Samudera Hindia)',
      'Kawasan konservasi perairan daerah berbasis Blue Carbon',
      'Monitoring biofisik terumbu karang dan rehabilitasi mangrove',
      'Rekomendasi kebijakan tata kelola perikanan ramah lingkungan'
    ],
    prodi_terlibat: '',
    keluaran_program: [
      'Pengelolaan Perikanan Berkelanjutan Rajungan (Laut Jawa)',
      'Pengelolaan Perikanan Kepiting (Samudera Hindia Selatan Jawa)',
      'Kajian Potensi Cadangan Karbon Biru (Blue Carbon) Pesisir',
      'Monitoring Biofisik Karang Jeruk & Ujungnegoro'
    ],
    pendanaan: 'Hibah Program: ± Rp 200.000.000 / Tahun',
    file_dokumen_url: '',
    urutan: 4
  },
  {
    nama_mitra: 'Pokmaswas "Agung Jaya", Desa Munjungagung, Kec. Kramat, Kab. Tegal',
    singkatan: 'Pokmaswas Agung Jaya',
    kategori: 'pokmaswas',
    nomor_pks_mitra: 'SK Kades No. 141/08/X/2016',
    nomor_pks_dinas: '',
    tanggal_pks: '31 Okt 2016',
    jangka_waktu: 'Tidak Ditentukan (SK Pembentukan Desa)',
    status: 'tetap',
    level: 'Desa / Wilayah Kab. Tegal',
    penandatangan: 'Kepala Desa Munjungagung (Mitra CDKWB & Penyuluh Kab. Tegal)',
    ringkasan: 'Kelompok pengawas masyarakat pesisir (13 anggota) yang melaksanakan pengawasan partisipatif sumber daya kelautan dan konservasi mangrove.',
    ruang_lingkup: [
      'Pengawasan swadaya terhadap praktek penangkapan ikan merusak',
      'Pelaporan dini pencemaran dan pelanggaran zonasi pesisir',
      'Edukasi kelestarian ekosistem laut kepada nelayan lokal',
      'Pendampingan kegiatan konservasi mangrove pesisir Kramat'
    ],
    prodi_terlibat: '',
    keluaran_program: '',
    pendanaan: '',
    file_dokumen_url: '',
    urutan: 5
  }
];

// GET: list all partnerships
export async function GET() {
  try {
    const snap = await adminDb.collection('kerjasama').get();

    if (snap.empty) {
      // Auto-seed initial 5 partners if completely empty
      try {
        await Promise.all(
          INITIAL_PARTNERS.map(p =>
            adminDb.collection('kerjasama').add({ ...p, created_at: new Date().toISOString() })
          )
        );

        const newSnap = await adminDb.collection('kerjasama').get();
        const rows = newSnap.docs.map(doc => ({
          id: doc.id,
          ...convertTimestamps(doc.data())
        }));
        rows.sort((a: any, b: any) => (a.urutan || 0) - (b.urutan || 0));
        return NextResponse.json({ success: true, data: rows });
      } catch (seedErr) {
        console.warn('Auto-seed kerjasama failed (fallback to in-memory):', seedErr);
        return NextResponse.json({
          success: true,
          data: INITIAL_PARTNERS.map((p, idx) => ({ id: `init-${idx + 1}`, ...p }))
        });
      }
    }

    const rows = snap.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    }));
    rows.sort((a: any, b: any) => (a.urutan || 0) - (b.urutan || 0));
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Kerjasama GET error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data kerjasama' }, { status: 500 });
  }
}

// POST: create new partnership
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nama_mitra,
      singkatan,
      kategori,
      nomor_pks_mitra,
      nomor_pks_dinas,
      tanggal_pks,
      jangka_waktu,
      status,
      level,
      penandatangan,
      ringkasan,
      ruang_lingkup,
      prodi_terlibat,
      keluaran_program,
      pendanaan,
      file_dokumen_url,
      urutan
    } = body;

    if (!nama_mitra || !nomor_pks_mitra || !tanggal_pks || !jangka_waktu) {
      return NextResponse.json({ 
        error: 'Nama Mitra, Nomor PKS, Tanggal, dan Jangka Waktu wajib diisi' 
      }, { status: 400 });
    }

    const docData = {
      nama_mitra: String(nama_mitra).trim(),
      singkatan: singkatan || '',
      kategori: kategori || 'akademik',
      nomor_pks_mitra: String(nomor_pks_mitra).trim(),
      nomor_pks_dinas: nomor_pks_dinas || '',
      tanggal_pks: String(tanggal_pks).trim(),
      jangka_waktu: String(jangka_waktu).trim(),
      status: status || 'aktif',
      level: level || 'Provinsi Jawa Tengah',
      penandatangan: penandatangan || '',
      ringkasan: ringkasan || '',
      ruang_lingkup: ruang_lingkup || [],
      prodi_terlibat: prodi_terlibat || '',
      keluaran_program: keluaran_program || '',
      pendanaan: pendanaan || '',
      file_dokumen_url: file_dokumen_url || '',
      urutan: typeof urutan === 'number' ? urutan : 0,
      created_at: new Date().toISOString()
    };

    const docRef = await adminDb.collection('kerjasama').add(docData);
    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Kerjasama POST error:', error);
    return NextResponse.json({ error: 'Gagal menambahkan data kerjasama' }, { status: 500 });
  }
}

// PUT: update partnership
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...rest } = body;

    if (!id || !rest.nama_mitra || !rest.nomor_pks_mitra) {
      return NextResponse.json({ error: 'ID, Nama Mitra, dan Nomor PKS wajib diisi' }, { status: 400 });
    }

    const docRef = adminDb.collection('kerjasama').doc(String(id));
    const snap = await docRef.get();
    if (!snap.exists) {
      return NextResponse.json({ error: 'Data kerjasama tidak ditemukan' }, { status: 404 });
    }

    await docRef.update({
      ...rest,
      updated_at: new Date().toISOString()
    });

    return NextResponse.json({ success: true, message: 'Data kerjasama berhasil diperbarui' });
  } catch (error) {
    console.error('Kerjasama PUT error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui data kerjasama' }, { status: 500 });
  }
}

// DELETE: delete partnership by ?id=
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID wajib disertakan' }, { status: 400 });

    const docRef = adminDb.collection('kerjasama').doc(String(id));
    const snap = await docRef.get();
    if (!snap.exists) {
      return NextResponse.json({ error: 'Data kerjasama tidak ditemukan' }, { status: 404 });
    }

    await docRef.delete();
    return NextResponse.json({ success: true, message: 'Data kerjasama berhasil dihapus' });
  } catch (error) {
    console.error('Kerjasama DELETE error:', error);
    return NextResponse.json({ error: 'Gagal menghapus data kerjasama' }, { status: 500 });
  }
}
