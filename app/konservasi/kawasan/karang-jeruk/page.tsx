'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Fish, Waves, Shield, TreePine, Camera, ChevronRight, Anchor, Sun, Wind } from 'lucide-react';
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
  { value: '54,8', unit: 'Ha', label: 'Luas Kawasan', icon: <MapPin className="w-5 h-5" /> },
  { value: '12+', unit: 'Spesies', label: 'Terumbu Karang', icon: <Waves className="w-5 h-5" /> },
  { value: '30+', unit: 'Spesies', label: 'Ikan Karang', icon: <Fish className="w-5 h-5" /> },
  { value: '2015', unit: '', label: 'Tahun Penetapan', icon: <Shield className="w-5 h-5" /> },
];

const features = [
  {
    icon: <Fish className="w-7 h-7 text-blue-500" />,
    title: 'Keanekaragaman Hayati',
    desc: 'Rumah bagi lebih dari 30 spesies ikan karang dan berbagai biota laut yang dilindungi, menjadikannya salah satu hotspot biodiversitas di pesisir Batang.',
    bg: 'bg-blue-50',
  },
  {
    icon: <Waves className="w-7 h-7 text-teal-500" />,
    title: 'Terumbu Karang',
    desc: 'Ekosistem terumbu karang yang kaya dengan tutupan karang hidup mencapai 40%, menjadi habitat penting bagi juvenil ikan dan berbagai invertebrata.',
    bg: 'bg-teal-50',
  },
  {
    icon: <Shield className="w-7 h-7 text-emerald-500" />,
    title: 'Zona Perlindungan',
    desc: 'Kawasan inti yang sepenuhnya dilindungi dari aktivitas destructive fishing, memastikan regenerasi alami ekosistem berjalan optimal.',
    bg: 'bg-emerald-50',
  },
  {
    icon: <Camera className="w-7 h-7 text-cyan-500" />,
    title: 'Wisata Edukasi',
    desc: 'Terbuka untuk kegiatan snorkeling, diving edukasi, dan penelitian ilmiah dengan izin khusus, mendukung kesadaran masyarakat terhadap konservasi laut.',
    bg: 'bg-cyan-50',
  },
];

