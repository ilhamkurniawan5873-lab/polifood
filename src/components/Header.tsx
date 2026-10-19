import React from 'react';
import { ASSETS } from '../data/mockData';
import { AppTab } from '../types';

interface HeaderProps {
  currentTab: AppTab;
  onOpenAuth: () => void;
  onOpenSuperadmin: () => void;
  isSuperadmin: boolean;
  onTabChange: (tab: AppTab) => void;
  cartCount: number;
  onOpenCheckout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onOpenAuth,
  onOpenSuperadmin,
  isSuperadmin,
  onTabChange,
  cartCount,
  onOpenCheckout,
}) => {
  const getTabTitle = () => {
    switch (currentTab) {
      case 'beranda':
        return 'Beranda';
      case 'driver':
        return 'Driver';
      case 'kantin':
        return 'Kantin';
      case 'profil':
        return 'Profil';
      default:
        return 'PoliFood';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#faf8ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eaedff]">
      <div className="max-w-2xl mx-auto h-16 px-4 flex items-center justify-between">
        {/* Brand Lockup */}
        <div 
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => onTabChange('beranda')}
        >
          <img
            src={ASSETS.logo}
            alt="PoliFood Logo"
            className="h-8 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-[#a33900] leading-none">
              PoliFood
            </span>
            <span className="text-[11px] font-bold text-[#5a4138] uppercase tracking-wider">
              Polinela
            </span>
          </div>
        </div>

        {/* Right Section: View Switchers, Title, Cart & Profile */}
        <div className="flex items-center gap-2">
          {/* Quick Superadmin Portal Switcher Pill */}
          <button
            type="button"
            onClick={onOpenSuperadmin}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#ffdbce] text-[#7f2b00] hover:bg-[#ffb599] transition-colors shadow-xs"
            title="Buka Portal Superadmin"
          >
            <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
            <span>{isSuperadmin ? 'Mode User' : 'Superadmin'}</span>
          </button>

          {/* Quick Login / Auth Screen Opener */}
          <button
            type="button"
            onClick={onOpenAuth}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#eaedff] text-[#131b2e] hover:bg-[#e2e7ff] transition-colors"
            title="Layar Masuk / Civitas Login"
          >
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>Masuk</span>
          </button>

          {/* Cart Icon trigger if items present */}
          {cartCount > 0 && (
            <button
              type="button"
              onClick={onOpenCheckout}
              className="relative p-2 rounded-full bg-[#cc4900] text-white hover:bg-[#a33900] transition-colors flex items-center justify-center shadow-sm"
              title="Lihat Keranjang"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span className="absolute -top-1 -right-1 bg-[#006c49] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          )}

          {/* Screen Title */}
          <span className="font-display font-semibold text-sm text-[#131b2e] max-w-[100px] text-right truncate">
            {getTabTitle()}
          </span>

          {/* User Profile Avatar with trigger to Profil Tab */}
          <button
            type="button"
            onClick={() => onTabChange('profil')}
            className="w-9 h-9 rounded-full ring-2 ring-transparent hover:ring-[#a33900] transition-all flex items-center justify-center overflow-hidden"
            title="Profil Civitas"
          >
            <img
              src={ASSETS.profileAvatar}
              alt="Profile"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
