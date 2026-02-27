const { db } = require('../config/firebase');

class Product {
  constructor(data) {
    this.title = data.title;
    this.description = data.description;
    this.price = data.price;
    this.discountPrice = data.discountPrice;
    this.stock = data.stock || 0;
    this.images = data.images || [];
    this.category = data.category;
    this.tags = data.tags || [];
    this.rating = data.rating || 0;
    this.reviewCount = data.reviewCount || 0;
    this.sku = data.sku;
    this.attributes = data.attributes || {};
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.createdBy = data.createdBy;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  static async create(data) {
    const product = new Product(data);
    const docRef = await db.collection('products').add({
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { id: docRef.id, ...product };
  }

  static async find(filter = {}) {
    let query = db.collection('products');

    if (filter.isActive !== undefined) {
      query = query.where('isActive', '==', filter.isActive);
    }

    if (filter.title) {
      query = query.where('title', '>=', filter.title).where('title', '<=', filter.title + '\uf8ff');
    }

    if (filter.category) {
      query = query.where('category', '==', filter.category);
    }

    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async findById(id) {
    const doc = await db.collection('products').doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  static async findByIdAndUpdate(id, data, options = {}) {
    const updateData = {
      ...data,
      updatedAt: new Date()
    };
    await db.collection('products').doc(id).update(updateData);
    const updatedDoc = await db.collection('products').doc(id).get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
  }

  static async findByIdAndDelete(id) {
    await db.collection('products').doc(id).delete();
    return { message: 'Product deleted' };
  }

  static async countDocuments(filter = {}) {
    let query = db.collection('products');

    if (filter.isActive !== undefined) {
      query = query.where('isActive', '==', filter.isActive);
    }

    if (filter.title) {
      query = query.where('title', '>=', filter.title).where('title', '<=', filter.title + '\uf8ff');
    }

    if (filter.category) {
      query = query.where('category', '==', filter.category);
    }

    const snapshot = await query.get();
    return snapshot.size;
  }
}

module.exports = Product;
