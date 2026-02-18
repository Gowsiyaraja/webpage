#!/bin/bash
# Blossom Beauty - Quick Start Script
# This script automates the setup process

set -e

echo "🌸 Blossom Beauty Care Products - Setup"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"
echo ""

# Setup Backend
echo -e "${BLUE}📦 Setting up Backend...${NC}"
cd backend

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit backend/.env with your MongoDB URI and Stripe Secret${NC}"
fi

echo "Installing dependencies..."
npm install

echo -e "${GREEN}✓ Backend setup complete!${NC}"
echo ""

# Return to root
cd ..

# Setup Frontend
echo -e "${BLUE}🎨 Setting up Frontend...${NC}"
cd frontend

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    echo "VITE_API_URL=http://localhost:5000/api" > .env
fi

echo "Installing dependencies..."
npm install

echo -e "${GREEN}✓ Frontend setup complete!${NC}"
echo ""

# Return to root
cd ..

echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Edit backend/.env with your MongoDB URI"
echo "2. Run: cd backend && npm run seed && npm run dev"
echo "3. In another terminal: cd frontend && npm run dev"
echo "4. Open http://localhost:5173 in your browser"
echo ""
echo -e "${YELLOW}Demo Credentials:${NC}"
echo "Admin: admin@blossom.test / password123"
echo "Customer: customer@blossom.test / password123"
