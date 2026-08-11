'use client';

import React, { useState, useEffect } from 'react';
import { Search, Download, Eye, FileText, CheckCircle2, FileArchive, FileIcon, Loader2, Scale, BookOpen, Presentation, Calendar } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const KATEGORI = ['Semua', 'Regulasi & Hukum', 'Laporan Tahunan', 'Panduan Teknis', 'Materi Sosialisasi'];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Regulasi & Hukum': return <Scale className="w-4 h-4" />;
    case 'Laporan Tahunan': return <Calendar className="w-4 h-4" />;
    case 'Panduan Teknis': return <BookOpen className="w-4 h-4" />;
    case 'Materi Sosialisasi': return <Presentation className="w-4 h-4" />;
    default: return <FileText className="w-4 h-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Regulasi & Hukum': return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
    case 'Laporan Tahunan': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    case 'Panduan Teknis': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    case 'Materi Sosialisasi': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
    default: return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
  }
};

export default function MateriPage() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [materiList, setMateriList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMateri = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/materi${activeCategory !== 'Semua' ? `?category=${encodeURIComponent(activeCategory)}` : ''}`);
        const data = await res.json();
        setMateriList(data);
      } catch (error) {
        console.error('Failed to fetch materi:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMateri();
  }, [activeCategory]);

  const filteredMateri = materiList.filter(item => 
    item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.deskripsi && item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-grow pb-20">
      {/* Hero Section */}
      <section className="relative bg-[#003366] text-white pt-24 pb-32 overflow-hidden">
        {/* Ocean Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        </div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6 backdrop-blur-md">
            <FileArchive className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-50">Pusat Data Terbuka</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Materi & Dokumen Publik</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Pusat unduhan dokumen resmi, regulasi, dan materi edukasi kelautan wilayah barat.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 rounded-2xl bg-white/95 backdrop-blur-xl border-2 border-white/20 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all shadow-2xl text-lg"
              placeholder="Cari dokumen, laporan, regulasi..."
            />
          </div>
        </div>

        {/* Wave Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-slate-50">
            <path d="M0 120H1440V0C1440 0 1140.5 89.5 720 89.5C299.5 89.5 0 0 0 0V120Z" fill="currentColor"/>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 -mt-8 relative z-20">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {KATEGORI.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm border ${
                activeCategory === cat
                  ? 'bg-cyan-600 text-white border-cyan-500 shadow-cyan-500/25 scale-105'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-cyan-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Document Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Loader2 className="w-10 h-10 animate-spin text-cyan-600 mb-4" />
            <p className="text-lg">Memuat dokumen...</p>
          </div>
        ) : filteredMateri.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-white rounded-3xl shadow-sm border border-gray-100">
            <FileText className="w-16 h-16 mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Dokumen tidak ditemukan</h3>
            <p>Cobalah dengan kata kunci lain atau pilih kategori yang berbeda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMateri.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 overflow-hidden hover:shadow-[0_8px_30px_rgb(6,182,212,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                <div className="p-6 flex-grow">
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getCategoryColor(item.kategori)}`}>
                      {getCategoryIcon(item.kategori)}
                      {item.kategori.split(' ')[0]}
                    </span>
                    <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
                      {new Date(item.tanggal).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 leading-snug group-hover:text-[#003366] transition-colors">
                    {item.judul}
                  </h3>
                  {item.deskripsi && (
                    <p className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                      {item.deskripsi}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm font-medium text-gray-500 mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                      <FileIcon className="w-4 h-4" />
                      {item.file_type}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FileArchive className="w-4 h-4 text-gray-400" />
                      {item.file_size}
                    </div>
                    {item.is_verified === 1 && (
                      <div className="flex items-center gap-1.5 ml-auto text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-xs hidden sm:inline">Verified</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center gap-3">
                  <a 
                    href={item.file_url} 
                    download
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#003366] hover:bg-blue-800 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-md shadow-blue-900/20"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                  <a 
                    href={item.file_url} 
                    target="_blank"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 py-2.5 rounded-xl font-medium transition-colors"
                  >
                    <Eye className="w-4 h-4 text-gray-500" />
                    Lihat
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      </main>
      <Footer />
    </div>
  );
}
