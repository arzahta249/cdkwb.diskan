import Link from 'next/link';
import { Search, ChevronDown } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-[#0b3b60] tracking-tight">CDKWB</div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="text-[#0b3b60] relative py-2">
            Beranda
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0b3b60] rounded-full"></span>
          </Link>
          
          {/* Dropdown Profil */}
          <div className="relative group flex items-center gap-1 cursor-pointer hover:text-[#0b3b60] transition-colors py-2">
            Profil <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden translate-y-2 group-hover:translate-y-0">
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Struktur Organisasi</Link>
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Tugas Pokok dan Fungsi</Link>
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Tentang Kami</Link>
            </div>
          </div>

          {/* Dropdown SUOP */}
          <div className="relative group flex items-center gap-1 cursor-pointer hover:text-[#0b3b60] transition-colors py-2">
            SUOP <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden translate-y-2 group-hover:translate-y-0">
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Profil SUOP</Link>
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">KK Karang Jeruk</Link>
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">KK Ujungnegoro</Link>
            </div>
          </div>

          {/* Dropdown Informasi */}
          <div className="relative group flex items-center gap-1 cursor-pointer hover:text-[#0b3b60] transition-colors py-2">
            Informasi <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden translate-y-2 group-hover:translate-y-0">
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Berita</Link>
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Artikel</Link>
            </div>
          </div>

          {/* Dropdown Galeri */}
          <div className="relative group flex items-center gap-1 cursor-pointer hover:text-[#0b3b60] transition-colors py-2">
            Galeri <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden translate-y-2 group-hover:translate-y-0">
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Foto</Link>
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Video</Link>
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Infografis</Link>
            </div>
          </div>

          {/* Dropdown Unduh */}
          <div className="relative group flex items-center gap-1 cursor-pointer hover:text-[#0b3b60] transition-colors py-2">
            Unduh <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden translate-y-2 group-hover:translate-y-0">
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Materi</Link>
            </div>
          </div>

          {/* Dropdown Hubungi Kami */}
          <div className="relative group flex items-center gap-1 cursor-pointer hover:text-[#0b3b60] transition-colors py-2">
            Hubungi Kami <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            <div className="absolute top-full -left-20 w-56 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden translate-y-2 group-hover:translate-y-0">
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Kontak</Link>
              <Link href="#" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Lokasi</Link>
              <Link href="/dashboard/aduan" className="px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Pengaduan</Link>
            </div>
          </div>
        </div>

        {/* Search Icon */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
          <Search className="w-5 h-5 text-gray-600" />
        </div>
      </div>
    </nav>
  );
}
