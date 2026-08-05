import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { User, ShieldCheck, Waves, Anchor, Navigation } from 'lucide-react';

export const metadata = {
  title: 'Struktur Organisasi - CDKWB',
};

export default function StrukturOrganisasiPage() {
  const pejabatList = [
    {
      no: 1,
      nama: "SIWI HADI PURNANTO, S.Pi, M.Sc",
      nip: "19801128 200903 1 006",
      jabatan: "Kepala Cabang Dinas Kelautan Wilayah Barat",
      role: "Pimpinan Utama",
      badgeColor: "bg-gradient-to-r from-blue-600 to-cyan-500",
      icon: <Navigation className="w-6 h-6 text-white" />
    },
    {
      no: 2,
      nama: "SAMUEL JATI JIWO KUSUMO, S.I.Kom, MM",
      nip: "19860220 201101 1 009",
      jabatan: "Kepala Subbagian Tata Usaha",
      role: "Administrasi & Operasional",
      badgeColor: "bg-gradient-to-r from-emerald-500 to-teal-400",
      icon: <User className="w-6 h-6 text-white" />
    },
    {
      no: 3,
      nama: "DWI DJOKO ANTORO, S.Pi",
      nip: "19710630 200604 1 002",
      jabatan: "Kepala Seksi Pengawasan Kelautan",
      role: "Keamanan & Pengawasan",
      badgeColor: "bg-gradient-to-r from-amber-500 to-orange-400",
      icon: <ShieldCheck className="w-6 h-6 text-white" />
    },
    {
      no: 4,
      nama: "DWI RACHMANTO, S.Kel., M.Sc.",
      nip: "19840607 200903 1 004",
      jabatan: "Kepala Seksi Konservasi dan Rehabilitasi",
      role: "Pelestarian Lingkungan",
      badgeColor: "bg-gradient-to-r from-purple-600 to-indigo-500",
      icon: <Waves className="w-6 h-6 text-white" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800 selection:bg-cyan-500 selection:text-white">
      <Navbar />

      {/* Hero Section with Dynamic Waves */}
      <section className="relative bg-[#001e36] pt-32 pb-40 overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob"></div>
          <div className="absolute top-24 -right-24 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>
          <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
            style={{ backgroundImage: "url('/leading/latar%20belakang.png')" }}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-cyan-300 text-sm font-semibold mb-6 tracking-wide uppercase">
            <Anchor className="w-4 h-4" /> Komando Kelautan
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-200 mb-6 drop-shadow-sm">
            Struktur Organisasi
          </h1>
          <p className="text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto font-light leading-relaxed">
            Menyelaraskan visi maritim melalui kepemimpinan yang tangguh dan struktur yang adaptif di Cabang Dinas Kelautan Wilayah Barat.
          </p>
        </div>

        {/* Liquid Bottom Curve */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-slate-50">
            <path d="M0 120H1440V0C1440 0 1140.5 89.5 720 89.5C299.5 89.5 0 0 0 0V120Z" fill="currentColor"/>
          </svg>
        </div>
      </section>

      {/* Bagan Organisasi - Parallax Feel */}
      <section className="py-20 -mt-20 relative z-20">
        <div className="container mx-auto px-6">
          <div className="relative max-w-6xl mx-auto bg-white/80 backdrop-blur-xl rounded-[2rem] p-4 md:p-8 shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-white group transition-transform duration-700 hover:shadow-[0_30px_60px_rgb(6,182,212,0.1)] hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-blue-50/30 rounded-[2rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative w-full rounded-2xl overflow-hidden bg-white ring-1 ring-gray-100 shadow-inner">
              <Image 
                src="/leading/struktur cdkwb.jpg" 
                alt="Bagan Struktur Organisasi CDKWB" 
                width={1200}
                height={800}
                className="w-full h-auto object-contain scale-[0.98] group-hover:scale-100 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Bento Grid untuk Pejabat */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Dekorasi */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-blue-50 to-transparent rounded-full opacity-50 -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none"></div>
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Jajaran Kepemimpinan</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg">Individu-individu berdedikasi yang mengemban amanah memajukan sektor kelautan Jawa Tengah.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pejabatList.map((pejabat, idx) => (
              <div 
                key={pejabat.no} 
                className={`group relative rounded-[2rem] p-1 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${idx === 0 ? 'lg:col-span-4 max-w-2xl mx-auto w-full' : ''}`}
              >
                {/* Animated Gradient Border */}
                <div className={`absolute inset-0 rounded-[2rem] opacity-70 group-hover:opacity-100 transition-opacity duration-500 ${pejabat.badgeColor}`}></div>
                
                {/* Inner Card */}
                <div className="relative h-full bg-white/95 backdrop-blur-xl rounded-[1.85rem] p-8 flex flex-col items-center text-center">
                  
                  {/* Icon Avatar */}
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-inner mb-6 ${pejabat.badgeColor} transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                    {pejabat.icon}
                  </div>
                  
                  {/* Role Badge */}
                  <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest mb-4 group-hover:bg-slate-800 group-hover:text-white transition-colors duration-300">
                    {pejabat.role}
                  </div>
                  
                  {/* Info */}
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-blue-600 transition-all">
                    {pejabat.nama}
                  </h3>
                  <p className="text-sm font-medium text-slate-600 mb-4 flex-grow">{pejabat.jabatan}</p>
                  
                  {/* NIP */}
                  <div className="w-full pt-4 border-t border-slate-100 mt-auto">
                    <p className="text-xs font-mono text-slate-400">NIP. {pejabat.nip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
