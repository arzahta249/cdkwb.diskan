"use client";

import React, { useEffect, useState } from 'react';
import { Briefcase, Search, Download, Trash2, Eye, CheckCircle } from 'lucide-react';

interface MagangApp {
  id: number;
  nama: string;
  email: string;
  universitas: string;
  jurusan: string;
  posisi: string;
  motivasi_cv: string;
  status: string;
  created_at: string;
}

export default function MagangDashboard() {
  const [applications, setApplications] = useState<MagangApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    if (!confirm(`Yakin ingin mengubah status menjadi ${newStatus}?`)) return;
    
    try {
      const res = await fetch('/api/magang', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        setApplications(apps => apps.map(app => app.id === id ? { ...app, status: newStatus } : app));
      } else {
        alert('Gagal mengubah status');
      }
    } catch (e) {
      alert('Terjadi kesalahan');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus lamaran ini secara permanen? User akan bisa mendaftar lagi jika lamarannya dihapus.')) return;
    
    try {
      const res = await fetch('/api/magang', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        setApplications(apps => apps.filter(app => app.id !== id));
      } else {
        alert('Gagal menghapus');
      }
    } catch (e) {
      alert('Terjadi kesalahan');
    }
  };

  const filteredApps = applications.filter(app => 
    app.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.universitas.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.posisi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
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
                          onClick={() => alert(`Motivasi/CV: ${app.motivasi_cv}`)}
                          className="p-1.5 bg-blue-900/30 text-blue-400 hover:bg-blue-800/50 rounded-md transition-colors" 
                          title="Lihat Detail/CV"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {app.status === 'pending' && (
                          <button 
                            onClick={() => handleUpdateStatus(app.id, 'accepted')}
                            className="p-1.5 bg-emerald-900/30 text-emerald-400 hover:bg-emerald-800/50 rounded-md transition-colors" 
                            title="ACC / Terima"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        
                        <button 
                          onClick={() => handleDelete(app.id)}
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
    </div>
  );
}
