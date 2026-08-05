"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Calendar, Play, Download, Maximize2, Search, Filter, X, Info, Droplets } from 'lucide-react';

function GaleriContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState<'foto' | 'video' | 'infografis'>('foto');
  const [activeFilter, setActiveFilter] = useState('Semua');
  
  // States for Detail Modal
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [itemType, setItemType] = useState<'foto'|'video'|null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [fotoData, setFotoData] = useState<any[]>([]);
  const [videoData, setVideoData] = useState<any[]>([]);
  const [infografisData, setInfografisData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (tabParam === 'foto' || tabParam === 'video' || tabParam === 'infografis') {
      setActiveTab(tabParam as 'foto' | 'video' | 'infografis');
    }
  }, [tabParam]);

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      try {
        const [resF, resV, resI] = await Promise.all([
          fetch('/api/galeri/foto').then(r => r.json()),
          fetch('/api/galeri/video').then(r => r.json()),
          fetch('/api/galeri/infografis').then(r => r.json())
        ]);
        setFotoData(resF.data || []);
        setVideoData(resV.data || []);
        setInfografisData(resI.data || []);
      } catch (error) {
        console.error("Error fetching galeri:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

  const filterOptions = ['Semua', 'Konservasi', 'Pengawasan', 'Operasional'];

  const filteredPhotos = activeFilter === 'Semua' 
    ? fotoData 
    : fotoData.filter(item => item.kategori_nama === activeFilter);

  const openDetail = (item: any, type: 'foto'|'video') => {
    setSelectedItem(item);
    setItemType(type);
    setIsPlaying(false);
  };

  const closeDetail = () => {
    setSelectedItem(null);
    setItemType(null);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 flex flex-col selection:bg-cyan-200 selection:text-cyan-900">
      <Navbar />

      {/* Hero Section - Oceanic Theme */}
      <section className="relative bg-gradient-to-b from-[#001e36] via-[#003B5C] to-[#025a85] pt-32 pb-32 overflow-hidden">
        {/* Background Image Overlay with Blend */}
        <div 
          className="absolute inset-0 z-0 opacity-10 bg-cover bg-center bg-no-repeat mix-blend-overlay"
          style={{ backgroundImage: "url('/leading/latar%20belakang.png')" }}
        />
        
        {/* Oceanic Floating Elements (Bubbles/Currents) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-cyan-400/10 blur-[80px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
          {/* Subtle bubbles */}
          <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-white/20 animate-[ping_3s_infinite]" />
          <div className="absolute top-1/2 right-1/3 w-4 h-4 rounded-full bg-cyan-300/20 animate-[ping_4s_infinite]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-400/30 text-cyan-200 text-sm font-medium tracking-wide backdrop-blur-md">
            <Droplets className="w-4 h-4 text-cyan-400" />
            Jendela Kelautan & Perikanan
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg">
            Galeri <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">Terpadu</span>
          </h1>
          <p className="text-lg md:text-xl text-cyan-100/80 max-w-2xl mx-auto leading-relaxed font-light">
            Eksplorasi dokumentasi kegiatan, video edukasi, serta data infografis terkini dari Cabang Dinas Kelautan Wilayah Barat.
          </p>
        </div>

        {/* Decorative Wave Bottom - Marine Style */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
           <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-20 fill-[#f8fafc]" preserveAspectRatio="none">
             <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Tabs Navigation - Floating Glassmorphism */}
      <section className="sticky top-[72px] z-30 transform -translate-y-6">
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            <div className="inline-flex bg-white/80 backdrop-blur-xl p-1.5 rounded-full shadow-lg shadow-blue-900/5 border border-slate-200/60">
              <button
                onClick={() => setActiveTab('foto')}
                className={`px-6 py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 whitespace-nowrap flex items-center space-x-2 ${
                  activeTab === 'foto' 
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/25' 
                    : 'text-slate-600 hover:bg-cyan-50 hover:text-cyan-700'
                }`}
              >
                <span>Foto Kegiatan</span>
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`px-6 py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 whitespace-nowrap flex items-center space-x-2 ${
                  activeTab === 'video' 
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/25' 
                    : 'text-slate-600 hover:bg-cyan-50 hover:text-cyan-700'
                }`}
              >
                <span>Video & Dokumenter</span>
              </button>
              <button
                onClick={() => setActiveTab('infografis')}
                className={`px-6 py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 whitespace-nowrap flex items-center space-x-2 ${
                  activeTab === 'infografis' 
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/25' 
                    : 'text-slate-600 hover:bg-cyan-50 hover:text-cyan-700'
                }`}
              >
                <span>Infografis & Data</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow pb-20 pt-6">
        <div className="container mx-auto px-6">
          
          {isLoading ? (
             <div className="flex flex-col justify-center items-center py-32 space-y-4">
               <div className="w-12 h-12 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin"></div>
               <p className="text-cyan-800 font-medium animate-pulse">Menyelami data...</p>
             </div>
          ) : (
            <>
              {/* TAB 1: GALERI FOTO */}
              {activeTab === 'foto' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-800 mb-2">Potret Maritim</h2>
                      <p className="text-slate-500">Kumpulan lensa aktivitas dan program kerja CDKWB.</p>
                    </div>
                    
                    {/* Filters */}
                    <div className="flex flex-wrap gap-2">
                      {filterOptions.map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setActiveFilter(filter)}
                          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            activeFilter === filter
                              ? 'bg-cyan-100 text-cyan-800 border-cyan-200 border shadow-sm'
                              : 'bg-white text-slate-600 border-slate-200 border hover:bg-slate-50 hover:border-cyan-300'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Photo Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredPhotos.map((photo: any) => (
                      <div key={photo.ID_foto} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_10px_40px_-15px_rgba(6,182,212,0.4)] transition-all duration-500 border border-slate-100 hover:border-cyan-500/30 flex flex-col cursor-pointer transform hover:-translate-y-1" onClick={() => openDetail(photo, 'foto')}>
                        <div className="relative aspect-square overflow-hidden bg-slate-100">
                          <Image
                            src={photo.URL_image || 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80'}
                            alt={photo.Judul}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Floating Badge */}
                          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-cyan-900 shadow-sm border border-cyan-100">
                            {photo.kategori_nama}
                          </div>
                          
                          {/* Hover Info Panel */}
                          <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-cyan-950 via-cyan-950/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col justify-end h-3/4 sm:h-1/2 opacity-0 group-hover:opacity-100 z-10">
                            <p className="text-cyan-50 text-xs sm:text-sm line-clamp-2 mb-2 font-medium drop-shadow-md">
                              {(() => {
                                try { const d = JSON.parse(photo.value).deskripsi; return d ? d : 'Lihat dokumentasi lengkap kegiatan ini.'; }
                                catch(e) { return 'Lihat dokumentasi lengkap kegiatan ini.'; }
                              })()}
                            </p>
                            <div className="text-cyan-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                              <Maximize2 className="w-3 h-3" /> Buka Galeri
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-5 flex flex-col flex-grow bg-white">
                          <h3 className="font-bold text-slate-800 text-lg leading-snug mb-4 group-hover:text-cyan-700 transition-colors line-clamp-2">
                            {photo.Judul}
                          </h3>
                          <div className="mt-auto flex items-center text-xs text-slate-500 font-medium">
                            <Calendar className="w-4 h-4 mr-2 text-cyan-500" />
                            {photo.tanggal ? photo.tanggal.split('T')[0] : '-'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {filteredPhotos.length === 0 && (
                    <div className="text-center py-16">
                       <Droplets className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                       <p className="text-slate-500 font-medium">Belum ada foto kegiatan di kategori ini.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: GALERI VIDEO */}
              {activeTab === 'video' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="mb-10">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Sinema & Dokumenter</h2>
                    <p className="text-slate-500">Saksikan ragam video edukasi, profil, dan liputan kegiatan kelautan.</p>
                  </div>

                  {/* Video Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videoData.map((video: any) => (
                      <div key={video.ID_video} className="group cursor-pointer" onClick={() => openDetail(video, 'video')}>
                        <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-[0_15px_40px_-10px_rgba(6,182,212,0.5)] transition-all duration-500 bg-slate-900 border border-transparent group-hover:border-cyan-500/40">
                          <Image
                            src={video.URL_thumbnail || 'https://images.unsplash.com/photo-1682687220199-d0124f48f95b?w=800&q=80'}
                            alt={video.Judul}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-out"
                          />
                          
                          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl group-hover:bg-cyan-600 group-hover:border-cyan-400 group-hover:scale-110 transition-all duration-300 ease-out group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]">
                              <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1" fill="currentColor" />
                            </div>
                          </div>

                          {/* Hover Info Panel */}
                          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col justify-end h-3/4 sm:h-1/2 opacity-0 group-hover:opacity-100 z-20">
                            <p className="text-white text-xs sm:text-sm line-clamp-2 mb-1.5 font-medium drop-shadow-md">
                              {(() => {
                                try { const d = JSON.parse(video.value).deskripsi; return d ? d : 'Klik untuk memutar video dokumenter.'; }
                                catch(e) { return 'Klik untuk memutar video dokumenter.'; }
                              })()}
                            </p>
                            <span className="text-cyan-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                              <Play className="w-3 h-3 inline mr-1" fill="currentColor"/> {video.durasi_video || '00:00'}
                            </span>
                          </div>

                          <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-cyan-100 text-xs font-mono px-2.5 py-1 rounded-md border border-slate-700 group-hover:opacity-0 transition-opacity duration-300 z-10">
                            {video.durasi_video || '00:00'}
                          </div>
                          
                          <div className="absolute top-3 left-3">
                            <span className="bg-cyan-900/80 backdrop-blur-sm text-cyan-100 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                              {video.kategori_nama}
                            </span>
                          </div>
                        </div>
                        
                        <h3 className="font-bold text-slate-800 text-lg leading-snug group-hover:text-cyan-700 transition-colors">
                          {video.Judul}
                        </h3>
                        <div className="mt-2 flex items-center text-xs text-slate-500 font-medium">
                          <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                          {video.tanggal ? video.tanggal.split('T')[0] : '-'}
                        </div>
                      </div>
                    ))}
                  </div>
                  {videoData.length === 0 && (
                    <div className="text-center py-16">
                       <Droplets className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                       <p className="text-slate-500 font-medium">Belum ada video.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: INFOGRAFIS */}
              {activeTab === 'infografis' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-800 mb-2">Pusat Data Visual</h2>
                      <p className="text-slate-500">Informasi layanan publik, visualisasi data, dan statistik perikanan.</p>
                    </div>
                  </div>

                  {/* Infografis Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {infografisData.map((info: any) => {
                      let desc = '';
                      try {
                         const val = JSON.parse(info.value);
                         desc = val.deskripsi || '';
                      } catch(e) {}
                      return (
                      <div key={info.ID_infografis} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col hover:shadow-[0_20px_50px_-12px_rgba(6,182,212,0.25)] hover:border-cyan-300 transition-all duration-500 transform hover:-translate-y-2">
                        {/* Thumbnail */}
                        <div className="relative h-56 bg-slate-100 overflow-hidden group">
                          <Image
                            src={info.URL_thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'}
                            alt={info.Judul}
                            fill
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-80" />
                          
                          {/* Badge */}
                          <div className="absolute bottom-4 left-4">
                            <span className="bg-cyan-600 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                              {info.kategori_nama}
                            </span>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="font-bold text-xl text-slate-800 mb-3 leading-tight group-hover:text-cyan-700 transition-colors">
                            {info.Judul}
                          </h3>
                          <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">
                            {desc}
                          </p>
                          
                          {/* Buttons */}
                          <div className="flex gap-3 mt-auto pt-5 border-t border-slate-100">
                            <a href={info.URL_thumbnail || '#'} target="_blank" className="flex-1 bg-slate-50 hover:bg-cyan-50 text-cyan-800 border border-cyan-200 text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center">
                              Lihat Visual
                            </a>
                            {info.URL_dokumen && (
                            <a href={info.URL_dokumen} target="_blank" className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center group">
                              <Download className="w-4 h-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
                              Unduh PDF
                            </a>
                            )}
                          </div>
                        </div>
                      </div>
                    )})}
                  </div>
                  {infografisData.length === 0 && (
                    <div className="text-center py-16">
                       <Droplets className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                       <p className="text-slate-500 font-medium">Belum ada data infografis.</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* MODAL DETAIL (FOTO & VIDEO) - Oceanic Glassmorphism */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[#001e36]/90 backdrop-blur-md" onClick={closeDetail}></div>
          <button 
            onClick={closeDetail} 
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/10 hover:bg-cyan-500/20 rounded-full text-white transition-colors z-[110] border border-white/10"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl shadow-cyan-900/50 z-[105] animate-in zoom-in-95 duration-300">
            {itemType === 'video' && isPlaying ? (
              /* Player Mode */
              <div className="aspect-video w-full bg-black rounded-3xl overflow-hidden border border-slate-800">
                {(selectedItem.URL_video || '').includes('youtube.com') || (selectedItem.URL_video || '').includes('youtu.be') ? (
                  <iframe 
                    className="w-full h-full" 
                    src={(selectedItem.URL_video || '').replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video className="w-full h-full" controls autoPlay>
                    <source src={selectedItem.URL_video} type="video/mp4" />
                    Maaf, browser Anda tidak mendukung pemutar video.
                  </video>
                )}
              </div>
            ) : (
              /* Card Detail Mode */
              <div className="flex flex-col">
                <div className="relative w-full h-[40vh] sm:h-[55vh] bg-slate-900 overflow-hidden rounded-t-3xl">
                  {/* Backdrop blur for image letterboxing */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-30 blur-xl"
                    style={{ backgroundImage: `url(${selectedItem.URL_image || selectedItem.URL_thumbnail})` }}
                  />
                  <Image
                    src={selectedItem.URL_image || selectedItem.URL_thumbnail || 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80'}
                    alt={selectedItem.Judul}
                    fill
                    className="object-contain relative z-10"
                  />
                  {itemType === 'video' && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-cyan-950/20">
                       <button onClick={() => setIsPlaying(true)} className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/30 hover:bg-cyan-600 hover:border-cyan-400 text-white flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-110 group">
                         <Play className="w-10 h-10 md:w-12 md:h-12 ml-2" fill="currentColor" />
                       </button>
                    </div>
                  )}
                  
                  {/* Gradient Overlay for Title readability if needed */}
                  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900/50 to-transparent z-10" />
                </div>
                
                <div className="p-6 md:p-10 bg-white">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="bg-cyan-50 text-cyan-700 border border-cyan-100 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">{selectedItem.kategori_nama}</span>
                    <div className="flex items-center text-sm text-slate-500 font-medium">
                      <Calendar className="w-4 h-4 mr-1.5 text-cyan-500" />
                      {selectedItem.tanggal ? selectedItem.tanggal.split('T')[0] : '-'}
                    </div>
                  </div>
                  
                  <h2 className="text-2xl md:text-4xl font-extrabold text-slate-800 mb-6 tracking-tight leading-tight">{selectedItem.Judul}</h2>
                  
                  {(() => {
                    let desc = '';
                    let subPhotos = [];
                    try {
                      const val = JSON.parse(selectedItem.value);
                      desc = val.deskripsi || '';
                      subPhotos = val.sub_photos || [];
                    } catch(e) {}
                    
                    return (
                      <>
                        <div className="prose prose-cyan max-w-none text-slate-600 mb-8 whitespace-pre-wrap leading-relaxed md:text-lg">
                          {desc ? desc : <span className="italic text-slate-400 font-light">Tidak ada deskripsi tersedia untuk konten ini.</span>}
                        </div>

                        {itemType === 'video' && (
                          <div className="pt-6 border-t border-slate-100 flex justify-start">
                            <button onClick={() => setIsPlaying(true)} className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-2xl font-bold transition-all shadow-[0_10px_30px_-10px_rgba(6,182,212,0.6)] flex items-center justify-center gap-3 transform hover:-translate-y-1">
                              <Play className="w-6 h-6" fill="currentColor" />
                              <span className="text-lg">Putar Video Utama</span>
                            </button>
                          </div>
                        )}
                        
                        {itemType === 'foto' && subPhotos.length > 0 && (
                          <div className="mt-10 pt-8 border-t border-slate-100">
                            <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-lg">
                              <Info className="w-5 h-5 text-cyan-600" />
                              Galeri Foto Terkait
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                              {subPhotos.map((url: string, idx: number) => (
                                <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="relative aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all group block bg-slate-100">
                                  <Image src={url} alt={`Sub foto ${idx+1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
                                  <div className="absolute inset-0 bg-cyan-900/0 group-hover:bg-cyan-900/20 transition-colors duration-300" />
                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                     <Maximize2 className="w-6 h-6 text-white drop-shadow-md" />
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function GaleriTerpaduPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f8fafc]"><div className="w-12 h-12 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin"></div></div>}>
      <GaleriContent />
    </Suspense>
  );
}
