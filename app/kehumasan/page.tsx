'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  Megaphone, FileText, Download, Mail, Phone, Clock,
  Globe, ChevronRight,
  ArrowRight, Calendar, Users, Newspaper, Award,
  ExternalLink, Image as ImageIcon, Shield,
} from 'lucide-react';

const Instagram = ({ className = "w-6 h-6", style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Youtube = ({ className = "w-6 h-6", style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const Facebook = ({ className = "w-6 h-6", style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// ─── Scroll-in hook ───────────────────────────────────────────────────────────
const useInView = (threshold = 0.12) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
};

// ─── Static data ──────────────────────────────────────────────────────────────
const stats = [
  { value: '24+', label: 'Siaran Pers Diterbitkan', icon: <Newspaper className="w-5 h-5" /> },
  { value: '8',   label: 'Media Partner Aktif',    icon: <Globe className="w-5 h-5" /> },
  { value: '15+', label: 'Kegiatan Publik / Tahun', icon: <Calendar className="w-5 h-5" /> },
  { value: '2015', label: 'Tahun Aktif Bertugas',   icon: <Award className="w-5 h-5" /> },
];

const pressReleases = [
  {
    date: '10 Agustus 2026',
    category: 'Konservasi',
    title: 'CDKWB Tanam 5.000 Bibit Mangrove di Pesisir Batang dalam Rangka Hari Konservasi Alam Nasional',
    excerpt: 'Kegiatan penanaman massal dilaksanakan bersama komunitas nelayan dan relawan dari 12 desa pesisir sebagai bagian dari program rehabilitasi mangrove 2026.',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
  },
  {
    date: '22 Juli 2026',
    category: 'Perizinan',
    title: 'Peluncuran Sistem Pengajuan SLO Berbasis Digital untuk Nelayan Wilayah Batang-Pekalongan',
    excerpt: 'CDKWB meluncurkan layanan penerbitan Surat Laik Operasi secara digital, memangkas waktu proses dari 7 hari menjadi 2 hari kerja.',
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.08)',
  },
  {
    date: '5 Juli 2026',
    category: 'Kerja Sama',
    title: 'Penandatanganan MOU antara CDKWB dan BRIN untuk Riset Ekosistem Pesisir Jawa Tengah',
    excerpt: 'Kerja sama penelitian ini akan mencakup pemantauan terumbu karang, kualitas air, dan stok ikan selama 3 tahun ke depan.',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
  },
  {
    date: '18 Juni 2026',
    category: 'Pemberdayaan',
    title: 'Pelatihan Budi Daya Udang Vaname Berhasil Tingkatkan Pendapatan Nelayan Kabupaten Batang',
    excerpt: 'Sebanyak 120 nelayan dari 8 desa mengikuti pelatihan intensif 3 hari yang menghasilkan peningkatan produktivitas rata-rata 35%.',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
  },
];

const publications = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Laporan Tahunan CDKWB 2025',
    desc: 'Ringkasan capaian program, data statistik, dan evaluasi kinerja sepanjang tahun 2025.',
    type: 'PDF · 4.2 MB',
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.08)',
    border: 'rgba(14,165,233,0.2)',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Profil CDKWB Batang-Pekalongan',
    desc: 'Dokumen profil resmi berisi latar belakang, struktur organisasi, wilayah kerja, dan layanan utama CDKWB.',
    type: 'PDF · 2.1 MB',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
  },
  {
    icon: <ImageIcon className="w-6 h-6" />,
    title: 'Infografis Program Konservasi 2025',
    desc: 'Visualisasi data program rehabilitasi mangrove, kawasan konservasi, dan pencapaian ekologis.',
    type: 'PNG · 1.8 MB',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.2)',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Brosur Layanan CDKWB',
    desc: 'Panduan singkat seluruh layanan yang tersedia: SLO, konsultasi perikanan, pengaduan, dan konservasi.',
    type: 'PDF · 0.9 MB',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.2)',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Maklumat Pelayanan Publik',
    desc: 'Pernyataan resmi komitmen CDKWB dalam memberikan pelayanan publik yang transparan dan akuntabel.',
    type: 'PDF · 0.4 MB',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.2)',
  },
  {
    icon: <ImageIcon className="w-6 h-6" />,
    title: 'Leaflet Kawasan Konservasi Karang Jeruk',
    desc: 'Leaflet edukasi tentang Kawasan Konservasi Karang Jeruk — ekosistem, zonasi, dan aturan kunjungan.',
    type: 'PDF · 1.2 MB',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.2)',
  },
];

