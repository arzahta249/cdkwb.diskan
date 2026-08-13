"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Search, ChevronDown, Menu, X, ChevronRight, ArrowRight, FileText, Compass, Phone, FolderDown, Sparkles, PlayCircle, Ship, PhoneCall } from 'lucide-react';
import SimulasiEsloModal from './SimulasiEsloModal';
import DaftarAkunModal from './DaftarAkunModal';
import AjukanIzinModal from './AjukanIzinModal';

const SEARCH_INDEX = [
  { title: 'Berita & Kegiatan Terbaru', category: 'Informasi', href: '/news', keywords: 'berita info kegiatan kabar berita terbaru', icon: FileText },
  { title: 'Artikel & Wawasan Maritim', category: 'Informasi', href: '/artikel', keywords: 'artikel wawasan jurnal maritim artikel edukasi', icon: FileText },
  { title: 'Materi & Dokumen Unduhan', category: 'Hubungi Kami', href: '/materi', keywords: 'materi dokumen unduh regulasi laporan pdf peraturan', icon: FolderDown },
  { title: 'Kawasan Konservasi Karang Jeruk', category: 'Layanan Konservasi', href: '/konservasi/kawasan/karang-jeruk', keywords: 'karang jeruk batang terumbu pesisir laut', icon: Compass },
  { title: 'Kawasan Konservasi Ujungnegoro', category: 'Layanan Konservasi', href: '/konservasi/kawasan/ujungnegoro', keywords: 'ujungnegoro batang tanjung pantai', icon: Compass },
  { title: 'Rehabilitasi Mangrove', category: 'Layanan Konservasi', href: '/konservasi/rehabilitasi-mangrove', keywords: 'mangrove rehabilitasi bibit tanam pesisir', icon: Compass },
  { title: 'Layanan Pengaduan & Survei SKM', category: 'Layanan Publik', href: '/pengaduan', keywords: 'pengaduan aduan tiket survei kepuasan ikm skm lapor', icon: Phone },
  { title: 'Kontak Resmi & Alamat', category: 'Hubungi Kami', href: '/kontak', keywords: 'kontak telepon email alamat kantor hubungi', icon: Phone },
  { title: 'Lokasi Peta Kantor CDKWB', category: 'Hubungi Kami', href: '/kontak#lokasi', keywords: 'lokasi peta alamat gmaps kantor cabang', icon: Phone },
  { title: 'Struktur Organisasi', category: 'Profil', href: '/profil/struktur-organisasi', keywords: 'struktur organisasi pejabat kepala cabang hirarki', icon: FileText },
  { title: 'Tugas Pokok & Fungsi', category: 'Profil', href: '/profil/tugas-pokok', keywords: 'tugas pokok fungsi tupoksi dkp', icon: FileText },
  { title: 'Visi & Misi', category: 'Profil', href: '/profil/visi-misi', keywords: 'visi misi tujuan strategi arah', icon: FileText },
  { title: 'Tentang Kami', category: 'Profil', href: '/profil/tentang-kami', keywords: 'tentang kami dkp cdkwb sejarah cabang', icon: FileText },
  { title: 'Galeri Foto Kegiatan', category: 'Galeri', href: '/galeri?tab=foto', keywords: 'galeri foto dokumentasi gambar album', icon: FileText },
  { title: 'Galeri Video Operasional', category: 'Galeri', href: '/galeri?tab=video', keywords: 'galeri video youtube mp4 tiktok dokumentasi', icon: FileText },
  { title: 'Galeri Infografis', category: 'Galeri', href: '/galeri?tab=infografis', keywords: 'infografis poster data grafik statistik', icon: FileText },
];

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  
  // Modals for Layanan
  const [isBerkasModalOpen, setIsBerkasModalOpen] = useState(false);
  const [isDaftarModalOpen, setIsDaftarModalOpen] = useState(false);
  const [isAjukanModalOpen, setIsAjukanModalOpen] = useState(false);

  // Global Search Modal States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Ctrl+K or Cmd+K to open, ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else if (!isMobileMenuOpen) {
      document.body.style.overflow = 'unset';
    }
  }, [isSearchOpen, isMobileMenuOpen]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else if (!isSearchOpen) {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  const toggleMobileDropdown = (menu: string) => {
    setActiveMobileDropdown(activeMobileDropdown === menu ? null : menu);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    router.push(`/news?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const filteredResults = SEARCH_INDEX.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.keywords.toLowerCase().includes(q)
    );
  });

  const linkClass = "relative flex items-center gap-1 cursor-pointer text-gray-600 hover:text-[#0b3b60] transition-colors py-2 group after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#0b3b60] after:transition-all after:duration-300 hover:after:w-full";

  return (
    <>
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-[500]">
        <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 z-50">
            <div className="relative w-8 h-10 sm:w-10 sm:h-12 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/leading/logo.jateng.jpg" 
                alt="Logo Jawa Tengah" 
                className="w-8 h-10 sm:w-10 sm:h-12 object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#0b3b60] tracking-tight">CDKWB</div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <Link href="/" className={linkClass}>
              Beranda
            </Link>

            {/* Dropdown Profil */}
            <div className={linkClass}>
              Profil <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 text-slate-400 group-hover:text-[#0b3b60]" />
              <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-slate-100 shadow-xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 flex flex-col translate-y-2 group-hover:translate-y-0 cursor-default">
                <Link href="/profil/struktur-organisasi" className="px-3.5 py-2.5 text-xs sm:text-sm text-slate-600 hover:text-[#0b3b60] hover:bg-slate-50 font-medium rounded-xl transition-colors">Struktur Organisasi</Link>
                <Link href="/profil/tugas-pokok" className="px-3.5 py-2.5 text-xs sm:text-sm text-slate-600 hover:text-[#0b3b60] hover:bg-slate-50 font-medium rounded-xl transition-colors">Tugas Pokok & Fungsi</Link>
                <Link href="/profil/visi-misi" className="px-3.5 py-2.5 text-xs sm:text-sm text-slate-600 hover:text-[#0b3b60] hover:bg-slate-50 font-medium rounded-xl transition-colors">Visi dan Misi</Link>
                <Link href="/profil/tentang-kami" className="px-3.5 py-2.5 text-xs sm:text-sm text-slate-600 hover:text-[#0b3b60] hover:bg-slate-50 font-medium rounded-xl transition-colors">Tentang Kami</Link>
              </div>
            </div>

            {/* Dropdown Informasi */}
            <div className={linkClass}>
              Informasi <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 text-slate-400 group-hover:text-[#0b3b60]" />
              <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-slate-100 shadow-xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 flex flex-col translate-y-2 group-hover:translate-y-0 cursor-default">
                <Link href="/news" className="px-3.5 py-2.5 text-sm text-slate-600 hover:text-[#0b3b60] hover:bg-slate-50 font-medium rounded-xl transition-colors">Berita</Link>
                <Link href="/artikel" className="px-3.5 py-2.5 text-sm text-slate-600 hover:text-[#0b3b60] hover:bg-slate-50 font-medium rounded-xl transition-colors">Artikel</Link>
              </div>
            </div>

            {/* Streamlined Mega Dropdown Layanan */}
            <div className={linkClass}>
              Layanan <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 text-slate-400 group-hover:text-[#0b3b60]" />
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[620px] bg-white border border-slate-100 shadow-2xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4 grid grid-cols-2 gap-4 translate-y-2 group-hover:translate-y-0 cursor-default z-50">
                
                {/* Column 1: Layanan Utama & Konservasi */}
                <div className="space-y-3">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">Konservasi & Kehumasan</div>
                  <div className="space-y-1">
                    <Link href="/konservasi/kawasan/karang-jeruk" className="group/item flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                      <div>
                        <div className="text-sm font-semibold text-slate-800 group-hover/item:text-[#0b3b60]">KKP Karang Jeruk</div>
                        <div className="text-xs text-slate-500">Kawasan konservasi perairan Batang</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover/item:text-[#0b3b60] transition-transform group-hover/item:translate-x-0.5" />
                    </Link>

                    <Link href="/konservasi/kawasan/ujungnegoro" className="group/item flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                      <div>
                        <div className="text-sm font-semibold text-slate-800 group-hover/item:text-[#0b3b60]">KKP Ujungnegoro</div>
                        <div className="text-xs text-slate-500">Taman pesisir & keanekaragaman laut</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover/item:text-[#0b3b60] transition-transform group-hover/item:translate-x-0.5" />
                    </Link>

                    <Link href="/konservasi/rehabilitasi-mangrove" className="group/item flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                      <div>
                        <div className="text-sm font-semibold text-slate-800 group-hover/item:text-[#0b3b60]">Rehabilitasi Mangrove</div>
                        <div className="text-xs text-slate-500">Penanaman & pelestarian pesisir</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover/item:text-[#0b3b60] transition-transform group-hover/item:translate-x-0.5" />
                    </Link>

                    <Link href="/kehumasan" className="group/item flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/60 transition-colors">
                      <div>
                        <div className="text-sm font-semibold text-[#0b3b60]">Kehumasan & Publikasi</div>
                        <div className="text-xs text-slate-500">Layanan informasi publik & humas</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover/item:text-[#0b3b60] transition-transform group-hover/item:translate-x-0.5" />
                    </Link>

                    <Link href="/kerja-sama/informasi-magang" className="group/item flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                      <div>
                        <div className="text-sm font-semibold text-slate-800 group-hover/item:text-[#0b3b60]">Info Magang & Kerja Sama</div>
                        <div className="text-xs text-slate-500">Kemitraan akademis & penelitian</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover/item:text-[#0b3b60] transition-transform group-hover/item:translate-x-0.5" />
                    </Link>
                  </div>
                </div>

                {/* Column 2: Portal & Panduan E-SLO */}
                <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-[#0b3b60] uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>Layanan E-SLO & SUOP</span>
                      <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">Resmi</span>
                    </div>

                    <div className="space-y-1.5">
                      <button onClick={() => setIsBerkasModalOpen(true)} className="w-full text-left flex items-center gap-2.5 p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200">
                        <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-slate-800">Siapkan Berkas</div>
                          <div className="text-[11px] text-slate-500">Persyaratan NIB, SKAT & SLO</div>
                        </div>
                      </button>

                      <button onClick={() => setIsDaftarModalOpen(true)} className="w-full text-left flex items-center gap-2.5 p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200">
                        <PlayCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-slate-800">Cara Daftar Akun</div>
                          <div className="text-[11px] text-slate-500">Panduan registrasi via HP</div>
                        </div>
                      </button>

                      <button onClick={() => setIsAjukanModalOpen(true)} className="w-full text-left flex items-center gap-2.5 p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200">
                        <Ship className="w-4 h-4 text-[#0b3b60] shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-slate-800">Cara Ajukan Izin</div>
                          <div className="text-[11px] text-slate-500">Alur pengajuan online</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200/70 space-y-2">
                    <Link href="https://wa.me/628971574040?text=Halo%20Petugas%20Dinas%20Kelautan,%20saya%20butuh%20bantuan%20terkait%20e-SLO" target="_blank" className="flex items-center justify-center gap-2 p-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-semibold transition-colors">
                      <PhoneCall className="w-3.5 h-3.5" /> Tanya Petugas WA
                    </Link>

                    <Link href="https://eslo.kkp.go.id/" target="_blank" className="block w-full bg-[#0b3b60] hover:bg-[#072740] text-white font-bold text-xs text-center py-2.5 rounded-lg shadow-sm transition-colors">
                      BUKA PORTAL E-SLO
                    </Link>
                  </div>
                </div>

              </div>
            </div>

            {/* Dropdown Galeri */}
            <div className={linkClass}>
              Galeri <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 text-slate-400 group-hover:text-[#0b3b60]" />
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 shadow-xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 flex flex-col translate-y-2 group-hover:translate-y-0 cursor-default">
                <Link href="/galeri?tab=foto" className="px-3.5 py-2.5 text-sm text-slate-600 hover:text-[#0b3b60] hover:bg-slate-50 font-medium rounded-xl transition-colors">Foto</Link>
                <Link href="/galeri?tab=video" className="px-3.5 py-2.5 text-sm text-slate-600 hover:text-[#0b3b60] hover:bg-slate-50 font-medium rounded-xl transition-colors">Video</Link>
                <Link href="/galeri?tab=infografis" className="px-3.5 py-2.5 text-sm text-slate-600 hover:text-[#0b3b60] hover:bg-slate-50 font-medium rounded-xl transition-colors">Infografis</Link>
              </div>
            </div>

            {/* Dropdown Hubungi Kami */}
            <div className={linkClass}>
              Hubungi Kami <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 text-slate-400 group-hover:text-[#0b3b60]" />
              <div className="absolute top-full -left-12 mt-2 w-52 bg-white border border-slate-100 shadow-xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 flex flex-col translate-y-2 group-hover:translate-y-0 cursor-default">
                <Link href="/kontak" className="px-3.5 py-2.5 text-sm text-slate-600 hover:text-[#0b3b60] hover:bg-slate-50 font-medium rounded-xl transition-colors">Kontak</Link>
                <Link href="/kontak#lokasi" className="px-3.5 py-2.5 text-sm text-slate-600 hover:text-[#0b3b60] hover:bg-slate-50 font-medium rounded-xl transition-colors">Lokasi Peta</Link>
                <Link href="/pengaduan" className="px-3.5 py-2.5 text-sm text-slate-600 hover:text-[#0b3b60] hover:bg-slate-50 font-medium rounded-xl transition-colors">Pengaduan & SKM</Link>
                <Link href="/materi" className="px-3.5 py-2.5 text-sm text-slate-600 hover:text-[#0b3b60] hover:bg-slate-50 font-medium rounded-xl transition-colors">Materi & Dokumen</Link>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Functional & Accessible Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Cari website CDKWB"
              title="Cari website (Ctrl + K)"
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-600 transition-all cursor-pointer border border-transparent hover:border-blue-200 group"
            >
              <Search className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
              <span className="hidden md:inline text-xs font-medium text-gray-500 group-hover:text-blue-600">Cari...</span>
              <kbd className="hidden md:inline-flex items-center gap-0.5 text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-gray-200 text-gray-400">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button 
              type="button"
              className="lg:hidden p-2 text-gray-600 hover:text-[#0b3b60] hover:bg-gray-100 rounded-lg transition-all min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer active:scale-95 touch-manipulation select-none"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMobileMenuOpen((prev) => !prev);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMobileMenuOpen((prev) => !prev);
              }}
              aria-label="Toggle mobile navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-800" /> : <Menu className="w-6 h-6 text-gray-800" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-white z-[501] shadow-2xl transition-transform duration-300 transform lg:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="text-lg font-bold text-[#0b3b60]">Menu</div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Tutup menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-5 flex-1 overflow-y-auto space-y-1.5">
          <Link href="/" className="block py-3 px-4 text-base font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            Beranda
          </Link>

          {/* Profil */}
          <div>
            <button
              onClick={() => toggleMobileDropdown('profil')}
              className="w-full flex items-center justify-between py-3 px-4 text-base font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
            >
              Profil
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMobileDropdown === 'profil' ? 'rotate-180 text-blue-600' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${activeMobileDropdown === 'profil' ? 'max-h-56' : 'max-h-0'}`}>
              <div className="pl-4 py-2 space-y-1 bg-gray-50/70 rounded-xl mt-1">
                <Link href="/profil/struktur-organisasi" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Struktur Organisasi</Link>
                <Link href="/profil/tugas-pokok" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Tugas Pokok & Fungsi</Link>
                <Link href="/profil/visi-misi" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Visi dan Misi</Link>
                <Link href="/profil/tentang-kami" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Tentang Kami</Link>
              </div>
            </div>
          </div>

          {/* Informasi */}
          <div>
            <button
              onClick={() => toggleMobileDropdown('informasi')}
              className="w-full flex items-center justify-between py-3 px-4 text-base font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
            >
              Informasi
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMobileDropdown === 'informasi' ? 'rotate-180 text-blue-600' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${activeMobileDropdown === 'informasi' ? 'max-h-48' : 'max-h-0'}`}>
              <div className="pl-4 py-2 space-y-1 bg-gray-50/70 rounded-xl mt-1">
                <Link href="/news" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Berita</Link>
                <Link href="/artikel" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Artikel</Link>
              </div>
            </div>
          </div>

          {/* Layanan */}
          <div>
            <button
              onClick={() => toggleMobileDropdown('layanan')}
              className="w-full flex items-center justify-between py-3 px-4 text-base font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
            >
              Layanan
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMobileDropdown === 'layanan' ? 'rotate-180 text-blue-600' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${activeMobileDropdown === 'layanan' ? 'max-h-[800px]' : 'max-h-0'}`}>
              <div className="pl-4 py-2 space-y-1 bg-gray-50/70 rounded-xl mt-1">
                {/* 1. Kawasan Konservasi */}
                <div>
                  <button 
                    onClick={() => toggleMobileDropdown('layanan-kawasan')}
                    className="w-full flex items-center justify-between py-2 px-4 text-sm font-semibold text-gray-700 hover:text-blue-600 rounded-lg transition-colors"
                  >
                    Kawasan Konservasi
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMobileDropdown === 'layanan-kawasan' ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${activeMobileDropdown === 'layanan-kawasan' ? 'max-h-48' : 'max-h-0'}`}>
                    <div className="pl-4 py-1.5 space-y-1 bg-white/80 rounded-lg mt-1 border border-gray-100">
                      <Link href="/konservasi/kawasan/karang-jeruk" className="block py-2 px-3 text-xs text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Karang Jeruk</Link>
                      <Link href="/konservasi/kawasan/ujungnegoro" className="block py-2 px-3 text-xs text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Ujungnegoro</Link>
                    </div>
                  </div>
                </div>

                {/* 2. Rehabilitasi Mangrove */}
                <Link href="/konservasi/rehabilitasi-mangrove" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Rehabilitasi Mangrove</Link>

                {/* 3. Kehumasan */}
                <Link href="/kehumasan" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Kehumasan</Link>

                {/* 4. Kerja Sama */}
                <div>
                  <button 
                    onClick={() => toggleMobileDropdown('layanan-kerjasama')}
                    className="w-full flex items-center justify-between py-2 px-4 text-sm text-gray-600 hover:text-blue-600 font-medium rounded-lg transition-colors"
                  >
                    Kerja Sama
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMobileDropdown === 'layanan-kerjasama' ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${activeMobileDropdown === 'layanan-kerjasama' ? 'max-h-48' : 'max-h-0'}`}>
                    <div className="pl-4 py-1.5 space-y-1 bg-white/80 rounded-lg mt-1 border border-gray-100">
                      <Link href="/kerja-sama/informasi-magang" className="block py-2 px-3 text-xs text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Info Magang</Link>
                    </div>
                  </div>
                </div>

                {/* 5. Layanan SUOP */}
                <Link href="#" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Layanan SUOP</Link>

                {/* 6. Layanan E-SLO */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col gap-2">
                  <div className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Panduan E-SLO</div>
                  
                  <button onClick={() => setIsBerkasModalOpen(true)} className="w-full text-left flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl transition-colors">
                    <FileText className="w-5 h-5 text-blue-500 shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-slate-800">Siapkan Berkas</div>
                      <div className="text-xs text-slate-500">NIB, SKAT, SLO Asal</div>
                    </div>
                  </button>
                  
                  <button onClick={() => setIsDaftarModalOpen(true)} className="w-full text-left flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl transition-colors">
                    <PlayCircle className="w-5 h-5 text-indigo-500 shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-slate-800">Cara Daftar Akun</div>
                      <div className="text-xs text-slate-500">Panduan bikin sandi di HP</div>
                    </div>
                  </button>
                  
                  <button onClick={() => setIsAjukanModalOpen(true)} className="w-full text-left flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl transition-colors">
                    <Ship className="w-5 h-5 text-teal-500 shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-slate-800">Cara Ajukan Izin</div>
                      <div className="text-xs text-slate-500">Langkah pencet pengajuan</div>
                    </div>
                  </button>
                  
                  <Link href="https://wa.me/628971574040?text=Halo%20Petugas%20Dinas%20Kelautan,%20saya%20butuh%20bantuan%20terkait%20e-SLO" target="_blank" className="flex items-center gap-3 p-3 bg-green-50/50 hover:bg-green-100/50 border border-green-100 rounded-xl transition-colors">
                    <PhoneCall className="w-5 h-5 text-green-500 shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-slate-800">Tanya Petugas</div>
                      <div className="text-xs text-slate-500">Bantuan WA jika bingung</div>
                    </div>
                  </Link>
                  
                  <div className="mt-3 border-t border-gray-100 pt-3 px-1 pb-1">
                    <Link href="https://eslo.kkp.go.id/" target="_blank" className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold text-sm text-center p-3 uppercase rounded-xl shadow-md transition-colors animate-pulse">
                      BUKA WEB E-SLO SEKARANG
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Galeri */}
          <div>
            <button
              onClick={() => toggleMobileDropdown('galeri')}
              className="w-full flex items-center justify-between py-3 px-4 text-base font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
            >
              Galeri
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMobileDropdown === 'galeri' ? 'rotate-180 text-blue-600' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${activeMobileDropdown === 'galeri' ? 'max-h-48' : 'max-h-0'}`}>
              <div className="pl-4 py-2 space-y-1 bg-gray-50/70 rounded-xl mt-1">
                <Link href="/galeri?tab=foto" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Foto</Link>
                <Link href="/galeri?tab=video" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Video</Link>
                <Link href="/galeri?tab=infografis" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Infografis</Link>
              </div>
            </div>
          </div>

          {/* Hubungi Kami */}
          <div>
            <button
              onClick={() => toggleMobileDropdown('hubungi')}
              className="w-full flex items-center justify-between py-3 px-4 text-base font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
            >
              Hubungi Kami
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMobileDropdown === 'hubungi' ? 'rotate-180 text-blue-600' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${activeMobileDropdown === 'hubungi' ? 'max-h-56' : 'max-h-0'}`}>
              <div className="pl-4 py-2 space-y-1 bg-gray-50/70 rounded-xl mt-1">
                <Link href="/materi" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Materi</Link>
                <Link href="/kontak" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Kontak</Link>
                <Link href="/kontak#lokasi" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Lokasi</Link>
                <Link href="/pengaduan" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Pengaduan & Kepuasan</Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <SimulasiEsloModal isOpen={isBerkasModalOpen} onClose={() => setIsBerkasModalOpen(false)} />
      <DaftarAkunModal isOpen={isDaftarModalOpen} onClose={() => setIsDaftarModalOpen(false)} />
      <AjukanIzinModal isOpen={isAjukanModalOpen} onClose={() => setIsAjukanModalOpen(false)} />

      {/* ─── ACCESSIBLE & FUNCTIONAL GLOBAL SEARCH MODAL ─── */}
      {isSearchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pencarian Global Website CDKWB"
          className="fixed inset-0 z-[600] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            className="fixed inset-0"
            onClick={() => setIsSearchOpen(false)}
            aria-hidden="true"
          />

          <div className="relative bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-100 z-10 animate-in zoom-in-95 duration-200">
            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="relative border-b border-gray-100 p-4 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400 shrink-0 ml-1" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ketik untuk mencari berita, materi, perizinan, atau pengaduan..."
                className="w-full bg-transparent text-base text-gray-900 placeholder-gray-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 text-xs font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors px-2.5"
              >
                ESC
              </button>
            </form>

            {/* Results Body */}
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2 divide-y divide-gray-50">
              {filteredResults.length === 0 ? (
                <div className="py-12 text-center text-gray-400 space-y-2">
                  <Sparkles className="w-8 h-8 mx-auto opacity-30 text-blue-500" />
                  <p className="text-sm font-medium">Tidak ada hasil pencarian untuk "{searchQuery}"</p>
                  <p className="text-xs text-gray-400">Cobalah kata kunci lain seperti "berita", "mangrove", atau "pengaduan".</p>
                </div>
              ) : (
                filteredResults.map((item, idx) => {
                  const IconComponent = item.icon || FileText;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setIsSearchOpen(false)}
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-blue-50/70 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-blue-100/60 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-400 font-medium">
                            {item.category}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                    </Link>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-mono shadow-2xs">↵</kbd> Buka Halaman</span>
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-mono shadow-2xs">ESC</kbd> Tutup</span>
              </div>
              <span className="text-[11px] font-semibold text-blue-600">{filteredResults.length} hasil ditemukan</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
