'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, FileText, CheckCircle2, Clock, Upload, X, Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminMateriPage() {
  const [materiList, setMateriList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    kategori: 'Regulasi & Hukum',
    status: 'published'
  });
  const [file, setFile] = useState<File | null>(null);

  const fetchMateri = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/materi');
      const data = await res.json();
      setMateriList(data);
    } catch (error) {
      console.error('Failed to fetch materi:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMateri();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('File wajib diunggah');
      return;
    }
    
    setIsSubmitting(true);
    const form = new FormData();
    form.append('judul', formData.judul);
    form.append('deskripsi', formData.deskripsi);
    form.append('kategori', formData.kategori);
    form.append('status', formData.status);
    form.append('is_verified', 'true');
    form.append('file', file);

    try {
      const res = await fetch('/api/materi', {
        method: 'POST',
        body: form,
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ judul: '', deskripsi: '', kategori: 'Regulasi & Hukum', status: 'published' });
        setFile(null);
        fetchMateri(); // Refresh data
      } else {
        alert('Gagal mengunggah materi');
      }
    } catch (error) {
      console.error('Error submitting:', error);
      alert('Terjadi kesalahan saat mengunggah');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus materi ini?')) return;
    
    try {
      const res = await fetch(`/api/materi/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchMateri();
      } else {
        alert('Gagal menghapus materi');
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Manajemen Materi</h1>
          <p className="text-slate-400 mt-1">Kelola dokumen publik, regulasi, dan laporan edukasi.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-5 h-5" />
          Unggah Materi
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Cari materi..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm placeholder:text-slate-500"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/50 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Informasi Dokumen</th>
                <th className="px-6 py-4 font-medium">Kategori</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Tanggal</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <Loader2 className="w-8 h-8 mx-auto animate-spin mb-3 text-cyan-500" />
                    <p>Memuat data...</p>
                  </td>
                </tr>
              ) : materiList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="w-12 h-12 mb-3 opacity-20" />
                      <p>Belum ada data materi yang ditambahkan.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                materiList.map((item) => (
                  <tr key={item.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{item.judul}</div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <span className="uppercase font-semibold text-cyan-500">{item.file_type}</span>
                        <span>•</span>
                        <span>{item.file_size}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {item.status === 'published' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Terbit
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <Clock className="w-3.5 h-3.5" />
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {new Date(item.tanggal).toLocaleDateString('id-ID', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a 
                          href={item.file_url} 
                          target="_blank"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
                        >
                          Lihat
                        </a>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="text-rose-400 hover:text-rose-300 transition-colors text-sm font-medium p-1"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <h2 className="text-xl font-semibold text-white">Unggah Materi Baru</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Judul Dokumen</label>
                <input 
                  required
                  type="text" 
                  value={formData.judul}
                  onChange={(e) => setFormData({...formData, judul: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Masukkan judul dokumen"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Kategori</label>
                <select 
                  value={formData.kategori}
                  onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="Regulasi & Hukum">Regulasi & Hukum</option>
                  <option value="Laporan Tahunan">Laporan Tahunan</option>
                  <option value="Panduan Teknis">Panduan Teknis</option>
                  <option value="Materi Sosialisasi">Materi Sosialisasi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Deskripsi Singkat</label>
                <textarea 
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors min-h-[100px] resize-none"
                  placeholder="Tulis deskripsi singkat tentang dokumen ini..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">File Dokumen</label>
                <div className="relative border-2 border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center hover:border-cyan-500/50 hover:bg-slate-800/50 transition-colors cursor-pointer group">
                  <input 
                    required
                    type="file" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                  />
                  <Upload className="w-8 h-8 text-slate-500 mb-2 group-hover:text-cyan-500 transition-colors" />
                  <p className="text-sm text-slate-300 font-medium text-center">
                    {file ? file.name : 'Klik atau seret file ke sini'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">PDF, DOC, PPT (Max. 10MB)</p>
                </div>
              </div>

              <div className="pt-4 flex gap-3 justify-end">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Mengunggah...</>
                  ) : (
                    <><CheckCircle2 className="w-4 h-4" /> Simpan</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
