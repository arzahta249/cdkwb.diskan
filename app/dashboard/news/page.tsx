import Link from 'next/link';
import { Plus, Search, FileText, CheckCircle2, Clock } from 'lucide-react';
import { pool } from '@/lib/db';

export const revalidate = 0; // Memastikan data selalu segar

async function getNews() {
  try {
    const [rows]: any = await pool.query(
      'SELECT ID_berita, Judul, Slug, status, tanggal FROM berita ORDER BY tanggal DESC'
    );
    return rows;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Data Berita</h1>
          <p className="text-gray-400 mt-1">Kelola berita dan publikasi.</p>
        </div>
        <Link 
          href="/dashboard/news/create" 
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-5 h-5" />
          Buat Berita Baru
        </Link>
      </div>

      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Cari berita..." 
              className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors text-sm"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-white/5 text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Judul</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Tanggal</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {news.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="w-12 h-12 mb-3 opacity-20" />
                      <p>Belum ada data berita yang ditambahkan.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                news.map((item: any) => (
                  <tr key={item.ID_berita} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{item.Judul}</div>
                      <div className="text-xs text-gray-500 mt-1">/news/{item.Slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      {item.status === 'published' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Diterbitkan
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                          <Clock className="w-3.5 h-3.5" />
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(item.tanggal).toLocaleDateString('id-ID', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/news/${item.Slug}`} 
                        target="_blank"
                        className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium mr-3"
                      >
                        Lihat
                      </Link>
                      <button className="text-red-400 hover:text-red-300 transition-colors text-sm font-medium">
                        Hapus
                      </button>
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
