"use client";

import React from 'react';
import { X, FileText, CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface SimulasiEsloModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SimulasiEsloModal({ isOpen, onClose }: SimulasiEsloModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-950/80 z-[999] flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-blue-600 p-6 flex justify-between items-center relative shrink-0">
          <h3 className="text-2xl font-black text-white flex items-center gap-3">
            <FileText className="w-8 h-8 text-yellow-300" />
            Persyaratan E-SLO
          </h3>
          <button onClick={onClose} className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors active:scale-95">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8">
          <p className="text-slate-600 font-medium text-lg">
            Berikut adalah contoh bentuk fisik dokumen yang harus Bapak/Ibu siapkan sebelum mendaftar E-SLO:
          </p>
          
          {/* KTP */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <div className="relative w-full max-w-[280px] shrink-0 rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white">
              <img src="/eslo/ktp.svg" alt="Contoh Fisik KTP" className="w-full h-auto object-contain" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h4 className="text-xl font-bold text-slate-800">KTP (Kartu Tanda Penduduk)</h4>
              </div>
              <p className="text-slate-600">Siapkan KTP asli Bapak/Ibu. Anda akan diminta untuk memfoto KTP ini dan memasukkan Nomor Induk Kependudukan (NIK).</p>
            </div>
          </div>
          
          {/* NIB */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <div className="relative w-full max-w-[280px] shrink-0 rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white">
              <img src="/eslo/nib.svg" alt="Contoh Fisik NIB" className="w-full h-auto object-contain" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h4 className="text-xl font-bold text-slate-800">NIB (Nomor Induk Berusaha)</h4>
              </div>
              <p className="text-slate-600">Sebuah lembar sertifikat resmi dari pemerintah (OSS). Biasa dicetak di kertas HVS dan memiliki lambang Garuda serta barcode. Siapkan lembar ini untuk mengisi Nomor NIB.</p>
            </div>
          </div>

          {/* SIUP */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <div className="relative w-full max-w-[280px] shrink-0 rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white">
              <img src="/eslo/siup.svg" alt="Contoh Dokumen SIUP" className="w-full h-auto object-contain" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h4 className="text-xl font-bold text-slate-800">SIUP / Izin Kapal</h4>
              </div>
              <p className="text-slate-600">Surat Izin Usaha Perikanan atau lembar pas kapal Anda. Dokumen resmi berstempel ini wajib disiapkan untuk mengisi Nomor SIUP di pendaftaran.</p>
            </div>
          </div>

        </div>
        
        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 shrink-0">
          <button 
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold p-4 rounded-xl shadow-lg transition-all active:scale-95"
          >
            SAYA MENGERTI
          </button>
        </div>
      </div>
    </div>
  );
}
