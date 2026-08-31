'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  MapPin, Fish, Waves, Shield, TreePine, Camera, ChevronRight, Anchor, 
  Sun, Wind, Target, Scale, FileText, CheckCircle2, AlertTriangle, 
  X, Layers, Calendar, ArrowRight, Eye, Phone, Info, Check, Search,
  Mountain, Sunset, Activity, AlertOctagon, Microscope, Compass, Droplets,
  Gauge, BarChart3, BookmarkCheck, Users, Sparkles, Building2, ExternalLink
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

// ── 1. STATS (HERO) ──
const stats = [
  { 
    value: '±3.516', 
    unit: 'Ha', 
    label: 'Luas Usulan Final Zonasi', 
    icon: <MapPin className="w-5 h-5" />, 
    detail: 'Inti 55 Ha + Pemanfaatan 2.971 Ha + Lainnya 490 Ha',
    isTarget: true 
  },
  { 
    value: '30+', 
    unit: 'Jenis', 
    label: 'Biota & 18 Famili Ikan', 
    icon: <Fish className="w-5 h-5" />,
    detail: 'Karang lunak Gorgonian, Sinularia, Nudibranch & Plankton'
  },
  { 
    value: '3', 
    unit: 'Zona', 
    label: 'Struktur Zonasi Baru', 
    icon: <Shield className="w-5 h-5" />,
    detail: 'Zona Inti, Pemanfaatan Terbatas & Zona Lainnya'
  },
  { 
    value: '2012', 
    unit: '', 
    label: 'Tahun Penetapan Resmi', 
    icon: <Calendar className="w-5 h-5" />,
    detail: 'SK KKP No. Kep.29/MEN/2012 & SK Bupati No. 523/194/2012'
  },
  { 
    value: '±8', 
    unit: 'km', 
    label: 'Dari Pusat Kota Batang', 
    icon: <Mountain className="w-5 h-5" />,
    detail: 'Membentang dari Ujungnegoro hingga Roban'
  },
];

// ── 2. KEUNGGULAN KAWASAN ──
const features = [
  {
    icon: <Mountain className="w-6 h-6 text-violet-600" />,
    title: 'Tanjung Bersejarah',
    desc: 'Situs cagar budaya Goa Aswatama di tebing karang Ujungnegoro menyimpan nilai spiritual dan historis leluhur yang berpadu dengan lanskap pesisir berbatu.',
    bg: 'bg-violet-50',
  },
  {
    icon: <Fish className="w-6 h-6 text-purple-600" />,
    title: 'Perairan Kaya Biota',
    desc: 'Keanekaragaman hayati sedang–tinggi dengan 18 famili ikan (Carangidae, Lutjanidae, Serranidae), karang lunak Gorgonian, soft coral Sinularia, dan nudibranch Glossodoris.',
    bg: 'bg-purple-50',
  },
  {
    icon: <Eye className="w-6 h-6 text-fuchsia-600" />,
    title: 'Spot Riset & Selam ROV',
    desc: 'Eksplorasi ilmiah bawah air menggunakan drone ROV & selam di 4 titik: Karang Maeso, Terumbu Karang Buatan (TKB), Karang Ban, dan Karang Kretek dengan karakter visual unik.',
    bg: 'bg-fuchsia-50',
  },
  {
    icon: <Anchor className="w-6 h-6 text-indigo-600" />,
    title: 'Zona Rehabilitasi & Restorasi',
    desc: 'Karang Maeso diusulkan sebagai lokasi restorasi karang aktif, serta eksperimen restorasi substrat di area TKB untuk merehabilitasi dampak sedimentasi perairan.',
    bg: 'bg-indigo-50',
  },
];

// ── 3. RENCANA AKSI 5 TAHUNAN (2025–2029) ──
const actionPlans = [
  {
    year: '2025',
    focus: 'Penegasan Zonasi',
    title: 'Sosialisasi & Rambu Batas',
    desc: 'Sosialisasi intensif struktur 3 zona dan pemasangan rambu batas resmi di titik Karang Maeso, Karang Kretek, dan TKB.',
    badge: 'Tahun 1 • Perencanaan',
    progress: '0%',
    status: 'Baru Direncanakan',
    barColor: 'bg-violet-500',
  },
  {
    year: '2026',
    focus: 'Rehabilitasi Habitat',
    title: 'Restorasi Karang & Mangrove',
    desc: 'Penanaman mangrove di pesisir kritis dan instalasi media terumbu karang buatan baru untuk memperkuat substrat dasar laut.',
    badge: 'Tahun 2 • Rencana 2026',
    progress: '0%',
    status: 'Target 2026',
    barColor: 'bg-purple-500',
  },
  {
    year: '2027',
    focus: 'Penguatan Kelembagaan',
    title: 'Pelatihan Pokmaswas & Forum KKPD',
    desc: 'Pelatihan kapasitas Pokmaswas, integrasi perempuan pesisir, dan pembentukan formal Forum Pengelolaan Kawasan Konservasi Ujungnegoro–Roban.',
    badge: 'Tahun 3 • Rencana 2027',
    progress: '0%',
    status: 'Target 2027',
    barColor: 'bg-fuchsia-500',
  },
  {
    year: '2028',
    focus: 'Pengembangan Usaha',
    title: 'Ekowisata & Ekonomi Nelayan',
    desc: 'Pengembangan paket ekowisata bahari ramah lingkungan, sertifikasi pemandu lokal, dan diversifikasi ekonomi nelayan.',
    badge: 'Tahun 4 • Rencana 2028',
    progress: '0%',
    status: 'Target 2028',
    barColor: 'bg-indigo-500',
  },
  {
    year: '2029',
    focus: 'Evaluasi Menyeluruh',
    title: 'Audit Capaian & Zonasi Adaptif',
    desc: 'Audit capaian ekologis (kepadatan ikan, tutupan karang) dan sosial-ekonomi, dilanjutkan revisi zonasi adaptif 5 tahunan.',
    badge: 'Tahun 5 • Rencana 2029',
    progress: '0%',
    status: 'Target 2029',
    barColor: 'bg-emerald-500',
  },
];

