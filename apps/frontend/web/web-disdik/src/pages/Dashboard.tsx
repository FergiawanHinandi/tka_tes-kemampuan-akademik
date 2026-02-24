import React, { useState } from 'react';
import { 
  School, 
  Users, 
  ClipboardCheck, 
  AlertCircle, 
  ArrowUpRight, 
  TrendingUp, 
  Map, 
  FileDown,
  Loader2
} from 'lucide-react';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'excel' | 'pdf') => {
    setIsExporting(true);
    try {
      const response = await axios({
        url: `http://localhost:3000/api/exams/export/${format}`,
        method: 'GET',
        responseType: 'blob',
        // Headers auth bisa ditambahkan jika sudah ada store
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `laporan-tka.${format === 'excel' ? 'xlsx' : 'pdf'}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Gagal mengunduh laporan. Pastikan server backend berjalan.');
    } finally {
      setIsExporting(false);
    }
  };
  const stats = [
    { label: 'Total Sekolah', value: '1.240', icon: <School className="text-teal-600" />, change: '+5', positive: true },
    { label: 'Siswa Terdaftar', value: '85.420', icon: <Users className="text-blue-600" />, change: '+1.2k', positive: true },
    { label: 'Ujian Selesai', value: '45.102', icon: <ClipboardCheck className="text-emerald-600" />, change: '92%', positive: true },
    { label: 'Sekolah Aktif', value: '98%', icon: <TrendingUp className="text-amber-600" />, change: 'High', positive: true },
  ];

  const criticalIssues = [
    { id: 1, school: 'SMPN 1 Bandung', issue: 'Server Offline', time: '5 menit lalu', severity: 'high' },
    { id: 2, school: 'SDN 05 Sukabumi', issue: 'Sinkronisasi Gagal', time: '12 menit lalu', severity: 'medium' },
    { id: 3, school: 'SMAN 3 Bogor', issue: 'Log Kecurangan', time: '1 jam lalu', severity: 'low' },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard Monitoring</h2>
          <p className="text-gray-500 font-medium mt-1 uppercase tracking-widest text-[10px] font-black">Data Nasional - Wilayah Jawa Barat</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all hover:shadow-md">
            <Map size={18} />
            <span>Lihat Peta</span>
          </button>
          <div className="flex bg-teal-600 rounded-xl shadow-lg shadow-teal-500/30 overflow-hidden">
            <button 
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
              className="flex items-center gap-2 px-5 py-2.5 text-white font-bold hover:bg-teal-700 transition-all border-r border-teal-500/30 disabled:opacity-50"
            >
              {isExporting ? <Loader2 size={18} className="animate-spin" /> : <FileDown size={18} />}
              <span>PDF</span>
            </button>
            <button 
              onClick={() => handleExport('excel')}
              disabled={isExporting}
              className="flex items-center gap-2 px-5 py-2.5 text-white font-bold hover:bg-teal-700 transition-all disabled:opacity-50"
            >
              {isExporting ? <Loader2 size={18} className="animate-spin" /> : <FileDown size={18} />}
              <span>Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-teal-50 rounded-xl">
                {stat.icon}
              </div>
              <div className={`text-xs font-black px-2 py-1 rounded-full ${stat.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.change}
              </div>
            </div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-gray-900 tabular-nums leading-none">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Participation Chart */}
        <div className="xl:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Tren Partisipasi</h3>
              <p className="text-gray-500 text-sm font-medium">Monitoring pergerakan peserta ujian harian</p>
            </div>
            <select className="bg-gray-50 border-none rounded-lg text-sm font-bold text-gray-600 px-4 py-2 outline-none cursor-pointer focus:ring-2 focus:ring-teal-500">
              <option>Per Hari</option>
              <option>Per Sesi</option>
              <option>Per Wilayah</option>
            </select>
          </div>
          <div className="h-80 w-full bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
            <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mb-4">
              <TrendingUp size={32} className="text-teal-500" />
            </div>
            <p className="font-bold text-gray-500 uppercase tracking-widest text-[10px]">Visualisasi Grafik Partisipasi</p>
            <p className="text-xs font-medium">Integrasi Chart.js sedang disiapkan...</p>
          </div>
        </div>

        {/* Critical Issues */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Isu Kritikal</h3>
            <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full animate-pulse">3 AKTIF</span>
          </div>
          <div className="space-y-6">
            {criticalIssues.map((issue) => (
              <div key={issue.id} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 transition-all cursor-pointer group shadow-sm">
                <div className={`p-2 rounded-lg ${
                  issue.severity === 'high' ? 'bg-red-100 text-red-600' : 
                  issue.severity === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  <AlertCircle size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-gray-900 group-hover:text-teal-600 transition-colors">{issue.school}</p>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-tighter mt-0.5">{issue.issue}</p>
                  <p className="text-[10px] text-gray-400 mt-2 font-black italic">{issue.time}</p>
                </div>
                <div className="shrink-0">
                  <ArrowUpRight size={16} className="text-gray-300 group-hover:text-teal-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-sm font-black text-teal-600 bg-teal-50 rounded-xl hover:bg-teal-100 transition-all uppercase tracking-widest">
            Buka Monitoring Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
