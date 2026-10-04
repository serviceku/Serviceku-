import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, X, ShieldCheck, AlertCircle, KeyRound } from 'lucide-react';
import { api } from '../services/api';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('serviceku123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await api.loginAdmin(username.trim(), password.trim());
      if (res.success) {
        onLoginSuccess();
        onClose();
      } else {
        setErrorMessage(res.message || 'Username atau password admin salah.');
      }
    } catch {
      setErrorMessage('Terjadi kendala saat login. Silakan coba kembali.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDefaultCredentials = () => {
    setUsername('admin');
    setPassword('serviceku123');
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 px-6 py-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Login Admin Serviceku</h2>
              <p className="text-xs text-blue-100">Portal Pengelolaan Jasa & Banner Promosi</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMessage && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <div>
                <p className="font-semibold">Gagal Masuk</p>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Username / Email Admin
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Masukkan username admin"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900"
              />
            </div>
          </div>

          {/* Password Input with Eye Icon Toggle */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700">
                Password / Kata Sandi
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                {showPassword ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" /> Sembunyikan
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" /> Lihat Password
                  </>
                )}
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Masukkan kata sandi"
                className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                title={showPassword ? 'Sembunyikan password' : 'Lihat password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-blue-600" />
                ) : (
                  <Eye className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Quick Credential Hint helper */}
          <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-blue-900">
              <KeyRound className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Default: <b>admin</b> / <b>serviceku123</b></span>
            </div>
            <button
              type="button"
              onClick={fillDefaultCredentials}
              className="text-[11px] font-semibold text-blue-700 hover:text-blue-800 underline ml-2 shrink-0"
            >
              Gunakan Default
            </button>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" /> Masuk ke Dashboard Admin
                </>
              )}
            </button>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
          Hanya untuk pemilik & pengelola resmi Serviceku Elektronik
        </div>
      </div>
    </div>
  );
};
