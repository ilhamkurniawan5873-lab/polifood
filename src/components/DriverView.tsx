import React, { useState } from 'react';
import { ASSETS, MOCK_DRIVER_JOBS, MOCK_ACTIVE_DRIVER_TASK } from '../data/mockData';
import { DriverJob } from '../types';

interface DriverViewProps {
  onShowToast: (msg: string) => void;
}

export const DriverView: React.FC<DriverViewProps> = ({ onShowToast }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [driverTab, setDriverTab] = useState<'available' | 'active' | 'history'>('available');
  const [availableJobs, setAvailableJobs] = useState<DriverJob[]>(MOCK_DRIVER_JOBS);
  const [activeTask, setActiveTask] = useState(MOCK_ACTIVE_DRIVER_TASK);
  const [taskStep, setTaskStep] = useState<1 | 2 | 3>(2);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [earnings, setEarnings] = useState(45000);
  const [deliveryCount, setDeliveryCount] = useState(15);
  const [walletBalance, setWalletBalance] = useState(120000);

  const toggleOnline = () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      onShowToast('Mode Driver ONLINE. Pesanan kampus siap masuk!');
    } else {
      onShowToast('Mode Driver OFFLINE. Selamat beristirahat!');
    }
  };

  const handleAcceptJob = (job: DriverJob) => {
    onShowToast(`Tugas ${job.orderId} diambil! Menuju ${job.canteenName}.`);
    setAvailableJobs((prev) => prev.filter((j) => j.id !== job.id));
    setDriverTab('active');
  };

  const handleCompleteDelivery = () => {
    setIsTaskCompleted(true);
    setTaskStep(3);
    setEarnings((prev) => prev + 4000);
    setWalletBalance((prev) => prev + 4000);
    setDeliveryCount((prev) => prev + 1);
    onShowToast('Alhamdulillah! Pesanan #PF-8821 Selesai. Ongkir Rp 4.000 masuk ke saldo!');
  };

  const handleWithdraw = () => {
    onShowToast(`Permintaan tarik tunai Rp ${walletBalance.toLocaleString('id-ID')} diproses ke Rekening BRI!`);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 pb-28 pt-2 flex flex-col gap-4">
      {/* Driver Top Profile Card */}
      <div className="w-full bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <img
                src={ASSETS.profileAvatar}
                alt="Ahmad Fauzi"
                className="w-14 h-14 rounded-full object-cover shadow-xs border-2 border-white"
                referrerPolicy="no-referrer"
              />
              <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ring-2 ring-white ${isOnline ? 'bg-[#006c49]' : 'bg-gray-400'}`}></span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="font-display font-bold text-base text-[#131b2e] truncate">
                  Ahmad Fauzi
                </h1>
                <span className="bg-[#ffdbce] text-[#7f2b00] text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                  Mahasiswa MI
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#5a4138] text-xs mt-0.5">
                <span className="material-symbols-outlined text-amber-500 text-[16px] fill-1">
                  star
                </span>
                <span className="font-bold text-[#131b2e]">4.9</span>
                <span>•</span>
                <span>{deliveryCount * 5 + 9} Antaran Sukses</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label="Notifikasi Tugas"
            onClick={() => onShowToast('3 pesanan baru tersedia di area GSG dan Rektorat.')}
            className="w-9 h-9 rounded-full bg-[#e2e7ff] flex items-center justify-center text-[#5a4138] hover:bg-[#dae2fd] transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
        </div>

        {/* Live Status Switch Card */}
        <div 
          className={`w-full rounded-lg p-2.5 flex items-center justify-between transition-colors duration-300 ${
            isOnline ? 'bg-[#6cf8bb]/40 border border-[#4edea3]' : 'bg-[#eaedff] border border-[#dae2fd]'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
              <span className={`material-symbols-outlined text-[20px] ${isOnline ? 'text-[#006c49]' : 'text-gray-500'}`}>
                two_wheeler
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-[#006c49] animate-pulse' : 'bg-gray-400'}`}></span>
                <span className={`text-xs font-bold ${isOnline ? 'text-[#005236]' : 'text-[#131b2e]'}`}>
                  {isOnline ? 'Mode Driver Aktif (ONLINE)' : 'Mode Driver Istirahat (OFFLINE)'}
                </span>
              </div>
              <p className="text-[11px] text-[#5a4138] truncate">
                {isOnline ? 'Siap menerima pesanan antar di seputar kampus Polinela' : 'Kamu sedang tidak menerima tawaran antaran'}
              </p>
            </div>
          </div>

          {/* Switch toggle */}
          <button
            type="button"
            role="switch"
            aria-checked={isOnline}
            onClick={toggleOnline}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none p-0.5 ${
              isOnline ? 'bg-[#006c49]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
                isOnline ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Quick Earning Stats Split */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="bg-[#f2f3ff] rounded-lg p-2.5 flex flex-col border border-[#eaedff]">
            <span className="text-[11px] text-[#5a4138]">Pendapatan Hari Ini</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-display font-bold text-base text-[#a33900]">
                Rp {earnings.toLocaleString('id-ID')}
              </span>
            </div>
            <span className="text-[11px] text-[#006c49] font-semibold mt-0.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">check_circle</span>
              <span>{deliveryCount} Antaran</span>
            </span>
          </div>

          <div className="bg-[#f2f3ff] rounded-lg p-2.5 flex flex-col justify-between border border-[#eaedff]">
            <div>
              <span className="text-[11px] text-[#5a4138]">Saldo Siap Tarik</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-display font-bold text-base text-[#131b2e]">
                  Rp {walletBalance.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleWithdraw}
              className="text-[11px] text-[#a33900] font-bold hover:underline flex items-center justify-end gap-0.5 self-end mt-1"
            >
              <span>Tarik Tunai</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Segmented Tab Controls */}
      <div className="w-full bg-[#e2e7ff] rounded-full p-1 flex items-center justify-between shadow-inner">
        <button
          type="button"
          onClick={() => setDriverTab('available')}
          className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all text-center flex items-center justify-center gap-1 ${
            driverTab === 'available'
              ? 'bg-[#a33900] text-white shadow-sm'
              : 'text-[#5a4138] hover:text-[#131b2e]'
          }`}
        >
          <span>Pesanan Tersedia</span>
          <span className="bg-[#ffdbce] text-[#7f2b00] px-1.5 py-0.2 rounded-full text-[10px] font-bold">
            {availableJobs.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setDriverTab('active')}
          className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all text-center flex items-center justify-center gap-1 ${
            driverTab === 'active'
              ? 'bg-[#a33900] text-white shadow-sm'
              : 'text-[#5a4138] hover:text-[#131b2e]'
          }`}
        >
          <span>Tugas Aktif</span>
          <span className="bg-[#006c49] text-white px-1.5 py-0.2 rounded-full text-[10px] font-bold animate-pulse">
            {isTaskCompleted ? 0 : 1}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setDriverTab('history')}
          className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all text-center ${
            driverTab === 'history'
              ? 'bg-[#a33900] text-white shadow-sm'
              : 'text-[#5a4138] hover:text-[#131b2e]'
          }`}
        >
          Riwayat
        </button>
      </div>

      {/* TAB PANEL 1: PESANAN TERSEDIA */}
      {driverTab === 'available' && (
        <div className="flex flex-col gap-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#a33900] text-[18px]">near_me</span>
              <span className="font-display font-bold text-sm text-[#131b2e]">Antaran Sekitarmu</span>
            </div>
            <span className="text-[11px] text-[#5a4138]">Diperbarui 10 dtk lalu</span>
          </div>

          {availableJobs.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-[#5a4138] border border-[#eaedff]">
              <span className="material-symbols-outlined text-4xl text-[#a33900] mb-2">moped</span>
              <p className="font-bold text-sm text-[#131b2e]">Semua Antaran Telah Diambil</p>
              <p className="text-xs mt-1">Nantikan pesanan masuk berikutnya dari kantin Polinela.</p>
            </div>
          ) : (
            availableJobs.map((job) => (
              <div
                key={job.id}
                className="w-full bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col gap-3 transition-transform active:scale-[0.99]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 bg-[#f2f3ff] px-2 py-1 rounded-md text-[#5a4138] text-xs">
                    <span className="material-symbols-outlined text-[16px]">timer</span>
                    <span>Pesanan Masuk: {job.timeAgo}</span>
                  </div>
                  {/* Ongkir Fee Badge */}
                  <div className="flex items-center bg-[#ffdbce] px-2.5 py-1 rounded-full shadow-xs">
                    <span className="font-display text-xs text-[#a33900] font-bold">
                      Ongkir Rp {job.fee.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* Campus Text Landmarks Visual Flow */}
                <div className="flex flex-col gap-2 relative pl-6 before:content-[''] before:absolute before:left-2 before:top-2.5 before:bottom-2.5 before:w-0.5 before:bg-[#dae2fd]">
                  {/* Pickup */}
                  <div className="relative">
                    <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[#4edea3] flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-[#5a4138]">Ambil Makanan (Kantin):</span>
                      <span className="text-xs font-bold text-[#131b2e]">{job.canteenName}</span>
                    </div>
                  </div>

                  {/* Drop-off */}
                  <div className="relative mt-1">
                    <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[#ffb599] flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#a33900]"></span>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-[#5a4138]">Antar ke Ruangan:</span>
                      <span className="text-xs font-bold text-[#131b2e]">{job.dropoffLocation}</span>
                    </div>
                  </div>
                </div>

                {/* Special instructions note card */}
                <div className="bg-[#f2f3ff] rounded-lg p-2.5 flex items-start gap-2 border border-[#eaedff]">
                  <span className="material-symbols-outlined text-[#5a4138] text-[18px] shrink-0 mt-0.5">
                    pin_drop
                  </span>
                  <div className="flex flex-col text-[#5a4138] text-xs">
                    <span className="font-bold text-[#131b2e]">Catatan Landmark:</span>
                    <span>{job.landmarkNote}</span>
                  </div>
                </div>

                {/* Accept Action Button */}
                <button
                  type="button"
                  onClick={() => handleAcceptJob(job)}
                  className="w-full bg-[#a33900] hover:bg-[#cc4900] text-white py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[18px]">electric_moped</span>
                  <span>Ambil Antaran Ini</span>
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB PANEL 2: TUGAS AKTIF */}
      {driverTab === 'active' && (
        <div className="flex flex-col gap-3 animate-in fade-in duration-200">
          {isTaskCompleted ? (
            <div className="bg-white rounded-xl p-8 text-center border border-[#eaedff] flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#6cf8bb]/40 text-[#006c49] flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-3xl">task_alt</span>
              </div>
              <h3 className="font-display font-bold text-base text-[#131b2e]">
                Tidak Ada Tugas Berjalan
              </h3>
              <p className="text-xs text-[#5a4138] mt-1 mb-4">
                Semua tugas pengantaran telah selesai. Buka tab Pesanan Tersedia untuk mengambil order baru.
              </p>
              <button
                type="button"
                onClick={() => setDriverTab('available')}
                className="px-4 py-2 bg-[#a33900] text-white rounded-lg text-xs font-bold"
              >
                Cari Pesanan Baru
              </button>
            </div>
          ) : (
            <div className="w-full bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] flex flex-col gap-3.5">
              {/* Order Header Bar */}
              <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <span className="bg-[#6ffbbe] text-[#002113] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Sedang Bertugas
                  </span>
                  <span className="font-display font-bold text-sm text-[#131b2e]">
                    #{activeTask.orderNumber}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-display font-bold text-xs text-[#a33900]">
                    Ongkir Rp {activeTask.deliveryFee.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Recipient Profile Brief */}
              <div className="flex items-center justify-between bg-[#f2f3ff] p-2.5 rounded-lg border border-[#eaedff]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#6cf8bb] text-[#00714d] flex items-center justify-center font-display font-bold text-sm">
                    SR
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#131b2e]">
                      {activeTask.customerName}
                    </span>
                    <span className="text-[11px] text-[#5a4138]">Pelanggan Mahasiswa</span>
                  </div>
                </div>
                <span className="text-[11px] text-[#5a4138] bg-white px-2 py-1 rounded shadow-xs font-medium border border-[#eaedff]">
                  Bayar Tunai
                </span>
              </div>

              {/* Direct Contact & Details Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href="https://wa.me/6281278904421"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#006c49] hover:bg-[#005236] text-white py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors text-center"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>WhatsApp (+62 812-7890-4421)</span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowOrderDetail(!showOrderDetail)}
                  className="w-full bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#131b2e] py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                  <span>{showOrderDetail ? 'Tutup Rincian' : 'Lihat Rincian Pesanan'}</span>
                </button>
              </div>

              {/* Collapsible Order Details */}
              {showOrderDetail && (
                <div className="bg-[#f2f3ff] rounded-lg p-3 flex flex-col gap-2 border border-[#eaedff] animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
                    <span className="text-[10px] font-bold text-[#5a4138] uppercase tracking-wide">
                      Rincian Menu
                    </span>
                    <span className="text-[11px] text-[#5a4138]">{activeTask.canteenStand}</span>
                  </div>
                  <div className="flex flex-col gap-1.5 text-xs text-[#131b2e]">
                    {activeTask.items.map((it) => (
                      <div key={it.id} className="flex justify-between">
                        <span>{it.quantity}x {it.name}</span>
                        <span className="font-bold">Rp {(it.price * it.quantity).toLocaleString('id-ID')}</span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-1 border-t border-[#eaedff] font-bold text-[#a33900]">
                      <span>Total Tagihan (Termasuk Ongkir)</span>
                      <span>Rp {activeTask.total.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Text-based Landmark Specifics */}
              <div className="bg-[#f2f3ff] rounded-lg p-3 flex items-start gap-2.5 border border-[#eaedff]">
                <div className="p-1.5 rounded-full bg-[#ffdbce] text-[#a33900] shrink-0">
                  <span className="material-symbols-outlined text-[18px]">room</span>
                </div>
                <div className="flex flex-col text-xs">
                  <span className="text-[11px] text-[#5a4138] font-bold">Lokasi Pengantaran:</span>
                  <span className="font-bold text-[#131b2e]">{activeTask.room}</span>
                  <span className="text-[#5a4138] mt-0.5">{activeTask.landmarkNote}</span>
                </div>
              </div>

              {/* Interactive 3-Step Campus Delivery Tracker */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#131b2e] uppercase tracking-wider">
                    Status Antaran
                  </span>
                  <span className="text-xs font-bold text-[#a33900]">
                    Langkah {taskStep} dari 3
                  </span>
                </div>

                <div className="flex flex-col gap-3 py-1">
                  {/* Step 1 */}
                  <div 
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setTaskStep(1)}
                  >
                    <div className="w-7 h-7 rounded-full bg-[#006c49] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#131b2e]">1. Sudah Ambil di Kantin</span>
                      <span className="text-[11px] text-[#006c49] font-medium">Selesai ✓</span>
                    </div>
                  </div>

                  <div className="w-0.5 h-3 bg-[#006c49] ml-3.5 -my-2.5"></div>

                  {/* Step 2 */}
                  <div 
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setTaskStep(2)}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-xs ${
                      taskStep >= 2 ? 'bg-[#a33900] text-white animate-bounce' : 'bg-gray-200 text-gray-500'
                    }`}>
                      <span className="material-symbols-outlined text-[16px]">directions_run</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#131b2e]">2. Sedang Diantar ke Ruangan</span>
                      <span className="text-[11px] text-[#a33900] font-bold">Sedang Berjalan 🏃</span>
                    </div>
                  </div>

                  <div className="w-0.5 h-3 bg-[#e2e7ff] ml-3.5 -my-2.5"></div>

                  {/* Step 3 */}
                  <div 
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setTaskStep(3)}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      taskStep === 3 ? 'bg-[#006c49] text-white' : 'bg-[#e2e7ff] text-[#5a4138]'
                    }`}>
                      {taskStep === 3 ? <span className="material-symbols-outlined text-[16px]">check</span> : '3'}
                    </div>
                    <div className="flex flex-col opacity-80">
                      <span className="text-xs font-semibold text-[#131b2e]">3. Selesai & Diterima Pembeli</span>
                      <span className="text-[11px] text-[#5a4138]">Menunggu konfirmasi di pintu kelas</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="button"
                onClick={handleCompleteDelivery}
                className="w-full bg-[#006c49] hover:bg-[#005236] text-white py-3.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] mt-1"
              >
                <span className="material-symbols-outlined text-[20px]">verified</span>
                <span>Konfirmasi Pesanan Telah Sampai ke Pembeli</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB PANEL 3: RIWAYAT */}
      {driverTab === 'history' && (
        <div className="flex flex-col gap-2.5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-1">
            <span className="font-display font-bold text-sm text-[#131b2e]">
              Riwayat Antaran Hari Ini
            </span>
            <span className="text-xs text-[#006c49] font-bold">Total: Rp {earnings.toLocaleString('id-ID')}</span>
          </div>

          <div className="w-full bg-white rounded-xl p-3 shadow-xs border border-[#eaedff] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#6ffbbe] text-[#002113] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#131b2e]">Gedung QB R. 204</span>
                <span className="text-[11px] text-[#5a4138]">Kantin Mbak Sri • 11:20 WIB</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[#006c49]">+Rp 3.500</span>
              <span className="block text-[10px] text-[#5a4138]">Selesai</span>
            </div>
          </div>

          <div className="w-full bg-white rounded-xl p-3 shadow-xs border border-[#eaedff] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#6ffbbe] text-[#002113] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#131b2e]">Gedung Sakura R. Dosen</span>
                <span className="text-[11px] text-[#5a4138]">Kantin Bude Warno • 10:45 WIB</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[#006c49]">+Rp 3.500</span>
              <span className="block text-[10px] text-[#5a4138]">Selesai</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
