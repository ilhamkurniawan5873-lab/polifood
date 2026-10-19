import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (emailOrNpm: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [identifier, setIdentifier] = useState('21753048@polinela.ac.id');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(identifier);
      onClose();
    }, 700);
  };

  const handleSSO = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('siti.rahmawati@polinela.ac.id');
      onClose();
    }, 800);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#283044]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-[#faf8ff] rounded-2xl shadow-2xl p-6 sm:p-7 relative overflow-hidden my-auto border border-[#eaedff]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#eaedff] flex items-center justify-center text-[#5a4138] hover:text-[#131b2e] transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Ambient subtle background glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#ffdbce]/30 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-[#6cf8bb]/20 blur-2xl pointer-events-none"></div>

        {/* Brand Header Section */}
        <div className="flex flex-col items-center text-center mt-1 mb-5">
          <div className="w-44 h-14 flex items-center justify-center mb-2">
            <img
              src={ASSETS.logo}
              alt="PoliFood Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6cf8bb]/30 text-[#005236] mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
            <span className="text-xs font-bold">Kampus Polinela Rajabasa</span>
          </div>
          <p className="text-xs text-[#5a4138] max-w-xs leading-relaxed">
            Kantin Digital & Pesan Antar Civitas Kampus Polinela
          </p>
        </div>

        {/* Main Auth Card */}
        <div className="bg-white rounded-xl shadow-xs border border-[#eaedff] p-5 sm:p-6 relative">
          {/* Tab Toggle */}
          <div className="flex items-center justify-center space-x-8 mb-5 pb-1 border-b border-[#eaedff]">
            <button
              type="button"
              onClick={() => setAuthTab('login')}
              className={`relative pb-2 font-display text-base font-bold transition-colors focus:outline-none ${
                authTab === 'login' ? 'text-[#a33900]' : 'text-[#5a4138]/60 hover:text-[#131b2e]'
              }`}
            >
              <span>Masuk</span>
              {authTab === 'login' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#a33900] rounded-full"></span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setAuthTab('register')}
              className={`relative pb-2 font-display text-base font-bold transition-colors focus:outline-none ${
                authTab === 'register' ? 'text-[#a33900]' : 'text-[#5a4138]/60 hover:text-[#131b2e]'
              }`}
            >
              <span>Daftar</span>
              {authTab === 'register' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#a33900] rounded-full"></span>
              )}
            </button>
          </div>

          {/* Form */}
          <form className="flex flex-col space-y-3.5" onSubmit={handleSubmit}>
            {/* Input 1: Identifier */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-bold text-[#131b2e] flex items-center justify-between">
                <span>Email Kampus / NPM</span>
                <span className="text-[11px] text-[#006c49] font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[14px]">school</span> Civitas
                </span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#5a4138] text-[18px] pointer-events-none">
                  badge
                </span>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="21753000@polinela.ac.id atau NPM 8 digit"
                  required
                  className="w-full bg-[#f2f3ff] text-[#131b2e] placeholder:text-[#5a4138]/50 text-xs rounded-lg pl-9 pr-3.5 py-2.5 focus:bg-white focus:ring-2 focus:ring-[#a33900] focus:outline-none transition-all border border-transparent focus:border-[#a33900]"
                />
              </div>
            </div>

            {/* Input 2: Password */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-bold text-[#131b2e]">
                Kata Sandi
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#5a4138] text-[18px] pointer-events-none">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi akun"
                  required
                  className="w-full bg-[#f2f3ff] text-[#131b2e] placeholder:text-[#5a4138]/50 text-xs rounded-lg pl-9 pr-10 py-2.5 focus:bg-white focus:ring-2 focus:ring-[#a33900] focus:outline-none transition-all border border-transparent focus:border-[#a33900]"
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 p-1 text-[#5a4138] hover:text-[#131b2e] focus:outline-none transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end pt-0.5">
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Instruksi pemulihan kata sandi dikirimkan ke email civitas Polinela Anda.');
                }}
                className="text-[11px] font-bold text-[#a33900] hover:underline"
              >
                Lupa Password?
              </a>
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-[#a33900] hover:bg-[#cc4900] text-white font-display font-bold text-sm rounded-xl py-3 px-4 shadow-sm active:scale-[0.98] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Memproses...</span>
              ) : (
                <>
                  <span>{authTab === 'login' ? 'Masuk ke PoliFood' : 'Daftar Akun Civitas'}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-2">
              <div className="w-full h-[1px] bg-[#e2e7ff]"></div>
              <span className="absolute px-3 bg-white text-[10px] text-[#5a4138]/70 font-semibold uppercase tracking-wider">
                atau masuk dengan
              </span>
            </div>

            {/* SSO Google Polinela Button */}
            <button
              type="button"
              onClick={handleSSO}
              className="w-full bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] text-xs font-semibold rounded-xl py-2.5 px-4 flex items-center justify-center space-x-3 active:scale-[0.99] transition-all border border-[#eaedff]"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
              </svg>
              <span>Akun SSO Google Polinela</span>
            </button>
          </form>
        </div>

        {/* Quick Landmark Pick Demonstration Pill */}
        <div className="mt-4 p-2.5 rounded-lg bg-[#eaedff] flex items-center justify-between text-[#131b2e]">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-full bg-[#6cf8bb] text-[#00714d] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[16px]">storefront</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#006c49] font-bold">18 Kantin Aktif Hari Ini</span>
              <span className="text-[11px] text-[#5a4138] truncate">Gedung Sakura • QB • Jurusan Pertanian</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#5a4138] text-[18px]">chevron_right</span>
        </div>

        {/* Security & Community Trust Badge */}
        <div className="mt-4 flex flex-col items-center justify-center text-center">
          <div className="flex items-center space-x-1.5 text-[#5a4138] mb-0.5">
            <span className="material-symbols-outlined text-[#006c49] text-[16px]">verified_user</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#131b2e]">
              Jaringan Khusus Kampus
            </span>
          </div>
          <p className="text-[11px] text-[#5a4138]/80 max-w-xs">
            Khusus Mahasiswa, Dosen, Tendik & Mitra Kantin Polinela.
          </p>
        </div>
      </div>
    </div>
  );
};
