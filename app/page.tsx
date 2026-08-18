import { pool } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DepthGauge from '@/components/DepthGauge';
import { ArrowRight, PlayCircle, Ship, Waves, ShieldAlert, FileText, Users, Calendar, User, ChevronRight } from 'lucide-react';

async function getLeadingItems() {
  try {
    const [rows]: any = await pool.query(`
      SELECT 
        ID_berita as id, 
        Judul, 
        Slug, 
        image, 
        tanggal, 
        'berita' as type
      FROM berita 
      WHERE status = 'published' AND is_leading = 1
      
      UNION ALL
      
      SELECT 
        ID_artikel as id, 
        Judul, 
        Slug, 
        NULL as image, 
        tanggal, 
        'artikel' as type
      FROM artikel 
      WHERE status = 'published' AND is_leading = 1
      
      ORDER BY tanggal DESC
    `);
    return rows;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function HomePage() {
  const leadingItems = await getLeadingItems();

  return (
    <div className="min-h-screen font-sans">
      {/* Original Navbar */}
      <Navbar />

      {/* Depth Gauge sidebar — tracks scroll */}
      <DepthGauge />

      {/* ── Ocean gradient wrapper ── */}
      <div className="ocean-bg">

        {/* 1. Hero Section */}
        <section className="relative min-h-[90vh] sm:min-h-screen flex items-center pt-32 sm:pt-40 pb-32 sm:pb-48 overflow-hidden bg-[#093345]">
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

          <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl flex flex-col items-center text-center">
            <div className="max-w-3xl flex flex-col items-center">
              <span className="eyebrow text-xs" style={{ color: '#6FF3C8' }}>
                Dinas Kelautan dan Perikanan · Provinsi Jawa Tengah
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mt-6 sm:mt-8 mb-6 sm:mb-8 leading-tight">
                Cabang Dinas Kelautan<br className="hidden sm:block" />Wilayah Barat
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-10 sm:mb-14 leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Mewujudkan pengelolaan ruang laut yang berkelanjutan, aman, dan sejahtera untuk masa depan maritim Jawa Tengah.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16 w-full">
                <Link href="#layanan" className="btn-coral-ocean justify-center text-center w-[260px]">
                  Jelajahi Layanan
                </Link>
                <button className="btn-ghost-ocean justify-center text-center w-[260px]">
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
            <div className="text-center mb-10 sm:mb-16">
              <span className="eyebrow" style={{ color: '#6FF3C8' }}>Zona Dangkal</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 sm:mt-4 mb-3">Sekilas Layanan</h2>
              <p className="text-sm sm:text-base mt-2 sm:mt-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
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
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
              <div>
                <span className="eyebrow" style={{ color: '#6FF3C8' }}>Zona Twilight · Terkini</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 sm:mt-4 mb-3">Berita &amp; Kegiatan Terbaru</h2>
                <p className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>Pembaruan aktivitas dan dokumentasi lapangan terkini.</p>
              </div>
              <Link href="/news" className="text-xs sm:text-sm font-semibold flex items-center gap-1 transition-colors hover:text-white self-start sm:self-auto" style={{ color: '#6FF3C8' }}>
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 lg:gap-8 pb-12 pt-4 px-4 -mx-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {leadingItems.map((item: any, index: number) => {
                const linkHref = item.type === 'artikel' ? `/artikel/${item.Slug}` : `/news/${item.Slug}`;
                return (
                  <Link
                    href={linkHref}
                    key={`${item.type}-${item.id}`}
                    className="group relative flex flex-col h-[380px] sm:h-[420px] md:h-[480px] w-[85vw] sm:w-[350px] md:w-[400px] lg:w-[450px] shrink-0 snap-center sm:snap-start overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(111,243,200,0.25)] border border-white/10 hover:border-[#6FF3C8]/40"
                    style={{ 
                      borderRadius: '40px 10px 40px 10px', // Organic wave-like shape
                      animation: `floatBob ${6 + (index % 3)}s ease-in-out infinite ${index * 0.5}s` 
                    }}
                  >
                    {/* Inline style for the float animation to avoid touching globals.css for now */}
                    <style dangerouslySetInnerHTML={{__html: `
                      @keyframes floatBob {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-8px); }
                      }
                    `}} />

                    {/* Background Image with Marine Tint and Subtle Zoom */}
                    <div className="absolute inset-0 w-full h-[65%] overflow-hidden rounded-t-[40px] rounded-tr-[10px]">
                      <Image
                        src={item.image || '/leading/berita.png'}
                        alt={item.Judul}
                        fill
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                      {/* Deep sea tint over the image */}
                      <div className="absolute inset-0 bg-[#093345]/40 group-hover:bg-[#093345]/10 transition-colors duration-700" />
                    </div>
                    
                    {/* Wave Divider (Marine aesthetic) */}
                    <div className="absolute top-[64%] left-0 w-full overflow-hidden leading-none z-10 translate-y-[-99%] pointer-events-none">
                      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[60px]">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.29,15.11,105,29.35,159.21,41.97,212.79,54.49,266.69,65.34,321.39,56.44Z" fill="#030B14"></path>
                      </svg>
                    </div>

                    {/* Bottom Content Area */}
                    <div className="absolute bottom-0 left-0 w-full h-[40%] bg-[#030B14] group-hover:bg-[#05111D] transition-colors duration-500 z-0 rounded-b-[40px] rounded-bl-[10px]" />

                    {/* Floating Glassmorphism Badge */}
                    <div className="absolute top-6 right-6 z-20">
                      <span className="backdrop-blur-md bg-[#093345]/50 border border-[#6FF3C8]/20 text-[#6FF3C8] text-[10px] font-bold px-4 py-2 rounded-full shadow-lg uppercase tracking-widest group-hover:bg-[#6FF3C8]/10 group-hover:border-[#6FF3C8]/40 transition-colors duration-500">
                        {item.type === 'artikel' ? 'Artikel' : 'Berita'}
                      </span>
                    </div>

                    {/* Animated Content Container with Ample Space */}
                    <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10 flex flex-col justify-end z-20 transition-transform duration-500 translate-y-2 group-hover:translate-y-0 h-full">
                      <div className="mt-auto">
                        {/* Meta Information (Styled like marine tags) */}
                        <div className="flex items-center gap-4 mb-5 text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                          <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full group-hover:border-[#6FF3C8]/20 transition-colors">
                            <Calendar className="w-3.5 h-3.5 text-[#6FF3C8]" />
                            <span>{new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full group-hover:border-[#6FF3C8]/20 transition-colors">
                            <User className="w-3.5 h-3.5 text-[#6FF3C8]" />
                            <span className="truncate max-w-[100px] sm:max-w-[120px]">{item.penulis || 'Admin'}</span>
                          </div>
                        </div>
                        
                        {/* Title with elegant typography, no excessive sizing */}
                        <h3 className="text-lg sm:text-xl font-semibold text-white/90 leading-relaxed mb-6 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6FF3C8] group-hover:to-cyan-300 transition-all duration-300">
                          {item.Judul}
                        </h3>
                        
                        {/* Interactive Reveal Button */}
                        <div className="flex items-center gap-2 text-[#6FF3C8] text-xs font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1">
                          Arungi Lebih Jauh
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}

              {leadingItems.length === 0 && (
                <div className="w-full text-center py-16 sm:py-20 rounded-2xl ocean-card">
                  <p style={{ color: 'rgba(255,255,255,0.45)' }}>Belum ada informasi terbaru yang ditampilkan.</p>
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 sm:mb-6 tracking-tight leading-tight">
              Portal Layanan Terpadu
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 leading-relaxed max-w-2xl px-4 sm:px-0" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Akses cepat ke berbagai layanan publik, informasi kelautan terpusat, dan pelaporan perizinan untuk wilayah barat dalam satu platform terintegrasi.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
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
    <div className="ocean-card flex flex-col items-center text-center p-6 sm:p-8" style={{ transition: 'all 0.3s ease' }}>
      <span className="mb-3 text-xs font-mono" style={{ color: 'rgba(111,243,200,0.7)' }}>{num}</span>
      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
        <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{desc}</p>
    </div>
  );
}
