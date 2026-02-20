# MySpace 2.0 - Architecture & System Design

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     🌐 USER BROWSER                          │
├─────────────────────────────────────────────────────────────┤
│                   Frontend (Next.js 16)                      │
│              http://localhost:3000                           │
│  - React components, pages, SSR, static generation           │
│  - Tailwind CSS styling                                      │
│  - GraphQL client (Apollo)                                   │
├─────────────────────────────────────────────────────────────┤
│              NETWORK (HTTP/HTTPS + WebSocket)               │
├─────────────────────────────────────────────────────────────┤
│            🔌 API Gateway (Apollo GraphQL)                   │
│              http://localhost:4000                           │
│  - Unified GraphQL endpoint                                  │
│  - Request routing & validation                              │
│  - JWT token verification                                    │
│  - Rate limiting                                             │
├─────────────────────────────────────────────────────────────┤
│              Microservices Communication                     │
│  ┌─────────────────┐      ┌─────────────────┐              │
│  │  Auth Service   │      │  Job Service    │              │
│  │  :3002          │      │  (planned)      │              │
│  └────────┬────────┘      └────────┬────────┘              │
│           │                        │                        │
│    JWT Generation           Job Matching                    │
│    User Auth                Proposals                       │
├─────────────────────────────────────────────────────────────┤
│              💾 Data Layer                                    │
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │   PostgreSQL     │  │      Redis       │               │
│  │   :5432          │  │   :6379          │               │
│  │                  │  │                  │               │
│  │ - User data      │  │ - Sessions       │               │
│  │ - Jobs           │  │ - Cache          │               │
│  │ - Proposals      │  │ - Rate limits    │               │
│  │ - Transactions   │  │ - Pub/Sub        │               │
│  └──────────────────┘  └──────────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

## Service Architecture

### Frontend Service
**Technology**: Next.js 16 + React 19 + TypeScript + Tailwind CSS

**Responsibilities**:
- User interface and experience
- Server-side rendering for SEO
- Static site generation for performance
- Client-side state management
- Form handling and validation
- Authentication UI

**Port**: 3000
**Environment**: `/my-space-fpa/apps/web/`

### API Gateway
**Technology**: Node.js + Apollo GraphQL + Express

**Responsibilities**:
- GraphQL API endpoint
- Schema composition
- Request validation
- Authentication middleware
- Error handling
- Logging and monitoring

**Port**: 4000
**Endpoint**: `/graphql`
**Environment**: `/my-space-fpa/services/api-gateway/`

**GraphQL Schema**:
```graphql
type Query {
  me: User
  jobs: [Job!]!
  wallet: Wallet
  conversations: [Conversation!]!
}

type Mutation {
  register(input: RegisterInput!): AuthPayload!
  login(email: String!, password: String!): AuthPayload!
  createJob(input: CreateJobInput!): Job!
  createProposal(input: CreateProposalInput!): Proposal!
}
```

### Auth Service
**Technology**: Node.js + Express + JWT + Bcrypt

**Responsibilities**:
- User registration and login
- JWT token generation and validation
- Password hashing and verification
- Session management
- User profile management

**Port**: 3002
**Endpoints**:
- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /verify` - Verify JWT token
- `GET /health` - Health check

**Environment**: `/my-space-fpa/services/auth-service/`

## Data Flow

### User Registration Flow
```
1. Frontend → Auth Service (POST /register)
   - Email, password, account type
   
2. Auth Service → PostgreSQL
   - Hash password with bcrypt
   - Store user record
   
3. Auth Service → JWT
   - Generate access token
   - Return token to frontend
   
4. Frontend → localStorage
   - Store JWT token
   - Use for authenticated requests
```

### Job Query Flow
```
1. Frontend → GraphQL Query (jobs)
   - Include JWT in Authorization header
   
2. API Gateway
   - Verify JWT token
   - Validate query
   - Parse request
   
3. API Gateway → PostgreSQL
   - Query job records
   - Apply filters/pagination
   - Cache results in Redis
   
4. PostgreSQL → API Gateway
   - Return job data
   
5. API Gateway → Frontend
   - Return GraphQL response
   - Include cache headers
```

### Authentication Flow
```
1. User logs in via Frontend
   ↓
2. Frontend sends credentials to Auth Service
   ↓
3. Auth Service hashes password and compares
   ↓
4. Auth Service generates JWT token
   ↓
5. Frontend stores JWT in localStorage/cookies
   ↓
6. Frontend includes JWT in Authorization header for API calls
   ↓
7. API Gateway verifies JWT signature
   ↓
8. Request proceeds or is rejected
```

## Database Schema (PostgreSQL)

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  msf_id VARCHAR(20) UNIQUE,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  username VARCHAR(50) UNIQUE,
  display_name VARCHAR(255),
  account_type ENUM('FREELANCER', 'CLIENT', 'COMPANY', 'AGENCY'),
  profile_completion INT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Jobs Table
```sql
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  msf_id VARCHAR(20) UNIQUE,
  client_id INT REFERENCES users(id),
  title VARCHAR(255),
  description TEXT,
  category VARCHAR(50),
  budget_min DECIMAL(10,2),
  budget_max DECIMAL(10,2),
  status ENUM('OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'),
  skills_required TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Proposals Table
