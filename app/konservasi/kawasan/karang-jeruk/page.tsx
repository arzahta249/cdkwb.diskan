'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  MapPin, Fish, Waves, Shield, TreePine, Camera, ChevronRight, Anchor, 
  Sun, Wind, Target, Scale, FileText, CheckCircle2, AlertTriangle, 
  X, Layers, Calendar, ArrowRight, Eye, Phone, Info, Check, Search,
  Activity, TrendingUp, TrendingDown, HelpCircle, Sparkles, BarChart2,
  ExternalLink
} from 'lucide-react';
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

// ── 1. STATS (HERO & SUMMARY) ──
const stats = [
  { 
    value: '238,16', 
    unit: 'Ha', 
    label: 'Luas Kawasan Terlindungi', 
    icon: <MapPin className="w-5 h-5" />,
    detail: 'Kepmen-KP No. 75/2022' 
  },
  { 
    value: '11', 
    unit: 'Kategori', 
    label: 'Bentuk Pertumbuhan Karang', 
    icon: <Waves className="w-5 h-5" />,
    detail: 'Lifeform UPT (Monitoring 2025)' 
  },
  { 
    value: '52%', 
    unit: 'Target', 
    label: 'Capaian Tutupan Karang 2029', 
    icon: <Target className="w-5 h-5" />, 
    detail: '31,02% dari target >60% (Zona Inti)',
    isTarget: true 
  },
  { 
    value: '2', 
    unit: 'Famili', 
    label: 'Ikan Karang Teridentifikasi', 
    icon: <Fish className="w-5 h-5" />,
    detail: 'Pomacentridae & Labridae (2025)' 
  },
  { 
    value: '2022', 
    unit: '', 
    label: 'Tahun Penetapan Kepmen-KP', 
    icon: <Shield className="w-5 h-5" />,
    detail: 'Kepmen-KP No. 75 Tahun 2022' 
  },
];

// ── 2. KEUNGGULAN KAWASAN ──
const features = [
  {
    icon: <Waves className="w-6 h-6 text-cyan-600" />,
    title: 'Terumbu Karang Alami',
    desc: 'Tutupan karang hidup Zona Inti mencapai 31,02% (kategori sedang) dan Zona Rehabilitasi 14,50% (monitoring 2025), menjadi habitat penting bagi juvenil biota laut.',
    bg: 'bg-cyan-50',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-sky-600" />,
    title: '11 Kategori Bentuk Karang',
    desc: 'Teridentifikasi 11 kategori bentuk pertumbuhan (lifeform) karang: Acropora (ACB, ACD, ACE, ACS, ACT) serta Non-Acropora (CB, CF, CHL, CM, CS, CME).',
    bg: 'bg-sky-50',
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-600" />,
    title: 'Zona Perlindungan Mutlak',
    desc: 'Zona Inti seluas 7,02 Ha sepenuhnya dilindungi dari segala aktivitas penangkapan ikan dan penambangan karang guna menjaga proses regenerasi alami.',
    bg: 'bg-blue-50',
  },
  {
    icon: <Camera className="w-6 h-6 text-teal-600" />,
    title: 'Wisata Edukasi & Riset',
    desc: 'Zona Pemanfaatan Terbatas (228,16 Ha) terbuka untuk kegiatan snorkeling ramah lingkungan, riset oseanografi, dan praktik magang konservasi berbasis perizinan.',
    bg: 'bg-teal-50',
  },
];

// ── 3. TARGET STRATEGIS & PROGRES ──
const conservationTargets = [
  {
    icon: <Target className="w-5 h-5 text-cyan-600" />,
    title: 'Peningkatan Tutupan Karang >60%',
    desc: 'Meningkatkan indeks tutupan karang hidup menuju kategori baik (>60%). Capaian saat ini di Zona Inti sebesar 31,02% (52% dari target 60%), dengan tren fluktuatif sejak 2022.',
    targetCapaian: 'Target 2029',
    progress: '52%',
    statusText: '52% dari Target (31,02% / 60%)',
    barColor: 'bg-cyan-600',
    hasData: true,
  },
  {
    icon: <Waves className="w-5 h-5 text-sky-600" />,
    title: 'Restorasi 5.000+ Fragmen Karang',
    desc: 'Rencana transplantasi dan pemasangan media terumbu buatan (artificial reef/spider web) di Zona Rehabilitasi (2,98 Ha). Data jumlah fragmen tertanam sedang dalam proses kompilasi lapangan.',
    targetCapaian: 'Target 2026',
    progress: '0%',
    statusText: 'Data capaian belum tersedia — akan diperbarui',
    barColor: 'bg-slate-300',
    hasData: false,
  },
  {
    icon: <Shield className="w-5 h-5 text-emerald-600" />,
    title: '100% Bebas Destructive Fishing',
    desc: 'Operasi patroli terpadu bersama Pokmaswas dan Polairud untuk memastikan nihil pelanggaran bom, potas, atau trawl. Data resmi insiden dan jam patroli akan diperbarui berkala.',
    targetCapaian: 'Target Berkelanjutan',
    progress: '0%',
    statusText: 'Data capaian belum tersedia — akan diperbarui',
    barColor: 'bg-slate-300',
    hasData: false,
  },
  {
    icon: <TreePine className="w-5 h-5 text-blue-600" />,
    title: 'Pemberdayaan 100+ Nelayan Lokal',
    desc: 'Program sertifikasi pemandu wisata bahari, penjaga kawasan, dan pembinaan kelompok nelayan pesisir. Data resmi jumlah nelayan terfasilitasi akan diperbarui.',
    targetCapaian: 'Target 2027',
    progress: '0%',
    statusText: 'Data capaian belum tersedia — akan diperbarui',
    barColor: 'bg-slate-300',
    hasData: false,
  },
];

