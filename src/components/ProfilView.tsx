import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { UserRole } from '../types';

interface ProfilViewProps {
  onShowToast: (msg: string) => void;
  onSaveAndGoHome: () => void;
}

export const ProfilView: React.FC<ProfilViewProps> = ({
  onShowToast,
  onSaveAndGoHome,
}) => {
  const [role, setRole] = useState<UserRole>('mahasiswa');
  const [fullName, setFullName] = useState('Siti Rahmawati');
  const [phone, setPhone] = useState('812-7890-4421');
  const [npm, setNpm] = useState('21753048');
  const [jurusan, setJurusan] = useState('ekonomi-bisnis');
  const [prodi, setProdi] = useState('d4-mi');
  const [driverMode, setDriverMode] = useState(true);

  // Dosen
  const [nip, setNip] = useState('198704152019032008');
  const [unit, setUnit] = useState('gedung-qb');

  // Kantin
  const [stanName, setStanName] = useState('Kantin Mbak Sri - Aneka Ayam Penyet');
  const [jamOperasional, setJamOperasional] = useState('07.30 - 16.00 WIB (Senin - Jumat)');
  const [lokasiManual, setLokasiManual] = useState(
    'Kantin Pusat Terpadu Polinela, Blok B No. 04 (Dekat Koridor Belakang)'
  );

  const [isSaving, setIsSaving] = useState(false);

  const handleAvatarChange = () => {
    onShowToast('Pilih foto baru dari galeri/kamera.');
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onShowToast('Biodata civitas Polinela berhasil disimpan!');
      onSaveAndGoHome();
    }, 800);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 pb-28 pt-2 flex flex-col gap-4">
      {/* Progress Indicator Banner (Route Guard Notice) */}
      <div className="w-full bg-[#e2e7ff] rounded-xl p-4 shadow-xs border border-[#dae2fd] flex flex-col gap-1 relative overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[#a33900]">
            <span className="material-symbols-outlined text-[18px] fill-1">verified_user</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#a33900]">
              Verifikasi Civitas
            </span>
          </div>
          <span className="bg-[#ffdad6] text-[#93000a] text-[10px] px-2 py-0.5 rounded-full font-bold">
            Wajib untuk Melanjutkan
          </span>
        </div>
        <h2 className="font-display font-bold text-sm sm:text-base text-[#131b2e] leading-tight mt-1">
          Langkah 1 dari 1: Lengkapi Biodata Civitas Kampus
        </h2>
        <p className="text-xs text-[#5a4138]">
          Akses pemesanan makanan cepat antar gedung Polinela siap digunakan setelah verifikasi data singkat ini.
        </p>
        {/* Mini Progress Line */}
        <div className="w-full bg-[#dae2fd] h-1.5 rounded-full overflow-hidden mt-2">
          <div className="bg-[#a33900] h-full rounded-full w-full transition-all duration-500"></div>
        </div>
      </div>

      {/* Profile Avatar Section */}
      <div className="w-full bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col items-center justify-center text-center">
        <div className="relative group inline-block">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-[#eaedff] shadow-inner p-1">
            <img
              src={ASSETS.profileAvatar}
              alt="Avatar Mahasiswa Polinela"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <button
            type="button"
            aria-label="Ganti Foto Profil"
            onClick={handleAvatarChange}
            className="absolute bottom-0 right-0 bg-[#a33900] text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md active:scale-95 transition-transform hover:bg-[#cc4900]"
          >
            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
          </button>
        </div>
        <button
          type="button"
          onClick={handleAvatarChange}
          className="text-xs font-bold text-[#a33900] hover:underline mt-2 flex items-center gap-1"
        >
          <span>Ganti Foto Profil</span>
        </button>
        <span className="text-[11px] text-[#5a4138]">Format JPG/PNG, maks. 2MB</span>
      </div>

      {/* Interactive Role Selector Pills */}
      <div className="w-full">
        <label className="text-[11px] font-bold text-[#5a4138] uppercase tracking-wider mb-1.5 block">
          Peran Akun di Polinela
        </label>
        <div className="grid grid-cols-3 gap-1 bg-[#eaedff] p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setRole('mahasiswa')}
            className={`flex items-center justify-center py-2 px-2 rounded-lg text-xs font-bold text-center transition-all ${
              role === 'mahasiswa'
                ? 'bg-[#a33900] text-white shadow-xs'
                : 'text-[#5a4138] hover:text-[#131b2e]'
            }`}
          >
            <span className="truncate">Mahasiswa</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('dosen')}
            className={`flex items-center justify-center py-2 px-2 rounded-lg text-xs font-bold text-center transition-all ${
              role === 'dosen'
                ? 'bg-[#a33900] text-white shadow-xs'
                : 'text-[#5a4138] hover:text-[#131b2e]'
            }`}
          >
            <span className="truncate">Dosen / Tendik</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('kantin')}
            className={`flex items-center justify-center py-2 px-2 rounded-lg text-xs font-bold text-center transition-all ${
              role === 'kantin'
                ? 'bg-[#a33900] text-white shadow-xs'
                : 'text-[#5a4138] hover:text-[#131b2e]'
            }`}
          >
            <span className="truncate">Mitra Kantin</span>
          </button>
        </div>
      </div>

      {/* Form Card Container */}
      <div className="w-full bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col gap-4">
        {/* Section: Data Utama (Common to all) */}
        <div className="flex flex-col gap-3">
          <span className="font-display font-bold text-sm text-[#131b2e]">Informasi Kontak</span>

          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#131b2e]">Nama Lengkap</label>
            <div className="bg-[#f2f3ff] rounded-lg px-3 py-2.5 flex items-center border border-[#eaedff]">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Masukkan nama lengkap sesuai KTM/KTP"
                className="bg-transparent w-full text-xs text-[#131b2e] focus:outline-none"
              />
            </div>
          </div>

          {/* WhatsApp Active with +62 badge */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#131b2e]">Nomor WhatsApp Aktif</label>
            <div className="flex items-center gap-2">
              <div className="bg-[#e2e7ff] text-[#131b2e] text-xs font-bold px-3 py-2.5 rounded-lg flex items-center justify-center border border-[#dae2fd]">
                +62
              </div>
              <div className="bg-[#f2f3ff] rounded-lg px-3 py-2.5 flex items-center flex-1 border border-[#eaedff]">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="8xxxxxxxxxx"
                  className="bg-transparent w-full text-xs text-[#131b2e] focus:outline-none font-mono"
                />
              </div>
            </div>
            <p className="text-[11px] text-[#5a4138] flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[15px] text-[#006c49]">check_circle</span>
              <span>Digunakan driver untuk koordinasi antar pesanan</span>
            </p>
          </div>
        </div>

        {/* ROLE 1: DYNAMIC MAHASISWA FIELDS */}
        {role === 'mahasiswa' && (
          <div className="flex flex-col gap-3 pt-1 border-t border-[#eaedff] animate-in fade-in duration-150">
            <span className="font-display font-bold text-sm text-[#131b2e]">Akademik Mahasiswa</span>

            {/* NPM */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#131b2e]">NPM (Nomor Pokok Mahasiswa)</label>
              <div className="bg-[#f2f3ff] rounded-lg px-3 py-2.5 flex items-center border border-[#eaedff]">
                <input
                  type="text"
                  value={npm}
                  onChange={(e) => setNpm(e.target.value)}
                  placeholder="Masukkan NPM 8 digit"
                  className="bg-transparent w-full text-xs text-[#131b2e] focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Jurusan Dropdown */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#131b2e]">Jurusan Kampus</label>
              <div className="bg-[#f2f3ff] rounded-lg px-3 py-2.5 flex items-center justify-between relative border border-[#eaedff]">
                <select
                  value={jurusan}
                  onChange={(e) => setJurusan(e.target.value)}
                  className="bg-transparent w-full text-xs text-[#131b2e] focus:outline-none appearance-none pr-6 cursor-pointer"
                >
                  <option value="ekonomi-bisnis">Ekonomi dan Bisnis</option>
                  <option value="budidaya-tanaman">Budidaya Tanaman Perkebunan</option>
                  <option value="teknologi-pertanian">Teknologi Pertanian</option>
                  <option value="peternakan">Peternakan</option>
                </select>
                <span className="material-symbols-outlined text-[#5a4138] pointer-events-none absolute right-3 text-[18px]">
                  arrow_drop_down
                </span>
              </div>
            </div>

            {/* Program Studi Dropdown */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#131b2e]">Program Studi</label>
              <div className="bg-[#f2f3ff] rounded-lg px-3 py-2.5 flex items-center justify-between relative border border-[#eaedff]">
                <select
                  value={prodi}
                  onChange={(e) => setProdi(e.target.value)}
                  className="bg-transparent w-full text-xs text-[#131b2e] focus:outline-none appearance-none pr-6 cursor-pointer"
                >
                  <option value="d4-mi">D4 Manajemen Informatika</option>
                  <option value="d3-mi">D3 Manajemen Informatika</option>
                  <option value="d4-trpl">D4 Rekayasa Perangkat Lunak</option>
                  <option value="d3-akuntansi">D3 Akuntansi</option>
                </select>
                <span className="material-symbols-outlined text-[#5a4138] pointer-events-none absolute right-3 text-[18px]">
                  arrow_drop_down
                </span>
              </div>
            </div>

            {/* Feature Highlight Card: PoliDriver Toggle */}
            <div className="bg-[#f2f3ff] rounded-xl p-3.5 shadow-xs border border-[#eaedff] flex flex-col gap-2 mt-1">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#6ffbbe] text-[#002113] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">two_wheeler</span>
                  </div>
                  <span className="font-display font-bold text-xs sm:text-sm text-[#131b2e]">
                    Aktifkan Mode PoliDriver
                  </span>
                </div>

                {/* Switch Toggle */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={driverMode}
                  onClick={() => {
                    setDriverMode(!driverMode);
                    onShowToast(
                      !driverMode
                        ? 'Mode PoliDriver Aktif! Kamu terdaftar sebagai pengantar.'
                        : 'Mode PoliDriver dinonaktifkan.'
                    );
                  }}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none flex items-center cursor-pointer shadow-inner relative shrink-0 ${
                    driverMode ? 'bg-[#6cf8bb]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 block ${
                      driverMode ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  ></span>
                </button>
              </div>

              <p className="text-xs text-[#5a4138] leading-relaxed">
                Raih ongkir tambahan dengan mengantar makanan ke gedung kuliah saat waktu luang atau jeda perkuliahan!
              </p>

              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="bg-[#6ffbbe] text-[#002113] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Status: Terdaftar Siap Antar
                </span>
                <span className="text-[#5a4138] text-[11px] font-semibold">
                  Bonus Rp2.500/order
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ROLE 2: DOSEN / TENDIK FIELDS */}
        {role === 'dosen' && (
          <div className="flex flex-col gap-3 pt-1 border-t border-[#eaedff] animate-in fade-in duration-150">
            <span className="font-display font-bold text-sm text-[#131b2e]">
              Kepegawaian Dosen / Tendik
            </span>

            {/* NIP / NIDN */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#131b2e]">NIP / NIDN</label>
              <div className="bg-[#f2f3ff] rounded-lg px-3 py-2.5 flex items-center border border-[#eaedff]">
                <input
                  type="text"
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  placeholder="Nomor Induk Pegawai"
                  className="bg-transparent w-full text-xs text-[#131b2e] focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Unit Kerja Dropdown */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#131b2e]">
                Unit Kerja / Gedung Fakultas
              </label>
              <div className="bg-[#f2f3ff] rounded-lg px-3 py-2.5 flex items-center justify-between relative border border-[#eaedff]">
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="bg-transparent w-full text-xs text-[#131b2e] focus:outline-none appearance-none pr-6 cursor-pointer"
                >
                  <option value="gedung-rektorat">Gedung Direktorat / Rektorat</option>
                  <option value="gedung-qb">Gedung QB (Teknologi Informasi)</option>
                  <option value="gedung-sakura">Gedung Sakura (Hortikultura)</option>
                  <option value="lab-terpadu">Laboratorium Terpadu Polinela</option>
                </select>
                <span className="material-symbols-outlined text-[#5a4138] pointer-events-none absolute right-3 text-[18px]">
                  arrow_drop_down
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ROLE 3: MITRA KANTIN FIELDS */}
        {role === 'kantin' && (
          <div className="flex flex-col gap-3 pt-1 border-t border-[#eaedff] animate-in fade-in duration-150">
            <span className="font-display font-bold text-sm text-[#131b2e]">
              Informasi Stan & Operasional
            </span>

            {/* Nama Stan */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#131b2e]">Nama Stan / Warung</label>
              <div className="bg-[#f2f3ff] rounded-lg px-3 py-2.5 flex items-center border border-[#eaedff]">
                <input
                  type="text"
                  value={stanName}
                  onChange={(e) => setStanName(e.target.value)}
                  placeholder="Contoh: Kedai Pojok Barokah"
                  className="bg-transparent w-full text-xs text-[#131b2e] focus:outline-none"
                />
              </div>
            </div>

            {/* Jam Operasional */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#131b2e]">Jam Operasional Stan</label>
              <div className="bg-[#f2f3ff] rounded-lg px-3 py-2.5 flex items-center border border-[#eaedff]">
                <input
                  type="text"
                  value={jamOperasional}
                  onChange={(e) => setJamOperasional(e.target.value)}
                  placeholder="Contoh: 08:00 - 16:30 WIB"
                  className="bg-transparent w-full text-xs text-[#131b2e] focus:outline-none"
                />
              </div>
            </div>

            {/* Alamat Manual Text */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#131b2e]">
                Alamat / Titik Stan (Manual Teks Tanpa Peta)
              </label>
              <div className="bg-[#f2f3ff] rounded-lg px-3 py-2.5 flex items-center border border-[#eaedff]">
                <input
                  type="text"
                  value={lokasiManual}
                  onChange={(e) => setLokasiManual(e.target.value)}
                  placeholder="Tuliskan gedung, lorong, nomor stan tanpa maps"
                  className="bg-transparent w-full text-xs text-[#131b2e] focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-[#5a4138]">
                Panduan teks akurat memudahkan penjemputan oleh kurir mahasiswa.
              </p>
            </div>

            {/* Upload QRIS Statis */}
            <div className="flex flex-col gap-1 mt-1">
              <label className="text-xs font-semibold text-[#131b2e]">
                Upload QRIS Pembayaran Statis
              </label>
              <div 
                onClick={() => onShowToast('Silakan pilih file QRIS toko Anda.')}
                className="bg-[#e2e7ff] rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer shadow-xs hover:bg-[#dae2fd] transition-colors border border-[#dae2fd]"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#a33900] mb-2 shadow-xs">
                  <span className="material-symbols-outlined text-[24px]">qr_code_scanner</span>
                </div>
                <span className="text-xs font-bold text-[#a33900]">
                  Unggah Gambar QRIS Bank/E-Wallet
                </span>
                <span className="text-[11px] text-[#5a4138] mt-0.5">
                  Mendukung format JPG, PNG, atau PDF jernih
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Role Preview Collapsible Details (Educational Helper) */}
      <div className="w-full bg-[#eaedff] rounded-xl p-4 shadow-xs border border-[#dae2fd] flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-[#131b2e]">
          <span className="material-symbols-outlined text-[20px] text-[#a33900]">info</span>
          <span className="text-xs font-bold">Tentang Akun Terintegrasi Polinela</span>
        </div>
        <p className="text-xs text-[#5a4138] leading-relaxed">
          Setiap akun civitas otomatis terdaftar pada sistem validasi lokal gedung Polinela guna memastikan keamanan pesanan pangan langsung ke ruang kuliah atau lab tanpa GPS.
        </p>
      </div>

      {/* Bottom Confirmation Action Buffer */}
      <div className="w-full mt-2">
        <button
          type="button"
          disabled={isSaving}
          onClick={handleSave}
          className="w-full h-12 bg-[#a33900] hover:bg-[#cc4900] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[18px]">
                progress_activity
              </span>
              <span>Menyimpan Biodata...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Simpan & Lanjutkan ke Beranda</span>
            </>
          )}
        </button>
        <p className="text-[11px] text-center text-[#5a4138] mt-2">
          Data Anda terlindungi oleh Pusat Sistem Informasi Polinela
        </p>
      </div>
    </div>
  );
};
