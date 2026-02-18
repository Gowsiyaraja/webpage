const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('❌ MONGO_URI not set in .env file');
  process.exit(1);
}

const missingProducts = [
  {
    title: 'body whitening cream',
    description: 'Advanced body whitening cream for radiant, even-toned skin. Formulated with natural ingredients to lighten dark spots and improve skin texture.',
    price: 850,
    discountPrice: 699,
    stock: 200,
    category: 'Body Care',
    tags: ['body', 'whitening', 'cream'],
    rating: 4.4,
    reviewCount: 120,
    images: ['/bodylotion.png'],
    isActive: true
  },
  {
    title: 'Red blush',
    description: 'Long-lasting red blush that gives your cheeks a natural, healthy glow. Smooth texture that blends easily for a flawless finish.',
    price: 450,
    discountPrice: 399,
    stock: 300,
    category: 'Lip Care',
    tags: ['blush', 'makeup', 'red'],
    rating: 4.3,
    reviewCount: 85,
    images: ['/lip.png'],
    isActive: true
  },
  {
    title: 'botox face serum',
    description: 'Anti-aging botox face serum that helps reduce fine lines and wrinkles. Enriched with collagen and hyaluronic acid for youthful, glowing skin.',
    price: 1200,
    discountPrice: 999,
    stock: 150,
    category: 'Face Care',
    tags: ['serum', 'anti-aging', 'botox', 'face'],
    rating: 4.7,
    reviewCount: 200,
    images: ['/botox.png'],
    isActive: true
  }
];

async function addProducts() {
  let exitCode = 0;
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Check if products already exist
    const existingProducts = await Product.find({ title: { $in: missingProducts.map(p => p.title) } });
    console.log(`Found ${existingProducts.length} products already in database`);
    
    // Add products that don't exist
    const newProducts = missingProducts.filter(p => 
      !existingProducts.some(ep => ep.title.toLowerCase() === p.title.toLowerCase())
    );
    
    if (newProducts.length > 0) {
      const created = await Product.insertMany(newProducts);
      console.log(`Added ${created.length} new products`);
    } else {
      console.log('All products already exist in database');
    }
    
    // Show all products
    const allProducts = await Product.find({}, 'title price discountPrice stock category');
    console.log('\nAll products in database:');
    allProducts.forEach(p => console.log(`- ${p.title}: ₹${p.price} (${p.discountPrice ? '₹' + p.discountPrice : 'no discount'}), stock: ${p.stock}, category: ${p.category}`));
    console.log(`\nTotal products: ${allProducts.length}`);
    
  } catch (err) {
    console.error('Error:', err.message);
    exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log('ℹ️  MongoDB connection closed.');
    process.exit(exitCode);
  }
}

addProducts();
