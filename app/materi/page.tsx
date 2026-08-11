import { pool } from '@/lib/db';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DepthGauge from '@/components/DepthGauge';
import {
  FileText, Search, Download, Calendar, Tag, HardDrive, BookOpen
} from 'lucide-react';

export const revalidate = 0; // Fresh data

const CATEGORIES = [
  'Semua',
  'Regulasi & Hukum',
  'Laporan Tahunan',
  'Panduan Teknis',
  'Materi Sosialisasi'
];

async function getMateriList(cat?: string) {
  try {
    let query = `SELECT id, judul, deskripsi, kategori, file_url, file_type, file_size, is_verified, status, tanggal 
                 FROM materi WHERE status = 'published' OR status IS NULL`;
    const params: any[] = [];

    if (cat && cat !== 'Semua') {
      query += ' AND kategori = ?';
      params.push(cat);
    }

    query += ' ORDER BY tanggal DESC';

    const [rows]: any = await pool.query(query, params);
    return (rows || []) as any[];
  } catch (error) {
    console.error('Error fetching materi:', error);
    return [];
  }
}

export default async function PublicMateriPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; cat?: string }>;
}) {
  const sp = (await searchParams) || {};
  const searchQuery = (sp.q || '').toLowerCase();
  const activeCat = sp.cat || 'Semua';

  const allMateri = await getMateriList(activeCat === 'Semua' ? undefined : activeCat);

  const filteredMateri = allMateri.filter((item) => {
    if (!searchQuery) return true;
    const combined = `${item.judul} ${item.deskripsi || ''} ${item.kategori || ''}`.toLowerCase();
    return combined.includes(searchQuery);
  });

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <DepthGauge />

      <div className="ocean-bg text-white">
        {/* HERO SECTION */}
        <section className="pt-28 pb-16 relative overflow-hidden">
          <div className="rays" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="glow-particles" aria-hidden="true" id="glowMateriHero" />

          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6FF3C8]/10 border border-[#6FF3C8]/30 text-[#6FF3C8] text-xs font-semibold mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              Pusat Unduhan & Dokumentasi
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 leading-tight">
              Materi & Regulasi Publik
            </h1>
            <p className="text-gray-300 text-base mb-10 max-w-2xl leading-relaxed">
              Unduh dokumen publik, peraturan kelautan & perikanan, laporan kerja, panduan teknis, serta materi sosialisasi resmi dari DKP Jawa Tengah Wilayah Barat.
            </p>

            {/* SEARCH & FILTER */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
              <form method="GET" action="/materi" className="flex items-center gap-2 shrink-0">
                {activeCat !== 'Semua' && <input type="hidden" name="cat" value={activeCat} />}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="q"
                    defaultValue={searchQuery}
                    placeholder="Cari judul atau materi..."
                    className="pl-10 pr-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#6FF3C8] transition-colors text-sm w-64"
                  />
                </div>
              </form>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {CATEGORIES.map((cat) => {
                  const active = cat === activeCat;
                  const queryStr = new URLSearchParams();
                  if (searchQuery) queryStr.set('q', searchQuery);
                  if (cat !== 'Semua') queryStr.set('cat', cat);
                  const href = `/materi` + (queryStr.toString() ? `?${queryStr.toString()}` : '');

                  return (
                    <Link
                      key={cat}
                      href={href}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                        active
                          ? 'bg-[#6FF3C8] text-black border-[#6FF3C8] font-bold shadow-lg shadow-[#6FF3C8]/20'
                          : 'text-white/70 border-white/15 hover:text-white hover:border-white/30 bg-white/5'
                      }`}
                    >
                      {cat}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT LIST SECTION */}
        <section className="pb-24 relative">
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            {filteredMateri.length === 0 ? (
              <div className="ocean-card text-center py-20 px-6 rounded-2xl border border-white/10">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-30 text-[#6FF3C8]" />
                <h3 className="text-lg font-bold mb-2 text-white">Materi Tidak Ditemukan</h3>
                <p className="text-sm text-gray-400 max-w-md mx-auto">
                  {searchQuery
                    ? `Tidak ada materi yang sesuai dengan pencarian "${searchQuery}".`
                    : 'Belum ada materi publik yang diunggah untuk kategori ini.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMateri.map((item) => (
                  <div
                    key={item.id}
                    className="group ocean-card rounded-2xl p-6 border border-white/10 hover:border-[#6FF3C8]/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg"
                    style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#6FF3C8]/10 text-[#6FF3C8] border border-[#6FF3C8]/20">
                          <Tag className="w-3 h-3" />
                          {item.kategori || 'Dokumen'}
                        </span>
                        <span className="uppercase text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/10 text-gray-300 border border-white/10 font-bold">
                          {item.file_type || 'PDF'}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-[#6FF3C8] transition-colors">
                        {item.judul}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-gray-400 leading-relaxed mb-6 line-clamp-3">
                        {item.deskripsi || 'Tidak ada deskripsi singkat untuk dokumen ini.'}
                      </p>
                    </div>

                    {/* Card Footer Info & Download Action */}
                    <div className="pt-4 border-t border-white/10 space-y-3">
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#6FF3C8]" />
                          {new Date(item.tanggal || Date.now()).toLocaleDateString('id-ID', {
                            day: 'numeric', month: 'short', year: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <HardDrive className="w-3.5 h-3.5 text-gray-400" />
                          {item.file_size || 'Dokumen'}
                        </span>
                      </div>

                      <a
                        href={item.file_url || '#'}
                        target="_blank"
                        rel="noreferrer"
                        download
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#6FF3C8] text-black hover:bg-[#5ae6b9] transition-all shadow-lg shadow-[#6FF3C8]/20 group-hover:scale-[1.02]"
                      >
                        <Download className="w-4 h-4" />
                        Unduh Dokumen
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
