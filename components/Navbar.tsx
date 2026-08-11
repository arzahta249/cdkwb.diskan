"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileDropdown = (menu: string) => {
    setActiveMobileDropdown(activeMobileDropdown === menu ? null : menu);
  };

  const linkClass = "relative flex items-center gap-1 cursor-pointer text-gray-600 hover:text-[#0b3b60] transition-colors py-2 group after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#0b3b60] after:transition-all after:duration-300 hover:after:w-full";

  return (
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

          {/* Dropdown Layanan (Includes Konservasi, Perizinan, Kehumasan, Kerja Sama, SLO) */}
          <div className={linkClass}>
            Layanan <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-visible translate-y-2 group-hover:translate-y-0 cursor-default">
              {/* 1. Konservasi (Nested flyout) */}
              <div className="relative group/konservasi">
                <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
                  Konservasi
                  <ChevronDown className="w-3.5 h-3.5 -rotate-90 ml-2 flex-shrink-0" />
                </div>
                {/* Sub flyout for Konservasi */}
                <div className="absolute left-full top-0 ml-1 w-60 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover/konservasi:opacity-100 group-hover/konservasi:visible transition-all duration-200 flex flex-col overflow-visible">
                  <div className="relative group/kawasan">
                    <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
                      Kawasan Konservasi
                      <ChevronDown className="w-3.5 h-3.5 -rotate-90 ml-2 flex-shrink-0" />
                    </div>
                    <div className="absolute left-full top-0 ml-1 w-52 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover/kawasan:opacity-100 group-hover/kawasan:visible transition-all duration-200 flex flex-col overflow-hidden">
                      <Link href="/konservasi/kawasan/karang-jeruk" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">🐠 Karang Jeruk</Link>
                      <Link href="/konservasi/kawasan/ujungnegoro" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">🌊 Ujungnegoro</Link>
                    </div>
                  </div>
                  <Link href="/konservasi/rehabilitasi-mangrove" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Rehabilitasi Mangrove</Link>
                </div>
              </div>

              {/* 2. Perizinan */}
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Perizinan</Link>
              
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

          {/* Dropdown Unduh */}
          <div className={linkClass}>
            Unduh <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden translate-y-2 group-hover:translate-y-0 cursor-default">
              <Link href="/materi" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Materi</Link>
            </div>
          </div>

          {/* Dropdown Hubungi Kami */}
          <div className={linkClass}>
            Hubungi Kami <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            <div className="absolute top-full -left-20 mt-2 w-56 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden translate-y-2 group-hover:translate-y-0 cursor-default">
              <Link href="/kontak" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Kontak</Link>
              <Link href="/kontak#lokasi" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Lokasi</Link>
              <Link href="/pengaduan" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Pengaduan & Kepuasan</Link>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Icon */}
          <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </div>
          
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

          {/* Layanan (Contains Konservasi, Perizinan, Kehumasan, Kerja Sama, SLO) */}
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
                {/* 1. Konservasi (nested accordion) */}
                <div>
                  <button 
                    onClick={() => toggleMobileDropdown('layanan-konservasi')}
                    className="w-full flex items-center justify-between py-2 px-4 text-sm font-semibold text-gray-700 hover:text-blue-600 rounded-lg transition-colors"
                  >
                    Konservasi
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMobileDropdown === 'layanan-konservasi' ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${activeMobileDropdown === 'layanan-konservasi' ? 'max-h-64' : 'max-h-0'}`}>
                    <div className="pl-4 py-1.5 space-y-1 bg-white/80 rounded-lg mt-1 border border-gray-100">
                      <p className="px-3 pt-1 pb-0.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Kawasan Konservasi</p>
                      <Link href="/konservasi/kawasan/karang-jeruk" className="block py-2 px-3 text-xs text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>🐠 Karang Jeruk</Link>
                      <Link href="/konservasi/kawasan/ujungnegoro" className="block py-2 px-3 text-xs text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>🌊 Ujungnegoro</Link>
                      <div className="border-t border-gray-100 my-1" />
                      <Link href="/konservasi/rehabilitasi-mangrove" className="block py-2 px-3 text-xs text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>🌿 Rehabilitasi Mangrove</Link>
                    </div>
                  </div>
                </div>

                {/* 2. Perizinan */}
                <Link href="#" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Perizinan</Link>
                
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

          {/* Unduh */}
          <div>
            <button 
              onClick={() => toggleMobileDropdown('unduh')}
              className="w-full flex items-center justify-between py-3 px-4 text-base font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
            >
              Unduh
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMobileDropdown === 'unduh' ? 'rotate-180 text-blue-600' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${activeMobileDropdown === 'unduh' ? 'max-h-48' : 'max-h-0'}`}>
              <div className="pl-4 py-2 space-y-1 bg-gray-50/70 rounded-xl mt-1">
                <Link href="/materi" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Materi</Link>
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
            <div className={`overflow-hidden transition-all duration-300 ${activeMobileDropdown === 'hubungi' ? 'max-h-48' : 'max-h-0'}`}>
              <div className="pl-4 py-2 space-y-1 bg-gray-50/70 rounded-xl mt-1">
                <Link href="/kontak" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Kontak</Link>
                <Link href="/kontak#lokasi" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Lokasi</Link>
                <Link href="/pengaduan" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Pengaduan & Kepuasan</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}
