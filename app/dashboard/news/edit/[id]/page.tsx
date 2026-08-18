import { pool } from '@/lib/db';
import EditForm from './FormEdit';
import { notFound } from 'next/navigation';

export const revalidate = 0;

async function getNewsById(id: string) {
  try {
    const [rows]: any = await pool.query(
      `SELECT b.ID_berita, b.Judul, b.Slug, b.image, b.isi_berita, b.status, b.kategori, b.instagram_url, u.nama as penulis
       FROM berita b 
       LEFT JOIN user u ON b.id_penulis = u.ID_user
       WHERE b.ID_berita = ?`,
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = await params;
  const news = await getNewsById(p.id);

  if (!news) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <EditForm initialData={news} />
    </div>
  );
}
