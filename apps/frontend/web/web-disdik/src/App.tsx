import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';

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
          path="/schools"
          element={
            <Layout>
              <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Daftar Sekolah</h2>
                <p className="text-gray-500 font-medium mt-2">Halaman daftar sekolah sedang dalam pengembangan.</p>
              </div>
            </Layout>
          }
        />
        <Route
          path="/results"
          element={
            <Layout>
              <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Hasil Ujian</h2>
                <p className="text-gray-500 font-medium mt-2">Halaman hasil ujian sedang dalam pengembangan.</p>
              </div>
            </Layout>
          }
        />
        <Route
          path="/reports"
          element={
            <Layout>
              <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Laporan</h2>
                <p className="text-gray-500 font-medium mt-2">Halaman laporan sedang dalam pengembangan.</p>
              </div>
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Profil</h2>
                <p className="text-gray-500 font-medium mt-2">Halaman profil sedang dalam pengembangan.</p>
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
