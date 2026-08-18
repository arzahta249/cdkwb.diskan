'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, User, Tag, Camera, ImagePlus } from 'lucide-react';
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

export default function CreateNewsInstagramPage() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [judul, setJudul] = useState('');
  const [status, setStatus] = useState('published');
  const [penulis, setPenulis] = useState('Reynard');
  const [kategori, setKategori] = useState('Umum');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('judul', judul);
      formData.append('status', status);
      formData.append('type', 'berita');
      formData.append('penulis', penulis || 'Admin');
      formData.append('kategori', kategori);
      formData.append('instagramUrl', instagramUrl);
      if (imageFile) {
        formData.append('image', imageFile);
      }
      // Dummy isi berita agar tidak di tolak API (bisa disesuaikan di API)
      formData.append('isi_berita', 'Konten Instagram'); 

      const res = await fetch('/api/news', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Terjadi kesalahan saat menyimpan berita');

      router.push('/dashboard/news');
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
          href="/dashboard/news"
          className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors border border-slate-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            Upload via Instagram
          </h1>
          <p className="text-slate-400 mt-1">Tambahkan berita langsung dari postingan Instagram.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden max-w-4xl">
        {error && (
          <div className="m-6 mb-0 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-pink-500/20 mb-6">
            <div className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
              <p className="text-sm text-pink-100/80 leading-relaxed">
                Anda hanya perlu memasukkan link Instagram. Judul di bawah ini digunakan untuk penamaan di tabel dashboard. Konten foto dan teks aslinya akan otomatis ditarik saat berita dibaca oleh pengunjung.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Link URL Instagram <span className="text-pink-400">*</span></label>
            <input 
              type="url" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} required
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all text-sm placeholder:text-slate-500"
              placeholder="Contoh: https://www.instagram.com/p/XYZ123/"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Gambar Thumbnail (Opsional)</label>
            <div className="relative border-2 border-dashed border-slate-700 rounded-xl p-6 bg-slate-950 flex flex-col items-center justify-center text-center hover:border-cyan-500/50 hover:bg-slate-900 transition-colors">
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {imagePreview ? (
                <div className="relative w-full max-w-sm h-48 rounded-lg overflow-hidden">
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-medium">Klik untuk mengubah gambar</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-3">
                    <ImagePlus className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-slate-300 text-sm font-medium mb-1">Unggah gambar pratinjau</p>
                  <p className="text-slate-500 text-xs">Abaikan jika ingin menggunakan gambar bawaan. Disarankan format JPG/PNG.</p>
                </>
              )}
            </div>
          </div>

          {/* Judul + Penulis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Judul Berita (Untuk di Daftar)</label>
              <input 
                type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm placeholder:text-slate-500"
                placeholder="Contoh: Dokumentasi Kegiatan Rapat..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
                <User className="w-4 h-4 text-cyan-400" />
                Penulis / Pengunggah
              </label>
              <input 
                type="text" value={penulis} onChange={(e) => setPenulis(e.target.value)} required
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm placeholder:text-slate-500"
                placeholder="Nama Penulis / Username"
              />
            </div>
          </div>

          {/* Kategori + Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-cyan-400" />
                Kategori
              </label>
              <div className="relative">
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all appearance-none text-sm pr-10"
                >
                  {KATEGORI_OPTIONS.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
                {/* Color dot preview */}
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                  style={{ background: KATEGORI_COLORS[kategori] ?? '#fff' }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Status</label>
              <select 
                value={status} onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all appearance-none text-sm"
              >
                <option value="published">Diterbitkan (Published)</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" disabled={loading}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-pink-500/20 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {loading ? 'Menyimpan...' : 'Simpan Berita'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
