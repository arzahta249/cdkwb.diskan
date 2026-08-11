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

async function getContent(cat?: string) {
  try {
    let q = `SELECT ID_berita, Judul, Slug, image, isi_berita, tanggal, type, penulis, views, kategori
             FROM berita WHERE status = 'published' AND (type = 'berita' OR type IS NULL)`;
    const p: any[] = [];
    if (cat && cat !== 'Semua') { q += ' AND kategori = ?'; p.push(cat); }
    q += ' ORDER BY tanggal DESC';
    const [rows]: any = await pool.query(q, p);
    return rows as any[];
  } catch { return []; }
}

async function getPopular() {
  try {
    let q = `SELECT ID_berita, Judul, Slug, views, tanggal FROM berita WHERE status = 'published' AND (type = 'berita' OR type IS NULL)`;
    q += ' ORDER BY views DESC LIMIT 4';
    const [rows]: any = await pool.query(q);
    return rows as any[];
  } catch { return []; }
}

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

export default async function NewsListPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; type?: string; cat?: string; page?: string }>;
}) {
  const sp = (await searchParams) || {};
  const searchQuery = (sp.q || '').toLowerCase();
  const activeCat = sp.cat || 'Semua';
  const currentPage = Math.max(1, parseInt(sp.page || '1', 10));

  const catForQuery = activeCat === 'Semua' ? undefined : activeCat;
  const allItems = await getContent(catForQuery);
  const popular = await getPopular();

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
    if (searchQuery) base.q = searchQuery;
    if (activeCat !== 'Semua') base.cat = activeCat;
    base.page = String(currentPage);
    return '/news?' + new URLSearchParams({ ...base, ...ov }).toString();
  }

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <DepthGauge />

      <div className="ocean-bg text-white">

        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="rays" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="glow-particles" aria-hidden="true" id="glowNewsHero" />

          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 leading-tight">
              Berita & Kegiatan
            </h1>
            <p className="text-gray-300 text-base mb-10 max-w-xl leading-relaxed">
              Informasi resmi, laporan kegiatan lapangan, dan kabar terkini seputar DKP Jawa Tengah Wilayah Barat.
            </p>

            {/* Search + Category filter row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
              {/* Search */}
              <form method="GET" action="/news" className="flex items-center gap-2 shrink-0">
                {activeCat !== 'Semua' && <input type="hidden" name="cat" value={activeCat} />}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text" name="q" defaultValue={searchQuery}
                    placeholder="Cari berita..."
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

        <section className="pb-24 relative">
          <div className="glow-particles" aria-hidden="true" id="glowNewsGrid" />
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

              <div className="space-y-8">

                {filtered.length === 0 && (
                  <div className="ocean-card text-center py-20 px-6">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <h3 className="text-lg font-bold mb-2">Belum ada berita</h3>
                    <p className="text-sm text-gray-400">
                      {searchQuery ? `Tidak ditemukan "${searchQuery}".` : 'Tambahkan melalui Dashboard Admin.'}
                    </p>
                  </div>
                )}

                {featured && !searchQuery && (
                  <Link href={`/news/${featured.Slug}`} className="group block relative rounded-2xl overflow-hidden ocean-card min-h-[380px]">
                    <div className="absolute inset-0">
                      <Image src={featured.image || '/leading/berita.png'} alt={featured.Judul} fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030B14] via-[#030B14]/80 to-transparent" />
                    </div>
                    
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <CatBadge cat={featured.kategori || 'Berita'} />
                        {isNew(featured.tanggal) && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-[#6FF3C8] uppercase tracking-wider bg-[#6FF3C8]/10 px-2 py-0.5 rounded-full border border-[#6FF3C8]/30">
                            <Flame className="w-3 h-3" /> Baru
                          </span>
                        )}
                      </div>
                      <h2 className="text-3xl font-bold text-white leading-tight mb-3 group-hover:text-[#6FF3C8] transition-colors">
                        {featured.Judul}
                      </h2>
                      <p className="text-sm text-gray-300 leading-relaxed mb-5 max-w-2xl line-clamp-2">
                        {stripHtml(featured.isi_berita)}
                      </p>
                      <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
                        {featured.penulis && (
                          <span className="flex items-center gap-1.5 text-white">
                            <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-[#6FF3C8]">
                              {featured.penulis[0]}
                            </span>
                            {featured.penulis}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-[#6FF3C8]" />
                          {fmtDate(featured.tanggal)}
                        </span>
                        {(featured.views || 0) > 0 && (
                          <span className="flex items-center gap-1.5">
                            <Flame className="w-4 h-4 text-orange-400" />
                            {featured.views} dibaca
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                )}

                {pageGrid.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {pageGrid.map((item: any) => (
                      <Link key={item.ID_berita} href={`/news/${item.Slug}`} className="group ocean-card rounded-2xl flex flex-col overflow-hidden relative">
                        <div className="relative h-48 w-full overflow-hidden bg-black/20">
                          <Image src={item.image || '/leading/berita.png'} alt={item.Judul} fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute top-3 left-3"><CatBadge cat={item.kategori || 'Umum'} /></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="text-base font-bold text-white leading-snug mb-2 group-hover:text-[#6FF3C8] transition-colors line-clamp-2">
                            {item.Judul}
                          </h3>
                          <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">{stripHtml(item.isi_berita)}</p>
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                            <span className="text-[11px] text-gray-400 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> {fmtDate(item.tanggal, true)}
                            </span>
                            <ArrowRight className="w-4 h-4 text-[#6FF3C8] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {pageList.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    {pageList.map((item: any) => (
                      <Link key={item.ID_berita} href={`/news/${item.Slug}`} className="group ocean-card rounded-xl p-4 flex gap-5">
                        <div className="relative w-28 h-20 shrink-0 rounded-lg overflow-hidden bg-black/20">
                          <Image src={item.image || '/leading/berita.png'} alt={item.Judul} fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute top-1 left-1"><CatBadge cat={item.kategori || 'Umum'} size="xs" /></div>
                        </div>
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

              </div>

              <aside className="space-y-6">
                <div className="glow-particles" aria-hidden="true" id="glowNewsSidebar" />

                <div className="ocean-card rounded-2xl p-6 relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-5">
                    <TrendingUp className="w-4 h-4 text-[#6FF3C8]" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Berita Populer
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {popular.length === 0 && (
                      <p className="text-xs text-gray-500">Belum ada data.</p>
                    )}
                    {popular.map((item, idx) => (
                      <Link key={item.ID_berita} href={`/news/${item.Slug}`}
                        className="group flex items-start gap-3 hover:opacity-90 transition-opacity">
                        <span className="text-2xl font-black shrink-0 leading-none mt-0.5"
                          style={{ color: idx === 0 ? '#6FF3C8' : 'rgba(255,255,255,0.2)', fontVariantNumeric: 'tabular-nums' }}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white line-clamp-2 leading-snug group-hover:text-[#6FF3C8] transition-colors">
                            {item.Judul}
                          </p>
                          <p className="text-xs text-white mt-1 flex items-center gap-1">
                            <Flame className="w-3 h-3 text-orange-400" />
                            {(item.views || 0).toLocaleString('id-ID')} kali dibaca
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

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
