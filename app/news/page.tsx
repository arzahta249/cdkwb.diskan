import { pool } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DepthGauge from '@/components/DepthGauge';
import {
  Calendar, Search, ArrowRight, BookOpen, Clock,
  Tag, ChevronLeft, ChevronRight, Flame, Mail, TrendingUp,
} from 'lucide-react';

export const revalidate = 0;

const CATEGORIES = ['Semua', 'Kelautan', 'Perikanan', 'Konservasi', 'Pemberdayaan', 'Umum'];
const PAGE_SIZE = 6;

const CAT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Kelautan:     { bg: 'rgba(111,243,200,0.18)', text: '#6FF3C8', border: 'rgba(111,243,200,0.35)' },
  Perikanan:    { bg: 'rgba(255,193,77,0.18)',  text: '#FFC14D', border: 'rgba(255,193,77,0.35)' },
  Konservasi:   { bg: 'rgba(100,210,135,0.18)', text: '#64D287', border: 'rgba(100,210,135,0.35)' },
  Pemberdayaan: { bg: 'rgba(255,121,90,0.18)',  text: '#FF795A', border: 'rgba(255,121,90,0.35)' },
  Umum:         { bg: 'rgba(180,180,255,0.18)', text: '#B4B4FF', border: 'rgba(180,180,255,0.35)' },
};

function getCat(cat: string) {
  return CAT_COLORS[cat] ?? { bg: 'rgba(255,255,255,0.12)', text: '#fff', border: 'rgba(255,255,255,0.2)' };
}

function stripHtml(html: string) {
  return (html ?? '').replace(/<[^>]*>/g, '');
}

function isNew(dateStr: string) {
  return (Date.now() - new Date(dateStr).getTime()) / 3_600_000 <= 72;
}

function fmtDate(d: string, short = false) {
  return new Date(d).toLocaleDateString('id-ID', short
    ? { day: 'numeric', month: 'short', year: 'numeric' }
    : { day: 'numeric', month: 'long', year: 'numeric' });
}

async function getContent(type: string, cat?: string) {
  try {
    let q = `SELECT ID_berita, Judul, Slug, image, isi_berita, tanggal, type, penulis, views, kategori
             FROM berita WHERE status = 'published'`;
    const p: any[] = [];
    if (type === 'artikel') q += ` AND type = 'artikel'`;
    else q += ` AND (type = 'berita' OR type IS NULL)`;
    if (cat && cat !== 'Semua') { q += ' AND kategori = ?'; p.push(cat); }
    q += ' ORDER BY tanggal DESC';
    const [rows]: any = await pool.query(q, p);
    return rows as any[];
  } catch { return []; }
}

async function getPopular(type: string) {
  try {
    let q = `SELECT ID_berita, Judul, Slug, views, tanggal FROM berita WHERE status = 'published'`;
    if (type === 'artikel') q += ` AND type = 'artikel'`; else q += ` AND (type = 'berita' OR type IS NULL)`;
    q += ' ORDER BY views DESC LIMIT 4';
    const [rows]: any = await pool.query(q);
    return rows as any[];
  } catch { return []; }
}

