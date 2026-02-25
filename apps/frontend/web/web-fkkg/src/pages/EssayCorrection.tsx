import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  User, 
  Save,
  MessageSquare
} from 'lucide-react';

const EssayCorrection: React.FC = () => {
  const [submissions] = useState([
    { id: 1, student: 'Ahmad Khairul', question: 'Jelaskan proses fotosintesis secara singkat!', answer: 'Fotosintesis adalah proses tumbuhan hijau mengubah energi cahaya menjadi energi kimia...', time: '14:20' },
    { id: 2, student: 'Siti Aminah', question: 'Sebutkan 3 ciri makhluk hidup!', answer: 'Bernapas, makan, berkembang biak.', time: '14:25' },
  ]);

  const [selected, setSelected] = useState<any>(null);
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Koreksi Manual Essay</h2>
        <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">Penilaian Jawaban Terbuka Siswa</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List Jawaban */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Antrian Jawaban</h3>
          {submissions.map((sub) => (
            <div 
              key={sub.id}
              onClick={() => setSelected(sub)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer group ${
                selected?.id === sub.id ? 'bg-indigo-600 border-indigo-500 shadow-xl shadow-indigo-200 text-white' : 'bg-white border-slate-100 hover:border-indigo-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selected?.id === sub.id ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600'}`}>
                  <User size={16} />
                </div>
                <span className="font-black text-sm">{sub.student}</span>
              </div>
              <p className={`text-xs line-clamp-2 ${selected?.id === sub.id ? 'text-indigo-100' : 'text-slate-500'}`}>{sub.question}</p>
            </div>
          ))}
        </div>

        {/* Panel Koreksi */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-indigo-600">
                  <FileText size={20} />
                  <h4 className="font-black uppercase tracking-widest text-xs">Butir Pertanyaan</h4>
                </div>
                <p className="text-xl font-bold text-slate-800 leading-relaxed">{selected.question}</p>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <MessageSquare size={18} />
                  <h4 className="font-black uppercase tracking-widest text-[10px]">Jawaban Siswa</h4>
                </div>
                <p className="text-slate-700 leading-relaxed italic">"{selected.answer}"</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-50">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Berikan Skor (0-100)</label>
                  <input 
                    type="number" 
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-lg font-black text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Umpan Balik (Opsional)</label>
                  <input 
                    type="text" 
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Tulis masukan..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button className="px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-xs hover:bg-slate-200 transition-all">
                  LEWATI
                </button>
                <button className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">
                  <Save size={18} /> SIMPAN PENILAIAN
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-300">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={40} />
              </div>
              <p className="font-black uppercase tracking-widest text-xs">Pilih jawaban untuk mulai mengoreksi</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EssayCorrection;
