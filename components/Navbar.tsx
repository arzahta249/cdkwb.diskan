"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronDown, Menu, X, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);

  const toggleMobileDropdown = (menu: string) => {
    setActiveMobileDropdown(activeMobileDropdown === menu ? null : menu);
  };

  const linkClass = "relative flex items-center gap-1 cursor-pointer text-gray-600 hover:text-[#0b3b60] transition-colors py-2 group after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#0b3b60] after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 z-50">
          <div className="relative w-10 h-12">
            <Image 
              src="/leading/logo.jateng.jpg" 
              alt="Logo Jawa Tengah" 
              fill
              className="object-contain"
            />
          </div>
          <div className="text-2xl font-bold text-[#0b3b60] tracking-tight">CDKWB</div>
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

          {/* Dropdown SUOP */}
          <div className={linkClass}>
            SUOP <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden translate-y-2 group-hover:translate-y-0 cursor-default">
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Profil SUOP</Link>
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">KK Karang Jeruk</Link>
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">KK Ujungnegoro</Link>
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

          {/* Dropdown Layanan */}
          <div className={linkClass}>
            Layanan <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden translate-y-2 group-hover:translate-y-0 cursor-default">
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Layanan Perizinan</Link>
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Layanan Konservasi</Link>
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Layanan Pengawasan</Link>
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
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Kontak</Link>
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Lokasi</Link>
              <Link href="/pengaduan" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Pengaduan</Link>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </div>
          
          {/* Mobile Menu Toggle Button */}
          <button 
            className="lg:hidden p-2 text-gray-600 hover:text-[#0b3b60] hover:bg-gray-50 rounded-lg transition-colors z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white z-50 shadow-2xl transition-transform duration-300 transform lg:hidden overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 pt-24 space-y-2">
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
            <div className={`overflow-hidden transition-all duration-300 ${activeMobileDropdown === 'profil' ? 'max-h-48' : 'max-h-0'}`}>
              <div className="pl-4 py-2 space-y-1 bg-gray-50/50 rounded-xl mt-1">
                <Link href="/profil/struktur-organisasi" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Struktur Organisasi</Link>
                <Link href="/profil/tugas-pokok" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Tugas Pokok & Fungsi</Link>
                <Link href="/profil/visi-misi" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Visi dan Misi</Link>
                <Link href="/profil/tentang-kami" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Tentang Kami</Link>
              </div>
            </div>
          </div>

          {/* SUOP */}
          <div>
            <button 
              onClick={() => toggleMobileDropdown('suop')}
              className="w-full flex items-center justify-between py-3 px-4 text-base font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
            >
              SUOP
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMobileDropdown === 'suop' ? 'rotate-180 text-blue-600' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${activeMobileDropdown === 'suop' ? 'max-h-48' : 'max-h-0'}`}>
              <div className="pl-4 py-2 space-y-1 bg-gray-50/50 rounded-xl mt-1">
                <Link href="#" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Profil SUOP</Link>
                <Link href="#" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>KK Karang Jeruk</Link>
                <Link href="#" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>KK Ujungnegoro</Link>
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
              <div className="pl-4 py-2 space-y-1 bg-gray-50/50 rounded-xl mt-1">
                <Link href="/news" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Berita</Link>
                <Link href="/artikel" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Artikel</Link>
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
            <div className={`overflow-hidden transition-all duration-300 ${activeMobileDropdown === 'layanan' ? 'max-h-48' : 'max-h-0'}`}>
              <div className="pl-4 py-2 space-y-1 bg-gray-50/50 rounded-xl mt-1">
                <Link href="#" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Layanan Perizinan</Link>
                <Link href="#" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Layanan Konservasi</Link>
                <Link href="#" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Layanan Pengawasan</Link>
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
              <div className="pl-4 py-2 space-y-1 bg-gray-50/50 rounded-xl mt-1">
                <Link href="/galeri?tab=foto" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Foto</Link>
                <Link href="/galeri?tab=video" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Video</Link>
                <Link href="/galeri?tab=infografis" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Infografis</Link>
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
              <div className="pl-4 py-2 space-y-1 bg-gray-50/50 rounded-xl mt-1">
                <Link href="/materi" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Materi</Link>
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
              <div className="pl-4 py-2 space-y-1 bg-gray-50/50 rounded-xl mt-1">
                <Link href="#" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Kontak</Link>
                <Link href="#" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Lokasi</Link>
                <Link href="/pengaduan" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Pengaduan</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}
