# Backend Deployment Guide - Render

## Prerequisites
- GitHub repository with your backend code
- Render account (free tier available)
- MongoDB Atlas account (for production database)

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user with strong password
4. Get your connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/coinbase-prod
   ```

## Step 2: Configure Environment Variables

### In Render Dashboard:
1. Go to your service settings
2. Add these environment variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/coinbase-prod
   JWT_SECRET=your-super-secure-jwt-secret-key-for-production
   CLIENT_URL=https://your-frontend-url.onrender.com
   ```

### Important Notes:
- `MONGO_URI`: Replace with your actual MongoDB Atlas connection string
- `JWT_SECRET`: Use a strong, unique secret (generate with: `openssl rand -base64 32`)
- `CLIENT_URL`: Update with your frontend URL once deployed

## Step 3: Deploy to Render

### Option A: Using Render Dashboard
1. Go to [Render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: coinbase-backend
   - **Region**: Choose nearest region
   - **Branch**: main
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/`

### Option B: Using render.yaml (Auto-deploy)
1. Push your code to GitHub with the `render.yaml` file
2. Connect your GitHub account to Render
3. Render will automatically detect and deploy

## Step 4: Update CORS Settings

Your backend already has CORS configured, but ensure the `CLIENT_URL` matches your deployed frontend URL.

## Step 5: Verify Deployment

1. Check the Render dashboard for deployment status
2. Test the API endpoints:
   ```bash
   # Test health endpoint
   curl https://your-backend-url.onrender.com/
   
   # Test registration
   curl -X POST https://your-backend-url.onrender.com/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
   ```

## Production Considerations

### Security
- JWT secrets are properly configured
- CORS is enabled for your frontend
- Environment variables are not exposed

### Database
- MongoDB Atlas provides free tier (512MB)
- Automatic backups included
- SSL connections enforced

### Performance
- Render provides automatic HTTPS
- Built-in load balancing
- Health checks configured

## Troubleshooting

### Database Connection Issues
```bash
# Check your MongoDB Atlas connection string
# Ensure IP whitelist includes Render's IPs (0.0.0.0/0 for cloud)
# Verify database user credentials
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules
npm install
```

### Runtime Errors
1. Check Render logs
2. Verify all environment variables are set
3. Ensure MongoDB connection is working

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `10000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key` |
| `CLIENT_URL` | Frontend URL for CORS | `https://frontend.onrender.com` |

## Next Steps
1. Deploy backend first
2. Note the backend URL from Render
3. Update frontend environment variables
4. Deploy frontend
5. Test full integration

## Monitoring
- Render provides built-in monitoring
- Check logs in Render dashboard
- Set up alerts for downtime (paid plans)
