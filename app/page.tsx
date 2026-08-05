import { pool } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DepthGauge from '@/components/DepthGauge';
import { ArrowRight, PlayCircle, Ship, Waves, ShieldAlert, FileText } from 'lucide-react';

async function getPublishedNews() {
  try {
    const [rows]: any = await pool.query(
      "SELECT ID_berita, Judul, Slug, image, isi_berita, tanggal, penulis FROM berita WHERE status = 'published' AND (type = 'berita' OR type IS NULL) ORDER BY tanggal DESC LIMIT 2"
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
        <section className="relative min-h-screen flex items-center pt-24 pb-32 overflow-hidden">
          {/* Light rays */}
          <div className="rays" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
          {/* Animated bubbles (populated by DepthGauge client component) */}
          <div className="bubbles" aria-hidden="true" id="bubblesHero" />
          {/* Background image */}
          <div
            className="absolute inset-0 z-0 opacity-20 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/leading/latar%20belakang.png')" }}
          />

          <div className="container mx-auto px-6 relative z-10 max-w-6xl">
            <div className="max-w-2xl">
              <span className="eyebrow" style={{ color: '#6FF3C8' }}>
                Dinas Kelautan dan Perikanan · Provinsi Jawa Tengah
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mt-5 mb-6 leading-[1.08]">
                Cabang Dinas Kelautan<br />Wilayah Barat
              </h1>
              <p className="text-lg md:text-xl mb-10 leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Mewujudkan pengelolaan ruang laut yang berkelanjutan, aman, dan sejahtera untuk masa depan maritim Jawa Tengah.
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-14">
                <Link href="#layanan" className="btn-coral-ocean">
                  Jelajahi Layanan
                </Link>
                <button className="btn-ghost-ocean">
                  <PlayCircle className="w-5 h-5" /> Tonton Video Profil
                </button>
              </div>
              {/* Scroll cue */}
              <div className="scroll-cue">
                <span className="scroll-line" />
                Selami halaman ini
              </div>
            </div>
          </div>
        </section>

        {/* 2. Sekilas Layanan */}
        <section id="layanan" className="py-24 relative">
          <div className="glow-particles" aria-hidden="true" id="glowLayanan" />
          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <div className="text-center mb-16">
              <span className="eyebrow" style={{ color: '#6FF3C8' }}>Zona Dangkal</span>
              <h2 className="text-3xl font-bold text-white mt-4 mb-2">Sekilas Layanan</h2>
              <p className="text-sm mt-3" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Layanan inti untuk nelayan, pelaku usaha, dan masyarakat pesisir.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ServiceCard icon={Ship}        title="Perizinan Kapal" desc="Layanan administrasi perikanan tangkap."    num="01" />
              <ServiceCard icon={Waves}       title="Konservasi"      desc="Program pelestarian ekosistem laut."         num="02" />
              <ServiceCard icon={ShieldAlert} title="Pengawasan"      desc="Patroli dan keamanan wilayah pesisir."       num="03" />
              <ServiceCard icon={FileText}    title="Data & Info"     desc="Statistik dan informasi publik kelautan."   num="04" />
            </div>
          </div>
        </section>

        {/* 3. Berita & Kegiatan Terbaru */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="eyebrow" style={{ color: '#6FF3C8' }}>Zona Twilight · Terkini</span>
                <h2 className="text-3xl font-bold text-white mt-4 mb-2">Berita &amp; Kegiatan Terbaru</h2>
                <p style={{ color: 'rgba(255,255,255,0.55)' }}>Pembaruan aktivitas dan dokumentasi lapangan terkini.</p>
              </div>
              <Link href="/news" className="text-sm font-semibold flex items-center gap-1 transition-colors hover:text-white" style={{ color: '#6FF3C8' }}>
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.map((item: any) => {
                return (
                  <Link
                    href={`/news/${item.Slug}`}
                    key={item.ID_berita}
                    className="group relative block h-80 rounded-2xl overflow-hidden transition-transform hover:-translate-y-1"
                    style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <Image
                      src={item.image || '/leading/berita.png'}
                      alt={item.Judul}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #030B14 0%, rgba(10,42,64,0.55) 50%, transparent 100%)' }} />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded" style={{ background: 'rgba(255,122,89,0.85)' }}>
                          {item.penulis || 'Reynard'}
                        </span>
                        <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
                          {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white leading-tight line-clamp-2">{item.Judul}</h3>
                    </div>
                  </Link>
                );
              })}

              {news.length === 0 && (
                <div className="col-span-2 text-center py-20 rounded-2xl ocean-card">
                  <p style={{ color: 'rgba(255,255,255,0.45)' }}>Belum ada berita terbaru.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. Portal Layanan Terpadu */}
        <section className="relative pt-28 pb-24 text-center overflow-hidden">
          <div className="glow-particles" aria-hidden="true" id="glowPortal" />
          {/* Decorative rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ border: '1px solid rgba(255,255,255,0.05)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ border: '1px solid rgba(255,255,255,0.04)' }} />

          <div className="container mx-auto px-6 relative z-10 max-w-3xl flex flex-col items-center">
            <span className="eyebrow mb-4" style={{ color: '#6FF3C8' }}>Zona Tengah Malam</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Portal Layanan Terpadu
            </h2>
            <p className="text-lg mb-10 leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Akses cepat ke berbagai layanan publik, informasi kelautan terpusat, dan pelaporan perizinan untuk wilayah barat dalam satu platform terintegrasi.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="#" className="btn-coral-ocean">
                Akses Portal Sekarang <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#" className="btn-ghost-ocean">
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
