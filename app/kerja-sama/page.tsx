import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GraduationCap, Handshake, ArrowRight, ChevronRight, ExternalLink, Users } from 'lucide-react';

export const metadata = {
  title: 'Kerja Sama & Kemitraan - CDKWB DKP Jawa Tengah',
  description: 'Pusat informasi kerjasama, kemitraan institusional, dan program magang CDKWB Dinas Kelautan Perikanan Provinsi Jawa Tengah.',
};

const MENU_ITEMS = [
  {
    href: '/kehumasan/kerjasama',
    icon: Handshake,
    emoji: '🤝',
    label: 'Direktori Kerjasama & Kemitraan',
    desc: 'Lihat seluruh Perjanjian Kerjasama (PKS) resmi DKP Jateng dengan Perguruan Tinggi, NGO Konservasi, dan Jejaring Pokmaswas lengkap dengan status, ruang lingkup, dan nomor dokumen.',
    badge: 'PKS Resmi',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    btnColor: 'bg-[#0b3b60] hover:bg-[#072740] text-white',
    accent: 'border-indigo-400/40',
    stats: [
      { label: 'Perguruan Tinggi', value: '3', color: 'text-indigo-600' },
      { label: 'NGO/Yayasan', value: '1', color: 'text-teal-600' },
      { label: 'Pokmaswas', value: '1', color: 'text-amber-600' },
    ]
  },
  {
    href: '/kerja-sama/informasi-magang',
    icon: GraduationCap,
    emoji: '🎓',
    label: 'Kadet Magang & Program Riset',
    desc: 'Program magang eksklusif bidang kelautan, perikanan, konservasi, dan manajemen pesisir untuk mahasiswa dari berbagai program studi. Daftar magang Merdeka Belajar (MBKM) di CDKWB.',
    badge: 'Buka Pendaftaran',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    btnColor: 'bg-emerald-700 hover:bg-emerald-600 text-white',
    accent: 'border-emerald-400/40',
    stats: [
      { label: 'Durasi Program', value: '1–6 Bln', color: 'text-emerald-600' },
      { label: 'Bidang Keahlian', value: '6+', color: 'text-sky-600' },
      { label: 'Peserta/Batch', value: '15', color: 'text-violet-600' },
    ]
  },
];

export default function KerjasamaLandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#041329] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-cyan-500/12 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/12 rounded-full blur-3xl"></div>
        </div>
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '48px 48px' }}
        />

        <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/50 text-xs mb-6">
            <Link href="/" className="hover:text-cyan-300 transition-colors">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">Kerja Sama & Kemitraan</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-cyan-300 text-xs font-semibold mb-4">
            <Users className="w-3.5 h-3.5" />
            Kemitraan Strategis Kelautan Jawa Tengah
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Kerja Sama &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-200">
              Kemitraan CDKWB
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Pusat informasi seluruh kerjasama resmi dan program kemitraan CDKWB — dari Perjanjian Kerjasama (PKS) institusional bersama Perguruan Tinggi dan NGO, hingga program magang eksklusif bagi mahasiswa dan peneliti.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="container mx-auto px-4 sm:px-6 max-w-6xl py-12 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {MENU_ITEMS.map((item) => (
            <div key={item.href} className={`bg-white rounded-3xl border-2 ${item.accent} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden`}>
              {/* Card header */}
              <div className="p-7 pb-5 border-b border-slate-100">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="text-4xl">{item.emoji}</div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 leading-snug mb-2">
                  {item.label}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Stats row */}
              <div className="px-7 py-4 grid grid-cols-3 gap-3 bg-slate-50/80">
                {item.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className={`text-lg font-black ${stat.color}`}>{stat.value}</div>
                    <div className="text-[10px] text-slate-500 font-medium leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="p-5">
                <Link
                  href={item.href}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl ${item.btnColor} font-bold text-sm transition-all shadow-md active:scale-95`}
                >
                  Buka Halaman
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#041329] to-[#0c3156] rounded-3xl p-8 text-white text-center shadow-xl max-w-4xl mx-auto">
          <div className="text-2xl mb-2">💬</div>
          <h3 className="text-lg font-bold mb-2">Ada Pertanyaan Seputar Kerjasama?</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto mb-5 leading-relaxed">
            Hubungi Tim Kehumasan CDKWB untuk konsultasi pengajuan MoU, PKS baru, atau informasi teknis program magang.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="https://wa.me/628971574040?text=Halo%20CDKWB,%20saya%20ingin%20bertanya%20mengenai%20kerjasama%20atau%20magang."
              target="_blank"
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-2"
            >
              WhatsApp Humas CDKWB
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/kontak"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-colors"
            >
              Kontak & Alamat
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
