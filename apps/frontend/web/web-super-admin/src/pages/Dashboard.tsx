import React from 'react';
import { 
  Users, 
  School, 
  GraduationCap, 
  ClipboardCheck, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  MoreVertical,
  Download
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Sekolah', value: '2.540', icon: <School className="text-blue-600" />, change: '+12%', positive: true },
    { label: 'Total Siswa', value: '45.210', icon: <GraduationCap className="text-emerald-600" />, change: '+5.4%', positive: true },
    { label: 'Ujian Berjalan', value: '124', icon: <ClipboardCheck className="text-amber-600" />, change: '-2%', positive: false },
    { label: 'Admin Aktif', value: '3.120', icon: <Users className="text-purple-600" />, change: '+8%', positive: true },
  ];

  const recentActivities = [
    { id: 1, action: 'Sinkronisasi Data', target: 'SMPN 1 Jakarta', time: '10 menit yang lalu', status: 'Selesai' },
    { id: 2, action: 'Import Siswa', target: 'SDN 05 Bandung', time: '25 menit yang lalu', status: 'Proses' },
    { id: 3, action: 'Update Soal', target: 'Bank Soal Matematika', time: '1 jam yang lalu', status: 'Selesai' },
    { id: 4, action: 'Audit Log', target: 'Admin Sekolah A', time: '2 jam yang lalu', status: 'Gagal' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Selamat Datang, Super Admin 👋</h2>
          <p className="text-slate-500 mt-2 font-medium">Monitoring sistem Tes Kemampuan Akademik hari ini, <span className="text-blue-600 font-bold">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>.</p>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all hover:shadow-md">
            <Calendar size={18} />
            <span>Range Tanggal</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0">
            <Download size={18} />
            <span>Export Laporan</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3.5 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 tabular-nums">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Activity Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Chart Placeholder */}
        <div className="xl:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Statistik Partisipasi Ujian</h3>
              <p className="text-slate-500 text-sm font-medium">Data partisipasi siswa secara nasional 7 hari terakhir</p>
            </div>
            <select className="bg-slate-50 border-none rounded-lg text-sm font-bold text-slate-600 px-4 py-2 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500">
              <option>7 Hari Terakhir</option>
              <option>30 Hari Terakhir</option>
              <option>Pilih Bulan</option>
            </select>
          </div>
          <div className="h-80 w-full bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 group hover:bg-blue-50/30 transition-colors cursor-default">
            <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ClipboardCheck size={32} className="text-blue-500" />
            </div>
            <p className="font-bold text-slate-500">Visualisasi Grafik (Recharts/Chart.js)</p>
            <p className="text-sm">Data sedang dikumpulkan...</p>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Aktivitas Terkini</h3>
            <button className="text-slate-400 hover:text-blue-600 transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="space-y-6">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className={`w-2.5 h-2.5 rounded-full mt-2 shrink-0 ${
                  activity.status === 'Selesai' ? 'bg-emerald-500' : 
                  activity.status === 'Proses' ? 'bg-blue-500 animate-pulse' : 'bg-red-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{activity.action}</p>
                  <p className="text-xs text-slate-500 font-medium truncate">{activity.target}</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">{activity.time}</p>
                </div>
                <div className="shrink-0">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                    activity.status === 'Selesai' ? 'bg-emerald-50 text-emerald-600' : 
                    activity.status === 'Proses' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-sm font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all uppercase tracking-widest">
            Lihat Semua Aktivitas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
