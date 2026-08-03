'use client';

import Link from 'next/link';
import { MapPin, Mail, ChevronRight, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#f0f2f5] pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-2xl font-bold text-[#0b3b60] mb-4">CDKWB</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Dinas Kelautan dan Perikanan Provinsi Jawa Tengah.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Membangun maritim yang tangguh dan berkelanjutan.
            </p>
          </div>

          {/* Column 2: Tautan Penting */}
          <div>
            <h4 className="text-sm font-bold text-[#0b3b60] mb-6">Tautan Penting</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-[#0b3b60] flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-gray-400" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-[#0b3b60] flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-gray-400" /> Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Instansi Terkait */}
          <div>
            <h4 className="text-sm font-bold text-[#0b3b60] mb-6">Instansi Terkait</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-[#0b3b60] flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-gray-400" /> DKP Provinsi Jawa Tengah
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-[#0b3b60] flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-gray-400" /> Kementerian Kelautan dan Perikanan
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Kontak */}
          <div>
            <h4 className="text-sm font-bold text-[#0b3b60] mb-6">Kontak</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">Jl. Maritim Barat No. 12, Jawa Tengah</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                <span className="text-sm text-gray-600">info.cdkwb@jateng.go.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-300 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Cabang Dinas Kelautan Wilayah Barat, Provinsi Jawa Tengah. All Rights Reserved.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
          >
            <ArrowUp className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </footer>
  );
}
