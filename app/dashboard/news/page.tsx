import Link from 'next/link';
import { Plus, Search, FileText, CheckCircle2, Clock, User, Tag } from 'lucide-react';
import DeleteButton from '@/components/DeleteButton';
import LeadingToggle from '@/components/LeadingToggle';
import { pool } from '@/lib/db';

export const revalidate = 0; // Data always fresh

async function getNews() {
  try {
    const [rows]: any = await pool.query(`
      SELECT b.ID_berita, b.Judul, b.Slug, b.status, b.tanggal, b.kategori, b.is_leading, u.nama as penulis 
      FROM berita b 
      LEFT JOIN user u ON b.id_penulis = u.ID_user 
      ORDER BY b.tanggal DESC
    `);
    return rows;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function NewsDashboardPage() {
  const news = await getNews();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Data Berita</h1>
          <p className="text-slate-400 mt-1">Kelola berita resmi dan kegiatan dinas.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link 
            href="/dashboard/news/create-instagram" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-pink-500/20 text-sm"
          >
            <Plus className="w-4 h-4" />
            Via Instagram
          </Link>
          <Link 
            href="/dashboard/news/create" 
            className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-cyan-500/20 text-sm"
          >
            <Plus className="w-4 h-4" />
            Buat Berita Baru
          </Link>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Cari berita..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm placeholder:text-slate-500"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/50 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Judul Berita</th>
                <th className="px-6 py-4 font-medium">Kategori</th>
                <th className="px-6 py-4 font-medium">Penulis / Pengunggah</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Tanggal</th>
                <th className="px-6 py-4 font-medium text-center">Di Beranda</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {news.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="w-12 h-12 mb-3 opacity-20" />
                      <p>Belum ada data berita yang ditambahkan.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                news.map((item: any) => (
                  <tr key={item.ID_berita} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{item.Judul}</div>
                      <div className="text-xs text-slate-500 mt-1">/news/{item.Slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        <Tag className="w-3 h-3 text-cyan-400" />
                        {item.kategori || 'Umum'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                        <User className="w-3.5 h-3.5 text-cyan-400" />
                        {item.penulis || 'Reynard'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {item.status === 'published' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Diterbitkan
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <Clock className="w-3.5 h-3.5" />
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {new Date(item.tanggal).toLocaleDateString('id-ID', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <LeadingToggle id={item.ID_berita} type="berita" initialState={item.is_leading === 1} />
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                      <Link 
                        href={`/news/${item.Slug}`} 
                        target="_blank"
                        className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium mr-2"
                      >
                        Lihat
                      </Link>
                      <Link 
                        href={`/dashboard/news/edit/${item.ID_berita}`}
                        className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium mr-2"
                      >
                        Edit
                      </Link>
                      <DeleteButton endpoint="/api/news" id={item.ID_berita} type="berita" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
