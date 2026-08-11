"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, Menu, X, ArrowRight, FileText, Compass, Phone, FolderDown, Sparkles } from 'lucide-react';

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
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className={linkClass}>
              Beranda
            </Link>
            
            {/* Dropdown Profil */}
            <div className={linkClass}>
              Profil <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden translate-y-2 group-hover:translate-y-0 cursor-default">
                <Link href="/profil/struktur-organisasi" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Struktur Organisasi</Link>
                <Link href="/profil/tugas-pokok" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Tugas Pokok dan Fungsi</Link>
                <Link href="/profil/visi-misi" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Visi dan Misi</Link>
                <Link href="/profil/tentang-kami" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Tentang Kami</Link>
              </div>
            </div>

            {/* Dropdown Informasi */}
            <div className={linkClass}>
              Informasi <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden translate-y-2 group-hover:translate-y-0 cursor-default">
                <Link href="/news" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Berita</Link>
                <Link href="/artikel" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Artikel</Link>
              </div>
            </div>

            {/* Dropdown Layanan (Includes Kawasan Konservasi, Rehabilitasi Mangrove, Kehumasan, Kerja Sama, SLO) */}
            <div className={linkClass}>
              Layanan <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-visible translate-y-2 group-hover:translate-y-0 cursor-default">
                {/* 1. Kawasan Konservasi (Nested flyout) */}
                <div className="relative group/kawasan">
                  <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
                    Kawasan Konservasi
                    <ChevronDown className="w-3.5 h-3.5 -rotate-90 ml-2 flex-shrink-0" />
                  </div>
                  <div className="absolute left-full top-0 ml-1 w-52 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover/kawasan:opacity-100 group-hover/kawasan:visible transition-all duration-200 flex flex-col overflow-hidden">
                    <Link href="/konservasi/kawasan/karang-jeruk" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Karang Jeruk</Link>
                    <Link href="/konservasi/kawasan/ujungnegoro" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Ujungnegoro</Link>
                  </div>
                </div>

                {/* 2. Rehabilitasi Mangrove */}
                <Link href="/konservasi/rehabilitasi-mangrove" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Rehabilitasi Mangrove</Link>
                
                {/* 3. Kehumasan */}
                <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Kehumasan</Link>

                {/* 4. Kerja Sama */}
                <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Kerja Sama</Link>

                {/* 5. SLO */}
                <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">SLO (Surat Laik Operasi)</Link>
              </div>
            </div>

            {/* Dropdown Galeri */}
            <div className={linkClass}>
              Galeri <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden translate-y-2 group-hover:translate-y-0 cursor-default">
                <Link href="/galeri?tab=foto" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Foto</Link>
                <Link href="/galeri?tab=video" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Video</Link>
                <Link href="/galeri?tab=infografis" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Infografis</Link>
              </div>
            </div>

            {/* Dropdown Hubungi Kami */}
            <div className={linkClass}>
              Hubungi Kami <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              <div className="absolute top-full -left-20 mt-2 w-56 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden translate-y-2 group-hover:translate-y-0 cursor-default">
                <Link href="/kontak" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Kontak</Link>
                <Link href="/kontak#lokasi" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Lokasi</Link>
                <Link href="/pengaduan" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Pengaduan & Kepuasan</Link>
                <Link href="/materi" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Materi</Link>
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
              className="lg:hidden p-2 text-gray-600 hover:text-[#0b3b60] hover:bg-gray-100 rounded-lg transition-colors relative z-50 min-w-[40px] min-h-[40px] flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Menu Panel */}
        <div 
          className={`fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-white z-[501] shadow-2xl transition-transform duration-300 transform lg:hidden overflow-y-auto flex flex-col ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-5 pt-20 flex-1 space-y-1.5">
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

            {/* Layanan (Contains Kawasan Konservasi, Rehabilitasi Mangrove, Kehumasan, Kerja Sama, SLO) */}
            <div>
              <button 
                onClick={() => toggleMobileDropdown('layanan')}
                className="w-full flex items-center justify-between py-3 px-4 text-base font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
              >
                Layanan
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMobileDropdown === 'layanan' ? 'rotate-180 text-blue-600' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${activeMobileDropdown === 'layanan' ? 'max-h-[500px]' : 'max-h-0'}`}>
                <div className="pl-4 py-2 space-y-1 bg-gray-50/70 rounded-xl mt-1">
                  {/* 1. Kawasan Konservasi (nested accordion) */}
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
                  <Link href="#" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Kehumasan</Link>

                  {/* 4. Kerja Sama */}
                  <Link href="#" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Kerja Sama</Link>

                  {/* 5. SLO */}
                  <Link href="#" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>SLO (Surat Laik Operasi)</Link>
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
              <div className={`overflow-hidden transition-all duration-300 ${activeMobileDropdown === 'hubungi' ? 'max-h-60' : 'max-h-0'}`}>
                <div className="pl-4 py-2 space-y-1 bg-gray-50/70 rounded-xl mt-1">
                  <Link href="/kontak" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Kontak</Link>
                  <Link href="/kontak#lokasi" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Lokasi</Link>
                  <Link href="/pengaduan" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Pengaduan & Kepuasan</Link>
                  <Link href="/materi" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Materi</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* ── ACCESSIBLE & FUNCTIONAL GLOBAL SEARCH MODAL ── */}
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