```sql
CREATE TABLE proposals (
  id SERIAL PRIMARY KEY,
  job_id INT REFERENCES jobs(id),
  freelancer_id INT REFERENCES users(id),
  cover_letter TEXT,
  proposed_budget DECIMAL(10,2),
  status ENUM('PENDING', 'SHORTLISTED', 'ACCEPTED', 'REJECTED'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Caching Strategy (Redis)

| Key | TTL | Purpose |
|-----|-----|---------|
| `user:{userId}` | 1 hour | User profile data |
| `jobs:list` | 5 mins | Jobs listing cache |
| `session:{sessionId}` | 7 days | Session data |
| `rate_limit:{userId}` | 1 min | API rate limiting |

## Environment Variables

### Frontend
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/graphql
NEXT_PUBLIC_AUTH_SERVICE_URL=http://localhost:3002
```

### API Gateway
```env
PORT=4000
JWT_SECRET=dev-secret-key
AUTH_SERVICE_URL=http://localhost:3002
DATABASE_URL=postgresql://user:password@localhost:5432/myspace
REDIS_URL=redis://localhost:6379
```

### Auth Service
```env
PORT=3002
JWT_SECRET=dev-secret-key
DATABASE_URL=postgresql://user:password@localhost:5432/myspace
REDIS_URL=redis://localhost:6379
```

## Deployment Architecture

### Development
- Docker Compose manages all services
- Shared PostgreSQL and Redis
- Hot reload for code changes
- Console logging

### Production
- Kubernetes or Docker Swarm orchestration
- Managed PostgreSQL (RDS, CloudSQL, etc.)
- Managed Redis (ElastiCache, Memorystore, etc.)
- Load balancer (Nginx, HAProxy, Cloud LB)
- CDN for static assets
- Monitoring stack (Prometheus, Grafana)

## API Rate Limiting

- **Default**: 100 requests per minute per user
- **Authenticated**: 1000 requests per minute
- **Public endpoints**: 10 requests per minute

## Error Handling

### Frontend Error Handling
```typescript
try {
  const response = await apolloClient.query(/* ... */);
} catch (error) {
  if (error.networkError) {
    // Handle network error
  } else if (error.graphQLErrors) {
    // Handle GraphQL errors
  }
}
```

### API Gateway Error Handling
```typescript
// GraphQL errors with context
throw new ApolloError('Job not found', 'JOB_NOT_FOUND', {
  statusCode: 404
});
```

### Service Communication Error Handling
- Retry logic with exponential backoff
- Circuit breaker pattern
- Fallback responses
- Error logging to external service

## Security Features

1. **Authentication**: JWT tokens
2. **Authorization**: Role-based access control (RBAC)
3. **Encryption**: HTTPS in production, password hashing
4. **Rate Limiting**: Per-user request limits
5. **Input Validation**: GraphQL schema validation
6. **CORS**: Configured per environment
7. **SQL Injection Prevention**: Parameterized queries
8. **XSS Prevention**: Content Security Policy headers

## Performance Optimizations

1. **Frontend**:
   - Next.js automatic code splitting
   - Image optimization
   - CSS-in-JS optimization
   - Service worker caching

2. **Backend**:
   - Database connection pooling
   - Redis caching layer
   - Query optimization
   - Lazy loading relationships

3. **Network**:
   - CDN for static files
   - Gzip compression
   - HTTP/2 support
   - Connection keep-alive

## Monitoring & Logging

### Application Logs
- Frontend: Browser console + Sentry integration (planned)
- Backend: Winston/Pino logger to stdout

### Metrics to Monitor
- API response time (p50, p95, p99)
- Error rates by endpoint
- Cache hit/miss ratio
- Database connection pool usage
- Request volume and throughput

### Health Checks
```bash
# API Gateway
curl http://localhost:4000/health

# Auth Service
curl http://localhost:3002/health

# Database
curl http://localhost:5432/health
```

## Scaling Strategy

1. **Horizontal Scaling**:
   - Multiple API Gateway instances
   - Load balancer (round-robin)
   - Shared database and cache

2. **Vertical Scaling**:
   - Increase server resources
   - Optimize code and queries
   - Database tuning

3. **Caching Strategy**:
   - Redis for hot data
   - CDN for static content
   - Browser caching for client

4. **Database Optimization**:
   - Connection pooling
   - Query optimization
   - Partitioning large tables
   - Replication for read scaling

## Technology Decisions

| Choice | Why |
|--------|-----|
| Next.js | SSR, Static generation, API routes, great DX |
| GraphQL | Single endpoint, strong typing, efficient queries |
| PostgreSQL | ACID compliance, relational data, reliability |
| Redis | Fast caching, pub/sub, session management |
| Node.js | JavaScript ecosystem, event-driven, scalable |
| JWT | Stateless auth, scalable, works with microservices |
| Docker | Consistency across environments, easy deployment |

## Future Improvements

1. **Microservices**:
   - Job service (Python/FastAPI)
   - Payment service (Java/Spring)
   - Messaging service (Elixir/Phoenix)

2. **Real-time Features**:
   - WebSocket support
   - Live notifications
   - Real-time messaging

3. **Advanced Features**:
   - Video conferencing
   - Cloud IDE
   - AI job matching

4. **Infrastructure**:
   - Kubernetes deployment
   - Service mesh (Istio)
   - Event-driven architecture (Kafka)
