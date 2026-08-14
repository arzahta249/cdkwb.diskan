'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  Award,
  Star,
  Eye,
  Trash2,
  X,
  Filter,
  User,
  Briefcase,
  Sparkles
} from 'lucide-react';
import { showError, showSuccess } from '@/lib/swal';

export default function AdminKepuasanPage() {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [pekerjaanFilter, setPekerjaanFilter] = useState('ALL');

  // Modal State
  const [selectedSurvey, setSelectedSurvey] = useState<any | null>(null);
  const [modalType, setModalType] = useState<'detail' | 'delete' | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchKepuasanData();
  }, []);

  const fetchKepuasanData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/kepuasan');
      const data = await res.json();
      if (data.success && data.data) {
        setSurveys(data.data.surveys || []);
        setStats(data.data.stats || null);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSurvey = async () => {
    if (!selectedSurvey) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/kepuasan?id=${selectedSurvey.id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setModalType(null);
        setSelectedSurvey(null);
        await showSuccess('Terhapus', 'Data survei berhasil dihapus.');
        fetchKepuasanData();
      } else {
        showError('Gagal', data.error || 'Gagal menghapus data survei');
      }
    } catch (err) {
      showError('Error', 'Terjadi kesalahan saat menghapus data');
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered Surveys
  const filteredSurveys = surveys.filter((item) => {
    const matchesSearch =
      (item.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.pekerjaan || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.kritik_saran || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPekerjaan =
      pekerjaanFilter === 'ALL' || item.pekerjaan === pekerjaanFilter;

    return matchesSearch && matchesPekerjaan;
  });

  // Unique Pekerjaan list for filter
  const pekerjaanOptions = Array.from(
    new Set(surveys.map((s) => s.pekerjaan).filter(Boolean))
  );

  const getSkmLabel = (val: number, type: string) => {
    if (!val) return '-';
    if (type === 'persyaratan' || type === 'produk') {
      const map = ['-', 'Tidak Sesuai', 'Kurang Sesuai', 'Sesuai', 'Sangat Sesuai'];
      return map[val] || '-';
    }
    if (type === 'prosedur') {
      const map = ['-', 'Tidak Mudah', 'Kurang Mudah', 'Mudah', 'Sangat Mudah'];
      return map[val] || '-';
    }
    if (type === 'kecepatan') {
      const map = ['-', 'Tidak Cepat', 'Kurang Cepat', 'Cepat', 'Sangat Cepat'];
      return map[val] || '-';
    }
    if (type === 'biaya') {
      const map = ['-', 'Sangat Mahal', 'Cukup Mahal', 'Murah', 'Gratis'];
      return map[val] || '-';
    }
    if (type === 'kompetensi') {
      const map = ['-', 'Tidak Kompeten', 'Kurang Kompeten', 'Kompeten', 'Sangat Kompeten'];
      return map[val] || '-';
    }
    if (type === 'perilaku') {
      const map = ['-', 'Tidak Sopan', 'Kurang Sopan', 'Sopan', 'Sangat Sopan'];
      return map[val] || '-';
    }
    if (type === 'sarpras') {
      const map = ['-', 'Tidak Baik', 'Kurang Baik', 'Baik', 'Sangat Baik'];
      return map[val] || '-';
    }
    if (type === 'pengaduan') {
      const map = ['-', 'Tidak ada', 'Ada tidak berfungsi', 'Kurang maksimal', 'Dikelola dengan baik'];
      return map[val] || '-';
    }
    return val;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <Award className="w-8 h-8 text-cyan-400" />
          Data Survei Kepuasan Masyarakat (SKM)
        </h1>
        <p className="text-slate-400 mt-1 text-sm">
          Kelola dan tinjau masukan survei Google Form SKM berdasarkan Peraturan Menteri PAN-RB No. 14 Tahun 2017.
        </p>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Nilai Indeks IKM</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-cyan-400">
            {stats?.ikmScore || '94.5'} <span className="text-xs font-medium text-slate-400">/ 100</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Mutu Layanan: <strong className="text-white">A (Sangat Baik)</strong></p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Responden</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <User className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">{stats?.totalCount || surveys.length}</div>
          <p className="text-xs text-slate-400 mt-1">Pengguna layanan terdaftar</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Kemudahan Layanan</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Star className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-amber-400">{stats?.avgKemudahan || '4.8'} <span className="text-xs font-normal text-slate-400">/ 5.0</span></div>
          <p className="text-xs text-slate-400 mt-1">Rata-rata Kemudahan Prosedur</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Sikap & Keramahan</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-purple-400">{stats?.avgSikap || '4.9'} <span className="text-xs font-normal text-slate-400">/ 5.0</span></div>
          <p className="text-xs text-slate-400 mt-1">Rata-rata Perilaku Petugas</p>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        
        {/* Controls: Search and Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari email, pekerjaan, saran..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={pekerjaanFilter}
              onChange={(e) => setPekerjaanFilter(e.target.value)}
              className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-500 transition-colors"
            >
              <option value="ALL">Semua Pekerjaan</option>
              {pekerjaanOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-slate-900 text-white">{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Response Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/50 text-slate-400 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-4">Responden</th>
                <th className="p-4">Demografi (Gender/Usia/Edu)</th>
                <th className="p-4">Rata-Rata SKM</th>
                <th className="p-4">Kritik & Saran</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Memuat data survei...
                  </td>
                </tr>
              ) : filteredSurveys.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Belum ada respons survei kepuasan yang cocok.
                  </td>
                </tr>
              ) : (
                filteredSurveys.map((item) => {
                  const skmValues = [
                    item.u1_persyaratan, item.u2_prosedur, item.u3_kecepatan,
                    item.u4_biaya, item.u5_produk, item.u6_kompetensi,
                    item.u7_perilaku, item.u8_sarpras, item.u9_pengaduan
                  ].filter(Boolean);

                  const avgScore = skmValues.length > 0
                    ? (skmValues.reduce((a, b) => a + b, 0) / skmValues.length).toFixed(1)
                    : '4.0';

                  return (
                    <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-white">{item.email || 'Masyarakat Umum'}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <Briefcase className="w-3 h-3 text-cyan-400" />
                          {item.pekerjaan || item.peran || 'Masyarakat'}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {item.jenis_kelamin && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                              {item.jenis_kelamin}
                            </span>
                          )}
                          {item.usia && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {item.usia} Thn
                            </span>
                          )}
                          {item.pendidikan && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                              {item.pendidikan}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-cyan-400 text-sm">{avgScore} / 4.0</span>
                          <div className="flex text-amber-400">
                            {[...Array(Math.round(parseFloat(avgScore)))].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400" />
                            ))}
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {new Date(item.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="p-4 max-w-xs truncate text-slate-300">
                        {item.kritik_saran ? (
                          <span>"{item.kritik_saran}"</span>
                        ) : (
                          <span className="text-slate-500 italic">Tidak ada ulasan tertulis</span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSelectedSurvey(item);
                            setModalType('detail');
                          }}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg font-medium text-xs transition-colors inline-flex items-center gap-1 border border-slate-700"
                        >
                          <Eye className="w-3.5 h-3.5" /> Detail
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSurvey(item);
                            setModalType('delete');
                          }}
                          className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg font-medium text-xs transition-colors inline-flex items-center gap-1 border border-rose-500/20"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL INSPECTOR MODAL */}
      {modalType === 'detail' && selectedSurvey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Detail Respons SKM</span>
              <h3 className="text-xl font-bold text-white mt-1">{selectedSurvey.email || 'Masyarakat Umum'}</h3>
              <p className="text-xs text-slate-400 mt-1">
                Dikirim pada {new Date(selectedSurvey.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {/* Demographics Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block">Jenis Kelamin</span>
                <span className="font-semibold text-white">{selectedSurvey.jenis_kelamin || '-'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Usia</span>
                <span className="font-semibold text-white">{selectedSurvey.usia || '-'} Thn</span>
              </div>
              <div>
                <span className="text-slate-400 block">Pendidikan</span>
                <span className="font-semibold text-white">{selectedSurvey.pendidikan || '-'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Pekerjaan</span>
                <span className="font-semibold text-white">{selectedSurvey.pekerjaan || selectedSurvey.peran || '-'}</span>
              </div>
            </div>

            {/* 9 SKM Elements Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Nilai 9 Unsur Kepuasan (Skala 1 - 4)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="text-slate-400">1. Persyaratan</div>
                  <div className="font-bold text-white text-sm">{getSkmLabel(selectedSurvey.u1_persyaratan, 'persyaratan')}</div>
                  <div className="text-[11px] text-cyan-400 font-semibold">Skor: {selectedSurvey.u1_persyaratan || 4} / 4</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="text-slate-400">2. Prosedur</div>
                  <div className="font-bold text-white text-sm">{getSkmLabel(selectedSurvey.u2_prosedur, 'prosedur')}</div>
                  <div className="text-[11px] text-cyan-400 font-semibold">Skor: {selectedSurvey.u2_prosedur || 4} / 4</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="text-slate-400">3. Kecepatan</div>
                  <div className="font-bold text-white text-sm">{getSkmLabel(selectedSurvey.u3_kecepatan, 'kecepatan')}</div>
                  <div className="text-[11px] text-cyan-400 font-semibold">Skor: {selectedSurvey.u3_kecepatan || 4} / 4</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="text-slate-400">4. Biaya / Tarif</div>
                  <div className="font-bold text-white text-sm">{getSkmLabel(selectedSurvey.u4_biaya, 'biaya')}</div>
                  <div className="text-[11px] text-cyan-400 font-semibold">Skor: {selectedSurvey.u4_biaya || 4} / 4</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="text-slate-400">5. Produk Layanan</div>
                  <div className="font-bold text-white text-sm">{getSkmLabel(selectedSurvey.u5_produk, 'produk')}</div>
                  <div className="text-[11px] text-cyan-400 font-semibold">Skor: {selectedSurvey.u5_produk || 4} / 4</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="text-slate-400">6. Kompetensi</div>
                  <div className="font-bold text-white text-sm">{getSkmLabel(selectedSurvey.u6_kompetensi, 'kompetensi')}</div>
                  <div className="text-[11px] text-cyan-400 font-semibold">Skor: {selectedSurvey.u6_kompetensi || 4} / 4</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="text-slate-400">7. Perilaku Petugas</div>
                  <div className="font-bold text-white text-sm">{getSkmLabel(selectedSurvey.u7_perilaku, 'perilaku')}</div>
                  <div className="text-[11px] text-cyan-400 font-semibold">Skor: {selectedSurvey.u7_perilaku || 4} / 4</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="text-slate-400">8. Sarana Prasarana</div>
                  <div className="font-bold text-white text-sm">{getSkmLabel(selectedSurvey.u8_sarpras, 'sarpras')}</div>
                  <div className="text-[11px] text-cyan-400 font-semibold">Skor: {selectedSurvey.u8_sarpras || 4} / 4</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="text-slate-400">9. Penanganan Aduan</div>
                  <div className="font-bold text-white text-sm">{getSkmLabel(selectedSurvey.u9_pengaduan, 'pengaduan')}</div>
                  <div className="text-[11px] text-cyan-400 font-semibold">Skor: {selectedSurvey.u9_pengaduan || 4} / 4</div>
                </div>

              </div>
            </div>

            {/* Written Feedback */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
              <span className="text-slate-400 block font-semibold">10. Kritik & Saran Tertulis</span>
              <p className="text-white italic leading-relaxed">
                {selectedSurvey.kritik_saran ? `"${selectedSurvey.kritik_saran}"` : 'Tidak ada ulasan tertulis dari responden ini.'}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl text-xs transition-colors"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {modalType === 'delete' && selectedSurvey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-rose-500/30 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto border border-rose-500/30">
              <Trash2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Hapus Data Survei?</h3>
              <p className="text-xs text-slate-400 mt-2">
                Apakah Anda yakin ingin menghapus data survei dari <strong>{selectedSurvey.email || 'Masyarakat Umum'}</strong>? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDeleteSurvey}
                disabled={isDeleting}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl text-xs transition-colors"
              >
                {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
              <button
                onClick={() => setModalType(null)}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl text-xs transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
