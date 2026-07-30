import { pool } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';

async function getPublishedNews() {
  const [rows]: any = await pool.query(
    "SELECT ID_berita, Judul, Slug, isi_berita, tanggal, value FROM berita WHERE status = 'published' ORDER BY tanggal DESC LIMIT 6"
  );
  return rows;
}

export default async function HomePage() {
  const news = await getPublishedNews();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Portal Informasi Dinas Kelautan
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            Temukan berita, program, dan informasi terkini seputar kelautan dan perikanan secara transparan dan terpercaya.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#news" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg shadow-blue-500/25">
              Baca Berita
            </a>
            <Link href="/login" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-medium transition-all backdrop-blur-md">
              Login Admin
            </Link>
          </div>
        </div>
      </section>

      {/* Recommended News Section */}
      <section id="news" className="py-20 bg-[#121212]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Rekomendasi Berita</h2>
              <p className="text-gray-400">Pembaruan terkini dari kami untuk Anda.</p>
            </div>
          </div>

          {news.length === 0 ? (
            <div className="text-center py-20 bg-black/30 rounded-3xl border border-white/5">
              <p className="text-gray-400">Belum ada berita yang dipublikasikan saat ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item: any) => {
                const valueData = item.value ? (typeof item.value === 'string' ? JSON.parse(item.value) : item.value) : {};
                const imageUrl = valueData.image || '/placeholder-news.jpg'; // Gambar default jika kosong
                
                return (
                  <Link href={`/news/${item.Slug}`} key={item.ID_berita} className="group block">
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20">
                      {/* Image Container */}
                      <div className="relative h-64 w-full bg-black/50 overflow-hidden">
                        <Image 
                          src={imageUrl} 
                          alt={item.Judul} 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-80" />
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 relative">
                        <div className="flex items-center gap-2 text-blue-400 text-xs font-medium mb-3">
                          <Calendar className="w-4 h-4" />
                          {new Date(item.tanggal).toLocaleDateString('id-ID', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
                          {item.Judul}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-3 mb-6">
                          {item.isi_berita}
                        </p>
                        <div className="flex items-center text-sm font-medium text-white gap-2 group-hover:gap-3 transition-all">
                          Baca Selengkapnya
                          <ArrowRight className="w-4 h-4 text-blue-500" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Dinas Kelautan dan Perikanan. Hak Cipta Dilindungi.
        </div>
      </footer>
    </div>
  );
}
