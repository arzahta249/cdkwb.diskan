"use client";

import React from 'react';
import { X, Ship, ShieldCheck } from 'lucide-react';
import EsloForm from './EsloForm';

interface AjukanIzinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AjukanIzinModal({ isOpen, onClose }: AjukanIzinModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-950/80 z-[999] flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-blue-600 p-6 flex justify-between items-center relative shrink-0">
          <h3 className="text-2xl font-black text-white flex items-center gap-3">
            <Ship className="w-8 h-8 text-yellow-300" />
            Bantuan Ajukan Izin E-SLO
          </h3>
          <button onClick={onClose} className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors active:scale-95">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-1 bg-gray-50">
          
          <div className="bg-green-100 border-l-4 border-green-500 rounded-r-xl p-4 flex items-start gap-3 shadow-sm mb-6">
            <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-green-800 text-lg">Layanan 100% GRATIS!</h4>
              <p className="text-green-700 text-sm mt-1">
                Pengajuan izin e-SLO tidak dipungut biaya apapun. Isi data di bawah, dan petugas kami akan membantu memprosesnya secara gratis.
              </p>
            </div>
          </div>

          <EsloForm />
          
        </div>
        
      </div>
    </div>
  );
}
