"use client";

import React, { useState } from 'react';
import { 
  Volume2, 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  CreditCard, 
  User, 
  Users, 
  MapPin, 
  Mail, 
  UserCheck, 
  Ship, 
  FileText, 
  CheckCircle2
} from 'lucide-react';

const steps = [
  {
    id: 'nib',
    label: 'Nomor Induk Berusaha (NIB)',
    spokenText: 'Silakan ketik Nomor Induk Berusaha atau N I B Anda di kotak yang tersedia.',
    icon: <CreditCard className="w-16 h-16 text-blue-500 mb-4" />,
    placeholder: 'Contoh: 1234567890123',
    type: 'text'
  },
  {
    id: 'namaPemilik',
    label: 'Nama Pemilik Kapal',
    spokenText: 'Ketik nama lengkap pemilik kapal.',
    icon: <User className="w-16 h-16 text-blue-500 mb-4" />,
    placeholder: 'Masukkan Nama Pemilik',
    type: 'text'
  },
  {
    id: 'namaPenanggungjawab',
    label: 'Nama Penanggungjawab',
    spokenText: 'Ketik nama penanggungjawab.',
    icon: <Users className="w-16 h-16 text-blue-500 mb-4" />,
    placeholder: 'Masukkan Nama Penanggungjawab',
    type: 'text'
  },
  {
    id: 'alamatPemilik',
    label: 'Alamat Pemilik',
    spokenText: 'Ketik alamat lengkap tempat tinggal pemilik.',
    icon: <MapPin className="w-16 h-16 text-blue-500 mb-4" />,
    placeholder: 'Masukkan Alamat Lengkap',
    type: 'textarea'
  },
  {
    id: 'email',
    label: 'Alamat Email',
    spokenText: 'Ketik alamat email Anda, atau biarkan kosong jika tidak punya.',
    icon: <Mail className="w-16 h-16 text-blue-500 mb-4" />,
    placeholder: 'Contoh: nama@gmail.com',
    type: 'email'
  },
  {
    id: 'namaLengkap',
    label: 'Nama Lengkap Pemohon',
    spokenText: 'Ketik nama lengkap Anda sebagai pemohon bantuan ini.',
    icon: <UserCheck className="w-16 h-16 text-blue-500 mb-4" />,
    placeholder: 'Masukkan Nama Pemohon',
    type: 'text'
  },
  {
    id: 'kapasitas',
    label: 'Kapasitas (sebagai apa)',
    spokenText: 'Pilih kapasitas atau peran Anda dari daftar yang tersedia.',
    icon: <Ship className="w-16 h-16 text-blue-500 mb-4" />,
    placeholder: 'Pilih Kapasitas',
    type: 'select',
    options: ['Pemilik Kapal', 'Nakhoda', 'Pengurus', 'Lainnya']
  },
  {
    id: 'siup',
    label: 'Nomor SIUP',
    spokenText: 'Ketik nomor S I U P yang tertera pada dokumen Anda.',
    icon: <FileText className="w-16 h-16 text-blue-500 mb-4" />,
    placeholder: 'Masukkan Nomor SIUP',
    type: 'text'
  }
];

export default function EsloForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({
    nib: '',
    namaPemilik: '',
    namaPenanggungjawab: '',
    alamatPemilik: '',
    email: '',
    namaLengkap: '',
    kapasitas: '',
    siup: ''
  });

  const isLastStep = currentStep === steps.length;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [steps[currentStep].id]: e.target.value
    });
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Maaf, perangkat Anda tidak mendukung fitur suara.');
    }
  };

  const sendToWhatsApp = () => {
    const adminNumber = "628971574040"; // No WA Admin
    const message = `Halo Admin Dinas Kelautan,\n\nMohon bantuannya untuk mendaftarkan akun e-SLO dengan data berikut:\n
*NIB:* ${formData.nib || '-'}
*Nama Pemilik:* ${formData.namaPemilik || '-'}
*Nama Penanggungjawab:* ${formData.namaPenanggungjawab || '-'}
*Alamat Pemilik:* ${formData.alamatPemilik || '-'}
*Email:* ${formData.email || '-'}
*Nama Lengkap Pemohon:* ${formData.namaLengkap || '-'}
*Kapasitas:* ${formData.kapasitas || '-'}
*Nomor SIUP:* ${formData.siup || '-'}

Terima kasih atas bantuannya.`;
    
    const waUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  if (isLastStep) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full border-4 border-green-500">
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 className="w-24 h-24 text-green-500 mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Semua Data Sudah Terisi</h2>
          <p className="text-xl text-gray-600 mb-8">
            Tekan tombol di bawah ini untuk mengirim data Anda ke petugas kami melalui WhatsApp. Petugas akan membantu Anda membuat akun e-SLO secara GRATIS.
          </p>
          
          <button 
            onClick={sendToWhatsApp}
            className="flex items-center justify-center w-full gap-4 bg-green-500 hover:bg-green-600 text-white p-6 rounded-xl text-2xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Send className="w-8 h-8" />
            Kirim via WhatsApp
          </button>
          
          <button 
            onClick={handlePrev}
            className="mt-6 text-blue-600 text-lg font-medium hover:underline p-2"
          >
            Kembali untuk perbaiki data
          </button>
        </div>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl w-full border border-gray-100">
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-gray-500">Langkah {currentStep + 1} dari {steps.length}</span>
          <span className="text-sm font-bold text-blue-600">{Math.round(((currentStep + 1) / steps.length) * 100)}% Selesai</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex flex-col items-center text-center mb-8">
        {step.icon}
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6">{step.label}</h2>
        
        {/* Tombol Suara */}
        <button 
          onClick={() => speak(step.spokenText)}
          className="flex items-center gap-3 bg-blue-100 hover:bg-blue-200 text-blue-800 px-6 py-4 rounded-full font-bold text-lg transition-colors border-2 border-blue-300 shadow-sm"
          aria-label="Bacakan teks ini"
        >
          <Volume2 className="w-7 h-7" />
          Dengarkan Suara
        </button>
      </div>

      {/* Input Area */}
      <div className="mb-10">
        {step.type === 'textarea' ? (
          <textarea
            className="w-full p-6 text-xl border-4 border-gray-300 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all bg-gray-50 min-h-[150px]"
            placeholder={step.placeholder}
            value={formData[step.id]}
            onChange={handleChange}
          />
        ) : step.type === 'select' ? (
          <select
            className="w-full p-6 text-xl border-4 border-gray-300 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all bg-gray-50"
            value={formData[step.id]}
            onChange={handleChange}
          >
            <option value="">-- Pilih --</option>
            {step.options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input
            type={step.type}
            className="w-full p-6 text-xl border-4 border-gray-300 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all bg-gray-50"
            placeholder={step.placeholder}
            value={formData[step.id]}
            onChange={handleChange}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4">
        <button 
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-6 py-4 rounded-xl text-lg font-bold transition-all
            ${currentStep === 0 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="hidden sm:inline">Kembali</span>
        </button>
        
        <button 
          onClick={handleNext}
          className="flex flex-1 items-center justify-center gap-2 px-8 py-5 rounded-xl text-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          Selanjutnya
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
}
