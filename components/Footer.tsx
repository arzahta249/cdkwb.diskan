'use client';

import Link from 'next/link';
import { MapPin, Mail, ChevronRight, ArrowUp } from 'lucide-react';

const InstagramIcon = ({ className = "w-5 h-5", style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  return (
    <footer className="pt-12 sm:pt-16 pb-8" style={{ background: 'rgba(3,11,20,0.85)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-3 sm:mb-4">CDKWB</h3>
            <p className="text-xs sm:text-sm leading-relaxed mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Dinas Kelautan dan Perikanan Provinsi Jawa Tengah.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Membangun maritim yang tangguh dan berkelanjutan.
            </p>
          </div>

          {/* Column 2: Tautan Penting */}
          <div>
            <h4 className="text-xs font-bold mb-4 sm:mb-6 tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>Tautan Penting</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              <li>
                <Link href="/pengaduan" className="text-xs sm:text-sm flex items-center gap-2 transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <ChevronRight className="w-3 h-3 shrink-0" style={{ color: '#6FF3C8' }} /> <span>Pengaduan & Kepuasan Pengguna</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-xs sm:text-sm flex items-center gap-2 transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <ChevronRight className="w-3 h-3 shrink-0" style={{ color: '#6FF3C8' }} /> <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-xs sm:text-sm flex items-center gap-2 transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <ChevronRight className="w-3 h-3 shrink-0" style={{ color: '#6FF3C8' }} /> <span>Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Instansi Terkait */}
          <div>
            <h4 className="text-xs font-bold mb-4 sm:mb-6 tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>Instansi Terkait</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              <li>
                <Link href="#" className="text-xs sm:text-sm flex items-center gap-2 transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <ChevronRight className="w-3 h-3 shrink-0" style={{ color: '#6FF3C8' }} /> <span>DKP Provinsi Jawa Tengah</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-xs sm:text-sm flex items-center gap-2 transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <ChevronRight className="w-3 h-3 shrink-0" style={{ color: '#6FF3C8' }} /> <span>Kementerian Kelautan dan Perikanan</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Kontak */}
          <div>
            <h4 className="text-xs font-bold mb-4 sm:mb-6 tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>Kontak</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" style={{ color: '#6FF3C8' }} />
                <span className="text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Jl. Maritim Barat No. 12, Jawa Tengah</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" style={{ color: '#6FF3C8' }} />
                <span className="text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>info.cdkwb@jateng.go.id</span>
              </li>
              <li className="flex items-center gap-3">
                <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" style={{ color: '#6FF3C8' }} />
                <a href="https://www.instagram.com/cdkwbjateng/" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  @cdkwbjateng
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-[11px] sm:text-xs font-mono" style={{ color: 'rgba(255,255,255,0.3)' }} suppressHydrationWarning>
            © {new Date().getFullYear()} CDKWB · ZONA ABISAL, −4.500 M · Semua Hak Dilindungi
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 shrink-0"
            style={{ background: 'rgba(111,243,200,0.12)', border: '1px solid rgba(111,243,200,0.3)' }}
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" style={{ color: '#6FF3C8' }} />
          </button>
        </div>
      </div>
    </footer>
  );
}