// ── 4. DATA TREN TUTUPAN KARANG TAHUNAN (2022–2025) ──
const trendZonaInti = [
  { tahun: '2022', tutupan: 57.07, status: 'Baik', color: 'bg-emerald-500' },
  { tahun: '2023', tutupan: 20.91, status: 'Buruk', color: 'bg-rose-500' },
  { tahun: '2024', tutupan: 50.46, status: 'Baik', color: 'bg-emerald-500' },
  { tahun: '2025', tutupan: 31.02, status: 'Sedang', color: 'bg-amber-500' },
];

const trendZonaRehabilitasi = [
  { tahun: '2022', tutupan: null, status: 'Belum Ada Data', color: 'bg-slate-300' },
  { tahun: '2023', tutupan: 46.98, status: 'Sedang', color: 'bg-amber-500' },
  { tahun: '2024', tutupan: 9.35, status: 'Buruk', color: 'bg-rose-500' },
  { tahun: '2025', tutupan: 14.50, status: 'Buruk', color: 'bg-rose-500' },
];

// ── 5. BENTUK PERTUMBUHAN KARANG (11 LIFEFORM UPT) ──
const coralLifeforms = [
  { code: 'ACB', name: 'Acropora Branching', category: 'Karang Acropora Bercabang' },
  { code: 'ACD', name: 'Acropora Digitate', category: 'Karang Acropora Jari' },
  { code: 'ACE', name: 'Acropora Encrusting', category: 'Karang Acropora Merayap' },
  { code: 'ACS', name: 'Acropora Submassive', category: 'Karang Acropora Submasif' },
  { code: 'ACT', name: 'Acropora Tabulate', category: 'Karang Acropora Meja' },
  { code: 'CB', name: 'Coral Branching', category: 'Karang Non-Acropora Bercabang' },
  { code: 'CF', name: 'Coral Foliose', category: 'Karang Lembaran / Daun' },
  { code: 'CHL', name: 'Coral Heliopora', category: 'Karang Biru / Heliopora' },
  { code: 'CM', name: 'Coral Massive', category: 'Karang Masif / Membatu' },
  { code: 'CS', name: 'Coral Submassive', category: 'Karang Submasif Kokoh' },
  { code: 'CME', name: 'Coral Millepora', category: 'Karang Api / Millepora' },
];

