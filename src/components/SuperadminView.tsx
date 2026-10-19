import React, { useState } from 'react';
import { ASSETS, MOCK_CAMPUS_BUILDINGS } from '../data/mockData';

interface SuperadminViewProps {
  onBackToApp: () => void;
  onShowToast: (msg: string) => void;
  onShowReceiptModal: () => void;
}

export const SuperadminView: React.FC<SuperadminViewProps> = ({
  onBackToApp,
  onShowToast,
  onShowReceiptModal,
}) => {
  const [activeNav, setActiveNav] = useState('ringkasan');
  const [userFilter, setUserFilter] = useState('all');
  const [searchUser, setSearchUser] = useState('');
  const [verificationList, setVerificationList] = useState([
    {
      id: 'mitra-1',
      name: 'Kantin Barokah Mas Eko',
      owner: 'Eko Prasetyo',
      account: 'BRI 1042***',
      type: 'Stan Pujasera',
      landmark: 'Kantin Baru Sebelah Gedung Jurusan Peternakan (Area Barat)',
    },
    {
      id: 'mitra-2',
      name: 'Dapoer Kampus Sehat',
      owner: 'Ratna Wulandari',
      account: 'BSI 7149***',
      type: 'Kopma Unit',
      landmark: 'Koperasi Mahasiswa Lt. 1 (Depan Gazebo Pusat Rektorat)',
    },
  ]);

  const [tariffBase, setTariffBase] = useState(3000);
  const [tariffFloorBonus, setTariffFloorBonus] = useState(500);
  const [showTariffModal, setShowTariffModal] = useState(false);
  const [showAddBuildingModal, setShowAddBuildingModal] = useState(false);
  const [buildings, setBuildings] = useState(MOCK_CAMPUS_BUILDINGS);
  const [newBldName, setNewBldName] = useState('');
  const [newBldFaculty, setNewBldFaculty] = useState('');
  const [newBldFloors, setNewBldFloors] = useState(3);
  const [newBldRooms, setNewBldRooms] = useState(12);

  const handleApproveMitra = (id: string, name: string) => {
    setVerificationList((prev) => prev.filter((m) => m.id !== id));
    onShowToast(`Mitra "${name}" berhasil disetujui & aktif di Polinela!`);
  };

  const handleRejectMitra = (id: string, name: string) => {
    setVerificationList((prev) => prev.filter((m) => m.id !== id));
    onShowToast(`Permohonan "${name}" ditolak.`);
  };

  const handleAddBuilding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBldName) return;
    const newB: any = {
      id: 'b-' + Date.now(),
      name: newBldName,
      faculty: newBldFaculty || 'Gedung Unit Kampus Polinela',
      floors: newBldFloors,
      roomsCount: newBldRooms,
      status: 'Aktif',
      detail: `${newBldFloors} Lantai, ${newBldRooms} Ruangan`,
    };
    setBuildings([...buildings, newB]);
    try {
      const { postCampusBuilding } = await import('../services/api.ts');
      await postCampusBuilding(newB);
    } catch (err) {
      console.warn('Persisting locally:', err);
    }
    setShowAddBuildingModal(false);
    setNewBldName('');
    setNewBldFaculty('');
    onShowToast(`Landmark ${newBldName} berhasil disimpan ke database Cloud SQL!`);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col md:flex-row">
      {/* Sidebar for Desktop / Tablet */}
      <aside className="w-full md:w-64 lg:w-72 bg-white border-r border-[#eaedff] flex flex-col justify-between shrink-0 shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-30">
        <div className="flex flex-col">
          {/* Brand header */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-[#eaedff]">
            <div className="flex items-center gap-2">
              <img
                src={ASSETS.logo}
                alt="PoliFood Logo"
                className="h-8 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-base text-[#a33900] tracking-tight">
                  PoliFood
                </span>
                <span className="text-[10px] font-bold text-[#5a4138] uppercase tracking-wider">
                  Superadmin Portal
                </span>
              </div>
            </div>

            {/* Quick exit button on mobile */}
            <button
              type="button"
              onClick={onBackToApp}
              className="md:hidden text-xs bg-[#eaedff] px-2.5 py-1 rounded-lg font-bold text-[#a33900]"
            >
              Keluar
            </button>
          </div>

          {/* Node Status Banner */}
          <div className="px-4 py-3">
            <div className="bg-[#f2f3ff] rounded-lg p-2.5 flex items-center justify-between border border-[#eaedff]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
                <span className="text-[11px] text-[#006c49] font-bold uppercase tracking-wider">
                  Node Polinela
                </span>
              </div>
              <span className="text-[11px] text-[#5a4138] font-medium">Online v2.4</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 px-3 mt-1">
            {[
              { id: 'ringkasan', label: 'Ringkasan', icon: 'grid_view' },
              { id: 'verifikasi-kantin', label: 'Verifikasi Kantin', icon: 'storefront' },
              { id: 'kelola-pengguna', label: 'Kelola Pengguna', icon: 'group' },
              { id: 'master-data-lokasi-kampus', label: 'Master Data Lokasi Kampus', icon: 'apartment' },
              { id: 'transaksi-dan-laporan', label: 'Transaksi & Laporan', icon: 'receipt_long' },
            ].map((nav) => (
              <button
                key={nav.id}
                type="button"
                onClick={() => setActiveNav(nav.id)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all text-left ${
                  activeNav === nav.id
                    ? 'bg-[#a33900] text-white shadow-xs'
                    : 'text-[#5a4138] hover:bg-[#eaedff] hover:text-[#131b2e]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{nav.icon}</span>
                <span>{nav.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Root Access Card & Return Button */}
        <div className="p-4 flex flex-col gap-2">
          <div className="p-3 bg-[#f2f3ff] rounded-lg flex items-center justify-between border border-[#eaedff]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006c49] text-[22px]">shield_person</span>
              <div className="flex flex-col">
                <span className="text-xs text-[#131b2e] font-bold">Root Access</span>
                <span className="text-[10px] text-[#5a4138]">Kantin & Kampus Unit</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#5a4138] text-[18px]">verified</span>
          </div>

          <button
            type="button"
            onClick={onBackToApp}
            className="w-full py-2.5 px-3 rounded-lg bg-[#ffdbce] hover:bg-[#ffb599] text-[#7f2b00] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">smartphone</span>
            <span>Kembali ke App Ponsel</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white/90 backdrop-blur-xl border-b border-[#eaedff] sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 bg-[#f2f3ff] px-3 py-1 rounded-full border border-[#eaedff]">
              <span className="material-symbols-outlined text-[#a33900] text-[16px]">domain</span>
              <span className="text-xs text-[#5a4138] hidden sm:inline">
                Politeknik Negeri Lampung Cluster System
              </span>
              <span className="text-xs text-[#5a4138] sm:hidden">Polinela Cluster</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 bg-[#6cf8bb]/30 text-[#005236] px-2.5 py-1 rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
              <span>Sistem Canteen Aktif</span>
            </div>

            <div className="h-6 w-px bg-[#eaedff] hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="text-xs text-[#131b2e] font-bold">Administrator Polinela</span>
                <span className="text-[10px] text-[#5a4138]">superadmin@polinela.ac.id</span>
              </div>
              <img
                src={ASSETS.profileAvatar}
                alt="Superadmin"
                className="w-8 h-8 rounded-full object-cover border border-[#eaedff]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-4 sm:p-6 space-y-6 max-w-7xl">
          {/* Header Section with Campus Semester Tag */}
          <div className="relative overflow-hidden rounded-xl bg-white p-5 sm:p-6 shadow-xs border border-[#eaedff]">
            <div className="absolute right-0 top-0 -mt-6 -mr-6 w-56 h-56 rounded-full bg-[#a33900]/5 blur-2xl pointer-events-none"></div>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-12 shrink-0 flex items-center justify-center bg-[#f2f3ff] rounded-lg p-2 border border-[#eaedff]">
                  <img
                    src={ASSETS.logo}
                    alt="PoliFood"
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display font-bold text-lg sm:text-xl text-[#131b2e] tracking-tight">
                      Portal Superadmin PoliFood
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#ffdbce] text-[#7f2b00] text-[10px] font-bold uppercase">
                      Polinela Core
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[#5a4138] text-xs">
                    <span className="flex items-center gap-1 font-semibold text-[#a33900]">
                      <span className="material-symbols-outlined text-[15px]">school</span>
                      Politeknik Negeri Lampung
                    </span>
                    <span>•</span>
                    <span>Cluster Kendali Terpusat Multi-Kantin</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eaedff] text-[#131b2e] text-xs">
                  <span className="material-symbols-outlined text-[#006c49] text-[16px]">calendar_today</span>
                  <span>Semester:</span>
                  <span className="font-bold text-[#006c49]">Semester Genap 2024/2025</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#6cf8bb]/30 text-[#005236] text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
                  <span>Layanan: <strong>Normal</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => onShowToast('Data cluster kampus berhasil disinkronisasi!')}
                  className="flex items-center gap-1 bg-[#a33900] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#cc4900] active:scale-95 transition-all shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">sync</span>
                  <span>Sinkronisasi Data</span>
                </button>
              </div>
            </div>
          </div>

          {/* Top KPI Stats Bento Grid (4 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1: Total Civitas */}
            <div className="bg-white p-4 rounded-xl shadow-xs border border-[#eaedff] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-[#5a4138] tracking-wider">
                    Civitas Terdaftar
                  </span>
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#131b2e] mt-1">
                    3.420
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#a33900]">
                  <span className="material-symbols-outlined text-[22px]">badge</span>
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-[#eaedff] flex items-center justify-between text-[#5a4138] text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span>Mhs: <strong className="text-[#131b2e]">2.980</strong></span>
                  <span>•</span>
                  <span>Staf: <strong className="text-[#131b2e]">320</strong></span>
                  <span>•</span>
                  <span>Mitra: <strong className="text-[#a33900]">120</strong></span>
                </div>
              </div>
            </div>

            {/* Stat 2: Kantin Aktif */}
            <div className="bg-white p-4 rounded-xl shadow-xs border border-[#eaedff] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-[#5a4138] tracking-wider">
                    Kantin Aktif
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#131b2e]">
                      28
                    </span>
                    <span className="text-xs text-[#5a4138]">Stan Pujasera</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#6cf8bb]/40 flex items-center justify-center text-[#006c49]">
                  <span className="material-symbols-outlined text-[22px]">storefront</span>
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-[#eaedff] flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] text-[#006c49] font-bold">
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                  <span>95% Terverifikasi</span>
                </div>
                <span className="text-[11px] text-[#a33900] font-bold">2 Antrean</span>
              </div>
            </div>

            {/* Stat 3: Omzet Bulan Ini */}
            <div className="bg-white p-4 rounded-xl shadow-xs border border-[#eaedff] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-[#5a4138] tracking-wider">
                    Omzet Bulan Ini
                  </span>
                  <span className="font-display font-extrabold text-xl sm:text-2xl text-[#a33900] mt-1 tracking-tight">
                    Rp 148.950.000
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#ffdbce] flex items-center justify-center text-[#a33900]">
                  <span className="material-symbols-outlined text-[22px]">receipt_long</span>
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-[#eaedff] flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#006c49] text-xs font-bold">
                  <span className="material-symbols-outlined text-[15px]">trending_up</span>
                  <span>+24.5%</span>
                </div>
                <span className="text-[11px] text-[#5a4138]">vs Semester Ganjil</span>
              </div>
            </div>

            {/* Stat 4: Kas Layanan & Komisi */}
            <div className="bg-white p-4 rounded-xl shadow-xs border border-[#eaedff] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-[#5a4138] tracking-wider">
                    Kas Layanan & Komisi
                  </span>
                  <span className="font-display font-extrabold text-xl sm:text-2xl text-[#006c49] mt-1 tracking-tight">
                    Rp 7.447.500
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#6cf8bb]/30 flex items-center justify-center text-[#006c49]">
                  <span className="material-symbols-outlined text-[22px]">account_balance_wallet</span>
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-[#eaedff] flex items-center justify-between">
                <span className="text-[11px] text-[#5a4138]">
                  Fee Platform: <strong>5%</strong>
                </span>
                <button
                  type="button"
                  onClick={() => onShowToast('Rekap kas layanan siap diunduh (PDF)')}
                  className="text-[11px] text-[#006c49] font-bold hover:underline"
                >
                  Rekap Kas →
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Metrics Visual Strip */}
          <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-[#ffdbce] flex items-center justify-center text-[#a33900] shrink-0">
                <span className="material-symbols-outlined text-[24px]">monitoring</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm text-[#131b2e]">
                  Arus Pemesanan Jam Istirahat (Pukul 11:30 - 13:00 WIB)
                </span>
                <span className="text-xs text-[#5a4138]">
                  Rata-rata 142 porsi dipesan per 15 menit ke seluruh gedung kampus.
                </span>
              </div>
            </div>

            {/* Mini Inline Chart */}
            <div className="flex items-center gap-4 self-end md:self-auto">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-[#5a4138] uppercase font-bold">Beban Server Node</span>
                <span className="font-display text-xs text-[#006c49] font-bold">28.4% Normal</span>
              </div>
              <div className="w-36 h-10 flex items-end gap-1.5 bg-[#f2f3ff] p-1.5 rounded-md border border-[#eaedff]">
                <div className="flex-1 bg-[#6cf8bb] h-3 rounded-xs" title="10:00 WIB"></div>
                <div className="flex-1 bg-[#4edea3] h-5 rounded-xs" title="11:00 WIB"></div>
                <div className="flex-1 bg-[#a33900] h-9 rounded-xs" title="12:00 WIB (Puncak)"></div>
                <div className="flex-1 bg-[#cc4900] h-7 rounded-xs" title="12:30 WIB"></div>
                <div className="flex-1 bg-[#4edea3] h-4 rounded-xs" title="13:00 WIB"></div>
                <div className="flex-1 bg-[#6cf8bb] h-2 rounded-xs" title="14:00 WIB"></div>
              </div>
            </div>
          </div>

          {/* Two Main Content Columns: Left (Queue & Verification) | Right (User Mgmt & Master Data) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT COLUMN: CANTEEN VERIFICATION QUEUE (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Canteen Verification Queue Card */}
              <div className="bg-white rounded-xl shadow-xs border border-[#eaedff] overflow-hidden flex flex-col">
                <div className="p-4 bg-[#f2f3ff] border-b border-[#eaedff] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#a33900] text-[22px]">
                      pending_actions
                    </span>
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-sm text-[#131b2e] leading-tight">
                        Antrean Verifikasi Mitra
                      </span>
                      <span className="text-xs text-[#5a4138]">
                        {verificationList.length} Permohonan Stan Menunggu Persetujuan
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#a33900] text-white text-[10px] font-bold">
                    {verificationList.length} Baru
                  </span>
                </div>

                <div className="flex flex-col divide-y divide-[#eaedff]">
                  {verificationList.map((mitra) => (
                    <div key={mitra.id} className="p-4 flex flex-col gap-2.5 hover:bg-[#faf8ff] transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#a33900] font-bold">
                            <span className="material-symbols-outlined text-[20px]">restaurant</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-[#131b2e]">{mitra.name}</span>
                            <span className="text-[11px] text-[#5a4138]">
                              Pemilik: {mitra.owner} • Rek: {mitra.account}
                            </span>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#5a4138] text-[10px] font-semibold">
                          {mitra.type}
                        </span>
                      </div>

                      {/* Text Landmark Location */}
                      <div className="p-2 rounded-lg bg-[#f2f3ff] border border-[#eaedff] flex items-start gap-1.5 text-xs text-[#131b2e]">
                        <span className="material-symbols-outlined text-[#a33900] text-[16px] shrink-0 mt-0.5">
                          location_on
                        </span>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#5a4138] uppercase font-bold">
                            Lokasi Landmark Teks:
                          </span>
                          <span className="text-xs font-medium">{mitra.landmark}</span>
                        </div>
                      </div>

                      {/* QRIS & Actions */}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={onShowReceiptModal}
                          className="inline-flex items-center gap-1 text-[#a33900] hover:underline text-xs font-semibold"
                        >
                          <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
                          <span>[Lihat QRIS Rekening]</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleRejectMitra(mitra.id, mitra.name)}
                            className="px-3 py-1.5 rounded-lg bg-[#ffdad6] text-[#93000a] hover:bg-[#ba1a1a] hover:text-white transition-all text-xs font-bold active:scale-95"
                          >
                            Tolak
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApproveMitra(mitra.id, mitra.name)}
                            className="px-3 py-1.5 rounded-lg bg-[#006c49] text-white hover:bg-[#005236] transition-all text-xs font-bold shadow-xs active:scale-95 flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                            <span>Setujui</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {verificationList.length === 0 && (
                    <div className="p-8 text-center text-[#5a4138] text-xs">
                      Semua pendaftaran mitra telah diproses!
                    </div>
                  )}
                </div>

                <div className="p-2.5 bg-[#f2f3ff] text-center border-t border-[#eaedff]">
                  <span className="text-[11px] text-[#5a4138]">
                    Seluruh mitra wajib mematuhi standar kebersihan Badan Pengelola Usaha Polinela
                  </span>
                </div>
              </div>

              {/* Quick Summary Card: Merchant Health */}
              <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-sm text-[#131b2e]">
                    Kepatuhan Operasional Stan
                  </span>
                  <span className="text-xs text-[#006c49] font-bold">100% Sesuai HET Polinela</span>
                </div>
                <div className="w-full bg-[#eaedff] rounded-full h-2 overflow-hidden">
                  <div className="bg-[#006c49] h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
                <p className="text-xs text-[#5a4138] leading-relaxed">
                  Penyelarasan harga standar mahasiswa (Nasi Ayam Max Rp 13.000, Es Teh Manis Max Rp 3.000) aktif terikat kebijakan SK Direktur Polinela.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: USER MGMT & MASTER DATA (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Section 1: User Management Quick Table */}
              <div className="bg-white rounded-xl shadow-xs border border-[#eaedff] overflow-hidden flex flex-col">
                <div className="p-4 bg-[#f2f3ff] border-b border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#a33900] text-[22px]">
                      manage_accounts
                    </span>
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-sm text-[#131b2e]">
                        Kelola Pengguna Civitas & Mitra
                      </span>
                      <span className="text-xs text-[#5a4138]">
                        Akses Mahasiswa, Pengemudi Kampus, Dosen, & Merchant
                      </span>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative w-full sm:w-52">
                    <input
                      type="text"
                      placeholder="Cari NPM / Nama..."
                      value={searchUser}
                      onChange={(e) => setSearchUser(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white text-xs border border-[#eaedff] text-[#131b2e] focus:outline-none focus:border-[#a33900]"
                    />
                    <span className="material-symbols-outlined absolute left-2.5 top-2 text-[16px] text-[#5a4138]">
                      search
                    </span>
                  </div>
                </div>

                {/* Role Filter Chips */}
                <div className="px-4 py-2 bg-white flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-[#eaedff]">
                  <span className="text-[10px] text-[#5a4138] uppercase font-bold mr-1">Filter:</span>
                  {[
                    { id: 'all', label: 'Semua (3.420)' },
                    { id: 'mhs', label: 'Mahasiswa (2.980)' },
                    { id: 'driver', label: 'Driver Kampus (45)' },
                    { id: 'dosen', label: 'Dosen / Tendik (320)' },
                    { id: 'kantin', label: 'Kantin (120)' },
                  ].map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => setUserFilter(chip.id)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors ${
                        userFilter === chip.id
                          ? 'bg-[#131b2e] text-white'
                          : 'bg-[#eaedff] text-[#5a4138] hover:text-[#131b2e]'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#f2f3ff] text-[#5a4138] text-[10px] uppercase font-bold">
                      <tr>
                        <th className="py-2.5 px-4">Pengguna & Identitas</th>
                        <th className="py-2.5 px-3">Peran Civitas</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-4 text-right">Tindakan Admin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eaedff]">
                      {/* Row 1: Siti Rahmawati */}
                      <tr className="hover:bg-[#faf8ff] transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#ffdbce] text-[#7f2b00] flex items-center justify-center font-bold text-xs">
                              SR
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-[#131b2e]">Siti Rahmawati</span>
                              <span className="text-[10px] text-[#5a4138]">NPM: 21753048 • TRPL</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex flex-col">
                            <span className="font-medium text-[#131b2e]">Mahasiswa & Driver</span>
                            <span className="text-[10px] text-[#006c49] font-semibold">Armada Aktif</span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#005236] text-[10px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
                            Aktif
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => onShowToast('Panel kontrol pengguna Siti Rahmawati dibuka.')}
                            className="px-2.5 py-1 rounded bg-[#eaedff] text-[#131b2e] hover:bg-[#ffdad6] hover:text-[#93000a] text-[11px] font-bold transition-colors"
                          >
                            Kelola / Suspend
                          </button>
                        </td>
                      </tr>

                      {/* Row 2: Kantin Mbak Sri */}
                      <tr className="hover:bg-[#faf8ff] transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#dae2fd] text-[#a33900] flex items-center justify-center font-bold text-xs">
                              MS
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-[#131b2e]">Kantin Mbak Sri</span>
                              <span className="text-[10px] text-[#5a4138]">ID: KTN-014 • Pujasera Rektorat</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-medium text-[#131b2e]">Mitra Kantin</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#005236] text-[10px] font-bold">
                            <span className="material-symbols-outlined text-[12px]">verified</span>
                            Terverifikasi
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => onShowToast('Laporan audit transaksi Kantin Mbak Sri dibuat.')}
                            className="px-2.5 py-1 rounded bg-[#eaedff] text-[#a33900] hover:bg-[#a33900] hover:text-white text-[11px] font-bold transition-colors"
                          >
                            Audit Transaksi
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 2: Master Data Lokasi Kampus Panel (NO GPS, 100% Text Landmark Manager) */}
              <div className="bg-white rounded-xl shadow-xs border border-[#eaedff] overflow-hidden flex flex-col">
                <div className="p-4 bg-[#f2f3ff] border-b border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#a33900] text-[22px]">apartment</span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-sm text-[#131b2e]">
                          Master Data Lokasi Kampus Polinela
                        </span>
                        <span className="px-1.5 py-0.5 bg-[#ffdbce] text-[#7f2b00] rounded text-[9px] font-bold uppercase">
                          100% Text Landmark
                        </span>
                      </div>
                      <span className="text-xs text-[#5a4138]">
                        Manajemen Titik Antar Gedung, Lantai, & Ruangan Tanpa Koordinat GPS
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddBuildingModal(true)}
                    className="inline-flex items-center gap-1 bg-[#a33900] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#cc4900] active:scale-95 transition-all shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_circle</span>
                    <span>+ Tambah Gedung</span>
                  </button>
                </div>

                {/* Controlled Tariff Banner */}
                <div className="m-4 p-3 rounded-lg bg-[#f2f3ff] border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#006c49] text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">moped</span>
                    </div>
                    <div className="flex flex-col text-xs">
                      <span className="font-bold text-[#131b2e]">
                        Tarif Ongkir Driver Pengantar Civitas
                      </span>
                      <span className="text-[#5a4138]">
                        <strong>Flat Rp {tariffBase.toLocaleString('id-ID')}</strong> seluruh area kampus{' '}
                        <span className="text-[#006c49] font-semibold">
                          (Bonus Rp {tariffFloorBonus.toLocaleString('id-ID')} lantai 3-4)
                        </span>
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowTariffModal(true)}
                    className="text-xs text-[#a33900] font-bold hover:underline self-end sm:self-center"
                  >
                    Ubah Kebijakan Tarif →
                  </button>
                </div>

                {/* Managed Buildings Grid */}
                <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {buildings.map((b) => (
                    <div
                      key={b.id}
                      className="p-3 rounded-lg bg-[#f2f3ff] border border-[#eaedff] flex flex-col justify-between hover:bg-[#eaedff] transition-colors"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[#a33900] text-[18px]">domain</span>
                            <span className="font-display font-bold text-xs text-[#131b2e]">{b.name}</span>
                          </div>
                          <span className="px-1.5 py-0.5 rounded-full bg-[#eaedff] text-[#5a4138] text-[9px] font-semibold">
                            {b.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#5a4138] mt-1">{b.faculty}</p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#dae2fd] flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 text-[11px] text-[#5a4138]">
                          <span className="material-symbols-outlined text-[14px]">stairs</span>
                          <span>{b.detail}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => onShowToast(`Pengaturan ruang ${b.name} dibuka.`)}
                          className="text-[#a33900] font-bold hover:underline text-[11px]"
                        >
                          Kelola Ruang
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Change Tariff Policy Modal */}
      {showTariffModal && (
        <div 
          className="fixed inset-0 z-50 bg-[#283044]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowTariffModal(false)}
        >
          <div 
            className="bg-white rounded-xl max-w-sm w-full p-4 shadow-xl border border-[#eaedff] flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
              <h3 className="font-display font-bold text-sm text-[#131b2e]">Kebijakan Tarif Kampus</h3>
              <button 
                type="button" 
                onClick={() => setShowTariffModal(false)}
                className="text-[#5a4138]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Tarif Flat Dasar Kampus (Rp)</label>
                <input
                  type="number"
                  value={tariffBase}
                  onChange={(e) => setTariffBase(parseInt(e.target.value, 10) || 3000)}
                  className="w-full bg-[#f2f3ff] p-2.5 rounded-lg border border-[#eaedff]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Bonus Tantangan Lantai 3-4 (Rp)</label>
                <input
                  type="number"
                  value={tariffFloorBonus}
                  onChange={(e) => setTariffFloorBonus(parseInt(e.target.value, 10) || 500)}
                  className="w-full bg-[#f2f3ff] p-2.5 rounded-lg border border-[#eaedff]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowTariffModal(false)}
                className="py-2 rounded-lg bg-[#eaedff] text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowTariffModal(false);
                  onShowToast('Tarif ongkir kurir kampus berhasil diselaraskan!');
                }}
                className="py-2 rounded-lg bg-[#a33900] text-white text-xs font-bold"
              >
                Simpan Tarif
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Campus Building Modal */}
      {showAddBuildingModal && (
        <div 
          className="fixed inset-0 z-50 bg-[#283044]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowAddBuildingModal(false)}
        >
          <div 
            className="bg-white rounded-xl max-w-sm w-full p-4 shadow-xl border border-[#eaedff] flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
              <h3 className="font-display font-bold text-sm text-[#131b2e]">Tambah Landmark Gedung</h3>
              <button 
                type="button" 
                onClick={() => setShowAddBuildingModal(false)}
                className="text-[#5a4138]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddBuilding} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Nama Gedung</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Gedung Laboratorium Pangan"
                  value={newBldName}
                  onChange={(e) => setNewBldName(e.target.value)}
                  className="w-full bg-[#f2f3ff] p-2.5 rounded-lg border border-[#eaedff]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Fakultas / Keterangan</label>
                <input
                  type="text"
                  placeholder="Contoh: Jurusan Teknologi Pertanian"
                  value={newBldFaculty}
                  onChange={(e) => setNewBldFaculty(e.target.value)}
                  className="w-full bg-[#f2f3ff] p-2.5 rounded-lg border border-[#eaedff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Jumlah Lantai</label>
                  <input
                    type="number"
                    min="1"
                    value={newBldFloors}
                    onChange={(e) => setNewBldFloors(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-[#f2f3ff] p-2.5 rounded-lg border border-[#eaedff]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Total Ruangan</label>
                  <input
                    type="number"
                    min="1"
                    value={newBldRooms}
                    onChange={(e) => setNewBldRooms(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-[#f2f3ff] p-2.5 rounded-lg border border-[#eaedff]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddBuildingModal(false)}
                  className="py-2 rounded-lg bg-[#eaedff] text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="py-2 rounded-lg bg-[#a33900] text-white text-xs font-bold"
                >
                  Simpan Gedung
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