const socialMedia = [
  {
    name: 'Instagram',
    handle: '@cdkwbjateng',
    desc: 'Foto kegiatan, konservasi, dan info terkini.',
    followers: '2.4K',
    color: '#e1306c',
    bg: 'rgba(225,48,108,0.08)',
    border: 'rgba(225,48,108,0.2)',
    url: 'https://www.instagram.com/cdkwbjateng/',
    icon: <Instagram className="w-7 h-7" />,
  },
  {
    name: 'YouTube',
    handle: 'CDKWB Official',
    desc: 'Video kegiatan lapangan, sosialisasi, dan dokumenter.',
    followers: '890',
    color: '#ff0000',
    bg: 'rgba(255,0,0,0.08)',
    border: 'rgba(255,0,0,0.2)',
    url: 'https://youtube.com',
    icon: <Youtube className="w-7 h-7" />,
  },
  {
    name: 'Facebook',
    handle: 'CDKWB Jawa Tengah',
    desc: 'Berita dan pengumuman resmi dinas.',
    followers: '3.1K',
    color: '#1877f2',
    bg: 'rgba(24,119,242,0.08)',
    border: 'rgba(24,119,242,0.2)',
    url: 'https://facebook.com',
    icon: <Facebook className="w-7 h-7" />,
  },
];

