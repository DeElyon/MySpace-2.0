# Quick Start Guide - MySpace 2.0

## 🚀 Fastest Way to Run Locally

### Option 1: Using Docker Compose (Recommended)

```bash
# 1. Navigate to monorepo
cd my-space-fpa

# 2. Start everything
docker-compose up -d

# 3. Done! Your app is ready
echo "Frontend: http://localhost:3000"
echo "API: http://localhost:4000/graphql"
```

### Option 2: Using Startup Script

```bash
# From root directory
./start.sh

# Stop when done
./stop.sh
```

### Option 3: Manual Local Development

```bash
# Terminal 1 - Install dependencies
cd my-space-fpa
pnpm install

# Terminal 2 - Start backend services
pnpm run dev:services

# Terminal 3 - Start frontend
pnpm run dev:web

# Now open http://localhost:3000
```

## 📋 What Gets Started

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:3000 | Next.js React app |
| **API Gateway** | http://localhost:4000/graphql | GraphQL API |
| **Auth Service** | http://localhost:3002 | Authentication & JWT |
| **PostgreSQL** | localhost:5432 | Main database |
| **Redis** | localhost:6379 | Cache & sessions |

## 🔗 Test the Connection

### 1. Frontend is Running
```bash
curl http://localhost:3000
```

### 2. API Gateway is Running
```bash
curl http://localhost:4000/health
```

### 3. Auth Service is Running
```bash
curl http://localhost:3002/health
```

### 4. Try GraphQL Query
```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ me { id email } }"}'
```

## 🛠️ Common Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api-gateway
docker-compose logs -f auth-service
docker-compose logs -f web
```

### Stop Services
```bash
docker-compose down
```

### Reset Everything (Remove Data)
```bash
docker-compose down -v
docker-compose up -d
```

### Rebuild Services
```bash
docker-compose build --no-cache
docker-compose up -d
```

## 📱 Testing API

### Open GraphQL Playground
1. Go to http://localhost:4000/graphql
2. Try this query:
```graphql
query {
  jobs(limit: 5) {
    id
    title
    budget_min
  }
}
```

### Test Auth Service
```bash
# Register a user
curl -X POST http://localhost:3002/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3002/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🔐 Default Credentials

| Service | Username | Password |
|---------|----------|----------|
| PostgreSQL | myspace_user | myspace_password |
| Redis | (no auth) | (no password) |

## ✅ Verify Everything Works

Run this script to check all services:

```bash
#!/bin/bash
echo "Checking services..."
echo "Frontend:" && curl -s http://localhost:3000 | head -1
echo "API Gateway:" && curl -s http://localhost:4000/health
echo "Auth Service:" && curl -s http://localhost:3002/health
echo "PostgreSQL:" && docker-compose exec -T postgres pg_isready -U myspace_user
echo "Redis:" && docker-compose exec -T redis redis-cli ping
```

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Services Won't Start
```bash
# Check logs
docker-compose logs

# Rebuild everything
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### Database Connection Failed
```bash
# Make sure PostgreSQL is healthy
docker-compose ps postgres

# Check database exists
docker-compose exec postgres psql -U myspace_user -d myspace -c "\l"
```

### Out of Memory
Docker needs at least 4GB RAM. Increase Docker memory in settings:
- **Mac**: Docker Desktop > Settings > Resources > Memory (set to 4GB+)
- **Windows**: Docker Desktop > Settings > Resources > Memory (set to 4GB+)

## 📚 Next Steps

1. **Frontend Development**: Check `/my-space-fpa/apps/web/README.md`
2. **API Development**: Check `/my-space-fpa/services/api-gateway/README.md`
3. **Auth Service**: Check `/my-space-fpa/services/auth-service/README.md`
4. **Database**: Check for schema in `/my-space-fpa/services/*/migrations`

## 🚀 Ready to Deploy?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment guides.
