'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  Handshake, 
  Search, 
  ChevronRight, 
  FileText, 
  CheckCircle2, 
  BookOpen, 
  Award, 
  Mail, 
  PhoneCall, 
  X,
  ExternalLink,
  Eye,
  Building2,
  Calendar,
  Clock,
  ShieldCheck,
  Sparkles,
  Edit2,
  Trash2,
  Plus,
  Loader2,
  Check
} from 'lucide-react';

interface PartnerItem {
  no: number;
  id: string;
  name: string;
  shortName: string;
  category: 'akademik' | 'teknis' | 'pokmaswas';
  categoryLabel: string;
  badgeClass: string;
  pksNumberPrimary: string;
  pksNumberSecondary?: string;
  signDate: string;
  duration: string;
  periodYears?: string;
  status: 'aktif' | 'perpanjangan' | 'tetap';
  statusLabel: string;
  statusBadgeClass: string;
  level: string;
  signatory: string;
  summary: string;
  scope: string[];
  prodiList?: string[];
  funding?: string;
  concreteOutputs?: string[];
  membersCount?: number;
  leaderName?: string;
  location?: string;
}

const PARTNERS: PartnerItem[] = [
  {
    no: 1,
    id: 'ups-tegal',
    name: 'Fakultas Perikanan dan Ilmu Kelautan, Universitas Pancasakti Tegal (UPS)',
    shortName: 'FPIK UPS Tegal',
    category: 'akademik',
    categoryLabel: 'Akademik (PT)',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    pksNumberPrimary: '444/K/L-5/FPIK-UPS/XII/2024',
    pksNumberSecondary: '019.5/8689/XII/2024',
    signDate: '15 Des 2024',
    duration: '4 Tahun',
    periodYears: '2024 — 2028',
    status: 'aktif',
    statusLabel: 'Aktif (2024–2028)',
    statusBadgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    level: 'Provinsi Jawa Tengah',
    signatory: 'Ir. Fendiawan Tiskiantoro, M.Si (Kepala DKP Jateng) & Dekan FPIK UPS',
    summary: 'Program Pengembangan Sumberdaya Kelautan dan Perikanan serta penguatan Tri Dharma Perguruan Tinggi di kawasan Pantura.',
    scope: [
      'Peningkatan mutu dan pengembangan SDM kelautan & perikanan',
      'Penyelenggaraan riset terapan & pengabdian masyarakat pesisir',
      'Pertukaran data dan publikasi ilmiah kemaritiman',
      'Pemanfaatan bersama sarana-prasarana laboratorium & lapangan'
    ]
  },
  {
    no: 2,
    id: 'unikal-pekalongan',
    name: 'Fakultas Perikanan, Universitas Pekalongan (UNIKAL)',
    shortName: 'Fakultas Perikanan UNIKAL',
    category: 'akademik',
    categoryLabel: 'Akademik (PT)',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    pksNumberPrimary: '0289/C.06.02/FPr/XII/2024',
    pksNumberSecondary: '019.5/8688/XII/2024',
    signDate: '15 Des 2024',
    duration: '4 Tahun',
    periodYears: '2024 — 2028',
    status: 'aktif',
    statusLabel: 'Aktif (2024–2028)',
    statusBadgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    level: 'Provinsi Jawa Tengah',
    signatory: 'Ir. Fendiawan Tiskiantoro, M.Si (Kepala DKP Jateng) & Dekan FPr UNIKAL',
    summary: 'Sinergi riset budidaya perikanan, kajian mitigasi abrasi pesisir Pekalongan-Batang, dan program magang mahasiswa.',
    scope: [
      'Penelitian terapan teknologi budidaya dan kelautan',
      'Program magang mandiri dan MBKM di wilayah kerja CDKWB',
      'Pertukaran data saintifik perikanan berkelanjutan',
      'Pemberdayaan kelompok pembudidaya ikan dan nelayan lokal'
    ]
  },
  {
    no: 3,
    id: 'unimus-semarang',
    name: 'Fakultas Sains & Teknologi Pertanian, Universitas Muhammadiyah Semarang (UNIMUS)',
    shortName: 'FSTP UNIMUS',
    category: 'akademik',
    categoryLabel: 'Akademik (PT)',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    pksNumberPrimary: '120/UNIMUS/AD/DN/2024',
    pksNumberSecondary: '019.5/8690/XII/2024',
    signDate: '15 Des 2024',
    duration: '4 Tahun',
    periodYears: '2024 — 2028',
    status: 'aktif',
    statusLabel: 'Aktif (2024–2028)',
    statusBadgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    level: 'Provinsi Jawa Tengah',
    signatory: 'Ir. Fendiawan Tiskiantoro, M.Si (Kepala DKP Jateng) & Dekan FSTP UNIMUS',
    summary: 'Kolaborasi lintas 4 Program Studi (Ilmu Kelautan, Teknologi Pangan, Sains Data, Statistik) untuk riset dan hilirisasi perikanan.',
    scope: [
      'Kemitraan Tri Dharma lintas 4 disiplin ilmu strategis',
      'Pengolahan & hilirisasi produk pangan hasil perikanan',
      'Analisis statistik data produksi dan pemodelan sains data',
      'Eksplorasi ekologi kelautan dan pembinaan nelayan'
    ],
    prodiList: [
      'S1 Ilmu Kelautan',
      'S1 Teknologi Pangan',
      'S1 Sains Data',
      'S1 Statistik'
    ]
  },
  {
    no: 4,
    id: 'rekam-nusantara',
    name: 'Yayasan Rekam Jejak Alam Nusantara (Rekam Nusantara Foundation)',
    shortName: 'Rekam Nusantara Foundation',
    category: 'teknis',
    categoryLabel: 'Teknis / NGO',
    badgeClass: 'bg-teal-50 text-teal-700 border-teal-200/80',
    pksNumberPrimary: '06/SPK/YRJAN/XI/2022',
    pksNumberSecondary: '019.5/910/I/2023',
    signDate: '23 Nov 2022',
    duration: 's.d. 1 Des 2024',
    periodYears: 'Dapat Diperpanjang',
    status: 'perpanjangan',
    statusLabel: 'Evaluasi Perpanjangan',
    statusBadgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
    level: 'Provinsi Jawa Tengah',
    signatory: 'Kepala DKP Jateng & Direktur Eksekutif Yayasan Rekam Jejak Alam Nusantara',
    summary: 'Pengelolaan perikanan demersal berkelanjutan (rajungan & kepiting), pendekatan Blue Carbon kawasan konservasi pesisir, dan monitoring ekologi.',
    scope: [
      'Pengelolaan perikanan demersal (rajungan Laut Jawa & kepiting Samudera Hindia)',
      'Kawasan konservasi perairan daerah berbasis Blue Carbon',
      'Monitoring biofisik terumbu karang dan rehabilitasi mangrove',
      'Rekomendasi kebijakan tata kelola perikanan ramah lingkungan'
    ],
    funding: 'Hibah Program: ± Rp 200.000.000 / Tahun',
    concreteOutputs: [
      'Pengelolaan Perikanan Berkelanjutan Rajungan (Laut Jawa)',
      'Pengelolaan Perikanan Kepiting (Samudera Hindia Selatan Jawa)',
      'Kajian Potensi Cadangan Karbon Biru (Blue Carbon) Pesisir',
      'Monitoring Biofisik Karang Jeruk & Ujungnegoro'
    ]
  },
  {
    no: 5,
    id: 'pokmaswas-agung-jaya',
    name: 'Pokmaswas "Agung Jaya", Desa Munjungagung, Kec. Kramat, Kab. Tegal',
    shortName: 'Pokmaswas Agung Jaya',
    category: 'pokmaswas',
    categoryLabel: 'Masyarakat / Pokmaswas',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200/80',
    pksNumberPrimary: 'SK Kades No. 141/08/X/2016',
    signDate: '31 Okt 2016',
    duration: 'Tidak Ditentukan',
    periodYears: 'SK Pembentukan Desa',
    status: 'tetap',
    statusLabel: 'Jejaring Aktif',
    statusBadgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
    level: 'Desa / Wilayah Kab. Tegal',
    signatory: 'Kepala Desa Munjungagung (Mitra CDKWB & Penyuluh Kab. Tegal)',
    summary: 'Kelompok pengawas masyarakat pesisir (13 anggota) yang melaksanakan pengawasan partisipatif sumber daya kelautan dan konservasi mangrove.',
    scope: [
      'Pengawasan swadaya terhadap praktek penangkapan ikan merusak',
      'Pelaporan dini pencemaran dan pelanggaran zonasi pesisir',
      'Edukasi kelestarian ekosistem laut kepada nelayan lokal',
      'Pendampingan kegiatan konservasi mangrove pesisir Kramat'
    ],
    membersCount: 13,
    leaderName: 'Ranito',
    location: 'Desa Munjungagung, Kec. Kramat, Kab. Tegal'
  }
];

