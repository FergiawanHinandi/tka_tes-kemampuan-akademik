import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AuditLog from './pages/Monitoring/AuditLog';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/monitoring"
          element={
            <Layout>
              <AuditLog />
            </Layout>
          }
        />
        <Route
          path="/students"
          element={
            <Layout>
              <div className="p-12 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Manajemen Data Siswa</h2>
                <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-[10px]">Halaman manajemen siswa sedang dalam pengembangan.</p>
              </div>
            </Layout>
          }
        />
        <Route
          path="/rooms"
          element={
            <Layout>
              <div className="p-12 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Manajemen Ruang Ujian</h2>
                <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-[10px]">Halaman manajemen ruang sedang dalam pengembangan.</p>
              </div>
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout>
              <div className="p-12 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Pengaturan Sesi Ujian</h2>
                <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-[10px]">Halaman pengaturan ujian sedang dalam pengembangan.</p>
              </div>
            </Layout>
          }
        />
        <Route
          path="/results"
          element={
            <Layout>
              <div className="p-12 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Rekapitulasi Hasil</h2>
                <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-[10px]">Halaman hasil ujian sedang dalam pengembangan.</p>
              </div>
            </Layout>
          }
        />
        <Route
          path="/download"
          element={
            <Layout>
              <div className="p-12 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Pusat Unduhan</h2>
                <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-[10px]">Halaman unduhan sedang dalam pengembangan.</p>
              </div>
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
