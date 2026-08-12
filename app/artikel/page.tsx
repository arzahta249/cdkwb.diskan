import { pool } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DepthGauge from '@/components/DepthGauge';
import { Search, ChevronLeft, ChevronRight, Calendar, User, TrendingUp, Clock, Tag } from 'lucide-react';

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

function getImageUrl(item: any) {
  let url = '/leading/berita.png';
  if (item?.value) {
    try {
      const parsed = typeof item.value === 'string' ? JSON.parse(item.value) : item.value;
      if (parsed.image) url = parsed.image;
    } catch (e) {}
  }
  return url;
}

function stripHtml(html: string) {
  return html ? html.replace(/<[^>]*>?/gm, '') : '';
}

async function getArtikel(cat?: string) {
  try {
    let q = `SELECT a.ID_artikel, a.Judul, a.Slug, a.value, a.isi_artikel, a.tanggal, a.kategori as name_kategori, u.nama as nama_penulis
             FROM artikel a
             LEFT JOIN user u ON a.id_penulis = u.ID_user
             WHERE a.status = 'published'`;
    const p: any[] = [];
    if (cat && cat !== 'Semua') {
      q += ' AND a.kategori = ?';
      p.push(cat);
    }
    q += ' ORDER BY a.tanggal DESC';
    const [rows]: any = await pool.query(q, p);
    return rows;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getPopular() {
  try {
    // Simulasi populer diambil dari 4 artikel terbaru (atau bisa disesuaikan kalau ada sistem views)
    const [rows]: any = await pool.query(
      `SELECT ID_artikel, Judul, Slug, tanggal, kategori as name_kategori 
       FROM artikel WHERE status = 'published' ORDER BY tanggal ASC LIMIT 4` // ASC sebagai placeholder 'populer'
    );
    return rows;
  } catch { return []; }
}

export default async function ArtikelPublicPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; cat?: string; page?: string }>;
}) {
  const sp = (await searchParams) || {};
  const searchQuery = (sp.q || '').toLowerCase();
  const activeCat = sp.cat || 'Semua';
  const currentPage = Math.max(1, parseInt(sp.page || '1', 10));

  const catForQuery = activeCat === 'Semua' ? undefined : activeCat;
  const allItems = await getArtikel(catForQuery);
  const popular = await getPopular();

  const filtered = allItems.filter((item: any) => {
    if (!searchQuery) return true;
    return (item.Judul + ' ' + stripHtml(item.isi_artikel)).toLowerCase().includes(searchQuery);
  });

  // Featured = newest article
  let featured: any = null;
  let rest: any[] = filtered;
  if (filtered.length > 0 && !searchQuery && !catForQuery && currentPage === 1) {
    featured = filtered[0];
    rest = filtered.slice(1);
  }

  const totalPages = Math.ceil(rest.length / PAGE_SIZE) || 1;
  const pageItems = rest.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function buildQuery(ov: Record<string, string>) {
    const base: Record<string, string> = {};
    if (searchQuery) base.q = searchQuery;
    if (activeCat !== 'Semua') base.cat = activeCat;
    base.page = String(currentPage);
    return '/artikel?' + new URLSearchParams({ ...base, ...ov }).toString();
  }

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <DepthGauge />

      {/* ── Single continuous ocean background ── */}
      <div className="ocean-bg text-white">

        {/* ── HERO SECTION ── */}
        <section className="pt-28 pb-16 relative overflow-hidden">
          <div className="rays" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="glow-particles" aria-hidden="true" id="glowArtikelHero" />

          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 leading-tight">
              Artikel & Wawasan
            </h1>
            <p className="text-gray-300 text-base mb-10 max-w-xl leading-relaxed">
              Jelajahi karya tulis edukatif, inovasi teknologi kelautan, dan panduan maritim untuk mendukung ketahanan hayati di Jawa Tengah.
            </p>

            {/* Search + Category filter row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
              {/* Search */}
              <form method="GET" action="/artikel" className="flex items-center gap-2 shrink-0">
                {activeCat !== 'Semua' && <input type="hidden" name="cat" value={activeCat} />}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text" name="q" defaultValue={searchQuery}
                    placeholder="Cari artikel..."
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
          <div className="glow-particles" aria-hidden="true" id="glowArtikelGrid" />
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

              {/* ── LEFT: Article feed ── */}
              <div className="space-y-6">

                {/* Empty state */}
                {filtered.length === 0 && (
                  <div className="ocean-card text-center py-20 px-6">
                    <h3 className="text-lg font-bold mb-2">Belum ada artikel</h3>
                    <p className="text-sm text-gray-400">
                      {searchQuery ? `Tidak ditemukan "${searchQuery}".` : 'Tambahkan melalui Dashboard Admin.'}
                    </p>
                  </div>
                )}

                {/* ── FEATURED ARTICLE ── */}
                {featured && !searchQuery && (
                  <Link
                    href={`/artikel/${featured.Slug}`}
                    className="group block rounded-2xl overflow-hidden border border-white/10 relative min-h-[340px] transition-all hover:border-white/25 hover:scale-[1.005]"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-[3fr_2fr] min-h-[340px]">
                      {/* Image */}
                      <div className="relative h-64 sm:h-auto overflow-hidden bg-black/20 order-1 sm:order-2">
                        <Image
                          src={getImageUrl(featured)}
                          alt={featured.Judul}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30" />
                      </div>
                      
                      {/* Text */}
                      <div className="p-8 md:p-10 flex flex-col justify-center order-2 sm:order-1 relative z-10">
                        <div className="mb-4">
                          <CatBadge cat={featured.name_kategori || 'Umum'} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4 group-hover:text-[#6FF3C8] transition-colors">
                          {featured.Judul}
                        </h2>
                        <p className="text-sm text-gray-300 leading-relaxed mb-6 line-clamp-3">
                          {stripHtml(featured.isi_artikel)}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs font-medium text-gray-400 mt-auto">
                          {featured.nama_penulis && (
                            <span className="flex items-center gap-1.5 text-white">
                              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-[#6FF3C8]">
                                {featured.nama_penulis[0]}
                              </span>
                              {featured.nama_penulis}
                            </span>
                          )}
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-[#6FF3C8]" />
                            {new Date(featured.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* ── GRID ARTICLES ── */}
                {pageItems.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {pageItems.map((item: any) => (
                      <Link
                        key={item.ID_artikel}
                        href={`/artikel/${item.Slug}`}
                        className="group ocean-card rounded-2xl overflow-hidden flex flex-col transition-all hover:border-white/25 hover:-translate-y-1"
                      >
                        {/* Thumbnail */}
                        <div className="relative h-48 w-full overflow-hidden bg-black/20">
                          <Image src={getImageUrl(item)} alt={item.Judul} fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute top-3 left-3">
                            <CatBadge cat={item.name_kategori || 'Umum'} />
                          </div>
                          {/* Inner gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        
                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="text-lg font-bold text-white leading-snug mb-2 group-hover:text-[#6FF3C8] transition-colors line-clamp-2">
                            {item.Judul}
                          </h3>
                          <p className="text-sm text-gray-400 line-clamp-2 mb-4 leading-relaxed flex-1">
                            {stripHtml(item.isi_artikel)}
                          </p>
                          
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                            <span className="flex items-center gap-1.5 text-xs text-white font-medium">
                              <User className="w-3.5 h-3.5 text-[#6FF3C8]" />
                              {item.nama_penulis || 'Admin'}
                            </span>
                            <span className="text-[11px] text-gray-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* ── PAGINATION ── */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-6">
                    {currentPage > 1 ? (
                      <Link href={buildQuery({ page: String(currentPage - 1) })}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors shadow-lg">
                        <ChevronLeft className="w-5 h-5" />
                      </Link>
                    ) : (
                      <span className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed">
                        <ChevronLeft className="w-5 h-5" />
                      </span>
                    )}
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <Link key={p} href={buildQuery({ page: String(p) })}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all border shadow-lg ${
                          p === currentPage ? 'text-black border-transparent shadow-[#6FF3C8]/20' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                        }`}
                        style={p === currentPage ? { background: '#6FF3C8', borderColor: '#6FF3C8' } : {}}>
                        {p}
                      </Link>
                    ))}

                    {currentPage < totalPages ? (
                      <Link href={buildQuery({ page: String(currentPage + 1) })}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors shadow-lg">
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    ) : (
                      <span className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed">
                        <ChevronRight className="w-5 h-5" />
                      </span>
                    )}
                  </div>
                )}

              </div>{/* end LEFT */}

              {/* ── RIGHT: SIDEBAR ── */}
              <aside className="space-y-6">
                <div className="glow-particles" aria-hidden="true" id="glowArtikelSidebar" />

                {/* Popular Articles */}
                <div className="ocean-card rounded-2xl p-6 relative overflow-hidden shadow-xl">
                  <div className="flex items-center gap-2 mb-5">
                    <TrendingUp className="w-4 h-4 text-[#6FF3C8]" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Artikel Pilihan
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {popular.length === 0 && (
                      <p className="text-xs text-gray-500">Belum ada data.</p>
                    )}
                    {popular.map((item: any, idx: number) => (
                      <Link key={`pop-${item.ID_artikel}`} href={`/artikel/${item.Slug}`}
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
                          <p className="text-[11px] text-gray-400 mt-1">
                            {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Category quick links */}
                <div className="ocean-card rounded-2xl p-6 shadow-xl">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Topik Artikel</h3>
                  <div className="space-y-2">
                    {CATEGORIES.filter(c => c !== 'Semua').map(cat => {
                      const s = getCat(cat);
                      const count = allItems.filter((i: any) => (i.name_kategori || 'Umum') === cat).length;
                      return (
                        <Link key={cat} href={buildQuery({ cat, page: '1' })}
                          className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors group ${activeCat === cat ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                          <span className="flex items-center gap-2 text-sm font-medium" style={{ color: s.text }}>
                            <span className="w-2 h-2 rounded-full" style={{ background: s.text }} />
                            {cat}
                          </span>
                          <span className="text-xs text-gray-400 bg-black/20 px-2 py-0.5 rounded-full border border-white/5 font-mono">{count}</span>
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
