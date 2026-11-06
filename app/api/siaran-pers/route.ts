import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { convertTimestamps } from '@/lib/firebase-utils';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET: fetch news with kategori = 'Siaran Pers', published only (public)
export async function GET() {
  try {
    const snapshot = await adminDb.collection('berita')
      .where('kategori', '==', 'Siaran Pers')
      .where('status', '==', 'published')
      .get();

    const rows = snapshot.docs.map((doc: any) => {
      const data = convertTimestamps(doc.data());
      return {
        ID_berita: doc.id,
        Judul: data.Judul,
        Slug: data.Slug,
        image: data.image,
        isi_berita: data.isi_berita,
        status: data.status,
        tanggal: data.tanggal,
        kategori: data.kategori,
        penulis: data.penulis || 'Admin'
      };
    });

    rows.sort((a: any, b: any) => new Date(b.tanggal || 0).getTime() - new Date(a.tanggal || 0).getTime());

    return NextResponse.json({ success: true, data: rows.slice(0, 6) });
  } catch (error) {
    console.error('Siaran pers fetch error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data siaran pers' }, { status: 500 });
  }
}
