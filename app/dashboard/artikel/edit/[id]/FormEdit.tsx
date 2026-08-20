'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, Image as ImageIcon, X, Tag, Camera, ImagePlus, Type, AlignLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const KATEGORI_OPTIONS = ['Umum', 'Kelautan', 'Perikanan', 'Konservasi', 'Pemberdayaan'];

export default function FormEdit({ initialData }: { initialData: any }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isInstagram = !!initialData.instagram_url;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [judul, setJudul] = useState(initialData.Judul || '');
  const [status, setStatus] = useState(initialData.status || 'draft');
  const [kategori, setKategori] = useState(initialData.kategori || 'Umum');
  const [isiArtikel, setIsiArtikel] = useState(initialData.isi_artikel || '');
  const [instagramUrl, setInstagramUrl] = useState(initialData.instagram_url || '');
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData.image || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) setImagePreview(e.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('id', String(initialData.ID_artikel));
      formData.append('judul', judul);
      formData.append('status', status);
      formData.append('kategori', kategori);
      formData.append('isi_artikel', isInstagram ? 'Konten Instagram' : isiArtikel);
      
      if (isInstagram) {
        formData.append('instagramUrl', instagramUrl);
      }
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await fetch('/api/artikel', { method: 'PUT', body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Terjadi kesalahan saat mengupdate artikel');

      router.push('/dashboard/artikel');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 relative">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="flex items-start gap-5">
          <Link 
            href="/dashboard/artikel"
            className="mt-1 p-2.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-2xl backdrop-blur-md transition-all border border-white/5 hover:border-white/20 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
                Edit Artikel
              </h1>
              {isInstagram && (
                <span className="px-3 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-full text-pink-300 text-xs font-bold tracking-wide uppercase">
                  Via Instagram
                </span>
              )}
            </div>
            <p className="text-slate-400 text-sm md:text-base max-w-lg leading-relaxed">
              Sesuaikan informasi, ubah kategori, atau perbarui draf sebelum dipublikasikan ke halaman utama.
            </p>
          </div>
        </div>
      </div>

      {/* FORM CONTAINER (GLASSMORPHISM) */}
      <div className="bg-[#0A1118]/60 backdrop-blur-2xl border border-white/5 rounded-[2rem] shadow-2xl overflow-hidden max-w-4xl relative z-10">
        
        {/* Decorative Top Glow */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        {error && (
          <div className="m-8 mb-0 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-400 text-sm font-medium animate-in slide-in-from-top-2">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-10">
          
          {isInstagram && (
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                <Camera className="w-4 h-4 text-pink-400" /> Tautan Instagram
              </label>
              <div className="relative group">
                <input 
                  type="url" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} required
                  placeholder="https://www.instagram.com/p/..."
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-pink-400 focus:bg-white/10 focus:ring-4 focus:ring-pink-400/10 transition-all font-medium"
                />
              </div>
            </div>
          )}

          {/* COVER IMAGE */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-cyan-400" /> 
                Sampul / Thumbnail {isInstagram && <span className="text-slate-500 font-normal">(Opsional)</span>}
              </label>
            </div>
            
            <div className="relative group">
              {!imagePreview ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-56 border-2 border-dashed border-white/10 bg-white/[0.02] hover:bg-cyan-500/[0.02] hover:border-cyan-400/40 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-cyan-500/10 transition-all duration-300 shadow-lg">
                    <ImagePlus className="w-8 h-8 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <p className="text-slate-300 font-semibold mb-1">Pilih Gambar Sampul</p>
                  <p className="text-sm text-slate-500">Klik atau seret gambar ke area ini</p>
                </div>
              ) : (
                <div className="relative w-full h-56 sm:h-72 rounded-[2rem] overflow-hidden group/image border border-white/10 shadow-2xl">
                  <Image src={imagePreview} alt="Preview" fill className="object-cover transition-transform duration-700 group-hover/image:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button type="button" onClick={clearImage}
                      className="p-3 bg-white/10 hover:bg-rose-500 text-white backdrop-blur-md rounded-full transition-all duration-300 hover:scale-110 shadow-2xl border border-white/20">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
            </div>
          </div>

          <hr className="border-white/5" />

          {/* JUDUL */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <Type className="w-4 h-4 text-cyan-400" /> Judul Artikel
            </label>
            <input 
              type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required
              placeholder="Masukkan judul yang menarik..."
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-lg font-medium placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10 transition-all"
            />
          </div>

          {/* KATEGORI & STATUS - MODERN PILLS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                <Tag className="w-4 h-4 text-cyan-400" /> Kategori
              </label>
              <div className="flex flex-wrap gap-2.5">
                {KATEGORI_OPTIONS.map((k) => (
                  <button
                    key={k} type="button" onClick={() => setKategori(k)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      kategori === k 
                      ? 'bg-cyan-500 text-[#030B14] shadow-[0_0_20px_rgba(34,211,238,0.3)]' 
                      : 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 hover:text-slate-200 hover:border-white/10'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                Status Publikasi
              </label>
              <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 w-fit">
                <button 
                  type="button" onClick={() => setStatus('published')} 
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                    status === 'published' 
                    ? 'bg-[#6FF3C8] text-[#030B14] shadow-[0_0_20px_rgba(111,243,200,0.3)]' 
                    : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Diterbitkan
                </button>
                <button 
                  type="button" onClick={() => setStatus('draft')} 
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                    status === 'draft' 
                    ? 'bg-slate-700 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Simpan Draf
                </button>
              </div>
            </div>
          </div>

          {!isInstagram && (
            <>
              <hr className="border-white/5" />
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                  <AlignLeft className="w-4 h-4 text-cyan-400" /> Isi Konten Artikel
                </label>
                <textarea 
                  rows={12} value={isiArtikel} onChange={(e) => setIsiArtikel(e.target.value)} required
                  placeholder="Tuliskan isi artikel Anda di sini..."
                  className="w-full px-5 py-5 bg-white/5 border border-white/10 rounded-[2rem] text-white text-base leading-relaxed placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10 transition-all resize-y"
                />
              </div>
            </>
          )}

          {/* FLOATING ACTION BUTTON */}
          <div className="pt-6 flex justify-end">
            <button 
              type="submit" disabled={loading}
              className={`
                group relative inline-flex items-center gap-3 overflow-hidden rounded-[1.5rem] p-[2px] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-transform hover:scale-[1.02] active:scale-95
              `}
            >
              <span className={`absolute inset-[-1000%] animate-[spin_2s_linear_infinite] ${isInstagram ? 'bg-[conic-gradient(from_90deg_at_50%_50%,#EC4899_0%,#A855F7_50%,#EC4899_100%)]' : 'bg-[conic-gradient(from_90deg_at_50%_50%,#22D3EE_0%,#6FF3C8_50%,#22D3EE_100%)]'}`} />
              <span className="inline-flex h-full w-full items-center justify-center rounded-[1.5rem] bg-[#0A1118] px-8 py-4 text-sm font-bold text-white backdrop-blur-3xl gap-2 transition-colors group-hover:bg-[#0A1118]/80">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
