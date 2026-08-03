import { pool } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, PlayCircle, Ship, Waves, ShieldAlert, FileText, LayoutGrid } from 'lucide-react';

async function getPublishedNews() {
  try {
    // Membaca dari kolom 'image' yang baru saja kita tambahkan
    const [rows]: any = await pool.query(
      "SELECT ID_berita, Judul, Slug, image, isi_berita, tanggal FROM berita WHERE status = 'published' ORDER BY tanggal DESC LIMIT 2"
    );
    return rows;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function HomePage() {
  const news = await getPublishedNews();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative bg-[#0a3153] pt-24 pb-32 overflow-hidden">
        {/* Latar Belakang Gambar (Gunakan CSS untuk fallback) */}
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center bg-no-repeat mix-blend-overlay"
          style={{ backgroundImage: "url('/leading/latar%20belakang.png')" }}
        />
        {/* Gradient Biru Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0a3153] via-[#0a3153]/80 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="text-blue-300 font-semibold text-xs tracking-widest uppercase mb-4">
              DINAS KELAUTAN DAN PERIKANAN PROVINSI JAWA TENGAH
            </h2>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Cabang Dinas Kelautan Wilayah Barat
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-xl">
              Mewujudkan pengelolaan ruang laut yang berkelanjutan, aman, dan sejahtera untuk masa depan maritim Jawa Tengah.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="#layanan" className="bg-white text-[#0a3153] hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition-colors text-sm">
                Jelajahi Layanan
              </Link>
              <button className="border border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-full font-medium transition-colors text-sm flex items-center gap-2">
                <PlayCircle className="w-5 h-5" /> Tonton Video Profil
              </button>
            </div>
          </div>
        </div>

        {/* Kurva Putih Bawah (Wave) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-24 fill-white" preserveAspectRatio="none">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. Sekilas Layanan */}
      <section id="layanan" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-[#0a3153] inline-block relative pb-2">
              Sekilas Layanan
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-green-500 rounded-full"></span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard 
              icon={Ship} 
              title="Perizinan Kapal" 
              desc="Layanan administrasi perikanan tangkap." 
            />
            <ServiceCard 
              icon={Waves} 
              title="Konservasi" 
              desc="Program pelestarian ekosistem laut." 
            />
            <ServiceCard 
              icon={ShieldAlert} 
              title="Pengawasan" 
              desc="Patroli dan keamanan wilayah pesisir." 
            />
            <ServiceCard 
              icon={FileText} 
              title="Data & Info" 
              desc="Statistik dan informasi publik kelautan." 
            />
          </div>
        </div>
      </section>

      {/* 3. Berita & Kegiatan Terbaru */}
      <section className="py-20 bg-[#fafafa]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#0a3153] mb-2">Berita & Kegiatan Terbaru</h2>
              <p className="text-gray-500">Pembaruan aktivitas dan dokumentasi lapangan terkini.</p>
            </div>
            <Link href="/news" className="text-sm font-semibold text-[#0a3153] hover:text-blue-700 flex items-center gap-1 transition-colors">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.map((item: any, index: number) => {
              const badges = ["Operasional", "Konservasi", "Berita", "Informasi"];
              const badge = badges[index % badges.length]; // Simulasi badge/kategori untuk UI
              
              return (
                <Link href={`/news/${item.Slug}`} key={item.ID_berita} className="group relative block h-80 rounded-2xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1">
                  <Image 
                    src={item.image || '/leading/berita.png'} 
                    alt={item.Judul}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradien dari bawah ke atas */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a3153] via-[#0a3153]/50 to-transparent opacity-90" />
                  
                  {/* Konten Berita */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-green-600/90 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded">
                        {badge}
                      </span>
                      <span className="text-white/80 text-xs font-medium">
                        {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight line-clamp-2">
                      {item.Judul}
                    </h3>
                  </div>
                </Link>
              );
            })}
            
            {news.length === 0 && (
              <div className="col-span-2 text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500">Belum ada berita terbaru.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Portal Layanan Terpadu */}
      <section className="relative bg-[#0a3153] pt-32 pb-24 text-center overflow-hidden">
        {/* Kurva Putih Atas (Wave) */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
          <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-24 fill-[#fafafa]" preserveAspectRatio="none">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
        
        {/* Lingkaran Latar */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 max-w-3xl flex flex-col items-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10">
            <LayoutGrid className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Portal Layanan Terpadu
          </h2>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed max-w-2xl">
            Akses cepat ke berbagai layanan publik, informasi kelautan terpusat, dan pelaporan perizinan untuk wilayah barat dalam satu platform terintegrasi.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="#" className="bg-white text-[#0a3153] hover:bg-gray-100 px-8 py-3.5 rounded-full font-medium transition-colors text-sm w-full sm:w-auto">
              Akses Portal Sekarang <ArrowRight className="w-4 h-4 inline ml-1" />
            </Link>
            <Link href="#" className="border border-white/30 text-white hover:bg-white/10 px-8 py-3.5 rounded-full font-medium transition-colors text-sm w-full sm:w-auto">
              Unduh Buku Panduan
            </Link>
          </div>
        </div>

        {/* Kurva Putih Bawah (Transisi ke Footer) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 120" className="w-full h-8 md:h-16 fill-[#f0f2f5]" preserveAspectRatio="none">
            <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,85.3C1120,96,1280,96,1360,96L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ServiceCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-md">
      <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-bold text-[#0a3153] mb-3">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
