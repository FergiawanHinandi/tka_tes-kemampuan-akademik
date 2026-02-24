import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { useAuthStore } from './store/auth.store';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        
        {/* Placeholder for other routes */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Layout>
                <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
                  <h2 className="text-2xl font-bold text-slate-900">Manajemen User</h2>
                  <p className="text-slate-500 mt-2">Halaman manajemen user sedang dalam pengembangan.</p>
                </div>
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/schools"
          element={
            <PrivateRoute>
              <Layout>
                <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
                  <h2 className="text-2xl font-bold text-slate-900">Manajemen Sekolah</h2>
                  <p className="text-slate-500 mt-2">Halaman manajemen sekolah sedang dalam pengembangan.</p>
                </div>
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/students"
          element={
            <PrivateRoute>
              <Layout>
                <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
                  <h2 className="text-2xl font-bold text-slate-900">Manajemen Siswa</h2>
                  <p className="text-slate-500 mt-2">Halaman manajemen siswa sedang dalam pengembangan.</p>
                </div>
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/exams"
          element={
            <PrivateRoute>
              <Layout>
                <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
                  <h2 className="text-2xl font-bold text-slate-900">Manajemen Ujian</h2>
                  <p className="text-slate-500 mt-2">Halaman manajemen ujian sedang dalam pengembangan.</p>
                </div>
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