// ── Category Badge ──────────────────────────────────────────────────────────
function CatBadge({ cat, size = 'sm' }: { cat: string; size?: 'xs' | 'sm' }) {
  const s = getCat(cat);
  const cls = size === 'xs' ? 'px-2 py-0.5 text-[10px] gap-1' : 'px-2.5 py-1 text-[11px] gap-1.5';
  return (
    <span
      className={`inline-flex items-center rounded-full font-bold border ${cls}`}
      style={{ background: s.bg, color: s.text, borderColor: s.border, backdropFilter: 'blur(4px)' }}
    >
      <Tag className="w-2.5 h-2.5" />
      {cat}
    </span>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default async function NewsListPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; type?: string; cat?: string; page?: string }>;
}) {
  const sp = (await searchParams) || {};
  const filterType = sp.type === 'artikel' ? 'artikel' : 'berita';
  const searchQuery = (sp.q || '').toLowerCase();
  const activeCat = sp.cat || 'Semua';
  const currentPage = Math.max(1, parseInt(sp.page || '1', 10));

  const catForQuery = activeCat === 'Semua' ? undefined : activeCat;
  const allItems = await getContent(filterType, catForQuery);
  const popular = await getPopular(filterType);

  const filtered = allItems.filter(item => {
    if (!searchQuery) return true;
    return (item.Judul + ' ' + stripHtml(item.isi_berita)).toLowerCase().includes(searchQuery);
  });

  // Featured = highest views
  let featured: any = null;
  let rest: any[] = filtered;
  if (filtered.length > 0 && !searchQuery && !catForQuery) {
    const byViews = [...filtered].sort((a, b) => (b.views || 0) - (a.views || 0));
    featured = byViews[0];
    rest = filtered.filter(i => i.ID_berita !== featured.ID_berita);
  }

  // Split rest: first 4 go into 2-col grid, remainder into list style
  const gridItems = rest.slice(0, 4);
  const listItems = rest.slice(4);

  const totalPages = Math.ceil(rest.length / PAGE_SIZE);

  // For pagination we re-paginate 'rest'
  const pageItems = rest.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const pageGrid = pageItems.slice(0, 4);
  const pageList = pageItems.slice(4);

  function buildQuery(ov: Record<string, string>) {
    const base: Record<string, string> = {};
    if (filterType === 'artikel') base.type = 'artikel';
    if (searchQuery) base.q = searchQuery;
    if (activeCat !== 'Semua') base.cat = activeCat;
    base.page = String(currentPage);
    return '/news?' + new URLSearchParams({ ...base, ...ov }).toString();
  }

  const isArtikel = filterType === 'artikel';

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <DepthGauge />

      {/* ── Single continuous ocean background ── */}
      <div className="ocean-bg text-white">

        {/* ── HERO SECTION ── */}
        <section className="pt-28 pb-16 relative overflow-hidden">
          <div className="rays" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="glow-particles" aria-hidden="true" id="glowNewsHero" />

          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            {/* Type switcher tabs */}
            <div className="flex items-center gap-1 mb-8">
              <Link
                href="/news"
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  !isArtikel ? 'bg-white text-[#0D5568]' : 'text-white/50 hover:text-white'
                }`}
              >
                Berita
              </Link>
              <Link
                href="/news?type=artikel"
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  isArtikel ? 'text-black' : 'text-white/50 hover:text-white'
                }`}
                style={isArtikel ? { background: '#6FF3C8' } : {}}
              >
                Artikel
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 leading-tight">
              {isArtikel ? 'Artikel & Wawasan' : 'Berita & Kegiatan'}
            </h1>
            <p className="text-gray-300 text-base mb-10 max-w-xl leading-relaxed">
              {isArtikel
                ? 'Jelajahi berita terbaru, inovasi teknologi kelautan, dan panduan pertanian perkotaan untuk mendukung ketahanan pangan berkelanjutan.'
                : 'Informasi resmi, laporan kegiatan lapangan, dan kabar terkini seputar DKP Jawa Tengah Wilayah Barat.'}
            </p>

            {/* Search + Category filter row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
              {/* Search */}
              <form method="GET" action="/news" className="flex items-center gap-2 shrink-0">
                {isArtikel && <input type="hidden" name="type" value="artikel" />}
                {activeCat !== 'Semua' && <input type="hidden" name="cat" value={activeCat} />}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text" name="q" defaultValue={searchQuery}
                    placeholder={isArtikel ? 'Cari artikel...' : 'Cari berita...'}
                    className="pl-10 pr-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#6FF3C8] transition-colors text-sm w-56"
                  />
                </div>
              </form>

              {/* Category pills */}
              <div className="flex flex-wrap items-center gap-2">
                {CATEGORIES.map(cat => {
                  const active = cat === activeCat;
                  const s = getCat(cat);
                  return (
                    <Link
                      key={cat}
                      href={buildQuery({ cat, page: '1' })}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                        active && cat === 'Semua'
                          ? 'bg-white text-[#0D5568] border-white font-bold'
                          : active
                          ? 'font-bold border-transparent'
                          : 'text-white/60 border-white/15 hover:text-white hover:border-white/30'
                      }`}
                      style={active && cat !== 'Semua' ? { background: s.bg, color: s.text, borderColor: s.border } : {}}
                    >
                      {cat}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT + SIDEBAR ── */}
        <section className="pb-24 relative">
          <div className="glow-particles" aria-hidden="true" id="glowNewsGrid" />
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

              {/* ── LEFT: Article feed ── */}
              <div className="space-y-6">

                {/* Empty state */}
                {filtered.length === 0 && (
                  <div className="ocean-card text-center py-20 px-6">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <h3 className="text-lg font-bold mb-2">Belum ada {isArtikel ? 'artikel' : 'berita'}</h3>
                    <p className="text-sm text-gray-400">
                      {searchQuery ? `Tidak ditemukan "${searchQuery}".` : 'Tambahkan melalui Dashboard Admin.'}
                    </p>
                  </div>
                )}

                {/* ── FEATURED ARTICLE (large landscape card) ── */}
                {featured && !searchQuery && (
                  <Link
                    href={`/news/${featured.Slug}`}
                    className="group block rounded-2xl overflow-hidden border border-white/10 relative min-h-[340px] transition-all hover:border-white/25 hover:scale-[1.005]"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-[3fr_2fr] min-h-[340px]">
                      {/* Image */}
                      <div className="relative min-h-[200px] sm:min-h-full overflow-hidden">
                        <Image
                          src={featured.image || '/leading/berita.png'}
                          alt={featured.Judul}
                          fill
                          priority
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#091D2C]/80 hidden sm:block" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#091D2C]/90 to-transparent sm:hidden" />
                        {/* Category badge on image */}
                        <div className="absolute top-4 left-4">
                          <CatBadge cat={featured.kategori || 'Umum'} />
                        </div>
                      </div>

                      {/* Text */}
                      <div className="p-6 sm:p-8 flex flex-col justify-between bg-[#091D2C]/80 backdrop-blur-sm">
                        <div>
                          {isNew(featured.tanggal) && (
                            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white mb-3 animate-pulse"
                              style={{ background: 'linear-gradient(135deg, #FF593C, #C2452F)' }}>
                              TERBARU
                            </span>
                          )}
                          <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-3 group-hover:text-[#6FF3C8] transition-colors">
                            {featured.Judul}
                          </h2>
                          <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                            {stripHtml(featured.isi_berita)}
                          </p>
                        </div>
                        <div>
                          <div className="flex items-center gap-3 text-xs text-white/90 mt-5 mb-4 font-medium">
                            <span className="flex items-center gap-1.5 text-white">
                              <Calendar className="w-3.5 h-3.5 text-[#6FF3C8]" />
                              {fmtDate(featured.tanggal, true)}
                            </span>
                            {featured.penulis && (
                              <span className="text-white font-semibold bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                                {featured.penulis}
                              </span>
                            )}
                          </div>
                          <span className="flex items-center gap-1.5 text-sm font-semibold text-[#6FF3C8]">
                            Baca Selengkapnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* ── 2-COLUMN GRID ── */}
                {pageGrid.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {pageGrid.map(item => {
                      const cs = getCat(item.kategori || 'Umum');
                      return (
                        <Link
                          key={item.ID_berita}
                          href={`/news/${item.Slug}`}
                          className="group ocean-card rounded-xl overflow-hidden flex flex-col transition-all hover:-translate-y-1"
                        >
                          <div className="relative h-44 overflow-hidden bg-black/20">
                            <Image src={item.image || '/leading/berita.png'} alt={item.Judul} fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute top-3 left-3"><CatBadge cat={item.kategori || 'Umum'} size="xs" /></div>
                            {isNew(item.tanggal) && (
                              <div className="absolute top-3 right-3">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase text-white animate-pulse"
                                  style={{ background: 'linear-gradient(135deg,#FF593C,#C2452F)' }}>BARU</span>
                              </div>
                            )}
                          </div>
                          <div className="p-4 flex-1 flex flex-col">
                            <h3 className="text-sm font-bold text-white line-clamp-2 mb-2 group-hover:text-[#6FF3C8] transition-colors leading-snug">
                              {item.Judul}
                            </h3>
                            <p className="text-xs text-gray-400 line-clamp-2 flex-1">{stripHtml(item.isi_berita)}</p>
                            <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                              <span className="flex items-center gap-1.5 text-white font-medium">
                                <Clock className="w-3.5 h-3.5 text-[#6FF3C8]" />{fmtDate(item.tanggal, true)}
                              </span>
                              <span className="text-white font-semibold text-xs flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#6FF3C8]" />
                                {item.penulis || 'Admin'}
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {/* ── LIST-STYLE CARDS ── */}
                {pageList.length > 0 && (
                  <div className="space-y-4">
                    {pageList.map(item => (
                      <Link
                        key={item.ID_berita}
                        href={`/news/${item.Slug}`}
                        className="group ocean-card rounded-xl overflow-hidden flex gap-4 p-4 transition-all hover:-translate-y-0.5"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-28 h-20 shrink-0 rounded-lg overflow-hidden bg-black/20">
                          <Image src={item.image || '/leading/berita.png'} alt={item.Judul} fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute top-1 left-1"><CatBadge cat={item.kategori || 'Umum'} size="xs" /></div>
                        </div>
                        {/* Content */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-[#6FF3C8] transition-colors leading-snug mb-1">
                              {item.Judul}
                            </h3>
                            <p className="text-xs text-gray-400 line-clamp-2">{stripHtml(item.isi_berita)}</p>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-white">
                            {item.penulis && (
                              <span className="flex items-center gap-1.5 text-white font-semibold">
                                <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[9px] font-bold text-[#6FF3C8]">
                                  {item.penulis[0]}
                                </span>
                                {item.penulis}
                              </span>
                            )}
                            <span className="flex items-center gap-1.5 text-white">
                              <Calendar className="w-3.5 h-3.5 text-[#6FF3C8]" />
                              {fmtDate(item.tanggal, true)}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 shrink-0 text-[#6FF3C8] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 self-center" />
                      </Link>
                    ))}
                  </div>
                )}

                {/* ── PAGINATION ── */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-4">
                    {currentPage > 1 ? (
                      <Link href={buildQuery({ page: String(currentPage - 1) })}
                        className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                      </Link>
                    ) : (
                      <span className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed">
                        <ChevronLeft className="w-4 h-4" />
                      </span>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <Link key={p} href={buildQuery({ page: String(p) })}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all border ${
                          p === currentPage ? 'text-black border-transparent' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                        }`}
                        style={p === currentPage ? { background: '#6FF3C8', borderColor: '#6FF3C8' } : {}}>
                        {p}
                      </Link>
                    ))}
                    {currentPage < totalPages ? (
                      <Link href={buildQuery({ page: String(currentPage + 1) })}
                        className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <span className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed">
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                )}

              </div>{/* end LEFT */}

              {/* ── RIGHT: SIDEBAR ── */}
              <aside className="space-y-6">
                <div className="glow-particles" aria-hidden="true" id="glowNewsSidebar" />

                {/* Popular Articles */}
                <div className="ocean-card rounded-2xl p-6 relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-5">
                    <TrendingUp className="w-4 h-4 text-[#6FF3C8]" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {isArtikel ? 'Artikel Populer' : 'Berita Populer'}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {popular.length === 0 && (
                      <p className="text-xs text-gray-500">Belum ada data.</p>
                    )}
                    {popular.map((item, idx) => (
                      <Link key={item.ID_berita} href={`/news/${item.Slug}`}
                        className="group flex items-start gap-3 hover:opacity-90 transition-opacity">
                        {/* Number */}
                        <span className="text-2xl font-black shrink-0 leading-none mt-0.5"
                          style={{ color: idx === 0 ? '#6FF3C8' : 'rgba(255,255,255,0.2)', fontVariantNumeric: 'tabular-nums' }}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white line-clamp-2 leading-snug group-hover:text-[#6FF3C8] transition-colors">
                            {item.Judul}
                          </p>
                          <p className="text-xs text-white mt-1 flex items-center gap-1">
                            <Flame className="w-3 h-3 -text-white" />
                            {(item.views || 0).toLocaleString('id-ID')} kali dibaca
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="rounded-2xl p-6 relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, rgba(111,243,200,0.12) 0%, rgba(13,85,104,0.6) 100%)', border: '1px solid rgba(111,243,200,0.2)' }}>
                  {/* Decorative glow */}
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 blur-2xl"
                    style={{ background: '#6FF3C8' }} />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: 'rgba(111,243,200,0.2)', border: '1px solid rgba(111,243,200,0.3)' }}>
                      <Mail className="w-5 h-5 text-[#6FF3C8]" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">Dapatkan Info Terbaru</h3>
                    <p className="text-xs text-white-400 mb-4 leading-relaxed">
                      Berlangganan buletin kami untuk menerima wawasan maritim dan pertanian langsung di kotak masuk Anda.
                    </p>
                    <form className="space-y-2">
                      <input
                        type="email"
                        placeholder="Alamat Email Anda"
                        className="w-full px-3 py-2.5 rounded-lg bg-black/30 border border-white/15 text-white text-sm placeholder-white-500 focus:outline-none focus:border-[#6FF3C8] transition-colors"
                      />
                      <button type="submit"
                        className="w-full py-2.5 rounded-lg font-bold text-sm text-black transition-all hover:opacity-90 active:scale-95"
                        style={{ background: '#6FF3C8' }}>
                        Langganan
                      </button>
                    </form>
                  </div>
                </div>

                {/* Category quick links */}
                <div className="ocean-card rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Kategori</h3>
                  <div className="space-y-2">
                    {CATEGORIES.filter(c => c !== 'Semua').map(cat => {
                      const s = getCat(cat);
                      const count = allItems.filter(i => (i.kategori || 'Umum') === cat).length;
                      return (
                        <Link key={cat} href={buildQuery({ cat, page: '1' })}
                          className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors group ${activeCat === cat ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                          <span className="flex items-center gap-2 text-sm" style={{ color: s.text }}>
                            <span className="w-2 h-2 rounded-full" style={{ background: s.text }} />
                            {cat}
                          </span>
                          <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">{count}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

              </aside>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
