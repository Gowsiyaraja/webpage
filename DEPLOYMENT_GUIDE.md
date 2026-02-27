# Blossom Beauty - Deployment Guide

This guide covers:
1. Firebase Project Setup
2. GitHub Push
3. Vercel Deployment
4. Render Deployment

---

## Part 1: Firebase Project Setup

### Step 1: Create Firebase Project
1. Go to [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `blossom-beauty` (or your preferred name)
4. Disable Google Analytics (optional, click Continue)
5. Wait for project creation to complete
6. Click **"Continue to console"**

### Step 2: Enable Firestore Database
1. In Firebase Console, click **"Build"** in the left sidebar
2. Click **"Firestore Database"**
3. Click **"Create database"**
4. Choose location (preferably closest to your users)
5. Start in **"Production mode"** (or Test mode for development)
6. Click **"Done"**

### Step 3: Create Service Account (for Admin SDK)
1. In Firebase Console, click **"Project Settings"** (gear icon ⚙️)
2. Scroll down to **"Your apps"** section
3. Click the **"</>" (Web)** icon or **"+"** to add an app
4. Register app: enter nickname (e.g., "blossom-web")
5. **Copy the firebaseConfig** object for later (for frontend)
6. Click **"Continue to console"**

### Step 4: Generate Service Account Key
1. In Project Settings, go to **"Service accounts"** tab
2. Click **"Generate new private key"**
3. Click **"Generate key"** - a JSON file will download
4. Keep this file secure - you'll need its contents

### Step 5: Get Service Account Details
Open the downloaded JSON file and extract these values:

```
env
FIREBASE_PROJECT_ID=your-project-id (from the JSON file)
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAAS...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com
```

### Step 6: Update Environment Variables
Create/edit `.env` file in backend folder:

```
env
# Server Port
PORT=5000

# Firebase Configuration (from Step 5)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_CONTENT\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com

# JWT Secret (keep secure)
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Stripe (keep existing if you have)
STRIPE_SECRET_KEY=your-stripe-secret-key
```

---

## Part 2: Push to GitHub

### Step 1: Initialize Git (if not already done)
```
bash
# Open terminal in your project folder
cd c:/Users/Admin/Desktop/blossom

# Initialize git (if needed)
git init

# Configure git (if first time)
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

### Step 2: Create .gitignore
Make sure you have these in `.gitignore`:
```
node_modules/
.env
.env.local
.DS_Store
*.log
dist/
build/
```

### Step 3: Stage and Commit Changes
```
bash
# Stage all files
git add .

# Or stage specific files
git add -A

# Create commit
git commit -m "Migrated from MongoDB to Firebase - fixed auth and products"
```

### Step 4: Create GitHub Repository
1. Go to [https://github.com/new](https://github.com/new)
2. Enter repository name: `blossom-beauty`
3. Choose Public or Private
4. **Don't** initialize with README (we already have files)
5. Click **"Create repository"**

### Step 5: Push to GitHub
```
bash
# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/blossom-beauty.git

# Push to GitHub
git push -u origin main
```

**Note:** If you get error about main branch, use:
```
bash
git push -u origin master
```

---

## Part 3: Deploy to Vercel (Frontend)

### Option A: From GitHub (Recommended)

1. Go to [https://vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository `blossom-beauty`
4. Configure:
   - Framework Preset: **Vite** (or Auto-detect)
   - Build Command: `npm run build` (or leave empty)
   - Output Directory: `dist` (or leave empty)
5. Click **"Deploy"**

### Option B: From Command Line

```
bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (in project folder)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your username
# - Link to existing project? No
# - Project name: blossom-beauty
# - Directory? ./
# - Want to modify settings? No
```

### Vercel Environment Variables
In Vercel dashboard, go to Project Settings → Environment Variables:
```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
```

---

## Part 4: Deploy to Render (Backend)

### Step 1: Prepare for Render
1. Create file `render.yaml` in project root:

```
yaml
services:
  - type: web
    name: blossom-backend
    env: node
    region: oregon
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: FIREBASE_PROJECT_ID
        sync: false
      - key: FIREBASE_PRIVATE_KEY
        sync: false
      - key: FIREBASE_CLIENT_EMAIL
        sync: false
      - key: FIREBASE_CLIENT_ID
        sync: false
      - key: FIREBASE_CLIENT_X509_CERT_URL
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: STRIPE_SECRET_KEY
        sync: false
```

### Option A: From GitHub (Recommended)

1. Go to [https://dashboard.render.com](https://dashboard.render.com)
2. Click **"New"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - Name: `blossom-backend`
   - Region: Oregon (or closest to you)
   - Branch: `main` or `master`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Click **"Create Web Service"**

### Option B: From Command Line

```
bash
# Install Render CLI
npm install -g render-cli

# Login
render login

# Deploy
render deploy blossom-backend --git
```

### Render Environment Variables
In Render dashboard, go to your backend service → Environment:
```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=your-stripe-key
```

---

## Part 5: Redeploy Commands

### For Local Development
```
bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

### For Vercel (Automatic)
- Push to GitHub → Vercel auto-deploys
```
bash
git add .
git commit -m "Update"
git push origin main
```

### For Render (Manual)
- In Render dashboard, click **"Manual Deploy"** → **"Deploy latest commit"**

Or from CLI:
```
bash
render deploy blossom-backend
```

---

## Quick Summary

| Task | Command/Action |
|------|-----------------|
| Firebase Setup | Console → Create Project → Firestore → Service Account |
| GitHub Push | `git add . && git commit -m "msg" && git push origin main` |
| Vercel Deploy | Connect GitHub repo → Auto-deploys on push |
| Render Deploy | Connect GitHub repo → Set env vars → Deploy |
| Local Run | `cd backend && npm run dev` (terminal 1) + `cd frontend && npm run dev` (terminal 2) |
| Redeploy | Push to GitHub → Vercel/Render auto-deploys |

---

## Troubleshooting

### If Products Not Showing:
1. Run seed script: `npm run seed`
2. Check Firebase console → Firestore → products collection exists
3. Verify environment variables are set correctly

### If Admin Login Not Working:
1. Create admin user via registration
2. Manually set role to "admin" in Firestore:
   - Go to Firebase Console → Firestore → users collection
   - Find your user document
   - Edit → set role to "admin"

### If Build Fails:
```
bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
