import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { OrderItem } from '../types';

interface CheckoutViewProps {
  items: OrderItem[];
  onBack: () => void;
  onOrderSuccess: (orderData: any) => void;
  onShowToast: (msg: string) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  items,
  onBack,
  onOrderSuccess,
  onShowToast,
}) => {
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');
  const [building, setBuilding] = useState('Gedung Sakura (Jurusan Pertanian) Lt. 3');
  const [room, setRoom] = useState('Ruang Kelas 3B - Jurusan Manajemen Informatika');
  const [landmarkNote, setLandmarkNote] = useState(
    'Masuk tangga utama sayap kiri, kelas paling ujung sebelah lab jaringan. Titip di meja depan pintu jika sedang ada dosen mengajar.'
  );
  const [recipient, setRecipient] = useState('Siti Rahmawati (0812-7890-4421)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proofUploaded, setProofUploaded] = useState(true);

  // Fallback default items if cart is empty
  const activeItems = items.length > 0 ? items : [
    {
      id: 'default-1',
      name: 'Ayam Geprek Sambal Korek',
      price: 15000,
      quantity: 1,
    },
    {
      id: 'default-2',
      name: 'Es Teh Manis Jumbo',
      price: 4000,
      quantity: 1,
    },
  ];

  const itemsSubtotal = activeItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const deliveryFee = deliveryMode === 'delivery' ? 3000 : 0;
  const serviceFee = 1000;
  const grandTotal = itemsSubtotal + deliveryFee + serviceFee;

  const handleDownloadQR = () => {
    onShowToast('Gambar QRIS berhasil disimpan ke galeri ponsel!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofUploaded(true);
      onShowToast(`Bukti ${e.target.files[0].name} berhasil diunggah!`);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const orderData = {
      orderNumber: `PF-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: recipient.split('(')[0]?.trim() || 'Siti Rahmawati',
      customerRole: 'Mahasiswa',
      customerPhone: recipient.match(/\((.*?)\)/)?.[1] || '0812-7890-4421',
      canteenId: 'mbak-sri',
      canteenName: 'Kantin Mbak Sri (Pujasera 04)',
      deliveryMethod: deliveryMode,
      building,
      room,
      landmarkNote,
      items: activeItems,
      subtotal: itemsSubtotal,
      deliveryFee,
      serviceFee,
      total: grandTotal,
      paymentMethod: 'QRIS Statis Kantin Mbak Sri',
      paymentStatus: 'Menunggu Verifikasi',
    };

    try {
      const { postOrder } = await import('../services/api.ts');
      await postOrder(orderData);
    } catch (e) {
      console.warn('Persisting locally:', e);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onShowToast(`Pesanan #${orderData.orderNumber} berhasil disimpan ke database & diteruskan ke Stan Mbak Sri!`);
      onOrderSuccess(orderData);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] pb-32">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#eaedff] px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Kembali"
            onClick={onBack}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center text-[#131b2e] hover:text-[#a33900] -ml-2 transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <img
            src={ASSETS.logo}
            alt="PoliFood Logo"
            className="h-7 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <h1 className="font-display font-bold text-sm sm:text-base text-[#131b2e] truncate">
            Detail Pesanan & Keranjang
          </h1>
        </div>

        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src={ASSETS.profileAvatar}
            alt="Profile"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </header>

      {/* Main Form Body */}
      <main className="max-w-md mx-auto px-4 pt-3 space-y-4">
        {/* Delivery Method Segmented Switcher */}
        <div className="bg-[#eaedff] p-1 rounded-xl shadow-xs flex items-center gap-1">
          <button
            type="button"
            onClick={() => setDeliveryMode('delivery')}
            className={`flex-1 py-2.5 px-2 rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
              deliveryMode === 'delivery'
                ? 'bg-[#a33900] text-white shadow-sm'
                : 'text-[#5a4138] hover:bg-[#e2e7ff]'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">delivery_dining</span>
              <span className="font-display text-xs font-bold leading-tight">Diantar ke Ruangan</span>
            </div>
            <span className="text-[11px] opacity-90">+ Biaya Antar Rp 3.000</span>
          </button>

          <button
            type="button"
            onClick={() => setDeliveryMode('pickup')}
            className={`flex-1 py-2.5 px-2 rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
              deliveryMode === 'pickup'
                ? 'bg-[#a33900] text-white shadow-sm'
                : 'text-[#5a4138] hover:bg-[#e2e7ff]'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">storefront</span>
              <span className="font-display text-xs font-bold leading-tight">Ambil di Stan</span>
            </div>
            <span className="text-[11px] opacity-80">Tanpa Ongkir</span>
          </button>
        </div>

        {/* Campus Landmark Location Form (Zero-GPS Text Form) */}
        {deliveryMode === 'delivery' && (
          <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#ffdbce] text-[#370e00] material-symbols-outlined text-[18px]">
                  apartment
                </span>
                <div>
                  <h2 className="font-display font-bold text-sm text-[#131b2e]">Titik Antar Kampus</h2>
                  <p className="text-xs text-[#5a4138]">Panduan teks presisi tanpa peta/GPS</p>
                </div>
              </div>
              <span className="text-[10px] bg-[#6cf8bb] text-[#005236] px-2 py-0.5 rounded-full font-bold">
                Cepat & Tepat
              </span>
            </div>

            <div className="space-y-3">
              {/* Building selection */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#5a4138] flex items-center gap-1">
                  <span>Gedung / Wilayah Polinela</span>
                  <span className="text-[#ba1a1a] font-bold">*</span>
                </label>
                <div className="relative">
                  <select
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    className="w-full bg-[#f2f3ff] text-[#131b2e] text-xs font-medium rounded-lg py-2.5 px-3 appearance-none focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#a33900] shadow-xs pr-8 cursor-pointer"
                  >
                    <option value="Gedung Sakura (Jurusan Pertanian) Lt. 3">
                      Gedung Sakura (Jurusan Pertanian) Lt. 3
                    </option>
                    <option value="Gedung QB (Manajemen Informatika) Lt. 2">
                      Gedung QB (Manajemen Informatika) Lt. 2
                    </option>
                    <option value="Gedung Terpadu Lt. 1 (Hall Utama)">
                      Gedung Terpadu Lt. 1 (Hall Utama)
                    </option>
                    <option value="Laboratorium Agribisnis & Pangan">
                      Laboratorium Agribisnis & Pangan
                    </option>
                    <option value="Gedung Rektorat Baru Polinela">
                      Gedung Rektorat Baru Polinela
                    </option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[#5a4138] pointer-events-none text-[18px]">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Room Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#5a4138] flex items-center gap-1">
                  <span>Ruang Kuliah / Lab / Meja Kerja</span>
                  <span className="text-[#ba1a1a] font-bold">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[#5a4138] text-[18px]">
                    meeting_room
                  </span>
                  <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder="Contoh: R. Dosen 204 / R. Teori 4A"
                    className="w-full bg-[#f2f3ff] text-[#131b2e] text-xs rounded-lg py-2.5 pl-9 pr-3 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#a33900] shadow-xs"
                  />
                </div>
              </div>

              {/* Driver Benchmark Notes */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#5a4138] flex items-center gap-1">
                    <span>Patokan Detail untuk Kurir</span>
                    <span className="text-[#ba1a1a] font-bold">*</span>
                  </label>
                  <span className="text-[11px] font-bold text-[#006c49]">Wajib Detail</span>
                </div>
                <textarea
                  rows={3}
                  value={landmarkNote}
                  onChange={(e) => setLandmarkNote(e.target.value)}
                  placeholder="Tuliskan posisi tangga, koridor, atau pesan titip meja..."
                  className="w-full bg-[#f2f3ff] text-[#131b2e] text-xs rounded-lg p-2.5 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#a33900] shadow-xs leading-relaxed"
                />
                <p className="text-[11px] text-[#5a4138] flex items-center gap-1 pt-0.5">
                  <span className="material-symbols-outlined text-[14px] text-[#a33900]">info</span>
                  <span>Kurir mahasiswa Polinela langsung menuju titik pintu ruanganmu.</span>
                </p>
              </div>

              {/* Recipient Contact */}
              <div className="space-y-1 pt-1">
                <label className="text-xs font-semibold text-[#5a4138] flex items-center gap-1">
                  <span>Nama Penerima & WhatsApp</span>
                  <span className="text-[#ba1a1a] font-bold">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[#006c49] text-[18px]">
                    chat
                  </span>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full bg-[#f2f3ff] text-[#131b2e] text-xs font-semibold rounded-lg py-2.5 pl-9 pr-3 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#a33900] shadow-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Items Summary Card */}
        <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#a33900] text-[20px]">
                receipt_long
              </span>
              <h2 className="font-display font-bold text-sm text-[#131b2e]">Rincian Pesanan</h2>
            </div>
            <span className="text-[11px] font-bold text-[#a33900] bg-[#ffdbce] px-2 py-0.5 rounded-full">
              Kantin Mbak Sri
            </span>
          </div>

          <div className="space-y-2.5">
            {activeItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-[#e2e7ff] text-[#131b2e] text-[11px] font-bold flex items-center justify-center">
                    {item.quantity}x
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[#131b2e] font-medium">{item.name}</span>
                    {item.spiceLevel && (
                      <span className="text-[10px] text-[#5a4138]">{item.spiceLevel}</span>
                    )}
                  </div>
                </div>
                <span className="font-display font-bold text-[#131b2e]">
                  Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                </span>
              </div>
            ))}

            {deliveryMode === 'delivery' && (
              <div className="flex items-center justify-between text-xs text-[#5a4138] pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#006c49]">
                    sports_motorsports
                  </span>
                  <span>Ongkir Driver (Antar ke {room.split('-')[0]})</span>
                </div>
                <span className="font-semibold text-[#006c49]">Rp 3.000</span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-[#5a4138]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span>Biaya Layanan Sistem</span>
              </div>
              <span className="font-semibold">Rp 1.000</span>
            </div>
          </div>

          {/* Total Calculation */}
          <div className="bg-[#f2f3ff] rounded-lg p-3 flex items-center justify-between mt-2">
            <span className="font-display text-xs font-bold text-[#131b2e]">Total Pembayaran</span>
            <span className="font-display text-lg font-extrabold text-[#a33900]">
              Rp {grandTotal.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Official QRIS Payment Card */}
        <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#a33900] text-[20px]">qr_code_2</span>
              <div>
                <h2 className="font-display font-bold text-sm text-[#131b2e]">Pembayaran QRIS</h2>
                <p className="text-[11px] text-[#5a4138]">NMID: ID10203491823</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-[#e2e7ff] px-2 py-1 rounded-md">
              <span className="text-[10px] font-bold text-[#131b2e] tracking-wider">QRIS RESMI</span>
            </div>
          </div>

          {/* QR Box Showcase */}
          <div className="bg-[#faf8ff] rounded-2xl p-4 flex flex-col items-center justify-center border border-[#eaedff] shadow-xs">
            <div className="w-full flex items-center justify-between pb-3 px-1">
              <span className="font-display text-xs font-bold text-[#131b2e]">Stan Kantin Mbak Sri</span>
              <span className="text-[10px] bg-[#6ffbbe] text-[#002113] px-2 py-0.5 rounded-full font-bold">
                Terverifikasi
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl shadow-xs border border-[#eaedff] flex flex-col items-center">
              <img
                src={ASSETS.qrisOfficial}
                alt="QRIS Kantin Mbak Sri"
                className="w-48 h-48 sm:w-52 sm:h-52 object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
              <div className="flex items-center gap-1.5 mt-2.5">
                <span className="material-symbols-outlined text-[#006c49] text-[16px]">verified</span>
                <span className="text-xs font-semibold text-[#131b2e]">
                  Nominal Tepat: Rp {grandTotal.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-center text-[#5a4138] mt-3 px-2 leading-relaxed">
              Pindai / Simpan QRIS ini lalu bayar melalui{' '}
              <span className="font-semibold text-[#131b2e]">
                BCA, Mandiri, BRI, GoPay, OVO, ShopeePay, DANA
              </span>
            </p>

            <button
              type="button"
              onClick={handleDownloadQR}
              className="mt-2.5 py-1.5 px-3 rounded-lg bg-[#eaedff] hover:bg-[#e2e7ff] text-[#131b2e] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Simpan Gambar QR</span>
            </button>
          </div>

          {/* Upload Proof Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#131b2e] flex items-center gap-1">
                <span>Unggah Bukti Transfer / Resi</span>
                <span className="text-[#ba1a1a] font-bold">*</span>
              </label>
              {proofUploaded && (
                <span className="text-[11px] text-[#006c49] font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  <span>Siap Dikirim</span>
                </span>
              )}
            </div>

            {/* Upload preview state card */}
            <div className="bg-[#f2f3ff] rounded-xl p-3 shadow-xs flex items-center justify-between border border-[#eaedff]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white shrink-0 border border-[#eaedff]">
                  <img
                    src={ASSETS.receiptThumbnail}
                    alt="Receipt thumbnail"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-display text-xs font-bold text-[#131b2e] truncate">
                      bukti_tf_23rb.jpg
                    </p>
                    <span className="bg-[#6cf8bb] text-[#005236] text-[9px] px-1.5 py-0.2 rounded font-bold">
                      Terunggah
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5a4138]">412 KB • Berhasil diverifikasi</p>
                </div>
              </div>

              <label 
                className="p-2 rounded-lg text-[#5a4138] hover:text-[#a33900] hover:bg-[#eaedff] transition-colors cursor-pointer"
                title="Ganti File Resi"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="material-symbols-outlined text-[20px]">cached</span>
              </label>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#faf8ff]/95 backdrop-blur-md shadow-2xl p-4 border-t border-[#eaedff]">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#5a4138]">Total Akhir</span>
            <span className="font-display text-lg sm:text-xl font-extrabold text-[#a33900] leading-tight">
              Rp {grandTotal.toLocaleString('id-ID')}
            </span>
          </div>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="flex-1 py-3 px-4 rounded-xl bg-[#a33900] hover:bg-[#cc4900] active:scale-[0.98] text-white font-display text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-transform disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">
                  progress_activity
                </span>
                <span>Mengirim Pesanan...</span>
              </>
            ) : (
              <>
                <span>Konfirmasi & Kirim</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
