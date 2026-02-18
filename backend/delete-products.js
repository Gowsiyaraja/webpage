const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/blossom';

const userProducts = [
  'Almond And Bhringraj Hair Oil',
  'Blossom Soap',
  'Day Dream Kit(Facewash+Sunscreen+Scrub+BB Cream+Day Cream)',
  'body whitening cream',
  'Red blush',
  'botox face serum'
];

async function deleteProducts() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const Product = require('./src/models/Product');
    
    // Delete all products except the user's 6 products
    const result = await Product.deleteMany({ 
      title: { $nin: userProducts }
    });
    
    console.log(`Deleted ${result.deletedCount} products`);
    
    // Show remaining products
    const remaining = await Product.find({}, 'title price');
    console.log('\nRemaining products:');
    remaining.forEach(p => console.log(`- ${p.title}: ₹${p.price}`));
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

deleteProducts();
