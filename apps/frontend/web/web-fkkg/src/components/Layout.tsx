import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  Edit3, 
  Eye, 
  BarChart3, 
  User as UserIcon,
  GraduationCap,
  Bell,
  LogOut,
  Search
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Editor Soal', path: '/editor', icon: <Upload size={20} /> },
    { name: 'Review Essay', path: '/review', icon: <Eye size={20} /> },
    { name: 'Analisis Butir', path: '/analysis', icon: <BarChart3 size={20} /> },
    { name: 'Monitoring', path: '/monitoring', icon: <BarChart3 size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-600 rounded-xl w-10 h-10 flex items-center justify-center shadow-lg shadow-indigo-200">
              <GraduationCap className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none">Portal FKKG</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Forum Komunikasi Guru</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl group focus-within:ring-2 focus-within:ring-indigo-500 transition-all w-80">
              <Search size={18} className="text-slate-400 group-focus-within:text-indigo-600" />
              <input 
                type="text" 
                placeholder="Cari bank soal atau materi..." 
                className="bg-transparent border-none outline-none text-sm w-full font-medium text-slate-600 placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                <Bell size={22} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="h-8 w-px bg-slate-200 mx-2" />
              
              <div className="flex items-center space-x-3 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Dr. Suryadi, M.Pd</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">Ketua FKKG</p>
                </div>
                <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center border-2 border-indigo-500 overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                  <UserIcon size={20} className="text-indigo-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-slate-200 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto no-scrollbar">
          <nav className="p-6 space-y-1.5">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2">Main Navigation</p>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 p-3.5 rounded-xl font-bold text-sm transition-all duration-200 group ${
                    isActive 
                      ? 'text-white bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg shadow-indigo-200' 
                      : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  <span className={`${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          
          <div className="absolute bottom-0 w-full p-6">
            <button className="flex items-center space-x-3 p-3.5 w-full rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100">
              <LogOut size={20} />
              <span>Keluar Sesi</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 animate-in fade-in duration-700 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
