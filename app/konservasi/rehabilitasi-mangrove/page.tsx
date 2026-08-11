'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Leaf, TreePine, Droplets, Globe, Users, BarChart3, ChevronRight, Wind, Sun, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const useInView = (threshold = 0.15) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, isVisible] as const;
};

const stats = [
  { value: '125.000+', unit: 'Bibit', label: 'Ditanam Sejak 2018', icon: <Leaf className="w-5 h-5" /> },
  { value: '48', unit: 'Ha', label: 'Lahan Rehabilitasi', icon: <Globe className="w-5 h-5" /> },
  { value: '85%', unit: '', label: 'Tingkat Keberhasilan', icon: <BarChart3 className="w-5 h-5" /> },
  { value: '12', unit: 'Desa', label: 'Desa Binaan', icon: <Users className="w-5 h-5" /> },
];

const stages = [
  {
    number: '01',
    title: 'Survei & Perencanaan',
    desc: 'Identifikasi lokasi degradasi mangrove, analisis kondisi substrat, dan perencanaan zonasi penanaman berdasarkan jenis spesies yang cocok.',
    color: 'from-emerald-400 to-teal-500',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    number: '02',
    title: 'Pembibitan',
    desc: 'Pengembangan bibit mangrove di persemaian lokal yang dikelola masyarakat, melibatkan petani mangrove terlatih untuk menjaga kualitas bibit.',
    color: 'from-teal-400 to-cyan-500',
    bg: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
  {
    number: '03',
    title: 'Penanaman',
    desc: 'Penanaman dilakukan secara sistematis dengan jarak tanam optimal, menggunakan metode tabela (tanam benih langsung) dan transplantasi bibit.',
    color: 'from-cyan-400 to-sky-500',
    bg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
  },
  {
    number: '04',
    title: 'Monitoring & Pemeliharaan',
    desc: 'Pemantauan pertumbuhan, penyulaman tanaman yang mati, dan evaluasi berkala setiap 3 bulan untuk memastikan keberhasilan program.',
    color: 'from-sky-400 to-blue-500',
    bg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
];

const benefits = [
  {
    icon: <Shield className="w-8 h-8 text-emerald-600" />,
    title: 'Perlindungan Pantai',
    desc: 'Mangrove berfungsi sebagai sabuk hijau yang melindungi garis pantai dari abrasi, gelombang tinggi, dan intrusi air laut.',
    bg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
    border: 'border-emerald-100',
  },
  {
    icon: <Droplets className="w-8 h-8 text-blue-600" />,
    title: 'Penyerap Karbon',
    desc: 'Hutan mangrove mampu menyerap karbon 4–5 kali lebih efisien dibanding hutan tropis daratan, berkontribusi pada mitigasi perubahan iklim.',
    bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    border: 'border-blue-100',
  },
  {
    icon: <TreePine className="w-8 h-8 text-teal-600" />,
    title: 'Habitat Biota',
    desc: 'Akar mangrove menyediakan tempat berlindung dan memijah bagi ikan, kepiting, udang, dan berbagai biota pesisir yang bernilai ekonomi.',
    bg: 'bg-gradient-to-br from-teal-50 to-green-50',
    border: 'border-teal-100',
  },
  {
    icon: <Users className="w-8 h-8 text-violet-600" />,
    title: 'Pemberdayaan Masyarakat',
    desc: 'Program melibatkan nelayan lokal sebagai pengelola, membuka lapangan kerja hijau dan meningkatkan pendapatan masyarakat pesisir.',
    bg: 'bg-gradient-to-br from-violet-50 to-purple-50',
    border: 'border-violet-100',
  },
  {
    icon: <Wind className="w-8 h-8 text-amber-600" />,
    title: 'Pemecah Angin',
    desc: 'Vegetasi mangrove yang lebat berperan sebagai windbreaker alami yang melindungi pemukiman dan tambak dari angin kencang musim barat.',
    bg: 'bg-gradient-to-br from-amber-50 to-yellow-50',
    border: 'border-amber-100',
  },
  {
    icon: <Sun className="w-8 h-8 text-orange-600" />,
    title: 'Ekowisata',
    desc: 'Hutan mangrove yang pulih membuka peluang ekowisata berbasis komunitas — jelajah mangrove, wisata edukasi, dan spot fotografi alam.',
    bg: 'bg-gradient-to-br from-orange-50 to-amber-50',
    border: 'border-orange-100',
  },
];

const species = [
  { name: 'Rhizophora apiculata', local: 'Bakau Kurap', habitat: 'Zona intertidal tengah-bawah' },
  { name: 'Avicennia marina', local: 'Api-api', habitat: 'Zona supratidal, toleran garam tinggi' },
  { name: 'Sonneratia caseolaris', local: 'Pedada', habitat: 'Zona intertidal atas, tepi sungai' },
  { name: 'Bruguiera gymnorrhiza', local: 'Tancang', habitat: 'Zona intertidal tengah, substrat berlumpur' },
  { name: 'Ceriops tagal', local: 'Tengar', habitat: 'Zona intertidal atas, substrat berpasir' },
];

export default function RehabilitasiMangrovePage() {
  const [heroRef, heroVisible] = useInView(0.1);
  const [statsRef, statsVisible] = useInView(0.1);
  const [stagesRef, stagesVisible] = useInView(0.1);
  const [benefitsRef, benefitsVisible] = useInView(0.1);
  const [speciesRef, speciesVisible] = useInView(0.1);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#052e16]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 20% 80%, #16a34a 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 20%, #0d9488 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 50% 50%, #15803d20 0%, transparent 80%)',
            }}
          />
        </div>

        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=1920&auto=format&fit=crop')" }}
        />

        {/* Animated leaves */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400/20 text-2xl select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sway ${3 + Math.random() * 4}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${16 + Math.random() * 16}px`,
            }}
          >
            🌿
          </div>
        ))}

        <div ref={heroRef} className="relative z-10 container mx-auto px-6 py-24">
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-white/50 text-sm mb-8 transition-all duration-700"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)' }}
          >
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Konservasi</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Rehabilitasi Mangrove</span>
          </div>

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-medium mb-6 transition-all duration-700 delay-100"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)' }}
          >
            <Leaf className="w-3 h-3 text-green-400" />
            Program Konservasi Pesisir
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 transition-all duration-700 delay-200"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)' }}
          >
            Rehabilitasi<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
              Hutan Mangrove
            </span>
          </h1>

          <p
            className="text-lg text-white/70 max-w-2xl leading-relaxed mb-10 transition-all duration-700 delay-300"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)' }}
          >
            Program rehabilitasi mangrove CDKWB untuk memulihkan ekosistem pesisir yang terdegradasi,
            melindungi garis pantai, dan memberdayakan masyarakat nelayan di wilayah Batang dan Pekalongan.
          </p>

          <div
            className="flex flex-wrap gap-3 transition-all duration-700 delay-400"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)' }}
          >
            {['125.000+ Bibit Ditanam', '48 Ha Lahan Rehabilitasi', '12 Desa Terlibat'].map((tag, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic Ocean Wave Divider at bottom of Hero */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none overflow-hidden leading-none">
          <svg
            className="relative block w-full h-[55px] sm:h-[100px] md:h-[130px]"
            viewBox="0 0 1440 130"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="mangrove-wave-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#059669" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="mangrove-wave-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#047857" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#0d9488" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#15803d" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="mangrove-wave-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4ade80" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#a3e635" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="mangrove-wave-grad-front" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#047857" stopOpacity="1" />
                <stop offset="50%" stopColor="#065f46" stopOpacity="1" />
                <stop offset="100%" stopColor="#064e3b" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Back glowing wave layer */}
            <path
              d="M0,20 C320,110 580,0 880,70 C1140,135 1320,20 1440,50 L1440,130 L0,130 Z"
              fill="url(#mangrove-wave-grad-3)"
            />
            {/* Middle vibrant wave layer */}
            <path
              d="M0,40 C280,105 520,15 800,75 C1080,130 1280,25 1440,55 L1440,130 L0,130 Z"
              fill="url(#mangrove-wave-grad-1)"
            />
            {/* Main rich wave layer */}
            <path
              d="M0,65 C360,-15 620,95 960,25 C1200,-15 1340,65 1440,80 L1440,130 L0,130 Z"
              fill="url(#mangrove-wave-grad-2)"
            />
            {/* Front main wave layer with green gradient */}
            <path
              d="M0,85 C240,30 480,105 720,55 C960,10 1200,85 1440,45 L1440,130 L0,130 Z"
              fill="url(#mangrove-wave-grad-front)"
            />
          </svg>
        </div>
      </section>

      {/* ── STATS SECTION WITH SMOOTH GRADIENT TRANSITION ── */}
      <section className="pt-10 pb-16 bg-gradient-to-b from-[#064e3b] via-[#ecfdf5]/80 to-white relative z-30">
        <div
          ref={statsRef}
          className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg shadow-green-900/10 p-6 text-center border border-gray-100 transition-all duration-700"
              style={{
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-3 text-emerald-600">
                {s.icon}
              </div>
              <div className="text-2xl font-bold text-[#052e16]">
                {s.value}<span className="text-base font-medium text-gray-400 ml-1">{s.unit}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTRO TEXT ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <span className="inline-block bg-emerald-50 text-emerald-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            Tentang Program
          </span>
          <h2 className="text-3xl font-bold text-[#052e16] mb-6">
            Mengembalikan Sabuk Hijau Pesisir
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Degradasi hutan mangrove di pesisir Jawa Tengah telah menyebabkan abrasi yang mengancam
            pemukiman, tambak, dan infrastruktur pesisir. CDKWB merespons dengan program rehabilitasi
            mangrove skala besar yang menggabungkan pendekatan ekologis, sosial, dan ekonomi secara terpadu.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Sejak 2018, program ini telah menanam lebih dari 125.000 bibit mangrove dari berbagai spesies
            asli di 48 hektare lahan terdegradasi, melibatkan 12 desa pesisir sebagai mitra aktif dalam
            pengelolaan dan pemantauan kawasan.
          </p>
        </div>
      </section>

      {/* ── STAGES ── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div
            ref={stagesRef}
            className="transition-all duration-700"
            style={{ opacity: stagesVisible ? 1 : 0, transform: stagesVisible ? 'translateY(0)' : 'translateY(30px)' }}
          >
            <div className="text-center mb-14">
              <span className="inline-block bg-teal-50 text-teal-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
                Tahapan Program
              </span>
              <h2 className="text-3xl font-bold text-[#052e16] mb-4">Proses Rehabilitasi</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Dari perencanaan hingga pemantauan — setiap tahap dilakukan dengan pendekatan
                ilmiah dan pelibatan aktif komunitas pesisir.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stages.map((stage, i) => (
                <div
                  key={i}
                  className="relative bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  style={{
                    opacity: stagesVisible ? 1 : 0,
                    transform: stagesVisible ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: `${i * 120}ms`,
                  }}
                >
                  {/* Number accent */}
                  <div className={`text-6xl font-black bg-gradient-to-br ${stage.color} bg-clip-text text-transparent opacity-10 absolute top-4 right-4 leading-none`}>
                    {stage.number}
                  </div>
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${stage.bg} ${stage.iconColor} font-bold text-sm mb-4`}>
                    {stage.number}
                  </div>
                  <h3 className="font-bold text-[#052e16] mb-3">{stage.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{stage.desc}</p>
                  {i < stages.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-5 h-5 text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div
            ref={benefitsRef}
            className="transition-all duration-700"
            style={{ opacity: benefitsVisible ? 1 : 0, transform: benefitsVisible ? 'translateY(0)' : 'translateY(30px)' }}
          >
            <div className="text-center mb-14">
              <span className="inline-block bg-green-50 text-green-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
                Manfaat Program
              </span>
              <h2 className="text-3xl font-bold text-[#052e16] mb-4">
                Mengapa Mangrove Penting?
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Hutan mangrove adalah ekosistem multifungsi yang memberikan manfaat ekologis,
                ekonomi, dan sosial secara bersamaan.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border ${b.border} ${b.bg} p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
                  style={{
                    opacity: benefitsVisible ? 1 : 0,
                    transform: benefitsVisible ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <div className="mb-4">{b.icon}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECIES TABLE ── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div
            ref={speciesRef}
            className="transition-all duration-700"
            style={{ opacity: speciesVisible ? 1 : 0, transform: speciesVisible ? 'translateY(0)' : 'translateY(30px)' }}
          >
            <div className="text-center mb-12">
              <span className="inline-block bg-emerald-50 text-emerald-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
                Keanekaragaman Hayati
              </span>
              <h2 className="text-3xl font-bold text-[#052e16] mb-4">Spesies Mangrove yang Ditanam</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Program rehabilitasi menggunakan spesies mangrove asli yang sesuai dengan kondisi
                substrat dan salinitas di masing-masing lokasi.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-3 bg-emerald-600 text-white text-sm font-semibold px-6 py-4">
                <span>Nama Ilmiah</span>
                <span>Nama Lokal</span>
                <span className="hidden sm:block">Habitat Optimal</span>
              </div>
              {species.map((sp, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 px-6 py-4 text-sm border-b border-gray-50 hover:bg-emerald-50 transition-colors ${i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}`}
                  style={{
                    opacity: speciesVisible ? 1 : 0,
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <span className="italic text-gray-700 font-medium">{sp.name}</span>
                  <span className="text-gray-600">{sp.local}</span>
                  <span className="hidden sm:block text-gray-500">{sp.habitat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-to-br from-emerald-700 to-teal-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4">Ikut Berkontribusi</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Bergabunglah dalam program penanaman mangrove bersama komunitas dan relawan peduli lingkungan pesisir.
            Setiap bibit yang ditanam adalah investasi untuk generasi mendatang.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/kontak"
              className="bg-white text-emerald-700 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors inline-flex items-center gap-2"
            >
              Hubungi Kami
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pengaduan"
              className="border border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
            >
              Laporkan Kerusakan
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes sway {
          0% { transform: rotate(-10deg) translateY(0); }
          100% { transform: rotate(10deg) translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
