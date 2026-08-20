'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DepthGauge from '@/components/DepthGauge';
import {
  FileText,
  Search,
  Smile,
  Send,
  ShieldCheck,
  Upload,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Star,
  User,
  Copy,
  Check,
  Building,
  MapPin,
  Lock,
  MessageSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Mail,
  Briefcase,
  GraduationCap,
  ThumbsUp,
  RotateCcw,
  HeartHandshake,
  Users,
  CheckCircle,
  BarChart3,
  Sliders
} from 'lucide-react';

export default function PengaduanPage() {
  const [activeTab, setActiveTab] = useState<'form' | 'tracking' | 'kepuasan'>('form');

  // Form State
  const [formData, setFormData] = useState({
    nama_pelapor: '',
    email_pelapor: '',
    telepon_pelapor: '',
    kategori: 'Perizinan Kapal',
    lokasi: '',
    deskripsi: '',
    is_anonim: false
  });
  const [lampiranFile, setLampiranFile] = useState<File | null>(null);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaMath, setCaptchaMath] = useState({ num1: 7, num2: 4, answer: 11 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccessTicket, setSubmitSuccessTicket] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const errorRef = useRef<HTMLDivElement | null>(null);

  // Tracking State
  const [searchTicket, setSearchTicket] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [ticketResult, setTicketResult] = useState<any | null>(null);
  const [trackingError, setTrackingError] = useState<string | null>(null);

  // Ticket Rating Form State
  const [ticketRating, setTicketRating] = useState(5);
  const [ticketFeedback, setTicketFeedback] = useState('');
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [ratingSuccessMsg, setRatingSuccessMsg] = useState<string | null>(null);

  // Kepuasan Pengguna State (Google Form SKM)
  const [ikmStats, setIkmStats] = useState<any | null>(null);
  const [isLoadingIkm, setIsLoadingIkm] = useState(false);
  const [surveyForm, setSurveyForm] = useState({
    nama: '',
    whatsapp: '',
    jenis_kelamin: '',
    usia: '',
    pendidikan: '',
    pekerjaan: '',
    u1_persyaratan: 0,
    u2_prosedur: 0,
    u3_kecepatan: 0,
    u4_biaya: 0,
    u5_produk: 0,
    u6_kompetensi: 0,
    u7_perilaku: 0,
    u8_sarpras: 0,
    u9_pengaduan: 0,
    kritik_saran: ''
  });
  const [isSubmittingSurvey, setIsSubmittingSurvey] = useState(false);
  const [surveySuccessMsg, setSurveySuccessMsg] = useState<string | null>(null);

  // Generate new captcha on mount
  useEffect(() => {
    generateCaptcha();
    fetchIkmStats();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    setCaptchaMath({ num1, num2, answer: num1 + num2 });
    setCaptchaInput('');
  };

  const fetchIkmStats = async () => {
    setIsLoadingIkm(true);
    try {
      const res = await fetch('/api/kepuasan');
      const data = await res.json();
      if (data.success) {
        setIkmStats(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingIkm(false);
    }
  };

  // Submit Complaint Form
  const showError = (msg: string) => {
    setFormError(msg);
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 5000);
    setTimeout(() => {
      errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  };

  const handleSubmitComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validate captcha
    if (captchaInput.trim() === '') {
      showError('Mohon jawab soal captcha terlebih dahulu.');
      return;
    }

    if (parseInt(captchaInput, 10) !== captchaMath.answer) {
      showError('Jawaban Captcha tidak sesuai. Silakan coba lagi.');
      generateCaptcha();
      return;
    }

    if (!formData.email_pelapor || !formData.lokasi || !formData.deskripsi) {
      showError('Semua kolom bertanda bintang (*) wajib diisi.');
      return;
    }

    setIsSubmitting(true);

    try {
      const body = new FormData();
      body.append('nama_pelapor', formData.nama_pelapor);
      body.append('email_pelapor', formData.email_pelapor);
      body.append('telepon_pelapor', formData.telepon_pelapor);
      body.append('kategori', formData.kategori);
      body.append('lokasi', formData.lokasi);
      body.append('deskripsi', formData.deskripsi);
      body.append('is_anonim', formData.is_anonim ? 'true' : 'false');
      if (lampiranFile) {
        body.append('lampiran', lampiranFile);
      }

      const res = await fetch('/api/pengaduan', {
        method: 'POST',
        body
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gagal mengirim pengaduan');
      }

      setSubmitSuccessTicket(data.nomor_tiket);
      setFormData({
        nama_pelapor: '',
        email_pelapor: '',
        telepon_pelapor: '',
        kategori: 'Perizinan Kapal',
        lokasi: '',
        deskripsi: '',
        is_anonim: false
      });
      setLampiranFile(null);
      generateCaptcha();
    } catch (err: any) {
      showError(err.message || 'Terjadi kesalahan saat mengirim pengaduan');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Search Ticket Handler
  const handleSearchTicket = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchTicket.trim()) return;

    setIsSearching(true);
    setTrackingError(null);
    setTicketResult(null);

    try {
      const res = await fetch(`/api/pengaduan?ticket=${encodeURIComponent(searchTicket.trim())}`);
      const data = await res.json();

      if (data.success && data.data && data.data.length > 0) {
        setTicketResult(data.data[0]);
      } else {
        setTrackingError(`Nomor tiket "${searchTicket}" tidak ditemukan. Mohon periksa kembali.`);
      }
    } catch (err) {
      setTrackingError('Gagal melakukan pencarian tiket.');
    } finally {
      setIsSearching(false);
    }
  };

  // Submit Rating for Solved Ticket
  const handleSubmitTicketRating = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketResult) return;

    setIsSubmittingRating(true);
    try {
      const res = await fetch(`/api/pengaduan/${ticketResult.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'SUBMIT_RATING',
          rating_kepuasan: ticketRating,
          feedback_kepuasan: ticketFeedback
        })
      });

      const data = await res.json();
      if (data.success) {
        setRatingSuccessMsg('Terima kasih! Feedback kepuasan Anda telah berhasil disimpan.');
        setTicketResult({
          ...ticketResult,
          status: 'DITUTUP',
          rating_kepuasan: ticketRating,
          feedback_kepuasan: ticketFeedback
        });
        fetchIkmStats();
      } else {
        alert(data.error || 'Gagal menyimpan rating');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat mengirim rating');
    } finally {
      setIsSubmittingRating(false);
    }
  };

  // Submit General Survey Handler (Google Form SKM)
  const handleSubmitSurvey = async (e: React.FormEvent) => {
    e.preventDefault();
    setSurveySuccessMsg(null);

    // Validation
    if (!surveyForm.nama || !surveyForm.whatsapp || !surveyForm.jenis_kelamin || !surveyForm.usia || !surveyForm.pendidikan || !surveyForm.pekerjaan) {
      showError('Mohon lengkapi seluruh data responden (Nama Lengkap, No. WhatsApp, Jenis Kelamin, Usia, Pendidikan, Pekerjaan).');
      return;
    }

    if (
      !surveyForm.u1_persyaratan || !surveyForm.u2_prosedur || !surveyForm.u3_kecepatan ||
      !surveyForm.u4_biaya || !surveyForm.u5_produk || !surveyForm.u6_kompetensi ||
      !surveyForm.u7_perilaku || !surveyForm.u8_sarpras || !surveyForm.u9_pengaduan
    ) {
      showError('Mohon jawab seluruh 9 pertanyaan unsur kepuasan masyarakat.');
      return;
    }

    setIsSubmittingSurvey(true);

    try {
      const res = await fetch('/api/kepuasan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(surveyForm)
      });

      const data = await res.json();
      if (data.success) {
        setSurveySuccessMsg('Jawaban Anda telah direkam. Terima kasih atas partisipasi Anda dalam survei SKM CDKWB!');
        setSurveyForm({
          nama: '',
          whatsapp: '',
          jenis_kelamin: '',
          usia: '',
          pendidikan: '',
          pekerjaan: '',
          u1_persyaratan: 0,
          u2_prosedur: 0,
          u3_kecepatan: 0,
          u4_biaya: 0,
          u5_produk: 0,
          u6_kompetensi: 0,
          u7_perilaku: 0,
          u8_sarpras: 0,
          u9_pengaduan: 0,
          kritik_saran: ''
        });
        fetchIkmStats();
        window.scrollTo({ top: 300, behavior: 'smooth' });
      } else {
        showError(data.error || 'Gagal menyimpan survei');
      }
    } catch (err) {
      showError('Terjadi kesalahan saat mengirim survei kepuasan.');
    } finally {
      setIsSubmittingSurvey(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen font-sans text-white bg-[#061426]">
      <Navbar />
      <DepthGauge />

      <div className="ocean-bg">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="rays" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="container mx-auto px-6 relative z-10 max-w-6xl text-center">
            <span className="eyebrow" style={{ color: '#6FF3C8' }}>
              Pusat Layanan Masyarakat CDKWB Jawa Tengah
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mt-4 mb-4 leading-tight">
              Pengaduan Online & Kepuasan Pengguna
            </h1>
            <p className="text-base md:text-lg max-w-2xl mx-auto text-gray-300 mb-8 leading-relaxed">
              Sampaikan pengaduan, masukan, serta penilaian kualitas pelayanan publik Cabang Dinas Kelautan Wilayah Barat secara cepat, transparan, dan terukur.
            </p>

            {/* Navigation Tabs */}
            <div className="inline-flex p-1.5 bg-[#0b2440]/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
              <button
                onClick={() => setActiveTab('form')}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                  activeTab === 'form'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileText className="w-4 h-4" />
                Buat Pengaduan
              </button>

              <button
                onClick={() => setActiveTab('tracking')}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                  activeTab === 'tracking'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Search className="w-4 h-4" />
                Cek Status Tiket
              </button>

              <button
                onClick={() => setActiveTab('kepuasan')}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                  activeTab === 'kepuasan'
                    ? 'bg-[#6FF3C8] text-[#0b3b60] shadow-lg shadow-[#6FF3C8]/20 font-semibold'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Smile className="w-4 h-4" />
                Kepuasan Pengguna
              </button>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <section className="pb-24 px-6 relative z-10 max-w-5xl mx-auto">
          {/* TAB 1: FORM PENGADUAN ONLINE */}
          {activeTab === 'form' && (
            <div className="bg-[#0b223d]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3 pb-6 border-b border-white/10 mb-8">
                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-2xl border border-blue-500/30">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Formulir Pengaduan Pelayanan</h2>
                  <p className="text-xs text-gray-400">Silakan lengkapi rincian laporan pengaduan Anda di bawah ini.</p>
                </div>
              </div>

              {formError && (
                <div ref={errorRef} className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSubmitComplaint} className="space-y-6">
                {/* Opsi Anonim Toggle */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-[#6FF3C8]" />
                    <div>
                      <div className="text-sm font-semibold text-white">Kirim Secara Anonim</div>
                      <div className="text-xs text-gray-400">Nama Anda tidak akan ditampilkan secara publik maupun di dalam rincian tiket.</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_anonim}
                      onChange={(e) => setFormData({ ...formData, is_anonim: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6FF3C8]"></div>
                  </label>
                </div>

                {/* Data Pelapor (If not anonymous) */}
                {!formData.is_anonim && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Nama Pelapor</label>
                      <input
                        type="text"
                        placeholder="Nama lengkap Anda"
                        value={formData.nama_pelapor}
                        onChange={(e) => setFormData({ ...formData, nama_pelapor: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Nomor Telepon / WA</label>
                      <input
                        type="text"
                        placeholder="0812xxxx"
                        value={formData.telepon_pelapor}
                        onChange={(e) => setFormData({ ...formData, telepon_pelapor: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Email (Wajib) */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Email Pelapor <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    required
                    placeholder="email@domain.com (digunakan untuk mengirim nomor tiket)"
                    value={formData.email_pelapor}
                    onChange={(e) => setFormData({ ...formData, email_pelapor: e.target.value })}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm transition-colors"
                  />
                </div>

                {/* Kategori & Lokasi */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Kategori Pengaduan <span className="text-red-400">*</span></label>
                    <select
                      value={formData.kategori}
                      onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 text-sm transition-colors"
                    >
                      <option value="Perizinan Kapal" className="bg-slate-900 text-white">Perizinan & Administrasi Kapal</option>
                      <option value="Konservasi Ekosistem" className="bg-slate-900 text-white">Konservasi & Ekosistem Pesisir</option>
                      <option value="Pengawasan Pesisir" className="bg-slate-900 text-white">Pengawasan & Illegal Fishing</option>
                      <option value="Layanan Publik CDKWB" className="bg-slate-900 text-white">Layanan Publik & Fasilitas</option>
                      <option value="Lainnya" className="bg-slate-900 text-white">Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Lokasi Kejadian / Objek <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="Kabupaten/Kota, Pelabuhan, atau koordinat lokasi"
                      value={formData.lokasi}
                      onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Deskripsi */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Deskripsi Pengaduan Lengkap <span className="text-red-400">*</span></label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Uraikan kejadian, waktu, dan permasalahan secara detail..."
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm transition-colors"
                  />
                </div>

                {/* Upload Lampiran */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Lampiran Bukti (Opsional)</label>
                  <div className="p-4 border-2 border-dashed border-white/10 rounded-2xl bg-black/20 text-center hover:border-blue-500/50 transition-colors">
                    <input
                      type="file"
                      id="lampiran-file"
                      className="hidden"
                      onChange={(e) => setLampiranFile(e.target.files ? e.target.files[0] : null)}
                    />
                    <label htmlFor="lampiran-file" className="cursor-pointer flex flex-col items-center justify-center">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-300">
                        {lampiranFile ? lampiranFile.name : 'Klik untuk memilih berkas foto / dokumen (Max 10MB)'}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">Format: JPG, PNG, PDF, DOCX</span>
                    </label>
                  </div>
                </div>

                {/* Simple Captcha Validation */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-gray-300">
                      Berapakah hasil dari <strong className="text-white font-bold text-base px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded-lg">{captchaMath.num1} + {captchaMath.num2}</strong> ?
                    </span>
                  </div>
                  <input
                    type="number"
                    required
                    placeholder="Jawaban"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className="w-32 px-4 py-2 bg-black/60 border border-white/10 rounded-xl text-center font-bold text-white focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-2xl shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 text-base"
                >
                  {isSubmitting ? (
                    <>Memproses & Memvalidasi Pengaduan...</>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Kirim Laporan Pengaduan
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: LACAK TIKET & FEEDBACK */}
          {activeTab === 'tracking' && (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
              {/* Search Box */}
              <div className="bg-[#0b223d]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Search className="w-5 h-5 text-blue-400" />
                  Cek Progres & Status Tiket Pengaduan
                </h2>
                <p className="text-xs text-gray-400 mb-6">
                  Masukkan Nomor Tiket (contoh: <code className="text-[#6FF3C8]">TKT-20260804-XXXX</code>) yang Anda dapatkan saat mengirim pengaduan.
                </p>

                <form onSubmit={handleSearchTicket} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Nomor Tiket (cth: TKT-2026...)"
                    value={searchTicket}
                    onChange={(e) => setSearchTicket(e.target.value)}
                    className="flex-1 px-5 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 text-sm transition-all"
                  >
                    {isSearching ? 'Mencari...' : 'Cek Status'}
                  </button>
                </form>

                {trackingError && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <span>{trackingError}</span>
                  </div>
                )}
              </div>

              {/* Ticket Result Details & Timeline */}
              {ticketResult && (
                <div className="bg-[#0b223d]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  {/* Ticket Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Nomor Tiket Pengaduan</span>
                      <div className="text-2xl font-extrabold text-[#6FF3C8] tracking-wider mt-0.5 flex items-center gap-3">
                        {ticketResult.nomor_tiket}
                        <button
                          onClick={() => copyToClipboard(ticketResult.nomor_tiket)}
                          className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 text-xs transition-colors"
                          title="Salin Nomor Tiket"
                        >
                          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      {ticketResult.status === 'PENDING' && (
                        <span className="px-4 py-2 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                          <Clock className="w-4 h-4" /> Menunggu Verifikasi Admin
                        </span>
                      )}
                      {ticketResult.status === 'DIDISPOSISI' && (
                        <span className="px-4 py-2 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
                          <Building className="w-4 h-4" /> Didisposisi ke Bidang
                        </span>
                      )}
                      {ticketResult.status === 'DIPROSES' && (
                        <span className="px-4 py-2 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4" /> Sedang Ditindaklanjuti
                        </span>
                      )}
                      {ticketResult.status === 'SELESAI' && (
                        <span className="px-4 py-2 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/30 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" /> Penanganan Selesai
                        </span>
                      )}
                      {ticketResult.status === 'DITUTUP' && (
                        <span className="px-4 py-2 rounded-full text-xs font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" /> Tiket Ditutup & Diarsipkan
                        </span>
                      )}
                      {ticketResult.status === 'DITOLAK' && (
                        <span className="px-4 py-2 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/30 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4" /> Pengaduan Ditolak
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Complaint Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div>
                      <span className="text-gray-400 block">Kategori</span>
                      <span className="font-semibold text-white text-sm">{ticketResult.kategori}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Lokasi Kejadian</span>
                      <span className="font-semibold text-white text-sm flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-red-400" /> {ticketResult.lokasi}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Tanggal Pengiriman</span>
                      <span className="font-semibold text-white text-sm">
                        {new Date(ticketResult.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Flowchart Timeline */}
                  <div>
                    <h3 className="text-base font-bold text-white mb-6">Alur & Progres Penanganan</h3>
                    <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                      {/* Step 1: Submit */}
                      <div className="relative pl-10">
                        <div className="absolute left-0 top-0.5 w-8 h-8 rounded-full bg-green-500 text-black flex items-center justify-center font-bold text-xs">
                          <Check className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-semibold text-white">1. Pengaduan Dikirim oleh Pelapor</h4>
                        <p className="text-xs text-gray-400 mt-1">{ticketResult.deskripsi}</p>
                      </div>

                      {/* Step 2: Verification */}
                      <div className="relative pl-10">
                        <div className={`absolute left-0 top-0.5 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                          ticketResult.status !== 'PENDING' ? 'bg-green-500 text-black' : 'bg-blue-600 text-white animate-pulse'
                        }`}>
                          {ticketResult.status !== 'PENDING' ? <Check className="w-4 h-4" /> : '2'}
                        </div>
                        <h4 className="text-sm font-semibold text-white">2. Verifikasi Data oleh Admin</h4>
                        <p className="text-xs text-gray-400 mt-1">
                          {ticketResult.status === 'DITOLAK' ? (
                            <span className="text-red-400">Ditolak: {ticketResult.alasan_penolakan || 'Bukan kewenangan CDKWB'}</span>
                          ) : ticketResult.status !== 'PENDING' ? (
                            'Data dan kelengkapan berkas terverifikasi valid.'
                          ) : (
                            'Sedang dalam proses verifikasi kelengkapan berkas.'
                          )}
                        </p>
                      </div>

                      {/* Step 3: Disposition & Field */}
                      <div className="relative pl-10">
                        <div className={`absolute left-0 top-0.5 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                          ['DIPROSES', 'SELESAI', 'DITUTUP'].includes(ticketResult.status)
                            ? 'bg-green-500 text-black'
                            : ticketResult.status === 'DIDISPOSISI'
                            ? 'bg-blue-600 text-white animate-pulse'
                            : 'bg-gray-800 text-gray-500'
                        }`}>
                          {['DIPROSES', 'SELESAI', 'DITUTUP'].includes(ticketResult.status) ? <Check className="w-4 h-4" /> : '3'}
                        </div>
                        <h4 className="text-sm font-semibold text-white">3. Disposisi & Tindak Lanjut Lapangan</h4>
                        <p className="text-xs text-gray-400 mt-1">
                          {ticketResult.petugas_bidang ? `Ditangani oleh: ${ticketResult.petugas_bidang}` : 'Menunggu penetapan tim teknis.'}
                        </p>
                      </div>

                      {/* Step 4: Outcome */}
                      <div className="relative pl-10">
                        <div className={`absolute left-0 top-0.5 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                          ['SELESAI', 'DITUTUP'].includes(ticketResult.status)
                            ? 'bg-green-500 text-black'
                            : 'bg-gray-800 text-gray-500'
                        }`}>
                          {['SELESAI', 'DITUTUP'].includes(ticketResult.status) ? <Check className="w-4 h-4" /> : '4'}
                        </div>
                        <h4 className="text-sm font-semibold text-white">4. Hasil & Bukti Penyelesaian</h4>
                        {ticketResult.hasil_penyelesaian ? (
                          <div className="mt-2 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs space-y-2">
                            <div className="text-emerald-300 font-semibold">{ticketResult.hasil_penyelesaian}</div>
                            {ticketResult.bukti_penyelesaian && (
                              <a
                                href={ticketResult.bukti_penyelesaian}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-blue-400 underline font-medium"
                              >
                                Lihat Lampiran Bukti Penyelesaian
                              </a>
                            )}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-400 mt-1">Hasil penyelesaian akan ditampilkan setelah tindakan selesai.</p>
                        )}
                      </div>

                      {/* Step 5: Rating Kepuasan Pelapor */}
                      <div className="relative pl-10">
                        <div className={`absolute left-0 top-0.5 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                          ticketResult.rating_kepuasan
                            ? 'bg-[#6FF3C8] text-[#0b3b60]'
                            : ticketResult.status === 'SELESAI'
                            ? 'bg-amber-400 text-black animate-pulse'
                            : 'bg-gray-800 text-gray-500'
                        }`}>
                          <Star className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-semibold text-white">5. Rating & Feedback Kepuasan Pelapor</h4>
                        {ticketResult.rating_kepuasan ? (
                          <div className="mt-2 text-xs text-gray-300 flex items-center gap-2">
                            <div className="flex text-amber-400">
                              {[...Array(ticketResult.rating_kepuasan)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                            <span>"{ticketResult.feedback_kepuasan}"</span>
                          </div>
                        ) : ticketResult.status === 'SELESAI' ? (
                          /* Interactive Form to rate satisfaction */
                          <div className="mt-4 p-5 bg-gradient-to-br from-amber-500/10 to-blue-500/10 border border-amber-500/30 rounded-2xl space-y-4">
                            <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Beri Penilaian Kepuasan Penanganan Pengaduan</h5>
                            {ratingSuccessMsg ? (
                              <div className="text-xs text-green-400 font-semibold">{ratingSuccessMsg}</div>
                            ) : (
                              <form onSubmit={handleSubmitTicketRating} className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-300">Tingkat Kepuasan:</span>
                                  <div className="flex items-center gap-1 cursor-pointer">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        onClick={() => setTicketRating(star)}
                                        className={`w-6 h-6 transition-transform hover:scale-110 ${
                                          star <= ticketRating ? 'fill-amber-400 text-amber-400' : 'text-gray-600'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <textarea
                                  rows={3}
                                  placeholder="Kritik & saran atau ulasan kepuasan Anda..."
                                  value={ticketFeedback}
                                  onChange={(e) => setTicketFeedback(e.target.value)}
                                  className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white text-xs placeholder-gray-500 focus:outline-none focus:border-amber-400"
                                />
                                <button
                                  type="submit"
                                  disabled={isSubmittingRating}
                                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors"
                                >
                                  {isSubmittingRating ? 'Menyimpan...' : 'Kirim Penilaian Kepuasan'}
                                </button>
                              </form>
                            )}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-400 mt-1">Form penilaian akan aktif saat tiket berstatus SELESAI.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: KEPUASAN PENGGUNA (STREAMLINED & EFFICIENT SKM) */}
          {activeTab === 'kepuasan' && (() => {
            const answeredCount = [
              !!surveyForm.email,
              !!surveyForm.jenis_kelamin,
              !!surveyForm.usia,
              !!surveyForm.pendidikan,
              !!surveyForm.pekerjaan,
              surveyForm.u1_persyaratan > 0,
              surveyForm.u2_prosedur > 0,
              surveyForm.u3_kecepatan > 0,
              surveyForm.u4_biaya > 0,
              surveyForm.u5_produk > 0,
              surveyForm.u6_kompetensi > 0,
              surveyForm.u7_perilaku > 0,
              surveyForm.u8_sarpras > 0,
              surveyForm.u9_pengaduan > 0,
            ].filter(Boolean).length;
            const totalRequired = 14;
            const progressPercent = Math.round((answeredCount / totalRequired) * 100);

            const UNSUR_LIST = [
              {
                id: 'u1_persyaratan' as const,
                num: 1,
                title: 'Kesesuaian Persyaratan Pelayanan',
                desc: 'Kesesuaian dan kemudahan kelengkapan berkas/syarat layanan',
                labels: ['Tidak Sesuai', 'Kurang Sesuai', 'Sesuai', 'Sangat Sesuai']
              },
              {
                id: 'u2_prosedur' as const,
                num: 2,
                title: 'Kemudahan Prosedur & Alur Layanan',
                desc: 'Kemudahan alur pelayanan (praktis, jelas & tidak berbelit)',
                labels: ['Tidak Mudah', 'Kurang Mudah', 'Mudah', 'Sangat Mudah']
              },
              {
                id: 'u3_kecepatan' as const,
                num: 3,
                title: 'Kecepatan Waktu Pelayanan',
                desc: 'Ketepatan waktu proses pelayanan sesuai standar waktu SOP',
                labels: ['Tidak Cepat', 'Kurang Cepat', 'Cepat', 'Sangat Cepat']
              },
              {
                id: 'u4_biaya' as const,
                num: 4,
                title: 'Kewajaran Biaya / Tarif Pelayanan',
                desc: 'Kewajaran biaya resmi (sesuai PNBP / Bebas biaya & pungli)',
                labels: ['Sangat Mahal', 'Cukup Mahal', 'Murah / Wajar', 'Gratis / Tepat']
              },
              {
                id: 'u5_produk' as const,
                num: 5,
                title: 'Kesesuaian Produk & Standar Pelayanan',
                desc: 'Kesesuaian output hasil layanan dengan janji standar pelayanan',
                labels: ['Tidak Sesuai', 'Kurang Sesuai', 'Sesuai', 'Sangat Sesuai']
              },
              {
                id: 'u6_kompetensi' as const,
                num: 6,
                title: 'Kompetensi & Kemampuan Petugas',
                desc: 'Kecakapan, keahlian, dan penguasaan materi tugas oleh petugas',
                labels: ['Tidak Kompeten', 'Kurang Kompeten', 'Kompeten', 'Sangat Kompeten']
              },
              {
                id: 'u7_perilaku' as const,
                num: 7,
                title: 'Perilaku, Kesopanan & Keramahan Petugas',
                desc: 'Sikap santun, keramahan, dan ketulusan petugas saat melayani',
                labels: ['Tidak Sopan', 'Kurang Sopan', 'Sopan', 'Sangat Ramah']
              },
              {
                id: 'u8_sarpras' as const,
                num: 8,
                title: 'Kualitas Sarana & Prasarana',
                desc: 'Kebersihan, kenyamanan ruang, dan kelengkapan fasilitas layanan',
                labels: ['Tidak Baik', 'Kurang Baik', 'Baik & Layak', 'Sangat Baik']
              },
              {
                id: 'u9_pengaduan' as const,
                num: 9,
                title: 'Penanganan Aduan & Konsultasi',
                desc: 'Respon cepat, kejelasan tindak lanjut, dan solusi atas pengaduan',
                labels: ['Tidak Ada', 'Tidak Berfungsi', 'Cukup Maksimal', 'Sangat Baik']
              }
            ];

            return (
              <div className="max-w-3xl mx-auto space-y-5 animate-in fade-in duration-300">
                
                {/* ── CLEAN MINIMAL HEADER ── */}
                <div className="text-center space-y-1.5 pb-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Survei Kepuasan Masyarakat (SKM)
                  </h2>
                  <p className="text-xs text-white max-w-md mx-auto">
                    Bantu kami meningkatkan kualitas pelayanan publik dengan memberikan penilaian singkat di bawah ini.
                  </p>
                </div>

                {/* ── SUCCESS BANNER ── */}
                {surveySuccessMsg && (
                  <div className="bg-gradient-to-br from-[#0c2847] to-[#061527] border border-emerald-500/40 rounded-2xl p-8 text-center space-y-4 animate-in zoom-in-95 shadow-xl">
                    <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/30">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white">Survei Berhasil Dikirim!</h3>
                      <p className="text-xs text-emerald-300 font-medium">{surveySuccessMsg}</p>
                    </div>
                    <button
                      onClick={() => setSurveySuccessMsg(null)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Kirim Survei Lain
                    </button>
                  </div>
                )}

                {/* ── FORM ── */}
                {!surveySuccessMsg && (
                  <form onSubmit={handleSubmitSurvey} className="space-y-6">
                    
                    {/* ══ STEP 1: COMPACT RESPONDENT PROFILE ══ */}
                    <div className="bg-[#0b203a]/80 border border-white/10 rounded-2xl p-5 shadow-lg space-y-4">
                      <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Data Responden</span>
                        <span className="text-[11px] text-slate-400">Wajib diisi (*)</span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3.5">
                        {/* Nama Lengkap */}
                        <div>
                          <label className="text-[11px] font-semibold text-slate-300 mb-1 block">
                            Nama Lengkap <span className="text-rose-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Budi Santoso"
                            value={surveyForm.nama}
                            onChange={(e) => setSurveyForm({ ...surveyForm, nama: e.target.value })}
                            className="w-full bg-slate-950/70 border border-slate-700/80 focus:border-cyan-400 rounded-xl px-3 py-2 text-white text-xs focus:outline-none transition-colors placeholder-slate-500"
                          />
                        </div>

                        {/* No. WhatsApp / HP */}
                        <div>
                          <label className="text-[11px] font-semibold text-slate-300 mb-1 block">
                            No. WhatsApp / HP <span className="text-rose-400">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="Contoh: 081234567890"
                            value={surveyForm.whatsapp}
                            onChange={(e) => setSurveyForm({ ...surveyForm, whatsapp: e.target.value })}
                            className="w-full bg-slate-950/70 border border-slate-700/80 focus:border-cyan-400 rounded-xl px-3 py-2 text-white text-xs focus:outline-none transition-colors placeholder-slate-500"
                          />
                        </div>

                        {/* Gender (Toggle Pill) */}
                        <div className="sm:col-span-2">
                          <label className="text-[11px] font-semibold text-slate-300 mb-1 block">
                            Jenis Kelamin <span className="text-rose-400">*</span>
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {['Laki-laki', 'Perempuan'].map((g) => {
                              const active = surveyForm.jenis_kelamin === g;
                              return (
                                <button
                                  type="button"
                                  key={g}
                                  onClick={() => setSurveyForm({ ...surveyForm, jenis_kelamin: g })}
                                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                    active
                                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                                  }`}
                                >
                                  {active && <Check className="w-3 h-3 text-cyan-400 stroke-[3]" />}
                                  <span>{g}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Dropdowns in a 3-col grid */}
                        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                          {/* Usia */}
                          <div>
                            <label className="text-[11px] font-semibold text-slate-300 mb-1 block">
                              Rentang Usia <span className="text-rose-400">*</span>
                            </label>
                            <select
                              value={surveyForm.usia}
                              onChange={(e) => setSurveyForm({ ...surveyForm, usia: e.target.value })}
                              className="w-full bg-slate-950/70 border border-slate-700/80 focus:border-cyan-400 rounded-xl px-3 py-2 text-white text-xs focus:outline-none transition-colors cursor-pointer"
                            >
                              <option value="" disabled>Pilih Usia</option>
                              {['15 - 20', '21 - 25', '26 - 30', '31 - 35', '36 - 40', '> 40'].map((a) => (
                                <option key={a} value={a}>{a} Tahun</option>
                              ))}
                            </select>
                          </div>

                          {/* Pendidikan */}
                          <div>
                            <label className="text-[11px] font-semibold text-slate-300 mb-1 block">
                              Pendidikan Terakhir <span className="text-rose-400">*</span>
                            </label>
                            <select
                              value={surveyForm.pendidikan}
                              onChange={(e) => setSurveyForm({ ...surveyForm, pendidikan: e.target.value })}
                              className="w-full bg-slate-950/70 border border-slate-700/80 focus:border-cyan-400 rounded-xl px-3 py-2 text-white text-xs focus:outline-none transition-colors cursor-pointer"
                            >
                              <option value="" disabled>Pilih Pendidikan</option>
                              {['SD', 'SMP', 'SMA / SMK', 'D1 / D2 / D3', 'S1 / D4', 'S2', 'S3'].map((e) => (
                                <option key={e} value={e}>{e}</option>
                              ))}
                            </select>
                          </div>

                          {/* Pekerjaan */}
                          <div>
                            <label className="text-[11px] font-semibold text-slate-300 mb-1 block">
                              Pekerjaan / Profesi <span className="text-rose-400">*</span>
                            </label>
                            <select
                              value={surveyForm.pekerjaan}
                              onChange={(e) => setSurveyForm({ ...surveyForm, pekerjaan: e.target.value })}
                              className="w-full bg-slate-950/70 border border-slate-700/80 focus:border-cyan-400 rounded-xl px-3 py-2 text-white text-xs focus:outline-none transition-colors cursor-pointer"
                            >
                              <option value="" disabled>Pilih Profesi</option>
                              {[
                                { label: 'Nelayan / Petani', val: 'Petani / Nelayan' },
                                { label: 'Wirausaha / Pedagang', val: 'Wirausaha' },
                                { label: 'Karyawan Swasta', val: 'Swasta' },
                                { label: 'PNS / ASN', val: 'PNS' },
                                { label: 'TNI / POLRI', val: 'TNI' },
                                { label: 'BUMN / BUMD', val: 'BUMN / BUMD' },
                                { label: 'Pelajar / Mahasiswa', val: 'Pelajar / Mahasiswa' },
                                { label: 'Tidak Bekerja', val: 'Putus Sekolah / Tidak Bekerja' },
                                { label: 'Lainnya', val: 'Lainnya' }
                              ].map((p) => (
                                <option key={p.val} value={p.val}>{p.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ══ STEP 2: STREAMLINED 9-UNSUR EVALUATION MATRIX ══ */}
                    <div className="bg-[#0b203a]/80 border border-white/10 rounded-2xl p-5 shadow-lg space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Penilaian Pelayanan</span>
                        {/* Rating Legend */}
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400" /> 1: Kurang</span>
                          <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> 2: Cukup</span>
                          <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-400" /> 3: Baik</span>
                          <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> 4: Sangat Baik</span>
                        </div>
                      </div>

                      {/* Clean Matrix Rows */}
                      <div className="divide-y divide-white/5">
                        {UNSUR_LIST.map((q) => {
                          const val = surveyForm[q.id];
                          const selectedLabel = val > 0 ? q.labels[val - 1] : null;

                          return (
                            <div key={q.id} className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                              {/* Question info */}
                              <div className="space-y-0.5 pr-2 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
                                    #{q.num}
                                  </span>
                                  <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                                    {q.title} <span className="text-rose-400">*</span>
                                  </h4>
                                </div>
                                <p className="text-[11px] text-slate-400 pl-6 leading-tight">
                                  {q.desc}
                                </p>
                              </div>

                              {/* 4 Segmented Score Buttons & Active Label */}
                              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center pl-6 sm:pl-0">
                                {selectedLabel && (
                                  <span className="text-[11px] font-bold text-cyan-300 hidden md:inline-block bg-cyan-950/60 px-2 py-0.5 rounded-lg border border-cyan-500/30 animate-in fade-in">
                                    {selectedLabel}
                                  </span>
                                )}
                                <div className="flex bg-slate-950/80 border border-slate-800 p-1 rounded-xl gap-1">
                                  {[1, 2, 3, 4].map((score) => {
                                    const isSelected = val === score;
                                    const optionLabel = q.labels[score - 1];
                                    return (
                                      <button
                                        type="button"
                                        key={score}
                                        onClick={() => setSurveyForm({ ...surveyForm, [q.id]: score })}
                                        title={`${score} - ${optionLabel}`}
                                        className={`w-9 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                                          isSelected
                                            ? 'bg-gradient-to-br from-cyan-400 to-teal-400 text-slate-950 shadow-md scale-105'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-850'
                                        }`}
                                      >
                                        {score}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* ══ STEP 3: KRITIK / SARAN & ACTIONS ══ */}
                    <div className="bg-[#0b203a]/80 border border-white/10 rounded-2xl p-5 shadow-lg space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Kritik & Saran (Opsional)</span>
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Tuliskan masukan atau ulasan pelayanan Anda di sini..."
                        value={surveyForm.kritik_saran}
                        onChange={(e) => setSurveyForm({ ...surveyForm, kritik_saran: e.target.value })}
                        className="w-full bg-slate-950/70 border border-slate-700/80 focus:border-cyan-400 rounded-xl p-3 text-white text-xs focus:outline-none transition-colors placeholder-slate-500 resize-none"
                      />
                    </div>

                    {/* ══ BOTTOM CTA BAR ══ */}
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => setSurveyForm({
                          nama: '',
                          whatsapp: '',
                          jenis_kelamin: '',
                          usia: '',
                          pendidikan: '',
                          pekerjaan: '',
                          u1_persyaratan: 0,
                          u2_prosedur: 0,
                          u3_kecepatan: 0,
                          u4_biaya: 0,
                          u5_produk: 0,
                          u6_kompetensi: 0,
                          u7_perilaku: 0,
                          u8_sarpras: 0,
                          u9_pengaduan: 0,
                          kritik_saran: ''
                        })}
                        className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Reset
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmittingSurvey}
                        className="px-7 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmittingSurvey ? (
                          <>
                            <Clock className="w-3.5 h-3.5 animate-spin" /> Mengirim...
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" /> Kirim Survei SKM
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                )}

              </div>
            );
          })()}
        </section>
      </div>

      {/* Success Modal for Complaint Submission */}
      {submitSuccessTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0b223d] border border-[#6FF3C8]/40 rounded-3xl p-6 md:p-8 max-w-md w-full text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Pengaduan Berhasil Terkirim!</h3>
              <p className="text-xs text-gray-300 mt-2">
                Simpan Nomor Tiket berikut untuk melacak penanganan pengaduan Anda.
              </p>
            </div>

            <div className="p-4 bg-black/50 border border-white/10 rounded-2xl flex items-center justify-between">
              <div className="text-xl font-black text-[#6FF3C8] tracking-widest">{submitSuccessTicket}</div>
              <button
                onClick={() => copyToClipboard(submitSuccessTicket)}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Tersalin' : 'Salin'}
              </button>
            </div>

            {/* WhatsApp Notification Alert Badge */}
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-left flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-200 leading-relaxed">
                <span className="font-semibold text-emerald-300">Notifikasi WhatsApp Terkirim:</span> Bukti tanda terima & link lacak otomatis telah dikirimkan ke nomor WhatsApp Anda & petugas admin kami.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <a
                href={`https://wa.me/${(process.env.NEXT_PUBLIC_HOTLINE_WA || '').replace(/[^0-9]/g, '').replace(/^0/, '62')}?text=${encodeURIComponent(`Halo Admin CDKWB, saya baru saja membuat pengaduan dengan No. Tiket: ${submitSuccessTicket}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-600/20"
              >
                <MessageSquare className="w-4 h-4" />
                Chat WA Admin
              </a>

              <button
                onClick={async () => {
                  const ticket = submitSuccessTicket!;
                  setSubmitSuccessTicket(null);
                  setActiveTab('tracking');
                  setSearchTicket(ticket);
                  setIsSearching(true);
                  setTrackingError(null);
                  setTicketResult(null);
                  try {
                    const res = await fetch(`/api/pengaduan?ticket=${encodeURIComponent(ticket)}`);
                    const data = await res.json();
                    if (data.success && data.data && data.data.length > 0) {
                      setTicketResult(data.data[0]);
                    } else {
                      setTrackingError(`Tiket "${ticket}" tidak ditemukan.`);
                    }
                  } catch {
                    setTrackingError('Gagal melakukan pencarian tiket.');
                  } finally {
                    setIsSearching(false);
                  }
                }}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs transition-colors"
              >
                Lacak Tiket
              </button>

              <button
                onClick={() => setSubmitSuccessTicket(null)}
                className="py-3 px-4 bg-white/10 hover:bg-white/20 text-gray-300 font-semibold rounded-xl text-xs transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification — always visible at bottom of screen */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3.5 bg-red-600 text-white text-sm font-medium rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 max-w-sm w-full">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      <Footer />
    </div>
  );
}
