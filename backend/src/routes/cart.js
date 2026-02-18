const router = require('express').Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { authMiddleware } = require('../middleware/auth');

// Get user's cart
router.get('/', authMiddleware, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id })
      .populate('items.product', 'title images price discountPrice stock category');
    
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }
    
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add item to cart
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (product.stock < qty) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    
    let cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }
    
    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );
    
    if (existingItemIndex > -1) {
      // Update quantity
      const newQty = cart.items[existingItemIndex].qty + qty;
      if (newQty > product.stock) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
      cart.items[existingItemIndex].qty = newQty;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        qty,
        price: product.price,
        discountPrice: product.discountPrice
      });
    }
    
    await cart.save();
    
    // Populate product details
    cart = await Cart.findById(cart._id)
      .populate('items.product', 'title images price discountPrice stock category');
    
    res.json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update item quantity
router.put('/update/:productId', authMiddleware, async (req, res) => {
  try {
    const { qty } = req.body;
    const { productId } = req.params;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (qty > product.stock) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    if (qty <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].qty = qty;
    }
    
    await cart.save();
    
    // Populate product details
    const updatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'title images price discountPrice stock category');
    
    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Remove item from cart
router.delete('/remove/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );
    
    await cart.save();
    
    // Populate product details
    const updatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'title images price discountPrice stock category');
    
    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Clear cart
router.delete('/clear', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    
    res.json({ message: 'Cart cleared', cart: cart || { items: [], subtotal: 0 } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
