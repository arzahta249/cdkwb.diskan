import { adminDb } from '@/lib/firebase-admin';
import { convertTimestamps } from '@/lib/firebase-utils';
import EditForm from './FormEdit';
import { notFound } from 'next/navigation';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

async function getNewsById(id: string) {
  try {
    const docSnap = await adminDb.collection('berita').doc(id).get();
    if (!docSnap.exists) return null;
    const data = convertTimestamps(docSnap.data());
    return {
      ID_berita: docSnap.id,
      ...data,
      penulis: data?.penulis || 'Admin'
    };
  } catch (error) {
    console.error('Error fetching news by ID:', error);
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
