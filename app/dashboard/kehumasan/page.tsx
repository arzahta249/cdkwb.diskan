'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  FileText, 
  Handshake, 
  X, 
  Check, 
  Loader2, 
  ExternalLink,
  GraduationCap,
  Users,
  Search,
  Building2,
  Calendar,
  Clock,
  Sparkles
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Kerjasama {
  id: number;
  nama_mitra: string;
  singkatan: string;
  kategori: 'akademik' | 'teknis' | 'pokmaswas';
  nomor_pks_mitra: string;
  nomor_pks_dinas: string;
  tanggal_pks: string;
  jangka_waktu: string;
  status: 'aktif' | 'perpanjangan' | 'tetap';
  level: string;
  penandatangan: string;
  ringkasan: string;
  ruang_lingkup: string | string[];
  prodi_terlibat: string;
  keluaran_program: string;
  pendanaan: string;
  file_dokumen_url: string;
  urutan: number;
}

interface Dokumen {
  id: number;
  judul: string;
  deskripsi: string;
  file_url: string;
  tipe: string;
  ukuran: string;
  warna: string;
  urutan: number;
}

// ─── Color Options for Dokumen ────────────────────────────────────────────────
const WARNA_OPTIONS = [
  { label: 'Biru', value: '#0ea5e9' },
  { label: 'Hijau', value: '#10b981' },
  { label: 'Ungu', value: '#8b5cf6' },
  { label: 'Kuning', value: '#f59e0b' },
  { label: 'Merah', value: '#ef4444' },
  { label: 'Cyan', value: '#06b6d4' },
];

