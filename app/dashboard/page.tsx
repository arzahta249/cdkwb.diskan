import { adminDb } from '@/lib/firebase-admin';
import { Activity, Users, FileText, AlertCircle, Waves, Bell, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardHome() {
  let totalPengguna = 0;
  let totalBerita = 0;
  let aduanMasuk = 0;
  let aduanSelesai = 0;
  let recentActivities: any[] = [];
  let totalAduan = 0;

  try {
    const usersCountSnap = await adminDb.collection('user').count().get();
    totalPengguna = usersCountSnap.data().count;

    const beritaCountSnap = await adminDb.collection('berita').count().get();
    totalBerita = beritaCountSnap.data().count;

    const aduanPendingSnap = await adminDb.collection('pengaduan').where('status', '==', 'PENDING').count().get();
    aduanMasuk = aduanPendingSnap.data().count;

    const aduanSelesaiSnap = await adminDb.collection('pengaduan').where('status', 'in', ['SELESAI', 'DITUTUP']).count().get();
    aduanSelesai = aduanSelesaiSnap.data().count;

    const totalAduanSnap = await adminDb.collection('pengaduan').count().get();
    totalAduan = totalAduanSnap.data().count;

    const recentSnap = await adminDb.collection('pengaduan').orderBy('created_at', 'desc').limit(5).get();
    recentActivities = recentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
  }

  const penyelesaianPercent = totalAduan > 0 ? Math.round((aduanSelesai / totalAduan) * 100) : 0;
  const pendingPercent = totalAduan > 0 ? Math.round((aduanMasuk / totalAduan) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <Waves className="w-3.5 h-3.5" /> Pusat Komando
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Ikhtisar Sistem</h1>
          <p className="text-slate-400 mt-1">Selamat datang kembali di panel kontrol Dinas Kelautan dan Perikanan.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors shadow-lg">
            <Bell className="w-4 h-4" />
          </button>
          <div className="text-right hidden md:block">
            <div className="text-sm font-semibold text-white">Admin Utama</div>
            <div className="text-xs text-cyan-500 font-medium">Superuser</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Pengguna" value={totalPengguna} icon={Users} color="text-blue-400" bgColor="bg-blue-500/10" borderColor="border-blue-500/20" trend="Aktif" />
        <StatCard title="Total Berita" value={totalBerita} icon={FileText} color="text-emerald-400" bgColor="bg-emerald-500/10" borderColor="border-emerald-500/20" trend="Terbaru" />
        <StatCard title="Aduan Masuk (Pending)" value={aduanMasuk} icon={AlertCircle} color="text-rose-400" bgColor="bg-rose-500/10" borderColor="border-rose-500/20" trend="Baru" />
        <StatCard title="Saran & Masukan Selesai" value={aduanSelesai} icon={CheckCircle2} color="text-cyan-400" bgColor="bg-cyan-500/10" borderColor="border-cyan-500/20" trend="Tuntas" />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Aktivitas Terbaru */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-900/10 rounded-full blur-3xl -z-10 group-hover:bg-cyan-900/20 transition-colors duration-700"></div>
          
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-500" /> Saran & Masukan Terkini
            </h2>
            <Link href="/dashboard/aduan" className="text-xs text-cyan-500 hover:text-cyan-400 flex items-center gap-1 transition-colors font-medium">
              Lihat Semua <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{activity.nomor_tiket}</div>
                      <div className="text-xs text-slate-400">{activity.nama_pelapor || 'Anonim'} - {activity.kategori}</div>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-medium text-white mb-1">{activity.status}</div>
                    <div className="text-[10px] text-slate-500">
                      {new Date(activity.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-slate-500 text-sm flex flex-col items-center justify-center h-48 border border-dashed border-slate-800 rounded-xl bg-slate-950/50">
                <Waves className="w-8 h-8 text-slate-700 mb-3" />
                <span>Belum ada data saran & masukan masuk.</span>
              </div>
            )}
          </div>
        </div>

        {/* Status Server / Info Singkat */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-base font-semibold text-white mb-4">Statistik Saran & Masukan</h2>
          
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-slate-400">Tingkat Penyelesaian</span>
                <span className="text-xs font-bold text-emerald-400">{penyelesaianPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                <div className="bg-emerald-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: `${penyelesaianPercent}%` }}></div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-slate-400">Menunggu Tindakan (Pending)</span>
                <span className="text-xs font-bold text-rose-400">{pendingPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                <div className="bg-rose-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: `${pendingPercent}%` }}></div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-800 mt-2">
               <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Total Tiket Keseluruhan</span>
                  <span className="text-sm font-bold text-white">{totalAduan} Tiket</span>
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
    <div className="group bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl hover:border-slate-700 transition-all duration-300 relative overflow-hidden">
      <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full ${bgColor} blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-2.5 rounded-xl ${bgColor} border ${borderColor} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
        <div className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${bgColor} ${color} border ${borderColor}`}>
          {trend}
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="text-2xl font-bold text-white mb-1 tracking-tight">{value}</div>
        <h3 className="text-slate-400 text-xs font-medium">{title}</h3>
      </div>
    </div>
  );
}
