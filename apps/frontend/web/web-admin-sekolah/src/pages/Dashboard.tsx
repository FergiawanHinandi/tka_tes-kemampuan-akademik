import React from 'react';
import { 
  Users, 
  ClipboardCheck, 
  Home, 
  Calendar, 
  ArrowUpRight, 
  Plus,
  Monitor,
  Activity,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Siswa', value: '420', icon: <Users className="text-orange-600" />, sub: 'Siswa Terdaftar' },
    { label: 'Ruang Ujian', value: '12', icon: <Home className="text-blue-600" />, sub: 'Ruang Tersedia' },
    { label: 'Ujian Aktif', value: '3', icon: <Monitor className="text-emerald-600" />, sub: 'Sesi Berjalan' },
    { label: 'Kelulusan', value: '94%', icon: <ClipboardCheck className="text-purple-600" />, sub: 'Rata-rata Skor' },
  ];

  const sessions = [
    { id: 1, name: 'Sesi 1 - Matematika', time: '08:00 - 10:00', status: 'Berjalan', progress: 75 },
    { id: 2, name: 'Sesi 2 - B. Indonesia', time: '10:30 - 12:30', status: 'Menunggu', progress: 0 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative bg-gradient-to-r from-orange-600 to-red-600 p-10 rounded-3xl shadow-xl shadow-orange-200 overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-white tracking-tight leading-tight">Halo, Admin SMPN 1 👋</h2>
            <p className="text-orange-100 mt-3 text-lg font-medium">Persiapan Ujian TKA Nasional berjalan lancar. Pastikan semua komputer proktor sudah tersinkronisasi.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-white text-orange-600 rounded-2xl font-black text-sm shadow-lg hover:bg-orange-50 transition-all active:scale-95">
              Kelola Siswa
            </button>
            <button className="px-6 py-3 bg-orange-500/30 border border-white/20 text-white rounded-2xl font-black text-sm backdrop-blur-md hover:bg-orange-500/40 transition-all active:scale-95 flex items-center gap-2">
              <Plus size={18} /> Sesi Baru
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-orange-50 transition-colors">
                {stat.icon}
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-0.5">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900 leading-none">{stat.value}</h3>
                <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-tighter italic">{stat.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Active Sessions */}
        <div className="xl:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Activity size={20} />
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Monitoring Sesi Aktif</h3>
            </div>
            <button className="text-orange-600 text-xs font-black uppercase tracking-widest hover:underline">Detail Sesi</button>
          </div>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div key={session.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-orange-200 hover:bg-white transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-black text-slate-900">{session.name}</h4>
                    <p className="text-xs text-slate-500 font-bold flex items-center gap-1.5 mt-1 uppercase tracking-tighter">
                      <Calendar size={12} /> {session.time}
                    </p>
                  </div>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                    session.status === 'Berjalan' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {session.status}
                  </span>
                </div>
                <div className="relative h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`absolute top-0 left-0 h-full transition-all duration-1000 ${
                      session.status === 'Berjalan' ? 'bg-orange-500' : 'bg-slate-300'
                    }`}
                    style={{ width: `${session.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Penyelesaian</p>
                  <p className="text-sm font-black text-orange-600">{session.progress}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health / Alert */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <AlertTriangle size={20} />
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Status Sistem</h3>
          </div>
          <div className="space-y-4 flex-1">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-4 group cursor-pointer hover:bg-white hover:border-emerald-200 transition-all">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              <div className="flex-1">
                <p className="text-xs font-black text-emerald-800 uppercase tracking-widest leading-none">Sinkronisasi</p>
                <p className="text-[10px] text-emerald-600 font-bold mt-1">Terakhir 2 menit yang lalu</p>
              </div>
              <ArrowRight size={16} className="text-emerald-300 group-hover:text-emerald-500 transition-colors" />
            </div>
            
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-4 group cursor-pointer hover:bg-white hover:border-blue-200 transition-all">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <div className="flex-1">
                <p className="text-xs font-black text-blue-800 uppercase tracking-widest leading-none">Database Proktor</p>
                <p className="text-[10px] text-blue-600 font-bold mt-1">12 Server Terhubung</p>
              </div>
              <ArrowRight size={16} className="text-blue-300 group-hover:text-blue-500 transition-colors" />
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden group">
            <Monitor className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 group-hover:scale-110 transition-transform" />
            <h5 className="text-sm font-black uppercase tracking-widest mb-2">Bantuan Teknis</h5>
            <p className="text-xs text-slate-400 font-medium leading-relaxed mb-4">Butuh bantuan sinkronisasi atau masalah login proktor?</p>
            <button className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-colors">
              Hubungi Helpdesk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
