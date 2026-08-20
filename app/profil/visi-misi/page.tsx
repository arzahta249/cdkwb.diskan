'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Leaf, ShieldCheck, ClipboardCheck, Gavel, Users, Compass, Droplet } from 'lucide-react';

// --- CUSTOM HOOKS UNTUK ANIMASI FLUIDA & SCROLL ---
const useScrollPosition = () => {
  const [scrollPos, setScrollPos] = useState(0);
  useEffect(() => {
    const updatePosition = () => setScrollPos(window.scrollY);
    window.addEventListener('scroll', updatePosition, { passive: true });
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);
  return scrollPos;
};

const useInView = (options = { threshold: 0.1, triggerOnce: true }) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        if (options.triggerOnce && ref.current) observer.unobserve(ref.current);
      } else if (!options.triggerOnce) {
        setIntersecting(false);
      }
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [options.threshold, options.triggerOnce]);
  return [ref, isIntersecting] as const;
};

// --- DATA MISI ---
const misiData = [
  {
    id: 1,
    title: 'Rehabilitasi Mangrove',
    desc: 'Meningkatnya kawasan rehabilitasi di alokasi hutan mangrove berdasarkan RZWP3K.',
    icon: <Leaf className="w-8 h-8" />,
    imgUrl: '/upload/visimisi/1.jpg',
    accent: 'from-emerald-400 to-teal-500',
    lightAccent: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 2,
    title: 'Konservasi Inovatif',
    desc: 'Melestarikan kawasan konservasi secara inovatif dan berdaya guna.',
    icon: <ShieldCheck className="w-8 h-8" />,
    imgUrl: '/upload/visimisi/2.jpg',
    accent: 'from-cyan-400 to-blue-500',
    lightAccent: 'bg-cyan-50 text-cyan-600',
  },
  {
    id: 3,
    title: 'Pelayanan Prima',
    desc: 'Memberikan pelayanan rekomendasi perizinan dengan cepat, tepat dan profesional.',
    icon: <ClipboardCheck className="w-8 h-8" />,
    imgUrl: '/upload/visimisi/3.jpg',
    accent: 'from-blue-400 to-indigo-500',
    lightAccent: 'bg-blue-50 text-blue-600',
  },
  {
    id: 4,
    title: 'Pengawasan Profesional',
    desc: 'Meningkatnya pengawasan sumber daya kelautan dan perikanan secara profesional sesuai peraturan.',
    icon: <Gavel className="w-8 h-8" />,
    imgUrl: '/upload/visimisi/4.jpg',
    accent: 'from-indigo-400 to-blue-600',
    lightAccent: 'bg-indigo-50 text-indigo-600',
  },
  {
    id: 5,
    title: 'Pengawasan Masyarakat',
    desc: 'Meningkatnya sistem pengawasan kelautan yang berbasis pada pemberdayaan masyarakat.',
    icon: <Users className="w-8 h-8" />,
    imgUrl: '/upload/visimisi/5.jpg',
    accent: 'from-teal-400 to-cyan-500',
    lightAccent: 'bg-teal-50 text-teal-600',
  }
];

