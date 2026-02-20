# Deployment Guide - MySpace 2.0

## Local Development with Docker Compose

### Prerequisites
- Docker Desktop installed and running
- pnpm 9.0+
- Node.js 20+

### Quick Start

1. **Navigate to the monorepo**
```bash
cd my-space-fpa
```

2. **Start all services with Docker Compose**
```bash
docker-compose up -d
```

This will start:
- PostgreSQL (port 5432)
- Redis (port 6379)
- Auth Service (port 3002)
- API Gateway (port 4000)
- Web Frontend (port 3000)

3. **Check service health**
```bash
docker-compose ps
docker-compose logs -f
```

4. **Access the application**
- Frontend: http://localhost:3000
- GraphQL API: http://localhost:4000/graphql
- Auth Service: http://localhost:3002/health

5. **Stop all services**
```bash
docker-compose down
```

### Development without Docker

If you prefer local development without Docker:

1. **Install dependencies**
```bash
cd my-space-fpa
pnpm install
```

2. **Start PostgreSQL and Redis locally** (requires local installation)
```bash
# PostgreSQL must be running on localhost:5432
# Redis must be running on localhost:6379
```

3. **Start backend services**
```bash
pnpm run dev:services
```

4. **Start frontend (in another terminal)**
```bash
pnpm run dev:web
```

## Production Deployment

### Build Docker Images

```bash
cd my-space-fpa
docker-compose build
```

### Deploy to Cloud Platforms

#### Heroku
```bash
# Build and push to Heroku
heroku login
heroku create myspace-api-gateway
heroku create myspace-auth-service
heroku create myspace-web

# Set environment variables
heroku config:set JWT_SECRET=your-production-secret
heroku config:set DATABASE_URL=your-production-db-url

# Deploy
git push heroku main
```

#### AWS ECS
```bash
# Create ECR repositories
aws ecr create-repository --repository-name myspace-api-gateway
aws ecr create-repository --repository-name myspace-auth-service
aws ecr create-repository --repository-name myspace-web

# Build and push images
docker build -t myspace-api-gateway:latest ./services/api-gateway
docker tag myspace-api-gateway:latest {AWS_ACCOUNT_ID}.dkr.ecr.{REGION}.amazonaws.com/myspace-api-gateway:latest
docker push {AWS_ACCOUNT_ID}.dkr.ecr.{REGION}.amazonaws.com/myspace-api-gateway:latest
```

#### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and link project
railway login
railway link

# Deploy
railway up
```

#### Vercel (Frontend Only)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd apps/web
vercel
```

## Environment Variables

### Frontend (.env.production)
```
NEXT_PUBLIC_API_URL=https://api.myspace.com/graphql
NEXT_PUBLIC_AUTH_SERVICE_URL=https://auth.myspace.com
```

### API Gateway (.env.production)
```
NODE_ENV=production
PORT=4000
JWT_SECRET=your-production-secret-key-min-32-chars
AUTH_SERVICE_URL=http://auth-service:3002
DATABASE_URL=postgresql://user:password@db-host:5432/myspace
REDIS_URL=redis://cache-host:6379
LOG_LEVEL=info
```

### Auth Service (.env.production)
```
NODE_ENV=production
PORT=3002
JWT_SECRET=your-production-secret-key-min-32-chars
DATABASE_URL=postgresql://user:password@db-host:5432/myspace
REDIS_URL=redis://cache-host:6379
LOG_LEVEL=info
```

## Database Migration

Before first deployment, run migrations:

```bash
# From my-space-fpa directory
pnpm run db:migrate
pnpm run db:seed  # Optional: seed with demo data
```

## Monitoring

### Docker Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api-gateway
docker-compose logs -f auth-service
docker-compose logs -f web
```

### Health Checks
```bash
curl http://localhost:4000/health
curl http://localhost:3002/health
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :3000
lsof -i :4000
lsof -i :3002
lsof -i :5432
lsof -i :6379

# Kill process
kill -9 <PID>
```

### Database Connection Issues
```bash
# Check PostgreSQL is running
docker-compose ps postgres

# Reset database
docker-compose down -v
docker-compose up -d postgres
```

### Service Won't Start
```bash
# View service logs
docker-compose logs service-name

# Rebuild service
docker-compose build --no-cache service-name
docker-compose up -d service-name
```

## Performance Optimization

### Frontend
- Enable image optimization in Next.js
- Use CDN for static assets
- Enable compression
- Set up caching headers

### Backend
- Use connection pooling for database
- Enable Redis caching
- Optimize GraphQL queries
- Set up rate limiting

## Security Checklist

- [ ] Change default JWT_SECRET
- [ ] Set strong database passwords
- [ ] Enable HTTPS in production
- [ ] Set CORS properly for frontend URL
- [ ] Enable database backups
- [ ] Set up WAF (Web Application Firewall)
- [ ] Enable API rate limiting
- [ ] Use environment variables for secrets
- [ ] Implement API authentication
- [ ] Enable logging and monitoring

## Scaling

For horizontal scaling:

1. **Load Balancing**: Use Nginx, HAProxy, or cloud provider load balancer
2. **Database**: Switch to managed PostgreSQL with replication
3. **Cache**: Use managed Redis with clustering
4. **API Gateway**: Run multiple instances behind load balancer
5. **Frontend**: Deploy to CDN with multiple regions

## Backup & Recovery

```bash
# Backup database
pg_dump myspace > backup.sql

# Restore database
psql myspace < backup.sql

# Backup Redis
redis-cli BGSAVE
```

## Support

For issues and questions:
- Check logs: `docker-compose logs`
- Open issue on GitHub
- Contact: support@myspace.com
