'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Fish, Waves, Shield, TreePine, Anchor, ChevronRight, Mountain, Wind, Sunset, Eye } from 'lucide-react';
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
  { value: '±71', unit: 'Ha', label: 'Luas Kawasan', icon: <MapPin className="w-5 h-5" /> },
  { value: '15+', unit: 'Spesies', label: 'Biota Laut', icon: <Fish className="w-5 h-5" /> },
  { value: '2', unit: 'Zona', label: 'Zonasi Kawasan', icon: <Shield className="w-5 h-5" /> },
  { value: '±8', unit: 'km', label: 'Dari Pusat Kota', icon: <Mountain className="w-5 h-5" /> },
];

const highlights = [
  {
    icon: <Mountain className="w-7 h-7 text-amber-500" />,
    title: 'Tanjung Bersejarah',
    desc: 'Ujungnegoro merupakan tanjung yang memiliki nilai sejarah dan spiritual tinggi bagi masyarakat Batang, dengan situs-situs peninggalan leluhur yang masih dijaga.',
    bg: 'bg-amber-50',
  },
  {
    icon: <Waves className="w-7 h-7 text-blue-500" />,
    title: 'Perairan Kaya Biota',
    desc: 'Perpaduan unik antara ekosistem berbatu dan terumbu karang alami menjadikan perairan Ujungnegoro sebagai habitat penting berbagai spesies ikan pelagis dan demersal.',
    bg: 'bg-blue-50',
  },
  {
    icon: <Eye className="w-7 h-7 text-purple-500" />,
    title: 'Spot Pengamatan',
    desc: 'Titik pandang terbaik untuk menyaksikan keindahan laut Jawa, matahari terbenam, dan aktivitas nelayan tradisional yang masih berjalan harmonis.',
    bg: 'bg-purple-50',
  },
  {
    icon: <Anchor className="w-7 h-7 text-teal-500" />,
    title: 'Zona Rehabilitasi',
    desc: 'Program rehabilitasi aktif terumbu karang dan penanaman lamun dilakukan secara berkelanjutan untuk memulihkan ekosistem perairan yang terdampak.',
    bg: 'bg-teal-50',
  },
];

