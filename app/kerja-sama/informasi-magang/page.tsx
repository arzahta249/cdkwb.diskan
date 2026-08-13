import React from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  GraduationCap, 
  Users, 
  FileText, 
  Search, 
  BookOpen, 
  Award, 
  ChevronRight,
  ChevronDown,
  Compass, 
  ShieldCheck, 
  Map, 
  ArrowRight,
  Waves,
  Ship,
  Fish,
  Anchor,
  Globe,
  Plus,
  Minus
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DepthGauge from '@/components/DepthGauge';
import MagangForm from '@/components/MagangForm';

export const metadata = {
  title: 'Kadet Magang Maritim - CDKWB',
  description: 'Program kerja sama magang eksklusif Cabang Dinas Kelautan Wilayah Barat.',
};

export default function InformasiMagangLeviathanPage() {
  return (
    <div className="min-h-screen bg-[#010b14] text-blue-50 font-sans selection:bg-cyan-500/30 selection:text-cyan-100 overflow-x-hidden">
      <Navbar />
      <DepthGauge />

      {/* =========================================================
          1. MULTI-LAYERED HERO SECTION (THE LEVIATHAN DEEP)
          ========================================================= */}
      <section className="relative pt-32 pb-40 overflow-hidden flex items-center justify-center min-h-[85vh]">
        {/* Layer 1: Base Ocean Deep */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#021124] via-[#011c38] to-[#010b14] z-0"></div>
        
        {/* Layer 2: Abstract Oceanic Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e910_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e910_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] z-0"></div>
        
        {/* Layer 3: Massive Bioluminescent Orbs */}
        <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-cyan-600/10 rounded-full blur-[180px] -translate-x-1/3 -translate-y-1/2 z-0"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-700/20 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 z-0"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 z-0 animate-pulse"></div>

        {/* Layer 4: Decorative Topographic SVG Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] z-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>

        <div className="container mx-auto px-6 relative z-10 max-w-6xl text-center flex flex-col items-center">
          {/* Glowing Badge */}
          <div className="group relative inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#022140]/60 border border-cyan-500/40 text-cyan-300 text-xs font-bold mb-8 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.2)] overflow-hidden transition-all duration-500 hover:border-cyan-400 hover:shadow-[0_0_50px_rgba(6,182,212,0.4)]">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <Waves className="w-4 h-4 text-cyan-400" />
            <span className="tracking-widest uppercase">Pusat Kemitraan Maritim</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-[1.2] tracking-tight text-white drop-shadow-2xl">
            Selami <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400">Kedalaman.</span><br />
            Kuasai <span className="relative">
              Masa Depan.
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-cyan-500 opacity-60" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0,10 Q50,20 100,10" stroke="currentColor" strokeWidth="4" fill="none"/></svg>
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-blue-100/70 mb-10 leading-[1.8] max-w-2xl mx-auto font-light tracking-wide">
            Program magang komprehensif Cabang Dinas Kelautan Wilayah Barat (CDKWB). Bukan sekadar teori kelas, ini adalah ekspedisi nyata menjaga kedaulatan laut Jawa Tengah.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            {/* Primary CTA - Glowing Button */}
            <Link href="#daftar" className="relative group w-full sm:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
              <button className="relative w-full sm:w-auto px-8 py-3.5 bg-[#02152b] ring-1 ring-white/10 rounded-xl flex items-center justify-center gap-2 text-base font-black text-white hover:bg-transparent transition-all duration-300">
                <Ship className="w-5 h-5 text-cyan-400" /> Jelajahi Posisi
              </button>
            </Link>
            
            {/* Secondary CTA - Glass Button */}
            <Link href="#syarat" className="w-full sm:w-auto px-8 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 rounded-xl text-base font-bold text-blue-100 backdrop-blur-lg transition-all duration-300 flex items-center justify-center gap-2 group">
              Panduan Kadet <ChevronRight className="w-4 h-4 text-cyan-500 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. HOLOGRAPHIC DASHBOARD STATS
          ========================================================= */}
      <section className="relative z-30 -mt-16 mx-4 md:mx-auto max-w-5xl">
        <div className="bg-[#031b33]/80 backdrop-blur-3xl border border-cyan-900/50 rounded-[2rem] p-1.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Inner holographic glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
          
          <div className="bg-[#011124] rounded-[1.8rem] p-6 md:p-8 border border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
              
              <div className="text-center group relative pt-4 md:pt-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-cyan-500/20 rounded-full blur-xl group-hover:bg-cyan-400/40 transition-all duration-500"></div>
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-400 mb-2 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">150<span className="text-cyan-500">+</span></div>
                <div className="text-blue-200/60 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">Kadet Magang</div>
              </div>
              
              <div className="text-center group relative pt-4 md:pt-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-400/40 transition-all duration-500"></div>
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-400 mb-2 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">25<span className="text-blue-500">+</span></div>
                <div className="text-blue-200/60 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">Mitra Kampus</div>
              </div>
              
              <div className="text-center group relative pt-4 md:pt-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-400/40 transition-all duration-500"></div>
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-400 mb-2 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">05<span className="text-emerald-500">+</span></div>
                <div className="text-blue-200/60 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">Divisi Strategis</div>
              </div>
              
              <div className="text-center group relative pt-4 md:pt-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-teal-500/20 rounded-full blur-xl group-hover:bg-teal-400/40 transition-all duration-500"></div>
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-400 mb-2 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">98<span className="text-teal-500">%</span></div>
                <div className="text-blue-200/60 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">Indeks Kepuasan</div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. ULTRA-COMPLEX ASYMMETRICAL BENTO GRID
          ========================================================= */}
      <section className="pt-24 pb-20 relative">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          
          <div className="mb-14 md:flex justify-between items-end gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 text-blue-300 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-4 border border-blue-500/30">
                <Anchor className="w-3 h-3" /> Portofolio Pengalaman
              </div>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-4 leading-snug">
                Ruang Lingkup <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Operasi Maritim.</span>
              </h2>
              <p className="text-blue-100/70 text-sm md:text-base font-light leading-[1.8] max-w-xl">
                Di CDKWB, kami membuang sistem magang klerikal. Anda akan ditempatkan di garis depan, menghadapi tantangan nyata pesisir, dan merumuskan solusi berbasis data di lapangan.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 auto-rows-[220px]">
            
            {/* BENTO 1: Pengawasan (Large) */}
            <div className="group md:col-span-2 md:row-span-2 rounded-[2rem] p-8 relative overflow-hidden bg-[#021830] border border-cyan-900/50 hover:border-cyan-400/60 transition-all duration-700 flex flex-col justify-end shadow-2xl">
              <div className="absolute inset-0 bg-[url('/leading/latar%20belakang.png')] bg-cover bg-center opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-1000 mix-blend-luminosity"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#010b14] via-[#010b14]/80 to-transparent"></div>
              
              <div className="absolute -top-40 -right-40 w-72 h-72 bg-cyan-600/20 rounded-full blur-[80px] group-hover:bg-cyan-500/40 transition-colors duration-700"></div>
              
              <ShieldCheck className="absolute top-6 right-6 w-16 h-16 text-cyan-900/50 group-hover:text-cyan-500/20 group-hover:-rotate-12 group-hover:scale-125 transition-all duration-700" strokeWidth={1} />
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-[#032a52] rounded-xl flex items-center justify-center mb-6 border border-cyan-800 group-hover:bg-cyan-500 group-hover:border-cyan-300 transition-colors duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  <Compass className="w-6 h-6 text-cyan-400 group-hover:text-[#010b14] transition-colors" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                  <h3 className="text-xl md:text-2xl font-black text-white">Patroli Keamanan Laut</h3>
                  <span className="w-max px-2.5 py-0.5 bg-cyan-500/20 text-cyan-300 text-[10px] uppercase font-bold rounded-full border border-cyan-500/30">Divisi Operasional</span>
                </div>
                <p className="text-blue-100/70 text-sm md:text-base font-light leading-[1.8] max-w-md">
                  Ikut serta dalam manajemen operasi pengawasan pesisir. Pantau aktivitas kelautan, pelajari protokol keamanan, dan dampingi aparat dalam menindak eksploitasi perairan.
                </p>
              </div>
            </div>

            {/* BENTO 2: Konservasi (Medium) */}
            <div className="group md:col-span-2 rounded-[2rem] p-8 relative overflow-hidden bg-[#021c36] border border-emerald-900/50 hover:border-emerald-400/50 transition-all duration-700 shadow-2xl flex items-center gap-6">
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-600/10 rounded-tl-full blur-[50px] group-hover:bg-emerald-500/30 transition-colors duration-700"></div>
              
              <div className="relative z-10 flex-1">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">Divisi Ekologi</div>
                <h3 className="text-lg md:text-xl font-black text-white mb-3">Rehabilitasi Ekosistem</h3>
                <p className="text-blue-100/70 text-xs md:text-sm font-light leading-[1.8]">
                  Terjun langsung dalam proyek transplantasi terumbu karang, penanaman mangrove, dan analisis parameter kualitas air laut.
                </p>
              </div>
              <div className="relative z-10 w-16 h-16 shrink-0 bg-[#010b14] rounded-full border-4 border-[#032a52] flex items-center justify-center group-hover:border-emerald-500 transition-colors duration-500 hidden sm:flex">
                <Fish className="w-8 h-8 text-emerald-500 group-hover:animate-bounce" />
              </div>
            </div>

            {/* BENTO 3: Pemberdayaan (Small) */}
            <div className="group rounded-[2rem] p-6 relative overflow-hidden bg-[#011429] border border-blue-900/50 hover:border-blue-400/50 transition-all duration-700 shadow-2xl flex flex-col justify-center text-center items-center">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <Users className="w-10 h-10 text-blue-500 mb-4 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-base md:text-lg font-black text-white mb-2">Bina Nelayan</h3>
              <p className="text-blue-100/60 text-xs md:text-sm font-light leading-relaxed">
                Edukasi masyarakat pesisir & kembangkan potensi ekonomi nelayan lokal.
              </p>
            </div>

            {/* BENTO 4: Sertifikasi (Small) */}
            <div className="group rounded-[2rem] p-6 relative overflow-hidden bg-gradient-to-br from-[#021f3d] to-[#011124] border border-teal-900/50 hover:border-teal-400/50 transition-all duration-700 shadow-2xl flex flex-col justify-center text-center items-center">
              <Award className="w-10 h-10 text-teal-400 mb-4 group-hover:rotate-12 transition-transform duration-500" />
              <h3 className="text-base md:text-lg font-black text-white mb-2">Sertifikasi Resmi</h3>
              <p className="text-blue-100/60 text-xs md:text-sm font-light leading-relaxed">
                Bukti portofolio otentik dari instansi kelautan pemerintah untuk karir Anda.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          3.5 MAGANG FORM & POSITIONS
          ========================================================= */}
      <MagangForm />

      {/* =========================================================
          4. VERTICAL "SONAR" TIMELINE (ALUR)
          ========================================================= */}
      <section className="py-24 relative bg-[#010e1a] overflow-hidden">
        {/* Background Sonar Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[1px] border-cyan-900/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[1px] border-cyan-900/30 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-[1px] border-cyan-900/40 rounded-full"></div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6">
              Navigasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Rekrutmen.</span>
            </h2>
            <p className="text-blue-100/70 text-base md:text-lg font-light leading-[1.8] max-w-2xl mx-auto tracking-wide">
              Proses seleksi dirancang transparan dan sistematis. Pastikan Anda memenuhi setiap tahapan sebelum melaut bersama kami.
            </p>
          </div>

          <div className="relative">
            {/* The Vertical Line */}
            <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-900 via-cyan-500 to-transparent md:-translate-x-1/2 rounded-full"></div>

            <div className="space-y-10 md:space-y-16">
              
              {/* Step 1 */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                <div className="md:w-5/12 order-2 md:order-1 pl-16 md:pl-0 md:text-right pt-2 md:pt-0">
                  <h4 className="text-lg md:text-xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors">Verifikasi Profil</h4>
                  <p className="text-blue-100/70 text-sm font-light leading-[1.8]">
                    Pembuatan akun di portal magang. Pengumpulan dokumen wajib seperti Surat Pengantar Kampus, Transkrip Nilai, dan Proposal Magang.
                  </p>
                </div>
                <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 -translate-y-0 md:-translate-y-1/2 md:-translate-x-1/2 w-12 h-12 bg-[#010b14] border-4 border-cyan-500 rounded-full flex items-center justify-center z-10 shadow-[0_0_20px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform">
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-400 opacity-0 group-hover:animate-ping"></div>
                  <FileText className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="md:w-5/12 order-3 md:order-3 hidden md:block"></div>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                <div className="md:w-5/12 order-2 md:order-3 pl-16 md:pl-0 pt-2 md:pt-0">
                  <h4 className="text-lg md:text-xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors">Seleksi & Penempatan</h4>
                  <p className="text-blue-100/70 text-sm font-light leading-[1.8]">
                    Review kompetensi oleh tim HR. Penempatan divisi (Operasional, Konservasi, atau Pemberdayaan) berdasarkan latar belakang jurusan.
                  </p>
                </div>
                <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 -translate-y-0 md:-translate-y-1/2 md:-translate-x-1/2 w-12 h-12 bg-[#010b14] border-4 border-cyan-500 rounded-full flex items-center justify-center z-10 shadow-[0_0_20px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform">
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-400 opacity-0 group-hover:animate-ping"></div>
                  <Search className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="md:w-5/12 order-3 md:order-1 hidden md:block"></div>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                <div className="md:w-5/12 order-2 md:order-1 pl-16 md:pl-0 md:text-right pt-2 md:pt-0">
                  <h4 className="text-lg md:text-xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors">Pelaksanaan & Logbook</h4>
                  <p className="text-blue-100/70 text-sm font-light leading-[1.8]">
                    Masa magang aktif. Anda wajib mengisi logbook harian digital di sistem sebagai bukti kehadiran dan pencapaian target harian.
                  </p>
                </div>
                <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 -translate-y-0 md:-translate-y-1/2 md:-translate-x-1/2 w-12 h-12 bg-[#010b14] border-4 border-cyan-500 rounded-full flex items-center justify-center z-10 shadow-[0_0_20px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform">
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-400 opacity-0 group-hover:animate-ping"></div>
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="md:w-5/12 order-3 md:order-3 hidden md:block"></div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          5. FAQ (COMPLEX ACCORDION)
          ========================================================= */}
      <section className="py-20 relative border-t border-cyan-900/30">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Pusat Informasi <span className="text-cyan-500">Kadet.</span></h2>
            <p className="text-blue-100/70 font-light text-base">Pertanyaan yang sering diajukan seputar operasional magang CDKWB.</p>
          </div>

          <div className="space-y-4">
            {/* Accordion Item 1 */}
            <details className="group bg-[#021529] border border-cyan-900/40 rounded-2xl overflow-hidden open:bg-[#032040] transition-colors duration-300">
              <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer list-none text-base md:text-lg font-bold text-white">
                Apakah program ini terbuka untuk semua jurusan?
                <span className="w-8 h-8 rounded-full bg-[#010b14] flex items-center justify-center text-cyan-500 group-open:-rotate-180 transition-transform duration-300">
                  <ChevronDown className="w-4 h-4" />
                </span>
              </summary>
              <div className="px-5 md:px-6 pb-5 md:pb-6 text-blue-100/70 text-sm font-light leading-[1.8] border-t border-cyan-900/30 pt-4">
                Prioritas utama kami adalah mahasiswa dari jurusan Ilmu Kelautan, Perikanan, Oseanografi, Teknik Lingkungan, dan Hukum (untuk pengawasan laut). Namun, kami juga menerima jurusan Manajemen, IT, dan Ilmu Komunikasi untuk divisi pendukung.
              </div>
            </details>

            {/* Accordion Item 2 */}
            <details className="group bg-[#021529] border border-cyan-900/40 rounded-2xl overflow-hidden open:bg-[#032040] transition-colors duration-300">
              <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer list-none text-base md:text-lg font-bold text-white">
                Berapa lama durasi magang dilaksanakan?
                <span className="w-8 h-8 rounded-full bg-[#010b14] flex items-center justify-center text-cyan-500 group-open:-rotate-180 transition-transform duration-300">
                  <ChevronDown className="w-4 h-4" />
                </span>
              </summary>
              <div className="px-5 md:px-6 pb-5 md:pb-6 text-blue-100/70 text-sm font-light leading-[1.8] border-t border-cyan-900/30 pt-4">
                Durasi magang bervariasi antara 1 hingga 6 bulan, tergantung pada persyaratan SKS dari perguruan tinggi masing-masing dan kesepakatan pada saat wawancara awal.
              </div>
            </details>

            {/* Accordion Item 3 */}
            <details className="group bg-[#021529] border border-cyan-900/40 rounded-2xl overflow-hidden open:bg-[#032040] transition-colors duration-300">
              <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer list-none text-base md:text-lg font-bold text-white">
                Apakah ada fasilitas mess/penginapan?
                <span className="w-8 h-8 rounded-full bg-[#010b14] flex items-center justify-center text-cyan-500 group-open:-rotate-180 transition-transform duration-300">
                  <ChevronDown className="w-4 h-4" />
                </span>
              </summary>
              <div className="px-5 md:px-6 pb-5 md:pb-6 text-blue-100/70 text-sm font-light leading-[1.8] border-t border-cyan-900/30 pt-4">
                Saat ini CDKWB belum menyediakan fasilitas mess tetap untuk peserta magang. Akomodasi dan transportasi harian menjadi tanggung jawab pribadi mahasiswa.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* =========================================================
          6. MASSIVE SWEEPING CTA
          ========================================================= */}
      <section className="py-24 relative overflow-hidden bg-[#000000]">
        {/* Abstract Sweeping Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-900 via-[#010b14] to-[#010b14] opacity-80"></div>
        <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-cyan-600/20 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 w-[1200px] h-[400px] bg-blue-600/30 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 rotate-12 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <Globe className="w-16 h-16 text-cyan-500 mx-auto mb-8 opacity-80" strokeWidth={1} />
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-xl">
            Lautan Memanggil. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Apakah Anda Siap?</span>
          </h2>
          
          <p className="text-base md:text-lg text-blue-100/70 mb-12 font-light max-w-xl mx-auto leading-[1.8]">
            Ambil peranmu di garda depan. Jadikan pengalaman magang ini sebagai pijakan terkuat dalam karir kemaritiman Anda.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#daftar" className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black rounded-full overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.4)] hover:shadow-[0_0_80px_rgba(6,182,212,0.6)] hover:-translate-y-2 transition-all duration-500 text-base md:text-lg tracking-wider">
              <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              <span className="relative flex items-center justify-center gap-2">
                Daftar Sebagai Kadet <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
