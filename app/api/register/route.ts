import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { username, password, email, nama } = await request.json();

    if (!username || !password || !email || !nama) {
      return NextResponse.json(
        { error: 'Semua kolom (username, password, email, nama) wajib diisi' },
        { status: 400 }
      );
    }

    // Periksa apakah username sudah digunakan
    const [existingUsers]: any = await pool.query(
      'SELECT ID_user FROM user WHERE username = ? OR Email = ?',
      [username, email]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'Username atau Email sudah terdaftar' },
        { status: 409 }
      );
    }

    // Default role 'admin' atau 'user'.
    const role = 'admin'; 

    // Insert user baru ke database
    // Catatan: Jika menggunakan hashing (mis. bcrypt), hash password di sini
    const [result]: any = await pool.query(
      'INSERT INTO user (username, password, Email, nama, role) VALUES (?, ?, ?, ?, ?)',
      [username, password, email, nama, role]
    );

    return NextResponse.json(
      { success: true, message: 'Registrasi berhasil', userId: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
