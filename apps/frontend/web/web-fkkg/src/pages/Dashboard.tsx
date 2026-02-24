import React from 'react';
import { 
  FileQuestion, 
  Database, 
  CheckCircle2, 
  Users, 
  ArrowUpRight, 
  TrendingUp, 
  Plus, 
  Search,
  MoreHorizontal
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Soal', value: '12.847', icon: <FileQuestion className="text-indigo-600" />, change: '+245', positive: true },
    { label: 'Bank Soal', value: '482', icon: <Database className="text-blue-600" />, change: '+12', positive: true },
    { label: 'Review Jawaban', value: '1.240', icon: <CheckCircle2 className="text-emerald-600" />, change: 'Selesai', positive: true },
    { label: 'Siswa Aktif', value: '8.420', icon: <Users className="text-amber-600" />, change: 'Monitoring', positive: true },
  ];

  const recentBankSoal = [
    { id: 1, name: 'Matematika SMP Kelas 7', category: 'Kurikulum Merdeka', items: 50, status: 'Aktif' },
    { id: 2, name: 'Bahasa Indonesia SD Kelas 4', category: 'Nasional', items: 40, status: 'Draft' },
    { id: 3, name: 'IPA Terpadu SMA Kelas 10', category: 'Kurikulum Merdeka', items: 60, status: 'Review' },
    { id: 4, name: 'Fisika Dasar SMA Kelas 12', category: 'Latihan', items: 35, status: 'Aktif' },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200">
            <TrendingUp className="text-indigo-600" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Ringkasan</h2>
            <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">Monitoring Pengembangan Soal Nasional</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all hover:shadow-md active:scale-95">
            <Database size={18} />
            <span>Lihat Bank Soal</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30 active:scale-95">
            <Plus size={18} />
            <span>Tambah Bank Soal</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 transition-colors">
                {stat.icon}
              </div>
              <div className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${stat.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.change}
              </div>
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-900 tabular-nums leading-none tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Bank Soal List */}
        <div className="xl:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Bank Soal Terkini</h3>
              <p className="text-slate-400 text-sm font-bold">Daftar pengembangan soal terbaru oleh FKKG</p>
            </div>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" size={16} />
              <input 
                type="text" 
                placeholder="Cari..." 
                className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 w-48"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="text-left py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Nama Bank Soal</th>
                  <th className="text-left py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Kategori</th>
                  <th className="text-left py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Jumlah</th>
                  <th className="text-left py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentBankSoal.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 font-black text-sm text-slate-800">{item.name}</td>
                    <td className="py-4 text-xs font-bold text-slate-500">{item.category}</td>
                    <td className="py-4 text-xs font-black text-indigo-600">{item.items} Soal</td>
                    <td className="py-4">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest ${
                        item.status === 'Aktif' ? 'bg-emerald-50 text-emerald-600' : 
                        item.status === 'Draft' ? 'bg-slate-100 text-slate-500' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                        <ArrowUpRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="w-full mt-8 py-4 text-xs font-black text-indigo-600 bg-indigo-50 rounded-2xl hover:bg-indigo-100 transition-all uppercase tracking-[0.2em]">
            Lihat Semua Bank Soal
          </button>
        </div>

        {/* Action Center Placeholder */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Pusat Aksi</h3>
            <MoreHorizontal size={20} className="text-slate-400" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-lg shadow-indigo-200 relative overflow-hidden group cursor-pointer active:scale-95 transition-all">
              <Plus className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 group-hover:scale-125 transition-transform" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-2">Editor Baru</p>
              <h4 className="text-lg font-black leading-tight mb-4">Mulai Membuat Paket Soal Ujian</h4>
              <span className="inline-flex items-center gap-2 text-xs font-black bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm group-hover:bg-white group-hover:text-indigo-600 transition-all">
                BUAT SEKARANG <ArrowUpRight size={14} />
              </span>
            </div>
            
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-white transition-all cursor-pointer group active:scale-95">
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2">Import Data</p>
              <h4 className="text-lg font-black text-slate-800 leading-tight mb-4">Tarik Soal dari File Excel / CSV</h4>
              <span className="text-xs font-black text-slate-400 group-hover:text-indigo-600 transition-colors flex items-center gap-2 uppercase tracking-widest">
                Unggah File <Upload size={14} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
