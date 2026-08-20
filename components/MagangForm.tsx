"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Fish, Monitor, ArrowRight } from 'lucide-react';

export default function MagangForm() {
  return (
    <section id="daftar" className="py-24 relative bg-[#010e1a] border-t border-cyan-900/30">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-white">
            Jelajahi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Posisi.</span>
          </h2>
          <p className="text-blue-100/70 text-base font-light max-w-2xl mx-auto">
            Pilih divisi yang sesuai dengan keahlian Anda dan mulailah perjalanan magang Anda bersama CDKWB.
          </p>
        </div>

        {/* Cards Posisi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#021529] border border-emerald-900/40 rounded-2xl p-6 hover:border-emerald-500/50 transition-colors group">
            <Fish className="w-10 h-10 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Konservasi</h3>
            <p className="text-blue-100/60 text-sm mb-6">Fokus pada rehabilitasi terumbu karang, penanaman mangrove, dan kelestarian ekosistem laut.</p>
            <Link href="/kerja-sama/informasi-magang/daftar?posisi=Konservasi" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold text-sm">
              Daftar Posisi Ini <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-[#021529] border border-cyan-900/40 rounded-2xl p-6 hover:border-cyan-500/50 transition-colors group">
            <ShieldCheck className="w-10 h-10 text-cyan-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Pengawasan</h3>
            <p className="text-blue-100/60 text-sm mb-6">Terlibat dalam manajemen patroli laut dan penegakan hukum di perairan wilayah barat.</p>
            <Link href="/kerja-sama/informasi-magang/daftar?posisi=Pengawasan" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm">
              Daftar Posisi Ini <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-[#021529] border border-blue-900/40 rounded-2xl p-6 hover:border-blue-500/50 transition-colors group">
            <Monitor className="w-10 h-10 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Staf IT</h3>
            <p className="text-blue-100/60 text-sm mb-6">Pengembangan sistem informasi, pengelolaan data digital, dan perbaikan infrastruktur IT.</p>
            <Link href="/kerja-sama/informasi-magang/daftar?posisi=Staf+IT" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm">
              Daftar Posisi Ini <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link href="/kerja-sama/informasi-magang/daftar" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-all hover:-translate-y-1">
            Menuju Halaman Pendaftaran Khusus <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
