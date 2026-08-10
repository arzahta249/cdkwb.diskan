import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0B1121] flex text-slate-200 font-sans text-sm selection:bg-cyan-900 selection:text-cyan-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-cyan-900/20 blur-[100px] pointer-events-none -z-10"></div>
        
        {/* Konten akan di-render di sini */}
        <div className="p-6 md:p-10 w-full max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
