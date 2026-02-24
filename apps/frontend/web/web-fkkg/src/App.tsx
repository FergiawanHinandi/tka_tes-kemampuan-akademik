import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EditorPage from './pages/Editor';
import EssayCorrection from './pages/EssayCorrection';
import ItemAnalysis from './pages/ItemAnalysis';

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
          path="/analysis"
          element={
            <Layout>
              <ItemAnalysis />
            </Layout>
          }
        />
        <Route
          path="/editor"
          element={
            <Layout>
              <EditorPage />
            </Layout>
          }
        />
        <Route
          path="/upload"
          element={
            <Layout>
              <div className="p-12 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Upload Soal</h2>
                <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-[10px]">Halaman unggah soal sedang dalam pengembangan.</p>
              </div>
            </Layout>
          }
        />
        <Route
          path="/review"
          element={
            <Layout>
              <EssayCorrection />
            </Layout>
          }
        />
        <Route
          path="/monitoring"
          element={
            <Layout>
              <div className="p-12 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Monitoring Ujian</h2>
                <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-[10px]">Halaman monitoring ujian sedang dalam pengembangan.</p>
              </div>
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <div className="p-12 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Profil Pengguna</h2>
                <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-[10px]">Halaman profil sedang dalam pengembangan.</p>
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
