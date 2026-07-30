import { Search, MessageSquare, ExternalLink } from 'lucide-react';

export default function AduanPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Data Aduan</h1>
        <p className="text-gray-400 mt-1">Daftar keluhan dan masukan dari masyarakat.</p>
      </div>

      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Cari aduan..." 
              className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors text-sm"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-white/5 text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Email Pengirim</th>
                <th className="px-6 py-4 font-medium">Subjek</th>
                <th className="px-6 py-4 font-medium">Isi Aduan</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {/* Contoh Data Kosong */}
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <MessageSquare className="w-12 h-12 mb-3 opacity-20" />
                    <p>Belum ada data aduan yang masuk.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
