"use client";

import React from 'react';
import { X, PlayCircle, Video } from 'lucide-react';

interface DaftarAkunModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DaftarAkunModal({ isOpen, onClose }: DaftarAkunModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-950/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="bg-blue-600 p-6 flex justify-between items-center relative shrink-0">
          <h3 className="text-2xl font-black text-white flex items-center gap-3">
            <PlayCircle className="w-8 h-8 text-yellow-300" />
            Cara Daftar Akun E-SLO
          </h3>
          <button onClick={onClose} className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors active:scale-95">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-gray-50 flex flex-col items-center justify-center min-h-[50vh]">
          
          <div className="bg-blue-900 rounded-2xl overflow-hidden shadow-xl w-full relative aspect-video flex flex-col items-center justify-center text-white p-8 text-center border-4 border-blue-200">
            <Video className="w-20 h-20 text-blue-300 mb-6 opacity-80 animate-pulse" />
            <h3 className="text-2xl font-bold mb-4">Video Cara Daftar Akun</h3>
            <p className="text-lg text-blue-200 max-w-lg">
              (Video tutorial sedang dalam tahap pembuatan. Nantinya video ini akan memandu Anda langkah demi langkah.)
            </p>
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
