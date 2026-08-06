import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  MapPin, Phone, Clock, Mail, ExternalLink,
  Building2, Anchor, Fish, Navigation, ChevronRight, ArrowRight,
} from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4", style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const metadata = {
  title: 'Hubungi Kami – CDKWB',
  description:
    'Informasi kontak, alamat, dan jam operasional kantor Dinas Kelautan dan Perikanan wilayah Kota & Kabupaten Tegal.',
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const offices = [
  {
    id: 1,
    icon: Building2,
    tag: 'Kantor Utama',
    tagColor: '#6FF3C8',
    name: 'Dinas Kelautan, Perikanan, Pertanian dan Pangan Kota Tegal',
    rating: '4.0',
    type: 'Kantor Pemerintah Kota',
    address: 'Jl. Lele No. 6, Tegalsari, Tegal Barat, Kota Tegal, Jawa Tengah 52111',
    phone: '(0283) 351191',
    contact: 'Rena Eka Saputra, S.STP (Sekretaris)',
    instagram: 'https://www.instagram.com/cdkwbjateng/',
    mapsUrl: 'https://maps.google.com/?q=Jl.+Lele+No.+6+Tegalsari+Tegal+Barat+Kota+Tegal',
    hours: [
      { day: 'Senin – Kamis', time: '07.30 – 16.00' },
      { day: 'Jumat', time: '07.30 – 11.00' },
    ],
    description:
      'Kantor pemerintah daerah utama yang bertanggung jawab atas urusan perikanan, kelautan, pertanian, dan ketahanan pangan di wilayah Kota Tegal.',
    accent: 'from-cyan-500 to-blue-600',
    border: 'border-cyan-500/20',
  },
  {
    id: 2,
    icon: Fish,
    tag: 'Kabupaten Tegal',
    tagColor: '#FFC14D',
    name: 'Dinas Perikanan Kabupaten Tegal',
    rating: '4.3',
    type: 'Kantor Dinas Kabupaten',
    address: 'Jl. Jenderal Ahmad Yani No. 9, Procot, Slawi, Kabupaten Tegal, Jawa Tengah 52401',
    phone: '(0283) 491480',
    contact: null,
    mapsUrl: 'https://maps.google.com/?q=Jl.+Jenderal+Ahmad+Yani+No.+9+Procot+Slawi+Kabupaten+Tegal',
    hours: [
      { day: 'Senin – Kamis', time: '07.15 – 16.15' },
      { day: 'Jumat', time: '07.15 – 10.45' },
    ],
    description:
      'Melayani urusan perikanan untuk wilayah Kabupaten Tegal (berbeda dengan Kota Tegal), mencakup pembinaan nelayan, budidaya, dan perizinan usaha perikanan.',
    accent: 'from-amber-400 to-orange-500',
    border: 'border-amber-400/20',
  },
  {
    id: 3,
    icon: Anchor,
    tag: 'Pelabuhan Perikanan',
    tagColor: '#FF7A59',
    name: 'Dinas Kelautan & Perikanan – Pelabuhan Perikanan Pantai Tegalsari',
    rating: '4.4',
    type: 'Kantor Pemerintah – Pelabuhan',
    address: 'Jl. Blanak No. 10C, Tegalsari, Tegal Barat, Kota Tegal',
    phone: '(0283) 358787',
    contact: null,
    mapsUrl: 'https://maps.google.com/?q=Jl.+Blanak+No.+10C+Tegalsari+Tegal+Barat+Kota+Tegal',
    hours: [
      { day: 'Senin – Jumat', time: '08.00 – 16.00' },
    ],
    description:
      'Kantor pemerintah perikanan yang berlokasi langsung di dalam kawasan Pelabuhan Perikanan Pantai Tegalsari, melayani administrasi kapal dan pengawasan hasil tangkapan.',
    accent: 'from-orange-500 to-rose-600',
    border: 'border-orange-400/20',
  },
  {
    id: 4,
    icon: Building2,
    tag: 'Kantor Cabang Dinas',
    tagColor: '#3B82F6',
    name: 'Cabang Dinas Kelautan Wilayah Barat (CDKWB) Provinsi Jawa Tengah',
    rating: '4.6',
    type: 'Kantor Cabang Dinas Provinsi',
    address: 'Jl. Blanak No. 10C, Tegalsari, Tegal Barat, Kota Tegal, Jawa Tengah 52111',
    phone: '(0283) 358787',
    contact: 'Pos Wilayah Operasional CDKWB',
    instagram: 'https://www.instagram.com/cdkwbjateng/',
    mapsUrl: 'https://maps.google.com/?q=Jl.+Blanak+No.+10C+Tegalsari+Tegal+Barat+Kota+Tegal',
    hours: [
      { day: 'Senin – Kamis', time: '07.30 – 16.00' },
      { day: 'Jumat', time: '07.30 – 11.30' },
    ],
    description:
      'Kantor Cabang Dinas Kelautan dan Perikanan Wilayah Barat Provinsi Jawa Tengah yang membawahi koordinasi teknis, pengawasan sumber daya kelautan, dan pelayanan pesisir wilayah pantura barat.',
    accent: 'from-blue-600 to-indigo-700',
    border: 'border-blue-500/20',
  },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: string }) {
  const num = parseFloat(rating);
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className="w-3.5 h-3.5" viewBox="0 0 20 20">
          <defs>
            <linearGradient id={`star-${s}-${rating}`} x1="0" x2="1">
              <stop offset={`${Math.min(1, Math.max(0, num - s + 1)) * 100}%`} stopColor="#FFC14D" />
              <stop offset={`${Math.min(1, Math.max(0, num - s + 1)) * 100}%`} stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <path fill={`url(#star-${s}-${rating})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs font-semibold text-slate-600 ml-0.5">{rating}</span>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function HubungiKamiPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 overflow-x-hidden scroll-smooth">
      <Navbar />

      {/* ══ HERO – Oceanic Dark Style ══════════════════════════════════════ */}
      <section className="relative bg-[#001e36] pt-32 pb-44 overflow-hidden">
        {/* Decorative conic gradient spin */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-40"
            style={{ background: 'conic-gradient(at top right, #0D5568 0deg, #001e36 120deg, #0a3450 240deg, #0D5568 360deg)' }} />
          <div className="absolute inset-0 opacity-15 bg-cover bg-center"
            style={{ backgroundImage: "url('/leading/latar%20belakang.png')" }} />
          {/* subtle light rays */}
          <div className="rays" aria-hidden="true" style={{ opacity: 0.15 }}>
            <span /><span /><span /><span />
          </div>
        </div>

        {/* Decorative rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.03] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-900/40 border border-cyan-500/30 text-cyan-300 text-sm font-semibold mb-8 backdrop-blur-md">
            <Navigation className="w-4 h-4" />
            Temukan Kami
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
            Hubungi{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#6FF3C8]">
              Kami
            </span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-light">
            Tiga titik layanan resmi Dinas Kelautan dan Perikanan yang siap membantu
            masyarakat, nelayan, dan pelaku usaha di wilayah Tegal.
          </p>

          {/* Quick contact chips */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            {offices.map((o) => (
              <a key={o.id} href={`tel:${o.phone.replace(/[^0-9]/g, '')}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/15 text-white/80 text-sm hover:bg-white/15 hover:text-white transition-all backdrop-blur-sm">
                <Phone className="w-3.5 h-3.5" />
                {o.phone}
              </a>
            ))}
          </div>
        </div>

        {/* Wave transition into white section */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 130" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-slate-50">
            <path d="M0 130H1440V30C1440 30 1140 110 720 110C300 110 0 30 0 30V130Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ══ OFFICE CARDS – Clean Corporate Style ═══════════════════════════ */}
      <section className="py-20 bg-slate-50 relative z-10 -mt-2">
        <div className="container mx-auto px-6 max-w-6xl">

          <div className="text-center mb-14">
            <span className="inline-block text-xs font-mono tracking-[0.15em] uppercase text-cyan-600 bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full mb-4">
              3 Kantor Layanan
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#001e36] mb-3">
              Lokasi & Informasi Kantor
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Kunjungi salah satu kantor kami sesuai kebutuhan dan wilayah Anda.
            </p>
          </div>

          <div className="space-y-8">
            {offices.map((office, idx) => {
              const Icon = office.icon;
              return (
                <div key={office.id}
                  className={`bg-white rounded-3xl shadow-sm border ${office.border} overflow-hidden hover:shadow-lg transition-all duration-300 group`}>
                  <div className="flex flex-col lg:flex-row">

                    {/* Left accent strip + icon */}
                    <div className={`relative lg:w-72 flex-shrink-0 bg-gradient-to-br ${office.accent} p-8 flex flex-col justify-between`}>
                      {/* Number watermark */}
                      <span className="absolute right-4 top-4 text-[80px] font-black text-white/10 leading-none select-none">
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                      <div>
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-5 backdrop-blur-sm border border-white/20 shadow-lg">
                          <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                        </div>
                        <span className="inline-block text-xs font-bold tracking-widest uppercase text-white/70 mb-2">
                          {office.tag}
                        </span>
                        <h3 className="text-lg font-extrabold text-white leading-snug">
                          {office.name}
                        </h3>
                      </div>

                      <div className="mt-6">
                        <StarRating rating={office.rating} />
                        <p className="text-xs text-white/60 mt-1">{office.type}</p>
                      </div>
                    </div>

                    {/* Right content */}
                    <div className="flex-1 p-8 flex flex-col justify-between">
                      <div>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6 border-l-2 border-slate-100 pl-4">
                          {office.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {/* Address */}
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                              <MapPin className="w-4 h-4 text-slate-400" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Alamat</p>
                              <p className="text-sm text-slate-700 font-medium leading-relaxed">{office.address}</p>
                            </div>
                          </div>

                          {/* Phone */}
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                              <Phone className="w-4 h-4 text-slate-400" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Telepon</p>
                              <a href={`tel:${office.phone.replace(/[^0-9]/g, '')}`}
                                className="text-sm font-semibold text-[#0b3b60] hover:text-cyan-600 transition-colors">
                                {office.phone}
                              </a>
                            </div>
                          </div>

                          {/* Hours */}
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                              <Clock className="w-4 h-4 text-slate-400" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Jam Operasional</p>
                              <div className="space-y-0.5">
                                {office.hours.map((h) => (
                                  <p key={h.day} className="text-sm text-slate-700">
                                    <span className="font-medium">{h.day}:</span>{' '}
                                    <span className="text-slate-500">{h.time}</span>
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Contact person */}
                          {office.contact && (
                            <div className="flex items-start gap-3">
                              <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                                <Mail className="w-4 h-4 text-slate-400" />
                              </div>
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Kontak Teknis</p>
                                <p className="text-sm text-slate-700 font-medium">{office.contact}</p>
                              </div>
                            </div>
                          )}

                          {/* Instagram */}
                          {office.instagram && (
                            <div className="flex items-start gap-3">
                              <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                                <InstagramIcon className="w-4 h-4 text-slate-400" />
                              </div>
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Instagram</p>
                                <a href={office.instagram} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#0b3b60] hover:text-cyan-600 transition-colors">
                                  @cdkwbjateng
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-slate-100">
                        <a href={office.mapsUrl} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#0b3b60] hover:bg-[#0a3153] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5 shadow-sm">
                          <MapPin className="w-4 h-4" />
                          Buka di Maps
                          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                        </a>
                        <a href={`tel:${office.phone.replace(/[^0-9]/g, '')}`}
                          className="inline-flex items-center gap-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold px-5 py-2.5 rounded-full transition-all">
                          <Phone className="w-4 h-4" />
                          Hubungi Sekarang
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* ══ INSTAGRAM & SOCIAL MEDIA BANNER ══════════════════════════════ */}
          <div className="mt-14 bg-gradient-to-r from-purple-700 via-pink-600 to-amber-500 rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-white/20">
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            <div className="relative z-10 flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center shrink-0 shadow-lg">
                <InstagramIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-xs font-bold uppercase tracking-wider mb-2">
                  Media Sosial Resmi
                </div>
                <h3 className="text-2xl font-black tracking-tight text-white">
                  Ikuti Instagram @cdkwbjateng
                </h3>
                <p className="text-white/90 text-sm mt-1 max-w-xl font-light">
                  Dapatkan pembaruan kegiatan operasional, infografis perikanan, edukasi kelautan, dan dokumentasi lapangan terbaru.
                </p>
              </div>
            </div>
            <a
              href="https://www.instagram.com/cdkwbjateng/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 shrink-0 bg-white text-slate-900 hover:bg-slate-100 font-bold px-7 py-3.5 rounded-full shadow-lg transition-all hover:scale-105 flex items-center gap-2.5 text-sm"
            >
              <InstagramIcon className="w-5 h-5 text-pink-600" />
              Kunjungi @cdkwbjateng
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>
      </section>

      {/* ══ MAP EMBED – Oceanic Wave Top ════════════════════════════════════ */}
      <section id="lokasi" className="relative bg-white scroll-mt-24">
        {/* Wave top into ocean */}
        <div className="absolute top-0 left-0 right-0 z-10 transform rotate-180">
          <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-slate-50">
            <path d="M0 100H1440V0C1440 0 1140 80 720 80C300 80 0 0 0 0V100Z" fill="currentColor" />
          </svg>
        </div>

        <div className="pt-16 pb-0">
          <div className="container mx-auto px-6 max-w-6xl mb-8">
            <div className="text-center">
              <span className="eyebrow text-cyan-600 mb-4 inline-flex">Peta Lokasi</span>
              <h2 className="text-3xl font-extrabold text-[#001e36] mt-2">
                Kantor Pusat – Kota Tegal
              </h2>
            </div>
          </div>
          <div className="w-full h-[420px] relative overflow-hidden">
            <iframe
              title="Lokasi Kantor Dinas Kelautan Kota Tegal"
              className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.6938!2d109.1302!3d-6.8697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb51c0e6f8f1b%3A0x2f9f2f2f2f2f2f2f!2sJl.+Lele+No.6%2C+Tegalsari%2C+Tegal+Barat%2C+Kota+Tegal%2C+Jawa+Tengah+52111!5e0!3m2!1sid!2sid!4v1234567890"
            />
          </div>
        </div>
      </section>

      {/* ══ CTA STRIP – Oceanic Dark ════════════════════════════════════════ */}
      <section className="relative bg-[#001e36] py-24 overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/[0.03] pointer-events-none" />

        <div className="glow-particles" aria-hidden="true" id="glowKontak" />

        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <span className="eyebrow mb-6 inline-flex" style={{ color: '#6FF3C8' }}>
            Butuh Bantuan?
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Layanan Pengaduan &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#6FF3C8]">
              Informasi Publik
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
            Tidak dapat menemukan jawaban yang Anda cari? Sampaikan pengaduan atau
            pertanyaan langsung kepada kami melalui halaman layanan resmi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/pengaduan" className="btn-coral-ocean">
              Kirim Pengaduan
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/pengaduan" className="btn-ghost-ocean">
              Isi Survei Kepuasan
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" style={{ color: '#f0f2f5' }}>
            <path d="M0 80H1440V20C1440 20 1140 65 720 65C300 65 0 20 0 20V80Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      <div className="bg-[#f0f2f5]">
        <Footer />
      </div>
    </div>
  );
}