// ── 6. ZONASI KAWASAN KONSERVASI (KEPMEN-KP NO. 75/2022) ──
const zonasiKawasan = [
  {
    code: 'Z-01',
    name: 'Zona Inti (Core Zone)',
    luas: '7,02 Ha',
    topBar: 'bg-rose-600',
    codeStyle: 'bg-rose-950/80 text-rose-300 border-rose-800',
    badge: 'Perlindungan Mutlak / No-Take Zone',
    badgeStyle: 'bg-rose-900/40 text-rose-200 border-rose-700/60',
    desc: 'Area terlindungi mutlak seluas 7,02 Ha untuk perlindungan habitat terumbu karang alami, tempat pemijahan alami biota laut (spawning ground), dan pelestarian plasma nutfah sesuai Lampiran I & II Kepmen-KP No. 75/2022.',
    allowed: [
      'Penelitian ilmiah dan riset oseanografi dengan izin resmi',
      'Pemantauan ekologis berkala oleh petugas CDKWB & instansi berwenang',
      'Pendidikan lingkungan hidup tanpa pengambilan sampel fisik / destruktif',
    ],
    prohibited: [
      'Segala bentuk penangkapan ikan dan pengambilan biota laut',
      'Penjatuhan jangkar kapal secara bebas di atas terumbu karang',
      'Aktivitas pariwisata umum dan kegiatan selam rekreasional massal',
      'Pemasangan instalasi bawah laut, pengerukan, atau penambangan',
    ],
  },
  {
    code: 'Z-02',
    name: 'Zona Pemanfaatan Terbatas (Limited Utilization Zone)',
    luas: '228,16 Ha',
    topBar: 'bg-gradient-to-r from-sky-400 to-cyan-500',
    codeStyle: 'bg-sky-950/80 text-sky-300 border-sky-800',
    badge: 'Pemanfaatan Terbatas & Wisata Ramah Lingkungan',
    badgeStyle: 'bg-sky-900/40 text-sky-200 border-sky-700/60',
    desc: 'Zona terluas (228,16 Ha) yang dialokasikan untuk pemanfaatan sumber daya perairan secara lestari, pariwisata bahari ramah lingkungan, penelitian terapan, dan pendidikan konservasi.',
    allowed: [
      'Snorkeling dan scuba diving berwawasan lingkungan (Look, Don\'t Touch)',
      'Penangkapan ikan tradisional oleh nelayan lokal dengan alat tangkap ramah lingkungan',
      'Fotografi bawah air dan pembuatan dokumenter edukatif',
      'Penambatan kapal pada Mooring Buoy yang disediakan',
      'Penelitian terapan dan praktik magang konservasi bahari',
    ],
    prohibited: [
      'Penggunaan alat tangkap destruktif (bom ikan, racun sianida, trawl, cantrang)',
      'Memegang, menginjak, atau merusak koloni terumbu karang',
      'Mengambil terumbu karang, cangkang kerang, atau suvenir biota laut',
      'Pembuangan limbah kapal, oli bekas, atau sampah plastik ke perairan',
    ],
  },
  {
    code: 'Z-03',
    name: 'Zona Lain: Zona Rehabilitasi (Rehabilitation Zone)',
    luas: '2,98 Ha',
    topBar: 'bg-amber-500',
    codeStyle: 'bg-amber-950/80 text-amber-300 border-amber-800',
    badge: 'Pemulihan & Rehabilitasi Ekosistem',
    badgeStyle: 'bg-amber-900/40 text-amber-200 border-amber-700/60',
    desc: 'Zona lain sesuai peruntukan kawasan seluas 2,98 Ha yang difokuskan untuk pemulihan dan rehabilitasi ekosistem terumbu karang dan habitat perairan yang mengalami degradasi.',
    allowed: [
      'Pemasangan media terumbu buatan (artificial reef, spider web, & biorock)',
      'Transplantasi fragmen bibit karang bercabang (Acropora sp.)',
      'Monitoring berkala laju pertumbuhan dan survival rate karang',
      'Pembersihan terumbu dari sampah laut dan hama bintang laut berduri',
    ],
    prohibited: [
      'Segala aktivitas penangkapan ikan selama masa pemulihan ekosistem',
      'Aktivitas selam dan wisata tanpa didampingi instruktur konservasi',
      'Pelayaran dan penjangkaran kapal di atas media struktur rehabilitasi',
      'Aktivitas yang memicu pengadukan sedimen lumpur dasar perairan',
    ],
  },
];

// ── 7. DASAR HUKUM ──
const legalRegulations = [
  {
    category: 'Keputusan Menteri Kelautan & Perikanan RI',
    badge: 'Penetapan Kawasan Resmi',
    title: 'Kepmen-KP No. 75 Tahun 2022',
    subject: 'Kawasan Konservasi di Perairan di Wilayah Karang Jeruk Provinsi Jawa Tengah',
    desc: 'Menetapkan kawasan perairan Karang Jeruk seluas 238,16 Ha sebagai Kawasan Konservasi yang dikelola sebagai Taman di Perairan yang terdiri dari Zona Inti (7,02 Ha), Zona Pemanfaatan Terbatas (228,16 Ha), dan Zona Rehabilitasi (2,98 Ha). Ditetapkan di Jakarta pada 27 Desember 2022.',
  },
  {
    category: 'Undang-Undang Perikanan',
    badge: 'Ketentuan Pidana Ketat',
    title: 'UU No. 31 Tahun 2004 jo. UU No. 45 Tahun 2009',
    subject: 'Larangan Destructive Fishing & Pidana Perusakan Biota Laut',
    desc: 'Pasal 84 & 85 menetapkan ancaman pidana penjara paling lama 6 (enam) tahun dan denda maksimal Rp 1.200.000.000,- bagi siapa saja yang melakukan penangkapan ikan menggunakan bahan peledak, bahan kimia beracun, atau alat perusak terumbu karang.',
  },
  {
    category: 'Peraturan Menteri Kelautan & Perikanan',
    badge: 'Tata Kelola Konservasi',
    title: 'Permen KP No. 31/PERMEN-KP/2020',
    subject: 'Pengelolaan Kawasan Konservasi Perairan',
    desc: 'Mengatur standar baku penetapan, zonasi (Zona Inti, Pemanfaatan Terbatas, dan Zona Lainnya), kelembagaan pengelola, serta mekanisme pengawasan Kawasan Konservasi Perairan.',
  },
  {
    category: 'Undang-Undang Republik Indonesia',
    badge: 'Hukum Nasional Utama',
    title: 'UU No. 27 Tahun 2007 jo. UU No. 1 Tahun 2014',
    subject: 'Pengelolaan Wilayah Pesisir dan Pulau-Pulau Kecil',
    desc: 'Landasan hukum utama mengenai perlindungan, konservasi, dan pemanfaatan berkelanjutan sumber daya pesisir dan pulau-pulau kecil di seluruh wilayah perairan Indonesia.',
  },
];

