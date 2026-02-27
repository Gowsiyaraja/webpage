// server/routes/products.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  await db.read();
  res.json(db.data.products);
});

// Add product (for admin)
router.post('/', async (req, res) => {
  const { name, price } = req.body;
  db.data.products.push({ id: Date.now(), name, price });
  await db.write();
  res.json({ message: 'Product added' });
});

export default router;