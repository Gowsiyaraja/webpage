const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { db } = require('./config/firebase');

dotenv.config();

const app = express();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');

app.use(cors({
  origin: [
    'http://localhost:5173',                    // Local development
    'https://webpage-omega.vercel.app',         // Your first Vercel link
    'https://24mit017gowsiyablossom.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok', name: 'Blossom Backend' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;

// Test Firebase connection
db.collection('test').doc('connection').set({ status: 'ok', timestamp: new Date() })
  .then(() => {
    console.log('✅ Firebase connection successful');
    app.listen(PORT, () => {
      console.log(`✅ Blossom Backend running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Firebase connection error:', err.message);
    process.exit(1);
  });

module.exports = app;
