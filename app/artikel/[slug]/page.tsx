import { pool } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Share2, Folder, User } from 'lucide-react';
import { notFound } from 'next/navigation';

async function getArtikelBySlug(slug: string) {
  try {
    const [rows]: any = await pool.query(
      `SELECT 
        a.ID_artikel, 
        a.Judul, 
        a.Slug, 
        a.isi_artikel, 
        a.tanggal, 
        a.value, 
        a.kategori as name_kategori,
        u.nama as nama_penulis
       FROM artikel a
       LEFT JOIN user u ON a.id_penulis = u.ID_user
       WHERE a.Slug = ? AND a.status = 'published'`,
      [slug]
    );
    
    if (rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function ArtikelDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const artikel = await getArtikelBySlug(slug);

  if (!artikel) {
    notFound();
  }

  let imageUrl = '/leading/berita.png';
  if (artikel.value) {
    try {
      const parsedValue = typeof artikel.value === 'string' ? JSON.parse(artikel.value) : artikel.value;
      if (parsedValue.image) {
        imageUrl = parsedValue.image;
      }
    } catch (e) {
      console.error('Failed to parse JSON image:', e);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="w-full bg-[#0a3153] h-20" /> {/* Spacer untuk Navbar (jika dipisah layoutnya) */}
      
      <main className="container mx-auto px-6 max-w-4xl pt-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0a3153] transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="relative w-full h-[400px]">
            <Image 
              src={imageUrl} 
              alt={artikel.Judul}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                <Folder className="w-3.5 h-3.5" />
                {artikel.name_kategori || 'Artikel'}
              </span>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {new Date(artikel.tanggal).toLocaleDateString('id-ID', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <User className="w-4 h-4" />
                {artikel.nama_penulis || 'Admin'}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#0a3153] mb-8 leading-tight">
              {artikel.Judul}
            </h1>

            <div className="prose prose-lg max-w-none text-gray-600">
              {artikel.isi_artikel.split('\\n').map((paragraph: string, idx: number) => (
                <p key={idx} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm text-gray-500 font-medium">Bagikan artikel ini:</span>
              <button className="p-2.5 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
