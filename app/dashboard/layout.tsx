import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#121212] flex text-white font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {/* Konten akan di-render di sini */}
        <div className="p-8 md:p-12 w-full max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
