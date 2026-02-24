import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  School, 
  ClipboardCheck, 
  FileText, 
  User as UserIcon,
  Settings,
  MapPin,
  Bell,
  LogOut
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Daftar Sekolah', path: '/schools', icon: <School size={20} /> },
    { name: 'Hasil Ujian', path: '/results', icon: <ClipboardCheck size={20} /> },
    { name: 'Laporan', path: '/reports', icon: <FileText size={20} /> },
    { name: 'Profil', path: '/profile', icon: <UserIcon size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-teal-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-teal-600 font-bold text-xl tracking-tighter">TKA</span>
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight">Portal Disdik</h1>
              <p className="text-teal-100 text-[10px] uppercase tracking-widest font-bold">Monitoring Ujian Nasional</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center bg-teal-700/50 px-4 py-2 rounded-xl border border-teal-500/30 gap-2 cursor-default">
              <MapPin size={16} className="text-teal-200" />
              <span className="text-sm font-bold text-teal-50">Jawa Barat</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-teal-500 rounded-lg transition-colors">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-teal-600"></span>
              </button>
              
              <div className="flex items-center space-x-3 border-l border-teal-500/50 pl-4 py-1">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold">Dr. Rahmawati</p>
                  <p className="text-teal-100 text-[10px] uppercase tracking-tighter font-black">Kepala Bidang</p>
                </div>
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center border-2 border-teal-400 overflow-hidden shadow-inner">
                  <UserIcon size={20} className="text-teal-600" />
                </div>
              </div>
              
              <button className="p-2 hover:bg-red-500 rounded-lg transition-colors group">
                <LogOut size={20} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-[72px] z-40">
        <div className="container mx-auto px-6 flex justify-center sm:justify-start">
          <div className="flex space-x-2 sm:space-x-8 overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`py-4 px-4 flex items-center gap-2 font-bold text-sm transition-all relative ${
                    isActive 
                      ? 'text-teal-600' 
                      : 'text-gray-500 hover:text-teal-600'
                  }`}
                >
                  {isActive && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-t-full" />}
                  <span className={isActive ? 'scale-110' : ''}>{item.icon}</span>
                  <span className="hidden sm:inline">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8 animate-in fade-in duration-700">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-6 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
        &copy; 2026 TKA Portal Disdik &bull; Dinas Pendidikan Nasional
      </footer>
    </div>
  );
};

export default Layout;
