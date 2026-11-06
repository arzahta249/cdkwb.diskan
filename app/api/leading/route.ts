import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminDb } from '@/lib/firebase-admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, type, is_leading } = await request.json();

    if (!id || !type || typeof is_leading !== 'boolean') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (type !== 'berita' && type !== 'artikel') {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    const collectionName = type === 'berita' ? 'berita' : 'artikel';
    const leadingValue = is_leading ? 1 : 0;

    await adminDb.collection(collectionName).doc(String(id)).update({
      is_leading: leadingValue
    });

    return NextResponse.json({ success: true, message: 'Status leading page berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating leading status:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memperbarui status leading page' },
      { status: 500 }
    );
  }
}
