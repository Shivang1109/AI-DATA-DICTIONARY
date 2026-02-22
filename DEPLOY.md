# 🚀 Deploy Your Project

## Quick Deploy (5 minutes)

### Deploy Frontend Only (Recommended)

```bash
cd ai-dd-frontend

# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel deploy --prod
```

You'll get a live URL like: `https://ai-data-dictionary.vercel.app`

**Demo mode works without backend!**

---

## What's Deployed

✅ Frontend with demo mode (6.2M records)
✅ All features working
✅ Beautiful UI
✅ Ready to share

---

## Full Stack Deploy (Optional)

If you want real database connections:

### 1. Deploy Backend to Railway

1. Go to https://railway.app
2. Connect GitHub repo
3. Deploy `app/` folder
4. Add PostgreSQL database
5. Get API URL

### 2. Update Frontend

In `ai-dd-frontend/lib/api.ts`, change:
```typescript
const API_URL = "YOUR_RAILWAY_URL";
```

### 3. Redeploy Frontend

```bash
vercel deploy --prod
```

---

## That's It!

For portfolio/demo: **Just deploy frontend**
For production: Deploy both frontend + backend
