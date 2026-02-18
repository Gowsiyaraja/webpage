# Blossom Beauty Care Products - Setup Guide

## Quick Start (Copy-Paste Commands)

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in `backend/` folder with:
```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/blossom?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here_change_in_production
STRIPE_SECRET=sk_test_your_stripe_key
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Then:
```bash
npm run seed
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in `frontend/` folder with:
```
VITE_API_URL=http://localhost:5000/api
```

Then:
```bash
npm run dev
```

Visit: http://localhost:5173

## Demo Credentials

**Admin:**
- Email: gowsiyaraja@gmail.com
- Password: password123

**Customer:**
- Email: customer@blossom.test
- Password: password123

## MongoDB Setup (Free)

1. Go to mongodb.com/cloud/atlas
2. Create free account
3. Create M0 free cluster
4. Create database user
5. Get connection string
6. Replace in `.env`

## Project Structure

```
blossom/
├── backend/              # Express.js API
│   ├── src/
│   │   ├── models/      # MongoDB schemas
│   │   ├── routes/      # API endpoints
│   │   ├── middleware/  # Auth & roles
│   │   ├── server.js
│   │   └── seed.js      # Sample data
│   ├── package.json
│   └── .env             # (create this)
│
├── frontend/            # React + Vite
│   ├── src/
│   │   ├── pages/       # Home, Products, Dashboards
│   │   ├── components/  # UI components
│   │   ├── context/     # Auth context
│   │   ├── api/         # Axios config
│   │   └── index.css    # Tailwind
│   ├── package.json
│   ├── index.html
│   ├── tailwind.config.js
│   └── .env             # (create this)
```

## Features Included

✅ User Authentication (JWT)
✅ Product Catalog with Search
✅ Shopping Cart (Frontend State)
✅ Admin Dashboard with Charts
✅ Customer Dashboard
✅ Order Management
✅ Wishlist
✅ Stripe Payment Ready
✅ Responsive Design (Tailwind CSS)
✅ Sample Data (Seed Script)

## API Routes

**Auth:**
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

**Products:**
- GET /api/products
- GET /api/products/:id
- POST /api/products (admin)
- PUT /api/products/:id (admin)
- DELETE /api/products/:id (admin)

**Orders:**
- GET /api/orders
- POST /api/orders
- POST /api/orders/create-payment-intent

**Admin:**
- GET /api/admin/dashboard
- GET /api/admin/analytics

**Users:**
- GET /api/users/profile
- PUT /api/users/profile
- GET /api/users/wishlist
- POST /api/users/wishlist/:productId

## Next Steps

1. Download dependencies (npm install)
2. Configure MongoDB URI in .env
3. Run seed script: npm run seed
4. Start backend: npm run dev
5. In another terminal: start frontend: npm run dev
6. Open http://localhost:5173
7. Login with demo credentials

## Troubleshooting

**"Cannot find module..."**
- Run: npm install

**"MONGO_URI not set"**
- Create .env file in backend/ with MONGO_URI

**"Connection refused"**
- Make sure backend is running on port 5000
- Check VITE_API_URL in frontend .env

**Port already in use**
- Backend: PORT=5001 node src/server.js
- Frontend: vite --port 5174

## Deployment

**Frontend:** Vercel / Netlify
**Backend:** Render / Heroku
**Database:** MongoDB Atlas (free tier)

See full README.md for details.

---

Questions? Check the backend/README.md or frontend README.
