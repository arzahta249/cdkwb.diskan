import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Accordion from '@/components/Accordion';
import { Building2, Shield, Leaf, Target, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Tugas Pokok & Fungsi - CDKWB',
};

export default function TugasPokokPage() {
  const landasanHukum = [
    {
      title: "Peraturan Gubernur Jawa Tengah Nomor 80 Tahun 2023",
      content: "Tentang Kedudukan, Susunan Organisasi, Tugas Pokok, Fungsi, Tata Kerja, dan Uraian Tugas Jabatan Cabang Dinas Kelautan Wilayah Barat pada Dinas Kelautan dan Perikanan Provinsi Jawa Tengah."
    },
    {
      title: "Undang-Undang Republik Indonesia Nomor 23 Tahun 2014",
      content: "Tentang Pemerintahan Daerah yang mengatur pembagian urusan pemerintahan di bidang kelautan dan perikanan antara Pemerintah Pusat dan Pemerintah Provinsi."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-cyan-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[#001e36] pt-32 pb-40 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-cyan-900/40 to-transparent opacity-60 mix-blend-screen"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-blue-900/50 to-transparent opacity-60 mix-blend-screen"></div>
          <div 
            className="absolute inset-0 opacity-15 bg-[length:60px_60px]"
            style={{ backgroundImage: "radial-gradient(circle at center, white 1px, transparent 1px)" }}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-sm font-semibold mb-8 backdrop-blur-md">
            <Target className="w-4 h-4" /> Visi & Misi Strategis
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Tugas Pokok & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Fungsi</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-light">
            Menjamin pengelolaan ruang laut dan kawasan pesisir yang tertib, berkelanjutan, dan berkeadilan melalui pengawasan terpadu.
          </p>
        </div>

        {/* Diagonal Cut */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-slate-50">
            <path d="M0 120L1440 0V120H0Z" fill="currentColor"/>
          </svg>
        </div>
      </section>

      {/* Tiga Pilar Layanan - Interactive 3D Cards */}
      <section className="py-24 -mt-20 relative z-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Pilar 1 */}
            <div className="group relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_20px_40px_rgb(59,130,246,0.1)] transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150 group-hover:bg-blue-600"></div>
              
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-blue-100 flex items-center justify-center mb-8 relative z-10 group-hover:border-transparent transition-colors duration-500">
                <Building2 className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-900 transition-colors">Sub Bagian Tata Usaha</h3>
              <p className="text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
                Melaksanakan urusan ketatausahaan, kepegawaian, keuangan, perlengkapan, dan rumah tangga Cabang Dinas untuk menunjang operasional pengawasan dan pelayanan publik.
              </p>
              
              <div className="mt-8 flex items-center text-blue-600 font-semibold text-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Pelajari Fungsi <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>

            {/* Pilar 2 */}
            <div className="group relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_20px_40px_rgb(6,182,212,0.1)] transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-100 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150 group-hover:bg-cyan-500"></div>
              
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-cyan-100 flex items-center justify-center mb-8 relative z-10 group-hover:border-transparent transition-colors duration-500">
                <Shield className="w-10 h-10 text-cyan-600" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-cyan-950 transition-colors">Seksi Pengawasan Kelautan</h3>
              <p className="text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
                Melaksanakan penyiapan bahan pengawasan, pengendalian, dan penindakan pelanggaran di bidang kelautan dan perikanan. Menjamin kepatuhan hukum perairan Jawa Tengah.
              </p>
              
              <div className="mt-8 flex items-center text-cyan-600 font-semibold text-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Lihat Prosedur <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>

            {/* Pilar 3 */}
            <div className="group relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_20px_40px_rgb(16,185,129,0.1)] transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150 group-hover:bg-emerald-500"></div>
              
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-emerald-100 flex items-center justify-center mb-8 relative z-10 group-hover:border-transparent transition-colors duration-500">
                <Leaf className="w-10 h-10 text-emerald-600" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-emerald-950 transition-colors">Seksi Pelayanan Konservasi</h3>
              <p className="text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
                Melaksanakan penyiapan bahan pelayanan, pembinaan, pelestarian, dan rehabilitasi ekosistem pesisir dan laut demi keberlanjutan sumber daya maritim masa depan.
              </p>
              
              <div className="mt-8 flex items-center text-emerald-600 font-semibold text-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Eksplorasi Program <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Landasan Hukum - Glassmorphism Accordion Container */}
      <section className="py-24 bg-white relative">
        <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none"></div>
        
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Landasan Hukum</h2>
            <p className="text-slate-500 text-lg">Dasar pijakan operasional dan legalitas institusi.</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <Accordion items={landasanHukum} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
