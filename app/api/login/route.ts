import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { pool } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi' },
        { status: 400 }
      );
    }

    // Query ke database
    const [rows]: any = await pool.query(
      'SELECT ID_user, username, Email, nama, role, password FROM user WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Username tidak ditemukan' },
        { status: 401 }
      );
    }

    const user = rows[0];

    // Catatan: Jika password di-hash di database (misal dengan bcrypt), 
    // gunakan bcrypt.compare() di sini. 
    // Untuk saat ini kita asumsikan plain text berdasarkan struktur standar, 
    // namun sangat disarankan untuk menggunakan hashing.
    if (password !== user.password) {
      return NextResponse.json(
        { error: 'Password salah' },
        { status: 401 }
      );
    }

    // Hapus password dari object response untuk keamanan
    delete user.password;

    // Set cookie untuk autentikasi
    const cookieStore = await cookies();
    cookieStore.set('auth_token', user.ID_user.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 minggu
    });

    return NextResponse.json({
      success: true,
      message: 'Login berhasil',
      user
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
