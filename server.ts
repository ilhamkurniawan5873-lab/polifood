import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { eq, desc } from 'drizzle-orm';
import { db } from './src/db/index.ts';
import { canteens, menuItems, orders, campusBuildings, users } from './src/db/schema.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// API: Get all canteens
app.get('/api/canteens', async (_req, res) => {
  try {
    const allCanteens = await db.select().from(canteens);
    res.json(allCanteens);
  } catch (error) {
    console.error('Failed to fetch canteens:', error);
    res.status(500).json({ error: 'Failed to fetch canteens from Cloud SQL' });
  }
});

// API: Get all menu items
app.get('/api/menu-items', async (_req, res) => {
  try {
    const allItems = await db.select().from(menuItems);
    res.json(allItems);
  } catch (error) {
    console.error('Failed to fetch menu items:', error);
    res.status(500).json({ error: 'Failed to fetch menu items from Cloud SQL' });
  }
});

// API: Update menu item availability
app.put('/api/menu-items/:id/availability', async (req, res) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;
    const updated = await db
      .update(menuItems)
      .set({ isAvailable: Boolean(isAvailable) })
      .where(eq(menuItems.id, id))
      .returning();
    res.json(updated[0]);
  } catch (error) {
    console.error('Failed to update menu item:', error);
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// API: Get all orders
app.get('/api/orders', async (_req, res) => {
  try {
    const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));
    res.json(allOrders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// API: Create new order
app.post('/api/orders', async (req, res) => {
  try {
    const {
      orderNumber,
      customerName,
      customerRole,
      customerPhone,
      canteenId,
      canteenName,
      deliveryMethod,
      building,
      room,
      landmarkNote,
      items,
      subtotal,
      deliveryFee,
      serviceFee,
      total,
      paymentMethod,
      paymentStatus,
    } = req.body;

    const newOrder = await db
      .insert(orders)
      .values({
        orderNumber: orderNumber || `PF-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: customerName || 'Civitas Polinela',
        customerRole: customerRole || 'Mahasiswa',
        customerPhone: customerPhone || '0812-7890-4421',
        canteenId: canteenId || 'mbak-sri',
        canteenName: canteenName || 'Kantin Mbak Sri',
        deliveryMethod: deliveryMethod || 'delivery',
        building: building || 'Gedung Sakura',
        room: room || 'Ruang Kelas 3B',
        landmarkNote: landmarkNote || 'Titip di meja',
        itemsJson: JSON.stringify(items || []),
        subtotal: subtotal || 19000,
        deliveryFee: deliveryFee !== undefined ? deliveryFee : 3000,
        serviceFee: serviceFee !== undefined ? serviceFee : 1000,
        total: total || 23000,
        paymentMethod: paymentMethod || 'QRIS',
        paymentStatus: paymentStatus || 'Menunggu Verifikasi',
        status: 'verifikasi',
      })
      .returning();

    res.status(201).json(newOrder[0]);
  } catch (error) {
    console.error('Failed to create order:', error);
    res.status(500).json({ error: 'Failed to save order to Cloud SQL' });
  }
});

// API: Update order status
app.put('/api/orders/:orderNumber/status', async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const { status, driverName } = req.body;
    const updateData: any = { status };
    if (driverName) updateData.driverName = driverName;

    const updated = await db
      .update(orders)
      .set(updateData)
      .where(eq(orders.orderNumber, orderNumber))
      .returning();

    res.json(updated[0]);
  } catch (error) {
    console.error('Failed to update order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// API: Campus Buildings
app.get('/api/buildings', async (_req, res) => {
  try {
    const allBuildings = await db.select().from(campusBuildings);
    res.json(allBuildings);
  } catch (error) {
    console.error('Failed to fetch buildings:', error);
    res.status(500).json({ error: 'Failed to fetch buildings' });
  }
});

app.post('/api/buildings', async (req, res) => {
  try {
    const { id, name, faculty, floors, roomsCount, status, detail } = req.body;
    const newBld = await db
      .insert(campusBuildings)
      .values({
        id: id || `b-${Date.now()}`,
        name,
        faculty: faculty || 'Gedung Kampus Polinela',
        floors: floors || 3,
        roomsCount: roomsCount || 12,
        status: status || 'Aktif',
        detail: detail || `${floors} Lantai, ${roomsCount} Ruangan`,
      })
      .returning();
    res.status(201).json(newBld[0]);
  } catch (error) {
    console.error('Failed to add building:', error);
    res.status(500).json({ error: 'Failed to add building' });
  }
});

// In development, mount Vite middleware; in production, serve built files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port} with Cloud SQL connection.`);
  });
}

startServer();
