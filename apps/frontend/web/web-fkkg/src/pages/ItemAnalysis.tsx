import React, { useState } from 'react';
import { 
  BarChart2, 
  HelpCircle, 
  TrendingUp, 
  AlertCircle,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Activity
} from 'lucide-react';

const ItemAnalysis: React.FC = () => {
  const [analysisData] = useState([
    { id: 1, category: 'Matematika', content: 'Hasil dari 15 x 4 adalah...', difficulty: 0.85, discrimination: 0.45, correlation: 0.52, validity: 'Valid', status: 'Mudah' },
    { id: 2, category: 'Bahasa Indonesia', content: 'Ide pokok paragraf di atas adalah...', difficulty: 0.42, discrimination: 0.38, correlation: 0.41, validity: 'Valid', status: 'Sedang' },
    { id: 3, category: 'IPA', content: 'Fungsi mitokondria pada sel adalah...', difficulty: 0.15, discrimination: 0.12, correlation: 0.18, validity: 'Invalid', status: 'Sulit' },
    { id: 4, category: 'Matematika', content: 'Jika x + 5 = 12, maka x adalah...', difficulty: 0.78, discrimination: 0.52, correlation: 0.48, validity: 'Valid', status: 'Mudah' },
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <BarChart2 className="text-indigo-600" size={32} />
            Analisis Butir Soal
          </h2>
          <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">Evaluasi Kualitas Instrumen Ujian Nasional</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" size={16} />
            <input 
              type="text" 
              placeholder="Cari soal..." 
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 w-64 shadow-sm transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-black text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95">
            <Filter size={16} />
            FILTER DATA
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-0.5">Soal Berkualitas</p>
              <h3 className="text-2xl font-black text-slate-900 leading-none">85%</h3>
              <p className="text-[10px] text-emerald-500 font-bold mt-1">Daya Pembeda Baik</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-0.5">Perlu Revisi</p>
              <h3 className="text-2xl font-black text-slate-900 leading-none">12%</h3>
              <p className="text-[10px] text-amber-500 font-bold mt-1">Terlalu Sulit/Mudah</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl">
              <XCircle size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-0.5">Soal Ditolak</p>
              <h3 className="text-2xl font-black text-slate-900 leading-none">3%</h3>
              <p className="text-[10px] text-red-500 font-bold mt-1">Daya Pembeda Lemah</p>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Kategori</th>
                <th className="text-left p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Butir Soal</th>
                <th className="text-left p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Index Kesulitan</th>
                <th className="text-left p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Daya Pembeda</th>
                <th className="text-left p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Korelasi (r)</th>
                <th className="text-left p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Validitas</th>
                <th className="text-left p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {analysisData.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="p-6">
                    <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-tighter">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-6">
                    <p className="text-sm font-bold text-slate-800 line-clamp-1">{item.content}</p>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${item.difficulty > 0.7 ? 'bg-emerald-500' : item.difficulty < 0.3 ? 'bg-red-500' : 'bg-amber-500'}`}
                          style={{ width: `${item.difficulty * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-black text-slate-600">{item.difficulty.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={14} className={item.discrimination > 0.3 ? 'text-emerald-500' : 'text-red-500'} />
                      <span className="text-xs font-black text-slate-600">{item.discrimination.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="p-6 text-xs font-black text-slate-600">
                    {item.correlation.toFixed(2)}
                  </td>
                  <td className="p-6">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest ${
                      item.validity === 'Valid' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {item.validity}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest ${
                      item.status === 'Mudah' ? 'bg-emerald-50 text-emerald-600' : 
                      item.status === 'Sulit' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemAnalysis;
