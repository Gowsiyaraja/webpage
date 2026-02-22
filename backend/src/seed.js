const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  {
    title: "Hydrating Face Serum",
    description: "Deeply hydrating serum with hyaluronic acid for plump, glowing skin.",
    price: 1299,
    discountPrice: 999,
    stock: 50,
    category: "Face Care",
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80"],
    rating: 4.8,
    reviewCount: 124
  },
  {
    title: "Vitamin C Glow Drops",
    description: "Brightening Vitamin C serum to even out skin tone and boost radiance.",
    price: 1499,
    discountPrice: 1199,
    stock: 45,
    category: "Face Care",
    images: ["https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=500&q=80"],
    rating: 4.9,
    reviewCount: 89
  },
  {
    title: "Organic Daily Moisturizer",
    description: "Lightweight, non-greasy moisturizer made with 100% organic ingredients.",
    price: 899,
    discountPrice: 799,
    stock: 100,
    category: "Face Care",
    images: ["https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500&q=80"],
    rating: 4.7,
    reviewCount: 210
  },
  {
    title: "Rose Water Toner",
    description: "Refreshing facial toner to balance pH and tighten pores.",
    price: 599,
    discountPrice: 499,
    stock: 80,
    category: "Face Care",
    images: ["https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500&q=80"],
    rating: 4.6,
    reviewCount: 156
  },
  {
    title: "Lavender Body Wash",
    description: "Soothing body wash infused with calming lavender essential oils.",
    price: 699,
    discountPrice: 549,
    stock: 60,
    category: "Body Care",
    images: ["https://images.unsplash.com/photo-1556228720-1957be83f360?w=500&q=80"],
    rating: 4.8,
    reviewCount: 95
  },
  {
    title: "Shea Butter Hand Cream",
    description: "Ultra-rich hand cream to repair dry, cracked skin.",
    price: 399,
    discountPrice: 299,
    stock: 150,
    category: "Body Care",
    images: ["https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500&q=80"],
    rating: 4.9,
    reviewCount: 312
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');
    await Product.insertMany(products);
    console.log('📦 Added 6 new products');
    process.exit();
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

seedDB();