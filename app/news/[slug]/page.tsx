import { pool } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import { notFound } from 'next/navigation';

async function getNewsBySlug(slug: string) {
  const [rows]: any = await pool.query(
    "SELECT ID_berita, Judul, Slug, image, isi_berita, tanggal FROM berita WHERE Slug = ? AND status = 'published'",
    [slug]
  );
  return rows[0] || null;
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  // Tunggu params (perubahan Next.js 15)
  const resolvedParams = await params;
  const news = await getNewsBySlug(resolvedParams.slug);

  if (!news) {
    notFound();
  }

  const imageUrl = news.image || '/placeholder-news.jpg';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar Minimalis */}
      <nav className="fixed top-0 inset-x-0 h-20 bg-[#0a0a0a]/80 backdrop-blur-md z-50 border-b border-white/5 flex items-center px-6">
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Beranda</span>
          </Link>
          <div className="text-xl font-bold tracking-tight">Diskan Portal</div>
        </div>
      </nav>

      <article className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Header Berita */}
          <header className="mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-center gap-2 text-blue-400 text-sm font-medium mb-6">
              <Calendar className="w-4 h-4" />
              {new Date(news.tanggal).toLocaleDateString('id-ID', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
              })}
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
