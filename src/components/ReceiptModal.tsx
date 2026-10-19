import React from 'react';
import { ASSETS } from '../data/mockData';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerifyAndCook?: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  onVerifyAndCook,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#283044]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-2xl flex flex-col gap-3 border border-[#eaedff]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a33900] text-[22px]">
              verified
            </span>
            <span className="font-display font-bold text-base text-[#131b2e]">
              Bukti Transfer QRIS
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eaedff] flex items-center justify-center text-[#131b2e] hover:bg-[#dae2fd] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Receipt Image Display */}
        <div className="bg-[#f2f3ff] rounded-xl p-3 flex flex-col items-center gap-2 border border-[#eaedff]">
          <img
            src={ASSETS.receiptFull}
            alt="Bukti Transfer QRIS Polinela"
            className="w-full h-52 object-contain rounded-lg bg-white p-2 shadow-xs"
            referrerPolicy="no-referrer"
          />
          <div className="w-full flex items-center justify-between text-[#5a4138] text-xs pt-1">
            <span>Pengirim: <strong className="text-[#131b2e]">Rian Saputra</strong></span>
            <span>BCA Mobile • 11:42 WIB</span>
          </div>
        </div>

        {/* Transaction Specifics */}
        <div className="flex flex-col gap-1 pt-1 text-xs">
          <div className="flex justify-between">
            <span className="text-[#5a4138]">Nominal Tertera:</span>
            <span className="font-bold text-[#131b2e]">Rp 38.000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5a4138]">Nomor Referensi:</span>
            <span className="font-mono text-[#131b2e] text-[11px]">TRX-QR-8824-POLI</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 rounded-lg bg-[#eaedff] text-[#131b2e] text-xs font-semibold hover:bg-[#e2e7ff] transition-colors"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={() => {
              if (onVerifyAndCook) onVerifyAndCook();
              onClose();
            }}
            className="py-2.5 rounded-lg bg-[#a33900] text-white text-xs font-bold shadow-xs hover:bg-[#cc4900] transition-colors"
          >
            Acc & Mulai Masak
          </button>
        </div>
      </div>
    </div>
  );
};
