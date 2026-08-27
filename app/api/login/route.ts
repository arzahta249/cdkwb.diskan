import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi' },
        { status: 400 }
      );
    }

    const adminUsers = [
      {
        ID_user: 'admin1',
        username: process.env.ADMIN1_USERNAME,
        password: process.env.ADMIN1_PASSWORD,
        nama: 'Admin 1',
        role: 'admin',
        Email: 'admin1@example.com'
      },
      {
        ID_user: 'admin2',
        username: process.env.ADMIN2_USERNAME,
        password: process.env.ADMIN2_PASSWORD,
        nama: 'Admin 2',
        role: 'admin',
        Email: 'admin2@example.com'
      },
      {
        ID_user: 'admin3',
        username: process.env.ADMIN3_USERNAME,
        password: process.env.ADMIN3_PASSWORD,
        nama: 'Admin 3',
        role: 'admin',
        Email: 'admin3@example.com'
      },
    ];

    const user = adminUsers.find(
      (u) => u.username === username && u.password === password && u.username !== undefined
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Username atau password salah' },
        { status: 401 }
      );
    }

    // Hapus password dari object response untuk keamanan
    const { password: _, ...userWithoutPassword } = user;

    // Set cookie untuk autentikasi
    const cookieStore = await cookies();
    cookieStore.set('auth_token', userWithoutPassword.ID_user.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 minggu
    });

    return NextResponse.json({
      success: true,
      message: 'Login berhasil',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
