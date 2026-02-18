const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET || '');
const Order = require('../models/Order');
const { authMiddleware } = require('../middleware/auth');

// Get user orders
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single order
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create payment intent
router.post('/create-payment-intent', authMiddleware, async (req, res) => {
  try {
    const { items, total } = req.body;
    if (!process.env.STRIPE_SECRET) {
      return res.status(500).json({ message: 'Stripe not configured' });
    }

    const amount = Math.round(total * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
      metadata: { userId: req.user.id }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, shippingAddress, billingAddress, paymentIntentId, total } = req.body;

    const order = await Order.create({
      user: req.user.id,
      items,
      shippingAddress,
      billingAddress,
      paymentIntentId,
      total,
      status: 'pending',
      paymentStatus: 'pending'
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update order status (admin only)
router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
