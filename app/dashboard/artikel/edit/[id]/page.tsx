import { pool } from '@/lib/db';
import EditForm from './FormEdit';
import { notFound } from 'next/navigation';

export const revalidate = 0;

async function getArtikelById(id: string) {
  try {
    const [rows]: any = await pool.query(
      `SELECT a.ID_artikel, a.Judul, a.Slug, a.isi_artikel, a.status, a.kategori, a.value, a.instagram_url, u.nama as penulis
       FROM artikel a 
       LEFT JOIN user u ON a.id_penulis = u.ID_user
       WHERE a.ID_artikel = ?`,
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function EditArtikelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = await params;
  const artikel = await getArtikelById(p.id);

  if (!artikel) {
    notFound();
  }

  // Parse image if it exists in JSON value
  let imageUrl = null;
  if (artikel.value) {
    try {
      const parsed = typeof artikel.value === 'string' ? JSON.parse(artikel.value) : artikel.value;
      if (parsed?.image) imageUrl = parsed.image;
    } catch (e) {
      console.error(e);
    }
  }

  const initialData = {
    ...artikel,
    image: imageUrl
  };

  return (
    <div className="max-w-4xl mx-auto">
      <EditForm initialData={initialData} />
    </div>
  );
}