// ── 4. ZONASI KAWASAN (3 ZONA) ──
const zonasiKawasan = [
  {
    code: 'Z-01',
    name: 'Zona Inti (Core Zone)',
    luas: '55 Ha (Usulan Final)',
    topBar: 'bg-rose-600',
    codeStyle: 'bg-rose-950/80 text-rose-300 border-rose-800',
    badge: 'Perlindungan Mutlak / No-Take Zone',
    badgeStyle: 'bg-rose-900/40 text-rose-200 border-rose-700/60',
    lokasi: 'Karang Maeso, Karang Kretek, Area TKB, & Area Bebatuan Spawning Ground Tebing Ujungnegoro',
    desc: 'Area perlindungan mutlak bagi habitat alami biota kunci, daerah pemijahan ikan (spawning ground), serta pelestarian plasma nutfah laut tanpa intervensi ekstraktif.',
    allowed: [
      'Penelitian ilmiah dan riset oseanografi dengan izin resmi (rekomendasi DKP/CDKWB)',
      'Pemantauan ekologis berkala oleh petugas CDKWB & mitra pengawas Pokmaswas',
      'Pendidikan lingkungan hidup tanpa pengambilan sampel fisik destruktif',
    ],
    prohibited: [
      'Segala bentuk penangkapan ikan (termasuk mancing rekreasional, arad, dan nelayan lokal)',
      'Pembudidayaan ikan dalam skala apapun di dalam zona inti',
      'Kegiatan pariwisata alam perairan massal dan pendirian instalasi komersial',
      'Pembuatan foto/video komersial serta pelayaran kapal penangkap >10 GT',
    ],
  },
  {
    code: 'Z-02',
    name: 'Zona Pemanfaatan Terbatas (Limited Utilization Zone)',
    luas: '2.971 Ha',
    topBar: 'bg-gradient-to-r from-violet-500 to-purple-600',
    codeStyle: 'bg-violet-950/80 text-violet-300 border-violet-800',
    badge: 'Pemanfaatan Berkelanjutan & Ekowisata',
    badgeStyle: 'bg-violet-900/40 text-violet-200 border-violet-700/60',
    lokasi: 'Perikanan tangkap sepanjang Sigandu–Ujung ke arah Utara, serta pesisir Ponowareng, Kenconorejo, dan Kedungsegog',
    desc: 'Zona terluas yang dialokasikan untuk penangkapan ikan tradisional ramah lingkungan, ekowisata bahari (sport fishing berbasis konservasi), pelayaran rakyat, serta penelitian terapan.',
    allowed: [
      'Pelayaran rakyat, nelayan kecil, dan kapal penumpang reguler domestik',
      'Penangkapan ikan oleh nelayan lokal menggunakan alat tangkap ramah lingkungan',
      'Pariwisata alam perairan berkelanjutan, snorkeling, dan sport fishing teratur',
      'Penelitian, pendidikan kelautan, dan pembuatan video dokumenter edukatif berizin',
      'Pendirian instalasi laut ramah lingkungan sesuai rekomendasi teknis',
    ],
    prohibited: [
      'Lalu lintas dan operasi kapal penangkap ikan >10 GT tanpa izin resmi',
      'Penggunaan alat tangkap destruktif (bom ikan, potas/racun kimia, trawl/arad dasar)',
      'Penangkapan ikan karang yang merusak substrat terumbu karang alami',
      'Pembuangan sampah plastik, limbah oli kapal, dan bahan pencemar lainnya',
    ],
  },
  {
    code: 'Z-03',
    name: 'Zona Lainnya: Rekayasa & Alur Pelabuhan',
    luas: '490 Ha',
    topBar: 'bg-gradient-to-r from-amber-500 to-orange-500',
    codeStyle: 'bg-amber-950/80 text-amber-300 border-amber-800',
    badge: 'Rekayasa Lingkungan & Logistik Maritim',
    badgeStyle: 'bg-amber-900/40 text-amber-200 border-amber-700/60',
    lokasi: 'Pelabuhan Klidang Lor (area pengembangan) & alur lalu lintas kapal navigasi pelabuhan sebelah utara',
    desc: 'Dialokasikan untuk pengembangan infrastruktur pelabuhan perikanan terpadu (PPI Klidang Lor), koridor lalu lintas kapal pelayaran, serta eksperimen rekayasa lingkungan terumbu karang buatan.',
    allowed: [
      'Lalu lintas kapal perikanan dan logistik yang masuk/keluar Pelabuhan Klidang Lor',
      'Kegiatan operasional pelabuhan dan pemeliharaan fasilitas maritim',
      'Eksperimen rekayasa lingkungan dan penelitian terumbu karang buatan (TKB)',
      'Pemantauan berkala kualitas sedimen dan parameter fisika-kimia perairan',
    ],
    prohibited: [
      'Pembuangan limbah B3, ballast water kotor, atau sampah industri pelabuhan tanpa IPAL',
      'Aktivitas penangkapan ikan yang menghalangi alur navigasi pelayaran resmi pelabuhan',
      'Perusakan fasilitas instalasi rekayasa lingkungan dan terumbu buatan',
    ],
  },
];

// ── 5. SKEMA PERBANDINGAN USULAN ZONASI ──
const zonasiSchemes = [
  {
    scheme: 'Usulan 1',
    inti: '48 Ha',
    pemanfaatan: '2.971 Ha',
    lainnya: '490 Ha',
    total: '3.509 Ha',
    cakupanInti: 'Krg Maeso, Krg Kretek, area batuan spawning',
    catatan: 'Skema awal tanpa memasukkan modul TKB lama',
    status: 'Opsi Alternatif',
  },
  {
    scheme: 'Usulan 2',
    inti: '43 Ha',
    pemanfaatan: '2.971 Ha',
    lainnya: '490 Ha',
    total: '3.504 Ha',
    cakupanInti: 'Krg Maeso, Krg Kretek, area TKB',
    catatan: 'Skema tanpa area bebatuan spawning tebing',
    status: 'Opsi Alternatif',
  },
  {
    scheme: 'Usulan 3 (Rekomendasi Final)',
    inti: '55 Ha',
    pemanfaatan: '2.971 Ha',
    lainnya: '490 Ha',
    total: '3.516 Ha',
    cakupanInti: 'Krg Maeso, Krg Kretek, area TKB, & batuan spawning tebing',
    catatan: 'Skema paling komprehensif mengintegrasikan seluruh ekosistem kunci',
    status: 'Direkomendasikan 2025',
    isRecommended: true,
  },
];