export default function UjungnegoroPage() {
  const [heroRef, heroVisible] = useInView(0.1);
  const [statsRef, statsVisible] = useInView(0.1);
  const [highlightsRef, highlightsVisible] = useInView(0.1);
  const [mapRef, mapVisible] = useInView(0.1);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#1a0a3e]">
        {/* Gradient overlays */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 30% 80%, #6d28d9 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 10%, #0ea5e9 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 50% 50%, #f59e0b20 0%, transparent 80%)',
            }}
          />
        </div>

        {/* Bg image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop')" }}
        />

        {/* Floating orbs */}
        {[
          { size: 300, x: 10, y: 60, color: '#6d28d9' },
          { size: 200, x: 80, y: 20, color: '#0ea5e9' },
          { size: 150, x: 50, y: 80, color: '#f59e0b' },
        ].map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              background: orb.color,
              animation: `drift ${5 + i * 2}s ease-in-out infinite alternate`,
              animationDelay: `${i}s`,
            }}
          />
        ))}

        <div ref={heroRef} className="relative z-10 container mx-auto px-6 py-24">
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-white/50 text-sm mb-8 transition-all duration-700"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)' }}
          >
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="hover:text-white transition-colors cursor-pointer">Konservasi</span>
            <ChevronRight className="w-3 h-3" />
            <span className="hover:text-white transition-colors cursor-pointer">Kawasan Konservasi</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Ujungnegoro</span>
          </div>

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-medium mb-6 transition-all duration-700 delay-100"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)' }}
          >
            <Anchor className="w-3 h-3" />
            Kawasan Konservasi Pesisir & Tanjung
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 transition-all duration-700 delay-200"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)' }}
          >
            Tanjung Konservasi<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-purple-400">
              Ujungnegoro
            </span>
          </h1>

          <p
            className="text-lg text-white/70 max-w-2xl leading-relaxed mb-10 transition-all duration-700 delay-300"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)' }}
          >
            Kawasan konservasi pesisir bersejarah di Kabupaten Batang — perpaduan unik antara warisan
            budaya leluhur dan kekayaan ekosistem laut yang dijaga secara berkelanjutan.
          </p>

          <div
            className="flex flex-wrap gap-4 transition-all duration-700 delay-400"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)' }}
          >
            <div className="flex items-center gap-2 text-white/70 text-sm bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              Kabupaten Batang, Jawa Tengah
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
              <Sunset className="w-4 h-4 text-orange-400" />
              Sunset Terbaik Pesisir Utara Jawa
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
              <Wind className="w-4 h-4 text-blue-400" />
              Terbuka Sepanjang Tahun
            </div>
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
              <linearGradient id="ujung-wave-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#ec4899" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="ujung-wave-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#4338ca" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="ujung-wave-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.55" />
                <stop offset="50%" stopColor="#fb923c" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.45" />
              </linearGradient>
            </defs>

            {/* Back glowing wave layer */}
            <path
              d="M0,20 C320,110 580,0 880,70 C1140,135 1320,20 1440,50 L1440,130 L0,130 Z"
              fill="url(#ujung-wave-grad-3)"
            />
            {/* Middle vibrant wave layer */}
            <path
              d="M0,40 C280,105 520,15 800,75 C1080,130 1280,25 1440,55 L1440,130 L0,130 Z"
              fill="url(#ujung-wave-grad-1)"
            />
            {/* Main rich wave layer */}
            <path
              d="M0,65 C360,-15 620,95 960,25 C1200,-15 1340,65 1440,80 L1440,130 L0,130 Z"
              fill="url(#ujung-wave-grad-2)"
            />
            {/* Front main wave layer matching white content section below */}
            <path
              d="M0,85 C240,30 480,105 720,55 C960,10 1200,85 1440,45 L1440,130 L0,130 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="pt-6 pb-16 bg-white relative z-30">
        <div
          ref={statsRef}
          className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg shadow-purple-900/10 p-6 text-center border border-gray-100 transition-all duration-700"
              style={{
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mx-auto mb-3 text-purple-600">
                {s.icon}
              </div>
              <div className="text-3xl font-bold text-[#1a0a3e]">
                {s.value}<span className="text-base font-medium text-gray-400 ml-1">{s.unit}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div
            ref={highlightsRef}
            className="transition-all duration-700"
            style={{ opacity: highlightsVisible ? 1 : 0, transform: highlightsVisible ? 'translateY(0)' : 'translateY(30px)' }}
          >
            <div className="text-center mb-14">
              <span className="inline-block bg-amber-50 text-amber-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
                Keunggulan Kawasan
              </span>
              <h2 className="text-3xl font-bold text-[#1a0a3e] mb-4">
                Keistimewaan Ujungnegoro
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Kawasan pesisir yang menyatukan nilai budaya, sejarah, dan kekayaan alam laut
                dalam satu hamparan konservasi yang unik.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((f, i) => (
                <div
                  key={i}
                  className="group rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  style={{
                    opacity: highlightsVisible ? 1 : 0,
                    transform: highlightsVisible ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: `${100 + i * 100}ms`,
                  }}
                >
                  <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-[#1a0a3e] mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/20">
                <img
                  src="https://images.unsplash.com/photo-1439405326854-014607f694d7?q=80&w=900&auto=format&fit=crop"
                  alt="Pantai Ujungnegoro"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <TreePine className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Status Perlindungan</p>
                  <p className="font-bold text-[#1a0a3e]">KKP Daerah</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-block bg-purple-50 text-purple-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
                Tentang Kawasan
              </span>
              <h2 className="text-3xl font-bold text-[#1a0a3e] mb-6 leading-tight">
                Tanjung yang Menyimpan<br />
                <span className="text-amber-600">Seribu Cerita</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Kawasan Konservasi Ujungnegoro terletak di pesisir utara Kabupaten Batang, Jawa Tengah.
                  Sebagai sebuah tanjung, kawasan ini memiliki karakteristik unik berupa perpaduan habitat
                  berbatu, terumbu karang, dan padang lamun yang membentuk ekosistem pesisir yang kaya.
                </p>
                <p>
                  Secara budaya, Ujungnegoro dikenal sebagai tempat yang memiliki nilai spiritual bagi
                  masyarakat setempat. Situs Goa Aswatama dan berbagai peninggalan arkeologi menjadi daya
                  tarik tersendiri yang memperkaya dimensi konservasi kawasan ini.
                </p>
                <p>
                  Program konservasi yang dijalankan CDKWB di kawasan ini berfokus pada perlindungan
                  habitat pesisir, monitoring biota laut, dan pengembangan wisata bahari berbasis
                  konservasi yang melibatkan masyarakat nelayan lokal.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: 'Status', value: 'Kawasan Konservasi Perairan Daerah' },
                  { label: 'Pengelola', value: 'CDKWB Batang-Pekalongan' },
                  { label: 'Koordinat', value: '6°52\'S, 109°76\'E' },
                  { label: 'Akses', value: 'Jalan darat 8 km dari pusat kota' },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                    <p className="text-sm font-semibold text-[#1a0a3e]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="py-20 bg-white" ref={mapRef}>
        <div className="container mx-auto px-6">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: mapVisible ? 1 : 0, transform: mapVisible ? 'translateY(0)' : 'translateY(30px)' }}
          >
            <span className="inline-block bg-amber-50 text-amber-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              Lokasi Kawasan
            </span>
            <h2 className="text-3xl font-bold text-[#1a0a3e] mb-4">Peta Kawasan Ujungnegoro</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Temukan lokasi Kawasan Konservasi Ujungnegoro di tanjung pesisir utara Kabupaten Batang.
            </p>
          </div>

          <div
            className="rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/10 border border-gray-100 transition-all duration-700 delay-200"
            style={{ opacity: mapVisible ? 1 : 0, transform: mapVisible ? 'scale(1)' : 'scale(0.97)' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15838.61!2d109.7604!3d-6.8749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e700b86a3c6f4b1%3A0x4b1a1c2d3e4f5a6b!2sUjungnegoro%2C+Batang%2C+Jawa+Tengah!5e0!3m2!1sid!2sid!4v1699999999"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Kawasan Ujungnegoro"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <a
              href="https://maps.google.com/?q=Ujungnegoro+Batang+Jawa+Tengah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1a0a3e] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#2d1a5e] transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Buka di Google Maps
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, -20px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
