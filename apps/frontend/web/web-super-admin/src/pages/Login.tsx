import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import api from '../api/client';
import { useAuthStore } from '../store/auth.store';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, accessToken, refreshToken } = response.data.data;
      
      setAuth(user, accessToken, refreshToken);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal login. Periksa kembali email dan password Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl shadow-blue-500/5 border border-slate-100 overflow-hidden">
          <div className="p-8 pb-0 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mb-6">
              <Lock size={32} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">TKA Portal</h1>
            <p className="text-slate-500 mt-2 font-medium uppercase tracking-widest text-xs">Super Admin Login</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email / Username</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all font-medium text-slate-900"
                  placeholder="admin@tka-nasional.id"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all font-medium text-slate-900"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={22} />
                  <span>MEMPROSES...</span>
                </>
              ) : (
                <span>MASUK SEKARANG</span>
              )}
            </button>
            
            <div className="text-center">
              <a href="#" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">Lupa password? Hubungi IT Support</a>
            </div>
          </form>
        </div>
        
        <p className="text-center mt-8 text-slate-400 text-xs font-bold uppercase tracking-widest">
          &copy; 2026 TKA Nasional &bull; v1.0.0
        </p>
      </div>
    </div>
  );
};

export default Login;