// ─── Modal Form: Kerjasama ────────────────────────────────────────────────────
function KerjasamaModal({
  item,
  onClose,
  onSaved,
}: {
  item: Kerjasama | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!item;
  
  // Format initial scope to multiline text
  const initialScopeText = useMemoScopeText(item?.ruang_lingkup);

  const [form, setForm] = useState({
    nama_mitra: item?.nama_mitra ?? '',
    singkatan: item?.singkatan ?? '',
    kategori: item?.kategori ?? 'akademik',
    nomor_pks_mitra: item?.nomor_pks_mitra ?? '',
    nomor_pks_dinas: item?.nomor_pks_dinas ?? '',
    tanggal_pks: item?.tanggal_pks ?? '',
    jangka_waktu: item?.jangka_waktu ?? '',
    status: item?.status ?? 'aktif',
    level: item?.level ?? 'Provinsi Jawa Tengah',
    penandatangan: item?.penandatangan ?? '',
    ringkasan: item?.ringkasan ?? '',
    ruang_lingkup_raw: initialScopeText,
    prodi_terlibat: item?.prodi_terlibat ?? '',
    keluaran_program: typeof item?.keluaran_program === 'string' && item?.keluaran_program.startsWith('[') 
      ? JSON.parse(item.keluaran_program).join('\n') 
      : (item?.keluaran_program ?? ''),
    pendanaan: item?.pendanaan ?? '',
    file_dokumen_url: item?.file_dokumen_url ?? '',
    urutan: item?.urutan ?? 0,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!form.nama_mitra.trim() || !form.nomor_pks_mitra.trim() || !form.tanggal_pks.trim() || !form.jangka_waktu.trim()) {
      setError('Nama Mitra, Nomor PKS, Tanggal, dan Jangka Waktu wajib diisi.');
      return;
    }

    setSaving(true);
    setError('');

    // Parse multiline string into array
    const scopeArray = form.ruang_lingkup_raw
      .split('\n')
      .map((s: string) => s.trim())
      .filter(Boolean);

    const outputsArray = form.keluaran_program
      .split('\n')
      .map((s: string) => s.trim())
      .filter(Boolean);

    try {
      const payload = {
        ...form,
        ruang_lingkup: scopeArray,
        keluaran_program: outputsArray.length > 1 ? outputsArray : form.keluaran_program,
        ...(isEdit ? { id: item!.id } : {})
      };

      const res = await fetch('/api/kerjasama', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error ?? 'Gagal menyimpan data kerjasama');
      onSaved();
      onClose();
    } catch (e: any) {
      setError(e.message ?? 'Terjadi kesalahan saat menyimpan.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#0f1629] border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl my-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 shrink-0">
          <div>
            <h3 className="text-white font-bold text-lg">
              {isEdit ? 'Edit Data Kerjasama' : 'Tambah Mitra Kerjasama Baru'}
            </h3>
            <p className="text-xs text-slate-400">Kelola rincian PKS dan informasi kemitraan resmi</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Nama Mitra & Singkatan */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Nama Instansi / Mitra *</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.nama_mitra} 
                onChange={e => setForm(f => ({ ...f, nama_mitra: e.target.value }))} 
                placeholder="Fakultas Perikanan dan Ilmu Kelautan, UPS Tegal" 
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Nama Pendek / Singkatan</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.singkatan} 
                onChange={e => setForm(f => ({ ...f, singkatan: e.target.value }))} 
                placeholder="FPIK UPS Tegal" 
              />
            </div>
          </div>

          {/* Kategori & Status & Level */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Kategori / Jenis</label>
              <select 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.kategori} 
                onChange={e => setForm(f => ({ ...f, kategori: e.target.value as any }))}
              >
                <option value="akademik">Akademik / Perguruan Tinggi</option>
                <option value="teknis">Teknis / NGO / Yayasan</option>
                <option value="pokmaswas">Masyarakat / Pokmaswas</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Status Kerjasama</label>
              <select 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.status} 
                onChange={e => setForm(f => ({ ...f, status: e.target.value as any }))}
              >
                <option value="aktif">Aktif Berjalan</option>
                <option value="perpanjangan">Evaluasi / Perpanjangan</option>
                <option value="tetap">SK Berjalan / Komunitas</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Tingkat / Level</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.level} 
                onChange={e => setForm(f => ({ ...f, level: e.target.value }))} 
                placeholder="Provinsi Jawa Tengah" 
              />
            </div>
          </div>

          {/* Nomor PKS Mitra & Dinas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Nomor PKS / SK Mitra *</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.nomor_pks_mitra} 
                onChange={e => setForm(f => ({ ...f, nomor_pks_mitra: e.target.value }))} 
                placeholder="444/K/L-5/FPIK-UPS/XII/2024" 
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Nomor PKS Dinas (DKP Jateng)</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.nomor_pks_dinas} 
                onChange={e => setForm(f => ({ ...f, nomor_pks_dinas: e.target.value }))} 
                placeholder="019.5/8689/XII/2024" 
              />
            </div>
          </div>

          {/* Tanggal & Jangka Waktu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Tanggal Penandatanganan *</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.tanggal_pks} 
                onChange={e => setForm(f => ({ ...f, tanggal_pks: e.target.value }))} 
                placeholder="15 Des 2024" 
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Jangka Waktu / Masa Berlaku *</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.jangka_waktu} 
                onChange={e => setForm(f => ({ ...f, jangka_waktu: e.target.value }))} 
                placeholder="4 Tahun (2024 — 2028)" 
              />
            </div>
          </div>

          {/* Penandatangan */}
          <div>
            <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Pihak Penandatangan (Pejabat / Dekan)</label>
            <input 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              value={form.penandatangan} 
              onChange={e => setForm(f => ({ ...f, penandatangan: e.target.value }))} 
              placeholder="Ir. Fendiawan Tiskiantoro, M.Si & Dekan..." 
            />
          </div>

          {/* Ringkasan */}
          <div>
            <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Ringkasan Tujuan Kerjasama</label>
            <textarea 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              rows={2} 
              value={form.ringkasan} 
              onChange={e => setForm(f => ({ ...f, ringkasan: e.target.value }))} 
              placeholder="Program Pengembangan Sumberdaya Kelautan dan Perikanan serta penguatan Tri Dharma..." 
            />
          </div>

          {/* Ruang Lingkup (per baris) */}
          <div>
            <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">
              Ruang Lingkup Kegiatan (Satu baris per poin)
            </label>
            <textarea 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
              rows={3} 
              value={form.ruang_lingkup_raw} 
              onChange={e => setForm(f => ({ ...f, ruang_lingkup_raw: e.target.value }))} 
              placeholder="Peningkatan mutu SDM&#10;Riset terapan kelautan&#10;Pemanfaatan laboratorium bersama" 
            />
          </div>

          {/* Optional: Prodi Terlibat / Pendanaan / Link File */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Prodi Terlibat (Jika Ada)</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.prodi_terlibat} 
                onChange={e => setForm(f => ({ ...f, prodi_terlibat: e.target.value }))} 
                placeholder="S1 Ilmu Kelautan, S1 Teknologi Pangan..." 
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Dukungan Pendanaan (Jika Ada)</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.pendanaan} 
                onChange={e => setForm(f => ({ ...f, pendanaan: e.target.value }))} 
                placeholder="Hibah: Rp 200.000.000 / Tahun" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Link File Dokumen / Scan PKS (Google Drive / URL)</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.file_dokumen_url} 
                onChange={e => setForm(f => ({ ...f, file_dokumen_url: e.target.value }))} 
                placeholder="https://drive.google.com/..." 
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold uppercase tracking-wider mb-1 block">Urutan Tampil</label>
              <input 
                type="number"
                min={0}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.urutan} 
                onChange={e => setForm(f => ({ ...f, urutan: Number(e.target.value) }))} 
              />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-3 p-5 border-t border-slate-800 shrink-0">
          <button 
            type="button"
            onClick={onClose} 
            className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors text-sm font-medium"
          >
            Batal
          </button>
          <button 
            type="button"
            onClick={handleSave} 
            disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-sm font-bold transition-colors flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            {saving ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Tambah Mitra')}
          </button>
        </div>
      </div>
    </div>
  );
}

