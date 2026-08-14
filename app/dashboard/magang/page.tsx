"use client";

import React, { useEffect, useState } from 'react';
import { Briefcase, Search, Download, Trash2, Eye, CheckCircle, X, FileText, DownloadCloud } from 'lucide-react';
import Link from 'next/link';
import { showError } from '@/lib/swal';

interface MagangApp {
  id: number;
  nama: string;
  email: string;
  universitas: string;
  jurusan: string;
  posisi: string;
  nomor_ponsel: string;
  domisili: string;
  motivasi_cv: string;
  cv_file: string | null;
  status: string;
  created_at: string;
}

export default function MagangDashboard() {
  const [applications, setApplications] = useState<MagangApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'confirm_acc' | 'confirm_delete' | 'view_details' | 'success_toast' | null;
    appId: number | null;
    appData: MagangApp | null;
    message?: string;
  }>({
    isOpen: false,
    type: null,
    appId: null,
    appData: null,
  });

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/magang');
      const data = await res.json();
      if (data.success) {
        setApplications(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch applications", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const openModal = (type: 'confirm_acc' | 'confirm_delete' | 'view_details', app: MagangApp) => {
    setModalState({ isOpen: true, type, appId: app.id, appData: app });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, appId: null, appData: null });
  };

  const showToast = (message: string) => {
    setModalState({ isOpen: true, type: 'success_toast', appId: null, appData: null, message });
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch('/api/magang', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        setApplications(apps => apps.map(app => app.id === id ? { ...app, status: newStatus } : app));
        showToast('Status pendaftaran berhasil diperbarui!');
      } else {
        showError('Gagal', 'Gagal mengubah status');
      }
    } catch (e) {
      showError('Error', 'Terjadi kesalahan pada server');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch('/api/magang', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        setApplications(apps => apps.filter(app => app.id !== id));
        showToast('Data pendaftaran berhasil dihapus!');
      } else {
        showError('Gagal', 'Gagal menghapus data lamaran');
      }
    } catch (e) {
      showError('Error', 'Terjadi kesalahan pada server');
    }
  };

  const filteredApps = applications.filter(app => 
    app.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.universitas.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.posisi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-cyan-400" />
            Data Pendaftaran Magang
          </h1>
          <p className="text-slate-400 text-sm mt-1">Kelola data mahasiswa yang mendaftar magang di CDKWB</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari nama, kampus, posisi..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0F172A] border border-cyan-900/30 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded-lg border border-slate-700 transition-colors" title="Export Data">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-[#0F172A] border border-cyan-900/30 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-[#1E293B] text-slate-400 border-b border-cyan-900/30">
              <tr>
                <th className="px-6 py-4 font-medium">Tanggal</th>
                <th className="px-6 py-4 font-medium">Nama Lengkap</th>
                <th className="px-6 py-4 font-medium">Asal Institusi</th>
                <th className="px-6 py-4 font-medium">Posisi & Status</th>
                <th className="px-6 py-4 font-medium text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-900/20">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    Memuat data...
                  </td>
                </tr>
              ) : filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    Belum ada data pendaftar magang yang sesuai.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(app.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-200">{app.nama}</div>
                      <div className="text-xs text-slate-500">{app.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-300">{app.universitas}</div>
                      <div className="text-xs text-slate-500">{app.jurusan}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2 items-start">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-900/30 text-cyan-400 border border-cyan-800/50">
                          {app.posisi}
                        </span>
                        {app.status === 'pending' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 uppercase">
                            Pending
                          </span>
                        ) : app.status === 'accepted' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 uppercase">
                            Diterima
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 uppercase">
                            Ditolak
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap items-center justify-center gap-2 w-max">
                        <button 
                          onClick={() => openModal('view_details', app)}
                          className="p-1.5 bg-blue-900/30 text-blue-400 hover:bg-blue-800/50 rounded-md transition-colors" 
                          title="Lihat Detail & CV"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {app.status === 'pending' && (
                          <button 
                            onClick={() => openModal('confirm_acc', app)}
                            className="p-1.5 bg-emerald-900/30 text-emerald-400 hover:bg-emerald-800/50 rounded-md transition-colors" 
                            title="ACC / Terima"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        
                        <button 
                          onClick={() => openModal('confirm_delete', app)}
                          className="p-1.5 bg-rose-900/30 text-rose-400 hover:bg-rose-800/50 rounded-md transition-colors" 
                          title="Hapus / Tolak"
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

      {/* CUSTOM MODALS */}
      {modalState.isOpen && modalState.type !== 'success_toast' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          
          {/* 1. Modal View Details */}
          {modalState.type === 'view_details' && modalState.appData && (
            <div className="bg-[#0F172A] border border-cyan-900/50 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center p-6 border-b border-cyan-900/30 bg-[#1E293B]/50">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" /> Profil & Motivasi Kadet
                </h3>
                <button onClick={closeModal} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-6 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-500 mb-1">Nama Lengkap</p>
                    <p className="text-white font-medium">{modalState.appData.nama}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Email</p>
                    <p className="text-white font-medium">{modalState.appData.email}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Nomor Ponsel (WA)</p>
                    <p className="text-white font-medium">{modalState.appData.nomor_ponsel || '-'}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Domisili</p>
                    <p className="text-white font-medium">{modalState.appData.domisili || '-'}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Institusi / Jurusan</p>
                    <p className="text-white font-medium">{modalState.appData.universitas} - {modalState.appData.jurusan}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Posisi Dilamar</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-900/30 text-cyan-400 border border-cyan-800/50">
                      {modalState.appData.posisi}
                    </span>
                  </div>
                </div>

                <div className="bg-[#1E293B]/50 p-4 rounded-xl border border-cyan-900/30">
                  <p className="text-slate-400 font-medium mb-2">Deskripsi Diri / Motivasi:</p>
                  <p className="text-slate-200 whitespace-pre-wrap leading-relaxed">{modalState.appData.motivasi_cv}</p>
                </div>

                <div className="flex justify-end pt-2">
                  {modalState.appData.cv_file ? (
                    <Link href={modalState.appData.cv_file} target="_blank" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/20">
                      <DownloadCloud className="w-4 h-4" /> Buka / Unduh File CV
                    </Link>
                  ) : (
                    <span className="text-slate-500 italic flex items-center gap-2 px-5 py-2.5 bg-[#1E293B] rounded-lg border border-slate-800">
                      Tidak ada file CV yang dilampirkan
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. Modal Confirm ACC */}
          {modalState.type === 'confirm_acc' && modalState.appData && (
            <div className="bg-[#0F172A] border border-emerald-900/50 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Terima Kandidat?</h3>
                <p className="text-slate-400 mb-8 text-sm">
                  Anda akan mengubah status <span className="text-white font-medium">{modalState.appData.nama}</span> menjadi DITERIMA.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button onClick={closeModal} className="px-5 py-2.5 rounded-lg font-medium text-slate-300 hover:bg-[#1E293B] transition-colors">Batal</button>
                  <button onClick={() => { handleUpdateStatus(modalState.appId!, 'accepted'); closeModal(); }} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-emerald-900/20">
                    Ya, Terima Kandidat
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. Modal Confirm Delete */}
          {modalState.type === 'confirm_delete' && modalState.appData && (
            <div className="bg-[#0F172A] border border-rose-900/50 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trash2 className="w-8 h-8 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Hapus Lamaran?</h3>
                <p className="text-slate-400 mb-8 text-sm">
                  Anda yakin ingin menghapus data <span className="text-white font-medium">{modalState.appData.nama}</span>? Setelah dihapus, peserta dapat mendaftar kembali.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button onClick={closeModal} className="px-5 py-2.5 rounded-lg font-medium text-slate-300 hover:bg-[#1E293B] transition-colors">Batal</button>
                  <button onClick={() => { handleDelete(modalState.appId!); closeModal(); }} className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-rose-900/20">
                    Ya, Hapus Data
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* TOAST SUCCESS NOTIFICATION */}
      {modalState.isOpen && modalState.type === 'success_toast' && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-emerald-900/90 border border-emerald-500/50 backdrop-blur-md px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <p className="text-emerald-50 font-medium">{modalState.message}</p>
          </div>
        </div>
      )}

    </div>
  );
}
