'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import {
  Megaphone, FileText, Download, Mail, Phone, Clock,
  ChevronRight, ArrowRight, Calendar, Newspaper,
  ExternalLink, Shield, BookOpen, Users, AlertCircle,
  Camera, Image as ImageIcon, Eye, X, Handshake
} from 'lucide-react';

// ── Scroll-in hook ────────────────────────────────────────────────────────────
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

// ── Types ─────────────────────────────────────────────────────────────────────
interface SiaranPers {
  ID_berita: number;
  Judul: string;
  Slug: string;
  image?: string;
  isi_berita?: string;
  tanggal: string;
  kategori: string;
  penulis: string;
}

interface GaleriFoto {
  ID_foto: number;
  Judul: string;
  Slug: string;
  URL_image: string;
  tanggal: string;
  kategori_nama?: string;
  value?: string | Record<string, any>;
}

interface Dokumen {
  id: number;
  judul: string;
  deskripsi: string;
  file_url: string;
  tipe: string;
  ukuran: string;
  warna: string;
}

// ── Category color map ────────────────────────────────────────────────────────
const kategoriColor: Record<string, { text: string; bg: string }> = {
  Konservasi:    { text: '#10b981', bg: 'rgba(16,185,129,0.10)' },
  Perizinan:     { text: '#0ea5e9', bg: 'rgba(14,165,233,0.10)' },
  'Kerja Sama':  { text: '#8b5cf6', bg: 'rgba(139,92,246,0.10)' },
  Pemberdayaan:  { text: '#f59e0b', bg: 'rgba(245,158,11,0.10)' },
  'Siaran Pers': { text: '#0b3b60', bg: 'rgba(11,59,96,0.08)'   },
  Pengawasan:    { text: '#ef4444', bg: 'rgba(239,68,68,0.10)'  },
  Operasional:   { text: '#3b82f6', bg: 'rgba(59,130,246,0.10)' },
  Kegiatan:      { text: '#8b5cf6', bg: 'rgba(139,92,246,0.10)' },
  Dokumentasi:   { text: '#06b6d4', bg: 'rgba(6,182,212,0.10)'  },
};
function getKategoriStyle(k: string) {
  return kategoriColor[k] ?? { text: '#6b7280', bg: 'rgba(107,114,128,0.10)' };
}

// ── Quick-nav sections ────────────────────────────────────────────────────────
// type: 'scroll' scrolls to that section id on the page
// type: 'link'   navigates to a separate sub-page
const SECTIONS = [
  { id: 'kerjasama',     label: 'Kerjasama & Kemitraan', icon: Handshake,  type: 'link'   as const, href: '/kehumasan/kerjasama' },
  { id: 'siaran-pers',   label: 'Siaran Pers',          icon: Newspaper,  type: 'scroll' as const },
  { id: 'galeri-media',  label: 'Dokumentasi & Galeri',  icon: Camera,     type: 'scroll' as const },
  { id: 'dokumen',       label: 'Dokumen Resmi',         icon: FileText,   type: 'scroll' as const },
  { id: 'ppid',          label: 'PPID / Info Publik',    icon: Shield,     type: 'scroll' as const },
  { id: 'kontak',        label: 'Kontak Humas',          icon: Phone,      type: 'scroll' as const },
];

// ── PPID Steps ────────────────────────────────────────────────────────────────
const PPID_STEPS = [
  { num: '1', title: 'Isi Formulir', desc: 'Lengkapi identitas dan rincian informasi yang diminta.' },
  { num: '2', title: 'Kirim Permohonan', desc: 'Ajukan melalui form pengaduan online atau datang langsung ke kantor.' },
  { num: '3', title: 'Proses Verifikasi', desc: 'Petugas PPID memverifikasi permohonan dalam 10 hari kerja.' },
  { num: '4', title: 'Terima Informasi', desc: 'Informasi diberikan secara tertulis atau dikirim ke email Anda.' },
];

