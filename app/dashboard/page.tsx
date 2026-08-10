import { Activity, Users, FileText, AlertCircle, Waves, Bell, ArrowUpRight } from 'lucide-react';

export default function DashboardHome() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <Waves className="w-3 h-3" /> Pusat Komando
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">Ikhtisar Sistem</h1>
          <p className="text-slate-400 mt-1 text-sm">Selamat datang kembali di panel kontrol Dinas Kelautan dan Perikanan.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-md bg-[#131B2F] border border-cyan-900/30 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors shadow-sm">
            <Bell className="w-4 h-4" />
          </button>
          <div className="text-right hidden md:block">
            <div className="text-sm font-semibold text-slate-200">Admin Utama</div>
            <div className="text-xs text-cyan-500">Superuser</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Pengguna" value="12" icon={Users} color="text-blue-400" bgColor="bg-blue-500/10" borderColor="border-blue-500/20" trend="+2" />
        <StatCard title="Total Berita" value="45" icon={FileText} color="text-emerald-400" bgColor="bg-emerald-500/10" borderColor="border-emerald-500/20" trend="+5" />
        <StatCard title="Aduan Masuk" value="8" icon={AlertCircle} color="text-rose-400" bgColor="bg-rose-500/10" borderColor="border-rose-500/20" trend="Baru" />
        <StatCard title="Kunjungan Bulan Ini" value="1,204" icon={Activity} color="text-cyan-400" bgColor="bg-cyan-500/10" borderColor="border-cyan-500/20" trend="+12%" />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Aktivitas Terbaru */}
        <div className="lg:col-span-2 bg-[#0F172A]/80 backdrop-blur-xl border border-cyan-900/20 rounded-xl p-5 shadow-lg relative overflow-hidden group">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-900/10 rounded-full blur-3xl -z-10 group-hover:bg-cyan-900/20 transition-colors duration-700"></div>
          
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-500" /> Log Aktivitas Terkini
            </h2>
            <button className="text-xs text-cyan-500 hover:text-cyan-400 flex items-center gap-1 transition-colors">
              Lihat Semua <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="text-slate-500 text-sm flex flex-col items-center justify-center h-48 border border-dashed border-cyan-900/30 rounded-lg bg-[#0B1121]/50">
            <Waves className="w-8 h-8 text-cyan-900/50 mb-3" />
            <span>Sistem pemantauan aktif. Belum ada aktivitas baru.</span>
          </div>
        </div>

        {/* Status Server / Info Singkat */}
        <div className="bg-[#0F172A]/80 backdrop-blur-xl border border-cyan-900/20 rounded-xl p-5 shadow-lg">
          <h2 className="text-base font-semibold text-slate-200 mb-4">Status Instrumen</h2>
          
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-[#0B1121] border border-cyan-900/30">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-slate-400">Database Server</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#0B1121] border border-cyan-900/30">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-slate-400">Penyimpanan Storage</span>
                <span className="text-xs font-bold text-cyan-400">32%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, bgColor, borderColor, trend }: any) {
  return (
    <div className="group bg-[#0F172A]/80 backdrop-blur-xl border border-cyan-900/20 p-5 rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:border-cyan-700/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
      <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full ${bgColor} blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-2 rounded-md ${bgColor} border ${borderColor} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
        <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${bgColor} ${color} border ${borderColor}`}>
          {trend}
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="text-2xl font-bold text-slate-100 mb-1 tracking-tight">{value}</div>
        <h3 className="text-slate-400 text-xs font-medium">{title}</h3>
      </div>
    </div>
  );
}