// ── 6. DATA BIODIVERSITAS (18 FAMILI IKAN & BIOTA KUNCI) ──
const fishFamilies = [
  { name: 'Carangidae (Talang-talang, Selar, Badong)', percent: 35, color: 'bg-violet-600' },
  { name: 'Lutjanidae (Kakap Merah, Tompel, Jenaha)', percent: 20, color: 'bg-purple-600' },
  { name: 'Serranidae (Kerapu Karang, Kerapu Lumpur)', percent: 11, color: 'bg-fuchsia-600' },
  { name: 'Haemulidae (Gerik, Kaci-kaci, Raja Bau)', percent: 7, color: 'bg-indigo-600' },
  { name: 'Pomacentridae (Abudefduf, Betok Laut, Damselfish)', percent: 7, color: 'bg-blue-600' },
  { name: 'Sciaenidae (Ikan Gulama, Belanak Batu)', percent: 4, color: 'bg-teal-600' },
  { name: 'Siganidae (Ikan Baronang Lingkis, Baronang Angin)', percent: 4, color: 'bg-emerald-600' },
  { name: 'Scatophagidae (Ikan Ketang-ketang, Kiper)', percent: 3, color: 'bg-amber-600' },
  { name: '10 Famili Lainnya (Sparidae, Barakuda, Drepaneidae, dll)', percent: 9, color: 'bg-slate-500' },
];

const surveyBiota = [
  {
    kategori: 'Karang Lunak & Keras',
    items: [
      { name: 'Gorgonian (Sea Fan)', lokasi: 'Karang Maeso, TKB', note: 'Indikator perairan berarus sehat' },
      { name: 'Milithaea sp. (Gorgonian Merah)', lokasi: 'Karang Kretek', note: 'Ditemukan di kedalaman 5 m' },
      { name: 'Sinularia sp. (Soft Coral)', lokasi: 'Karang Kretek', note: 'Koloni karang lunak adaptif' },
      { name: 'Goniophora & Paracyathus', lokasi: 'Karang Kretek', note: 'Karang keras polip berbunga' },
    ],
  },
  {
    kategori: 'Invertebrata & Biota Dasar',
    items: [
      { name: 'Glossodoris atromarginata', lokasi: 'Karang Kretek', note: 'Spesies siput laut / Nudibranch eksotis' },
      { name: 'Sponge (Spons Laut Alami)', lokasi: 'Karang Maeso & TKB', note: 'Menempel kuat pada substrat karang mati' },
      { name: 'Crustacea & Kepiting Karang', lokasi: 'Modul TKB', note: 'Habitat berlindung krustasea' },
      { name: 'Plotosus lineatus (Catfish Laut)', lokasi: 'Area TKB', note: 'Bergerombol di sekitar struktur buatan' },
    ],
  },
  {
    kategori: 'Plankton (Indikator Ekologis)',
    items: [
      { name: '10 Genus Fitoplankton', lokasi: 'Kelimpahan tertinggi di TKB (2.330 sel/L)', note: 'Chaetoceros, Eucampia, Ceratium, Lauderia' },
      { name: '10 Genus Zooplankton', lokasi: 'Kelimpahan tertinggi di TKB (381 ind/L)', note: 'Calanus, Oithona, Apocyclops, Foraminifera' },
      { name: 'Produktivitas Primer Tinggi', lokasi: 'Seluruh perairan pesisir', note: 'TKB paling produktif secara rantai makanan mikro' },
      { name: 'Komposisi Diatom Dominan', lokasi: 'Karang Ban & Karang Maeso', note: 'Menopang ketersediaan pakan larva ikan' },
    ],
  },
];

// ── 7. KONDISI KUALITAS PERAIRAN (TABEL OSEANOGRAFI) ──
const waterQualityData = [
  { lokasi: 'Karang Maeso', depth: '2 m', vis: '80 cm', ph: '7,94', temp: '30,8 °C', sal: '25 ‰', doVal: '3,30 mg/L', doSat: '44,5%', status: 'Perlu Perhatian (DO Rendah)' },
  { lokasi: 'Terumbu Karang Buatan (TKB)', depth: '6 m', vis: '150 cm', ph: '8,00', temp: '30,7 °C', sal: '25 ‰', doVal: '3,72 mg/L', doSat: '49,8%', status: 'Produktivitas Tinggi' },
  { lokasi: 'Karang Ban-1', depth: '13 m', vis: '250 cm', ph: '8,09', temp: '31,1 °C', sal: '23 ‰', doVal: '4,65 mg/L', doSat: '62,8%', status: 'Kondisi Baik' },
  { lokasi: 'Karang Ban-2', depth: '13 m', vis: '250 cm', ph: '8,05', temp: '31,6 °C', sal: '23 ‰', doVal: '4,64 mg/L', doSat: '63,5%', status: 'Kondisi Baik' },
  { lokasi: 'Karang Ban-3', depth: '13 m', vis: '250 cm', ph: '8,02', temp: '31,5 °C', sal: '23 ‰', doVal: '5,01 mg/L', doSat: '69,2%', status: 'DO Tertinggi (Pb Perlu Pantau)' },
  { lokasi: 'Karang Kretek', depth: '5 m', vis: '80 cm', ph: '8,00', temp: '30,6 °C', sal: '25 ‰', doVal: '3,81 mg/L', doSat: '45,3%', status: 'Visibilitas Terbaik' },
];

// ── 8. ANCAMAN & TANTANGAN KAWASAN ──
const threatsData = [
  {
    icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    title: 'Perluasan Kawasan Terbangun & Abrasi',
    desc: 'Ekspansi permukiman pesisir dan gelombang pasang yang mengikis garis pantai menyebabkan hilangnya pelindung alami dan meningkatkan suplai sedimen ke laut.',
    impact: 'Tingkat Sedang',
  },
  {
    icon: <AlertOctagon className="w-5 h-5 text-rose-500" />,
    title: 'Tekanan Penangkapan di Zona Inti',
    desc: 'Penggunaan jaring arad dan aktivitas mancing aktif di Karang Maeso dan Karang Kretek berisiko merusak koloni karang dan mengikis stok ikan indukan.',
    impact: 'Tingkat Kritis',
  },
  {
    icon: <Users className="w-5 h-5 text-blue-500" />,
    title: 'Minimnya Kesadaran Batas Zonasi',
    desc: 'Sebagian masyarakat nelayan belum memahami pembagian batas zonasi resmi akibat ketiadaan rambu fisik batas zona di laut.',
    impact: 'Perlu Sosialisasi',
  },
  {
    icon: <Waves className="w-5 h-5 text-purple-500" />,
    title: 'Sedimentasi & Kekeruhan Tinggi',
    desc: 'Limpasan sedimen dari muara sungai daratan mengurangi visibilitas air hingga 80 cm di Maeso, menutupi polip karang dan menghambat fotosintesis alga.',
    impact: 'Tantangan Ekologis',
  },
  {
    icon: <Sun className="w-5 h-5 text-orange-500" />,
    title: 'Perubahan Iklim & Suhu Permukaan',
    desc: 'Peningkatan suhu air laut (tercatat mencapai 30,6 – 31,6 °C) dan badai monsun ekstrem memicu potensi pemutihan karang (coral bleaching).',
    impact: 'Monitoring Rutin',
  },
  {
    icon: <Anchor className="w-5 h-5 text-teal-500" />,
    title: 'Sampah Laut (Marine Debris)',
    desc: 'Serbuan sampah plastik kiriman dan jaring bekas nelayan yang tersangkut di modul terumbu buatan berpotensi melukai penyu dan membelit karang.',
    impact: 'Aksi Bersih Pantai',
  },
];

