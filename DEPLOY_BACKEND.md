# 🚀 Deploy Backend to Railway

## Quick Steps (5 minutes)

### 1. Sign Up for Railway

1. Go to https://railway.app
2. Click "Login" → "Login with GitHub"
3. Authorize Railway to access your GitHub

### 2. Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repo: `AI-DATA-DICTIONARY`
4. Railway will auto-detect Python and start deploying

### 3. Configure Environment

Railway will automatically:
- ✅ Detect Python project
- ✅ Install dependencies from requirements.txt
- ✅ Start the FastAPI server
- ✅ Assign a public URL

### 4. Get Your Backend URL

After deployment (2-3 minutes):
1. Click on your deployment
2. Go to "Settings" tab
3. Find "Domains" section
4. Copy the URL (e.g., `https://your-app.railway.app`)

### 5. Update Frontend

Update the API URL in your frontend:

**File:** `ai-dd-frontend/lib/api.ts`

Change:
```typescript
const API_URL = "http://localhost:8000";
```

To:
```typescript
const API_URL = "https://your-app.railway.app";
```

### 6. Redeploy Frontend

```bash
cd ai-dd-frontend
vercel deploy --prod
```

## ✅ Done!

Your full-stack app is now live:
- Frontend: https://ai-dd-frontend.vercel.app
- Backend: https://your-app.railway.app

## 🎯 Test It

1. Go to your live frontend
2. Toggle Demo Mode OFF
3. Enter database credentials
4. Click "Start Analysis"
5. It should work with real databases now!

## 💡 Free Tier Limits

Railway free tier includes:
- $5 credit per month
- Enough for hobby projects
- Auto-sleeps when inactive

## 🔧 Troubleshooting

### If deployment fails:

1. Check Railway logs
2. Verify requirements.txt is correct
3. Make sure all files are pushed to GitHub

### If CORS errors:

Backend is already configured to allow all origins.

### If connection fails:

Make sure you updated the API_URL in frontend and redeployed.

---

## 📝 Summary

1. ✅ Railway deployment files added
2. ✅ CORS configured for production
3. ✅ Ready to deploy
4. ⏳ Follow steps above to deploy

**Your backend is ready to deploy!** 🚀
