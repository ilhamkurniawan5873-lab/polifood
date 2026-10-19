import React from 'react';
import { AppTab } from '../types';

interface BottomNavProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  activeDriverTasksCount?: number;
  pendingCanteenOrdersCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  activeDriverTasksCount = 1,
  pendingCanteenOrdersCount = 3,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#faf8ff]/95 backdrop-blur-xl border-t border-[#eaedff] shadow-[0_-4px_16px_rgba(15,23,42,0.05)]">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16 px-2">
        {/* Tab 1: Beranda */}
        <button
          type="button"
          onClick={() => onTabChange('beranda')}
          className={`flex flex-col items-center justify-center w-full min-h-[44px] py-1 transition-colors ${
            currentTab === 'beranda'
              ? 'text-[#a33900] font-bold'
              : 'text-[#5a4138] hover:text-[#131b2e]'
          }`}
        >
          <span 
            className="material-symbols-outlined text-[22px]" 
            style={currentTab === 'beranda' ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            restaurant
          </span>
          <span className="text-[11px] font-bold mt-0.5 tracking-tight">Beranda</span>
        </button>

        {/* Tab 2: Driver */}
        <button
          type="button"
          onClick={() => onTabChange('driver')}
          className={`relative flex flex-col items-center justify-center w-full min-h-[44px] py-1 transition-colors ${
            currentTab === 'driver'
              ? 'text-[#a33900] font-bold'
              : 'text-[#5a4138] hover:text-[#131b2e]'
          }`}
        >
          <div className="relative">
            <span 
              className="material-symbols-outlined text-[22px]"
              style={currentTab === 'driver' ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              two_wheeler
            </span>
            {activeDriverTasksCount > 0 && (
              <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-[#006c49] animate-pulse ring-2 ring-white"></span>
            )}
          </div>
          <span className="text-[11px] font-bold mt-0.5 tracking-tight">Driver</span>
        </button>

        {/* Tab 3: Kantin */}
        <button
          type="button"
          onClick={() => onTabChange('kantin')}
          className={`relative flex flex-col items-center justify-center w-full min-h-[44px] py-1 transition-colors ${
            currentTab === 'kantin'
              ? 'text-[#a33900] font-bold'
              : 'text-[#5a4138] hover:text-[#131b2e]'
          }`}
        >
          <div className="relative">
            <span 
              className="material-symbols-outlined text-[22px]"
              style={currentTab === 'kantin' ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              storefront
            </span>
            {pendingCanteenOrdersCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#ba1a1a] text-white text-[9px] font-bold px-1 rounded-full">
                {pendingCanteenOrdersCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-bold mt-0.5 tracking-tight">Kantin</span>
        </button>

        {/* Tab 4: Profil */}
        <button
          type="button"
          onClick={() => onTabChange('profil')}
          className={`flex flex-col items-center justify-center w-full min-h-[44px] py-1 transition-colors ${
            currentTab === 'profil'
              ? 'text-[#a33900] font-bold'
              : 'text-[#5a4138] hover:text-[#131b2e]'
          }`}
        >
          <span 
            className="material-symbols-outlined text-[22px]"
            style={currentTab === 'profil' ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            account_circle
          </span>
          <span className="text-[11px] font-bold mt-0.5 tracking-tight">Profil</span>
        </button>
      </div>
    </nav>
  );
};
