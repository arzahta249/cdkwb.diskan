import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';
import { sendEmail } from '@/lib/email';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const status = searchParams.get('status') || '';
    const kategori = searchParams.get('kategori') || '';
    const ticket = searchParams.get('ticket') || '';

    let query = 'SELECT * FROM pengaduan WHERE 1=1';
    const params: any[] = [];

    if (ticket) {
      query += ' AND nomor_tiket = ?';
      params.push(ticket);
    }

    if (status && status !== 'ALL') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (kategori && kategori !== 'ALL') {
      query += ' AND kategori = ?';
      params.push(kategori);
    }

    if (q) {
      query += ' AND (nomor_tiket LIKE ? OR nama_pelapor LIKE ? OR deskripsi LIKE ? OR lokasi LIKE ?)';
      const searchPattern = `%${q}%`;
      params.push(searchPattern, searchPattern, searchPattern, searchPattern);
    }

    query += ' ORDER BY created_at DESC';

    const [rows]: any = await pool.query(query, params);

    // Calculate SLA warning status for active items
    const now = new Date();
    const formattedRows = rows.map((item: any) => {
      let isOverdue = false;
      if (item.sla_deadline && item.status !== 'SELESAI' && item.status !== 'DITUTUP' && item.status !== 'DITOLAK') {
        const deadline = new Date(item.sla_deadline);
        if (deadline < now) {
          isOverdue = true;
        }
      }
      return {
        ...item,
        is_overdue: isOverdue
      };
    });

    return NextResponse.json({ success: true, data: formattedRows });
  } catch (error) {
    console.error('Fetch pengaduan error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data pengaduan' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const nama_pelapor = (formData.get('nama_pelapor') as string) || '';
    const email_pelapor = formData.get('email_pelapor') as string;
    const telepon_pelapor = (formData.get('telepon_pelapor') as string) || '';
    const kategori = formData.get('kategori') as string;
    const lokasi = formData.get('lokasi') as string;
    const deskripsi = formData.get('deskripsi') as string;
    const is_anonim = formData.get('is_anonim') === 'true' || formData.get('is_anonim') === '1' ? 1 : 0;
    const lampiranFile = formData.get('lampiran') as File | null;

    if (!email_pelapor || !kategori || !lokasi || !deskripsi) {
      return NextResponse.json(
        { error: 'Email, kategori, lokasi, dan deskripsi pengaduan wajib diisi' },
        { status: 400 }
      );
    }

    let lampiranUrl = '';

    if (lampiranFile && lampiranFile.name && lampiranFile.size > 0) {
      const bytes = await lampiranFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(lampiranFile.name);
      const filename = `aduan-${uniqueSuffix}${ext}`;

      const uploadDir = path.join(process.cwd(), 'public/upload/pengaduan');
      await fs.mkdir(uploadDir, { recursive: true });
      const filepath = path.join(uploadDir, filename);

      await fs.writeFile(filepath, buffer);
      lampiranUrl = `/upload/pengaduan/${filename}`;
    }

    // Generate Tiket ID format TKT-YYYYMMDD-XXXX
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    const nomor_tiket = `TKT-${dateStr}-${randomCode}`;

    const [result]: any = await pool.query(
      `INSERT INTO pengaduan 
      (nomor_tiket, nama_pelapor, email_pelapor, telepon_pelapor, kategori, lokasi, deskripsi, lampiran, is_anonim, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING')`,
      [
        nomor_tiket,
        is_anonim ? 'Anonim' : nama_pelapor,
        email_pelapor,
        telepon_pelapor,
        kategori,
        lokasi,
        deskripsi,
        lampiranUrl,
        is_anonim
      ]
    );

    // Kirim notifikasi email ke Admin secara asynchronous (tidak menunda response ke user)
    // Ambil daftar email admin langsung dari database
    pool.query("SELECT Email FROM user WHERE role = 'admin' AND Email IS NOT NULL AND Email != ''")
      .then(([adminRows]: any) => {
        if (adminRows && adminRows.length > 0) {
          const emailList = adminRows.map((row: any) => row.Email);
          
          const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
              <div style="background-color: #0b3b60; color: white; padding: 20px; text-align: center;">
                <h2 style="margin: 0;">Pemberitahuan Pengaduan Baru</h2>
                <p style="margin: 5px 0 0; opacity: 0.8;">Tiket #${nomor_tiket}</p>
              </div>
              <div style="padding: 20px; background-color: #f9fafb;">
                <p>Halo Admin,</p>
                <p>Terdapat pengaduan baru yang masuk melalui portal layanan masyarakat. Berikut adalah rinciannya:</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; width: 130px; font-weight: bold; color: #4b5563;">Kategori</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #111827;">${kategori}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Pelapor</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #111827;">${is_anonim ? 'Anonim' : nama_pelapor}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Lokasi</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #111827;">${lokasi}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; font-weight: bold; color: #4b5563; vertical-align: top;">Deskripsi</td>
                    <td style="padding: 10px; color: #111827;">${deskripsi}</td>
                  </tr>
                </table>
                <div style="margin-top: 25px; text-align: center;">
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/dashboard/pengaduan" style="display: inline-block; padding: 12px 24px; background-color: #0b3b60; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Cek di Dasbor</a>
                </div>
              </div>
            </div>
          `;

          sendEmail({
            to: emailList,
            subject: `[Pengaduan Baru] Tiket ${nomor_tiket} - ${kategori}`,
            html: emailHtml,
            replyTo: email_pelapor || undefined,
          }).catch(err => console.error('Gagal mengirim email background:', err));
        }
      })
      .catch((err) => console.error('Gagal mengambil email admin dari database:', err));

    return NextResponse.json(
      {
        success: true,
        message: 'Pengaduan berhasil dikirim',
        nomor_tiket,
        id: result.insertId
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create pengaduan error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server saat mengirim pengaduan' },
      { status: 500 }
    );
  }
}
