import React, { useState } from 'react';
import { MOCK_CANTEENS, MOCK_MENU_ITEMS, ASSETS } from '../data/mockData';
import { Canteen, MenuItem } from '../types';

interface BerandaViewProps {
  onOpenDishModal: (dish: MenuItem) => void;
  onOpenLocationPicker: () => void;
  currentBuilding: string;
  currentRoom: string;
  onShowToast: (msg: string) => void;
}

export const BerandaView: React.FC<BerandaViewProps> = ({
  onOpenDishModal,
  onOpenLocationPicker,
  currentBuilding,
  currentRoom,
  onShowToast,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredDish = MOCK_MENU_ITEMS[0]; // Ayam Geprek Sambal Korek

  const categories = [
    { id: 'all', label: 'Semua', icon: 'local_dining' },
    { id: 'makanan', label: 'Makanan Berat', icon: 'lunch_dining' },
    { id: 'minuman', label: 'Minuman Dingin', icon: 'local_cafe' },
    { id: 'snack', label: 'Camilan & Snack', icon: 'cookie' },
    { id: 'sehat', label: 'Kantin Sehat', icon: 'eco' },
  ];

  const filteredCanteens = MOCK_CANTEENS.filter((c) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q) ||
      c.subLocation.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full max-w-md mx-auto px-4 pb-28 pt-2 flex flex-col gap-3">
      {/* Campus Context Landmark Strip */}
      <div className="w-full">
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#eaedff] flex items-center justify-between gap-3">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#ffdbce] flex items-center justify-center shrink-0 text-[#370e00] mt-0.5">
              <span className="material-symbols-outlined text-[20px]">apartment</span>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-[#5a4138] flex items-center gap-1 font-semibold">
                <span>Antar ke lokasi saya</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
              </p>
              <p className="text-xs font-bold text-[#131b2e] truncate">{currentBuilding}</p>
              <p className="text-[11px] text-[#5a4138] truncate">{currentRoom}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenLocationPicker}
            className="shrink-0 bg-[#eaedff] text-[#a33900] text-xs font-bold px-3 py-1.5 rounded-full shadow-xs hover:bg-[#e2e7ff] transition-colors"
          >
            Ubah Lokasi
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-white border border-[#eaedff] rounded-xl shadow-xs px-3 py-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#5a4138] text-[20px]">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kantin, nasi bakar, es teh..."
            className="w-full bg-transparent text-xs text-[#131b2e] placeholder:text-[#5a4138]/70 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-[#5a4138] hover:text-[#131b2e]"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
        <button
          type="button"
          aria-label="Filter Pencarian"
          onClick={() => onShowToast('Filter stan dan kisaran harga di Polinela')}
          className="w-10 h-10 rounded-xl bg-[#cc4900] text-white flex items-center justify-center shrink-0 shadow-xs hover:bg-[#a33900] transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">tune</span>
        </button>
      </div>

      {/* Polinela Campus Bulletin Banner */}
      <div className="w-full">
        <div className="bg-gradient-to-r from-[#a33900] via-[#cc4900] to-[#994100] rounded-xl p-3.5 text-white shadow-xs relative overflow-hidden">
          <div className="relative z-10 flex items-start gap-3">
            <span className="material-symbols-outlined text-[26px] text-[#6ffbbe] shrink-0 mt-0.5">
              campaign
            </span>
            <div>
              <h2 className="font-display font-bold text-sm leading-tight text-white mb-0.5">
                Kantin Polinela Buka Penuh Hari Ini!
              </h2>
              <p className="text-xs text-[#ffdbce] leading-relaxed">
                Pesan langsung dari ruang kelas, diantar cepat oleh kawan mahasiswa Polinela.
              </p>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
        </div>
      </div>

      {/* Category Pills (Horizontal Scroll) */}
      <div className="py-0.5">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors ${
                activeCategory === cat.id
                  ? 'bg-[#a33900] text-white'
                  : 'bg-white text-[#131b2e] border border-[#eaedff] hover:bg-[#eaedff]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Campus Hero Dish Spotlight Card (Direct click to open the Food Detail bottom sheet) */}
      <div 
        onClick={() => onOpenDishModal(featuredDish)}
        className="bg-white rounded-xl shadow-xs border border-[#eaedff] p-3 flex flex-col gap-2 cursor-pointer hover:border-[#a33900] transition-all group"
      >
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#a33900] font-bold">
            <span className="material-symbols-outlined text-[16px] fill-1 text-amber-500">star</span>
            <span>Menu Terlaris Hari Ini</span>
          </div>
          <span className="text-[10px] bg-[#6cf8bb] text-[#005236] px-2 py-0.5 rounded-full font-bold">
            Paling Cepat Siap
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 relative bg-[#eaedff]">
            <img
              src={ASSETS.dishAyamGeprekDetail}
              alt="Ayam Geprek"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <h4 className="font-display font-bold text-xs text-[#131b2e] leading-snug line-clamp-2">
              Ayam Geprek Sambal Korek + Nasi Daun Jeruk
            </h4>
            <p className="text-[11px] text-[#5a4138] truncate mt-0.5">Kantin Mbak Sri (Pujasera 04)</p>
            <div className="flex items-center justify-between mt-1">
              <span className="font-display text-xs font-bold text-[#a33900]">
                Rp 15.000 <span className="text-[10px] text-[#5a4138] line-through font-normal">Rp 17.000</span>
              </span>
              <span className="text-[11px] bg-[#a33900] text-white px-2 py-1 rounded-lg font-bold flex items-center gap-0.5">
                <span>Pesan</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="pt-2 flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-sm text-[#131b2e]">Kantin Terverifikasi</h3>
          <p className="text-xs text-[#5a4138]">Layanan aktif antar ke ruang kelas & laboratorium</p>
        </div>
        <span className="text-xs font-bold text-[#a33900] bg-[#ffdbce] px-2.5 py-0.5 rounded-full">
          {filteredCanteens.length} Kantin
        </span>
      </div>

      {/* Canteen Cards Stack */}
      <div className="flex flex-col gap-2.5">
        {filteredCanteens.map((canteen) => (
          <article
            key={canteen.id}
            onClick={() => onOpenDishModal(featuredDish)}
            className={`bg-white rounded-xl shadow-xs border border-[#eaedff] overflow-hidden p-3 cursor-pointer hover:border-[#ffb599] transition-all ${
              !canteen.isOpen ? 'opacity-85' : ''
            }`}
          >
            <div className="flex gap-3">
              <img
                src={canteen.image}
                alt={canteen.name}
                className={`w-24 h-24 rounded-lg object-cover shrink-0 bg-[#eaedff] ${
                  !canteen.isOpen ? 'grayscale' : ''
                }`}
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="font-display font-bold text-sm text-[#131b2e] truncate">
                      {canteen.name}
                    </h4>
                    {canteen.isOpen ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#005236] text-[10px] font-bold shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] animate-pulse"></span>
                        Buka
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold shrink-0">
                        Tutup
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#5a4138] font-semibold">{canteen.location}</p>
                  <p className="text-[11px] text-[#5a4138] line-clamp-1 mt-0.5">
                    {canteen.subLocation}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-[#5a4138] pt-1 border-t border-[#eaedff]">
                  <span className="flex items-center gap-1 text-xs font-bold text-[#131b2e]">
                    <span className="material-symbols-outlined text-[15px] text-amber-500 fill-1">
                      star
                    </span>
                    <span>{canteen.rating}</span>
                    <span className="text-[11px] text-[#5a4138] font-normal">
                      ({canteen.reviewCount}+)
                    </span>
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <span className={`material-symbols-outlined text-[15px] ${canteen.isOpen ? 'text-[#a33900]' : 'text-[#ba1a1a]'}`}>
                      schedule
                    </span>
                    <span className={!canteen.isOpen ? 'text-[#ba1a1a] font-medium' : ''}>
                      {canteen.deliveryTime}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
