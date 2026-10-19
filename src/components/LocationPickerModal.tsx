import React, { useState } from 'react';

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBuilding: string;
  currentRoom: string;
  onSelectLocation: (building: string, room: string) => void;
}

export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  isOpen,
  onClose,
  currentBuilding,
  currentRoom,
  onSelectLocation,
}) => {
  const [selectedBuilding, setSelectedBuilding] = useState(currentBuilding);
  const [selectedRoom, setSelectedRoom] = useState(currentRoom);

  if (!isOpen) return null;

  const buildings = [
    {
      name: 'Gedung Sakura (Jur. Pertanian)',
      defaultRoom: 'Lab Proteksi Tanaman Lt. 2',
      badge: 'Pertanian & Hortikultura',
    },
    {
      name: 'Gedung QB (Teknologi Informasi)',
      defaultRoom: 'Lab Komputer 2 Lt. 1',
      badge: 'Informatika & TRPL',
    },
    {
      name: 'Gedung Terpadu Polinela',
      defaultRoom: 'Ruang Seminar Utama Lt. 1',
      badge: 'Sentral Kampus',
    },
    {
      name: 'Gedung GSG Polinela',
      defaultRoom: 'Pintu Masuk Barat (Lobby Olahraga)',
      badge: 'Area Acara & Kegiatan',
    },
    {
      name: 'Gedung Direktorat Baru',
      defaultRoom: 'Bagian Administrasi Akademik Lt. 2',
      badge: 'Rektorat & Tendik',
    },
  ];

  const handleSave = () => {
    onSelectLocation(selectedBuilding, selectedRoom);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#283044]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-5 flex flex-col gap-3.5 border border-[#eaedff]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a33900] text-[22px]">apartment</span>
            <h3 className="font-display font-bold text-sm text-[#131b2e]">
              Pilih Lokasi Antar di Polinela
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eaedff] flex items-center justify-center text-[#5a4138] hover:text-[#131b2e]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="text-xs text-[#5a4138]">
          Pesanan diantar langsung oleh mahasiswa Polinela tanpa GPS, cukup tunjukkan gedung dan ruangan Anda.
        </p>

        <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar">
          {buildings.map((b) => (
            <div
              key={b.name}
              onClick={() => {
                setSelectedBuilding(b.name);
                setSelectedRoom(b.defaultRoom);
              }}
              className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start justify-between ${
                selectedBuilding === b.name
                  ? 'bg-[#ffdbce] border-[#ffb599] text-[#370e00] font-semibold'
                  : 'bg-[#faf8ff] border-[#eaedff] text-[#131b2e] hover:bg-[#eaedff]'
              }`}
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-xs">{b.name}</span>
                <span className="text-[11px] opacity-80">{b.defaultRoom}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/80 text-[#a33900] font-bold shrink-0">
                {b.badge}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1 pt-1">
          <label className="text-xs font-semibold text-[#131b2e]">Detail Ruangan / Meja:</label>
          <input
            type="text"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="w-full bg-[#f2f3ff] p-2.5 rounded-lg border border-[#eaedff] text-xs text-[#131b2e] focus:outline-none focus:border-[#a33900]"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#eaedff]">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 rounded-lg bg-[#eaedff] text-[#131b2e] text-xs font-semibold"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="py-2.5 rounded-lg bg-[#a33900] text-white text-xs font-bold shadow-xs hover:bg-[#cc4900]"
          >
            Terapkan Lokasi
          </button>
        </div>
      </div>
    </div>
  );
};
