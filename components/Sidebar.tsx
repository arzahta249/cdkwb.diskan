'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Newspaper, 
  MessageSquare, 
  LogOut, 
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(pathname.includes('/dashboard/news'));

  const handleLogout = async () => {
    // Secara praktis, kita bisa menghapus cookie dari sisi server dengan route API logout
    // Untuk kesederhanaan, kita bisa menghapus semua local data dan memanggil API yang clear cookie
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    localStorage.removeItem('user');
    router.push('/login');
  };

  const NavItem = ({ href, icon: Icon, children, exact = false }: any) => {
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    return (
      <Link
        href={href}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
          isActive 
            ? 'bg-blue-600/10 text-blue-500 font-medium' 
            : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
        }`}
      >
        <Icon className="w-5 h-5" />
        {children}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#171717] rounded-lg border border-white/10"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-72 bg-[#0a0a0a] border-r border-white/5 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xl font-bold text-white tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              D
            </div>
            Diskan Admin
          </div>
          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto">
          <NavItem href="/dashboard" icon={LayoutDashboard} exact>
            Dashboard
          </NavItem>

          {/* Dropdown News */}
          <div className="space-y-1">
            <button
              onClick={() => setIsNewsOpen(!isNewsOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                pathname.includes('/dashboard/news')
                  ? 'bg-blue-600/10 text-blue-500 font-medium'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Newspaper className="w-5 h-5" />
                <span>News</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isNewsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isNewsOpen && (
              <div className="pl-11 pr-2 py-2 space-y-1">
                <Link 
                  href="/dashboard/news/create"
                  className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                    pathname === '/dashboard/news/create'
                      ? 'text-white bg-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Buat News
                </Link>
                <Link 
                  href="/dashboard/news"
                  className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                    pathname === '/dashboard/news'
                      ? 'text-white bg-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Lihat Data News
                </Link>
              </div>
            )}
          </div>

          <NavItem href="/dashboard/aduan" icon={MessageSquare}>
            Aduan
          </NavItem>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