function useMemoScopeText(val: any): string {
  if (!val) return '';
  if (Array.isArray(val)) return val.join('\n');
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed.join('\n');
    } catch {
      return val;
    }
  }
  return String(val);
}

// ─── Modal Form: Dokumen Humas ────────────────────────────────────────────────
function DokumenModal({
  dokumen,
  onClose,
  onSaved,
}: {
  dokumen: Dokumen | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!dokumen;
  const [form, setForm] = useState<Omit<Dokumen, 'id'>>({
    judul: dokumen?.judul ?? '',
    deskripsi: dokumen?.deskripsi ?? '',
    file_url: dokumen?.file_url ?? '',
    tipe: dokumen?.tipe ?? 'PDF',
    ukuran: dokumen?.ukuran ?? '',
    warna: dokumen?.warna ?? '#0ea5e9',
    urutan: dokumen?.urutan ?? 0,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!form.judul.trim() || !form.file_url.trim()) {
      setError('Judul dan URL file wajib diisi.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = isEdit ? { id: dokumen!.id, ...form } : form;
      const res = await fetch('/api/dokumen-humas', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error ?? 'Gagal menyimpan');
      onSaved();
      onClose();
    } catch (e: any) {
      setError(e.message ?? 'Terjadi kesalahan.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#0f1629] border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <h3 className="text-white font-bold text-lg">{isEdit ? 'Edit Dokumen' : 'Tambah Dokumen'}</h3>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm px-4 py-3 rounded-xl">{error}</div>
          )}

          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1.5 block">Judul Dokumen *</label>
            <input className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              value={form.judul} onChange={e => setForm(f => ({ ...f, judul: e.target.value }))} placeholder="Laporan Tahunan CDKWB 2025" />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1.5 block">Deskripsi</label>
            <textarea className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              rows={2} value={form.deskripsi} onChange={e => setForm(f => ({ ...f, deskripsi: e.target.value }))} placeholder="Ringkasan singkat isi dokumen..." />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1.5 block">URL File (Google Drive / Langsung) *</label>
            <input className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              value={form.file_url} onChange={e => setForm(f => ({ ...f, file_url: e.target.value }))} placeholder="https://drive.google.com/..." />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1.5 block">Tipe</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.tipe} onChange={e => setForm(f => ({ ...f, tipe: e.target.value }))}>
                {['PDF', 'PNG', 'JPG', 'DOCX', 'XLSX', 'PPT'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1.5 block">Ukuran File</label>
              <input className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                value={form.ukuran} onChange={e => setForm(f => ({ ...f, ukuran: e.target.value }))} placeholder="2.4 MB" />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2 block">Warna Label</label>
            <div className="flex gap-2">
              {WARNA_OPTIONS.map(w => (
                <button key={w.value} onClick={() => setForm(f => ({ ...f, warna: w.value }))}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${form.warna === w.value ? 'scale-125 border-white' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  style={{ background: w.value }} title={w.label} />
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1.5 block">Urutan Tampil</label>
            <input type="number" min={0} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              value={form.urutan} onChange={e => setForm(f => ({ ...f, urutan: Number(e.target.value) }))} />
          </div>
        </div>

        <div className="flex gap-3 p-5 border-t border-slate-800">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors text-sm font-medium">
            Batal
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-sm font-bold transition-colors flex items-center justify-center gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            {saving ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Tambah Dokumen')}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard Page ──────────────────────────────────────────────────────
export default function KehumasanDashboard() {
  const [activeTab, setActiveTab] = useState<'kerjasama' | 'dokumen'>('kerjasama');
  const [kerjasamaList, setKerjasamaList] = useState<Kerjasama[]>([]);
  const [dokumen, setDokumen] = useState<Dokumen[]>([]);
  const [loadingKerjasama, setLoadingKerjasama] = useState(true);
  const [loadingDok, setLoadingDok] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [editKerjasama, setEditKerjasama] = useState<Kerjasama | null>(null);
  const [showKerjasamaModal, setShowKerjasamaModal] = useState(false);
  const [editDok, setEditDok] = useState<Dokumen | null>(null);
  const [showDokModal, setShowDokModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchKerjasama = async () => {
    setLoadingKerjasama(true);
    try {
      const r = await fetch('/api/kerjasama');
      const d = await r.json();
      setKerjasamaList(d.data ?? []);
    } catch {
      setKerjasamaList([]);
    } finally {
      setLoadingKerjasama(false);
    }
  };

  const fetchDokumen = async () => {
    setLoadingDok(true);
    try {
      const r = await fetch('/api/dokumen-humas');
      const d = await r.json();
      setDokumen(d.data ?? []);
    } catch {
      setDokumen([]);
    } finally {
      setLoadingDok(false);
    }
  };

  useEffect(() => {
    fetchKerjasama();
    fetchDokumen();
  }, []);

  const handleDeleteKerjasama = async (id: number, name: string) => {
    if (!confirm(`Hapus data kemitraan "${name}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/kerjasama?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        await fetchKerjasama();
      } else {
        alert(data.error || 'Gagal menghapus');
      }
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteDok = async (id: number) => {
    if (!confirm('Hapus dokumen ini?')) return;
    setDeletingId(id);
    try {
      await fetch(`/api/dokumen-humas?id=${id}`, { method: 'DELETE' });
      await fetchDokumen();
    } finally { setDeletingId(null); }
  };

  const filteredKerjasama = kerjasamaList.filter(k => 
    !searchQuery.trim() ||
    k.nama_mitra.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.nomor_pks_mitra.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (k.singkatan && k.singkatan.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            Kehumasan & Publikasi
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            Kelola data direktori kerjasama resmi (PKS) dan dokumen publikasi resmi CDKWB.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <a 
            href="/kehumasan/kerjasama" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white px-3.5 py-2 rounded-xl font-medium transition-colors text-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Lihat Tabel Kerjasama
          </a>
          <a 
            href="/kehumasan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white px-3.5 py-2 rounded-xl font-medium transition-colors text-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Portal Humas Publik
          </a>
        </div>
      </div>

      {/* Editorial Hub Tabs */}
      <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 w-fit">
        <button 
          onClick={() => setActiveTab('kerjasama')}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
            activeTab === 'kerjasama'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Handshake className="w-4 h-4" />
          Kerjasama & Kemitraan ({kerjasamaList.length})
        </button>

        <button 
          onClick={() => setActiveTab('dokumen')}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
            activeTab === 'dokumen'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          Dokumen Resmi ({dokumen.length})
        </button>
      </div>

      {/* ── TAB: KERJASAMA & KEMITRAAN ───────────────────────────────────── */}
      {activeTab === 'kerjasama' && (
        <div className="space-y-4">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari mitra / nomor PKS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 focus:border-cyan-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Add Button */}
            <button 
              onClick={() => { setEditKerjasama(null); setShowKerjasamaModal(true); }}
              className="inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20 text-xs active:scale-95 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" /> Tambah Mitra Kerjasama
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <p className="text-slate-400 text-xs font-medium">
                {filteredKerjasama.length} data kemitraan aktif di direktori publik
              </p>
            </div>

            {loadingKerjasama ? (
              <div className="p-12 flex justify-center">
                <Loader2 className="w-7 h-7 text-cyan-400 animate-spin" />
              </div>
            ) : filteredKerjasama.length === 0 ? (
              <div className="p-12 text-center text-slate-500 space-y-2">
                <Handshake className="w-10 h-10 mx-auto opacity-30" />
                <p className="text-sm font-medium">Belum ada data kerjasama.</p>
                <p className="text-xs">Klik tombol "Tambah Mitra Kerjasama" untuk memasukkan data PKS baru.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/60 text-slate-400 uppercase text-[11px] font-semibold tracking-wider">
                    <tr>
                      <th className="px-4 py-3.5 text-center w-12">#</th>
                      <th className="px-4 py-3.5 min-w-[220px]">Nama Mitra / Instansi</th>
                      <th className="px-4 py-3.5 min-w-[130px]">Kategori</th>
                      <th className="px-4 py-3.5 min-w-[200px]">Nomor PKS</th>
                      <th className="px-4 py-3.5 min-w-[110px]">Tanggal</th>
                      <th className="px-4 py-3.5 min-w-[120px]">Masa Berlaku</th>
                      <th className="px-4 py-3.5 min-w-[110px]">Status</th>
                      <th className="px-4 py-3.5 text-right min-w-[120px]">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredKerjasama.map((item, i) => (
                      <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-3.5 text-center font-bold text-slate-500">
                          {i + 1}
                        </td>
                        <td className="px-4 py-3.5 font-medium text-white">
                          <div className="leading-snug">{item.nama_mitra}</div>
                          {item.singkatan && (
                            <div className="text-[10px] text-cyan-400 font-semibold mt-0.5">{item.singkatan}</div>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                            item.kategori === 'akademik' ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' :
                            item.kategori === 'teknis' ? 'bg-teal-500/10 text-teal-300 border-teal-500/20' :
                            'bg-amber-500/10 text-amber-300 border-amber-500/20'
                          }`}>
                            {item.kategori === 'akademik' ? 'Akademik (PT)' :
                             item.kategori === 'teknis' ? 'Teknis / NGO' : 'Pokmaswas'}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 font-mono text-[11px] text-slate-300">
                          <div>{item.nomor_pks_mitra}</div>
                          {item.nomor_pks_dinas && (
                            <div className="text-slate-500 text-[10px]">& {item.nomor_pks_dinas}</div>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-slate-300 whitespace-nowrap">
                          {item.tanggal_pks}
                        </td>
                        <td className="px-4 py-3.5 text-slate-300 whitespace-nowrap">
                          {item.jangka_waktu}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${
                            item.status === 'aktif' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                            item.status === 'perpanjangan' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                            'bg-sky-500/10 text-sky-400 border-sky-500/20'
                          }`}>
                            {item.status === 'aktif' ? 'Aktif' : item.status === 'perpanjangan' ? 'Perpanjangan' : 'Jejaring'}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center gap-1.5 justify-end">
                            <button 
                              onClick={() => { setEditKerjasama(item); setShowKerjasamaModal(true); }}
                              className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 px-2.5 py-1.5 rounded-lg hover:bg-cyan-500/10 transition-colors"
                            >
                              <Edit2 className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteKerjasama(item.id, item.nama_mitra)}
                              disabled={deletingId === item.id}
                              className="inline-flex items-center gap-1 text-xs font-medium text-rose-400 hover:text-rose-300 px-2.5 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors disabled:opacity-50"
                            >
                              {deletingId === item.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB: DOKUMEN RESMI ───────────────────────────────────────────── */}
      {activeTab === 'dokumen' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => { setEditDok(null); setShowDokModal(true); }}
              className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20 text-xs active:scale-95 cursor-pointer">
              <Plus className="w-4 h-4" /> Tambah Dokumen
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800">
              <p className="text-slate-400 text-xs font-medium">{dokumen.length} Dokumen publikasi tersedia</p>
            </div>
            {loadingDok ? (
              <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 text-cyan-400 animate-spin" /></div>
            ) : dokumen.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <FileText className="w-8 h-8 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Belum ada dokumen. Tambahkan dokumen pertama.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/60 text-slate-400 uppercase text-[11px] font-semibold">
                    <tr>
                      <th className="px-6 py-3.5">Judul Dokumen</th>
                      <th className="px-6 py-3.5">Tipe</th>
                      <th className="px-6 py-3.5">Ukuran</th>
                      <th className="px-6 py-3.5">URL File</th>
                      <th className="px-6 py-3.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {dokumen.map((doc, i) => (
                      <tr key={doc.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: doc.warna }} />
                            <span className="font-medium text-white line-clamp-1 max-w-[240px]">{doc.judul}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">{doc.tipe}</span>
                        </td>
                        <td className="px-6 py-3.5 text-slate-400">{doc.ukuran || '—'}</td>
                        <td className="px-6 py-3.5">
                          {doc.file_url && doc.file_url !== '#' ? (
                            <a href={doc.file_url} target="_blank" rel="noopener noreferrer"
                              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                              <ExternalLink className="w-3 h-3" /> Buka
                            </a>
                          ) : (
                            <span className="text-xs text-slate-600">Belum ada</span>
                          )}
                        </td>
                        <td className="px-6 py-3.5 text-right">
                          <div className="flex items-center gap-1 justify-end">
                            <button onClick={() => { setEditDok(doc); setShowDokModal(true); }}
                              className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 px-2.5 py-1.5 rounded-lg hover:bg-cyan-500/10 transition-colors">
                              <Edit2 className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button onClick={() => handleDeleteDok(doc.id)} disabled={deletingId === doc.id}
                              className="inline-flex items-center gap-1 text-xs font-medium text-rose-400 hover:text-rose-300 px-2.5 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors disabled:opacity-50">
                              {deletingId === doc.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Kerjasama */}
      {showKerjasamaModal && (
        <KerjasamaModal
          item={editKerjasama}
          onClose={() => setShowKerjasamaModal(false)}
          onSaved={fetchKerjasama}
        />
      )}

      {/* Modal Dokumen */}
      {showDokModal && (
        <DokumenModal
          dokumen={editDok}
          onClose={() => setShowDokModal(false)}
          onSaved={fetchDokumen}
        />
      )}
    </div>
  );
}
