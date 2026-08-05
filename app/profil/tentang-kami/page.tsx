import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Anchor, Wheat, Leaf, MapPin, Handshake, Users, Scale, ShieldCheck, HeartHandshake, Zap, BookOpen, Navigation, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Tentang Kami - CDKWB',
};

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[#001e36] pt-32 pb-40 overflow-hidden">
        {/* Dynamic Abstract Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-cyan-900/40 via-[#001e36] to-blue-900/40 opacity-80 animate-spin-slow"></div>
          <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
            style={{ backgroundImage: "url('/leading/latar%20belakang.png')" }}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-8 backdrop-blur-md">
            <Navigation className="w-4 h-4" /> Eksplorasi Lebih Dalam
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
            Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Kami</span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-light">
            Mengelola dan mengawasi wilayah maritim dengan integritas, inovasi, dan dedikasi untuk ekosistem yang berkelanjutan.
          </p>
        </div>

        {/* Soft Wave Transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-white">
            <path d="M0 120H1440V0C1440 0 1140.5 89.5 720 89.5C299.5 89.5 0 0 0 0V120Z" fill="currentColor"/>
          </svg>
        </div>
      </section>

      {/* Visual Storytelling: Sejarah */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-5/12 group perspective">
              <div className="relative h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-700 transform-gpu group-hover:rotate-y-6 group-hover:rotate-x-2">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: "url('/leading/latar%20belakang.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001e36] via-[#001e36]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-10 text-white">
                  <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30">
                    <Anchor className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-bold mb-3">Jejak Maritim</h3>
                  <p className="text-slate-300 font-light text-sm">Menjaga laut sejak 2005.</p>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-7/12">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider mb-6">
                Sejarah & Latar Belakang
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
                Dedikasi untuk <br/> <span className="text-blue-600">Laut Jawa Tengah</span>
              </h2>
              
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg font-light border-l-4 border-cyan-500 pl-6 mb-8">
                <p>
                  Sebagai garda terdepan pelestarian laut, Cabang Dinas Kelautan Wilayah Barat berkomitmen penuh mengawal keberlanjutan sumber daya maritim.
                </p>
              </div>
              
              <div className="space-y-6 text-slate-500 leading-relaxed text-base">
                <p>
                  Perjalanan kami dimulai dari sebuah kesadaran bahwa laut bukanlah pemisah, melainkan penghubung denyut nadi ekonomi dan ekologi. Melalui kolaborasi antar instansi, kami terus berinovasi dalam pengawasan dan pemberdayaan masyarakat pesisir.
                </p>
                <p>
                  Kami meyakini bahwa teknologi modern yang dipadukan dengan kearifan lokal akan menciptakan ekosistem pesisir yang tidak hanya aman dari pelanggaran, tetapi juga produktif secara ekonomi.
                </p>
              </div>
              
              <button className="mt-10 inline-flex items-center gap-2 text-blue-600 font-bold hover:text-cyan-600 transition-colors group">
                Baca Selengkapnya 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi - Floating Glass Cards */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[500px] bg-gradient-to-b from-transparent via-cyan-100/50 to-transparent -translate-y-1/2 -skew-y-6 z-0"></div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Visi & Misi</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-20 text-lg">
            Membangun ekosistem kelautan dan perikanan yang tangguh melalui pendekatan holistik dan berkelanjutan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:bg-blue-600 hover:shadow-[0_20px_40px_rgba(37,99,235,0.2)] transition-all duration-500 hover:-translate-y-3">
              <div className="w-20 h-20 bg-blue-50 group-hover:bg-blue-500/50 rounded-2xl flex items-center justify-center mb-8 mx-auto transition-colors duration-500">
                <ShieldCheck className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-white mb-4 transition-colors duration-500">Keamanan Maritim</h3>
              <p className="text-slate-500 group-hover:text-blue-100 leading-relaxed transition-colors duration-500">
                Menjaga stabilitas dan kedaulatan sumber daya laut dengan pengawasan yang ketat dan teknologi terkini.
              </p>
            </div>

            <div className="group bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:bg-emerald-600 hover:shadow-[0_20px_40px_rgba(5,150,105,0.2)] transition-all duration-500 hover:-translate-y-3 md:translate-y-6 hover:md:translate-y-3">
              <div className="w-20 h-20 bg-emerald-50 group-hover:bg-emerald-500/50 rounded-2xl flex items-center justify-center mb-8 mx-auto transition-colors duration-500">
                <Wheat className="w-10 h-10 text-emerald-600 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-white mb-4 transition-colors duration-500">Ketahanan Pangan</h3>
              <p className="text-slate-500 group-hover:text-emerald-100 leading-relaxed transition-colors duration-500">
                Mengoptimalkan potensi perikanan berkelanjutan untuk mendukung ketersediaan pangan nasional berkualitas.
              </p>
            </div>

            <div className="group bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:bg-cyan-500 hover:shadow-[0_20px_40px_rgba(6,182,212,0.2)] transition-all duration-500 hover:-translate-y-3">
              <div className="w-20 h-20 bg-cyan-50 group-hover:bg-cyan-400/50 rounded-2xl flex items-center justify-center mb-8 mx-auto transition-colors duration-500">
                <Leaf className="w-10 h-10 text-cyan-600 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-white mb-4 transition-colors duration-500">Ekologi Berkelanjutan</h3>
              <p className="text-slate-500 group-hover:text-cyan-50 leading-relaxed transition-colors duration-500">
                Melestarikan ekosistem pesisir dan laut melalui praktik ramah lingkungan dan inovasi hijau terkini.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai Organisasi - Bento Grid BerAKHLAK */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">Core Values</h2>
              <p className="text-slate-500 text-lg">Nilai Dasar ASN BerAKHLAK yang menjadi pedoman kami.</p>
            </div>
            <div className="text-2xl font-black text-slate-200 tracking-widest uppercase">
              BerAKHLAK
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
            {/* Bento 1: Berorientasi Pelayanan (Large) */}
            <div className="group md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#001e36] to-blue-900 rounded-[2rem] p-10 relative overflow-hidden flex flex-col justify-end hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-500">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-cyan-500 rounded-full mix-blend-screen filter blur-[60px] opacity-40 group-hover:scale-150 group-hover:opacity-60 transition-all duration-700"></div>
              <Handshake className="absolute top-8 right-8 w-20 h-20 text-white/10 group-hover:text-white/20 group-hover:rotate-12 transition-all duration-500" strokeWidth={1} />
              
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">B</div>
                <h3 className="text-4xl font-bold text-white mb-4">Berorientasi<br/>Pelayanan</h3>
                <p className="text-blue-100 max-w-sm text-lg font-light">Berkomitmen memberikan pelayanan prima demi kepuasan masyarakat maritim.</p>
              </div>
            </div>
            
            {/* Bento 2: Akuntabel */}
            <div className="group bg-blue-50/50 border border-blue-100 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <ShieldCheck className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-blue-400 mb-1">A</div>
              <h3 className="text-lg font-bold text-slate-800">Akuntabel</h3>
            </div>

            {/* Bento 3: Kompeten */}
            <div className="group bg-emerald-50/50 border border-emerald-100 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <BookOpen className="w-12 h-12 text-emerald-600 mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-emerald-400 mb-1">K</div>
              <h3 className="text-lg font-bold text-slate-800">Kompeten</h3>
            </div>

            {/* Bento 4: Harmonis */}
            <div className="group bg-amber-50/50 border border-amber-100 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <Users className="w-12 h-12 text-amber-600 mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-amber-400 mb-1">H</div>
              <h3 className="text-lg font-bold text-slate-800">Harmonis</h3>
            </div>

            {/* Bento 5: Loyal */}
            <div className="group bg-rose-50/50 border border-rose-100 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <Scale className="w-12 h-12 text-rose-600 mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-rose-400 mb-1">L</div>
              <h3 className="text-lg font-bold text-slate-800">Loyal</h3>
            </div>

            {/* Bento 6: Kolaboratif (Wide) */}
            <div className="group md:col-span-2 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-[2rem] p-8 relative overflow-hidden text-white flex items-center justify-between hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-500">
              <div className="relative z-10 max-w-xs">
                <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-emerald-100 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">K</div>
                <h3 className="text-3xl font-bold mb-2">Kolaboratif</h3>
                <p className="text-emerald-100 text-sm font-light">Membangun sinergi antar lembaga & masyarakat.</p>
              </div>
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500">
                <HeartHandshake className="w-12 h-12 text-white" />
              </div>
              {/* Decor */}
              <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>
            </div>

            {/* Bento 7: Adaptif */}
            <div className="group md:col-span-2 bg-cyan-50 border border-cyan-100 rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-center hover:bg-white hover:shadow-xl transition-all duration-500">
              <Zap className="absolute top-8 right-8 w-24 h-24 text-cyan-200/50 group-hover:text-cyan-200 group-hover:-rotate-12 transition-all duration-500" strokeWidth={1} />
              <div className="relative z-10 max-w-sm">
                <div className="text-xs font-bold text-cyan-600 mb-2">A</div>
                <h3 className="text-3xl font-bold text-cyan-950 mb-3">Adaptif</h3>
                <p className="text-slate-500 font-light">Terus berinovasi dan antusias dalam menggerakkan atau menghadapi perubahan lingkungan kelautan.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wilayah Kerja - Interactive Map Mockup */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600 rounded-full filter blur-[150px] opacity-20 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 max-w-6xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-cyan-400 text-sm font-semibold mb-6">
            <MapPin className="w-4 h-4" /> Radar Maritim
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Wilayah Kerja Operasional</h2>
          <p className="text-slate-400 text-lg mb-16 max-w-2xl mx-auto">Cakupan operasi pemantauan maritim dan ketahanan pangan secara langsung (Real-Time).</p>

          <div className="relative w-full h-[500px] bg-[#001220] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center group">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            {/* Radar Sweep */}
            <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 border border-cyan-500/10 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 border border-cyan-500/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 border border-cyan-500/30 rounded-full"></div>
            
            {/* Ping Dots */}
            <div className="absolute top-1/3 left-1/3 flex items-center justify-center">
              <div className="absolute w-12 h-12 bg-blue-500 rounded-full animate-ping opacity-75"></div>
              <div className="relative w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,1)]"></div>
            </div>
            
            <div className="absolute top-1/2 left-2/3 flex items-center justify-center delay-300">
              <div className="absolute w-10 h-10 bg-emerald-500 rounded-full animate-ping opacity-75 delay-300"></div>
              <div className="relative w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,1)]"></div>
            </div>

            <div className="absolute bottom-1/3 left-1/2 flex items-center justify-center delay-700">
              <div className="absolute w-16 h-16 bg-amber-500 rounded-full animate-ping opacity-75 delay-700"></div>
              <div className="relative w-5 h-5 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,1)]"></div>
            </div>
            
            {/* UI Overlay on Map */}
            <div className="absolute top-8 left-8 bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl text-sm font-semibold text-white flex items-center gap-3 border border-white/10 shadow-xl group-hover:-translate-y-1 transition-transform">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Live Monitoring System
            </div>

            <button className="relative bg-white text-slate-900 hover:bg-cyan-50 px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] hover:scale-105 z-10 flex items-center gap-3">
              Buka Peta Interaktif <ArrowRight className="w-5 h-5 text-cyan-600" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
