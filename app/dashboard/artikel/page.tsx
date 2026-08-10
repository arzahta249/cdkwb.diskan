import Link from 'next/link';
import { Plus, Search, FileText, CheckCircle2, Clock, User, Tag } from 'lucide-react';
import { pool } from '@/lib/db';

export const revalidate = 0; // Data always fresh

async function getArticles() {
  try {
    const [rows]: any = await pool.query(`
      SELECT 
        a.ID_artikel, 
        a.Judul, 
        a.Slug, 
        a.status, 
        a.tanggal, 
        a.kategori,
        u.nama as nama_penulis
      FROM artikel a
      LEFT JOIN user u ON a.id_penulis = u.ID_user
      ORDER BY a.tanggal DESC
    `);
    return rows;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ArtikelDashboardPage() {
  const articles = await getArticles();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Data Artikel</h1>
          <p className="text-gray-400 mt-1">Kelola artikel dan publikasi.</p>
        </div>
        <Link 
          href="/dashboard/artikel/create" 
          className="inline-flex items-center gap-2 bg-[#6FF3C8] hover:bg-[#5ae6b9] text-black px-4 py-2.5 rounded-xl font-bold transition-colors shadow-lg shadow-[#6FF3C8]/20 text-sm"
        >
          <Plus className="w-5 h-5" />
          Buat Artikel Baru
        </Link>
      </div>

      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Cari artikel..." 
              className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#6FF3C8] transition-colors text-sm"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-white/5 text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Judul Artikel</th>
                <th className="px-6 py-4 font-medium">Kategori</th>
                <th className="px-6 py-4 font-medium">Penulis / Pengunggah</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Tanggal</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="w-12 h-12 mb-3 opacity-20" />
                      <p>Belum ada data artikel yang ditambahkan.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                articles.map((item: any) => (
                  <tr key={item.ID_artikel} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{item.Judul}</div>
                      <div className="text-xs text-gray-500 mt-1">/artikel/{item.Slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
                        style={{
                          background: 'rgba(111,243,200,0.12)',
                          color: '#6FF3C8',
                          borderColor: 'rgba(111,243,200,0.25)',
                        }}>
                        <Tag className="w-3 h-3" />
                        {item.kategori || 'Umum'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-300">
                        <User className="w-3.5 h-3.5 text-[#6FF3C8]" />
                        {item.nama_penulis || 'Admin'}
                      </span>
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
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {new Date(item.tanggal).toLocaleDateString('id-ID', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/artikel/${item.Slug}`} 
                        target="_blank"
                        className="text-[#6FF3C8] hover:text-[#5ae6b9] transition-colors text-sm font-medium mr-3"
                      >
                        Lihat
                      </Link>
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
