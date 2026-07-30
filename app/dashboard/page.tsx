import { Activity, Users, FileText, AlertCircle } from 'lucide-react';

export default function DashboardHome() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-gray-400 mt-2">Selamat datang di panel admin Dinas Kelautan dan Perikanan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Pengguna" value="12" icon={Users} color="bg-blue-500" />
        <StatCard title="Total Berita" value="45" icon={FileText} color="bg-green-500" />
        <StatCard title="Aduan Masuk" value="8" icon={AlertCircle} color="bg-red-500" />
        <StatCard title="Kunjungan" value="1,204" icon={Activity} color="bg-purple-500" />
      </div>

      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-white">Aktivitas Terbaru</h2>
        <div className="text-gray-400 text-sm flex items-center justify-center h-40 border-2 border-dashed border-white/5 rounded-xl">
          Belum ada aktivitas untuk ditampilkan.
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="bg-[#1a1a1a] border border-white/10 p-6 rounded-2xl shadow-lg hover:border-white/20 transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 font-medium text-sm">{title}</h3>
        <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
          <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
        </div>
      </div>
      <div className="text-3xl font-bold text-white">{value}</div>
    </div>
  );
}