// ── 9. DASAR HUKUM ──
const legalRegulations = [
  {
    category: 'Undang-Undang Perikanan',
    badge: 'Sanksi Pidana Ketat',
    title: 'UU No. 31/2004 jo. UU No. 45/2009',
    subject: 'Larangan Destructive Fishing & Pengelolaan Sumber Daya Ikan',
    desc: 'Pasal 84 & 85 menetapkan ancaman pidana penjara hingga 6 tahun dan denda maksimal Rp 1,2 Miliar bagi pelaku penangkapan ikan dengan bahan peledak, racun kimia, atau alat perusak habitat.',
  },
  {
    category: 'SK Penetapan Menteri Kelautan & Perikanan',
    badge: 'Penetapan Resmi Nasional',
    title: 'Kepmen-KP No. Kep.29/MEN/2012',
    subject: 'Penetapan Kawasan Konservasi Pesisir Ujungnegoro–Roban',
    desc: 'Penetapan definitif perairan pesisir Ujungnegoro hingga Roban di Kabupaten Batang sebagai kawasan konservasi pesisir dan pulau-pulau kecil nasional.',
  },
  {
    category: 'Peraturan Daerah RTRW Jawa Tengah',
    badge: 'Tata Ruang Terbaru (KKPRL)',
    title: 'Perda Jateng No. 08 Tahun 2024 (RTRW 2024–2044)',
    subject: 'Fokus Zonasi Murni Perairan & Penyesuaian Ruang Laut',
    desc: 'Mengarahkan batas kawasan konservasi murni pada wilayah perairan laut (KKPRL) tanpa mengakomodasi daratan, menjadi landasan utama review zonasi 2025.',
  },
  {
    category: 'Peraturan Menteri KP',
    badge: 'Standar Pengelolaan',
    title: 'Permen KP No. 31/PERMEN-KP/2020',
    subject: 'Pengelolaan & Zonasi Kawasan Konservasi Berbasis Ilmiah',
    desc: 'Mengatur standar baku pembagian 3 zona (Inti, Pemanfaatan Terbatas, dan Lainnya), kelembagaan unit pengelola, serta rencana aksi pengelolaan 5 tahunan.',
  },
];

// ── 10. EVALUASI KONDISI KAWASAN SECARA UMUM ──
const generalAssessment = [
  { komponen: 'Keanekaragaman Hayati', status: 'Sedang – Tinggi', badge: 'bg-emerald-100 text-emerald-800', note: '18 famili ikan, karang Gorgonian, soft coral Sinularia, kelimpahan plankton tinggi' },
  { komponen: 'Kualitas Air Laut', status: 'Cukup Baik', badge: 'bg-blue-100 text-blue-800', note: 'pH 7,94–8,09 stabil, suhu 30,6–31,6 °C, DO di atas batas minimum 3 mg/L' },
  { komponen: 'Tekanan Lingkungan', status: 'Tingkat Sedang', badge: 'bg-amber-100 text-amber-800', note: 'Sedimentasi muara tinggi di Maeso, timbal (Pb) di Karang Ban-3 perlu pengawasan' },
  { komponen: 'Aktivitas Nelayan & Wisata', status: 'Tinggi di Pesisir', badge: 'bg-purple-100 text-purple-800', note: 'Spot mancing populer di Karang Maeso, Pantai Sigandu, dan Karang Ban' },
  { komponen: 'Dukungan Sosial & Mitra', status: 'Sedang – Berkembang', badge: 'bg-indigo-100 text-indigo-800', note: 'Sinergi CDKWB, DKP Batang, Pokmaswas, UNDIP, dan skema CSR lingkungan PLTU' },
];

