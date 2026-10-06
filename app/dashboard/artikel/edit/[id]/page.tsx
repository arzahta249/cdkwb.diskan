import { adminDb } from '@/lib/firebase-admin';
import EditForm from './FormEdit';
import { notFound } from 'next/navigation';

export const revalidate = 0;

async function getArtikelById(id: string) {
  try {
    const docSnap = await adminDb.collection('artikel').doc(id).get();
    if (!docSnap.exists) return null;
    return {
      ID_artikel: docSnap.id,
      ...docSnap.data(),
      penulis: docSnap.data()?.penulis || 'Admin'
    } as any;
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
