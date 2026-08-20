import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ambil path yang sedang dikunjungi
  const path = request.nextUrl.pathname;

  // Cek apakah user mengunjungi rute yang dilindungi
  const isProtectedRoute = path.startsWith('/dashboard');

  // Ambil token dari cookie
  const token = request.cookies.get('auth_token')?.value;

  if (isProtectedRoute && !token) {
    // Jika tidak ada token dan mencoba akses dashboard, arahkan ke login
    return NextResponse.redirect(new URL('/adminCDKWB', request.url));
  }

  // Jika user sudah login dan mencoba ke halaman login/register, arahkan ke dashboard
  if ((path === '/adminCDKWB' || path === '/register') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/adminCDKWB', '/register'],
};
