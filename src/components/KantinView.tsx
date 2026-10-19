import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';

interface KantinViewProps {
  onShowReceiptModal: () => void;
  onShowToast: (msg: string) => void;
}

export const KantinView: React.FC<KantinViewProps> = ({
  onShowReceiptModal,
  onShowToast,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [kantinTab, setKantinTab] = useState<'orders' | 'menu' | 'reports'>('orders');
  const [order1Status, setOrder1Status] = useState<'verifikasi' | 'dimasak' | 'batal'>('verifikasi');
  const [order2Status, setOrder2Status] = useState<'dimasak' | 'siap_ambil'>('dimasak');
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuPrice, setNewMenuPrice] = useState('');
  const [menuItems, setMenuItems] = useState([
    {
      id: 'm-1',
      name: 'Ayam Geprek Sambal Korek',
      price: 15000,
      image: ASSETS.dishAyamGeprekThumb,
      isAvailable: true,
    },
    {
      id: 'm-2',
      name: 'Nasi Pecel Madiun',
      price: 12000,
      image: ASSETS.dishNasiPecel,
      isAvailable: false,
    },
    {
      id: 'm-3',
      name: 'Es Nutrisari Jeruk Nipis',
      price: 4000,
      image: ASSETS.dishEsNutrisari,
      isAvailable: true,
    },
  ]);

  const toggleStoreStatus = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      onShowToast('Stan Kantin Mbak Sri DIBUKA! Siap melayani civitas.');
    } else {
      onShowToast('Stan ditutup sementara.');
    }
  };

  const handleVerifyOrder1 = () => {
    setOrder1Status('dimasak');
    onShowToast('Pesanan #PF-8824 diverifikasi! Segera dimasak di dapur.');
  };

  const handleRejectOrder1 = () => {
    setOrder1Status('batal');
    onShowToast('Pesanan #PF-8824 telah dibatalkan.');
  };

  const handleReadyOrder2 = () => {
    setOrder2Status('siap_ambil');
    onShowToast('Notifikasi dikirim! Driver Bima Arya segera menjemput pesanan #PF-8822.');
  };

  const toggleMenuItem = (id: string, name: string) => {
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = !item.isAvailable;
          onShowToast(`${name} disetel ${next ? 'TERSEDIA' : 'HABIS'}.`);
          return { ...item, isAvailable: next };
        }
        return item;
      })
    );
  };

  const handleAddMenuSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenuName || !newMenuPrice) return;
    const newItem = {
      id: 'm-' + Date.now(),
      name: newMenuName,
      price: parseInt(newMenuPrice, 10) || 10000,
      image: ASSETS.dishAyamGeprekThumb,
      isAvailable: true,
    };
    setMenuItems([newItem, ...menuItems]);
    setShowAddMenuModal(false);
    setNewMenuName('');
    setNewMenuPrice('');
    onShowToast(`Menu ${newMenuName} berhasil ditambahkan!`);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 pb-28 pt-2 flex flex-col gap-4">
      {/* Tenant Header Profile Card */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#a33900] shrink-0">
              <span className="material-symbols-outlined text-[26px] fill-1">storefront</span>
            </div>
            <div className="min-w-0">
              <span className="font-display font-bold text-base text-[#131b2e] truncate block">
                Kantin Mbak Sri
              </span>
              <div className="flex items-center gap-1.5 text-[#5a4138] text-xs">
                <span className="material-symbols-outlined text-[15px] text-[#994100]">store</span>
                <span className="truncate">Stand 04 Pujasera Polinela</span>
              </div>
            </div>
          </div>

          {/* Live Status Toggle Button */}
          <button
            type="button"
            onClick={toggleStoreStatus}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-xs transition-all active:scale-95 shrink-0 ${
              isOpen
                ? 'bg-[#6ffbbe] text-[#002113]'
                : 'bg-[#eaedff] text-[#5a4138]'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-[#006c49] animate-pulse' : 'bg-gray-400'}`}></span>
            <span>{isOpen ? 'Stan Buka' : 'Stan Tutup'}</span>
          </button>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-[#eaedff] text-[#5a4138] text-xs">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#006c49]">schedule</span>
            <span>08.00 - 16.30 WIB</span>
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#131b2e] font-semibold text-[10px]">
            Pujasera Barat
          </span>
        </div>
      </div>

      {/* Quick Stat Cards (3 Columns) */}
      <div className="grid grid-cols-3 gap-2">
        {/* Stat 1: Pendapatan */}
        <div className="bg-white rounded-xl p-2.5 shadow-xs border border-[#eaedff] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#5a4138]">
            <span className="text-[11px] font-medium leading-tight">Pendapatan</span>
            <span className="material-symbols-outlined text-[16px] text-[#a33900]">payments</span>
          </div>
          <div className="my-1">
            <span className="font-display font-bold text-base text-[#131b2e] block leading-tight">
              485k
            </span>
            <span className="text-[10px] text-[#006c49] font-bold flex items-center gap-0.5 mt-0.5">
              <span className="material-symbols-outlined text-[12px]">trending_up</span>+18%
            </span>
          </div>
          <span className="text-[10px] text-[#5a4138] truncate">vs kemarin</span>
        </div>

        {/* Stat 2: Total Pesanan */}
        <div className="bg-white rounded-xl p-2.5 shadow-xs border border-[#eaedff] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#5a4138]">
            <span className="text-[11px] font-medium leading-tight">Pesanan</span>
            <span className="material-symbols-outlined text-[16px] text-[#994100]">receipt_long</span>
          </div>
          <div className="my-1">
            <span className="font-display font-bold text-base text-[#131b2e] block leading-tight">
              32
            </span>
            <span className="text-[10px] text-[#5a4138] font-bold mt-0.5 block">Selesai 29</span>
          </div>
          <span className="text-[10px] text-[#006c49] font-semibold">Sukses 97%</span>
        </div>

        {/* Stat 3: Verifikasi Tertunda */}
        <div className="bg-[#ffdbce] rounded-xl p-2.5 shadow-xs border border-[#ffb599] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#7f2b00]">
            <span className="text-[11px] font-bold leading-tight">Verifikasi</span>
            <span className="material-symbols-outlined text-[16px] text-[#a33900] fill-1">
              notifications_active
            </span>
          </div>
          <div className="my-1">
            <span className="font-display font-bold text-sm text-[#370e00] block leading-tight">
              3 Menunggu
            </span>
            <span className="text-[10px] text-[#7f2b00] font-semibold mt-0.5 block truncate">
              Cek QRIS Segera
            </span>
          </div>
          <span className="text-[10px] text-[#a33900] font-bold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[12px]">priority_high</span>Perlu Tindakan
          </span>
        </div>
      </div>

      {/* Interactive Segmented Tab Controls */}
      <div className="flex items-center gap-1 p-1 bg-[#eaedff] rounded-xl overflow-x-auto no-scrollbar shadow-inner">
        <button
          type="button"
          onClick={() => setKantinTab('orders')}
          className={`flex-1 min-w-[100px] py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            kantinTab === 'orders'
              ? 'bg-[#a33900] text-white shadow-xs'
              : 'text-[#5a4138] hover:text-[#131b2e]'
          }`}
        >
          <span>Pesanan Masuk</span>
          <span className="w-4 h-4 rounded-full bg-white text-[#a33900] text-[10px] flex items-center justify-center font-bold">
            3
          </span>
        </button>

        <button
          type="button"
          onClick={() => setKantinTab('menu')}
          className={`flex-1 min-w-[100px] py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
            kantinTab === 'menu'
              ? 'bg-[#a33900] text-white shadow-xs'
              : 'text-[#5a4138] hover:text-[#131b2e]'
          }`}
        >
          <span>Kelola Menu</span>
          <span className="text-[11px] opacity-80">({menuItems.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setKantinTab('reports')}
          className={`flex-1 min-w-[80px] py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
            kantinTab === 'reports'
              ? 'bg-[#a33900] text-white shadow-xs'
              : 'text-[#5a4138] hover:text-[#131b2e]'
          }`}
        >
          <span>Laporan</span>
        </button>
      </div>

      {/* TAB PANEL 1: PESANAN MASUK */}
      {kantinTab === 'orders' && (
        <div className="flex flex-col gap-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm text-[#131b2e]">Antrean Aktif</span>
              <span className="px-2 py-0.5 rounded-full bg-[#ffb599] text-[#370e00] text-[10px] font-bold">
                3 Pesanan
              </span>
            </div>
            <button
              type="button"
              onClick={() => onShowToast('Data antrean diperbarui!')}
              className="text-xs text-[#a33900] flex items-center gap-1 font-bold active:opacity-75"
            >
              <span className="material-symbols-outlined text-[16px]">sync</span>
              <span>Segarkan</span>
            </button>
          </div>

          {/* Order Card 1: #PF-8824 (Awaiting Verification) */}
          {order1Status !== 'batal' && (
            <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#131b2e] font-display font-bold text-xs">
                    #PF-8824
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                    order1Status === 'verifikasi'
                      ? 'bg-[#ffdbce] text-[#370e00]'
                      : 'bg-[#6cf8bb]/40 text-[#005236]'
                  }`}>
                    <span className="material-symbols-outlined text-[13px]">
                      {order1Status === 'verifikasi' ? 'hourglass_top' : 'soup_kitchen'}
                    </span>
                    <span>{order1Status === 'verifikasi' ? 'Verifikasi Pembayaran' : 'Sedang Dimasak'}</span>
                  </span>
                </div>
                <span className="text-[11px] text-[#5a4138]">2 mnt lalu</span>
              </div>

              {/* Customer Detail & Campus Delivery Landmark */}
              <div className="bg-[#f2f3ff] rounded-lg p-2.5 flex flex-col gap-1.5 border border-[#eaedff]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="material-symbols-outlined text-[#a33900] text-[18px]">person</span>
                    <span className="text-xs font-bold text-[#131b2e] truncate">Rian Saputra</span>
                    <span className="text-[11px] text-[#5a4138]">(Mahasiswa)</span>
                  </div>
                  <a
                    href="https://wa.me/6285712345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-0.5 rounded bg-[#6ffbbe] text-[#002113] text-[10px] font-bold flex items-center gap-1 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[13px]">chat</span> Chat WA
                  </a>
                </div>

                <div className="flex items-center gap-1 text-[#5a4138] text-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#006c49]">sports_motorsports</span>
                  <span className="truncate">Driver Kampus: <strong className="text-[#131b2e]">Ahmad Fauzi (Polinela Courier)</strong></span>
                </div>

                {/* Campus Text Landmark */}
                <div className="flex items-start gap-1.5 mt-0.5 bg-white p-2 rounded border border-[#eaedff]">
                  <span className="material-symbols-outlined text-[16px] text-[#a33900] shrink-0 mt-0.5">domain</span>
                  <div className="flex flex-col min-w-0 text-xs">
                    <span className="text-[10px] text-[#5a4138] font-bold uppercase tracking-wider">Tujuan Antar:</span>
                    <span className="font-semibold text-[#131b2e]">Gedung Sakura Lt. 2, Lab Hardware Komputer</span>
                    <span className="text-[11px] text-[#5a4138]">Catatan: Tolong titipkan di meja asisten lab depan</span>
                  </div>
                </div>
              </div>

              {/* Ordered Items */}
              <div className="py-0.5 flex flex-col gap-1 text-xs">
                <div className="flex items-center justify-between text-[#131b2e]">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-[#eaedff] flex items-center justify-center font-bold text-[#a33900] text-[10px]">
                      2x
                    </span>
                    <span>Nasi Ayam Geprek Level 3</span>
                  </span>
                  <span className="font-display font-bold">Rp 30.000</span>
                </div>
                <div className="flex items-center justify-between text-[#131b2e]">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-[#eaedff] flex items-center justify-center font-bold text-[#a33900] text-[10px]">
                      2x
                    </span>
                    <span>Es Nutrisari Jeruk Nipis</span>
                  </span>
                  <span className="font-display font-bold">Rp 8.000</span>
                </div>
              </div>

              {/* Total & Payment Method */}
              <div className="flex items-center justify-between bg-[#e2e7ff]/40 p-2.5 rounded-lg border border-[#dae2fd]">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#5a4138] uppercase tracking-wider font-bold">
                    Metode Bayar
                  </span>
                  <span className="text-xs font-bold text-[#131b2e] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#a33900]">qr_code_2</span>
                    <span>QRIS Statis Kantin Mbak Sri</span>
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-[#5a4138]">Total Tagihan</span>
                  <span className="font-display text-sm text-[#a33900] font-bold">Rp 38.000</span>
                </div>
              </div>

              {/* Verification Thumbnail Button (Opens Receipt Modal) */}
              <button
                type="button"
                onClick={onShowReceiptModal}
                className="w-full py-2 px-3 rounded-lg bg-[#eaedff] text-[#131b2e] text-xs font-semibold flex items-center justify-between hover:bg-[#dae2fd] transition-colors border border-[#dae2fd]"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#a33900] text-[18px]">receipt</span>
                  <span>Lihat Bukti Transfer QRIS</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded bg-[#ffdbce] flex items-center justify-center text-[#a33900]">
                    <span className="material-symbols-outlined text-[14px]">image</span>
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-[#5a4138]">chevron_right</span>
                </div>
              </button>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleRejectOrder1}
                  className="h-10 rounded-lg bg-[#eaedff] text-[#131b2e] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#dae2fd] transition-all"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">close</span>
                  <span>Tolak / Batal</span>
                </button>
                <button
                  type="button"
                  onClick={handleVerifyOrder1}
                  className="h-10 rounded-lg bg-[#a33900] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#cc4900] transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">skillet</span>
                  <span>Verifikasi & Masak</span>
                </button>
              </div>
            </div>
          )}

          {/* Order Card 2: #PF-8822 (Currently Cooking) */}
          <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#131b2e] font-display font-bold text-xs">
                  #PF-8822
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                  order2Status === 'dimasak' ? 'bg-[#ffdbce] text-[#7f2b00]' : 'bg-[#6cf8bb]/50 text-[#005236]'
                }`}>
                  <span className={`material-symbols-outlined text-[13px] ${order2Status === 'dimasak' ? 'animate-spin' : ''}`}>
                    {order2Status === 'dimasak' ? 'progress_activity' : 'check'}
                  </span>
                  <span>{order2Status === 'dimasak' ? 'Sedang Dimasak' : 'Siap Diambil Driver'}</span>
                </span>
              </div>
              <span className="text-[11px] text-[#5a4138]">14 mnt lalu</span>
            </div>

            <div className="bg-[#f2f3ff] rounded-lg p-2.5 flex flex-col gap-1 border border-[#eaedff]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="material-symbols-outlined text-[#006c49] text-[18px]">school</span>
                  <span className="text-xs font-bold text-[#131b2e] truncate">Ibu Dr. Maya</span>
                  <span className="text-[11px] text-[#a33900] font-bold">(Dosen)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-white text-[#5a4138] text-[10px] font-medium border border-[#eaedff]">
                  Lunas QRIS
                </span>
              </div>
              <div className="text-[#5a4138] text-xs flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[15px] text-[#994100]">location_on</span>
                <span>Gedung QB Lt. 3, Ruang Dosen Jurusan Pertanian</span>
              </div>
            </div>

            <div className="py-0.5 flex flex-col gap-1 text-xs">
              <div className="flex items-center justify-between text-[#131b2e]">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[#eaedff] flex items-center justify-center font-bold text-[#a33900] text-[10px]">
                    1x
                  </span>
                  <span>Nasi Pecel Madiun + Telur Ceplok</span>
                </span>
                <span className="font-display font-bold">Rp 16.000</span>
              </div>
              <div className="flex items-center justify-between text-[#131b2e]">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[#eaedff] flex items-center justify-center font-bold text-[#a33900] text-[10px]">
                    1x
                  </span>
                  <span>Teh Manis Hangat (Gula Sedikit)</span>
                </span>
                <span className="font-display font-bold">Rp 4.000</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1 text-[#5a4138] text-xs">
                <span className="material-symbols-outlined text-[16px] text-[#006c49]">moped</span>
                <span>Driver: <strong className="text-[#131b2e]">Bima Arya ({order2Status === 'siap_ambil' ? 'Siap Antar' : 'Menunggu'})</strong></span>
              </div>
              <span className="font-display font-bold text-sm text-[#131b2e]">Rp 20.000</span>
            </div>

            <button
              type="button"
              onClick={handleReadyOrder2}
              className={`w-full h-10 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all ${
                order2Status === 'siap_ambil'
                  ? 'bg-[#eaedff] text-[#006c49]'
                  : 'bg-[#006c49] text-white hover:bg-[#005236]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>{order2Status === 'siap_ambil' ? 'Driver Telah Diberitahu' : 'Tandai Siap Diambil Driver'}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB PANEL 2: KELOLA MENU */}
      {kantinTab === 'menu' && (
        <div className="flex flex-col gap-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-display font-bold text-sm text-[#131b2e] block">
                Katalog Menu Stan
              </span>
              <span className="text-[11px] text-[#5a4138]">
                Update ketersediaan makanan cepat di jam ramai
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowAddMenuModal(true)}
              className="px-3 py-1.5 rounded-lg bg-[#a33900] text-white text-xs font-bold flex items-center gap-1 active:scale-95 shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Tambah</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-xl p-3 shadow-xs border border-[#eaedff] flex items-center justify-between gap-3 ${
                  !item.isAvailable ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover shrink-0 border border-[#eaedff]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-display font-bold text-xs text-[#131b2e] truncate">
                      {item.name}
                    </span>
                    <span className="font-display font-bold text-xs text-[#a33900]">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                    <span className={`text-[10px] font-bold mt-0.5 flex items-center gap-1 ${
                      item.isAvailable ? 'text-[#006c49]' : 'text-[#ba1a1a]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.isAvailable ? 'bg-[#006c49]' : 'bg-[#ba1a1a]'}`}></span>
                      <span>{item.isAvailable ? 'Tersedia (Ready)' : 'Habis Hari Ini'}</span>
                    </span>
                  </div>
                </div>

                {/* Stock Switch */}
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={item.isAvailable}
                    onChange={() => toggleMenuItem(item.id, item.name)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006c49]"></div>
                </label>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowAddMenuModal(true)}
            className="w-full py-3 rounded-xl bg-white text-[#a33900] text-xs font-bold flex items-center justify-center gap-2 border border-[#ffb599] shadow-xs hover:bg-[#ffdbce]/20 active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Tambah Menu Baru</span>
          </button>
        </div>
      )}

      {/* TAB PANEL 3: LAPORAN PENJUALAN */}
      {kantinTab === 'reports' && (
        <div className="flex flex-col gap-3 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col gap-3">
            <span className="font-display font-bold text-sm text-[#131b2e]">
              Rekap Transaksi Polinela
            </span>

            {/* Weekly Bar Chart */}
            <div className="h-28 flex items-end gap-2 pt-4 px-2">
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-[#eaedff] rounded-t" style={{ height: '40%' }}></div>
                <span className="text-[11px] text-[#5a4138]">Sen</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-[#eaedff] rounded-t" style={{ height: '65%' }}></div>
                <span className="text-[11px] text-[#5a4138]">Sel</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-[#eaedff] rounded-t" style={{ height: '55%' }}></div>
                <span className="text-[11px] text-[#5a4138]">Rab</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-[#eaedff] rounded-t" style={{ height: '85%' }}></div>
                <span className="text-[11px] text-[#5a4138]">Kam</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-[#a33900] rounded-t shadow-xs" style={{ height: '100%' }}></div>
                <span className="text-[11px] text-[#a33900] font-bold">Jum</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#eaedff] text-xs">
              <span className="text-[#5a4138]">Pencairan Dana Otomatis:</span>
              <span className="font-bold text-[#006c49]">Bank BRI - Rek 0124-***-88</span>
            </div>
          </div>
        </div>
      )}

      {/* Add Menu Item Modal */}
      {showAddMenuModal && (
        <div 
          className="fixed inset-0 z-50 bg-[#283044]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowAddMenuModal(false)}
        >
          <div 
            className="bg-white rounded-xl max-w-sm w-full p-4 shadow-xl border border-[#eaedff] flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
              <h3 className="font-display font-bold text-sm text-[#131b2e]">Tambah Menu Baru</h3>
              <button 
                type="button" 
                onClick={() => setShowAddMenuModal(false)}
                className="text-[#5a4138] hover:text-[#131b2e]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddMenuSubmit} className="flex flex-col gap-3 text-xs">
              <div>
                <label className="font-semibold text-[#131b2e] block mb-1">Nama Makanan / Minuman</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Es Teh Lemon Selasih"
                  value={newMenuName}
                  onChange={(e) => setNewMenuName(e.target.value)}
                  className="w-full bg-[#f2f3ff] p-2.5 rounded-lg border border-[#eaedff] focus:outline-none focus:border-[#a33900]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#131b2e] block mb-1">Harga (Rp)</label>
                <input
                  type="number"
                  required
                  placeholder="Contoh: 12000"
                  value={newMenuPrice}
                  onChange={(e) => setNewMenuPrice(e.target.value)}
                  className="w-full bg-[#f2f3ff] p-2.5 rounded-lg border border-[#eaedff] focus:outline-none focus:border-[#a33900]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddMenuModal(false)}
                  className="py-2.5 rounded-lg bg-[#eaedff] text-[#131b2e] font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="py-2.5 rounded-lg bg-[#a33900] text-white font-bold"
                >
                  Simpan Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
