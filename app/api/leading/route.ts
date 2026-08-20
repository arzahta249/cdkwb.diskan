import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function PATCH(request: Request) {
  try {
    // Check custom auth token used by this app
    const cookieHeader = request.headers.get('cookie') || '';
    if (!cookieHeader.includes('auth_token=')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, type, is_leading } = await request.json();

    if (!id || !type || typeof is_leading !== 'boolean') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (type !== 'berita' && type !== 'artikel') {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    const table = type === 'berita' ? 'berita' : 'artikel';
    const idField = type === 'berita' ? 'ID_berita' : 'ID_artikel';
    const leadingValue = is_leading ? 1 : 0;

    await pool.query(
      `UPDATE ${table} SET is_leading = ? WHERE ${idField} = ?`,
      [leadingValue, id]
    );

    return NextResponse.json({ success: true, message: 'Status leading page berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating leading status:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memperbarui status leading page' },
      { status: 500 }
    );
  }
}
