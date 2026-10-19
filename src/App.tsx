import React, { useState } from 'react';
import { AppTab, OrderItem, MenuItem } from './types';
import { MOCK_MENU_ITEMS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { BerandaView } from './components/BerandaView';
import { DriverView } from './components/DriverView';
import { KantinView } from './components/KantinView';
import { ProfilView } from './components/ProfilView';
import { FoodDetailModal } from './components/FoodDetailModal';
import { CheckoutView } from './components/CheckoutView';
import { AuthModal } from './components/AuthModal';
import { ReceiptModal } from './components/ReceiptModal';
import { LocationPickerModal } from './components/LocationPickerModal';
import { SuperadminView } from './components/SuperadminView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('beranda');
  const [isSuperadmin, setIsSuperadmin] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem>(MOCK_MENU_ITEMS[0]);
  
  const [cartItems, setCartItems] = useState<OrderItem[]>([
    {
      id: 'cart-init-1',
      name: 'Ayam Geprek Sambal Korek',
      price: 15000,
      quantity: 1,
      spiceLevel: 'Pedas Polinela (Cabai 7)',
    },
    {
      id: 'cart-init-2',
      name: 'Es Teh Manis Jumbo',
      price: 4000,
      quantity: 1,
    },
  ]);

  const [currentBuilding, setCurrentBuilding] = useState('Gedung Sakura (Jur. Pertanian)');
  const [currentRoom, setCurrentRoom] = useState('Lab Proteksi Tanaman Lt. 2');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleOpenDish = (dish: MenuItem) => {
    setSelectedDish(dish);
    setIsDishModalOpen(true);
  };

  const handleAddToCart = (item: OrderItem) => {
    setCartItems((prev) => [item, ...prev]);
    setIsDishModalOpen(false);
    showToast(`${item.name} dimasukkan ke keranjang!`);
  };

  const handleInstantCheckout = (item: OrderItem) => {
    setCartItems([item]);
    setIsDishModalOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (orderData: any) => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    showToast('Pesanan berhasil dibuat & masuk antrean Mbak Sri!');
    // Switch to driver or kantin to see the new task!
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 bg-[#283044] text-[#eef0ff] px-4 py-2.5 rounded-xl text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200 border border-white/10">
          <span className="material-symbols-outlined text-[18px] text-[#6cf8bb]">check_circle</span>
          <span>{toastMessage}</span>
          <button 
            type="button" 
            onClick={() => setToastMessage(null)} 
            className="ml-2 text-white/70 hover:text-white"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Screen Routing */}
      {isSuperadmin ? (
        <SuperadminView
          onBackToApp={() => setIsSuperadmin(false)}
          onShowToast={showToast}
          onShowReceiptModal={() => setIsReceiptModalOpen(true)}
        />
      ) : isCheckoutOpen ? (
        <CheckoutView
          items={cartItems}
          onBack={() => setIsCheckoutOpen(false)}
          onOrderSuccess={handleOrderSuccess}
          onShowToast={showToast}
        />
      ) : (
        <>
          {/* Main Mobile App Header */}
          <Header
            currentTab={currentTab}
            onOpenAuth={() => setIsAuthOpen(true)}
            onOpenSuperadmin={() => setIsSuperadmin(true)}
            isSuperadmin={isSuperadmin}
            onTabChange={(t) => setCurrentTab(t)}
            cartCount={cartItems.length}
            onOpenCheckout={() => setIsCheckoutOpen(true)}
          />

          {/* Main Body */}
          <main className="flex-1 pt-16">
            {currentTab === 'beranda' && (
              <BerandaView
                onOpenDishModal={handleOpenDish}
                onOpenLocationPicker={() => setIsLocationPickerOpen(true)}
                currentBuilding={currentBuilding}
                currentRoom={currentRoom}
                onShowToast={showToast}
              />
            )}

            {currentTab === 'driver' && (
              <DriverView onShowToast={showToast} />
            )}

            {currentTab === 'kantin' && (
              <KantinView
                onShowReceiptModal={() => setIsReceiptModalOpen(true)}
                onShowToast={showToast}
              />
            )}

            {currentTab === 'profil' && (
              <ProfilView
                onShowToast={showToast}
                onSaveAndGoHome={() => setCurrentTab('beranda')}
              />
            )}
          </main>

          {/* Bottom Navigation */}
          <BottomNav
            currentTab={currentTab}
            onTabChange={(t) => setCurrentTab(t)}
            activeDriverTasksCount={1}
            pendingCanteenOrdersCount={3}
          />
        </>
      )}

      {/* Food Detail Modal / Bottom Sheet (Image 1 / HTML 1) */}
      <FoodDetailModal
        isOpen={isDishModalOpen}
        onClose={() => setIsDishModalOpen(false)}
        onAddToCart={handleAddToCart}
        onInstantCheckout={handleInstantCheckout}
      />

      {/* Auth Screen Modal (Image 3 / HTML 2) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(id) => {
          showToast(`Berhasil masuk sebagai ${id}!`);
        }}
      />

      {/* Full QRIS Transfer Receipt Modal (Image 9 / HTML 5) */}
      <ReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        onVerifyAndCook={() => {
          showToast('Pesanan #PF-8824 diverifikasi! Segera dimasak di dapur.');
        }}
      />

      {/* Campus Location Picker Modal */}
      <LocationPickerModal
        isOpen={isLocationPickerOpen}
        onClose={() => setIsLocationPickerOpen(false)}
        currentBuilding={currentBuilding}
        currentRoom={currentRoom}
        onSelectLocation={(b, r) => {
          setCurrentBuilding(b);
          setCurrentRoom(r);
          showToast(`Lokasi antar diubah ke ${b}!`);
        }}
      />
    </div>
  );
}