export default function UjungnegoroPage() {
  const [heroRef, heroVisible] = useInView(0.1);
  const [statsRef, statsVisible] = useInView(0.1);
  const [featuresRef, featuresVisible] = useInView(0.1);
  const [targetsRef, targetsVisible] = useInView(0.1);
  const [zonesRef, zonesVisible] = useInView(0.1);
  const [biodiversityRef, biodiversityVisible] = useInView(0.1);
  const [waterRef, waterVisible] = useInView(0.1);
  const [threatsRef, threatsVisible] = useInView(0.1);
  const [lawsRef, lawsVisible] = useInView(0.1);
  const [aboutRef, aboutVisible] = useInView(0.1);
  const [mapRef, mapVisible] = useInView(0.1);

  return (
    <div className="min-h-screen bg-[#f8f5ff] text-[#1a0a3e] flex flex-col selection:bg-violet-500 selection:text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        .font-display {
          font-family: 'Big Shoulders Display', sans-serif;
        }
      `}</style>

      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative bg-gradient-to-br from-[#1a0a3e] via-[#2d1065] to-[#0f0630] overflow-hidden pt-8 pb-32">
        {/* Subtle dot pattern */}
        <div 
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '6px 6px' }}
        />

        {/* Circular Glowing Orbs */}
        <div className="absolute -top-40 -right-24 w-[520px] h-[520px] rounded-full border border-violet-400/20 pointer-events-none" />
        <div className="absolute -top-20 -right-4 w-[380px] h-[380px] rounded-full border border-violet-400/25 pointer-events-none" />
        <div className="absolute top-0 right-16 w-[240px] h-[240px] rounded-full border border-violet-400/30 pointer-events-none" />
        <div className="absolute -top-28 -right-28 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />

        <div ref={heroRef} className="relative z-10 container mx-auto px-6 max-w-7xl pt-6">
          {/* Breadcrumbs */}
          <div
            className="flex items-center gap-2 text-violet-200/60 text-xs sm:text-sm mb-8 transition-all duration-700"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)' }}
          >
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span>›</span>
            <span className="text-violet-200/80">Konservasi</span>
            <span>›</span>
            <span className="text-violet-200/80">Kawasan Konservasi</span>
            <span>›</span>
            <span className="text-violet-100 font-semibold">Ujungnegoro–Roban</span>
          </div>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div
              className="transition-all duration-700 delay-100"
              style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)' }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-violet-300 text-xs font-extrabold tracking-wider uppercase mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                Paparan Hasil Review Zonasi Kawasan (DKP Jateng 2025)
              </div>

              <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-[80px] leading-[0.95] text-white tracking-tight mb-6">
                Taman Pesisir<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300">
                  Ujungnegoro–Roban
                </span>
              </h1>

              <p className="text-violet-100/90 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
                Kawasan Konservasi Perairan (KKP) pesisir bersejarah di Kabupaten Batang, Jawa Tengah. 
                Berdasarkan review zonasi terkini 2025, kawasan ini mencakup usulan total <strong>±3.516 Hektare</strong> dengan 
                struktur <strong>3 Zona Pengelolaan</strong> guna melindungi terumbu karang alami, <em>spawning ground</em>, 
                serta keanekaragaman hayati 18 famili ikan laut.
              </p>

              <div className="flex flex-wrap gap-2.5 mb-8">
                {[
                  '±3.516 Ha Total Luas Kawasan',
                  '3 Zona Pengelolaan Adaptif',
                  '30+ Biota & 18 Famili Ikan',
                  'SK Men-KP No. Kep.29/MEN/2012',
                  'Unit Pelaksana: CDKWB Batang-Pekalongan',
                ].map((tag, i) => (
                  <div 
                    key={i} 
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3.5 py-1.5 text-white text-xs font-bold"
                  >
                    <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />
                    {tag}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#zonasi"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-violet-900/40 hover:from-violet-400 hover:to-purple-500 transition-all active:scale-95"
                >
                  <Layers className="w-4 h-4" />
                  <span>Struktur 3 Zonasi Baru</span>
                </a>
                <a
                  href="#biodiversitas"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-3.5 rounded-xl border border-white/20 backdrop-blur-sm transition-all"
                >
                  <Fish className="w-4 h-4 text-violet-300" />
                  <span>Data Biodiversitas</span>
                </a>
              </div>
            </div>

            {/* Right Visual Circular Frame */}
            <div
              className="relative transition-all duration-700 delay-200 lg:h-[480px] flex items-center justify-center"
              style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)' }}
            >
              {/* Metallic / Portal Outer Ring */}
              <div className="relative w-full max-w-[440px] aspect-square rounded-full p-4 bg-gradient-to-tr from-violet-800/80 via-slate-600/60 to-purple-500/80 shadow-2xl shadow-black/60 border border-white/20">
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-slate-900/80 bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=900&auto=format&fit=crop"
                    alt="Pantai Ujungnegoro, kawasan konservasi pesisir Kabupaten Batang"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                </div>

                {/* Compass Marker Dots */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-violet-300 shadow-md" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-violet-300 shadow-md" />
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-violet-300 shadow-md" />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-violet-300 shadow-md" />
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-4 sm:bottom-4 -left-2 sm:left-2 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl border border-violet-100 flex items-center gap-3.5 z-20">
                <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0">
                  <Shield className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <div className="font-display font-extrabold text-2xl text-[#1a0a3e] leading-tight">
                    ±3.516 Ha
                  </div>
                  <div className="text-xs text-slate-500 font-bold">
                    Usulan Zonasi Final (2025)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ocean Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none overflow-hidden leading-none">
          <svg
            className="relative block w-full h-[50px] sm:h-[80px]"
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,45 C 280,95 420,5 720,45 C 1020,85 1160,5 1440,45 L1440,90 L0,90 Z"
              fill="#f0ebff"
            />
          </svg>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section className="bg-[#f0ebff] px-6 pb-20 pt-2 relative z-30">
        <div
          ref={statsRef}
          className="container mx-auto max-w-7xl -mt-16 sm:-mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className={`rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between ${
                s.isTarget
                  ? 'bg-white text-[#1a0a3e] border-2 border-violet-400 shadow-violet-900/15 relative overflow-hidden'
                  : 'bg-white text-[#1a0a3e] border border-violet-200/80 shadow-violet-900/10'
              }`}
              style={{
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? undefined : 'translateY(30px)',
                transitionDelay: `${i * 90}ms`,
              }}
            >
              {s.isTarget && (
                <div className="absolute top-0 right-0 bg-violet-600 text-white text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-bl-xl tracking-wider">
                  Review 2025
                </div>
              )}
              
              <div>
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-4 ${
                  s.isTarget ? 'border-violet-300 text-violet-600 bg-violet-50' : 'border-violet-200 text-violet-700 bg-violet-50'
                }`}>
                  {s.icon}
                </div>
                
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#1a0a3e] leading-none mb-1">
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
            <span className="inline-block bg-violet-100 text-violet-900 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Keunggulan Kawasan
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1a0a3e] tracking-tight mb-4">
              Mengapa Ujungnegoro Istimewa?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Kawasan pesisir bersejarah yang memadukan warisan budaya leluhur, lanskap tebing karst,
              dan ekosistem perairan terumbu karang alami yang kaya dalam satu bentang laut terintegrasi.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-7 border border-violet-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
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
                  <h3 className="font-extrabold text-lg text-[#1a0a3e] mb-2.5">
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

      {/* ── ZONASI KAWASAN KONSERVASI (3 ZONA) ── */}
      <section id="zonasi" className="bg-gradient-to-b from-[#1a0a3e] via-[#2d1065] to-[#160840] text-white py-24 px-6 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)', backgroundSize: '6px 6px' }}
        />

        <div ref={zonesRef} className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-violet-300 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Tata Ruang Konservasi (Review 2025)
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight mb-4">
              Zonasi Kawasan Konservasi Ujungnegoro
            </h2>
            <p className="text-violet-100/80 text-sm sm:text-base leading-relaxed">
              Hasil review zonasi mengusulkan transformasi dari 2 zona menjadi <strong>3 Zona Pengelolaan</strong> seluas 
              total <strong>3.516 Ha</strong>, membagi ruang laut secara adil antara perlindungan mutlak, perikanan tangkap ramah lingkungan, dan alur pelabuhan.
            </p>
          </div>

          {/* 3 Zone Cards */}
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            {zonasiKawasan.map((z, idx) => (
              <div
                key={idx}
                className="bg-[#2d1065]/90 rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-violet-900/30"
              >
                {/* Zone Header Top Bar */}
                <div className={`h-2 w-full ${z.topBar}`} />

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className={`text-xs font-mono font-extrabold px-2.5 py-1 rounded border ${z.codeStyle}`}>
                        {z.code}
                      </span>
                      <span className="text-xs font-bold text-white/90 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                        {z.luas}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-xl text-white mb-2 leading-snug">
                      {z.name}
                    </h3>
                    <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full border mb-3 ${z.badgeStyle}`}>
                      {z.badge}
                    </span>

                    <div className="text-xs text-violet-200/90 font-medium mb-3 bg-white/5 rounded-xl p-3 border border-white/10">
                      <span className="font-bold text-white block mb-0.5">Lokasi Cakupan:</span>
                      {z.lokasi}
                    </div>

                    <p className="text-xs text-violet-100/80 leading-relaxed mb-5">
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

          {/* Skema Perbandingan Usulan Review */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-wide">
                  Perbandingan 3 Skema Usulan Review Zonasi
                </h3>
                <p className="text-xs sm:text-sm text-violet-200/80">
                  Dokumen kajian 2025 membandingkan 3 formulasi skema sebelum mengerucut ke <strong>Usulan 3 (Final)</strong> sebagai rekomendasi terbaik.
                </p>
              </div>
              <span className="text-xs font-extrabold px-3 py-1.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30 self-start md:self-auto">
                Kajian CV. Citra Yasa Desain & DKP Jateng
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-violet-100">
                <thead className="bg-white/10 text-violet-200 text-xs font-extrabold uppercase border-b border-white/10">
                  <tr>
                    <th className="p-3.5">Skema Zonasi</th>
                    <th className="p-3.5">Zona Inti</th>
                    <th className="p-3.5">Pemanfaatan</th>
                    <th className="p-3.5">Zona Lainnya</th>
                    <th className="p-3.5">Luas Total</th>
                    <th className="p-3.5">Cakupan Zona Inti</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium">
                  {zonasiSchemes.map((s, i) => (
                    <tr key={i} className={s.isRecommended ? 'bg-violet-900/40 font-semibold' : 'hover:bg-white/5'}>
                      <td className="p-3.5 font-bold text-white">{s.scheme}</td>
                      <td className="p-3.5 text-rose-300 font-bold">{s.inti}</td>
                      <td className="p-3.5">{s.pemanfaatan}</td>
                      <td className="p-3.5">{s.lainnya}</td>
                      <td className="p-3.5 font-bold text-white">{s.total}</td>
                      <td className="p-3.5 text-xs text-violet-200/80">{s.cakupanInti}</td>
                      <td className="p-3.5">
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                          s.isRecommended ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-white/10 text-slate-300'
                        }`}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEANEKARAGAMAN HAYATI & BIODIVERSITAS ── */}
      <section id="biodiversitas" className="bg-[#ede8ff] py-24 px-6 relative border-b border-violet-200">
        <div ref={biodiversityRef} className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-violet-100 text-violet-900 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Biodiversitas Laut Teridentifikasi
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1a0a3e] tracking-tight mb-4">
              Kekayaan Biota & 18 Famili Ikan
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Berdasarkan analisis rekaman digital perikanan (2017–2022) dan survei selam/ROV bawah air, perairan Ujungnegoro–Roban 
              menyimpan kekayaan iktiofauna, karang lunak, serta produktivitas mikroplankton yang melimpah.
            </p>
          </div>

          {/* Fish Families Bar Breakdown & ROV Highlights */}
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 mb-12">
            {/* Famili Ikan Progress */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-violet-200 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-extrabold text-lg sm:text-xl text-[#1a0a3e] flex items-center gap-2">
                    <Fish className="w-5 h-5 text-violet-600" />
                    Komposisi 18 Famili Ikan Laut
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Analisis 37 dokumentasi perikanan digital di titik pancing kawasan
                  </p>
                </div>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-violet-100 text-violet-900">
                  18 Famili
                </span>
              </div>

              <div className="space-y-4">
                {fishFamilies.map((f, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                      <span>{f.name}</span>
                      <span className="text-[#1a0a3e] font-extrabold">{f.percent}%</span>
                    </div>
                    <div className="w-full bg-violet-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-2.5 rounded-full ${f.color} transition-all duration-700`}
                        style={{ width: `${f.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-violet-100 text-xs text-slate-600 leading-relaxed bg-violet-50/50 p-4 rounded-2xl">
                <span className="font-bold text-[#1a0a3e]">Spesies Teridentifikasi Lapangan: </span>
                Ikan Talang-talang, Kerapu Karang & Lumpur, Ketang-ketang, Tompel, Baronang Lingkis, Gerik, Selar, Badong, Kerong-kerong, Abudefduf, Kiper, Buna, Kakap Merah, hingga Barakuda.
              </div>
            </div>

            {/* Plankton & ROV Biological Findings */}
            <div className="space-y-6">
              {surveyBiota.map((cat, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-violet-200 shadow-md">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center text-violet-700">
                      {idx === 0 ? <Waves className="w-4 h-4" /> : idx === 1 ? <Eye className="w-4 h-4" /> : <Microscope className="w-4 h-4" />}
                    </div>
                    <h4 className="font-extrabold text-base text-[#1a0a3e]">
                      {cat.kategori}
                    </h4>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {cat.items.map((item, i) => (
                      <div key={i} className="bg-[#f8f5ff] rounded-2xl p-3.5 border border-violet-100">
                        <div className="font-extrabold text-xs text-[#1a0a3e] mb-0.5">{item.name}</div>
                        <div className="text-[11px] font-semibold text-violet-700 mb-1">{item.lokasi}</div>
                        <div className="text-[10px] text-slate-500 leading-tight">{item.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TARGET STRATEGIS & RENCANA AKSI 5 TAHUNAN (2025–2029) ── */}
      <section className="bg-white py-24 px-6 relative border-b border-violet-200">
        <div ref={targetsRef} className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-violet-100 text-violet-900 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Rencana Aksi Pengelolaan 5 Tahunan
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1a0a3e] tracking-tight mb-4">
              Roadmap Pengelolaan & Pemulihan (2025–2029)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Rencana aksi pengelolaan kawasan konservasi Ujungnegoro–Roban yang dirancang secara bertahap selama 5 tahun ke depan 
              untuk memastikan keberlanjutan ekologis dan kesejahteraan masyarakat pesisir.
            </p>
          </div>

          {/* 5 Annual Plan Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 mb-14">
            {actionPlans.map((plan, i) => (
              <div
                key={i}
                className="bg-[#f8f5ff] rounded-3xl p-5 sm:p-6 border border-violet-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                style={{
                  opacity: targetsVisible ? 1 : 0,
                  transform: targetsVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-display font-extrabold text-3xl text-violet-700 leading-none">
                      {plan.year}
                    </span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-violet-200/80 text-violet-950">
                      {plan.focus}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm sm:text-base text-[#1a0a3e] mb-2 leading-snug">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {plan.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-violet-200">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1.5">
                    <span>Status:</span>
                    <span className="text-violet-700 font-extrabold">{plan.status}</span>
                  </div>
                  <div className="w-full bg-violet-200/60 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${plan.barColor}`}
                      style={{ width: plan.progress === '0%' ? '6%' : plan.progress }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 4 Pilar Strategi Pengelolaan */}
          <div className="grid md:grid-cols-4 gap-5 bg-[#ede8ff] rounded-3xl p-6 sm:p-8 border border-violet-200">
            {[
              {
                letter: 'A',
                title: 'Perlindungan & Pelestarian',
                desc: 'Patroli rutin Pokmaswas & DKP, restorasi terumbu karang Karang Maeso, uji coba padang lamun, dan penegakan hukum alat tangkap perusak.',
              },
              {
                letter: 'B',
                title: 'Pemanfaatan Berkelanjutan',
                desc: 'Pengembangan ekowisata bahari berbasis masyarakat, sertifikasi pemandu lokal, dan sport fishing ramah lingkungan.',
              },
              {
                letter: 'C',
                title: 'Peningkatan Kapasitas',
                desc: 'Pelatihan nelayan lokal, pemberdayaan kelompok perempuan pesisir, Pokdarwis, serta edukasi konservasi sekolah/kampus.',
              },
              {
                letter: 'D',
                title: 'Kemitraan & Tata Kelola',
                desc: 'Forum pengelolaan bersama (co-management) melibatkan DKP Jateng, CDKWB, PLTU Batang (CSR), UNDIP, dan komunitas lokal.',
              },
            ].map((pilar, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-violet-100 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-violet-600 text-white font-display font-extrabold text-lg flex items-center justify-center mb-3">
                    {pilar.letter}
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-[#1a0a3e] mb-2">{pilar.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{pilar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KONDISI KUALITAS PERAIRAN & OSEANOGRAFI ── */}
      <section id="kualitas-air" className="bg-[#f8f5ff] py-24 px-6 relative border-b border-violet-200">
        <div ref={waterRef} className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-violet-100 text-violet-900 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Data Parameter Ilmiah Lapangan
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1a0a3e] tracking-tight mb-4">
              Kualitas Perairan & Oseanografi
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Pengukuran parameter fisika-kimia air laut di 6 stasiun pengamatan kawasan konservasi Ujungnegoro–Roban (2025).
            </p>
          </div>

          {/* Water Quality Table */}
          <div className="bg-white rounded-3xl border border-violet-200 shadow-md overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                <thead className="bg-violet-900 text-white text-xs font-extrabold uppercase">
                  <tr>
                    <th className="p-4">Stasiun / Lokasi</th>
                    <th className="p-4">Kedalaman</th>
                    <th className="p-4">Visibilitas</th>
                    <th className="p-4">pH</th>
                    <th className="p-4">Suhu (°C)</th>
                    <th className="p-4">Salinitas</th>
                    <th className="p-4">DO (mg/L)</th>
                    <th className="p-4">Saturasi DO</th>
                    <th className="p-4">Kondisi Ekologis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-violet-100 font-medium">
                  {waterQualityData.map((row, i) => (
                    <tr key={i} className="hover:bg-violet-50/60 transition-colors">
                      <td className="p-4 font-bold text-[#1a0a3e]">{row.lokasi}</td>
                      <td className="p-4">{row.depth}</td>
                      <td className="p-4 font-semibold text-violet-700">{row.vis}</td>
                      <td className="p-4">{row.ph}</td>
                      <td className="p-4">{row.temp}</td>
                      <td className="p-4">{row.sal}</td>
                      <td className="p-4 font-bold text-slate-900">{row.doVal}</td>
                      <td className="p-4">{row.doSat}</td>
                      <td className="p-4">
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-violet-100 text-violet-900 inline-block">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Analysis Note Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
              <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Analisis Oksigen Terlarut (DO) & Suhu</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Seluruh stasiun memiliki nilai Dissolved Oxygen (DO) di atas ambang batas minimum baku mutu laut (3,0 mg/L). 
                Suhu perairan stabil di kisaran 30,6–31,6 °C dengan pH netral-basa (7,94–8,09) yang sangat mendukung metabolisme biota karang dan fitoplankton.
              </p>
            </div>

            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Catatan Sedimen & Timbal (Pb)</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Kandungan logam berat Timbal (Pb) di Karang Ban-3 tercatat 0,310 mg/kg, melebihi baku mutu sedimen (~0,2 mg/kg) sebagai indikasi 
                tekanan antropogenik limbah maritim. Kadmium (Cd) aman dan tidak terdeteksi signifikan di seluruh lokasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ANCAMAN & TANTANGAN KAWASAN ── */}
      <section className="bg-[#ede8ff] py-24 px-6 relative border-b border-violet-200">
        <div ref={threatsRef} className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-violet-100 text-violet-900 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Identifikasi Masalah & Kerentanan
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1a0a3e] tracking-tight mb-4">
              Ancaman & Tantangan Kawasan
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Enam faktor utama tekanan lingkungan dan antropogenik yang teridentifikasi dalam review zonasi 2025 
              yang membutuhkan penanganan kolaboratif lintas sektor.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {threatsData.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-violet-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-violet-50 flex items-center justify-center">
                      {t.icon}
                    </div>
                    <span className="text-[11px] font-extrabold px-3 py-0.5 rounded-full bg-violet-100 text-violet-900">
                      {t.impact}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base sm:text-lg text-[#1a0a3e] mb-2 leading-snug">
                    {t.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DASAR HUKUM & REGULASI PERLINDUNGAN ── */}
      <section className="bg-[#1a0a3e] text-white py-24 px-6 relative overflow-hidden border-b border-white/10">
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '6px 6px' }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

        <div ref={lawsRef} className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-violet-300 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Payung Hukum & Regulasi
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight mb-4">
              Dasar Hukum & Ketentuan Pidana
            </h2>
            <p className="text-violet-100/80 text-sm sm:text-base leading-relaxed">
              Kawasan Konservasi Ujungnegoro–Roban dilindungi oleh kerangka hukum hierarkis dari tingkat undang-undang, 
              peraturan daerah RTRW Jawa Tengah 2024, hingga keputusan menteri dengan sanksi pidana tegas.
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
                    <span className="text-xs font-extrabold text-violet-300 uppercase tracking-wider">
                      {law.category}
                    </span>
                    <span className="text-[10px] font-bold bg-violet-500/20 text-violet-200 border border-violet-400/30 px-2.5 py-0.5 rounded-full">
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
                  <FileText className="w-3.5 h-3.5 text-violet-400" />
                  <span>Dinas Kelautan & Perikanan Provinsi Jateng • CDKWB</span>
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
                  Peringatan Keras Penangkapan Ikan Ilegal & Destruktif (Illegal Fishing)
                </h4>
                <p className="text-xs sm:text-sm text-red-200/90 leading-relaxed">
                  Setiap orang yang dengan sengaja menggunakan bahan peledak, racun kimia (potas), jaring arad terlarang, 
                  atau merusak terumbu karang di kawasan Ujungnegoro–Roban diancam pidana penjara paling lama 6 tahun 
                  dan denda maksimal <strong>Rp 1.200.000.000,-</strong> sesuai Pasal 84 UU Perikanan.
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

      {/* ── TENTANG KAWASAN & EVALUASI STATUS ── */}
      <section className="bg-white py-24 px-6 relative border-b border-violet-100">
        <div ref={aboutRef} className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            <div>
              <span className="inline-block bg-violet-100 text-violet-900 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
                Tentang Kawasan
              </span>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1a0a3e] leading-[1.05] mb-6">
                Tanjung Konservasi Pesisir<br />
                <span className="text-violet-600">Ujungnegoro–Roban</span>
              </h2>
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Kawasan Konservasi Perairan (KKP) Ujungnegoro–Roban membentang di pesisir utara Kabupaten Batang, Jawa Tengah. 
                  Sebagai tanjung berbatu alami, kawasan ini memiliki karakter ekologis unik yang memadukan terumbu karang alami, 
                  substrat bebatuan tebing <em>spawning ground</em>, serta perairan produktif yang menopang ribuan nelayan lokal.
                </p>
                <p>
                  Secara historis dan kultural, Ujungnegoro memiliki nilai spiritual mendalam bagi masyarakat Batang dengan keberadaan 
                  situs Goa Aswatama di tebing karang pantai, menjadikannya perpaduan harmonis antara cagar budaya dan cagar alam bahari.
                </p>
                <p className="bg-violet-50 p-4 rounded-2xl border border-violet-100 text-xs sm:text-sm text-violet-950 font-medium italic">
                  &ldquo;Identifikasi kawasan menunjukkan masih terdapat ekosistem penting perairan yang layak dikonservasi dengan pendekatan zonasi adaptif. Tekanan lingkungan dapat diminimalkan melalui pengelolaan kolaboratif, rehabilitasi substrat, dan pemberdayaan masyarakat pesisir secara berkelanjutan.&rdquo;
                  <span className="block text-right font-bold text-violet-700 not-italic mt-2">— Paparan Akhir Review Zonasi DKP Jateng (2025)</span>
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: 'Status Resmi', value: 'KKP Daerah (SK Men-KP 2012)' },
                  { label: 'Pengelola', value: 'DKP Jateng & CDKWB Batang-Pekalongan' },
                  { label: 'Mitra Pengelolaan', value: 'Pokmaswas, DKP Batang, PLTU, UNDIP' },
                  { label: 'Forum Koordinasi', value: 'Forum KKPD Ujungnegoro–Roban' },
                ].map((item, i) => (
                  <div key={i} className="bg-[#f0ebff] rounded-2xl p-4 sm:p-5 border border-violet-200">
                    <p className="text-xs text-slate-500 font-bold mb-1">{item.label}</p>
                    <p className="text-xs sm:text-sm font-extrabold text-[#1a0a3e]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-violet-950/20 border-2 border-violet-200">
                <img
                  src="https://images.unsplash.com/photo-1439405326854-014607f694d7?q=80&w=900&auto=format&fit=crop"
                  alt="Pantai Ujungnegoro, kawasan konservasi pesisir Batang"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-4 sm:left-4 bg-white rounded-2xl shadow-xl p-4 sm:p-5 border border-violet-100 flex items-center gap-3.5 z-20">
                <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0">
                  <TreePine className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold">Visi Kawasan Konservasi</div>
                  <div className="font-extrabold text-xs sm:text-sm text-[#1a0a3e]">
                    Lestari, Produktif & Berkeadilan
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabel Penilaian Kondisi Kawasan */}
          <div className="bg-[#f8f5ff] rounded-3xl p-6 sm:p-8 border border-violet-200">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1a0a3e] mb-4">
              Ringkasan Penilaian Kondisi Kawasan Umum
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                <thead className="bg-violet-100 text-violet-950 text-xs font-extrabold uppercase">
                  <tr>
                    <th className="p-3.5">Komponen Evaluasi</th>
                    <th className="p-3.5">Kategori Status</th>
                    <th className="p-3.5">Keterangan & Catatan Teknis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-violet-200 font-medium">
                  {generalAssessment.map((row, i) => (
                    <tr key={i} className="hover:bg-white transition-colors">
                      <td className="p-3.5 font-bold text-[#1a0a3e]">{row.komponen}</td>
                      <td className="p-3.5">
                        <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full ${row.badge}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-xs text-slate-600">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP SECTION ── */}
      <section className="bg-gradient-to-br from-[#1a0a3e] via-[#2d1065] to-[#0f0630] text-white py-24 px-6 relative overflow-hidden" ref={mapRef}>
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)', backgroundSize: '6px 6px' }}
        />
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-violet-500/20 blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-7xl relative z-10 text-center">
          <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-violet-300 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
            Lokasi & Aksesibilitas
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight mb-4">
            Peta Kawasan Konservasi Ujungnegoro
          </h2>
          <p className="text-violet-100/80 text-sm sm:text-base max-w-2xl mx-auto mb-10">
            Terletak di pesisir utara Kabupaten Batang, Jawa Tengah, membentang dari Pantai Sigandu, Tanjung Ujungnegoro, hingga pesisir Roban.
          </p>

          <div
            className="rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border-2 border-white/10 max-w-5xl mx-auto transition-all duration-700 delay-200"
            style={{ opacity: mapVisible ? 1 : 0, transform: mapVisible ? 'scale(1)' : 'scale(0.97)' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15838.61!2d109.7604!3d-6.8749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e700b86a3c6f4b1%3A0x4b1a1c2d3e4f5a6b!2sUjungnegoro%2C+Batang%2C+Jawa+Tengah!5e0!3m2!1sid!2sid!4v1699999999"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Kawasan Ujungnegoro"
            />
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="https://maps.google.com/?q=Pantai+Ujungnegoro+Batang+Jawa+Tengah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#1a0a3e] font-extrabold text-sm px-8 py-4 rounded-xl shadow-xl hover:bg-violet-50 active:scale-95 transition-all"
            >
              <MapPin className="w-4 h-4 text-violet-600" />
              <span>Buka di Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-violet-500" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