// --- KOMPONEN BUBBLES ---
const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState<any[]>([]);
  useEffect(() => {
    const newBubbles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 30 + 10,
      left: Math.random() * 100,
      animationDuration: Math.random() * 15 + 10,
      delay: Math.random() * 20,
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute bottom-[-50px] rounded-full bg-white/10 backdrop-blur-[1px] border border-white/20 animate-bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            animationDuration: `${bubble.animationDuration}s`,
            animationDelay: `${bubble.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function VisiMisiPage() {
  const scrollY = useScrollPosition();
  const maxScroll = typeof window !== 'undefined' ? document.body.scrollHeight - window.innerHeight : 2500;
  const depthFactor = Math.min(Math.max(scrollY / (maxScroll || 1), 0), 1);
  
  const getBackgroundColor = (depth: number) => {
    const r = Math.floor(224 - (224 - 4) * depth);
    const g = Math.floor(242 - (242 - 11) * depth);
    const b = Math.floor(254 - (254 - 30) * depth);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div 
      className="min-h-screen flex flex-col font-sans transition-colors duration-700 ease-out"
      style={{ backgroundColor: getBackgroundColor(depthFactor) }}
    >
      <Navbar />

      <main className="flex-grow relative overflow-x-hidden">
        <FloatingBubbles />

        {/* --- SECTION 1: VISI --- */}
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center pt-24 pb-20 z-10 overflow-hidden">
          
          <div className="absolute inset-0 z-0 opacity-30">
            <svg className="absolute w-[200vw] h-[100vh] -left-[50vw] animate-[wave_20s_linear_infinite]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
              <path d="M0,500 C300,400 700,600 1000,500 L1000,1000 L0,1000 Z" fill="rgba(255,255,255,0.2)"></path>
            </svg>
            <svg className="absolute w-[200vw] h-[100vh] -left-[50vw] animate-[wave_15s_linear_infinite_reverse] top-5" viewBox="0 0 1000 1000" preserveAspectRatio="none">
              <path d="M0,500 C300,600 700,400 1000,500 L1000,1000 L0,1000 Z" fill="rgba(255,255,255,0.15)"></path>
            </svg>
          </div>

          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <div 
              className="flex flex-col items-center text-center transition-transform duration-300 ease-out"
              style={{ transform: `translateY(${scrollY * 0.2}px)`, opacity: 1 - scrollY / 500 }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/40 backdrop-blur-md border border-white/60 rounded-full flex items-center justify-center shadow-lg">
                  <Compass className="w-6 h-6 md:w-8 md:h-8 text-blue-700 animate-[spin_10s_linear_infinite]" />
                </div>
              </div>

              <h2 className="text-blue-600 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4">
                Visi Utama CDKWB
              </h2>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 leading-[1.2] mb-6 drop-shadow-sm">
                Pengelolaan Sumber Daya <br className="hidden md:block" />
                <span className="relative inline-block mt-1">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                    Kelautan yang Optimal
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-2 bg-cyan-300/40 rounded-full -rotate-1 skew-x-12 z-0"></span>
                </span>
              </h1>
              
              <div className="max-w-2xl relative px-4">
                <p className="text-base md:text-xl text-slate-700/90 font-medium leading-relaxed">
                  Bermanfaat bagi masyarakat dengan berpegang teguh pada <strong className="text-blue-700">kelestarian berkelanjutan</strong>.
                </p>
                <Droplet className="absolute -left-4 md:-left-8 -top-2 w-5 h-5 md:w-6 md:h-6 text-blue-300 opacity-50 rotate-12" />
                <Droplet className="absolute -right-2 md:-right-4 bottom-0 w-4 h-4 md:w-5 md:h-5 text-cyan-300 opacity-50 -rotate-12" />
              </div>
            </div>
          </div>
          
          <div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-300"
            style={{ opacity: 1 - scrollY / 200 }}
          >
            <span className="text-blue-800/50 text-[10px] font-bold tracking-widest uppercase">Menyelam Lebih Dalam</span>
            <div className="w-[1.5px] h-10 bg-blue-800/20 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-500 animate-[scrollDown_2s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </section>


        {/* --- SECTION 2: MISI --- */}
        <section className="relative z-20 pb-24 md:pb-32">
          
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] md:-ml-[1px] bg-gradient-to-b from-blue-400 via-cyan-400 to-transparent opacity-20"></div>

          <div className="container mx-auto px-6 sm:px-8 max-w-5xl">
            
            <div className="text-center mb-16 md:mb-24 pt-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white drop-shadow-md tracking-tight mb-3">
                Pilar Misi Kami
              </h2>
              <div className="w-16 h-1 bg-white/50 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-20 md:space-y-28">
              {misiData.map((misi, index) => {
                const isEven = index % 2 === 0;
                return <MisiFluidCard key={misi.id} misi={misi} isEven={isEven} depth={depthFactor} />;
              })}
            </div>

          </div>
        </section>

      </main>

      <div className="relative z-50 bg-white">
        <Footer />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wave {
          0% { transform: translateX(0) translateZ(0) scaleY(1); }
          50% { transform: translateX(-25%) translateZ(0) scaleY(0.9); }
          100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
        @keyframes bubble {
          0% { transform: translateY(0) scale(1) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          50% { transform: translateY(-40vh) scale(1.1) translateX(15px); }
          90% { opacity: 1; }
          100% { transform: translateY(-80vh) scale(0.9) translateX(-15px); opacity: 0; }
        }
        .fluid-shape-1 { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        .fluid-shape-2 { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
      `}} />
    </div>
  );
}

