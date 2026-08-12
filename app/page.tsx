import { pool } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DepthGauge from '@/components/DepthGauge';
import { ArrowRight, PlayCircle, Ship, Waves, ShieldAlert, FileText, Users, Calendar, User, ChevronRight } from 'lucide-react';

async function getPublishedNews() {
  try {
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
    <div className="min-h-screen font-sans">
      {/* Original Navbar */}
      <Navbar />

      {/* Depth Gauge sidebar — tracks scroll */}
      <DepthGauge />

      {/* ── Ocean gradient wrapper ── */}
      <div className="ocean-bg">

        {/* 1. Hero Section */}
        <section className="relative min-h-[85vh] sm:min-h-screen flex items-center pt-20 sm:pt-24 pb-24 sm:pb-36 overflow-hidden bg-[#093345]">
          {/* Background image & gradient overlay (placed ON TOP of light rays) */}
          <div className="absolute inset-0 z-0">
            {/* Light rays layer behind image */}
            <div className="rays" aria-hidden="true" style={{ opacity: 0.2 }}>
              <span /><span /><span /><span />
            </div>

            {/* Background image on top layer with crisp visibility */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-65"
              style={{ backgroundImage: "url('/leading/CDKWB.jpg')" }}
            />

            {/* Subtle gradient overlay for text readability without darkening image */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#093345]/85 via-[#093345]/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#093345]/20 to-[#093345]" />
          </div>

          {/* Animated bubbles */}
          <div className="bubbles z-10" aria-hidden="true" id="bubblesHero" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
            <div className="max-w-2xl">
              <span className="eyebrow text-xs" style={{ color: '#6FF3C8' }}>
                Dinas Kelautan dan Perikanan · Provinsi Jawa Tengah
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mt-4 sm:mt-5 mb-4 sm:mb-6 leading-[1.1]">
                Cabang Dinas Kelautan<br />Wilayah Barat
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Mewujudkan pengelolaan ruang laut yang berkelanjutan, aman, dan sejahtera untuk masa depan maritim Jawa Tengah.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-14">
                <Link href="#layanan" className="btn-coral-ocean justify-center text-center">
                  Jelajahi Layanan
                </Link>
                <button className="btn-ghost-ocean justify-center text-center">
                  <PlayCircle className="w-5 h-5 shrink-0" /> Tonton Video Profil
                </button>
              </div>
              {/* Scroll cue */}
              <div className="scroll-cue hidden sm:flex">
                <span className="scroll-line" />
                Selami halaman ini
              </div>
            </div>
          </div>

          {/* Dynamic Ocean Wave Divider at bottom of Hero (Seamless transition into Section 2) */}
          <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none overflow-hidden leading-none">
            <svg
              className="relative block w-full h-[40px] sm:h-[90px] md:h-[130px]"
              viewBox="0 0 1440 140"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Back wave layer with cyan glow */}
              <path
                d="M0,32 C280,120 520,10 800,80 C1080,150 1280,30 1440,60 L1440,140 L0,140 Z"
                fill="rgba(111, 243, 200, 0.2)"
              />
              {/* Middle wave layer */}
              <path
                d="M0,64 C360,-20 620,110 960,30 C1200,-30 1340,70 1440,90 L1440,140 L0,140 Z"
                fill="rgba(13, 85, 104, 0.6)"
              />
              {/* Front main wave layer matching Section 2 ocean-bg gradient seamlessly */}
              <path
                d="M0,85 C240,30 480,120 720,65 C960,10 1200,100 1440,50 L1440,140 L0,140 Z"
                fill="#1A7A8C"
              />
            </svg>
          </div>
        </section>

        {/* 2. Sekilas Layanan */}
        <section id="layanan" className="py-16 sm:py-24 relative">
          <div className="glow-particles" aria-hidden="true" id="glowLayanan" />
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
            <div className="text-center mb-12 sm:mb-16">
              <span className="eyebrow" style={{ color: '#6FF3C8' }}>Zona Dangkal</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3 sm:mt-4 mb-2">Sekilas Layanan</h2>
              <p className="text-xs sm:text-sm mt-2 sm:mt-3" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Layanan inti untuk nelayan, pelaku usaha, dan masyarakat pesisir.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ServiceCard icon={Ship} title="Layanan SUOP & E-SLO" desc="Fasilitas perizinan dan administrasi kapal perikanan." num="01" />
              <ServiceCard icon={Waves} title="Kawasan Konservasi" desc="Pelestarian alam laut dan rehabilitasi ekosistem mangrove." num="02" />
              <ServiceCard icon={FileText} title="Kehumasan" desc="Publikasi media dan penyediaan informasi untuk publik." num="03" />
              <ServiceCard icon={Users} title="Kerja Sama" desc="Kemitraan strategis lintas sektor dan antar instansi." num="04" />
            </div>
          </div>
        </section>

        {/* 3. Berita & Kegiatan Terbaru */}
        <section className="py-16 sm:py-24 relative">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
              <div>
                <span className="eyebrow" style={{ color: '#6FF3C8' }}>Zona Twilight · Terkini</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3 sm:mt-4 mb-2">Berita &amp; Kegiatan Terbaru</h2>
                <p className="text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Pembaruan aktivitas dan dokumentasi lapangan terkini.</p>
              </div>
              <Link href="/news" className="text-xs sm:text-sm font-semibold flex items-center gap-1 transition-colors hover:text-white self-start sm:self-auto" style={{ color: '#6FF3C8' }}>
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {news.map((item: any, index: number) => {
                const isEven = index % 2 === 0;
                return (
                  <Link
                    href={`/news/${item.Slug}`}
                    key={item.ID_berita}
                    className={`group relative flex flex-col h-[400px] sm:h-[450px] rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(111,243,200,0.15)] ${!isEven ? 'lg:mt-12' : ''}`}
                    style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    {/* Background Image with Slow Zoom on Hover */}
                    <Image
                      src={item.image || '/leading/berita.png'}
                      alt={item.Judul}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    
                    {/* Rich Deep Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030B14] via-[#030B14]/80 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                    
                    {/* Floating Glassmorphism Badge */}
                    <div className="absolute top-6 right-6 z-20">
                      <span className="backdrop-blur-md bg-white/10 border border-white/20 text-white text-[10px] sm:text-xs font-semibold px-4 py-2 rounded-full shadow-lg uppercase tracking-widest">
                        Terkini
                      </span>
                    </div>

                    {/* Animated Content Container */}
                    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end z-20 transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                      {/* Meta Information */}
                      <div className="flex items-center gap-4 mb-4 text-xs font-medium text-gray-300">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-[#6FF3C8]" />
                          <span>{new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="w-4 h-4 text-[#6FF3C8]" />
                          <span>{item.penulis || 'Admin CDKWB'}</span>
                        </div>
                      </div>
                      
                      {/* Title with color transition */}
                      <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-4 line-clamp-3 group-hover:text-[#6FF3C8] transition-colors duration-300">
                        {item.Judul}
                      </h3>
                      
                      {/* Interactive Reveal Button */}
                      <div className="flex items-center gap-2 text-[#6FF3C8] text-sm font-bold uppercase tracking-wider opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                        Baca Selengkapnya
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                );
              })}

              {news.length === 0 && (
                <div className="col-span-1 md:col-span-2 text-center py-16 sm:py-20 rounded-2xl ocean-card">
                  <p style={{ color: 'rgba(255,255,255,0.45)' }}>Belum ada berita terbaru.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. Portal Layanan Terpadu */}
        <section className="relative pt-20 sm:pt-28 pb-16 sm:pb-24 text-center overflow-hidden">
          <div className="glow-particles" aria-hidden="true" id="glowPortal" />
          {/* Decorative rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full pointer-events-none" style={{ border: '1px solid rgba(255,255,255,0.05)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full pointer-events-none" style={{ border: '1px solid rgba(255,255,255,0.04)' }} />

          <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-3xl flex flex-col items-center">
            <span className="eyebrow mb-3 sm:mb-4" style={{ color: '#6FF3C8' }}>Zona Tengah Malam</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
              Portal Layanan Terpadu
            </h2>
            <p className="text-sm sm:text-lg mb-8 sm:mb-10 leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Akses cepat ke berbagai layanan publik, informasi kelautan terpusat, dan pelaporan perizinan untuk wilayah barat dalam satu platform terintegrasi.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link href="#" className="btn-coral-ocean justify-center text-center">
                Akses Portal Sekarang <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#" className="btn-ghost-ocean justify-center text-center">
                Unduh Buku Panduan
              </Link>
            </div>
          </div>
        </section>

        {/* Footer (abyss zone) */}
        <Footer />
      </div>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, desc, num }: { icon: any; title: string; desc: string; num: string }) {
  return (
    <div className="ocean-card flex flex-col items-center text-center p-8" style={{ transition: 'all 0.3s ease' }}>
      <span className="mb-3 text-xs font-mono" style={{ color: 'rgba(111,243,200,0.7)' }}>{num}</span>
      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
        <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{desc}</p>
    </div>
  );
}
