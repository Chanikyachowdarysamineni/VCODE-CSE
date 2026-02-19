# Quick Render Deployment Reference

## Backend Service

**Service Type:** Web Service

**Settings:**
- Root Directory: `backend`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Environment: Node

**Environment Variables:**
```
MONGO_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=your_frontend_url_after_deployment
```

---

## Frontend Service

**Service Type:** Static Site

**Settings:**
- Build Command: `cd frontend && npm install && npm run build`
- Publish Directory: `frontend/dist`

**Environment Variables:**
```
VITE_API_URL=your_backend_url_from_above
```

---

## Deployment Order

1. Deploy Backend first → Get backend URL
2. Deploy Frontend with backend URL
3. Update Backend's `FRONTEND_URL` with frontend URL
4. Redeploy backend

---

**Full Guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
