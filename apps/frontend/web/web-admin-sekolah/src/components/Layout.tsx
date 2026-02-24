import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  GraduationCap, 
  Download, 
  LogOut,
  Bell,
  Search,
  User as UserIcon,
  Home,
  Monitor
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Monitoring', path: '/monitoring', icon: <Activity size={20} /> },
    { name: 'Data Siswa', path: '/students', icon: <Users size={20} /> },
    { name: 'Ruang Ujian', path: '/rooms', icon: <Home size={20} /> },
    { name: 'Pengaturan Ujian', path: '/settings', icon: <Settings size={20} /> },
    { name: 'Hasil Ujian', path: '/results', icon: <GraduationCap size={20} /> },
    { name: 'Download Center', path: '/download', icon: <Download size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen shadow-sm">
        <div className="p-8 border-b border-orange-100 bg-gradient-to-br from-white to-orange-50/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
              <Monitor size={24} />
            </div>
            <h1 className="text-xl font-black text-orange-600 tracking-tight leading-none">Admin Sekolah</h1>
          </div>
          <div className="p-3 bg-orange-100/50 rounded-xl border-l-4 border-orange-500">
            <p className="text-xs font-black text-orange-800 uppercase tracking-tighter truncate">SMPN 1 JAKARTA</p>
            <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mt-0.5">Sekolah Menengah Pertama</p>
          </div>
        </div>
        
        <nav className="flex-1 py-6 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-8 py-3.5 transition-all duration-200 group ${
                  isActive 
                    ? 'text-orange-600 bg-orange-50 border-r-4 border-orange-600 font-black' 
                    : 'text-slate-500 hover:text-orange-600 hover:bg-orange-50/50'
                }`}
              >
                <span className={`${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-6 border-t border-slate-100">
          <button className="flex items-center gap-3 text-slate-500 hover:text-red-600 transition-all w-full px-4 py-3 rounded-xl hover:bg-red-50 font-black text-sm group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Keluar Sistem</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 bg-slate-100 px-4 py-2.5 rounded-2xl w-96 group focus-within:ring-2 focus-within:ring-orange-500 transition-all shadow-inner">
            <Search size={18} className="text-slate-400 group-focus-within:text-orange-500" />
            <input 
              type="text" 
              placeholder="Cari siswa, sesi, atau hasil..." 
              className="bg-transparent border-none outline-none text-sm w-full text-slate-700 font-medium placeholder:text-slate-400"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>
            
            <div className="h-8 w-px bg-slate-200" />
            
            <div className="flex items-center gap-3 cursor-pointer group p-1 pr-3 hover:bg-slate-50 rounded-full transition-all border border-transparent hover:border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 border-2 border-orange-500 overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                <UserIcon size={20} />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-none">Admin SMPN 1</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Operator Utama</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8 animate-in fade-in duration-700">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