// ── Kontak items ──────────────────────────────────────────────────────────────
const KONTAK = [
  { icon: <Mail className="w-4 h-4" />,  label: 'Email Humas',   value: 'humas@cdkwb.jatengprov.go.id', color: 'text-sky-600',     bg: 'bg-sky-50'     },
  { icon: <Phone className="w-4 h-4" />, label: 'Telepon Kantor', value: '(0285) 123456',                  color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: <Clock className="w-4 h-4" />, label: 'Jam Layanan',    value: 'Sen–Kam 07.30–16.00 · Jum 07.30–14.00', color: 'text-amber-600',   bg: 'bg-amber-50'   },
];

const MAKLUMAT = [
  'Profesional, cepat, dan tepat sasaran',
  'Transparan, jujur, dan dapat dipertanggungjawabkan',
  'Bebas dari pungutan liar (pungli)',
  'Responsif terhadap aduan dan masukan masyarakat',
  'Berlandaskan peraturan perundang-undangan yang berlaku',
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function KehumasanPage() {
  const [activeNav, setActiveNav] = useState('siaran-pers');
  const [siaranPers, setSiaranPers] = useState<SiaranPers[]>([]);
  const [galeriFoto, setGaleriFoto] = useState<GaleriFoto[]>([]);
  const [dokumen, setDokumen] = useState<Dokumen[]>([]);
  const [loadingSP, setLoadingSP] = useState(true);
  const [loadingGaleri, setLoadingGaleri] = useState(true);
  const [loadingDok, setLoadingDok] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<GaleriFoto | null>(null);

  const [heroRef,   heroVis]   = useInView(0.1);
  const [spRef,     spVis]     = useInView(0.1);
  const [galeriRef, galeriVis] = useInView(0.1);
  const [dokRef,    dokVis]    = useInView(0.1);
  const [ppidRef,   ppidVis]   = useInView(0.1);
  const [ktRef,     ktVis]     = useInView(0.1);

  // Fetch data
  useEffect(() => {
    fetch('/api/siaran-pers')
      .then(r => r.json())
      .then(d => setSiaranPers(d.data ?? []))
      .catch(() => setSiaranPers([]))
      .finally(() => setLoadingSP(false));

    fetch('/api/galeri/foto')
      .then(r => r.json())
      .then(d => {
        const all: GaleriFoto[] = d.data ?? [];
        // Prioritize items tagged with 'Kehumasan', followed by other recent media
        const kehumasanItems = all.filter(item => item.kategori_nama === 'Kehumasan');
        const otherItems = all.filter(item => item.kategori_nama !== 'Kehumasan');
        const combined = [...kehumasanItems, ...otherItems].slice(0, 6);
        setGaleriFoto(combined);
      })
      .catch(() => setGaleriFoto([]))
      .finally(() => setLoadingGaleri(false));

    fetch('/api/dokumen-humas')
      .then(r => r.json())
      .then(d => setDokumen(d.data ?? []))
      .catch(() => setDokumen([]))
      .finally(() => setLoadingDok(false));
  }, []);

  // Update active nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      for (const s of [...SECTIONS].reverse()) {
        const el = document.getElementById(s.id);
        if (el && window.scrollY >= el.offsetTop - 160) {
          setActiveNav(s.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    setActiveNav(id);
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  const stripHtml = (html?: string) => {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[56vh] flex items-center overflow-hidden bg-[#03091a]">
        {/* Gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #0ea5e9, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
            style={{ background: 'radial-gradient(circle, #6d28d9, transparent 70%)', transform: 'translate(30%, 30%)' }} />
        </div>
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

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

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 tracking-tight transition-all duration-700 delay-200"
            style={{ opacity: heroVis ? 1 : 0, transform: heroVis ? 'translateY(0)' : 'translateY(30px)' }}>
            Kehumasan<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400">
              CDKWB
            </span>
          </h1>

          <p className="text-base text-white/60 max-w-xl leading-relaxed mb-10 transition-all duration-700 delay-300"
            style={{ opacity: heroVis ? 1 : 0, transform: heroVis ? 'translateY(0)' : 'translateY(30px)' }}>
            Informasi publik, siaran pers resmi, dan dokumen CDKWB Batang-Pekalongan — transparan dan mudah diakses.
          </p>

          {/* Quick-jump chips */}
          <div className="flex flex-wrap gap-2.5 transition-all duration-700 delay-400"
            style={{ opacity: heroVis ? 1 : 0, transform: heroVis ? 'translateY(0)' : 'translateY(30px)' }}>
            {SECTIONS.map(s => {
              if (s.type === 'link' && s.href) {
                return (
                  <Link key={s.id} href={s.href}
                    className="inline-flex items-center gap-2 bg-indigo-500/15 hover:bg-indigo-500/30 border border-indigo-400/30 hover:border-indigo-300/60 rounded-full px-4 py-2 text-indigo-200 hover:text-white text-sm font-medium transition-all duration-200">
                    <s.icon className="w-3.5 h-3.5" />
                    {s.label}
                    <ArrowRight className="w-3 h-3 opacity-70" />
                  </Link>
                );
              }
              return (
                <button key={s.id} onClick={() => scrollTo(s.id)}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-cyan-500/20 border border-white/15 hover:border-cyan-400/40 rounded-full px-4 py-2 text-white/70 hover:text-cyan-300 text-sm font-medium transition-all duration-200 cursor-pointer">
                  <s.icon className="w-3.5 h-3.5" />
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none overflow-hidden leading-none">
          <svg className="relative block w-full h-[60px] sm:h-[80px]" viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C280,80 560,0 840,50 C1120,90 1300,20 1440,40 L1440,80 L0,80 Z" fill="rgba(14,165,233,0.12)" />
            <path d="M0,55 C360,10 640,72 960,25 C1200,0 1340,55 1440,35 L1440,80 L0,80 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── STICKY QUICK-NAV ─────────────────────────────────────────────── */}
      <div className="sticky top-[80px] z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {SECTIONS.map(s => {
              // Link-type items navigate to a sub-page
              if (s.type === 'link' && s.href) {
                return (
                  <Link key={s.id} href={s.href}
                    className="flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 border-transparent text-indigo-600 hover:text-indigo-800 hover:border-indigo-400 bg-indigo-50/50 rounded-xl my-1 transition-all duration-200">
                    <s.icon className="w-4 h-4 text-indigo-600" />
                    {s.label}
                    <ArrowRight className="w-3 h-3 opacity-60" />
                  </Link>
                );
              }
              // Scroll-type items jump to a section on this page
              return (
                <button key={s.id} onClick={() => scrollTo(s.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-200 cursor-pointer ${
                    activeNav === s.id
                      ? 'border-[#0b3b60] text-[#0b3b60]'
                      : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                  }`}>
                  <s.icon className="w-3.5 h-3.5" />
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── TOP FEATURED SHOWCASE: DIREKTORI KERJASAMA & KEMITRAAN ── */}
      <section className="bg-slate-50/80 border-b border-slate-100 py-6">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <Link
            href="/kehumasan/kerjasama"
            className="group block bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-indigo-300 rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Handshake className="w-5 h-5" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                      5 Mitra Resmi
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      3 Perguruan Tinggi · 1 NGO · 1 Pokmaswas
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    Direktori Kerjasama & Kemitraan CDKWB
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    Informasi transparansi PKS resmi bersama UPS Tegal, UNIKAL, UNIMUS, Rekam Nusantara Foundation, dan Jejaring Pokmaswas.
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 group-hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-2xs">
                  <span>Lihat Direktori</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── SIARAN PERS ──────────────────────────────────────────────────── */}
      <section id="siaran-pers" className="py-20 bg-white scroll-mt-32">
        <div className="container mx-auto px-6">
          <div ref={spRef} className="transition-all duration-700"
            style={{ opacity: spVis ? 1 : 0, transform: spVis ? 'translateY(0)' : 'translateY(30px)' }}>

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

            {loadingSP ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
                ))}
              </div>
            ) : siaranPers.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <Newspaper className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium">Belum ada siaran pers yang diterbitkan.</p>
                <p className="text-sm mt-1">Tambahkan berita dengan kategori "Siaran Pers" dari dashboard.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {siaranPers.map((p, i) => {
                  const style = getKategoriStyle(p.kategori);
                  const excerpt = stripHtml(p.isi_berita);
                  return (
                    <Link
                      key={p.ID_berita}
                      href={`/news/${p.Slug}`}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col overflow-hidden"
                      style={{ opacity: spVis ? 1 : 0, transform: spVis ? 'translateY(0)' : 'translateY(30px)', transitionDelay: `${i * 80}ms` }}
                    >
                      {/* Image Thumbnail Container */}
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100 shrink-0">
                        <Image
                          src={p.image || '/leading/berita.png'}
                          alt={p.Judul}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity" />
                        
                        {/* Category Floating Badge */}
                        <div className="absolute top-3 left-3">
                          <span
                            className="text-[11px] font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-md"
                            style={{ background: style.bg.replace('0.08', '0.90').replace('0.10', '0.90'), color: style.text }}
                          >
                            {p.kategori || 'Siaran Pers'}
                          </span>
                        </div>

                        {/* Date overlay */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90 text-xs font-medium">
                          <span className="flex items-center gap-1.5 drop-shadow-sm">
                            <Calendar className="w-3.5 h-3.5 text-cyan-300" />
                            {formatDate(p.tanggal)}
                          </span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 leading-snug mb-2 group-hover:text-sky-600 transition-colors line-clamp-2 text-base">
                            {p.Judul}
                          </h3>
                          {excerpt && (
                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                              {excerpt}
                            </p>
                          )}
                        </div>

                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
                          <span className="text-[11px] text-gray-400 font-medium">
                            {p.penulis || 'Humas CDKWB'}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 group-hover:text-sky-700">
                            Baca Rilis <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── DOKUMENTASI & GALERI HUMAS ────────────────────────────────────── */}
      <section id="galeri-media" className="py-20 bg-slate-950 text-white relative overflow-hidden scroll-mt-32">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div ref={galeriRef} className="transition-all duration-700"
            style={{ opacity: galeriVis ? 1 : 0, transform: galeriVis ? 'translateY(0)' : 'translateY(30px)' }}>

            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
                  <Camera className="w-3.5 h-3.5 text-cyan-400" /> Dokumentasi & Publikasi Media
                </span>
                <h2 className="text-3xl font-black text-white tracking-tight">Galeri Kegiatan Humas</h2>
                <p className="text-slate-400 mt-2 max-w-xl">
                  Dokumentasi visual kegiatan kelautan, pengawasan perairan, konservasi ekosistem, dan liputan humas terkini.
                </p>
              </div>

              <Link href="/galeri"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95">
                <ImageIcon className="w-4 h-4" /> Jelajahi Semua Galeri <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {loadingGaleri ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-slate-900/80 border border-slate-800 rounded-2xl h-64 animate-pulse" />
                ))}
              </div>
            ) : galeriFoto.length === 0 ? (
              <div className="text-center py-16 px-4 bg-slate-900/50 border border-slate-800/80 rounded-3xl text-slate-400">
                <Camera className="w-12 h-12 mx-auto mb-3 opacity-30 text-cyan-400" />
                <p className="font-semibold text-white">Belum ada foto dokumentasi yang ditampilkan.</p>
                <p className="text-sm mt-1 text-slate-400">Dokumentasi baru yang diunggah ke Galeri akan otomatis tampil di sini.</p>
                <Link href="/galeri" className="mt-4 inline-flex items-center gap-2 text-cyan-400 text-sm font-semibold hover:underline">
                  Buka Halaman Galeri Terpadu <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galeriFoto.map((foto, i) => {
                  const style = getKategoriStyle(foto.kategori_nama || 'Dokumentasi');
                  return (
                    <div
                      key={foto.ID_foto}
                      onClick={() => setSelectedPhoto(foto)}
                      className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer flex flex-col"
                      style={{ opacity: galeriVis ? 1 : 0, transform: galeriVis ? 'translateY(0)' : 'translateY(30px)', transitionDelay: `${i * 70}ms` }}
                    >
                      {/* Image Container */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                        {foto.URL_image ? (
                          <img
                            src={foto.URL_image}
                            alt={foto.Judul}
                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
                            <Camera className="w-10 h-10" />
                          </div>
                        )}

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                        {/* Top Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span
                            className="text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md border border-white/10"
                            style={{ background: style.bg, color: style.text }}
                          >
                            {foto.kategori_nama || 'Dokumentasi'}
                          </span>
                        </div>

                        {/* Quick preview icon */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 backdrop-blur-md p-2 rounded-xl text-white">
                          <Eye className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{foto.tanggal ? formatDate(foto.tanggal) : 'Terbaru'}</span>
                          </div>
                          <h3 className="font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 text-base leading-snug">
                            {foto.Judul}
                          </h3>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-400">
                          <span>Pratinjau Foto</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Quick tabs hint */}
            <div className="mt-12 p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Media Lainnya Tersedia di Galeri</p>
                  <p className="text-xs text-slate-400">Tersedia juga galeri video kegiatan kelautan & infografis edukatif.</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link href="/galeri?tab=foto" className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors">
                  Foto
                </Link>
                <Link href="/galeri?tab=video" className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors">
                  Video
                </Link>
                <Link href="/galeri?tab=infografis" className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors">
                  Infografis
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PUBLIKASI & DOKUMEN ───────────────────────────────────────────── */}
      <section id="dokumen" className="py-20 bg-gray-50 scroll-mt-32">
        <div className="container mx-auto px-6">
          <div ref={dokRef} className="transition-all duration-700"
            style={{ opacity: dokVis ? 1 : 0, transform: dokVis ? 'translateY(0)' : 'translateY(30px)' }}>

            <div className="text-center mb-14">
              <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4">Publikasi & Dokumen</span>
              <h2 className="text-3xl font-black text-[#03091a] tracking-tight mb-3">Unduh Dokumen Resmi</h2>
              <p className="text-gray-500 max-w-lg mx-auto">Laporan, brosur, infografis, dan dokumen resmi CDKWB tersedia untuk diunduh secara gratis.</p>
            </div>

            {loadingDok ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-2xl h-44 animate-pulse" />
                ))}
              </div>
            ) : dokumen.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium">Belum ada dokumen yang dipublikasikan.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {dokumen.map((doc, i) => {
                  const hex = doc.warna || '#0ea5e9';
                  const bg = hex + '18';
                  const border = hex + '30';
                  return (
                    <div key={doc.id}
                      className="rounded-2xl border p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
                      style={{ background: bg, borderColor: border, opacity: dokVis ? 1 : 0, transitionDelay: `${i * 70}ms` }}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: 'rgba(255,255,255,0.75)', color: hex }}>
                        <FileText className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 leading-tight">{doc.judul}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{doc.deskripsi}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-medium">{doc.tipe}{doc.ukuran ? ` · ${doc.ukuran}` : ''}</span>
                        {doc.file_url && doc.file_url !== '#' ? (
                          <a href={doc.file_url} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                            style={{ background: 'rgba(255,255,255,0.85)', color: hex }}>
                            <Download className="w-3.5 h-3.5" /> Unduh
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-xl bg-white/60 text-gray-400">
                            Segera Tersedia
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── PPID ─────────────────────────────────────────────────────────── */}
      <section id="ppid" className="py-20 bg-white scroll-mt-32">
        <div className="container mx-auto px-6">
          <div ref={ppidRef} className="transition-all duration-700"
            style={{ opacity: ppidVis ? 1 : 0, transform: ppidVis ? 'translateY(0)' : 'translateY(30px)' }}>

            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4">Keterbukaan Informasi</span>
                <h2 className="text-3xl font-black text-[#03091a] tracking-tight mb-3">Permohonan Informasi Publik (PPID)</h2>
                <p className="text-gray-500 max-w-xl mx-auto">
                  Sesuai UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik, masyarakat berhak memohon informasi kepada CDKWB.
                </p>
              </div>

              {/* Steps */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {PPID_STEPS.map((step, i) => (
                  <div key={i}
                    className="flex gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100"
                    style={{ opacity: ppidVis ? 1 : 0, transitionDelay: `${i * 80}ms`, transition: 'opacity 0.6s, transform 0.6s', transform: ppidVis ? 'translateY(0)' : 'translateY(20px)' }}>
                    <div className="w-9 h-9 rounded-xl bg-[#0b3b60] text-white font-black text-sm flex items-center justify-center flex-shrink-0">
                      {step.num}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">{step.title}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Info box */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4 mb-8">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800 leading-relaxed">
                  <strong>Catatan:</strong> Respons diberikan paling lambat 10 hari kerja sejak permohonan diterima. Perpanjangan dapat dilakukan jika informasi memerlukan penelusuran lebih lanjut (max 7 hari).
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/pengaduan"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#03091a] text-white font-bold py-3.5 px-6 rounded-xl hover:bg-[#0c1a3a] transition-colors text-sm">
                  <BookOpen className="w-4 h-4" /> Ajukan Permohonan Informasi
                </Link>
                <Link href="/kontak"
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold py-3.5 px-6 rounded-xl hover:bg-gray-50 transition-colors text-sm">
                  <Users className="w-4 h-4" /> Hubungi PPID Langsung
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KONTAK & MAKLUMAT ─────────────────────────────────────────────── */}
      <section id="kontak" className="py-20 bg-gray-50 scroll-mt-32">
        <div className="container mx-auto px-6">
          <div ref={ktRef} className="grid lg:grid-cols-2 gap-8 transition-all duration-700"
            style={{ opacity: ktVis ? 1 : 0, transform: ktVis ? 'translateY(0)' : 'translateY(30px)' }}>

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
                {KONTAK.map((c, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg ${c.bg} ${c.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>{c.icon}</div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{c.label}</p>
                      <p className="text-sm font-semibold text-gray-800 mt-0.5">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-5 border-t border-gray-100 space-y-2.5">
                <p className="text-xs text-gray-500">Untuk pertanyaan media, permintaan wawancara, atau permohonan informasi publik (PPID):</p>
                <Link href="/kontak"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#03091a] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#0c1a3a] transition-colors text-sm">
                  <Mail className="w-4 h-4" /> Hubungi Kami Sekarang
                </Link>
                <a href={`https://wa.me/628971574040?text=Halo%20Humas%20CDKWB%2C%20saya%20ingin%20menanyakan%20informasi.`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 border border-green-200 bg-green-50 text-green-700 font-semibold py-3 px-6 rounded-xl hover:bg-green-100 transition-colors text-sm">
                  <ExternalLink className="w-4 h-4" /> WhatsApp Humas
                </a>
              </div>
            </div>

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
                <p>Kami, seluruh jajaran <strong className="text-gray-900">CDKWB Batang-Pekalongan</strong>, berkomitmen memberikan pelayanan publik yang:</p>
                <ul className="space-y-2.5">
                  {MAKLUMAT.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-400 pt-3 border-t border-gray-100">
                  Berdasarkan Peraturan Menteri PAN-RB No. 15 Tahun 2014 tentang Pedoman Standar Pelayanan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Photo Preview Lightbox Modal ── */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-800 text-white/80 hover:text-white transition-colors border border-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Image */}
            <div className="relative aspect-video sm:aspect-[16/10] bg-black flex items-center justify-center overflow-hidden">
              {selectedPhoto.URL_image ? (
                <img
                  src={selectedPhoto.URL_image}
                  alt={selectedPhoto.Judul}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-slate-600 flex flex-col items-center">
                  <Camera className="w-12 h-12 mb-2" />
                  <span>Gambar tidak tersedia</span>
                </div>
              )}
            </div>

            {/* Details Footer */}
            <div className="p-6 bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {selectedPhoto.kategori_nama || 'Dokumentasi'}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {selectedPhoto.tanggal ? formatDate(selectedPhoto.tanggal) : 'Terbaru'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white leading-snug">{selectedPhoto.Judul}</h3>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href="/galeri?tab=foto"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-600/20"
                >
                  <ImageIcon className="w-4 h-4" /> Buka di Galeri
                </Link>
                {selectedPhoto.URL_image && (
                  <a
                    href={selectedPhoto.URL_image}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Buka Gambar Resolusi Penuh"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