function MisiFluidCard({ misi, isEven, depth }: { misi: any, isEven: boolean, depth: number }) {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: false });
  const isDeep = depth > 0.35;
  
  return (
    <div 
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 ${isEven ? '' : 'md:flex-row-reverse'}`}
    >
      
      {/* Node / Checkpoint */}
      <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 md:-translate-y-1/2 -translate-x-[11px] md:-translate-x-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/20 backdrop-blur-md border-[3px] border-white shadow-md z-20 flex items-center justify-center">
        <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r ${misi.accent} ${inView ? 'scale-100' : 'scale-0'} transition-transform duration-500 delay-200`}></div>
      </div>

      {/* Kolom Gambar */}
      <div 
        className={`w-full md:w-1/2 pl-8 md:pl-0 flex justify-center md:justify-end transition-all duration-700 ease-out ${
          inView 
            ? 'opacity-100 translate-x-0 translate-y-0 rotate-0' 
            : `opacity-0 translate-y-10 ${isEven ? 'md:-translate-x-10 -rotate-3' : 'md:translate-x-10 rotate-3'}`
        } ${isEven ? 'md:pr-6 lg:pr-8' : 'md:pl-6 lg:pl-8 md:justify-start'}`}
      >
        <div className="relative w-full max-w-[260px] md:max-w-[300px] aspect-[4/5] group">
          <div className={`absolute inset-0 bg-gradient-to-br ${misi.accent} opacity-30 blur-xl fluid-shape-1 group-hover:rotate-45 transition-all duration-700`}></div>
          
          <div className={`relative w-full h-full overflow-hidden shadow-lg transition-all duration-500 ease-in-out ${isEven ? 'fluid-shape-1' : 'fluid-shape-2'}`}>
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay z-10 pointer-events-none"></div>
            <img 
              src={misi.imgUrl} 
              alt={misi.title} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          
          {/* Badge Ikon */}
          <div className={`absolute ${isEven ? '-bottom-4 -right-4' : '-bottom-4 -left-4'} w-16 h-16 md:w-20 md:h-20 bg-white/95 backdrop-blur-md rounded-full border-2 md:border-4 border-white shadow-lg flex items-center justify-center text-slate-700 z-20 transform group-hover:-translate-y-2 transition-transform duration-300`}>
            {misi.icon}
          </div>
        </div>
      </div>

      {/* Kolom Teks */}
      <div 
        className={`w-full md:w-1/2 pl-8 md:pl-0 flex flex-col justify-center transition-all duration-700 delay-150 ease-out ${
          inView 
            ? 'opacity-100 translate-x-0' 
            : `opacity-0 ${isEven ? 'md:translate-x-10' : 'md:-translate-x-10'}`
        } ${isEven ? 'md:text-left md:pl-6 lg:pl-8' : 'md:text-right md:pr-6 lg:pr-8'}`}
      >
        <div className={`inline-flex items-center gap-2 mb-4 ${isEven ? '' : 'md:flex-row-reverse'}`}>
          <span className="text-5xl md:text-6xl lg:text-7xl font-black opacity-20 bg-clip-text text-transparent bg-gradient-to-b from-white to-transparent leading-none">
            0{misi.id}
          </span>
          <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${misi.lightAccent} shadow-sm backdrop-blur-sm`}>
            Prioritas
          </div>
        </div>
        
        <h3 className={`text-2xl md:text-3xl font-black mb-3 leading-tight tracking-tight ${isDeep ? 'text-white' : 'text-slate-800'}`}>
          {misi.title}
        </h3>
        
        <p className={`text-base md:text-lg font-medium leading-relaxed ${isDeep ? 'text-blue-100/80' : 'text-slate-600'}`}>
          {misi.desc}
        </p>
      </div>

    </div>
  );
}
