'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Newspaper, 
  FileText,
  MessageSquare, 
  Award,
  LogOut, 
  ChevronDown,
  Menu,
  X,
  Image as ImageIcon,
  Waves,
  Briefcase
} from 'lucide-react';

const NavItem = ({ href, icon: Icon, children, exact = false }: { href: string; icon: React.ElementType; children: React.ReactNode; exact?: boolean }) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-l-md rounded-r-none transition-all duration-300 ${
        isActive 
          ? 'bg-cyan-900/20 text-cyan-400 border-r-2 border-cyan-400 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] font-medium' 
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
      }`}
    >
      <Icon className={`w-4 h-4 ${isActive ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''}`} />
      <span className="text-sm tracking-wide">{children}</span>
    </Link>
  );
};

// Dropdown Button Component
const NavDropdownBtn = ({ isOpen, onClick, icon: Icon, children, activePath }: { isOpen: boolean; onClick: () => void; icon: React.ElementType; children: React.ReactNode; activePath: string }) => {
  const pathname = usePathname();
  const isActive = pathname.includes(activePath);
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-l-md rounded-r-none transition-all duration-300 ${
        isActive
          ? 'bg-cyan-900/20 text-cyan-400 border-r-2 border-cyan-400 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] font-medium'
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-4 h-4 ${isActive ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''}`} />
        <span className="text-sm tracking-wide">{children}</span>
      </div>
      <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
};

// Dropdown Link Component
const DropdownLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link 
      href={href}
      className={`block px-4 py-2 rounded-md text-[13px] transition-all duration-300 ${
        isActive
          ? 'text-cyan-300 bg-cyan-900/30'
          : 'text-slate-400 hover:text-cyan-100 hover:bg-slate-800/50 hover:pl-5'
      }`}
    >
      {children}
    </Link>
  );
};

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(pathname.includes('/dashboard/news'));
  const [isArtikelOpen, setIsArtikelOpen] = useState(pathname.includes('/dashboard/articles') || pathname.includes('/dashboard/artikel'));
  const [isGaleriOpen, setIsGaleriOpen] = useState(pathname.includes('/dashboard/galeri'));

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    }
    localStorage.removeItem('user');
    router.replace('/adminCDKWB');
    router.refresh();
  };


  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#080C17] rounded-lg border border-cyan-900/50 shadow-lg shadow-cyan-900/20 text-cyan-400"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar Overlay */}
      {isMobileOpen ? (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/80 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      ) : null}

      {/* Sidebar Content */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#080C17]/95 backdrop-blur-xl border-r border-cyan-900/30 flex flex-col shadow-2xl
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between border-b border-cyan-900/30">
          <div className="flex items-center gap-3 text-lg font-bold text-slate-100 tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <Waves className="w-4 h-4 text-white" />
            </div>
            Diskan Admin
          </div>
          <button 
            className="md:hidden p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 pl-4 py-6 pr-0 flex flex-col gap-1.5 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <NavItem href="/dashboard" icon={LayoutDashboard} exact>
            Dashboard
          </NavItem>

          {/* Dropdown Berita */}
          <div className="space-y-1 pr-4 md:pr-0">
            <NavDropdownBtn 
              isOpen={isNewsOpen} 
              onClick={() => setIsNewsOpen(!isNewsOpen)} 
              icon={Newspaper}
              activePath="/dashboard/news"
            >
              Berita
            </NavDropdownBtn>
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isNewsOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
              <div className="pl-11 pr-4 py-1 space-y-1 border-l border-cyan-900/30 ml-6">
                <DropdownLink href="/dashboard/news/create">Buat Berita</DropdownLink>
                <DropdownLink href="/dashboard/news">Lihat Data Berita</DropdownLink>
              </div>
            </div>
          </div>

          {/* Dropdown Artikel */}
          <div className="space-y-1 pr-4 md:pr-0">
            <NavDropdownBtn 
              isOpen={isArtikelOpen} 
              onClick={() => setIsArtikelOpen(!isArtikelOpen)} 
              icon={FileText}
              activePath="/dashboard/artikel"
            >
              Artikel
            </NavDropdownBtn>
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isArtikelOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
              <div className="pl-11 pr-4 py-1 space-y-1 border-l border-cyan-900/30 ml-6">
                <DropdownLink href="/dashboard/artikel/create">Buat Artikel</DropdownLink>
                <DropdownLink href="/dashboard/artikel">Lihat Data Artikel</DropdownLink>
              </div>
            </div>
          </div>

          {/* Dropdown Galeri */}
          <div className="space-y-1 pr-4 md:pr-0">
            <NavDropdownBtn 
              isOpen={isGaleriOpen} 
              onClick={() => setIsGaleriOpen(!isGaleriOpen)} 
              icon={ImageIcon}
              activePath="/dashboard/galeri"
            >
              Galeri
            </NavDropdownBtn>
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isGaleriOpen ? 'max-h-60 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
              <div className="pl-11 pr-4 py-1 space-y-1 border-l border-cyan-900/30 ml-6">
                <DropdownLink href="/dashboard/galeri/foto">Kelola Foto</DropdownLink>
                <DropdownLink href="/dashboard/galeri/video">Kelola Video</DropdownLink>
                <DropdownLink href="/dashboard/galeri/infografis">Kelola Infografis</DropdownLink>
              </div>
            </div>
          </div>

          <NavItem href="/dashboard/aduan" icon={MessageSquare}>
            Aduan
          </NavItem>

          <NavItem href="/dashboard/kepuasan" icon={Award}>
            Survei Kepuasan
          </NavItem>

          <NavItem href="/dashboard/materi" icon={FileText}>
            Manajemen Materi
          </NavItem>

          <NavItem href="/dashboard/magang" icon={Briefcase}>
            Data Magang
          </NavItem>
        </nav>

        <div className="p-4 border-t border-cyan-900/30">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-md transition-colors text-sm font-medium border border-transparent hover:border-rose-500/20"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
