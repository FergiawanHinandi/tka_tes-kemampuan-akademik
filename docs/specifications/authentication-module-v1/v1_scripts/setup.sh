#!/bin/bash
# ============================================================
# TKA UJIAN - INITIAL SETUP SCRIPT
# ============================================================

set -e

echo "🚀 Setting up TKA Ujian development environment..."
echo ""

# 1. Check prerequisites
echo "📋 Checking prerequisites..."

check_command() {
  if ! command -v $1 &> /dev/null; then
    echo "❌ $1 is not installed. Please install it first."
    exit 1
  else
    echo "✅ $1 found: $($1 --version 2>/dev/null | head -1)"
  fi
}

check_command "node"
check_command "npm"
check_command "docker"
check_command "docker-compose"
check_command "git"

# Check Node.js version >= 20
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "❌ Node.js 20+ is required. Current: $(node -v)"
  exit 1
fi

echo ""

# 2. Copy environment file
echo "📄 Setting up environment variables..."
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ .env file created from .env.example"
  echo "⚠️  Please update .env with your actual values"
else
  echo "✅ .env file already exists"
fi

echo ""

# 3. Generate RSA keys for JWT
echo "🔑 Generating RSA keys for JWT..."
mkdir -p apps/api/keys

if [ ! -f apps/api/keys/access-private.pem ]; then
  openssl genrsa -out apps/api/keys/access-private.pem 4096
  openssl rsa -in apps/api/keys/access-private.pem -pubout -out apps/api/keys/access-public.pem
  echo "✅ Access token RSA keys generated (4096-bit)"
else
  echo "✅ Access token RSA keys already exist"
fi

if [ ! -f apps/api/keys/refresh-private.pem ]; then
  openssl genrsa -out apps/api/keys/refresh-private.pem 4096
  openssl rsa -in apps/api/keys/refresh-private.pem -pubout -out apps/api/keys/refresh-public.pem
  echo "✅ Refresh token RSA keys generated (4096-bit)"
else
  echo "✅ Refresh token RSA keys already exist"
fi

echo ""

# 4. Start Docker containers
echo "🐳 Starting Docker containers..."
docker-compose up -d

echo "⏳ Waiting for services to be ready..."
sleep 10

# Check PostgreSQL
until docker exec tka_postgres pg_isready -U tka_admin -d tka_ujian > /dev/null 2>&1; do
  echo "  Waiting for PostgreSQL..."
  sleep 2
done
echo "✅ PostgreSQL is ready"

# Check Redis
until docker exec tka_redis redis-cli -a tka_redis_2026 ping > /dev/null 2>&1; do
  echo "  Waiting for Redis..."
  sleep 2
done
echo "✅ Redis is ready"

# Check MinIO
until curl -f http://localhost:9000/minio/health/live > /dev/null 2>&1; do
  echo "  Waiting for MinIO..."
  sleep 2
done
echo "✅ MinIO is ready"

echo ""

# 5. Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""

# 6. Generate Prisma Client
echo "🗄️ Generating Prisma Client..."
cd apps/api
npx prisma generate

# 7. Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate dev --name init

# 8. Seed database
echo "🌱 Seeding database..."
npx ts-node prisma/seeds/index.ts

cd ../..

echo ""
echo "============================================"
echo "🎉 Setup complete!"
echo "============================================"
echo ""
echo "Available services:"
echo "  📊 PostgreSQL:      localhost:5432"
echo "  🔴 Redis:           localhost:6379"
echo "  📦 MinIO:           localhost:9000"
echo "  📦 MinIO Console:   localhost:9001"
echo "  🗄️ pgAdmin:         localhost:5050"
echo "  📊 Redis Commander: localhost:8081"
echo ""
echo "Run commands:"
echo "  npm run dev:api      → Start API server"
echo "  npm run dev:web      → Start Web frontend"
echo "  npm run dev:proktor  → Start Proktor desktop app"
echo "  npm run dev:client   → Start Client Siswa desktop app"
echo "  npm run dev          → Start all apps"
echo ""
echo "Default Super Admin credentials:"
echo "  Username: superadmin"
echo "  Password: SuperAdmin@TKA2026"
echo ""