import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Shield, 
  User,
  MoreVertical,
  ArrowRight,
  Send,
  X
} from 'lucide-react';
import { io } from 'socket.io-client';

const AuditLog: React.FC = () => {
  const [socket, setSocket] = useState<any>(null);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastType, setBroadcastType] = useState('INFO');

  const [logs, setLogs] = useState([
    { id: 1, type: 'CRITICAL', student: 'Ahmad Khairul', activity: 'Mencoba membuka tab baru', time: '14:20:05', status: 'Blocked' },
    { id: 2, type: 'INFO', student: 'Siti Aminah', activity: 'Submit jawaban No. 12', time: '14:19:58', status: 'Success' },
    { id: 3, type: 'WARNING', student: 'Budi Santoso', activity: 'Koneksi internet tidak stabil', time: '14:18:30', status: 'Resolved' },
    { id: 4, type: 'CRITICAL', student: 'Rina Wijaya', activity: 'Aplikasi diminimize paksa', time: '14:15:12', status: 'Warning Sent' },
  ]);

  useEffect(() => {
    const newSocket = io('http://localhost:3000/exam');
    setSocket(newSocket);

    newSocket.on('proctorAlert', (data: any) => {
      setLogs(prev => [{
        id: Date.now(),
        type: data.type,
        student: `Student ${data.studentId}`,
        activity: data.activity,
        time: new Date().toLocaleTimeString(),
        status: 'Reported'
      }, ...prev].slice(0, 50));
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handleSendBroadcast = () => {
    if (!broadcastMessage.trim()) return;
    
    socket.emit('broadcastAnnouncement', {
      sessionId: 'SESSION-001', // Should be dynamic
      message: broadcastMessage,
      type: broadcastType
    });

    setBroadcastMessage('');
    setShowBroadcastModal(false);
    alert('Pengumuman berhasil disiarkan ke semua siswa.');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Shield className="text-orange-600" size={32} />
            Monitoring & Audit Log
          </h2>
          <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">Pengawasan Real-time Aktivitas Ujian Siswa</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500" size={16} />
            <input 
              type="text" 
              placeholder="Cari nama siswa..." 
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-orange-500 w-64 shadow-sm transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-black text-xs hover:bg-slate-800 transition-all shadow-lg active:scale-95">
            FILTER LOG
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Real-time Feed */}
        <div className="xl:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest">Aktivitas Terkini</h3>
            <span className="flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              LIVE UPDATING
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white border-b border-slate-50">
                  <th className="text-left p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Waktu</th>
                  <th className="text-left p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Siswa</th>
                  <th className="text-left p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Aktivitas</th>
                  <th className="text-left p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="p-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logs.map((log) => (
                  <tr key={log.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                        <Clock size={14} />
                        {log.time}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                          <User size={16} />
                        </div>
                        <span className="font-black text-sm text-slate-800">{log.student}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        {log.type === 'CRITICAL' ? <AlertTriangle size={16} className="text-red-500" /> : 
                         log.type === 'WARNING' ? <AlertTriangle size={16} className="text-amber-500" /> : 
                         <CheckCircle2 size={16} className="text-emerald-500" />}
                        <span className={`text-sm font-bold ${log.type === 'CRITICAL' ? 'text-red-600' : 'text-slate-600'}`}>
                          {log.activity}
                        </span>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest ${
                        log.type === 'CRITICAL' ? 'bg-red-50 text-red-600' : 
                        log.type === 'WARNING' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <button className="p-2 text-slate-300 hover:text-orange-600 transition-colors">
                        <ArrowRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 tracking-tight mb-6">Ringkasan Sesi</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Siswa Aktif</p>
                <p className="text-xl font-black text-slate-900">124 / 150</p>
              </div>
              <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-orange-500 rounded-full" style={{ width: '82%' }} />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-tighter">Anomali</p>
                  <p className="text-lg font-black text-slate-900">3</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">Selesai</p>
                  <p className="text-lg font-black text-slate-900">42</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden group">
            <Activity className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-black uppercase tracking-widest mb-4">Kendali Cepat</h4>
            <div className="space-y-3">
              <button className="w-full py-3 bg-red-600 hover:bg-red-500 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-colors">
                HENTIKAN SEMUA SESI
              </button>
              <button 
                onClick={() => setShowBroadcastModal(true)}
                className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-colors border border-white/10"
              >
                SIARKAN PENGUMUMAN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Broadcast Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Siarkan Pengumuman</h3>
              <button onClick={() => setShowBroadcastModal(false)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tipe Pesan</label>
                <div className="grid grid-cols-3 gap-3">
                  {['INFO', 'WARNING', 'URGENT'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setBroadcastType(t)}
                      className={`py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        broadcastType === t 
                          ? 'bg-slate-900 text-white shadow-lg' 
                          : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Isi Pengumuman</label>
                <textarea 
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="Ketik pesan yang ingin disiarkan ke seluruh siswa..."
                  className="w-full h-32 px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-slate-900 resize-none transition-all"
                />
              </div>
            </div>
            <div className="p-8 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setShowBroadcastModal(false)}
                className="px-6 py-3 bg-white text-slate-500 rounded-2xl font-black text-xs hover:bg-slate-100 transition-all"
              >
                BATAL
              </button>
              <button 
                onClick={handleSendBroadcast}
                className="flex items-center gap-2 px-8 py-3 bg-orange-600 text-white rounded-2xl font-black text-xs shadow-lg shadow-orange-500/20 hover:bg-orange-700 transition-all active:scale-95"
              >
                <Send size={16} />
                KIRIM SEKARANG
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLog;
