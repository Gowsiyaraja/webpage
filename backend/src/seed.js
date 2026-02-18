const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('❌ MONGO_URI not set');
  process.exit(1);
}

async function seed() {
  let exitCode = 0;
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'gowsiyaraja@gmail.com',
      passwordHash: await bcrypt.hash('password123', 10),
      role: 'admin',
      phone: '9942254017'
    });
    console.log('👤 Created admin user');

    // Create sample customer
    const customer = await User.create({
      name: 'Jane Doe',
      email: 'customer@blossom.test',
      passwordHash: await bcrypt.hash('password123', 10),
      role: 'customer',
      phone: '9876543210',
      addresses: [{
        label: 'Home',
        line1: '123 Beauty Lane',
        city: 'Mumbai',
        state: 'Maharashtra',
        postal: '400001',
        country: 'India',
        default: true
      }]
    });
    console.log('👤 Created sample customer');

    // Create sample products - diverse categories like blossombeautty.com
    const products = await Product.insertMany([
      // Face Care
      {
        title: 'Bridal Facewash',
        description: 'Premium face wash for bridal glow and radiance.',
        price: 700,
        discountPrice: 599,
        stock: 45,
        category: 'Face Care',
        tags: ['facewash', 'bridal', 'glow'],
        rating: 4.7,
        reviewCount: 145,
        isActive: true
      },
      {
        title: 'BOTOX FACE SERUM',
        description: 'Slow the signs of aging fade lines Tightens open pores, Prevents from fine lines, sagging skin, laugh lines. Natural alternative to Botox fillers which shows drastic results within 2 weeks. Suitable for all ages plumps & hydrates your skin. Adds a immense glow to your face. BOTOX Serum can also use right before your makeup to add a flawless finish and luminous glow.',
        price: 549,
        stock: 150,
        images: ['/botox.png'],
        category: 'Face Care',
        tags: ['serum', 'anti-aging', 'botox', 'glow'],
        rating: 4.8,
        reviewCount: 280,
        isActive: true
      },
      {
        title: 'Face Moisturiser',
        description: 'Lightweight moisturiser for all skin types.',
        price: 450,
        stock: 80,
        category: 'Face Care',
        tags: ['moisturizer', 'hydrating'],
        rating: 4.5,
        reviewCount: 190,
        isActive: true
      },
      {
        title: 'RED BLUSH',
        description: 'Super nourishing: Protects your lips from cold and dry weather and reduces dryness. Sheer pop of color: Blend of pink rose petals gives a natural tint to your lips and cheek. Perfect to glow every season. Can be used on lips, eyes and cheeks. Contains Vitamin E and Jojoba Oil. Gives a natural flush of color. Has a buildable sheen. Long lasting pigment that hydrates the skin add glow and brightens up the look.',
        price: 449,
        stock: 300,
        images: ['/lip.png'],
        category: 'Lip Care',
        tags: ['blush', 'makeup', 'lip', 'tint'],
        rating: 4.6,
        reviewCount: 120,
        isActive: true
      },
      {
        title: 'Anti Acne kit',
        description: 'Complete acne control kit with 3 products.',
        price: 1200,
        stock: 50,
        category: 'Face Care',
        tags: ['acne', 'kit', 'control'],
        rating: 4.4,
        reviewCount: 210,
        isActive: true
      },

      // Hair Care
      {
        title: 'Biotin Hair Growth Serum',
        description: 'Hair growth serum enriched with biotin to boost hair health.',
        price: 1700,
        discountPrice: 1499,
        stock: 25,
        category: 'Hair Care',
        tags: ['serum', 'biotin', 'growth'],
        rating: 4.7,
        reviewCount: 320,
        isActive: true
      },
      {
        title: 'Almond And Bhringraj Hair Oil',
        description: 'Nourish your hair naturally with the goodness of almond and bhringraj. This powerful blend helps reduce hair fall, strengthen roots, and promote healthy growth. Deeply conditions the scalp while adding shine and softness to dull, dry hair. Perfect for regular use to achieve stronger, thicker, and healthier-looking hair.',
        price: 700,
        discountPrice: 599,
        stock: 500,
        images: ['/oil.png'],
        category: 'Hair Care',
        tags: ['oil', 'bhringraj', 'almond', 'hair growth'],
        rating: 4.5,
        reviewCount: 250,
        isActive: true
      },
      {
        title: 'Coconut Hair Oil',
        description: 'Pure coconut oil for deep hair nourishment.',
        price: 600,
        discountPrice: 499,
        stock: 70,
        category: 'Hair Care',
        tags: ['oil', 'coconut', 'nourishing'],
        rating: 4.6,
        reviewCount: 380,
        isActive: true
      },

      // Lip Care
      {
        title: 'Lip & Cheek Tint - RED',
        description: 'Multi-purpose tint for lips and cheeks.',
        price: 600,
        stock: 55,
        category: 'Lip Care',
        tags: ['tint', 'red', 'makeup'],
        rating: 4.4,
        reviewCount: 165,
        isActive: true
      },
      {
        title: 'Lip & Cheek Tint (PINK)',
        description: 'Soft pink tint for natural look.',
        price: 600,
        stock: 55,
        category: 'Lip Care',
        tags: ['tint', 'pink', 'natural'],
        rating: 4.5,
        reviewCount: 180,
        isActive: true
      },
      {
        title: 'Lip & Cheek Tint',
        description: 'Classic multi-use tint for lips and cheeks.',
        price: 600,
        discountPrice: 499,
        stock: 50,
        category: 'Lip Care',
        tags: ['tint', 'versatile'],
        rating: 4.3,
        reviewCount: 140,
        isActive: true
      },
      {
        title: 'Lip Plumping Serum',
        description: 'Serum that plumps lips for fuller appearance.',
        price: 800,
        discountPrice: 699,
        stock: 35,
        category: 'Lip Care',
        tags: ['serum', 'plumping'],
        rating: 4.6,
        reviewCount: 95,
        isActive: true
      },

      // Body Care
      {
        title: 'Body Whitening Cream',
        description: 'Whitening cream for bright and radiant skin.',
        price: 3000,
        discountPrice: 2699,
        stock: 20,
        category: 'Body Care',
        tags: ['whitening', 'cream', 'brightening'],
        rating: 4.3,
        reviewCount: 220,
        isActive: true
      },
      {
        title: 'Body Lotion',
        description: 'Moisturizing lotion for full body care.',
        price: 1200,
        discountPrice: 999,
        stock: 45,
        category: 'Body Care',
        tags: ['lotion', 'moisturizer'],
        rating: 4.5,
        reviewCount: 280,
        isActive: true
      },
      {
        title: 'Body Scrub',
        description: 'Exfoliating body scrub for smooth skin.',
        price: 500,
        discountPrice: 399,
        stock: 55,
        category: 'Body Care',
        tags: ['scrub', 'exfoliate'],
        rating: 4.4,
        reviewCount: 170,
        isActive: true
      },
      // New product added from user input
      {
        title: 'Body Whitening Cream (110g)',
        description: 'Achieve brighter, smoother, and more radiant skin with our body whitening cream. Enriched with nourishing ingredients, it helps reduce dark spots, even out skin tone, and deeply moisturize your skin. Lightweight and fast-absorbing, it leaves your skin soft, glowing, and refreshed all day long.',
        price: 350,
        stock: 150,
        images: ['/bodylotion.png'],
        category: 'Body Care',
        tags: ['whitening', 'cream', '110g'],
        rating: 4.2,
        reviewCount: 24,
        attributes: { size: ['110 g'] },
        isActive: true
      },
      {
        title: 'Shower Gel',
        description: 'Luxurious shower gel with natural fragrances.',
        price: 800,
        discountPrice: 699,
        stock: 0, // Out of stock
        category: 'Body Care',
        tags: ['shower', 'gel', 'fragrance'],
        rating: 4.7,
        reviewCount: 310,
        isActive: true
      },

      // Combo Kits
      {
        title: 'Combo 1 (Body Cream+Body Lotion+Body Scrub)',
        description: 'Complete body care combo kit.',
        price: 3100,
        discountPrice: 2799,
        stock: 15,
        category: 'Combo',
        tags: ['combo', 'body', 'kit'],
        rating: 4.6,
        reviewCount: 102,
        isActive: true
      },
      {
        title: 'Combo 2 (Face wash+Face Serum+Glutathione Day Cream)',
        description: 'Essential daily face care combo.',
        price: 3000,
        discountPrice: 2699,
        stock: 18,
        category: 'Combo',
        tags: ['combo', 'face', 'daily'],
        rating: 4.5,
        reviewCount: 167,
        isActive: true
      },
      {
        title: 'Combo 3(Dtan Cream+Face wash+Lipmetic)',
        description: 'Brightening and beauty combo.',
        price: 1600,
        discountPrice: 1399,
        stock: 25,
        category: 'Combo',
        tags: ['combo', 'brightening'],
        rating: 4.4,
        reviewCount: 89,
        isActive: true
      },
      {
        title: 'Combo 4 (Glow Glam Cream+Face wash+Lipmetic)',
        description: 'Glow and glamour combo set.',
        price: 2100,
        discountPrice: 1899,
        stock: 20,
        category: 'Combo',
        tags: ['combo', 'glow'],
        rating: 4.5,
        reviewCount: 123,
        isActive: true
      },
      {
        title: 'Combo 5(Shower Gel+Body Scrub+Body Lotion)',
        description: 'Complete shower and body care combo.',
        price: 2400,
        discountPrice: 2099,
        stock: 0, // Out of stock
        category: 'Combo',
        tags: ['combo', 'body', 'shower'],
        rating: 4.6,
        reviewCount: 156,
        isActive: true
      },
      {
        title: 'Combo 6(Face Serum+Lip Plumping Serum+Lash Brow Serum)',
        description: 'Premium serum trio combo.',
        price: 2550,
        discountPrice: 2299,
        stock: 12,
        category: 'Combo',
        tags: ['combo', 'serum', 'premium'],
        rating: 4.7,
        reviewCount: 201,
        isActive: true
      },
      {
        title: 'Combo 7(BB Cream+Gold Face wash+Day Cream)',
        description: 'Golden beauty and care combo.',
        price: 1900,
        discountPrice: 1699,
        stock: 22,
        category: 'Combo',
        tags: ['combo', 'bb-cream'],
        rating: 4.4,
        reviewCount: 112,
        isActive: true
      },
      {
        title: 'Combo 8(Face Moisturiser+Sunscreen+Face Scrub)',
        description: 'Daily protection and care combo.',
        price: 1200,
        stock: 35,
        category: 'Combo',
        tags: ['combo', 'sunscreen', 'protection'],
        rating: 4.5,
        reviewCount: 198,
        isActive: true
      },
      {
        title: 'Combo 9(Lipmetic+Face wash+Day Cream)',
        description: 'Essential beauty routine combo.',
        price: 1600,
        stock: 28,
        category: 'Combo',
        tags: ['combo', 'essential'],
        rating: 4.8,
        reviewCount: 245,
        isActive: true
      },
      {
        title: 'Night Care Kit(Face wash+Face Serum+Glow Glam+Scrub+Lipmetic)',
        description: 'Complete nighttime beauty regime.',
        price: 3800,
        discountPrice: 3399,
        stock: 10,
        category: 'Combo',
        tags: ['combo', 'night', 'kit'],
        rating: 4.7,
        reviewCount: 267,
        isActive: true
      },
      {
        title: 'Day Dream Kit(Facewash+Sunscreen+Scrub+BB Cream+Day Cream)',
        description: 'Start your day with a complete skincare routine designed for fresh, glowing skin. This all-in-one kit deeply cleanses, gently exfoliates, and protects your skin from sun damage. The BB cream provides smooth coverage for a natural, even look. Day cream hydrates and nourishes, keeping your skin soft and radiant all day. Perfect for daily use to achieve a bright, healthy, and confident glow.',
        price: 2599,
        discountPrice: 2199,
        stock: 350,
        images: ['/combo.png'],
        category: 'Combo',
        tags: ['combo', 'day', 'kit', 'skincare'],
        rating: 4.6,
        reviewCount: 189,
        isActive: true
      },
      {
        title: 'Blossom Soap',
        description: 'Experience gentle cleansing with a refreshing touch of care. This nourishing soap removes dirt and impurities while keeping your skin soft and hydrated. Enriched with skin-loving ingredients, it helps maintain a smooth and healthy glow. Suitable for daily use on all skin types.',
        price: 300,
        stock: 500,
        images: ['/soap.png', '/soap1.png'],
        category: 'Body Care',
        tags: ['soap', 'body', 'cleansing'],
        rating: 4.5,
        reviewCount: 50,
        isActive: true
      }
    ]);
    console.log(`📦 Created ${products.length} products`);

    // Create sample order
    const orderProducts = [products[0], products[1]];
    const SHIPPING_COST = 50;
    const TAX_RATE = 0.18;

    const orderItems = orderProducts.map((p) => ({
      product: p._id,
      qty: 1,
      price: p.discountPrice ?? p.price,
      discount: 50,
    }));

    const subtotal = orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + tax + SHIPPING_COST;

    const order = await Order.create({
      user: customer._id,
      items: orderItems,
      subtotal,
      tax,
      shippingCost: SHIPPING_COST,
      total,
      shippingAddress: {
        name: 'Jane Doe',
        phone: '9876543210',
        line1: '123 Beauty Lane',
        city: 'Mumbai',
        state: 'Maharashtra',
        postal: '400001',
        country: 'India'
      },
      status: 'delivered',
      paymentStatus: 'completed',
      paymentMethod: 'stripe'
    });
    console.log('📋 Created sample order');

    console.log('\n✨ Seed complete! You can now login with:');
    console.log('  Admin: gowsiyaraja@gmail.com / password123');
    console.log('  Customer: customer@blossom.test / password123');

  } catch (err) {
    console.error('❌ Seed error:', err.message);
    exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log('ℹ️  MongoDB connection closed.');
    process.exit(exitCode);
  }
}

seed();