function mapDbToPartner(row: any, index: number): PartnerItem {
  let scopeArr: string[] = [];
  try {
    if (Array.isArray(row.ruang_lingkup)) {
      scopeArr = row.ruang_lingkup;
    } else if (typeof row.ruang_lingkup === 'string') {
      if (row.ruang_lingkup.startsWith('[')) {
        scopeArr = JSON.parse(row.ruang_lingkup);
      } else {
        scopeArr = row.ruang_lingkup.split('\n').filter(Boolean);
      }
    }
  } catch {
    scopeArr = [row.ruang_lingkup];
  }

  let concreteOutputs: string[] | undefined = undefined;
  if (row.keluaran_program) {
    try {
      if (typeof row.keluaran_program === 'string' && row.keluaran_program.startsWith('[')) {
        concreteOutputs = JSON.parse(row.keluaran_program);
      }
    } catch {}
  }

  let prodiList: string[] | undefined = undefined;
  if (row.prodi_terlibat) {
    prodiList = row.prodi_terlibat.split(',').map((s: string) => s.trim()).filter(Boolean);
  }

  const categoryLabel = 
    row.kategori === 'akademik' ? 'Akademik (PT)' :
    row.kategori === 'teknis' ? 'Teknis / NGO' : 'Masyarakat / Pokmaswas';

  const badgeClass = 
    row.kategori === 'akademik' ? 'bg-indigo-50 text-indigo-700 border-indigo-200/80' :
    row.kategori === 'teknis' ? 'bg-teal-50 text-teal-700 border-teal-200/80' :
    'bg-amber-50 text-amber-800 border-amber-200/80';

  const statusLabel = 
    row.status === 'aktif' ? 'Aktif' :
    row.status === 'perpanjangan' ? 'Evaluasi Perpanjangan' : 'Jejaring Aktif';

  const statusBadgeClass = 
    row.status === 'aktif' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
    row.status === 'perpanjangan' ? 'bg-amber-50 text-amber-800 border-amber-200' :
    'bg-sky-50 text-sky-700 border-sky-200';

  return {
    no: index + 1,
    id: String(row.id),
    name: row.nama_mitra,
    shortName: row.singkatan || row.nama_mitra,
    category: row.kategori,
    categoryLabel,
    badgeClass,
    pksNumberPrimary: row.nomor_pks_mitra,
    pksNumberSecondary: row.nomor_pks_dinas || undefined,
    signDate: row.tanggal_pks,
    duration: row.jangka_waktu,
    status: row.status,
    statusLabel,
    statusBadgeClass,
    level: row.level || 'Provinsi Jawa Tengah',
    signatory: row.penandatangan || '',
    summary: row.ringkasan || '',
    scope: scopeArr,
    prodiList,
    concreteOutputs,
    funding: row.pendanaan || undefined,
    location: row.location || undefined
  };
}

