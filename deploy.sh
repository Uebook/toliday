#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting Toliday Production Deployment..."

# 1. Stash any local changes and pull latest code
echo "📥 Pulling latest code from main branch..."
git stash || true
git pull origin main

# 2. Install monorepo dependencies
echo "📦 Installing package dependencies..."
npm install

# 3. Build NestJS Backend (MUST run before PM2 start:prod)
echo "⚙️ Building backend production bundle..."
npm run build:backend
echo "✅ Backend built successfully"

# 4. Build Next.js Portal & Admin
echo "⚙️ Building frontend portal production bundle..."
npm run build:frontend
echo "✅ Frontend built successfully"

# 5. Build Vite Consumer Website
echo "⚙️ Building consumer website production bundle..."
npm run build:website
echo "✅ Website built successfully"

# 6. Start or restart applications via PM2
echo "🔄 Restarting processes with PM2..."
if pm2 describe toliday-backend > /dev/null 2>&1; then
    echo "  ↻ PM2 processes exist — restarting..."
    pm2 restart ecosystem.config.js --env production
    pm2 save
else
    echo "  ▶ No PM2 processes found — starting fresh..."
    pm2 start ecosystem.config.js --env production
    pm2 save
    pm2 startup
fi

# 7. Wait a moment for backend to be ready
echo "⏳ Waiting 3s for backend to initialise..."
sleep 3

# 8. Verify backend is responding
echo "🔍 Verifying backend health..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api | grep -q "200\|404"; then
    echo "✅ Backend is live on port 3001!"
else
    echo "⚠️ Backend may not be running. Check logs with: pm2 logs toliday-backend"
fi

# 9. Apply Nginx changes and reload
echo "🌐 Reloading Nginx server configuration..."
if [ -f "nginx.conf" ]; then
    # Check if SSL is already configured on the server to prevent overwriting it
    if grep -q "listen 443" /etc/nginx/sites-available/toliday.conf 2>/dev/null; then
        echo "🔒 SSL is already configured in /etc/nginx/sites-available/toliday.conf. Skipping overwrite to preserve certificates."
    else
        echo "📄 Copying clean Nginx configuration..."
        sudo cp nginx.conf /etc/nginx/sites-available/toliday.conf
        sudo ln -sf /etc/nginx/sites-available/toliday.conf /etc/nginx/sites-enabled/
        
        # Remove default site if exists to avoid conflicts
        sudo rm -f /etc/nginx/sites-enabled/default
    fi
    
    echo "🔍 Testing Nginx configuration..."
    sudo nginx -t
    
    echo "🔄 Reloading Nginx service..."
    sudo systemctl reload nginx
    echo "✅ Nginx reloaded"
fi

echo ""
echo "🎉 ===== Toliday Deployment Complete & Live! ====="
echo "   🌍 Website  : http://tolidaytrip.com"
echo "   🏨 Portal   : http://portal.tolidaytrip.com"
echo "   🔧 Admin    : http://admin.tolidaytrip.com/admin/login"
echo "   ⚙️  API      : http://api.tolidaytrip.com"
echo "=================================================="
echo ""
echo "📊 PM2 Status:"
pm2 status

