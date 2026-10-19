import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { OrderItem } from '../types';

interface FoodDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: OrderItem) => void;
  onInstantCheckout?: (item: OrderItem) => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onInstantCheckout,
}) => {
  const [spicyLevel, setSpicyLevel] = useState<'sedang' | 'pedas' | 'ekstra'>('pedas');
  const [notes, setNotes] = useState('Catatan: Kuah dipisah / sambal di mangkok');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const basePrice = 15000;
  const modifierPrice = spicyLevel === 'ekstra' ? 2000 : 0;
  const unitPrice = basePrice + modifierPrice;
  const totalPrice = unitPrice * quantity;

  const getSpicyLabel = () => {
    switch (spicyLevel) {
      case 'sedang':
        return 'Sedang (Cabai 3)';
      case 'pedas':
        return 'Pedas Polinela (Cabai 7)';
      case 'ekstra':
        return 'Ekstra Cabai (Ulek Rawit Jumbo)';
    }
  };

  const handleAdd = () => {
    const item: OrderItem = {
      id: 'ayam-geprek-' + Date.now(),
      name: 'Ayam Geprek Sambal Korek + Nasi Daun Jeruk',
      price: unitPrice,
      quantity,
      notes,
      spiceLevel: getSpicyLabel(),
    };
    onAddToCart(item);
  };

  const handleCheckoutNow = () => {
    const item: OrderItem = {
      id: 'ayam-geprek-' + Date.now(),
      name: 'Ayam Geprek Sambal Korek + Nasi Daun Jeruk',
      price: unitPrice,
      quantity,
      notes,
      spiceLevel: getSpicyLabel(),
    };
    if (onInstantCheckout) {
      onInstantCheckout(item);
    } else {
      onAddToCart(item);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#283044]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-t-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sheet Handle & Close */}
        <div className="relative w-full pt-3 pb-2 flex items-center justify-center">
          <div className="w-12 h-1.5 rounded-full bg-[#dae2fd]"></div>
          <button
            aria-label="Tutup detail menu"
            onClick={onClose}
            className="absolute right-4 top-3 w-8 h-8 rounded-full bg-[#eaedff] flex items-center justify-center text-[#5a4138] hover:text-[#131b2e] transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Sheet Content */}
        <div className="overflow-y-auto px-4 pb-6 flex flex-col gap-4 no-scrollbar">
          {/* Dish Image Banner */}
          <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-[#eaedff] shadow-sm">
            <img
              src={ASSETS.dishAyamGeprekDetail}
              alt="Ayam Geprek Sambal Korek + Nasi Daun Jeruk"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-2 left-2 bg-[#283044]/80 text-[#eef0ff] px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-[14px] text-[#6ffbbe]">verified</span>
              <span>Menu Favorit Mahasiswa</span>
            </div>
          </div>

          {/* Title, Price & Origin */}
          <div>
            <div className="flex items-center gap-1.5 text-[#a33900] mb-1">
              <span className="material-symbols-outlined text-[16px]">storefront</span>
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Kantin Mbak Sri (Pujasera 04)
              </span>
            </div>
            <h1 className="font-display text-2xl font-extrabold text-[#131b2e] leading-tight">
              Ayam Geprek Sambal Korek + Nasi Daun Jeruk
            </h1>
            <p className="text-xs text-[#5a4138] mt-1 leading-relaxed">
              Ayam goreng tepung renyah dengan ulekan cabai rawit setan khas Mbak Sri dan aroma nasi daun jeruk segar hangat.
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-display text-2xl text-[#a33900] font-bold">
                Rp {totalPrice.toLocaleString('id-ID')}
              </span>
              <span className="text-sm text-[#5a4138] line-through">
                Rp {(17000 * quantity).toLocaleString('id-ID')}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#ffdbce] text-[#370e00] text-[11px] font-bold">
                -12%
              </span>
            </div>
          </div>

          {/* Modifier: Spicy Level */}
          <div className="bg-[#faf8ff] border border-[#eaedff] rounded-xl p-3.5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 font-bold text-sm text-[#131b2e]">
                <span className="material-symbols-outlined text-[#a33900] text-[18px]">
                  local_fire_department
                </span>
                <span>Tingkat Kepedasan</span>
              </span>
              <span className="text-xs text-[#5a4138]">Pilih satu</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {/* Option 1 */}
              <label 
                className={`flex items-center justify-between p-2.5 rounded-lg border transition-all cursor-pointer ${
                  spicyLevel === 'sedang'
                    ? 'bg-[#ffdbce] border-[#ffb599] text-[#370e00] font-semibold'
                    : 'bg-white border-[#eaedff] text-[#131b2e]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="spicy_level"
                    checked={spicyLevel === 'sedang'}
                    onChange={() => setSpicyLevel('sedang')}
                    className="accent-[#a33900] w-4 h-4"
                  />
                  <span className="text-xs">Sedang (Cabai 3)</span>
                </div>
                <span className="text-xs text-[#5a4138]">Gratis</span>
              </label>

              {/* Option 2 (Recommended) */}
              <label 
                className={`flex items-center justify-between p-2.5 rounded-lg border transition-all cursor-pointer ${
                  spicyLevel === 'pedas'
                    ? 'bg-[#ffdbce] border-[#ffb599] text-[#370e00] font-bold shadow-xs'
                    : 'bg-white border-[#eaedff] text-[#131b2e]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="spicy_level"
                    checked={spicyLevel === 'pedas'}
                    onChange={() => setSpicyLevel('pedas')}
                    className="accent-[#a33900] w-4 h-4"
                  />
                  <span className="text-xs">Pedas Polinela (Cabai 7 - Rekomendasi)</span>
                </div>
                <span className="text-xs font-bold text-[#7f2b00]">Gratis</span>
              </label>

              {/* Option 3 */}
              <label 
                className={`flex items-center justify-between p-2.5 rounded-lg border transition-all cursor-pointer ${
                  spicyLevel === 'ekstra'
                    ? 'bg-[#ffdbce] border-[#ffb599] text-[#370e00] font-semibold'
                    : 'bg-white border-[#eaedff] text-[#131b2e]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="spicy_level"
                    checked={spicyLevel === 'ekstra'}
                    onChange={() => setSpicyLevel('ekstra')}
                    className="accent-[#a33900] w-4 h-4"
                  />
                  <span className="text-xs">Ekstra Cabai (Ulek Rawit Jumbo)</span>
                </div>
                <span className="text-xs text-[#a33900] font-bold">+Rp 2.000</span>
              </label>
            </div>
          </div>

          {/* Notes Field */}
          <div className="bg-[#faf8ff] border border-[#eaedff] rounded-xl p-3.5 shadow-xs">
            <label className="text-xs font-bold text-[#131b2e] block mb-1.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#5a4138] text-[18px]">edit_note</span>
              <span>Catatan untuk Mbak Sri</span>
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Kuah dipisah / sambal di mangkok terpisah..."
              className="w-full bg-white border border-[#eaedff] rounded-lg p-2.5 text-xs text-[#131b2e] placeholder:text-[#5a4138]/60 focus:outline-none focus:border-[#a33900] shadow-xs"
            />
          </div>

          {/* Quantity & Action Buttons */}
          <div className="pt-2 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              {/* Counter Controls */}
              <div className="flex items-center justify-between bg-[#eaedff] rounded-xl px-2 py-1 h-12 w-32 shrink-0">
                <button
                  type="button"
                  aria-label="Kurangi porsi"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-white text-[#131b2e] font-bold flex items-center justify-center shadow-xs disabled:opacity-40 hover:bg-[#faf8ff] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <span className="font-display text-base font-bold text-[#131b2e]">{quantity}</span>
                <button
                  type="button"
                  aria-label="Tambah porsi"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg bg-[#a33900] text-white font-bold flex items-center justify-center shadow-xs hover:bg-[#cc4900] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>

              {/* Primary Submit Button */}
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 h-12 bg-[#a33900] hover:bg-[#cc4900] active:scale-[0.98] transition-all rounded-xl text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                <span>Tambah ke Keranjang (Rp {totalPrice.toLocaleString('id-ID')})</span>
              </button>
            </div>

            {/* Instant Order Shortcut */}
            <button
              type="button"
              onClick={handleCheckoutNow}
              className="w-full h-10 bg-[#006c49] hover:bg-[#005236] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">flash_on</span>
              <span>Beli Langsung & Bayar QRIS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
