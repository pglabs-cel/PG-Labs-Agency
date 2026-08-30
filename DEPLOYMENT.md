# 🚀 PG Labs — Production Deployment Guide

This guide provides end-to-end instructions for deploying the **PG Labs Frontend** (Next.js 14 App Router) and **Backend API** (Node.js/Express + MongoDB + Nodemailer).

---

## 🏗️ Architecture Overview

| Component | Technology | Recommended Host | Free / Low-Cost Tier |
| :--- | :--- | :--- | :--- |
| **Frontend** | Next.js 14 App Router (SSG/SSR) | **Vercel** | Free (Hobby) |
| **Backend API** | Node.js, Express, TypeScript | **Render** or **Railway** | Free / \$5/mo |
| **Database** | MongoDB Mongoose | **MongoDB Atlas** | Free (M0 Shared Cluster) |
| **Transactional Email** | Nodemailer | **Gmail SMTP / SendGrid** | Free |

---

## ⚡ Option 1: Deploy Frontend on Vercel + Backend on Render (Recommended)

### Step 1: Deploy the Backend on Render

1. Log in to [Render.com](https://render.com) with your GitHub account.
2. Click **New +** → **Web Service**.
3. Select your repository: `PG-Labs-Agency`.
4. Configure the settings:
   - **Name**: `pg-labs-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Instance Type**: `Free`
5. Under **Environment Variables**, add the following:
   ```env
   PORT=5000
   MONGO_DB_URL=mongodb+srv://<user>:<password>@cluster0.etx38km.mongodb.net/?appName=Cluster0
   ALLOWED_ORIGINS=https://pglabs.agency,https://www.pglabs.agency,https://<your-vercel-app>.vercel.app,http://localhost:3000
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   EMAIL_USER=pglabs.agency@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ADMIN_NOTIFICATION_EMAIL=pglabs.agency@gmail.com
   ```
6. Click **Create Web Service**.
7. Note down your backend URL (e.g. `https://pg-labs-backend.onrender.com`).
8. Verify it by visiting `https://pg-labs-backend.onrender.com/health` — it should return:
   ```json
   { "status": "ok", "service": "PG Labs API", "timestamp": "..." }
   ```

---

### Step 2: Deploy the Frontend on Vercel

1. Log in to [Vercel.com](https://vercel.com) with your GitHub account.
2. Click **Add New...** → **Project**.
3. Select the `PG-Labs-Agency` repository.
4. In the configuration screen:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: Click `Edit` and choose `frontend`.
5. Under **Environment Variables**, add:
   ```env
   BACKEND_API_URL=https://pg-labs-backend.onrender.com/api
   NEXT_PUBLIC_API_URL=https://pg-labs-backend.onrender.com/api
   NEXT_PUBLIC_SITE_URL=https://pglabs.agency
   ```
   *(Replace with your actual backend URL and production domain)*
6. Click **Deploy** (or **Redeploy** if already created).
7. Vercel will build the frontend with the server-side proxy route `/api/contact` and deploy the site to a `*.vercel.app` domain with automatic HTTPS and edge CDN.

---

## ⚡ Option 2: Deploy on Railway (Alternative)

1. Go to [Railway.app](https://railway.app) and create a New Project.
2. **Deploy Backend**:
   - Add service from GitHub Repo `PG-Labs-Agency`.
   - Set Root Directory to `/backend`.
   - Add environment variables matching `backend/.env.example`.
   - Railway automatically assigns a public domain and dynamic `PORT`.
3. **Deploy Frontend**:
   - Add a second service from the same repo, set Root Directory to `/frontend`.
   - Add `NEXT_PUBLIC_API_URL` pointing to the backend Railway URL.

---

## 🐳 Option 3: Deploy via Docker (VPS / DigitalOcean / AWS EC2)

1. Clone the repository on your server:
   ```bash
   git clone https://github.com/pglabs-cel/PG-Labs-Agency.git
   cd PG-Labs-Agency
   ```
2. Create `.env` in the root with your production variables:
   ```bash
   cp backend/.env.example .env
   # Edit with your actual MongoDB and SMTP credentials
   nano .env
   ```
3. Run the backend container:
   ```bash
   docker compose up -d --build
   ```
4. Configure Nginx or Caddy as a reverse proxy with SSL (`certbot`) for your custom domain.

---

## 🌐 Custom Domain & DNS Setup

To connect a custom domain (e.g. `pglabs.agency`):

### In Vercel (Frontend):
1. Go to **Project Settings** → **Domains**.
2. Add `pglabs.agency` and `www.pglabs.agency`.
3. In your DNS provider (Cloudflare, GoDaddy, Namecheap):
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME Record**: `www` → `cname.vercel-dns.com`

### In Render / Railway (Backend):
1. Go to **Settings** → **Custom Domains**.
2. Add `api.pglabs.agency`.
3. In your DNS provider:
   - **CNAME Record**: `api` → `your-backend.onrender.com`
4. Update `ALLOWED_ORIGINS` in your backend environment variables to include `https://pglabs.agency` and `https://www.pglabs.agency`.

---

## 🔒 Production Security & Health Checks

- **Health Check Endpoint**: `GET /health`
- **Inquiry Submission**: `POST /api/contact`
- **Spam Protection**: Rate limiting is enabled (5 requests per 15 minutes per IP).
- **Security Headers**: Helmet & strict CSP headers are active on all responses.
