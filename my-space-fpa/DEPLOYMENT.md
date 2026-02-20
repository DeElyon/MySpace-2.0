# Deployment Guide for My Space FPA

## Quick Deploy Options

### Option 1: Vercel (Recommended for Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd apps/web
vercel --prod
```

### Option 2: Docker Deployment

```bash
# Build Docker image
cd apps/web
docker build -t myspacefpa-web .

# Run container
docker run -p 3000:3000 myspacefpa-web
```

### Option 3: Manual Deployment

```bash
# Build the application
cd apps/web
npm run build

# The built files are in .next/
# Copy to your server and run:
npm run start
```

## Environment Variables

Create `.env.local` in `apps/web/`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://your-api-url:4000/graphql
NEXT_PUBLIC_WS_URL=ws://your-websocket-url:3004

# Application
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production
```

## Common Issues & Fixes

### Issue: Pages not showing after deployment

**Solution 1:** Check build output
```bash
cd apps/web
npm run build
ls -la .next/
```

**Solution 2:** Verify package.json scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

**Solution 3:** Check Node.js version
```bash
node --version  # Should be 20+
```

### Issue: UI Components not loading

**Solution:** Rebuild UI package
```bash
cd ../..
cd packages/ui
# Ensure index.ts exports all components
cd ../apps/web
npm install
npm run build
```

### Issue: Styles not applying

**Solution:** Check Tailwind configuration
```bash
cat app/globals.css
cat postcss.config.mjs
```

## Production Checklist

- [ ] Build completes without errors
- [ ] All 17 routes generated
- [ ] Environment variables set
- [ ] Static assets accessible
- [ ] API endpoints configured
- [ ] SSL certificate installed
- [ ] Domain DNS configured

## Support

For deployment issues, check:
1. Build logs for errors
2. Server logs at runtime
3. Network tab in browser DevTools
4. Console errors

Contact: support@myspacefpa.com