export default function KerjasamaTablePage() {
  const [partners, setPartners] = useState<PartnerItem[]>(PARTNERS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePartnerModal, setActivePartnerModal] = useState<PartnerItem | null>(null);
  const [editingPartner, setEditingPartner] = useState<PartnerItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const res = await fetch('/api/kerjasama');
      const d = await res.json();
      if (d.success && Array.isArray(d.data) && d.data.length > 0) {
        setPartners(d.data.map((r: any, idx: number) => mapDbToPartner(r, idx)));
      }
    } catch (e) {
      console.error('Failed to fetch kerjasama from API:', e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (partner: PartnerItem) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus data kemitraan "${partner.name}"?`)) {
      return;
    }
    setDeletingId(partner.id);
    try {
      const res = await fetch(`/api/kerjasama?id=${encodeURIComponent(partner.id)}`, {
        method: 'DELETE'
      });
      const d = await res.json();
      if (d.success) {
        if (activePartnerModal?.id === partner.id) {
          setActivePartnerModal(null);
        }
        await loadData();
      } else {
        alert(d.error || 'Gagal menghapus data kerjasama.');
      }
    } catch (err) {
      console.error('Error deleting partner:', err);
      alert('Terjadi kesalahan saat menghapus data kerjasama.');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredPartners = useMemo(() => {
    return partners.filter((partner) => {
      const matchCategory = selectedCategory === 'all' || partner.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = 
        !q ||
        partner.name.toLowerCase().includes(q) ||
        partner.shortName.toLowerCase().includes(q) ||
        partner.pksNumberPrimary.toLowerCase().includes(q) ||
        (partner.pksNumberSecondary && partner.pksNumberSecondary.toLowerCase().includes(q)) ||
        partner.categoryLabel.toLowerCase().includes(q);
      
      return matchCategory && matchSearch;
    });
  }, [partners, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-950">
      <Navbar />

      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-200 pt-8 pb-6">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
            <Link href="/" className="hover:text-slate-700 transition-colors">Beranda</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/kehumasan" className="hover:text-slate-700 transition-colors">Kehumasan</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-800 font-medium">Tabel Kerjasama</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold mb-1.5 border border-indigo-100">
                <Handshake className="w-3.5 h-3.5" />
                Data Resmi Kemitraan
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Tabel Institusi & Mitra Kerjasama CDKWB
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                Daftar Perjanjian Kerjasama (PKS) dan kemitraan resmi DKP Provinsi Jawa Tengah.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsAddingNew(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Kerjasama
              </button>
              <Link
                href="https://wa.me/628971574040?text=Halo%20Humas%20CDKWB,%20saya%20ingin%20berkonsultasi%20mengenai%20pengajuan%20kerjasama/MoU"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Ajukan Kerjasama
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── FILTER & SEARCH CONTROLS ───────────────────────────────────────── */}
      <section className="container mx-auto px-4 sm:px-6 max-w-7xl pt-6 pb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Semua ({PARTNERS.length})
            </button>
            <button
              onClick={() => setSelectedCategory('akademik')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'akademik'
                  ? 'bg-indigo-700 text-white'
                  : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'
              }`}
            >
              Akademik / PT (3)
            </button>
            <button
              onClick={() => setSelectedCategory('teknis')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'teknis'
                  ? 'bg-teal-700 text-white'
                  : 'text-slate-600 hover:bg-teal-50 hover:text-teal-700'
              }`}
            >
              Teknis / NGO (1)
            </button>
            <button
              onClick={() => setSelectedCategory('pokmaswas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'pokmaswas'
                  ? 'bg-amber-700 text-white'
                  : 'text-slate-600 hover:bg-amber-50 hover:text-amber-700'
              }`}
            >
              Pokmaswas (1)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari mitra, nomor PKS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-7 py-1.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── DATA TABLE ────────────────────────────────────────────────────── */}
      <main className="container mx-auto px-4 sm:px-6 max-w-7xl pb-12 flex-1">
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3.5 text-center w-12">#</th>
                  <th className="py-3 px-4 min-w-[240px]">Mitra Kerjasama</th>
                  <th className="py-3 px-4 min-w-[120px]">Jenis / Kategori</th>
                  <th className="py-3 px-4 min-w-[220px]">Nomor Dokumen / PKS</th>
                  <th className="py-3 px-3 min-w-[110px]">Tanggal</th>
                  <th className="py-3 px-3 min-w-[120px]">Jangka Waktu</th>
                  <th className="py-3 px-3 min-w-[120px]">Status</th>
                  <th className="py-3 px-4 text-center min-w-[90px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredPartners.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-slate-400">
                      Tidak ada data kemitraan yang cocok dengan kata kunci &quot;{searchQuery}&quot;.
                    </td>
                  </tr>
                ) : (
                  filteredPartners.map((item) => (
                    <tr 
                      key={item.id} 
                      className="hover:bg-indigo-50/30 transition-colors group"
                    >
                      {/* No */}
                      <td className="py-3.5 px-3.5 text-center font-bold text-slate-400 group-hover:text-indigo-600">
                        {item.no}
                      </td>

                      {/* Mitra */}
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        <div className="leading-snug">{item.name}</div>
                        {item.prodiList && (
                          <div className="text-[10px] text-indigo-600 font-medium mt-0.5">
                            Melibatkan 4 Prodi: S1 Ilmu Kelautan, Tek. Pangan, Sains Data, Statistik
                          </div>
                        )}
                        {item.funding && (
                          <div className="text-[10px] text-teal-700 font-medium mt-0.5">
                            {item.funding}
                          </div>
                        )}
                      </td>

                      {/* Jenis */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${item.badgeClass}`}>
                          {item.categoryLabel}
                        </span>
                      </td>

                      {/* Nomor PKS */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-800">
                        <div>{item.pksNumberPrimary}</div>
                        {item.pksNumberSecondary && (
                          <div className="text-slate-500 text-[10px]">& {item.pksNumberSecondary}</div>
                        )}
                      </td>

                      {/* Tanggal */}
                      <td className="py-3.5 px-3 font-medium text-slate-800 whitespace-nowrap">
                        {item.signDate}
                      </td>

                      {/* Jangka Waktu */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="font-semibold text-slate-800 block">{item.duration}</span>
                        {item.periodYears && (
                          <span className="text-[10px] text-slate-400">{item.periodYears}</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${item.statusBadgeClass}`}>
                          {item.statusLabel}
                        </span>
                      </td>

                      {/* Aksi */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setActivePartnerModal(item)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-slate-100 hover:bg-indigo-600 text-slate-700 hover:text-white font-semibold transition-colors cursor-pointer text-[11px]"
                            title="Lihat Detail PKS"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Detail</span>
                          </button>
                          <button
                            onClick={() => setEditingPartner(item)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-amber-50 hover:bg-amber-600 text-amber-700 hover:text-white font-semibold transition-colors cursor-pointer text-[11px] border border-amber-200 hover:border-amber-600"
                            title="Edit Data PKS"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            disabled={deletingId === item.id}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white font-semibold transition-colors cursor-pointer text-[11px] border border-rose-200 hover:border-rose-600 disabled:opacity-50"
                            title="Hapus Data PKS"
                          >
                            {deletingId === item.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                            <span>Hapus</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Summary Note */}
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-slate-500 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              Menampilkan <strong>{filteredPartners.length}</strong> dari <strong>{PARTNERS.length}</strong> total kemitraan resmi CDKWB DKP Jateng.
            </div>
            <div className="text-slate-400">
              *Tingkat kewenangan PKS Provinsi (UPS, UNIKAL, UNIMUS, Rekam Nusantara) & SK Desa (Pokmaswas).
            </div>
          </div>
        </div>
      </main>

      {/* ── DETAIL MODAL ──────────────────────────────────────────────────── */}
      {activePartnerModal && (
        <div 
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActivePartnerModal(null)}
        >
          <div 
            className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-scaleUp my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 bg-slate-900 text-white flex items-start justify-between gap-3 shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/15 text-slate-200">
                    {activePartnerModal.categoryLabel}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    {activePartnerModal.statusLabel}
                  </span>
                </div>
                <h3 className="text-base font-bold leading-snug">
                  {activePartnerModal.name}
                </h3>
              </div>
              <button
                onClick={() => setActivePartnerModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700 flex-1">
              {/* Legalitas */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-600" />
                  Legalitas Dokumen
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Nomor PKS / SK Pihak Mitra:</span>
                  <span className="font-mono font-semibold text-slate-800">{activePartnerModal.pksNumberPrimary}</span>
                </div>
                {activePartnerModal.pksNumberSecondary && (
                  <div>
                    <span className="text-slate-400 block text-[10px]">Nomor DKP Prov. Jawa Tengah:</span>
                    <span className="font-mono font-semibold text-slate-800">{activePartnerModal.pksNumberSecondary}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Tanggal Penandatanganan:</span>
                    <span className="font-medium text-slate-800">{activePartnerModal.signDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Masa Berlaku:</span>
                    <span className="font-medium text-slate-800">{activePartnerModal.duration} ({activePartnerModal.periodYears})</span>
                  </div>
                </div>
                {activePartnerModal.signatory && (
                  <div className="pt-1 border-t border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Pihak Penandatangan:</span>
                    <span className="text-slate-700">{activePartnerModal.signatory}</span>
                  </div>
                )}
              </div>

              {/* Ringkasan & Ruang Lingkup */}
              <div>
                <div className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Ruang Lingkup & Tujuan Kerjasama
                </div>
                <p className="text-slate-600 mb-2 leading-relaxed">
                  {activePartnerModal.summary}
                </p>
                <ul className="space-y-1.5">
                  {activePartnerModal.scope.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-emerald-50/40 p-2 rounded-lg border border-emerald-100 text-slate-700">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rincian Khusus jika ada */}
              {activePartnerModal.prodiList && (
                <div>
                  <div className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    Program Studi yang Terlibat
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activePartnerModal.prodiList.map((p, i) => (
                      <span key={i} className="px-2.5 py-1 bg-indigo-50 border border-indigo-100 rounded-md font-semibold text-indigo-800 text-[11px]">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activePartnerModal.concreteOutputs && (
                <div>
                  <div className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-teal-600" />
                    Keluaran / Program Konkret
                  </div>
                  <div className="space-y-1.5">
                    {activePartnerModal.concreteOutputs.map((out, i) => (
                      <div key={i} className="p-2 bg-teal-50 border border-teal-100 rounded-lg text-teal-950 text-[11px] flex items-start gap-1.5">
                        <span className="font-bold text-teal-700 shrink-0">{i + 1}.</span>
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activePartnerModal.leaderName && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 text-[11px]">
                  <strong>Struktur Pokmaswas:</strong> Ketua {activePartnerModal.leaderName} ({activePartnerModal.membersCount} Anggota) · Lokasi: {activePartnerModal.location}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const item = activePartnerModal;
                    setActivePartnerModal(null);
                    setEditingPartner(item);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit Data
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(activePartnerModal)}
                  disabled={deletingId === activePartnerModal.id}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  {deletingId === activePartnerModal.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  Hapus Data
                </button>
              </div>
              <button
                type="button"
                onClick={() => setActivePartnerModal(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT / CREATE MODAL ───────────────────────────────────────────── */}
      {(editingPartner || isAddingNew) && (
        <PartnerModalForm
          partner={editingPartner}
          onClose={() => {
            setEditingPartner(null);
            setIsAddingNew(false);
          }}
          onSaved={() => {
            loadData();
          }}
        />
      )}

      <Footer />
    </div>
  );
}

function PartnerModalForm({
  partner,
  onClose,
  onSaved,
}: {
  partner: PartnerItem | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!partner;
  const [form, setForm] = useState({
    nama_mitra: partner?.name ?? '',
    singkatan: partner?.shortName ?? '',
    kategori: partner?.category ?? 'akademik',
    nomor_pks_mitra: partner?.pksNumberPrimary ?? '',
    nomor_pks_dinas: partner?.pksNumberSecondary ?? '',
    tanggal_pks: partner?.signDate ?? '',
    jangka_waktu: partner?.duration ?? '',
    status: partner?.status ?? 'aktif',
    level: partner?.level ?? 'Provinsi Jawa Tengah',
    penandatangan: partner?.signatory ?? '',
    ringkasan: partner?.summary ?? '',
    ruang_lingkup_raw: partner?.scope ? partner.scope.join('\n') : '',
    prodi_terlibat: partner?.prodiList ? partner.prodiList.join(', ') : '',
    keluaran_program: partner?.concreteOutputs ? partner.concreteOutputs.join('\n') : '',
    pendanaan: partner?.funding ?? '',
    file_dokumen_url: '',
    urutan: partner?.no ?? 0,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!form.nama_mitra.trim() || !form.nomor_pks_mitra.trim() || !form.tanggal_pks.trim() || !form.jangka_waktu.trim()) {
      setError('Nama Mitra, Nomor PKS, Tanggal, dan Jangka Waktu wajib diisi.');
      return;
    }

    setSaving(true);
    setError('');

    const scopeArray = form.ruang_lingkup_raw
      .split('\n')
      .map((s: string) => s.trim())
      .filter(Boolean);

    const outputsArray = form.keluaran_program
      .split('\n')
      .map((s: string) => s.trim())
      .filter(Boolean);

    try {
      const payload = {
        ...form,
        ruang_lingkup: scopeArray,
        keluaran_program: outputsArray.length > 1 ? outputsArray : form.keluaran_program,
        ...(isEdit ? { id: partner!.id } : {})
      };

      const res = await fetch('/api/kerjasama', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error ?? 'Gagal menyimpan data kerjasama');
      onSaved();
      onClose();
    } catch (e: any) {
      setError(e.message ?? 'Terjadi kesalahan saat menyimpan.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#0f1629] border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl my-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 shrink-0">
          <div>
            <h3 className="text-white font-bold text-lg">
              {isEdit ? 'Edit Data Kerjasama' : 'Tambah Mitra Kerjasama Baru'}
            </h3>
            <p className="text-xs text-slate-400">Kelola rincian PKS dan informasi kemitraan resmi</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Nama Mitra & Singkatan */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Nama Instansi / Mitra *</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.nama_mitra} 
                onChange={e => setForm(f => ({ ...f, nama_mitra: e.target.value }))} 
                placeholder="Fakultas Perikanan dan Ilmu Kelautan, UPS Tegal" 
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Nama Pendek / Singkatan</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.singkatan} 
                onChange={e => setForm(f => ({ ...f, singkatan: e.target.value }))} 
                placeholder="FPIK UPS Tegal" 
              />
            </div>
          </div>

          {/* Kategori & Status & Level */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Kategori / Jenis</label>
              <select 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.kategori} 
                onChange={e => setForm(f => ({ ...f, kategori: e.target.value as any }))}
              >
                <option value="akademik">Akademik / Perguruan Tinggi</option>
                <option value="teknis">Teknis / NGO / Yayasan</option>
                <option value="pokmaswas">Masyarakat / Pokmaswas</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Status Kerjasama</label>
              <select 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.status} 
                onChange={e => setForm(f => ({ ...f, status: e.target.value as any }))}
              >
                <option value="aktif">Aktif Berjalan</option>
                <option value="perpanjangan">Evaluasi / Perpanjangan</option>
                <option value="tetap">SK Berjalan / Komunitas</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Tingkat / Level</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.level} 
                onChange={e => setForm(f => ({ ...f, level: e.target.value }))} 
                placeholder="Provinsi Jawa Tengah" 
              />
            </div>
          </div>

          {/* Nomor PKS Mitra & Dinas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Nomor PKS / SK Mitra *</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.nomor_pks_mitra} 
                onChange={e => setForm(f => ({ ...f, nomor_pks_mitra: e.target.value }))} 
                placeholder="444/K/L-5/FPIK-UPS/XII/2024" 
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Nomor PKS Dinas (DKP Jateng)</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.nomor_pks_dinas} 
                onChange={e => setForm(f => ({ ...f, nomor_pks_dinas: e.target.value }))} 
                placeholder="019.5/8689/XII/2024 (Opsional)" 
              />
            </div>
          </div>

          {/* Tanggal & Jangka Waktu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Tanggal Penandatanganan *</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.tanggal_pks} 
                onChange={e => setForm(f => ({ ...f, tanggal_pks: e.target.value }))} 
                placeholder="15 Des 2024" 
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Jangka Waktu / Masa Berlaku *</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.jangka_waktu} 
                onChange={e => setForm(f => ({ ...f, jangka_waktu: e.target.value }))} 
                placeholder="4 Tahun (2024 — 2028)" 
              />
            </div>
          </div>

          {/* Penandatangan */}
          <div>
            <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Pihak Penandatangan</label>
            <input 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              value={form.penandatangan} 
              onChange={e => setForm(f => ({ ...f, penandatangan: e.target.value }))} 
              placeholder="Ir. Fendiawan Tiskiantoro, M.Si (Kepala DKP Jateng) & Dekan Mitra" 
            />
          </div>

          {/* Ringkasan */}
          <div>
            <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Ringkasan Kerjasama</label>
            <textarea 
              rows={2}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              value={form.ringkasan} 
              onChange={e => setForm(f => ({ ...f, ringkasan: e.target.value }))} 
              placeholder="Program Pengembangan Sumberdaya Kelautan dan Perikanan..." 
            />
          </div>

          {/* Ruang Lingkup (multiline) */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-slate-400 font-semibold uppercase tracking-wider">Ruang Lingkup & Tujuan (Satu per baris)</label>
              <span className="text-[10px] text-slate-500">Tekan Enter untuk butir baru</span>
            </div>
            <textarea 
              rows={4}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono text-[11px]"
              value={form.ruang_lingkup_raw} 
              onChange={e => setForm(f => ({ ...f, ruang_lingkup_raw: e.target.value }))} 
              placeholder={"Peningkatan mutu dan SDM\nPenyelenggaraan riset terapan\nPertukaran data dan publikasi"} 
            />
          </div>

          {/* Prodi & Pendanaan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Prodi Terlibat (Pisahkan koma)</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.prodi_terlibat} 
                onChange={e => setForm(f => ({ ...f, prodi_terlibat: e.target.value }))} 
                placeholder="S1 Ilmu Kelautan, Budidaya Perairan" 
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Nilai Pendanaan / Hibah</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.pendanaan} 
                onChange={e => setForm(f => ({ ...f, pendanaan: e.target.value }))} 
                placeholder="± Rp 200.000.000 / Tahun (Opsional)" 
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 border-t border-slate-800 shrink-0">
          <button 
            type="button" 
            onClick={onClose} 
            className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors text-xs font-semibold cursor-pointer"
          >
            Batal
          </button>
          <button 
            type="button" 
            onClick={handleSave} 
            disabled={saving} 
            className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-900/40"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            {saving ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Tambah Kerjasama')}
          </button>
        </div>
      </div>
    </div>
  );
}
