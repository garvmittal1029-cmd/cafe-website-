# 🚀 Brew & Bloom — Deployment & Connection Guide

This guide provides step-by-step instructions for deploying the **Brew & Bloom** full-stack application to production.

- **Frontend**: Cloudflare Pages (React + Vite)
- **Backend**: Render (Node.js + Express)
- **Database**: MongoDB Atlas

---

## 📋 System Architecture

```
+---------------------+        HTTPS        +-------------------------+        Mongoose        +---------------------+
|   Client Browser    | <-----------------> |  Cloudflare Pages (UI)  | <--------------------> | Render Backend API  |
|  (User Device)      |                     |  React + Vite Frontend  |                        | Node.js + Express   |
+---------------------+                     +-------------------------+                        +----------+----------+
                                                                                                          |
                                                                                                          | MongoDB Native
                                                                                                          v
                                                                                               +---------------------+
                                                                                               |    MongoDB Atlas    |
                                                                                               |   Cloud Database    |
                                                                                               +---------------------+
```

---

## 1. 🗄️ Database Setup (MongoDB Atlas)

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Database User under **Database Access** (note username & password).
3. Under **Network Access**, add IP `0.0.0.0/0` to allow connections from Render.
4. Get your connection string under **Database > Connect > Drivers**:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/brew_and_bloom?retryWrites=true&w=majority
   ```

---

## 2. ⚙️ Backend Deployment (Render)

### Step-by-Step Instructions:

1. Push your project repository to GitHub / GitLab.
2. Log in to [Render Dashboard](https://dashboard.render.com).
3. Click **New +** > **Web Service**.
4. Connect your repository.
5. Configure the service settings:
   - **Name**: `brew-bloom-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add **Environment Variables** in Render Settings:
   | Key | Value |
   | --- | --- |
   | `MONGODB_URI` | `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/brew_and_bloom?retryWrites=true&w=majority` |
   | `PORT` | `5000` |
   | `NODE_ENV` | `production` |
   | `CORS_ORIGIN` | `https://brew-bloom.pages.dev` *(Replace with your actual Cloudflare Pages URL)* |

7. Deploy the Web Service and copy its live URL (e.g. `https://brew-bloom-backend.onrender.com`).

---

## 3. 🌐 Frontend Deployment (Cloudflare Pages)

### Option A: Cloudflare Pages via GitHub Integration (Recommended)

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com) > **Workers & Pages**.
2. Click **Create Application** > **Pages** > **Connect to Git**.
3. Select your repository.
4. Set Build Settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `frontend`
5. Add **Environment Variables**:
   | Variable | Value |
   | --- | --- |
   | `VITE_API_URL` | `https://brew-bloom-backend.onrender.com/api` |
6. Click **Save and Deploy**.

### Option B: Cloudflare Direct Upload via CLI (Wrangler)

```bash
cd frontend
npm install
npm run build
npx wrangler pages deploy dist --project-name=brew-bloom
```

---

## 🔗 4. Connection Points & Verification Checklist

- [ ] **CORS Settings**: Verify `CORS_ORIGIN` on Render matches your Cloudflare Pages URL.
- [ ] **API Endpoint**: Verify `VITE_API_URL` on Cloudflare Pages points to `https://<your-render-app>.onrender.com/api`.
- [ ] **Database Seeding**: Call `POST https://<your-render-app>.onrender.com/api/seed` once after deployment to seed initial menu, specials, and gallery items into MongoDB.
- [ ] **Health Check**: Confirm backend health at `https://<your-render-app>.onrender.com/api/health`.

---

## 🛠️ Local Development Quickstart

1. **Install Dependencies**:
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

2. **Start Backend**:
   ```bash
   cd backend
   npm run dev
   ```

3. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

---

*Brew & Bloom — Digital Experience | Crafted for Slow Living*
