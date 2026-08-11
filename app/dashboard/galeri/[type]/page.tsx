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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {titleMap[type as keyof typeof titleMap]}
          </h1>
          <p className="text-slate-400 text-sm mt-1">Sistem Informasi Manajemen Kelautan & Perikanan</p>
        </div>
        <button 
          onClick={handleOpenModal}
          className="inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-cyan-500/20 text-sm"
        >
          <Plus className="w-5 h-5" />
          Tambah Data
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari berdasarkan judul..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/50 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium whitespace-nowrap">ID Ref</th>
                <th className="px-6 py-4 font-medium">Judul Konten</th>
                <th className="px-6 py-4 font-medium">Kategori</th>
                <th className="px-6 py-4 font-medium">Tanggal</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Status</th>
                <th className="px-6 py-4 font-medium text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-8 h-8 border-2 border-slate-700 border-t-cyan-500 rounded-full animate-spin"></div>
                      <span className="text-slate-400 font-medium">Memuat data galeri...</span>
                    </div>
                  </td>
                </tr>
              ) : data.filter(item => (item.Judul || '').toLowerCase().includes(searchQuery.toLowerCase())).map((row, idx) => {
                const rowId = row.ID_foto || row.ID_video || row.ID_infografis;
                return (
                <tr key={rowId} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-mono text-xs">#{rowId.toString().padStart(4, '0')}</td>
                  <td className="px-6 py-4 font-medium text-white">{row.Judul}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                      {row.kategori_nama || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-400">{row.tanggal ? row.tanggal.split('T')[0] : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${row.status === 'Aktif' || !row.status ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                      {row.status || 'Aktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <button 
                      onClick={() => handleEdit(row)}
                      className="p-1.5 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 rounded-lg transition-colors" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(rowId)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-slate-800 rounded-lg transition-colors" title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )})}
              {!isLoading && data.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-500 font-medium">
                    Belum ada data yang ditambahkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between p-6 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
              <h2 className="text-xl font-bold text-white">
                {editId ? `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}` : `Tambah ${type.charAt(0).toUpperCase() + type.slice(1)} Baru`}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form id="add-form" className="p-6 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Judul Konten <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    name="judul"
                    required 
                    value={formData.judul}
                    onChange={(e) => setFormData({...formData, judul: e.target.value})}
                    placeholder="Contoh: Patroli Gabungan Laut Jawa" 
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Kategori <span className="text-rose-500">*</span></label>
                    <select 
                      name="kategori"
                      required 
                      value={formData.kategori}
                      onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                    >
                      <option value="" disabled>-- Pilih Klasifikasi --</option>
                      <option value="Konservasi">Konservasi</option>
                      <option value="Pengawasan">Pengawasan</option>
                      <option value="Operasional">Operasional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Tanggal Pelaksanaan <span className="text-rose-500">*</span></label>
                    <input 
                      type="date" 
                      name="tanggal"
                      required 
                      value={formData.tanggal}
                      onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors [color-scheme:dark]" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Deskripsi / Laporan <span className="text-rose-500">*</span></label>
                  <textarea 
                    name="deskripsi" 
                    rows={4} 
                    required 
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                    placeholder="Masukkan uraian lengkap mengenai data ini..." 
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none leading-relaxed"
                  ></textarea>
                </div>
              </div>

              {type === 'foto' && (
                <div className="space-y-4 pt-3 border-t border-slate-800">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Gambar Utama <span className="text-rose-500">*</span></label>
                    <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-xl p-5 bg-slate-950 transition-colors flex items-center justify-center group">
                      <input type="file" name="image" accept="image/*" className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-300 hover:file:bg-slate-700 hover:file:text-white transition-colors cursor-pointer" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-cyan-400" />
                      Sub-Foto Detail (Batas 5 File)
                    </label>
                    <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-xl p-5 bg-slate-950 transition-colors group">
                      <input type="file" name="sub_photos" accept="image/*" multiple className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-300 hover:file:bg-slate-700 hover:file:text-white transition-colors cursor-pointer" />
                      <p className="text-xs text-slate-500 mt-2 text-center font-medium">PNG atau JPG. Multi-select diperbolehkan.</p>
                    </div>
                  </div>
                </div>
              )}

              {type === 'video' && (
                <div className="space-y-4 pt-3 border-t border-slate-800">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Durasi (MM:SS) <span className="text-rose-500">*</span></label>
                    <input type="text" name="durasi" required placeholder="04:15" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Thumbnail Video <span className="text-rose-500">*</span></label>
                    <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-xl p-5 bg-slate-950 transition-colors group">
                      <input type="file" name="thumbnail" accept="image/*" className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-300 hover:file:bg-slate-700 hover:file:text-white transition-colors cursor-pointer" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Sumber Arus Data (Video Source) <span className="text-rose-500">*</span></label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                      {['youtube', 'tiktok', 'instagram', 'upload'].map((srcType) => (
                        <button
                          key={srcType}
                          type="button"
                          onClick={() => setFormData({...formData, videoSourceType: srcType})}
                          className={`py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                            formData.videoSourceType === srcType
                              ? 'bg-cyan-600 border-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
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
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors" 
                      />
                    ) : (
                      <div className="border border-slate-700 rounded-xl bg-slate-950 p-4">
                        <input type="file" name="videoFile" accept="video/mp4,video/webm" className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-300 hover:file:bg-slate-700 hover:file:text-white transition-colors cursor-pointer" />
                        <p className="text-xs text-slate-500 mt-2 font-medium">MP4/WebM Maks. 50MB.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {type === 'infografis' && (
                <div className="space-y-4 pt-3 border-t border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Thumbnail Preview <span className="text-rose-500">*</span></label>
                      <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-xl p-4 bg-slate-950 transition-colors h-32 flex items-center justify-center">
                        <input type="file" name="thumbnail" accept="image/*" className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:font-semibold file:bg-slate-800 file:text-slate-300 hover:file:bg-slate-700 hover:file:text-white transition-colors cursor-pointer" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">File Dokumen PDF <span className="text-rose-500">*</span></label>
                      <div className="border-2 border-dashed border-slate-700 hover:border-rose-500/50 rounded-xl p-4 bg-slate-950 transition-colors h-32 flex items-center justify-center">
                         <input type="file" name="pdf" accept=".pdf" className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:font-semibold file:bg-slate-800 file:text-slate-300 hover:file:bg-slate-700 hover:file:text-white transition-colors cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </form>

            <div className="p-6 border-t border-slate-800 bg-slate-900 sticky bottom-0 flex justify-end gap-3 z-10">
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                disabled={isSaving}
              >
                Batalkan
              </button>
              <button 
                type="submit"
                form="add-form"
                disabled={isSaving}
                className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-cyan-500/20 flex items-center justify-center"
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
