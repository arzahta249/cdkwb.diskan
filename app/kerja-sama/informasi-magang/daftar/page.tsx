"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Send, CheckCircle2, FileText, ArrowLeft, LogOut, ShieldCheck, Upload } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function DaftarMagangPage() {
  const { data: session, status: sessionStatus } = useSession();
  const searchParams = useSearchParams();
  const initialPosisi = searchParams.get('posisi') || '';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    universitas: '',
    jurusan: '',
    posisi: initialPosisi,
    nomor_ponsel: '',
    domisili: '',
    motivasi_cv: ''
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [appStatus, setAppStatus] = useState<'loading' | 'can_apply' | 'pending'>('loading');

  useEffect(() => {
    if (session?.user?.email) {
      setFormData((prev) => ({
        ...prev,
        nama: session.user?.name || prev.nama,
        email: session.user?.email || prev.email,
      }));
      checkApplicationStatus(session.user.email);
    }
  }, [session]);

  const checkApplicationStatus = async (email: string) => {
    try {
      const res = await fetch(`/api/magang/status?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.status === 'pending') {
        setAppStatus('pending');
      } else {
        setAppStatus('can_apply');
      }
    } catch (error) {
      setAppStatus('can_apply'); // Fallback
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    try {
      const formPayload = new FormData();
      formPayload.append('nama', formData.nama);
      formPayload.append('email', formData.email);
      formPayload.append('universitas', formData.universitas);
      formPayload.append('jurusan', formData.jurusan);
      formPayload.append('posisi', formData.posisi);
      formPayload.append('nomor_ponsel', formData.nomor_ponsel);
      formPayload.append('domisili', formData.domisili);
      formPayload.append('motivasi_cv', formData.motivasi_cv);
      
      if (cvFile) {
        formPayload.append('cv_file', cvFile);
      }

      const res = await fetch('/api/magang', {
        method: 'POST',
        // Note: When sending FormData, DO NOT set Content-Type header. 
        // The browser will automatically set it to multipart/form-data with the correct boundary.
        body: formPayload
      });

      if (res.ok) {
        setSubmitStatus('success');
        setAppStatus('pending'); // User has just applied
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  if (sessionStatus === 'loading') {
    return (
      <div className="min-h-screen bg-[#010b14] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#010b14] text-slate-200 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        <Link href="/kerja-sama/informasi-magang" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Info Magang
        </Link>

        {sessionStatus === 'unauthenticated' ? (
          <div className="bg-[#021a33] border border-cyan-900/50 rounded-3xl p-12 text-center shadow-2xl">
            <div className="w-20 h-20 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-10 h-10 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Akses Terbatas</h2>
            <p className="text-blue-100/70 mb-8 max-w-lg mx-auto leading-relaxed">
              Untuk melanjutkan proses pendaftaran kadet magang, Anda diwajibkan untuk masuk menggunakan akun Google Anda terlebih dahulu.
            </p>
            <button 
              onClick={() => signIn('google')}
              className="bg-white text-gray-800 font-bold px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors inline-flex items-center gap-3 shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Login dengan Google
            </button>
          </div>
        ) : (
          <div className="bg-[#021a33] border border-cyan-900/50 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FileText className="text-cyan-400" /> Formulir Pendaftaran Kadet
              </h2>
              <div className="flex items-center gap-3 bg-[#010b14] px-4 py-2 rounded-full border border-cyan-900/30">
                <img src={session?.user?.image || ''} alt="Profile" className="w-8 h-8 rounded-full" />
                <div className="text-sm">
                  <p className="text-white font-medium leading-none">{session?.user?.name}</p>
                  <p className="text-slate-400 text-xs">{session?.user?.email}</p>
                </div>
                <button onClick={() => signOut()} className="ml-2 text-rose-400 hover:text-rose-300" title="Logout">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {appStatus === 'loading' ? (
              <div className="py-12 text-center text-slate-400">Memeriksa status pendaftaran Anda...</div>
            ) : appStatus === 'pending' ? (
              <div className="bg-blue-900/20 border border-blue-500/50 p-8 rounded-2xl text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="text-xl font-bold text-blue-300 mb-2">Pendaftaran Sedang Diproses</h4>
                <p className="text-blue-100/70 max-w-md mx-auto">
                  Anda sudah mendaftar dan data Anda sedang dalam proses peninjauan oleh tim admin kami. Anda hanya dapat mendaftar kembali jika lamaran sebelumnya telah disetujui atau ditolak.
                </p>
              </div>
            ) : submitStatus === 'success' ? (
              <div className="bg-emerald-500/20 border border-emerald-500/50 p-8 rounded-2xl text-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-emerald-300 mb-2">Pendaftaran Berhasil Terkirim!</h4>
                <p className="text-emerald-100/70 max-w-md mx-auto">
                  Data Anda telah kami terima. Tim HR CDKWB akan segera meninjau lamaran Anda. Status terbaru akan diperbarui pada halaman ini atau melalui email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">Nama Lengkap</label>
                    <input type="text" name="nama" required value={formData.nama} onChange={handleChange} readOnly className="w-full bg-[#010b14]/50 border border-cyan-900/50 rounded-xl px-4 py-3 text-slate-400 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">Email Aktif</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} readOnly className="w-full bg-[#010b14]/50 border border-cyan-900/50 rounded-xl px-4 py-3 text-slate-400 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">Asal Universitas / Institusi</label>
                    <input type="text" name="universitas" required value={formData.universitas} onChange={handleChange} className="w-full bg-[#010b14] border border-cyan-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" placeholder="Contoh: Universitas Diponegoro" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">Program Studi / Jurusan</label>
                    <input type="text" name="jurusan" required value={formData.jurusan} onChange={handleChange} className="w-full bg-[#010b14] border border-cyan-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" placeholder="Contoh: Ilmu Kelautan" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">Nomor Ponsel (WhatsApp Aktif)</label>
                    <input type="tel" name="nomor_ponsel" required value={formData.nomor_ponsel} onChange={handleChange} className="w-full bg-[#010b14] border border-cyan-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" placeholder="Contoh: 081234567890" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">Alamat Domisili</label>
                    <input type="text" name="domisili" required value={formData.domisili} onChange={handleChange} className="w-full bg-[#010b14] border border-cyan-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" placeholder="Contoh: Semarang, Jawa Tengah" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Pilihan Posisi</label>
                  <select name="posisi" required value={formData.posisi} onChange={handleChange} className="w-full bg-[#010b14] border border-cyan-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all appearance-none">
                    <option value="" disabled>-- Pilih Divisi / Posisi --</option>
                    <option value="Konservasi">Konservasi</option>
                    <option value="Pengawasan">Pengawasan</option>
                    <option value="Staf IT">Staf IT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Deskripsi Diri / Motivasi Magang</label>
                  <textarea name="motivasi_cv" required value={formData.motivasi_cv} onChange={handleChange} rows={4} className="w-full bg-[#010b14] border border-cyan-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" placeholder="Ceritakan motivasi Anda mengikuti magang ini..."></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Unggah Berkas CV (PDF/Gambar)</label>
                  <div 
                    className="w-full border-2 border-dashed border-cyan-900/50 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-cyan-500/50 transition-colors bg-[#010b14]"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,image/*"
                      className="hidden" 
                    />
                    <Upload className="w-10 h-10 text-cyan-500 mb-3" />
                    {cvFile ? (
                      <div className="text-emerald-400 font-medium">
                        File terpilih: {cvFile.name}
                      </div>
                    ) : (
                      <>
                        <p className="text-white font-medium mb-1">Klik untuk memilih file CV Anda</p>
                        <p className="text-slate-400 text-xs">Maksimal 5MB. Format: PDF, JPG, PNG</p>
                      </>
                    )}
                  </div>
                </div>

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-xl text-sm">
                    Terjadi kesalahan saat mengirim pendaftaran. Silakan coba lagi.
                  </div>
                )}

                <button type="submit" disabled={submitStatus === 'loading' || !cvFile} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] disabled:opacity-70 disabled:cursor-not-allowed mt-4">
                  {submitStatus === 'loading' ? 'Mengirim Data...' : (
                    <>
                      <Send className="w-5 h-5" /> Kirim Pendaftaran
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
