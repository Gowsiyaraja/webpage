// server/routes/orders.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// Place a new order
router.post('/', async (req, res) => {
  const { customerName, products } = req.body;
  db.data.orders.push({ id: Date.now(), customerName, products, status: 'Pending' });
  await db.write();
  res.json({ message: 'Order placed successfully' });
});

export default router; 
// server/routes/admin.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  await db.read();
  if (username === db.data.admin.username && password === db.data.admin.password) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Get all orders
router.get('/orders', async (req, res) => {
  await db.read();
  res.json(db.data.orders);
});

export default router;