export default function KarangJerukPage() {
  const [heroRef, heroVisible] = useInView(0.1);
  const [statsRef, statsVisible] = useInView(0.1);
  const [featuresRef, featuresVisible] = useInView(0.1);
  const [targetsRef, targetsVisible] = useInView(0.1);
  const [trendRef, trendVisible] = useInView(0.1);
  const [lifeformRef, lifeformVisible] = useInView(0.1);
  const [zonesRef, zonesVisible] = useInView(0.1);
  const [lawsRef, lawsVisible] = useInView(0.1);
  const [aboutRef, aboutVisible] = useInView(0.1);
  const [mapRef, mapVisible] = useInView(0.1);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f2238] flex flex-col selection:bg-cyan-500 selection:text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        .font-display {
          font-family: 'Big Shoulders Display', sans-serif;
        }
      `}</style>

      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative bg-gradient-to-br from-[#07182c] via-[#0c2948] to-[#061424] overflow-hidden pt-8 pb-32">
        {/* Subtle dot pattern */}
        <div 
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '6px 6px' }}
        />

        {/* Circular Radar Glowing Orbs */}
        <div className="absolute -top-40 -right-24 w-[520px] h-[520px] rounded-full border border-sky-400/20 pointer-events-none" />
        <div className="absolute -top-20 -right-4 w-[380px] h-[380px] rounded-full border border-sky-400/25 pointer-events-none" />
        <div className="absolute top-0 right-16 w-[240px] h-[240px] rounded-full border border-sky-400/30 pointer-events-none" />
        <div className="absolute -top-28 -right-28 w-[500px] h-[500px] rounded-full bg-cyan-600/20 blur-3xl pointer-events-none" />

        <div ref={heroRef} className="relative z-10 container mx-auto px-6 max-w-7xl pt-6">
          {/* Breadcrumbs */}
          <div
            className="flex items-center gap-2 text-sky-200/60 text-xs sm:text-sm mb-12 transition-all duration-700"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)' }}
          >
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span>›</span>
            <span className="text-sky-200/80">Konservasi</span>
            <span>›</span>
            <span className="text-sky-200/80">Kawasan Konservasi</span>
            <span>›</span>
            <span className="text-sky-100 font-semibold">Karang Jeruk</span>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div
              className="transition-all duration-700 delay-100"
              style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)' }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-cyan-300 text-xs font-extrabold tracking-wider uppercase mb-6 shadow-sm">
                <Waves className="w-3.5 h-3.5 text-cyan-400" />
                Kawasan Konservasi di Perairan (Kepmen-KP No. 75/2022)
              </div>

              <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-[82px] leading-[0.95] text-white tracking-tight mb-6">
                Kawasan Konservasi<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-300 to-teal-300">
                  Karang Jeruk
                </span>
              </h1>

              <p className="text-sky-100/80 text-base sm:text-lg leading-relaxed max-w-xl mb-10">
                Kawasan konservasi perairan seluas <strong>238,16 Ha</strong> di perairan Kabupaten Tegal, Jawa Tengah — 
                dikelola oleh Pemerintah Provinsi Jawa Tengah (CDKWB) untuk melindungi ekosistem terumbu karang alami, 
                daerah pemijahan biota laut, dan perikanan berkelanjutan.
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  '238,16 Ha Luas Kawasan',
                  '3 Zona Konservasi',
                  '31% Tutupan Karang (Zona Inti)',
                  'Kepmen-KP No. 75/2022',
                  'Kabupaten Tegal, Jawa Tengah',
                ].map((tag, i) => (
                  <div 
                    key={i} 
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-xs sm:text-sm font-bold"
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Circular Frame */}
            <div
              className="relative transition-all duration-700 delay-200 lg:h-[500px] flex items-center justify-center"
              style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)' }}
            >
              {/* Metallic / Portal Outer Ring */}
              <div className="relative w-full max-w-[460px] aspect-square rounded-full p-4 bg-gradient-to-tr from-sky-800/80 via-slate-600/60 to-cyan-500/80 shadow-2xl shadow-black/60 border border-white/20">
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-slate-900/80 bg-slate-950">
                  <img
                    src="/leading/konservasi_hero.png"
                    alt="Terumbu karang Kawasan Konservasi Karang Jeruk"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
                </div>

                {/* Compass Marker Dots */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-md" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-md" />
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-md" />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-md" />
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-4 sm:bottom-4 -left-2 sm:left-2 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl border border-sky-100 flex items-center gap-3.5 z-20">
                <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
                  <Waves className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <div className="font-display font-extrabold text-2xl text-[#07182c] leading-tight">
                    31,02%
                  </div>
                  <div className="text-xs text-slate-500 font-bold">
                    Tutupan Karang Hidup <span className="text-[10px] text-cyan-700 block font-semibold">(Zona Inti, Data 2025 • Zona Rehab 14,50%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ocean Wave / Coral Divider */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none overflow-hidden leading-none">
          <svg
            className="relative block w-full h-[50px] sm:h-[80px]"
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,45 C 280,95 420,5 720,45 C 1020,85 1160,5 1440,45 L1440,90 L0,90 Z"
              fill="#eef6fb"
            />
          </svg>
        </div>
      </section>

      {/* ── STATS SECTION (TIMELINE CARDS) ── */}
      <section className="bg-[#eef6fb] px-6 pb-20 pt-2 relative z-30">
        <div
          ref={statsRef}
          className="container mx-auto max-w-7xl -mt-16 sm:-mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className={`rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between ${
                s.isTarget
                  ? 'bg-white text-[#07182c] border-2 border-cyan-400 shadow-cyan-900/15 relative overflow-hidden'
                  : 'bg-white text-[#07182c] border border-slate-200/80 shadow-slate-900/10'
              }`}
              style={{
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? undefined : 'translateY(30px)',
                transitionDelay: `${i * 90}ms`,
              }}
            >
              {s.isTarget && (
                <div className="absolute top-0 right-0 bg-cyan-600 text-white text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-bl-xl tracking-wider">
                  Target
                </div>
              )}
              
              <div>
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-4 ${
                  s.isTarget ? 'border-cyan-300 text-cyan-600 bg-cyan-50' : 'border-slate-200 text-sky-700 bg-slate-50'
                }`}>
                  {s.icon}
                </div>
                
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#07182c] leading-none mb-1">
                  {s.value}
                  {s.unit && <span className="font-sans text-sm sm:text-base font-bold ml-1.5 opacity-75">{s.unit}</span>}
                </div>
              </div>

              <div className="mt-2">
                <div className="text-xs sm:text-sm font-bold leading-tight text-slate-800">
                  {s.label}
                </div>
                <div className="text-[11px] text-slate-500 font-medium leading-tight mt-1">
                  {s.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── KEUNGGULAN KAWASAN ── */}
        <div ref={featuresRef} className="container mx-auto max-w-7xl mt-20 pt-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block bg-sky-100 text-sky-900 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Keunggulan Kawasan
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#07182c] tracking-tight mb-4">
              Mengapa Karang Jeruk Istimewa?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Kawasan konservasi perairan seluas 238,16 Ha di lepas pantai Kabupaten Tegal yang menyimpan formasi terumbu karang alami penting di pesisir utara Jawa Tengah.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                style={{
                  opacity: featuresVisible ? 1 : 0,
                  transform: featuresVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${f.bg} flex items-center justify-center mb-5`}>
                    {f.icon}
                  </div>
                  <h3 className="font-extrabold text-lg text-[#07182c] mb-2.5">
                    {f.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARGET STRATEGIS & PROGRES ── */}
      <section className="bg-[#f0f6fa] py-24 px-6 relative border-y border-slate-200">
        <div ref={targetsRef} className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-sky-100 text-sky-900 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Target & Rencana Strategis
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#07182c] tracking-tight mb-4">
              Target Konservasi & Pemulihan Ekosistem
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Sasaran kinerja pengelolaan terpadu CDKWB untuk memulihkan tutupan karang, memberantas destructive fishing, dan meningkatkan kesejahteraan nelayan di perairan Karang Jeruk.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {conservationTargets.map((tgt, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                style={{
                  opacity: targetsVisible ? 1 : 0,
                  transform: targetsVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      {tgt.icon}
                    </div>
                    <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-sky-100 text-sky-900">
                      {tgt.targetCapaian}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base sm:text-lg text-[#07182c] mb-2 leading-snug">
                    {tgt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {tgt.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                    <span>Progres:</span>
                    <span className={`font-extrabold ${tgt.hasData ? 'text-cyan-700' : 'text-slate-500 text-[11px]'}`}>
                      {tgt.hasData ? tgt.progress : 'Belum Ada Data'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-1.5">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${tgt.barColor}`}
                      style={{ width: tgt.hasData ? tgt.progress : '0%' }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {tgt.statusText}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── GRAFIK & TREN TUTUPAN KARANG TAHUNAN (2022–2025) ── */}
          <div ref={trendRef} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                  <BarChart2 className="w-3.5 h-3.5" />
                  Data Monitoring Ekosistem (2022–2025)
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#07182c]">
                  Dinamika Tren Tutupan Karang Hidup Tahunan
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Hasil pemantauan metode UPT (Underwater Photo Transect) oleh tim SUOP CDKWB DKP Provinsi Jawa Tengah.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-bold text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> Baik (&gt;50%)</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-500 inline-block" /> Sedang (25–49%)</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-rose-500 inline-block" /> Buruk (&lt;25%)</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Zona Inti Chart */}
              <div className="bg-[#f8fafc] rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-600" />
                    <h4 className="font-extrabold text-base text-[#07182c]">Zona Inti (7,02 Ha)</h4>
                  </div>
                  <span className="text-xs font-bold text-slate-500">Target 2029: &gt;60%</span>
                </div>

                <div className="space-y-4">
                  {trendZonaInti.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                        <span className="flex items-center gap-2">
                          <span className="font-display font-extrabold text-base text-slate-900">{item.tahun}</span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            item.status === 'Baik' ? 'bg-emerald-100 text-emerald-800' :
                            item.status === 'Sedang' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {item.status}
                          </span>
                        </span>
                        <span className="font-extrabold text-[#07182c]">{item.tutupan}%</span>
                      </div>
                      <div className="w-full bg-slate-200/80 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 rounded-full ${item.color} transition-all duration-700`}
                          style={{ width: `${item.tutupan}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-800">Catatan Tren Ilmiah: </span>
                  Kondisi tutupan karang Zona Inti berfluktuasi secara alami dan antropogenik: 57,07% (2022) → 20,91% (2023) → 50,46% (2024) → 31,02% (2025). Capaian 2025 merepresentasikan <strong>51,7% (≈52%)</strong> dari target tutupan 60%.
                </div>
              </div>

              {/* Zona Rehabilitasi Chart */}
              <div className="bg-[#f8fafc] rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <h4 className="font-extrabold text-base text-[#07182c]">Zona Rehabilitasi (2,98 Ha)</h4>
                  </div>
                  <span className="text-xs font-bold text-slate-500">Monitoring Dimulai 2023</span>
                </div>

                <div className="space-y-4">
                  {trendZonaRehabilitasi.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                        <span className="flex items-center gap-2">
                          <span className="font-display font-extrabold text-base text-slate-900">{item.tahun}</span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            item.status === 'Sedang' ? 'bg-amber-100 text-amber-800' : 
                            item.status === 'Buruk' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {item.status}
                          </span>
                        </span>
                        <span className="font-extrabold text-[#07182c]">
                          {item.tutupan !== null ? `${item.tutupan}%` : '—'}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200/80 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 rounded-full ${item.color} transition-all duration-700`}
                          style={{ width: item.tutupan !== null ? `${item.tutupan}%` : '0%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-800">Catatan Zona Rehabilitasi: </span>
                  Zona Rehabilitasi mengalami penurunan dari 46,98% (2023) menjadi 9,35% (2024) dan sedikit membaik ke 14,50% (2025). Zona Pemanfaatan Terbatas (228,16 Ha) belum termasuk dalam titik stasiun monitoring UPT berkala.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENTUK PERTUMBUHAN KARANG & FAMILI IKAN ── */}
      <section className="bg-white py-24 px-6 relative border-b border-slate-200" ref={lifeformRef}>
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-sky-100 text-sky-900 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Karakteristik Hayati & Lifeform
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#07182c] tracking-tight mb-4">
              11 Bentuk Pertumbuhan Karang & Iktiofauna
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Berdasarkan Laporan Monitoring Ekosistem Karang Jeruk Tahun 2025 (SUOP CDKWB DKP Jateng), teridentifikasi 11 kategori bentuk pertumbuhan karang (lifeform) dan 2 famili ikan karang kunci.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
            {/* 11 Lifeform Karang */}
            <div className="bg-[#f8fafc] rounded-3xl p-6 sm:p-8 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-extrabold text-lg sm:text-xl text-[#07182c] flex items-center gap-2">
                    <Waves className="w-5 h-5 text-cyan-600" />
                    11 Kategori Lifeform Karang (UPT 2025)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Klasifikasi morfologi pertumbuhan karang keras dan lunak di stasiun survei
                  </p>
                </div>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-cyan-100 text-cyan-900">
                  11 Lifeform
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {coralLifeforms.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-3.5 border border-slate-200/80 flex items-center gap-3">
                    <span className="w-11 h-9 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-800 font-mono font-extrabold text-xs flex items-center justify-center shrink-0">
                      {item.code}
                    </span>
                    <div>
                      <div className="font-extrabold text-xs text-[#07182c] leading-tight">{item.name}</div>
                      <div className="text-[11px] text-slate-500">{item.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Iktiofauna & Catatan Ilmiah */}
            <div className="space-y-6">
              <div className="bg-[#f8fafc] rounded-3xl p-6 sm:p-7 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-700">
                    <Fish className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-[#07182c]">2 Famili Ikan Karang</h4>
                    <span className="text-xs text-slate-500">Survei 17 & 20 Juni 2025 (2 Stasiun)</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="bg-white rounded-2xl p-4 border border-slate-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-extrabold text-sm text-[#07182c]">Famili Pomacentridae</span>
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800">Dominan</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Genus <em>Abudefduf</em> (ikan betok laut / damselfish) yang hidup berasosiasi kuat di sekitar koloni karang hidup.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-slate-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-extrabold text-sm text-[#07182c]">Famili Labridae</span>
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">Teridentifikasi</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ikan keling / wrasses yang berperan penting dalam rantai makanan ekosistem terumbu karang.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-200/80 text-[11px] text-cyan-900 leading-relaxed">
                  <strong>Catatan Metodologi:</strong> Pengambilan data ikan karang dilakukan di 2 stasiun UPT (Zona Inti & Zona Rehabilitasi). Keanekaragaman aktual di seluruh bentang 238,16 Ha berpotensi lebih tinggi seiring penambahan stasiun pengamatan.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ZONASI KAWASAN KONSERVASI (KEPMEN-KP NO. 75/2022) ── */}
      <section className="bg-gradient-to-b from-[#091f38] via-[#0b2746] to-[#07192e] text-white py-24 px-6 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)', backgroundSize: '6px 6px' }}
        />

        <div ref={zonesRef} className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Tata Ruang Konservasi Laut
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight mb-4">
              Zonasi Kawasan Konservasi Karang Jeruk
            </h2>
            <p className="text-sky-100/80 text-sm sm:text-base leading-relaxed">
              Pembagian 3 zona pengelolaan berdasarkan Keputusan Menteri Kelautan dan Perikanan Republik Indonesia Nomor 75 Tahun 2022 (Total Luas: 238,16 Hektare).
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {zonasiKawasan.map((z, idx) => (
              <div
                key={idx}
                className="bg-[#0e2c4d]/90 rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-900/30"
              >
                {/* Zone Header Top Bar */}
                <div className={`h-1.5 w-full ${z.topBar}`} />

                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className={`text-xs font-mono font-extrabold px-2.5 py-1 rounded border ${z.codeStyle}`}>
                        {z.code}
                      </span>
                      <span className="text-xs font-bold text-white/90 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                        Luas: {z.luas}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-xl text-white mb-2 leading-snug">
                      {z.name}
                    </h3>
                    <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full border mb-4 ${z.badgeStyle}`}>
                      {z.badge}
                    </span>

                    <p className="text-xs sm:text-sm text-sky-100/80 leading-relaxed mb-6">
                      {z.desc}
                    </p>

                    {/* Allowed Activities */}
                    <div className="bg-emerald-950/40 rounded-2xl p-4 border border-emerald-500/20 mb-4">
                      <div className="text-[11px] font-extrabold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Aktivitas yang Diperbolehkan:</span>
                      </div>
                      <ul className="space-y-1.5">
                        {z.allowed.map((item, aIdx) => (
                          <li key={aIdx} className="text-xs text-emerald-100/90 flex items-start gap-2 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Prohibited Activities */}
                    <div className="bg-rose-950/40 rounded-2xl p-4 border border-rose-500/20">
                      <div className="text-[11px] font-extrabold text-rose-300 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                        <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>Larangan Keras di Zona Ini:</span>
                      </div>
                      <ul className="space-y-1.5">
                        {z.prohibited.map((item, pIdx) => (
                          <li key={pIdx} className="text-xs text-rose-100/90 flex items-start gap-2 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DASAR HUKUM & REGULASI PERLINDUNGAN (LAWS) ── */}
      <section className="bg-[#07182c] text-white py-24 px-6 relative overflow-hidden border-b border-white/10">
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '6px 6px' }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

        <div ref={lawsRef} className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Payung Hukum & Regulasi
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight mb-4">
              Dasar Hukum & Ketentuan Pidana
            </h2>
            <p className="text-sky-100/80 text-sm sm:text-base leading-relaxed">
              Kawasan Konservasi Karang Jeruk dilindungi oleh undang-undang dan keputusan menteri yang mengikat seluruh pengguna ruang laut dengan sanksi hukum berat.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {legalRegulations.map((law, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-md hover:bg-white/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-xs font-extrabold text-cyan-300 uppercase tracking-wider">
                      {law.category}
                    </span>
                    <span className="text-[10px] font-bold bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 px-2.5 py-0.5 rounded-full">
                      {law.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">
                    {law.title}
                  </h3>
                  <div className="text-xs font-semibold text-emerald-400 mb-3">
                    {law.subject}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {law.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dinas Kelautan dan Perikanan Jawa Tengah & CDKWB</span>
                </div>
              </div>
            ))}
          </div>

          {/* Warning Callout Box */}
          <div className="bg-gradient-to-r from-red-950/80 to-rose-950/80 border-2 border-red-500/50 rounded-3xl p-7 sm:p-8 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0 text-red-400">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">
                  Peringatan Keras Bagi Pelaku Penangkapan Ikan Ilegal (Illegal Fishing)
                </h4>
                <p className="text-xs sm:text-sm text-red-200/90 leading-relaxed">
                  Setiap orang yang dengan sengaja menggunakan bahan peledak, racun kimia, atau alat tangkap yang merusak terumbu karang di perairan Karang Jeruk akan ditindak tegas dan diproses hukum pidana sesuai Pasal 84 UU Perikanan dengan ancaman denda maksimal <strong>Rp 1.200.000.000,-</strong>.
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <Link
                href="/pengaduan"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Laporkan Pelanggaran Laut</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TENTANG KAWASAN ── */}
      <section className="bg-white py-24 px-6 relative border-b border-slate-200">
        <div ref={aboutRef} className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block bg-sky-100 text-sky-900 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
                Tentang Kawasan
              </span>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#07182c] leading-[1.05] mb-6">
                Ekosistem Terumbu Karang<br />
                <span className="text-cyan-700">Karang Jeruk, Tegal</span>
              </h2>
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Kawasan Konservasi Karang Jeruk terletak di perairan lepas pantai Kabupaten Tegal, Provinsi Jawa Tengah. Ditetapkan secara resmi melalui Keputusan Menteri Kelautan dan Perikanan Nomor 75 Tahun 2022 dengan luas total 238,16 Hektare.
                </p>
                <p>
                  Secara administratif operasional, pengelolaan kawasan ini diemban oleh Pemerintah Provinsi Jawa Tengah melalui Cabang Dinas Kelautan Wilayah Barat (CDKWB). Terumbu karang Karang Jeruk menjadi habitat penting bagi pemijahan ikan, invertebrata laut, serta perlindungan plasma nutfah perairan utara Jawa.
                </p>
                <p>
                  Program monitoring ekosistem berkala (UPT) dilakukan oleh tim SUOP CDKWB guna memastikan kondisi tutupan karang hidup terus terpantau dan intervensi rehabilitasi berjalan tepat sasaran.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: 'Dasar Hukum Penetapan', value: 'Kepmen-KP No. 75/2022' },
                  { label: 'Pengelola Wilayah', value: 'Pemprov Jateng (CDKWB)' },
                  { label: 'Lokasi Perairan', value: 'Kabupaten Tegal, Jawa Tengah' },
                  { label: 'Luas Total Kawasan', value: '238,16 Hektare' },
                ].map((item, i) => (
                  <div key={i} className="bg-[#f0f6fa] rounded-2xl p-4 sm:p-5 border border-slate-200">
                    <p className="text-xs text-slate-500 font-bold mb-1">{item.label}</p>
                    <p className="text-sm sm:text-base font-extrabold text-[#07182c]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-sky-950/20 border-2 border-slate-200">
                <img
                  src="/images/karang-jeruk-redesign/kj-7.png"
                  alt="Patroli dan monitoring terumbu karang Karang Jeruk"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1580086319619-3ed498161c77?q=80&w=900&auto=format&fit=crop";
                  }}
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-4 sm:left-4 bg-white rounded-2xl shadow-xl p-4 sm:p-5 border border-slate-100 flex items-center gap-3.5 z-20">
                <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
                  <Waves className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold">Kondisi Karang Zona Inti</div>
                  <div className="font-extrabold text-sm sm:text-base text-[#07182c]">
                    31,02% <span className="text-xs font-bold text-cyan-700">(Target 2029: &gt;60%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP SECTION ── */}
      <section className="bg-gradient-to-br from-[#07182c] via-[#0b2746] to-[#061424] text-white py-24 px-6 relative overflow-hidden" ref={mapRef}>
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)', backgroundSize: '6px 6px' }}
        />
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-7xl relative z-10 text-center">
          <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
            Lokasi Kawasan
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight mb-4">
            Peta Kawasan Konservasi Karang Jeruk
          </h2>
          <p className="text-sky-100/80 text-sm sm:text-base max-w-xl mx-auto mb-10">
            Temukan lokasi Kawasan Konservasi Karang Jeruk di perairan lepas pantai Kabupaten Tegal, Jawa Tengah.
          </p>

          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border-2 border-white/10 max-w-5xl mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31677.23!2d109.6717!3d-6.8756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70096a7b5a97c1%3A0x5027a76e356a3d!2sKarang+Jeruk%2C+Tegal%2C+Jawa+Tengah!5e0!3m2!1sid!2sid!4v1699999999"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Kawasan Karang Jeruk"
            />
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="https://maps.google.com/?q=Karang+Jeruk+Tegal+Jawa+Tengah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#07182c] font-extrabold text-sm px-8 py-4 rounded-xl shadow-xl hover:bg-sky-50 active:scale-95 transition-all"
            >
              <MapPin className="w-4 h-4 text-cyan-600" />
              <span>Buka di Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-500" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