const galleryItems = [
  { caption: 'Konferensi Pers SLO Digital 2026', emoji: '🎙️', color: 'from-blue-500/20 to-cyan-500/20' },
  { caption: 'Sosialisasi Program Konservasi Batang', emoji: '🌿', color: 'from-emerald-500/20 to-teal-500/20' },
  { caption: 'Pelatihan Nelayan Budidaya Vaname', emoji: '🦐', color: 'from-amber-500/20 to-orange-500/20' },
  { caption: 'Penandatanganan MOU dengan BRIN', emoji: '🤝', color: 'from-purple-500/20 to-indigo-500/20' },
  { caption: 'Kunjungan Media ke Karang Jeruk', emoji: '📸', color: 'from-rose-500/20 to-pink-500/20' },
  { caption: 'Pameran Hari Ikan Nasional 2025', emoji: '🐟', color: 'from-sky-500/20 to-blue-500/20' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function KehumasanPage() {
  const [heroRef,  heroVis]  = useInView(0.1);
  const [statsRef, statsVis] = useInView(0.1);
  const [pressRef, pressVis] = useInView(0.1);
  const [pubRef,   pubVis]   = useInView(0.1);
  const [socRef,   socVis]   = useInView(0.1);
  const [galRef,   galVis]   = useInView(0.1);
  const [ctaRef,   ctaVis]   = useInView(0.1);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#03091a]">
        {/* Gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #0ea5e9, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
            style={{ background: 'radial-gradient(circle, #6d28d9, transparent 70%)', transform: 'translate(30%, 30%)' }} />
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
            style={{ background: 'radial-gradient(circle, #0f766e, transparent 70%)', transform: 'translate(-50%, -50%)' }} />
        </div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* Floating microphone icons */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute text-white/5 select-none pointer-events-none"
            style={{
              left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 25}%`,
              fontSize: `${24 + (i % 3) * 12}px`,
              animation: `float ${4 + i * 0.5}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.4}s`,
            }}>📢</div>
        ))}

        <div ref={heroRef} className="relative z-10 container mx-auto px-6 py-24">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/40 text-sm mb-8 transition-all duration-700"
            style={{ opacity: heroVis ? 1 : 0, transform: heroVis ? 'translateY(0)' : 'translateY(20px)' }}>
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Kehumasan</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 text-white/70 text-xs font-semibold mb-6 transition-all duration-700 delay-100"
            style={{ opacity: heroVis ? 1 : 0, transform: heroVis ? 'translateY(0)' : 'translateY(20px)' }}>
            <Megaphone className="w-3 h-3 text-cyan-400" />
            Hubungan Masyarakat · CDKWB Batang-Pekalongan
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 tracking-tight transition-all duration-700 delay-200"
            style={{ opacity: heroVis ? 1 : 0, transform: heroVis ? 'translateY(0)' : 'translateY(30px)' }}>
            Kehumasan<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400">
              CDKWB
            </span>
          </h1>

          <p className="text-lg text-white/60 max-w-2xl leading-relaxed mb-10 transition-all duration-700 delay-300"
            style={{ opacity: heroVis ? 1 : 0, transform: heroVis ? 'translateY(0)' : 'translateY(30px)' }}>
            Menghubungkan Cabang Dinas Kelautan dan Perikanan Wilayah Batang-Pekalongan dengan masyarakat
            melalui komunikasi yang transparan, informatif, dan akuntabel.
          </p>

          <div className="flex flex-wrap gap-3 transition-all duration-700 delay-400"
            style={{ opacity: heroVis ? 1 : 0, transform: heroVis ? 'translateY(0)' : 'translateY(30px)' }}>
            {['Siaran Pers Resmi', 'Publikasi & Dokumen', 'Media Sosial Aktif', 'Keterbukaan Informasi'].map((tag, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 bg-white/8 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 text-white/70 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none overflow-hidden leading-none">
          <svg className="relative block w-full h-[60px] sm:h-[100px]" viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C280,100 560,0 840,60 C1120,115 1300,20 1440,50 L1440,100 L0,100 Z" fill="rgba(14,165,233,0.15)" />
            <path d="M0,60 C360,10 640,90 960,30 C1200,0 1340,70 1440,45 L1440,100 L0,100 Z" fill="rgba(99,102,241,0.15)" />
            <path d="M0,75 C240,25 480,95 720,50 C960,10 1200,80 1440,55 L1440,100 L0,100 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section className="pt-6 pb-16 bg-white relative z-30">
        <div ref={statsRef} className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg shadow-blue-900/8 p-6 text-center border border-gray-100 transition-all duration-700"
              style={{ opacity: statsVis ? 1 : 0, transform: statsVis ? 'translateY(0)' : 'translateY(30px)', transitionDelay: `${i * 100}ms` }}>
              <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center mx-auto mb-3 text-sky-600">{s.icon}</div>
              <div className="text-3xl font-black text-[#03091a]">{s.value}</div>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SIARAN PERS ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div ref={pressRef} className="transition-all duration-700"
            style={{ opacity: pressVis ? 1 : 0, transform: pressVis ? 'translateY(0)' : 'translateY(30px)' }}>

            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <span className="inline-block bg-sky-50 text-sky-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4">Siaran Pers</span>
                <h2 className="text-3xl font-black text-[#03091a] tracking-tight">Siaran Pers Terbaru</h2>
                <p className="text-gray-500 mt-2 max-w-lg">Pernyataan dan rilis resmi dari Cabang Dinas Kelautan dan Perikanan Wilayah Batang-Pekalongan.</p>
              </div>
              <Link href="/news" className="inline-flex items-center gap-2 text-sky-600 font-semibold text-sm hover:text-sky-700 transition-colors">
                Lihat Semua Berita <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {pressReleases.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                  style={{ opacity: pressVis ? 1 : 0, transform: pressVis ? 'translateY(0)' : 'translateY(30px)', transitionDelay: `${i * 100}ms` }}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: p.bg, color: p.color }}>{p.category}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />{p.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 leading-tight mb-3 group-hover:text-sky-700 transition-colors line-clamp-2">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{p.excerpt}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold" style={{ color: p.color }}>
                    Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PUBLIKASI & DOKUMEN ───────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div ref={pubRef} className="transition-all duration-700"
            style={{ opacity: pubVis ? 1 : 0, transform: pubVis ? 'translateY(0)' : 'translateY(30px)' }}>

            <div className="text-center mb-14">
              <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4">Publikasi & Dokumen</span>
              <h2 className="text-3xl font-black text-[#03091a] tracking-tight mb-3">Unduh Dokumen Resmi</h2>
              <p className="text-gray-500 max-w-lg mx-auto">Laporan, brosur, infografis, dan dokumen resmi CDKWB tersedia untuk diunduh secara gratis.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {publications.map((pub, i) => (
                <div key={i} className="rounded-2xl border p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
                  style={{ background: pub.bg, borderColor: pub.border,
                    opacity: pubVis ? 1 : 0, transform: pubVis ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: `${i * 80}ms` }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `rgba(255,255,255,0.7)`, color: pub.color }}>{pub.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2 leading-tight">{pub.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{pub.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">{pub.type}</span>
                    <button className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                      style={{ background: `rgba(255,255,255,0.8)`, color: pub.color }}
                      onClick={() => alert('Dokumen akan tersedia segera.')}>
                      <Download className="w-3.5 h-3.5" /> Unduh
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MEDIA SOSIAL ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div ref={socRef} className="transition-all duration-700"
            style={{ opacity: socVis ? 1 : 0, transform: socVis ? 'translateY(0)' : 'translateY(30px)' }}>

            <div className="text-center mb-14">
              <span className="inline-block bg-rose-50 text-rose-500 text-xs font-bold px-4 py-1.5 rounded-full mb-4">Media Sosial Resmi</span>
              <h2 className="text-3xl font-black text-[#03091a] tracking-tight mb-3">Ikuti Kami di Media Sosial</h2>
              <p className="text-gray-500 max-w-lg mx-auto">Dapatkan informasi terkini, foto kegiatan, dan pengumuman resmi melalui akun media sosial CDKWB.</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {socialMedia.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="block rounded-2xl border p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group text-center"
                  style={{ background: s.bg, borderColor: s.border,
                    opacity: socVis ? 1 : 0, transform: socVis ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: `${i * 120}ms` }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `rgba(255,255,255,0.7)`, color: s.color }}>
                    {s.icon}
                  </div>
                  <div className="font-black text-gray-900 text-lg">{s.name}</div>
                  <div className="text-sm font-semibold mb-2" style={{ color: s.color }}>{s.handle}</div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-sm font-bold text-gray-600">{s.followers} Pengikut</span>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl"
                    style={{ background: `rgba(255,255,255,0.8)`, color: s.color }}>
                    Kunjungi <ExternalLink className="w-3 h-3" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALERI KEGIATAN ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div ref={galRef} className="transition-all duration-700"
            style={{ opacity: galVis ? 1 : 0, transform: galVis ? 'translateY(0)' : 'translateY(30px)' }}>

            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <span className="inline-block bg-amber-50 text-amber-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4">Galeri Kegiatan</span>
                <h2 className="text-3xl font-black text-[#03091a] tracking-tight">Momen Kegiatan Humas</h2>
                <p className="text-gray-500 mt-2 max-w-lg">Dokumentasi kegiatan komunikasi publik, konferensi pers, dan outreach CDKWB.</p>
              </div>
              <Link href="/galeri?tab=foto" className="inline-flex items-center gap-2 text-amber-600 font-semibold text-sm hover:text-amber-700 transition-colors">
                Galeri Lengkap <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {galleryItems.map((item, i) => (
                <div key={i} className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${item.color} border border-gray-100 flex flex-col items-center justify-center hover:scale-[1.02] transition-transform duration-300 cursor-pointer group`}
                  style={{ opacity: galVis ? 1 : 0, transform: galVis ? 'scale(1)' : 'scale(0.96)', transitionDelay: `${i * 80}ms` }}>
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.emoji}</div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <p className="text-white text-xs font-semibold leading-tight">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAKLUMAT + KONTAK HUMAS ───────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10">

            {/* Maklumat Pelayanan */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Maklumat Pelayanan</p>
                  <h3 className="text-lg font-black text-gray-900">Komitmen Layanan Publik</h3>
                </div>
              </div>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  Kami, seluruh jajaran <strong className="text-gray-900">Cabang Dinas Kelautan dan Perikanan Wilayah Batang-Pekalongan</strong>,
                  berkomitmen untuk memberikan pelayanan publik yang:
                </p>
                <ul className="space-y-2">
                  {[
                    'Profesional, cepat, dan tepat sasaran',
                    'Transparan, jujur, dan dapat dipertanggungjawabkan',
                    'Bebas dari pungutan liar (pungli)',
                    'Responsif terhadap aduan dan masukan masyarakat',
                    'Berlandaskan peraturan perundang-undangan yang berlaku',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
                  Berdasarkan Peraturan Menteri PAN-RB No. 15 Tahun 2014 tentang Pedoman Standar Pelayanan.
                </p>
              </div>
            </div>

            {/* Kontak Humas */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center">
                  <Megaphone className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-cyan-600 uppercase tracking-wider">Hubungi Humas</p>
                  <h3 className="text-lg font-black text-gray-900">Kontak Pejabat Humas</h3>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  {
                    icon: <Mail className="w-4 h-4" />,
                    label: 'Email Humas',
                    value: 'humas@cdkwb.jatengprov.go.id',
                    color: 'text-sky-600',
                    bg: 'bg-sky-50',
                  },
                  {
                    icon: <Phone className="w-4 h-4" />,
                    label: 'Telepon Kantor',
                    value: '(0285) 123456',
                    color: 'text-emerald-600',
                    bg: 'bg-emerald-50',
                  },
                  {
                    icon: <Clock className="w-4 h-4" />,
                    label: 'Jam Layanan',
                    value: 'Senin–Kamis 07.30–16.00 · Jumat 07.30–11.00',
                    color: 'text-amber-600',
                    bg: 'bg-amber-50',
                  },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg ${c.bg} ${c.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>{c.icon}</div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{c.label}</p>
                      <p className="text-sm font-semibold text-gray-800 mt-0.5">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <p className="text-xs text-gray-500">Untuk pertanyaan media, permintaan wawancara, atau permohonan informasi publik (PPID), silakan hubungi kami melalui:</p>
                <Link href="/kontak"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#03091a] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#0c1a3a] transition-colors text-sm">
                  <Mail className="w-4 h-4" /> Hubungi Kami Sekarang
                </Link>
                <Link href="/pengaduan"
                  className="w-full inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors text-sm">
                  Ajukan Permintaan Informasi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#03091a] via-[#0c1a3a] to-[#03091a] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div ref={ctaRef} className="container mx-auto px-6 text-center relative z-10 transition-all duration-700"
          style={{ opacity: ctaVis ? 1 : 0, transform: ctaVis ? 'translateY(0)' : 'translateY(30px)' }}>
          <span className="inline-block bg-white/10 border border-white/15 text-white/70 text-xs font-bold px-4 py-1.5 rounded-full mb-6">
            Keterbukaan Informasi Publik
          </span>
          <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Butuh Informasi Resmi?</h2>
          <p className="text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
            Kami berkomitmen pada keterbukaan informasi publik. Ajukan permohonan informasi, permintaan wawancara,
            atau kontak media langsung kepada tim Kehumasan CDKWB.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/kontak"
              className="bg-white text-[#03091a] px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2 text-sm">
              Kontak Humas <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/pengaduan"
              className="border border-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/8 transition-colors text-sm">
              Permohonan Informasi (PPID)
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes float {
          0%   { transform: translateY(0)    rotate(-5deg); }
          100% { transform: translateY(-18px) rotate(5deg);  }
        }
      `}</style>
    </div>
  );
}
