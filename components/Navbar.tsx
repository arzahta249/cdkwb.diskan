"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronDown, Menu, X, ChevronRight, FileText, PlayCircle, Ship, PhoneCall } from 'lucide-react';
import { usePathname } from 'next/navigation';
import SimulasiEsloModal from './SimulasiEsloModal';
import DaftarAkunModal from './DaftarAkunModal';
import AjukanIzinModal from './AjukanIzinModal';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [isBerkasModalOpen, setIsBerkasModalOpen] = useState(false);
  const [isDaftarModalOpen, setIsDaftarModalOpen] = useState(false);
  const [isAjukanModalOpen, setIsAjukanModalOpen] = useState(false);

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

          {/* Dropdown Layanan */}
          <div className={linkClass}>
            Layanan <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-visible translate-y-2 group-hover:translate-y-0 cursor-default">
              {/* 1. Kawasan Konservasi */}
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
              <div className="relative group/kerjasama">
                <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
                  Kerja Sama
                  <ChevronDown className="w-3.5 h-3.5 -rotate-90 ml-2 flex-shrink-0" />
                </div>
                <div className="absolute left-full top-0 ml-1 w-52 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover/kerjasama:opacity-100 group-hover/kerjasama:visible transition-all duration-200 flex flex-col overflow-hidden">
                  <Link href="/kerja-sama/informasi-magang" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Info Magang</Link>
                </div>
              </div>

              {/* 5. Layanan SUOP */}
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Profil SUOP</Link>

              {/* 6. Layanan E-SLO */}
              <div className="group/eslo relative">
                <div className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-between cursor-pointer">
                  Layanan E-SLO <ChevronRight className="w-4 h-4" />
                </div>
                <div className="absolute top-0 left-full ml-1 w-[280px] bg-white border border-gray-100 shadow-2xl rounded-2xl opacity-0 invisible group-hover/eslo:opacity-100 group-hover/eslo:visible transition-all duration-300 p-2 flex flex-col cursor-default">
                  <div className="flex flex-col gap-1">
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
                  </div>
                  
                  <div className="mt-3 border-t border-gray-100 pt-3 px-1 pb-1">
                    <Link href="https://eslo.kkp.go.id/" target="_blank" className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold text-sm text-center p-3 uppercase rounded-xl shadow-md transition-colors animate-pulse">
                      BUKA WEB E-SLO SEKARANG
                    </Link>
                  </div>
                </div>
              </div>
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
                <Link href="#" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Kehumasan</Link>

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
    </nav>
  );
}