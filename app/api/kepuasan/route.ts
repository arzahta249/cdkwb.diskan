import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  try {
    // Aggregate general satisfaction surveys
    const [surveys]: any = await pool.query(
      'SELECT * FROM survei_kepuasan ORDER BY created_at DESC LIMIT 50'
    );

    // Aggregate rating from ticket feedback as well
    const [ticketRatings]: any = await pool.query(
      'SELECT rating_kepuasan, feedback_kepuasan, created_at, updated_at FROM pengaduan WHERE rating_kepuasan IS NOT NULL ORDER BY updated_at DESC'
    );

    const [statsGeneral]: any = await pool.query(`
      SELECT 
        COUNT(*) as total_survei,
        AVG(
          (IFNULL(u1_persyaratan, 4) + IFNULL(u2_prosedur, 4) + IFNULL(u3_kecepatan, 4) + 
           IFNULL(u4_biaya, 4) + IFNULL(u5_produk, 4) + IFNULL(u6_kompetensi, 4) + 
           IFNULL(u7_perilaku, 4) + IFNULL(u8_sarpras, 4) + IFNULL(u9_pengaduan, 4)) / 9
        ) as avg_skm,
        AVG(u2_prosedur) as avg_kemudahan,
        AVG(u3_kecepatan) as avg_kecepatan,
        AVG(u7_perilaku) as avg_sikap
      FROM survei_kepuasan
    `);

    const [statsTicket]: any = await pool.query(`
      SELECT 
        COUNT(*) as total_ticket_ratings,
        AVG(rating_kepuasan) as avg_ticket_rating
      FROM pengaduan 
      WHERE rating_kepuasan IS NOT NULL
    `);

    const generalCount = statsGeneral[0]?.total_survei || 0;
    const ticketCount = statsTicket[0]?.total_ticket_ratings || 0;
    const totalCount = generalCount + ticketCount;

    const avgGeneralSkm = parseFloat(statsGeneral[0]?.avg_skm || '3.78');
    // Map ticket 1-5 rating to 1-4 scale for uniform IKM calculation if present
    const avgTicketSkm = (parseFloat(statsTicket[0]?.avg_ticket_rating || '4.8') / 5) * 4;

    let overallAvg4 = 3.78;
    if (totalCount > 0) {
      overallAvg4 = ((avgGeneralSkm * generalCount) + (avgTicketSkm * ticketCount)) / totalCount;
    }

    // Indeks Kepuasan Masyarakat (IKM) scale out of 100 (Formula Permenpan RB: (Nilai Rata-Rata / 4) * 100)
    const ikmScore = (overallAvg4 / 4) * 100;

    return NextResponse.json({
      success: true,
      data: {
        surveys,
        ticketRatings,
        stats: {
          totalCount,
          overallAvg: (overallAvg4 * 1.25).toFixed(1), // Normalized out of 5 for display
          ikmScore: ikmScore.toFixed(1),
          avgKemudahan: ((parseFloat(statsGeneral[0]?.avg_kemudahan || '3.8') / 4) * 5).toFixed(1),
          avgKecepatan: ((parseFloat(statsGeneral[0]?.avg_kecepatan || '3.7') / 4) * 5).toFixed(1),
          avgSikap: ((parseFloat(statsGeneral[0]?.avg_sikap || '3.9') / 4) * 5).toFixed(1)
        }
      }
    });
  } catch (error) {
    console.error('Fetch kepuasan error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data kepuasan' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      jenis_kelamin,
      usia,
      pendidikan,
      pekerjaan,
      u1_persyaratan,
      u2_prosedur,
      u3_kecepatan,
      u4_biaya,
      u5_produk,
      u6_kompetensi,
      u7_perilaku,
      u8_sarpras,
      u9_pengaduan,
      kritik_saran
    } = body;

    // Validate required fields
    if (!email || !jenis_kelamin || !usia || !pendidikan || !pekerjaan) {
      return NextResponse.json({ error: 'Mohon lengkapi seluruh data demografi (Email, Jenis Kelamin, Usia, Pendidikan, Pekerjaan).' }, { status: 400 });
    }

    if (
      !u1_persyaratan || !u2_prosedur || !u3_kecepatan ||
      !u4_biaya || !u5_produk || !u6_kompetensi ||
      !u7_perilaku || !u8_sarpras || !u9_pengaduan
    ) {
      return NextResponse.json({ error: 'Mohon jawab seluruh 9 pertanyaan unsur kepuasan.' }, { status: 400 });
    }

    const [result]: any = await pool.query(
      `INSERT INTO survei_kepuasan 
      (email, jenis_kelamin, usia, pendidikan, pekerjaan, peran, 
       u1_persyaratan, u2_prosedur, u3_kecepatan, u4_biaya, u5_produk, u6_kompetensi, u7_perilaku, u8_sarpras, u9_pengaduan, 
       kualitas_kemudahan, kualitas_kecepatan, kualitas_sikap, kritik_saran) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        email || '',
        jenis_kelamin || '',
        usia || '',
        pendidikan || '',
        pekerjaan || '',
        pekerjaan || 'Masyarakat Umum',
        parseInt(u1_persyaratan, 10),
        parseInt(u2_prosedur, 10),
        parseInt(u3_kecepatan, 10),
        parseInt(u4_biaya, 10),
        parseInt(u5_produk, 10),
        parseInt(u6_kompetensi, 10),
        parseInt(u7_perilaku, 10),
        parseInt(u8_sarpras, 10),
        parseInt(u9_pengaduan, 10),
        parseInt(u2_prosedur, 10),
        parseInt(u3_kecepatan, 10),
        parseInt(u7_perilaku, 10),
        kritik_saran || ''
      ]
    );

    return NextResponse.json(
      { success: true, message: 'Jawaban Anda telah direkam. Terima kasih atas partisipasi Anda!', id: result.insertId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create survei kepuasan error:', error);
    return NextResponse.json({ error: 'Gagal menyimpan survei kepuasan', detail: error?.message || String(error) }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID survei wajib disertakan' }, { status: 400 });
    }

    await pool.query('DELETE FROM survei_kepuasan WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Data survei berhasil dihapus' });
  } catch (error: any) {
    console.error('Delete survei error:', error);
    return NextResponse.json({ error: 'Gagal menghapus data survei' }, { status: 500 });
  }
}
