'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  MessageSquare,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  User,
  Building,
  Upload,
  Star,
  Eye,
  X,
  Send,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function AduanDashboardPage() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Selected item modal
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [modalType, setModalType] = useState<'detail' | 'disposition' | 'resolution' | 'reject' | null>(null);

  // Disposition form
  const [petugasBidang, setPetugasBidang] = useState('Bidang Pengawasan & Konservasi');
  const [slaDays, setSlaDays] = useState('3');

  // Reject form
  const [alasanPenolakan, setAlasanPenolakan] = useState('');

  // Resolution form
  const [hasilPenyelesaian, setHasilPenyelesaian] = useState('');
  const [buktiFile, setBuktiFile] = useState<File | null>(null);

  const [actionSubmitting, setActionSubmitting] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, [statusFilter]);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      let url = `/api/pengaduan?status=${statusFilter}`;
      if (searchQuery) {
        url += `&q=${encodeURIComponent(searchQuery)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setComplaints(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchComplaints();
  };

  // Submit Disposition
  const handleDisposition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    setActionSubmitting(true);
    try {
      const res = await fetch(`/api/pengaduan/${selectedItem.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'VERIFY_DISPOSIT',
          petugas_bidang: petugasBidang,
          sla_days: slaDays
        })
      });

      const data = await res.json();
      if (data.success) {
        alert('Disposisi berhasil disimpan!');
        closeModal();
        fetchComplaints();
      } else {
        alert(data.error || 'Gagal memproses disposisi');
      }
    } catch (err) {
      alert('Terjadi kesalahan');
    } finally {
      setActionSubmitting(false);
    }
  };

  // Submit Reject
  const handleReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    setActionSubmitting(true);
    try {
      const res = await fetch(`/api/pengaduan/${selectedItem.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'REJECT',
          alasan_penolakan: alasanPenolakan
        })
      });

      const data = await res.json();
      if (data.success) {
        alert('Pengaduan ditolak');
        closeModal();
        fetchComplaints();
      } else {
        alert(data.error || 'Gagal menolak pengaduan');
      }
    } catch (err) {
      alert('Terjadi kesalahan');
    } finally {
      setActionSubmitting(false);
    }
  };

  // Submit Resolution
  const handleResolution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    setActionSubmitting(true);
    try {
      const body = new FormData();
      body.append('action', 'SUBMIT_RESOLUTION');
      body.append('hasil_penyelesaian', hasilPenyelesaian);
      if (buktiFile) {
        body.append('bukti_penyelesaian', buktiFile);
      }

      const res = await fetch(`/api/pengaduan/${selectedItem.id}`, {
        method: 'PATCH',
        body
      });

      const data = await res.json();
      if (data.success) {
        alert('Hasil penyelesaian berhasil disimpan!');
        closeModal();
        fetchComplaints();
      } else {
        alert(data.error || 'Gagal menyimpan hasil penyelesaian');
      }
    } catch (err) {
      alert('Terjadi kesalahan');
    } finally {
      setActionSubmitting(false);
    }
  };

  // Close & Archive Ticket
  const handleCloseTicket = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menutup dan mengarsipkan tiket ini?')) return;

    try {
      const res = await fetch(`/api/pengaduan/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'CLOSE_TICKET' })
      });
      const data = await res.json();
      if (data.success) {
        fetchComplaints();
      }
    } catch (err) {
      alert('Gagal menutup tiket');
    }
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalType(null);
    setAlasanPenolakan('');
    setHasilPenyelesaian('');
    setBuktiFile(null);
  };

  // Quick stats
  const totalCount = complaints.length;
  const pendingCount = complaints.filter(c => c.status === 'PENDING').length;
  const processCount = complaints.filter(c => ['DIDISPOSISI', 'DIPROSES'].includes(c.status)).length;
  const doneCount = complaints.filter(c => ['SELESAI', 'DITUTUP'].includes(c.status)).length;
  const overdueCount = complaints.filter(c => c.is_overdue).length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Data Pengaduan Masyarakat</h1>
          <p className="text-slate-400 mt-1">Kelola verifikasi, disposisi bidang teknis, penanganan SLA, dan rating kepuasan.</p>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl">
          <div className="text-xs text-slate-400">Total Pengaduan</div>
          <div className="text-2xl font-bold text-white mt-1">{totalCount}</div>
        </div>
        <div className="bg-slate-900 p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 shadow-xl">
          <div className="text-xs text-amber-400 font-semibold">Perlu Verifikasi</div>
          <div className="text-2xl font-bold text-amber-400 mt-1">{pendingCount}</div>
        </div>
        <div className="bg-slate-900 p-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 shadow-xl">
          <div className="text-xs text-cyan-400 font-semibold">Dalam Proses</div>
          <div className="text-2xl font-bold text-cyan-400 mt-1">{processCount}</div>
        </div>
        <div className="bg-slate-900 p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 shadow-xl">
          <div className="text-xs text-emerald-400 font-semibold">Selesai / Ditutup</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{doneCount}</div>
        </div>
        <div className="bg-slate-900 p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 shadow-xl">
          <div className="text-xs text-rose-400 font-semibold flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> Melewati SLA
          </div>
          <div className="text-2xl font-bold text-rose-400 mt-1">{overdueCount}</div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Cari tiket, nama, lokasi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm placeholder:text-slate-500"
            />
          </form>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 text-xs">
            {['ALL', 'PENDING', 'DIDISPOSISI', 'DIPROSES', 'SELESAI', 'DITOLAK'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                  statusFilter === st
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {st === 'ALL' ? 'Semua Status' : st}
              </button>
            ))}
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/50 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Tiket & Pelapor</th>
                <th className="px-6 py-4 font-medium">Kategori & Lokasi</th>
                <th className="px-6 py-4 font-medium">Status & SLA</th>
                <th className="px-6 py-4 font-medium">Rating Kepuasan</th>
                <th className="px-6 py-4 font-medium text-right">Aksi & Verifikasi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Memuat data pengaduan...
                  </td>
                </tr>
              ) : complaints.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <MessageSquare className="w-12 h-12 mb-3 opacity-20" />
                      <p>Belum ada data aduan yang sesuai filter.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                complaints.map((item) => (
                  <tr key={item.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-cyan-400 tracking-wider text-xs">
                        {item.nomor_tiket}
                      </div>
                      <div className="text-sm font-medium text-white mt-0.5">
                        {item.is_anonim ? (
                          <span className="text-slate-400 flex items-center gap-1"><User className="w-3.5 h-3.5" /> Anonim</span>
                        ) : (
                          item.nama_pelapor || 'Tanpa Nama'
                        )}
                      </div>
                      <div className="text-xs text-slate-500">{item.email_pelapor}</div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 mb-1">
                        {item.kategori}
                      </span>
                      <div className="text-xs text-slate-400">{item.lokasi}</div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 items-start">
                        {item.status === 'PENDING' && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            PENDING (Verifikasi)
                          </span>
                        )}
                        {item.status === 'DIDISPOSISI' && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            DIDISPOSISI
                          </span>
                        )}
                        {item.status === 'DIPROSES' && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            DIPROSES
                          </span>
                        )}
                        {item.status === 'SELESAI' && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            SELESAI
                          </span>
                        )}
                        {item.status === 'DITUTUP' && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/20">
                            DITUTUP
                          </span>
                        )}
                        {item.status === 'DITOLAK' && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            DITOLAK
                          </span>
                        )}

                        {item.is_overdue && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white animate-pulse">
                            ! LEWAT SLA
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {item.rating_kepuasan ? (
                        <div>
                          <div className="flex text-amber-400">
                            {[...Array(item.rating_kepuasan)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                            ))}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[150px]" title={item.feedback_kepuasan}>
                            "{item.feedback_kepuasan}"
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500 italic">Belum ada rating</span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Detail button */}
                        <button
                          onClick={() => { setSelectedItem(item); setModalType('detail'); }}
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> Detail
                        </button>

                        {/* Action when PENDING */}
                        {item.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => { setSelectedItem(item); setModalType('disposition'); }}
                              className="px-2.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-medium transition-colors shadow-sm"
                            >
                              Disposisi
                            </button>
                            <button
                              onClick={() => { setSelectedItem(item); setModalType('reject'); }}
                              className="px-2.5 py-1.5 bg-rose-600/80 hover:bg-rose-600 text-white rounded-lg text-xs transition-colors"
                            >
                              Tolak
                            </button>
                          </>
                        )}

                        {/* Action when DIDISPOSISI / DIPROSES */}
                        {['DIDISPOSISI', 'DIPROSES'].includes(item.status) && (
                          <button
                            onClick={() => { setSelectedItem(item); setModalType('resolution'); }}
                            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-colors"
                          >
                            Input Hasil
                          </button>
                        )}

                        {/* Close ticket option */}
                        {item.status === 'SELESAI' && (
                          <button
                            onClick={() => handleCloseTicket(item.id)}
                            className="px-2.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs transition-colors"
                          >
                            Tutup Tiket
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Backdrop */}
      {selectedItem && modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs text-slate-400">Nomor Tiket</span>
                <h3 className="text-lg font-bold text-cyan-400">{selectedItem.nomor_tiket}</h3>
              </div>
              <button onClick={closeModal} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content: Detail */}
            {modalType === 'detail' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-400 block">Pelapor</span>
                    <span className="font-semibold text-white">{selectedItem.is_anonim ? 'Anonim' : selectedItem.nama_pelapor}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Email / Telepon</span>
                    <span className="font-semibold text-white">{selectedItem.email_pelapor} ({selectedItem.telepon_pelapor || '-'})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Kategori</span>
                    <span className="font-semibold text-white">{selectedItem.kategori}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Lokasi</span>
                    <span className="font-semibold text-white">{selectedItem.lokasi}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block mb-1">Isi Deskripsi Pengaduan</span>
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 leading-relaxed">
                    {selectedItem.deskripsi}
                  </div>
                </div>

                {selectedItem.lampiran && (
                  <div>
                    <span className="text-slate-400 block mb-1">Lampiran Berkas Pelapor</span>
                    <a
                      href={selectedItem.lampiran}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 underline font-medium hover:text-cyan-300"
                    >
                      Buka Lampiran Pelapor
                    </a>
                  </div>
                )}

                {selectedItem.hasil_penyelesaian && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2">
                    <span className="text-emerald-400 font-bold block">Hasil Penyelesaian Tim Teknis</span>
                    <p className="text-emerald-200">{selectedItem.hasil_penyelesaian}</p>
                    {selectedItem.bukti_penyelesaian && (
                      <a
                        href={selectedItem.bukti_penyelesaian}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 underline font-medium block"
                      >
                        Buka Bukti Penyelesaian
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Modal Content: Disposition */}
            {modalType === 'disposition' && (
              <form onSubmit={handleDisposition} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Petugas / Bidang Teknis Penanggung Jawab</label>
                  <select
                    value={petugasBidang}
                    onChange={(e) => setPetugasBidang(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="Bidang Pengawasan & Konservasi">Bidang Pengawasan & Konservasi</option>
                    <option value="Bidang Perikanan Tangkap">Bidang Perikanan Tangkap</option>
                    <option value="Bidang Kelautan & Tata Ruang">Bidang Kelautan & Tata Ruang</option>
                    <option value="Sekretariat & Subag Umum">Sekretariat & Subag Umum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Batas Waktu Penanganan (SLA Days)</label>
                  <select
                    value={slaDays}
                    onChange={(e) => setSlaDays(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="1">1 Hari Kerja</option>
                    <option value="3">3 Hari Kerja (Standar)</option>
                    <option value="5">5 Hari Kerja</option>
                    <option value="7">7 Hari Kerja</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button type="button" onClick={closeModal} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition-colors">Batal</button>
                  <button type="submit" disabled={actionSubmitting} className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-cyan-500/20 transition-colors">
                    {actionSubmitting ? 'Simpan...' : 'Simpan & Disposisi'}
                  </button>
                </div>
              </form>
            )}

            {/* Modal Content: Reject */}
            {modalType === 'reject' && (
              <form onSubmit={handleReject} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Alasan Penolakan Pengaduan</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Uraikan alasan penolakan (misal: diluar wewenang instansi, data tidak valid)..."
                    value={alasanPenolakan}
                    onChange={(e) => setAlasanPenolakan(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button type="button" onClick={closeModal} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition-colors">Batal</button>
                  <button type="submit" disabled={actionSubmitting} className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl text-xs transition-colors">
                    {actionSubmitting ? 'Memproses...' : 'Tolak Pengaduan'}
                  </button>
                </div>
              </form>
            )}

            {/* Modal Content: Resolution */}
            {modalType === 'resolution' && (
              <form onSubmit={handleResolution} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Uraian Hasil Penanganan / Bukti Survei</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Uraikan tindakan yang telah dilaksanakan dan solusi penyelesaian..."
                    value={hasilPenyelesaian}
                    onChange={(e) => setHasilPenyelesaian(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Upload Foto / Dokumen Bukti Penyelesaian (Opsional)</label>
                  <input
                    type="file"
                    onChange={(e) => setBuktiFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button type="button" onClick={closeModal} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition-colors">Batal</button>
                  <button type="submit" disabled={actionSubmitting} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs transition-colors">
                    {actionSubmitting ? 'Simpan...' : 'Simpan & Tandai Selesai'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
