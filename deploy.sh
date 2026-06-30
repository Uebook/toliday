#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting Toliday Production Deployment..."

# 1. Pull latest code from GitHub
echo "📥 Pulling latest code from main branch..."
git pull origin main

# 2. Install monorepo dependencies
echo "📦 Installing package dependencies..."
npm install

# 3. Build NestJS Backend
echo "⚙️ Building backend production bundle..."
npm run build:backend

# 4. Build Next.js Portal & Admin
echo "⚙️ Building frontend portal production bundle..."
npm run build:frontend

# 5. Build Vite Consumer Website
echo "⚙️ Building consumer website production bundle..."
npm run build:website

# 6. Restart applications via PM2
echo "🔄 Restarting processes with PM2..."
if pm2 describe toliday-backend > /dev/null 2>&1; then
    pm2 restart ecosystem.config.js --env production
else
    pm2 start ecosystem.config.js --env production
fi

# 7. Apply Nginx changes and reload
echo "🌐 Reloading Nginx server configuration..."
if [ -f "nginx.conf" ]; then
    sudo cp nginx.conf /etc/nginx/sites-available/toliday.conf
    sudo ln -sf /etc/nginx/sites-available/toliday.conf /etc/nginx/sites-enabled/
    
    echo "🔍 Testing Nginx configuration..."
    sudo nginx -t
    
    echo "🔄 Restarting Nginx service..."
    sudo systemctl reload nginx
fi

echo "✅ Toliday Deployment Complete & Live!"