export default function KarangJerukPage() {
  const [heroRef, heroVisible] = useInView(0.1);
  const [statsRef, statsVisible] = useInView(0.1);
  const [featuresRef, featuresVisible] = useInView(0.1);
  const [mapRef, mapVisible] = useInView(0.1);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#051d3a]">
        {/* Ocean animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 120%, #0ea5e9 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 20%, #06b6d4 0%, transparent 60%)',
            }}
          />
          {/* Wave layers */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute bottom-0 left-0 w-[200%] h-32 opacity-10"
              style={{
                background: 'linear-gradient(180deg, transparent, #0ea5e9)',
                borderRadius: '100% 100% 0 0',
                animation: `wave ${3 + i * 0.8}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.5}s`,
                bottom: `${i * 20}px`,
              }}
            />
          ))}
          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1920&auto=format&fit=crop')" }}
        />

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
            <span className="text-white">Karang Jeruk</span>
          </div>

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-medium mb-6 transition-all duration-700 delay-100"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)' }}
          >
            <Anchor className="w-3 h-3" />
            Kawasan Konservasi Perairan
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 transition-all duration-700 delay-200"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)' }}
          >
            Kawasan Konservasi<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
              Karang Jeruk
            </span>
          </h1>

          <p
            className="text-lg text-white/70 max-w-2xl leading-relaxed mb-10 transition-all duration-700 delay-300"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)' }}
          >
            Surga bawah laut di pesisir Kabupaten Batang, Jawa Tengah — kawasan konservasi
            perairan yang melindungi keanekaragaman hayati terumbu karang dan biota laut yang unik.
          </p>

          <div
            className="flex flex-wrap gap-4 transition-all duration-700 delay-400"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)' }}
          >
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Kabupaten Batang, Jawa Tengah
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Sun className="w-4 h-4 text-yellow-400" />
              Terbaik: Musim Kemarau (Apr–Sep)
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Wind className="w-4 h-4 text-blue-400" />
              Kedalaman: 3–15 meter
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs">Gulir ke bawah</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 bg-gradient-to-b from-[#051d3a] to-white relative">
        <div
          ref={statsRef}
          className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg shadow-blue-900/10 p-6 text-center border border-gray-100 transition-all duration-700"
              style={{
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3 text-blue-600">
                {s.icon}
              </div>
              <div className="text-3xl font-bold text-[#051d3a]">
                {s.value}<span className="text-base font-medium text-gray-400 ml-1">{s.unit}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div
            ref={featuresRef}
            className="transition-all duration-700"
            style={{ opacity: featuresVisible ? 1 : 0, transform: featuresVisible ? 'translateY(0)' : 'translateY(30px)' }}
          >
            <div className="text-center mb-14">
              <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
                Keunggulan Kawasan
              </span>
              <h2 className="text-3xl font-bold text-[#051d3a] mb-4">
                Mengapa Karang Jeruk Istimewa?
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Kawasan konservasi perairan yang menyimpan kekayaan biodiversitas laut yang luar biasa
                di perairan utara Jawa Tengah.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="group rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  style={{
                    opacity: featuresVisible ? 1 : 0,
                    transform: featuresVisible ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: `${100 + i * 100}ms`,
                  }}
                >
                  <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-[#051d3a] mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT / DESCRIPTION ── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-emerald-50 text-emerald-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
                Tentang Kawasan
              </span>
              <h2 className="text-3xl font-bold text-[#051d3a] mb-6 leading-tight">
                Ekosistem Laut yang<br />
                <span className="text-teal-600">Wajib Dilindungi</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Kawasan Konservasi Karang Jeruk terletak di perairan Kabupaten Batang, Provinsi Jawa Tengah.
                  Kawasan ini merupakan bagian dari upaya Cabang Dinas Kelautan dan Perikanan Wilayah Batang
                  dalam menjaga kelestarian ekosistem pesisir dan laut.
                </p>
                <p>
                  Terumbu karang di kawasan ini menjadi habitat penting bagi ratusan spesies ikan karang,
                  crustasea, dan invertebrata laut. Kondisi perairan yang relatif jernih dengan visibilitas
                  mencapai 10–15 meter menjadikannya lokasi yang ideal untuk kegiatan penelitian dan
                  monitoring ekosistem.
                </p>
                <p>
                  Program pengelolaan kawasan mencakup patroli rutin, transplantasi karang, dan pemberdayaan
                  masyarakat nelayan lokal sebagai ujung tombak penjagaan kawasan konservasi.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: 'Status', value: 'Kawasan Konservasi Perairan' },
                  { label: 'Pengelola', value: 'CDKWB Batang-Pekalongan' },
                  { label: 'Koordinat', value: '6°52\'S, 109°43\'E' },
                  { label: 'Kedalaman', value: '3 – 15 meter' },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                    <p className="text-sm font-semibold text-[#051d3a]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20">
                <img
                  src="https://images.unsplash.com/photo-1580086319619-3ed498161c77?q=80&w=900&auto=format&fit=crop"
                  alt="Terumbu karang Karang Jeruk"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <TreePine className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Tutupan Karang Hidup</p>
                  <p className="font-bold text-[#051d3a]">≈ 40%</p>
                </div>
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
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              Lokasi Kawasan
            </span>
            <h2 className="text-3xl font-bold text-[#051d3a] mb-4">Peta Kawasan Karang Jeruk</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Temukan lokasi Kawasan Konservasi Karang Jeruk di perairan pesisir Kabupaten Batang, Jawa Tengah.
            </p>
          </div>

          <div
            className="rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-gray-100 transition-all duration-700 delay-200"
            style={{ opacity: mapVisible ? 1 : 0, transform: mapVisible ? 'scale(1)' : 'scale(0.97)' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31677.23!2d109.6717!3d-6.8756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70096a7b5a97c1%3A0x5027a76e356a3d!2sKarang+Jeruk%2C+Batang%2C+Jawa+Tengah!5e0!3m2!1sid!2sid!4v1699999999"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Kawasan Karang Jeruk"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <a
              href="https://maps.google.com/?q=Karang+Jeruk+Batang+Jawa+Tengah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#051d3a] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#0b3b60] transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Buka di Google Maps
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-15px); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
