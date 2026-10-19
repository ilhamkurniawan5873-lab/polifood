import { Canteen, MenuItem, Order, CampusBuilding } from '../types';
import { MOCK_CANTEENS, MOCK_MENU_ITEMS, MOCK_CAMPUS_BUILDINGS } from '../data/mockData';

export async function getCanteens(): Promise<Canteen[]> {
  try {
    const res = await fetch('/api/canteens');
    if (!res.ok) throw new Error('Failed to fetch from API');
    const data = await res.json();
    return data && data.length > 0 ? data : MOCK_CANTEENS;
  } catch (error) {
    console.warn('Using local fallback for canteens:', error);
    return MOCK_CANTEENS;
  }
}

export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const res = await fetch('/api/menu-items');
    if (!res.ok) throw new Error('Failed to fetch from API');
    const data = await res.json();
    return data && data.length > 0 ? data : MOCK_MENU_ITEMS;
  } catch (error) {
    console.warn('Using local fallback for menu items:', error);
    return MOCK_MENU_ITEMS;
  }
}

export async function setMenuItemAvailability(id: string, isAvailable: boolean) {
  try {
    const res = await fetch(`/api/menu-items/${id}/availability`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isAvailable }),
    });
    if (!res.ok) throw new Error('Failed to update availability');
    return await res.json();
  } catch (error) {
    console.warn('Failed to update via API:', error);
  }
}

export async function getOrders(): Promise<any[]> {
  try {
    const res = await fetch('/api/orders');
    if (!res.ok) throw new Error('Failed to fetch from API');
    return await res.json();
  } catch (error) {
    console.warn('Using fallback orders:', error);
    return [];
  }
}

export async function postOrder(orderData: any) {
  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) throw new Error('Failed to create order');
    return await res.json();
  } catch (error) {
    console.warn('Failed to save to Cloud SQL API:', error);
    return null;
  }
}

export async function setOrderStatus(orderNumber: string, status: string, driverName?: string) {
  try {
    const res = await fetch(`/api/orders/${orderNumber}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, driverName }),
    });
    if (!res.ok) throw new Error('Failed to update order status');
    return await res.json();
  } catch (error) {
    console.warn('Failed to update status via API:', error);
  }
}

export async function getCampusBuildings(): Promise<CampusBuilding[]> {
  try {
    const res = await fetch('/api/buildings');
    if (!res.ok) throw new Error('Failed to fetch from API');
    const data = await res.json();
    return data && data.length > 0 ? data : MOCK_CAMPUS_BUILDINGS;
  } catch (error) {
    console.warn('Using local fallback for buildings:', error);
    return MOCK_CAMPUS_BUILDINGS;
  }
}

export async function postCampusBuilding(building: CampusBuilding) {
  try {
    const res = await fetch('/api/buildings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(building),
    });
    if (!res.ok) throw new Error('Failed to add building');
    return await res.json();
  } catch (error) {
    console.warn('Failed to add building via API:', error);
  }
}
