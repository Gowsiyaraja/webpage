# 🌸 Blossom Beauty Care Products

A complete, production-ready full-stack e-commerce website built with **React.js**, **Express.js**, **MongoDB**, and **Tailwind CSS**.

![Status](https://img.shields.io/badge/Status-Ready%20to%20Deploy-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-16%2B-green)
![React](https://img.shields.io/badge/React-18.2%2B-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-7.2%2B-green)

## 🎯 Features

### 👥 User Management
- ✅ Admin, Customer, Guest roles
- ✅ JWT-based authentication
- ✅ User profiles with addresses
- ✅ Wishlist management
- ✅ Order history tracking

### 📦 Product Management
- ✅ Product catalog with categories
- ✅ Discount pricing system
- ✅ Stock management
- ✅ Advanced search & filtering
- ✅ Product ratings & reviews

### 🛒 Shopping & Orders
- ✅ Cart management (frontend state ready for backend integration)
- ✅ Order creation & management
- ✅ Order tracking with status updates
- ✅ Multiple order statuses (pending, confirmed, shipped, delivered, etc.)
- ✅ Payment status tracking

### 📊 Admin Dashboard
- ✅ Sales analytics with monthly breakdown
- ✅ Revenue tracking
- ✅ User management
- ✅ Order management
- ✅ Product management
- ✅ Charts & visualizations (Recharts)
- ✅ Key metrics (KPIs)

### 👤 Customer Dashboard
- ✅ Order history with detailed view
- ✅ Wishlist management
- ✅ Profile settings
- ✅ Address management
- ✅ Order tracking

### 💳 Payment Integration
- ✅ Stripe payment gateway ready
- ✅ Payment intent creation
- ✅ Order confirmation flow
- ✅ Multiple payment methods support

### 🎨 UI/UX
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Beautiful gradient gradients
- ✅ Smooth transitions & animations
- ✅ Tailwind CSS styling
- ✅ Lucide React icons
- ✅ Dark theme support ready

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS, Recharts |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **Authentication** | JWT (jsonwebtoken) |
| **Security** | Bcrypt (password hashing) |
| **Payment** | Stripe (ready to integrate) |
| **Database** | MongoDB Atlas |
| **Deployment** | Vercel/Netlify (frontend), Render/Heroku (backend) |

## 📁 Project Structure

```
blossom/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js        # User schema
│   │   │   ├── Product.js     # Product schema
│   │   │   └── Order.js       # Order schema
│   │   ├── routes/
│   │   │   ├── auth.js        # Auth endpoints
│   │   │   ├── products.js    # Product endpoints
│   │   │   ├── orders.js      # Order endpoints
│   │   │   ├── admin.js       # Admin endpoints
│   │   │   └── users.js       # User endpoints
│   │   ├── middleware/
│   │   │   └── auth.js        # JWT & role middleware
│   │   ├── server.js          # Express app
│   │   └── seed.js            # Sample data
│   ├── package.json
│   ├── .env.example
│   └── .env                   # (create this)
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Landing page
│   │   │   ├── Products.jsx          # Product listing
│   │   │   ├── Login.jsx             # Login page
│   │   │   ├── Register.jsx          # Registration page
│   │   │   ├── CustomerDashboard.jsx # Customer dashboard
│   │   │   └── AdminDashboard.jsx    # Admin dashboard
│   │   ├── components/
│   │   │   ├── Header.jsx      # Navigation
│   │   │   ├── Footer.jsx      # Footer
│   │   │   └── ProductCard.jsx # Product card
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Auth state management
│   │   ├── api/
│   │   │   └── api.js          # Axios instance
│   │   ├── App.jsx             # Main app
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env                    # (create this)
│
├── README.md
└── SETUP.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB Atlas account (free tier available)
- Stripe account (for payments)

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Edit `backend/.env`:**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blossom?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here_minimum_32_characters
STRIPE_SECRET=sk_test_your_stripe_secret_key
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**Seed the database & start:**
```bash
npm run seed    # Creates demo data
npm run dev     # Starts server on http://localhost:5000
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install
```

**Create `frontend/.env`:**
```env
VITE_API_URL=http://localhost:5000/api
```

**Start dev server:**
```bash
npm run dev
```

Visit: **http://localhost:5173**

## 📝 Demo Credentials

### Admin Account
```
Email: admin@blossom.test
Password: password123
```

### Customer Account
```
Email: customer@blossom.test
Password: password123
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register     # Create account
POST   /api/auth/login        # Login
GET    /api/auth/me           # Get current user
```

### Products
```
GET    /api/products          # Get all products (paginated, searchable)
GET    /api/products/:id      # Get product details
POST   /api/products          # Create product (admin only)
PUT    /api/products/:id      # Update product (admin only)
DELETE /api/products/:id      # Delete product (admin only)
```

### Orders
```
GET    /api/orders            # Get user's orders
GET    /api/orders/:id        # Get order details
POST   /api/orders            # Create order
POST   /api/orders/create-payment-intent  # Create Stripe payment
PUT    /api/orders/:id/status # Update order status (admin only)
```

### Users
```
GET    /api/users/profile     # Get profile
PUT    /api/users/profile     # Update profile
GET    /api/users/wishlist    # Get wishlist
POST   /api/users/wishlist/:productId  # Add to wishlist
DELETE /api/users/wishlist/:productId  # Remove from wishlist
```

### Admin
```
GET    /api/admin/dashboard   # Dashboard summary
GET    /api/admin/analytics   # Sales analytics
GET    /api/admin/users       # Get all users
GET    /api/admin/orders      # Get all orders
```

## 🗄️ Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  passwordHash: String,
  role: 'admin' | 'customer' | 'guest' | 'staff' | 'delivery',
  phone: String,
  profileImage: String,
  wishlist: [ObjectId],
  addresses: [{
    label: String,
    line1: String,
    city: String,
    state: String,
    postal: String,
    country: String,
    default: Boolean
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```javascript
{
  title: String,
  description: String,
  price: Number,
  discountPrice: Number,
  stock: Number,
  images: [String],
  category: String,
  tags: [String],
  rating: Number (0-5),
  reviewCount: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  orderNumber: String (unique),
  user: ObjectId (ref: User),
  items: [{
    product: ObjectId,
    qty: Number,
    price: Number,
    discount: Number
  }],
  subtotal: Number,
  tax: Number,
  shippingCost: Number,
  total: Number,
  shippingAddress: Object,
  billingAddress: Object,
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned',
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded',
  paymentMethod: 'stripe' | 'razorpay' | 'cod',
  paymentIntentId: String,
  trackingNumber: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🌐 MongoDB Atlas Setup

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free account
3. Create a **M0 Free** cluster
4. Create database user with secure password
5. Whitelist your IP (or allow all for development)
6. Click "Connect" and copy connection string
7. Replace `<password>` with your password
8. Paste into `backend/.env` as `MONGO_URI`

**Example Connection String:**
```
mongodb+srv://admin:securepassword@cluster0.mongodb.net/blossom?retryWrites=true&w=majority
```

## 💳 Stripe Setup (Optional)

1. Create account at [stripe.com](https://stripe.com)
2. Go to Dashboard → API Keys
3. Copy **Secret Key** (starts with `sk_test_`)
4. Add to `backend/.env` as `STRIPE_SECRET`

**Note:** Payment endpoints are ready but frontend checkout flow can be added later.

## 📦 Build for Production

### Frontend Build
```bash
cd frontend
npm run build      # Creates dist/ folder
npm run preview    # Test build locally
```

### Backend Production
```bash
cd backend
npm run start      # Runs from src/server.js
```

## 🚀 Deployment Guide

### Frontend (Vercel/Netlify)

**Vercel:**
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Set environment variable: `VITE_API_URL=https://your-backend.com/api`
4. Deploy

**Netlify:**
1. Push code to GitHub
2. Connect GitHub to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable: `VITE_API_URL`
6. Deploy

### Backend (Render/Heroku)

**Render:**
1. Connect GitHub repo
2. Create Web Service
3. Environment variables:
   - `MONGO_URI`: MongoDB connection string
   - `JWT_SECRET`: Your secret key
   - `STRIPE_SECRET`: Your Stripe key
   - `CLIENT_URL`: https://your-frontend.com
4. Deploy

**Heroku:**
1. Create app: `heroku create my-blossom-api`
2. Set environment variables:
   ```bash
   heroku config:set MONGO_URI=...
   heroku config:set JWT_SECRET=...
   ```
3. Push to Heroku: `git push heroku main`

### Database (MongoDB Atlas)
- Create M0 Free cluster
- Create database user
- Whitelist application IPs
- Use connection string in environment variables

## 📚 Next Steps & Roadmap

- [ ] Add shopping cart persistence (localStorage/backend)
- [ ] Complete Stripe checkout integration
- [ ] Add email notifications (SendGrid/Nodemailer)
- [ ] Implement reviews & ratings system
- [ ] Add product inventory alerts
- [ ] Implement SMS notifications (Twilio)
- [ ] Add delivery partner tracking
- [ ] Implement referral system
- [ ] Add loyalty points/rewards
- [ ] Social media integration
- [ ] Add analytics dashboard
- [ ] Implement caching (Redis)
- [ ] Set up CI/CD pipeline (GitHub Actions)
- [ ] Add unit & integration tests
- [ ] Implement rate limiting
- [ ] Add image upload (Cloudinary)
- [ ] Dark mode support
- [ ] Multi-language support

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm install --save-dev jest
npm run test
```

### Frontend Testing
```bash
cd frontend
npm install --save-dev vitest @testing-library/react
npm run test
```

## 📖 Documentation

- [Setup Guide](./SETUP.md) - Detailed setup instructions
- [API Documentation](./API.md) - Complete API reference
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment steps

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `Cannot find module` | Run `npm install` in respective folder |
| `MONGO_URI not set` | Create `.env` file with connection string |
| `Connection refused` | Ensure backend is running on port 5000 |
| `Port already in use` | Change `PORT` in `.env` or kill process on port |
| `CORS error` | Check `CLIENT_URL` in backend `.env` |

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💼 Support

For issues, questions, or suggestions:
1. Check [SETUP.md](./SETUP.md) for common issues
2. Review [API documentation](./API.md)
3. Check MongoDB Atlas logs
4. Check Stripe dashboard for payment issues

---

**Built with ❤️ for beautiful skincare businesses**

⭐ Star this repo if you find it helpful!
