'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, Image as ImageIcon, X, User, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const KATEGORI_OPTIONS = ['Umum', 'Kelautan', 'Perikanan', 'Konservasi', 'Pemberdayaan'];

const KATEGORI_COLORS: Record<string, string> = {
  Kelautan:     '#6FF3C8',
  Perikanan:    '#FFC14D',
  Konservasi:   '#64D287',
  Pemberdayaan: '#FF795A',
  Umum:         '#B4B4FF',
};

export default function CreateArticlePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [judul, setJudul] = useState('');
  const [status, setStatus] = useState('published');
  const [penulis, setPenulis] = useState('Reynard');
  const [kategori, setKategori] = useState('Umum');
  const [isiBerita, setIsiBerita] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const u = JSON.parse(storedUser);
        if (u.nama || u.username) {
          setPenulis(u.nama || u.username);
        }
      }
    } catch (e) {
      // fallback
    }
  }, []);

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
      formData.append('judul', judul);
      formData.append('status', status);
      formData.append('type', 'artikel');
      formData.append('penulis', penulis || 'Admin');
      formData.append('kategori', kategori);
      formData.append('isi_berita', isiBerita);
      if (imageFile) formData.append('image', imageFile);

      const res = await fetch('/api/news', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Terjadi kesalahan saat menyimpan artikel');

      router.push('/dashboard/articles');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard/articles"
          className="p-2 text-gray-400 hover:text-white bg-[#1a1a1a] hover:bg-white/10 rounded-xl transition-colors border border-white/5"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Buat Artikel Baru</h1>
          <p className="text-gray-400 mt-1">Tambahkan artikel atau opini perikanan-kelautan.</p>
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-xl overflow-hidden max-w-4xl">
        {error && (
          <div className="m-6 mb-0 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {/* Cover image */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Gambar Cover Artikel</label>
            {!imagePreview ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-48 border-2 border-dashed border-white/10 hover:border-[#6FF3C8]/30 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors bg-black/30"
              >
                <ImageIcon className="w-8 h-8 text-gray-500 mb-2" />
                <p className="text-sm text-gray-400">Klik untuk mengunggah gambar</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG atau WEBP (Maks 2MB)</p>
              </div>
            ) : (
              <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden group">
                <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button type="button" onClick={clearImage}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium">
                    <X className="w-4 h-4" />
                    Hapus Gambar
                  </button>
                </div>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
          </div>

          {/* Judul + Penulis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Judul Artikel</label>
              <input 
                type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6FF3C8] focus:ring-1 focus:ring-[#6FF3C8] transition-all text-sm"
                placeholder="Masukkan judul artikel"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#6FF3C8]" />
                Penulis / Pengunggah
              </label>
              <input 
                type="text" value={penulis} onChange={(e) => setPenulis(e.target.value)} required
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6FF3C8] focus:ring-1 focus:ring-[#6FF3C8] transition-all text-sm"
                placeholder="Nama Penulis / Username"
              />
            </div>
          </div>

          {/* Kategori + Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#6FF3C8]" />
                Kategori
              </label>
              <div className="relative">
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6FF3C8] focus:ring-1 focus:ring-[#6FF3C8] transition-all appearance-none text-sm pr-10"
                >
                  {KATEGORI_OPTIONS.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                  style={{ background: KATEGORI_COLORS[kategori] ?? '#fff' }}
                />
              </div>
              {/* Pills preview */}
              <div className="flex flex-wrap gap-2 pt-1">
                {KATEGORI_OPTIONS.map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setKategori(k)}
                    className="px-3 py-1 rounded-full text-xs font-semibold border transition-all"
                    style={{
                      background: kategori === k ? KATEGORI_COLORS[k] + '30' : 'transparent',
                      color: KATEGORI_COLORS[k],
                      borderColor: kategori === k ? KATEGORI_COLORS[k] + '80' : 'rgba(255,255,255,0.1)',
                      fontWeight: kategori === k ? 700 : 400,
                    }}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Status</label>
              <select 
                value={status} onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6FF3C8] focus:ring-1 focus:ring-[#6FF3C8] transition-all appearance-none text-sm"
              >
                <option value="published">Diterbitkan (Published)</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Isi Artikel */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Isi Artikel</label>
            <textarea 
              rows={10} value={isiBerita} onChange={(e) => setIsiBerita(e.target.value)} required
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6FF3C8] focus:ring-1 focus:ring-[#6FF3C8] transition-all resize-y leading-relaxed text-sm"
              placeholder="Tuliskan isi artikel di sini..."
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" disabled={loading}
              className="inline-flex items-center gap-2 bg-[#6FF3C8] text-black font-bold hover:bg-[#5ae6b9] px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#6FF3C8]/20 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {loading ? 'Menyimpan...' : 'Simpan Artikel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
