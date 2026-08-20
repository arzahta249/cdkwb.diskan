import { pool } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Share2, Eye } from 'lucide-react';
import { notFound } from 'next/navigation';

async function getNewsBySlug(slug: string) {
  try {
    await pool.query(
      "UPDATE berita SET views = COALESCE(views, 0) + 1 WHERE Slug = ?",
      [slug]
    );
  } catch (err) {
    console.error('Error incrementing view count:', err);
  }

  const [rows]: any = await pool.query(
    "SELECT b.ID_berita, b.Judul, b.Slug, b.image, b.isi_berita, b.tanggal, b.views, b.instagram_url, u.nama as penulis FROM berita b LEFT JOIN user u ON b.id_penulis = u.ID_user WHERE b.Slug = ? AND b.status = 'published'",
    [slug]
  );
  return rows[0] || null;
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const news = await getNewsBySlug(resolvedParams.slug);

  if (!news) {
    notFound();
  }

  const imageUrl = news.image || '/placeholder-news.jpg';

  let embedUrl = '';
  if (news.instagram_url) {
    try {
      const urlObj = new URL(news.instagram_url);
      urlObj.search = '';
      embedUrl = urlObj.toString().replace(/\/$/, '') + '/embed/captioned/';
    } catch (e) {
      embedUrl = news.instagram_url;
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar Minimalis */}
      <nav className="fixed top-0 inset-x-0 h-20 bg-[#0a0a0a]/80 backdrop-blur-md z-50 border-b border-white/5 flex items-center px-6">
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <Link href="/news" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Berita & Artikel</span>
          </Link>
          <div className="text-xl font-bold tracking-tight">Diskan Portal</div>
        </div>
      </nav>

      <article className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Header Berita */}
          <header className="mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium mb-6">
              <span className="text-[#6FF3C8] flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                Oleh: {news.penulis || 'Reynard'}
              </span>
              <span className="text-gray-400 flex items-center gap-1">
                <Calendar className="w-4 h-4 text-blue-400" />
                {new Date(news.tanggal).toLocaleDateString('id-ID', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
              <span className="text-gray-400 flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <Eye className="w-4 h-4 text-emerald-400" />
                {news.views || 1} x dibaca
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
              {news.Judul}
            </h1>
            
            {/* Fitur Share (Hanya visual/placeholder) */}
            <div className="flex justify-center">
              <button className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full text-sm text-gray-300 transition-colors border border-white/5">
                <Share2 className="w-4 h-4" />
                Bagikan Berita
              </button>
            </div>
          </header>

          {/* Conditional Rendering: Jika ada embedUrl, tampilkan hanya Instagram iframe. Jika tidak, tampilkan gambar & isi berita standar */}
          {embedUrl ? (
            <div className="w-full max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
               <iframe 
                 src={embedUrl}
                 className="w-full h-[800px] border border-gray-800 rounded-2xl shadow-2xl bg-white"
                 allow="encrypted-media"
                 scrolling="yes"
               />
            </div>
          ) : (
            <>
              {/* Gambar Berita */}
              <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl border border-white/5 animate-in fade-in zoom-in-95 duration-700">
                <Image 
                  src={imageUrl} 
                  alt={news.Judul} 
                  fill 
                  className="object-cover" 
                  priority
                />
              </div>

              {/* Isi Berita */}
              <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                {news.isi_berita}
              </div>
            </>
          )}
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-[#121212]">
        <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Dinas Kelautan dan Perikanan.
        </div>
      </footer>
    </div>
  );
}
