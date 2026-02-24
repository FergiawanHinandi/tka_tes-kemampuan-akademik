import React, { useState } from 'react';
import { 
  Save, 
  ArrowLeft, 
  Settings, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import QuestionEditor from '../components/Editor/QuestionEditor';

const EditorPage: React.FC = () => {
  const [questionContent, setQuestionContent] = useState('');
  const [category, setCategory] = useState('Matematika');
  const [type, setType] = useState('MULTIPLE_CHOICE');
  const [difficulty, setDifficulty] = useState('Sedang');

  const handleSave = () => {
    console.log('Saving Question:', {
      content: questionContent,
      category,
      type,
      difficulty
    });
    alert('Soal berhasil disimpan (simulasi)');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-3 bg-white rounded-2xl border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Editor Butir Soal</h2>
            <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">Pembuatan Konten Ujian Nasional</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all active:scale-95">
            <Settings size={18} />
            <span>Opsi Lanjut</span>
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30 active:scale-95"
          >
            <Save size={18} />
            <span>Simpan Soal</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Utama */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-2">
              <HelpCircle size={14} className="text-indigo-500" />
              Isi Pertanyaan
            </label>
            <QuestionEditor 
              content={questionContent} 
              onChange={setQuestionContent} 
            />
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-slate-800 tracking-tight">Pilihan Jawaban (Multiple Choice)</h3>
            <div className="space-y-4">
              {['A', 'B', 'C', 'D'].map((opt) => (
                <div key={opt} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-black text-slate-400 group-focus-within:bg-indigo-600 group-focus-within:text-white transition-all">
                    {opt}
                  </div>
                  <input 
                    type="text" 
                    placeholder={`Masukkan teks pilihan ${opt}...`}
                    className="flex-1 px-5 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-indigo-500 transition-all font-medium text-slate-700"
                  />
                  <button className="p-3 text-slate-300 hover:text-emerald-500 transition-colors" title="Set sebagai kunci">
                    <CheckCircle2 size={24} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Pengaturan */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
            <h3 className="text-lg font-black text-slate-800 tracking-tight">Metadata Soal</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kategori / Mapel</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option>Matematika</option>
                  <option>Bahasa Indonesia</option>
                  <option>IPA Terpadu</option>
                  <option>Bahasa Inggris</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tipe Pertanyaan</label>
                <select 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="MULTIPLE_CHOICE">Pilihan Ganda</option>
                  <option value="TRUE_FALSE">Benar / Salah</option>
                  <option value="SHORT_ANSWER">Isian Singkat</option>
                  <option value="ESSAY">Essay / Uraian</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tingkat Kesulitan</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Mudah', 'Sedang', 'Sulit'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        difficulty === level 
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                          : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex gap-3">
                <AlertCircle size={20} className="text-amber-500 shrink-0" />
                <p className="text-[10px] font-bold text-amber-700 leading-relaxed">
                  Semua soal akan melalui proses review oleh tim validator FKKG sebelum dipublikasikan ke Bank Soal Nasional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
