import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  School, 
  GraduationCap, 
  ClipboardList, 
  LogOut,
  Bell,
  Search,
  User as UserIcon
} from 'lucide-react';
import { useAuthStore } from '../store/auth.store';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Manajemen User', path: '/users', icon: <Users size={20} /> },
    { name: 'Sekolah', path: '/schools', icon: <School size={20} /> },
    { name: 'Siswa', path: '/students', icon: <GraduationCap size={20} /> },
    { name: 'Ujian', path: '/exams', icon: <ClipboardList size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-2xl font-bold text-blue-600 tracking-tight">TKA Super Admin</h1>
        </div>
        
        <nav className="flex-1 py-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 transition-all duration-200 ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-600 font-semibold' 
                    : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-6 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-slate-500 hover:text-red-600 transition-colors w-full px-2 py-2 rounded-lg hover:bg-red-50 font-bold"
          >
            <LogOut size={20} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-full w-96 group focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <Search size={18} className="text-slate-400 group-focus-within:text-blue-500" />
            <input 
              type="text" 
              placeholder="Cari data, laporan, atau pengaturan..." 
              className="bg-transparent border-none outline-none text-sm w-full text-slate-700 font-medium"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-slate-500 hover:text-blue-600 transition-colors">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-white">3</span>
            </button>
            
            <div className="h-8 w-px bg-slate-200" />
            
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{user?.name || 'Super Admin'}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">{user?.role || 'NASIONAL'}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border-2 border-blue-500 overflow-hidden group-hover:shadow-md transition-all">
                <UserIcon size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8 animate-in fade-in duration-500">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
