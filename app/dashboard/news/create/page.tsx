'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, Image as ImageIcon, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CreateNewsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [judul, setJudul] = useState('');
  const [status, setStatus] = useState('draft');
  const [isiBerita, setIsiBerita] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('judul', judul);
      formData.append('status', status);
      formData.append('isi_berita', isiBerita);
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await fetch('/api/news', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat menyimpan berita');
      }

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
          className="p-2 text-gray-400 hover:text-white bg-[#1a1a1a] hover:bg-white/10 rounded-xl transition-colors border border-white/5"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Buat Berita Baru</h1>
          <p className="text-gray-400 mt-1">Tambahkan informasi atau berita terkini.</p>
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-xl overflow-hidden max-w-4xl">
        {error && (
          <div className="m-6 mb-0 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Gambar Cover</label>
            
            {!imagePreview ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-48 border-2 border-dashed border-white/10 hover:border-white/20 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors bg-black/30"
              >
                <ImageIcon className="w-8 h-8 text-gray-500 mb-2" />
                <p className="text-sm text-gray-400">Klik untuk mengunggah gambar</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG atau WEBP (Maks 2MB)</p>
              </div>
            ) : (
              <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden group">
                <Image 
                  src={imagePreview} 
                  alt="Preview" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={clearImage}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                  >
                    <X className="w-4 h-4" />
                    Hapus Gambar
                  </button>
                </div>
              </div>
            )}
            
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Judul Berita</label>
            <input 
              type="text" 
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="Masukkan judul berita"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Status</label>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none"
            >
              <option value="draft">Draft</option>
              <option value="published">Diterbitkan</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Isi Berita</label>
            <textarea 
              rows={12}
              value={isiBerita}
              onChange={(e) => setIsiBerita(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-y leading-relaxed"
              placeholder="Tuliskan isi berita di sini..."
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
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
