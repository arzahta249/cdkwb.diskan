"use client";

import React, { useState, use, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, UploadCloud, Search, FileDown, Image as ImageIcon, Waves } from 'lucide-react';
import { notFound } from 'next/navigation';

const TABS = ['foto', 'video', 'infografis'];

type PageProps = {
  params: Promise<{ type: string }>
}

export default function GaleriCMSPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const type = resolvedParams.type;

  if (!TABS.includes(type)) {
    notFound();
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form State controlled UI toggles
  const [formData, setFormData] = useState({
    judul: '',
    kategori: '',
    tanggal: '',
    deskripsi: '',
    videoSourceType: 'youtube',
    videoUrl: ''
  });
  
  const titleMap = {
    foto: 'Kelola Galeri Foto',
    video: 'Kelola Galeri Video',
    infografis: 'Kelola Infografis & Data'
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/galeri/${type}`);
      const json = await res.json();
      if (json.data) setData(json.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  const handleDelete = async (id: number) => {
    if(confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        const res = await fetch(`/api/galeri/${type}?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          setData(data.filter(item => (item.ID_foto || item.ID_video || item.ID_infografis) !== id));
        }
      } catch (error) {
        alert("Gagal menghapus data.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const formElement = e.currentTarget;
      const submitData = new FormData(formElement);
      submitData.set('videoSourceType', formData.videoSourceType);
      
      const subPhotos = submitData.getAll('sub_photos');
      if (subPhotos.length > 5) {
        alert("Maksimal 5 sub-foto yang diperbolehkan!");
        setIsSaving(false);
        return;
      }
      
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `/api/galeri/${type}?id=${editId}` : `/api/galeri/${type}`;
      
      const res = await fetch(url, {
        method,
        body: submitData, 
      });
      
      if (res.ok) {
        alert(editId ? "Sukses! Perubahan data berhasil disimpan." : "Sukses! Data baru berhasil ditambahkan.");
        fetchData(); 
        setIsModalOpen(false);
        setEditId(null);
      } else {
        const err = await res.json();
        alert("Gagal menyimpan data: " + (err.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Terjadi kesalahan sistem saat menyimpan data.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenModal = () => {
    setEditId(null);
    setFormData({ judul: '', kategori: '', tanggal: '', deskripsi: '', videoSourceType: 'youtube', videoUrl: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    const id = item.ID_foto || item.ID_video || item.ID_infografis;
    setEditId(id);
    
    let desc = '';
    try {
       const val = JSON.parse(item.value);
       desc = val.deskripsi || '';
    } catch(e) {}

    setFormData({
      judul: item.Judul,
      kategori: item.kategori_nama || '',
      tanggal: item.tanggal ? item.tanggal.split('T')[0] : '', 
      deskripsi: desc,
      videoSourceType: 'youtube', 
      videoUrl: item.URL_video || ''
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 bg-[#0B132B]/50 p-6 rounded-2xl border border-cyan-900/30 shadow-lg shadow-cyan-900/10 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute -right-10 -top-10 text-cyan-900/20 rotate-12 pointer-events-none">
          <Waves className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 tracking-tight">
            {titleMap[type as keyof typeof titleMap]}
          </h1>
          <p className="text-cyan-100/60 text-sm mt-1.5 font-medium">Sistem Informasi Manajemen Kelautan & Perikanan</p>
        </div>
        <button 
          onClick={handleOpenModal}
          className="relative z-10 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Tambah Data
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-[#0B132B] border border-cyan-900/40 rounded-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(6,182,212,0.1)]">
        <div className="p-5 border-b border-cyan-900/40 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900/50">
          <div className="relative w-full sm:w-72">
            <input 
              type="text" 
              placeholder="Cari berdasarkan judul..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B132B]/80 border border-cyan-900/50 rounded-xl pl-11 pr-4 py-2.5 text-sm text-cyan-50 placeholder-cyan-900/80 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner shadow-black/50"
            />
            <Search className="w-5 h-5 text-cyan-700 absolute left-3.5 top-2.5" />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
             <button className="flex-1 sm:flex-none px-5 py-2.5 bg-cyan-950/30 hover:bg-cyan-900/50 border border-cyan-900/50 rounded-xl text-sm text-cyan-200 font-medium transition-colors flex items-center gap-2 justify-center">
               Filter Kategori
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#060d1f] text-cyan-600/80 font-bold border-b border-cyan-900/40 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-5 whitespace-nowrap">ID Ref</th>
                <th className="px-6 py-5">Judul Konten</th>
                <th className="px-6 py-5">Kategori</th>
                <th className="px-6 py-5">Tanggal</th>
                <th className="px-6 py-5 whitespace-nowrap">Status</th>
                <th className="px-6 py-5 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-900/20 text-cyan-100/80">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-8 h-8 border-2 border-cyan-900 border-t-cyan-400 rounded-full animate-spin"></div>
                      <span className="text-cyan-600 font-medium">Sinkronisasi data kelautan...</span>
                    </div>
                  </td>
                </tr>
              ) : data.filter(item => (item.Judul || '').toLowerCase().includes(searchQuery.toLowerCase())).map((row, idx) => {
                const rowId = row.ID_foto || row.ID_video || row.ID_infografis;
                return (
                <tr key={rowId} className="hover:bg-cyan-950/30 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-cyan-800 font-mono text-xs">#{rowId.toString().padStart(4, '0')}</td>
                  <td className="px-6 py-4 font-semibold text-cyan-50">{row.Judul}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-[10px] font-bold uppercase tracking-wider border border-cyan-800/50">
                      {row.kategori_nama || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-cyan-100/60 font-medium">{row.tanggal ? row.tanggal.split('T')[0] : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${row.status === 'Aktif' || !row.status ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50' : 'bg-slate-800/50 text-slate-400 border-slate-700/50'}`}>
                      {row.status || 'Aktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <button 
                      onClick={() => handleEdit(row)}
                      className="p-2 text-cyan-700 hover:text-cyan-300 hover:bg-cyan-900/50 rounded-lg transition-colors border border-transparent hover:border-cyan-800" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(rowId)}
                      className="p-2 text-rose-900 hover:text-rose-400 hover:bg-rose-950/50 rounded-lg transition-colors border border-transparent hover:border-rose-900/50" title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )})}
              {!isLoading && data.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-cyan-800 font-medium">
                    Belum ada armada data yang merapat.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Upload - Glassmorphism Naval Theme */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="relative bg-[#0B132B]/95 border border-cyan-800/40 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col animate-in fade-in zoom-in-95 duration-200 backdrop-blur-xl">
            
            <div className="flex items-center justify-between p-6 border-b border-cyan-900/40 sticky top-0 bg-[#0B132B]/90 backdrop-blur-md z-10">
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                {editId ? `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}` : `Tambah ${type.charAt(0).toUpperCase() + type.slice(1)} Baru`}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-cyan-600 hover:text-cyan-300 hover:bg-cyan-900/50 rounded-xl transition-colors border border-transparent hover:border-cyan-800/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form id="add-form" className="p-6 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-cyan-100 mb-2">Judul Konten <span className="text-cyan-500">*</span></label>
                  <input 
                    type="text" 
                    name="judul"
                    required 
                    value={formData.judul}
                    onChange={(e) => setFormData({...formData, judul: e.target.value})}
                    placeholder="Contoh: Patroli Gabungan Laut Jawa" 
                    className="w-full bg-[#020617]/50 border border-cyan-900/50 rounded-xl px-4 py-3 text-cyan-50 placeholder-cyan-900 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-inner shadow-black/50" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-cyan-100 mb-2">Kategori <span className="text-cyan-500">*</span></label>
                    <select 
                      name="kategori"
                      required 
                      value={formData.kategori}
                      onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                      className="w-full bg-[#020617]/50 border border-cyan-900/50 rounded-xl px-4 py-3 text-cyan-50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all appearance-none cursor-pointer shadow-inner shadow-black/50"
                    >
                      <option value="" disabled>-- Pilih Klasifikasi --</option>
                      <option value="Konservasi">Konservasi</option>
                      <option value="Pengawasan">Pengawasan</option>
                      <option value="Operasional">Operasional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-cyan-100 mb-2">Tanggal Pelaksanaan <span className="text-cyan-500">*</span></label>
                    <input 
                      type="date" 
                      name="tanggal"
                      required 
                      value={formData.tanggal}
                      onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
                      className="w-full bg-[#020617]/50 border border-cyan-900/50 rounded-xl px-4 py-3 text-cyan-50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all [color-scheme:dark] shadow-inner shadow-black/50" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-100 mb-2">Deskripsi / Laporan <span className="text-cyan-500">*</span></label>
                  <textarea 
                    name="deskripsi" 
                    rows={4} 
                    required 
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                    placeholder="Masukkan uraian lengkap mengenai data ini..." 
                    className="w-full bg-[#020617]/50 border border-cyan-900/50 rounded-xl px-4 py-3 text-cyan-50 placeholder-cyan-900 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none shadow-inner shadow-black/50 leading-relaxed"
                  ></textarea>
                </div>
              </div>

              {type === 'foto' && (
                <div className="space-y-5 pt-3 border-t border-cyan-900/30">
                  <div>
                    <label className="block text-sm font-semibold text-cyan-100 mb-2">Gambar Utama <span className="text-cyan-500">*</span></label>
                    <div className="border-2 border-dashed border-cyan-900/50 hover:border-cyan-400/50 rounded-xl p-5 bg-[#020617]/30 transition-colors flex items-center justify-center group">
                      <input type="file" name="image" accept="image/*" className="w-full text-sm text-cyan-600/50 file:mr-4 file:py-2 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-cyan-950 file:text-cyan-400 hover:file:bg-cyan-900 hover:file:text-cyan-300 transition-colors cursor-pointer" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-cyan-100 mb-2 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-cyan-400" />
                      Sub-Foto Detail (Batas 5 File)
                    </label>
                    <div className="border-2 border-dashed border-cyan-900/50 hover:border-cyan-400/50 rounded-xl p-5 bg-[#020617]/30 transition-colors group">
                      <input type="file" name="sub_photos" accept="image/*" multiple className="w-full text-sm text-cyan-600/50 file:mr-4 file:py-2 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-cyan-950 file:text-cyan-400 hover:file:bg-cyan-900 hover:file:text-cyan-300 transition-colors cursor-pointer" />
                      <p className="text-xs text-cyan-800 mt-3 text-center font-medium">PNG atau JPG. Multi-select diperbolehkan.</p>
                    </div>
                  </div>
                </div>
              )}

              {type === 'video' && (
                <div className="space-y-5 pt-3 border-t border-cyan-900/30">
                  <div>
                    <label className="block text-sm font-semibold text-cyan-100 mb-2">Durasi (MM:SS) <span className="text-cyan-500">*</span></label>
                    <input type="text" name="durasi" required placeholder="04:15" className="w-full bg-[#020617]/50 border border-cyan-900/50 rounded-xl px-4 py-3 text-cyan-50 placeholder-cyan-900 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-inner shadow-black/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-cyan-100 mb-2">Thumbnail Video <span className="text-cyan-500">*</span></label>
                    <div className="border-2 border-dashed border-cyan-900/50 hover:border-cyan-400/50 rounded-xl p-5 bg-[#020617]/30 transition-colors group">
                      <input type="file" name="thumbnail" accept="image/*" className="w-full text-sm text-cyan-600/50 file:mr-4 file:py-2 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-cyan-950 file:text-cyan-400 hover:file:bg-cyan-900 hover:file:text-cyan-300 transition-colors cursor-pointer" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-cyan-100 mb-3">Sumber Arus Data (Video Source) <span className="text-cyan-500">*</span></label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                      {['youtube', 'tiktok', 'instagram', 'upload'].map((srcType) => (
                        <button
                          key={srcType}
                          type="button"
                          onClick={() => setFormData({...formData, videoSourceType: srcType})}
                          className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
                            formData.videoSourceType === srcType
                              ? 'bg-cyan-600 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                              : 'bg-[#020617] border-cyan-900/50 text-cyan-800 hover:bg-cyan-950 hover:text-cyan-300 hover:border-cyan-700'
                          }`}
                        >
                          {srcType === 'upload' ? 'Local MP4' : srcType}
                        </button>
                      ))}
                    </div>

                    {formData.videoSourceType !== 'upload' ? (
                      <input 
                        type="url" 
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                        placeholder={`https://www.${formData.videoSourceType}.com/...`} 
                        className="w-full bg-[#020617]/50 border border-cyan-900/50 rounded-xl px-4 py-3 text-cyan-50 placeholder-cyan-900 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-inner shadow-black/50" 
                      />
                    ) : (
                      <div className="border border-cyan-900/50 rounded-xl bg-[#020617]/50 p-5 shadow-inner shadow-black/50">
                        <input type="file" name="videoFile" accept="video/mp4,video/webm" className="w-full text-sm text-cyan-600/50 file:mr-4 file:py-2 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-cyan-950 file:text-cyan-400 hover:file:bg-cyan-900 hover:file:text-cyan-300 transition-colors cursor-pointer outline-none" />
                        <p className="text-xs text-cyan-800 mt-3 font-medium">MP4/WebM Maks. 50MB.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {type === 'infografis' && (
                <div className="space-y-5 pt-3 border-t border-cyan-900/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-cyan-100 mb-2">Thumbnail Preview <span className="text-cyan-500">*</span></label>
                      <div className="border-2 border-dashed border-cyan-900/50 hover:border-cyan-400/50 rounded-xl p-4 bg-[#020617]/30 transition-colors h-32 flex items-center justify-center">
                        <input type="file" name="thumbnail" accept="image/*" className="w-full text-xs text-cyan-600/50 file:mr-3 file:py-1.5 file:px-4 file:rounded-xl file:border-0 file:font-bold file:bg-cyan-950 file:text-cyan-400 hover:file:bg-cyan-900 hover:file:text-cyan-300 transition-colors cursor-pointer" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-cyan-100 mb-2">File Dokumen PDF <span className="text-cyan-500">*</span></label>
                      <div className="border-2 border-dashed border-rose-900/50 hover:border-rose-400/50 rounded-xl p-4 bg-[#020617]/30 transition-colors h-32 flex items-center justify-center">
                         <input type="file" name="pdf" accept=".pdf" className="w-full text-xs text-rose-900/50 file:mr-3 file:py-1.5 file:px-4 file:rounded-xl file:border-0 file:font-bold file:bg-rose-950 file:text-rose-400 hover:file:bg-rose-900 hover:file:text-rose-300 transition-colors cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </form>

            <div className="p-6 border-t border-cyan-900/40 bg-[#0B132B]/90 backdrop-blur-md sticky bottom-0 flex justify-end gap-3 z-10">
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 rounded-xl font-bold text-cyan-600 hover:bg-cyan-950/50 hover:text-cyan-300 transition-colors"
                disabled={isSaving}
              >
                Batalkan
              </button>
              <button 
                type="submit"
                form="add-form"
                disabled={isSaving}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center justify-center"
              >
                {isSaving ? 'Menyinkronkan Data...' : (editId ? 'Simpan Perubahan' : 'Luncurkan Data')}
              </button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}
