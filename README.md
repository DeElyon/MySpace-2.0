# 🚀 My Space FPA - Complete Full-Stack Platform

> **Shaping Visions in 2026** - A next-generation freelancing platform by EL VERSE

[![Build Status](https://github.com/el-verse/my-space-fpa/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/el-verse/my-space-fpa/actions)
[![License](https://img.shields.io/badge/license-proprietary-blue.svg)](my-space-fpa/LICENSE)

---

## 📋 Table of Contents

- [Overview](my-space-fpa/README.md#overview)
- [Features](my-space-fpa/README.md#features)
- [Tech Stack](my-space-fpa/README.md#tech-stack)
- [Architecture](my-space-fpa/README.md#architecture)
- [Getting Started](my-space-fpa/README.md#getting-started)
- [Project Structure](my-space-fpa/README.md#project-structure)
- [API Documentation](my-space-fpa/README.md#api-documentation)
- [Deployment](my-space-fpa/README.md#deployment)
- [Monitoring](my-space-fpa/README.md#monitoring)
- [Contributing](my-space-fpa/README.md#contributing)

---

## 🎯 Overview

My Space FPA is a comprehensive freelancing platform that combines the best features of Upwork, Fiverr, and LinkedIn with localized payment solutions for the African market. Built with cutting-edge technology including real-time collaboration tools, AI-powered matching, and immersive development environments.

### Key Differentiators

- 🎥 **Native Video Conferencing** - HD video calls integrated directly into the platform
- 💻 **Cloud IDE** - Real-time collaborative coding environment with AI pair programmer
- 🎨 **Interactive Whiteboard** - Infinite canvas for brainstorming and wireframing
- 🤖 **AI-Powered Matching** - 95% accuracy job-freelancer matching
- 💰 **Multi-Currency Wallet** - NGN, USD, GBP, EUR with instant transfers
- 🔒 **Biometric Security** - Fingerprint authentication for payments

---

## ✨ Features

### Frontend Features
- ✅ Landing page with hero, features, testimonials
- ✅ 4-step registration with payment verification
- ✅ Smart dashboard with AI insights
- ✅ Job marketplace with AI matching
- ✅ Multi-currency wallet management
- ✅ HD video/audio meeting interface
- ✅ Real-time whiteboard collaboration
- ✅ Cloud IDE with live collaboration
- ✅ Project submission hub
- ✅ Professional network management
- ✅ Real-time messaging
- ✅ Analytics dashboard
- ✅ Comprehensive settings (Account, Privacy, Notifications, AI)

### Backend Services
- ✅ **API Gateway** - GraphQL federation (Node.js/Apollo)
- ✅ **Auth Service** - JWT, OAuth2, 2FA (Go/Gin)
- ✅ **User Service** - Profiles, settings, social (Node.js/NestJS)
- ✅ **Job Service** - Job posting, search, matching (Python/FastAPI)
- ✅ **Payment Service** - Wallet, escrow, transactions (Java/Spring Boot)
- ✅ **Messaging Service** - Real-time chat, presence (Elixir/Phoenix)

### Infrastructure
- ✅ Docker containerization
- ✅ Kubernetes orchestration
- ✅ Terraform IaC
- ✅ CI/CD with GitHub Actions
- ✅ Prometheus + Grafana monitoring
- ✅ PostgreSQL + Redis data layer
- ✅ Elasticsearch for search

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.6 | React Framework (App Router) |
| React | 19.2.3 | UI Library |
| TypeScript | 5.4+ | Type Safety |
| Tailwind CSS | 4.0 | Styling |
| @msf/ui | 1.0.0 | Custom Component Library |

### Backend
| Service | Language | Framework | Database |
|---------|----------|-----------|----------|
| API Gateway | Node.js | Apollo GraphQL | Redis |
| Auth Service | Go | Gin | PostgreSQL + Redis |
| User Service | Node.js | NestJS | PostgreSQL |
| Job Service | Python | FastAPI | PostgreSQL + Elasticsearch |
| Payment Service | Java | Spring Boot | PostgreSQL + Redis |
| Messaging | Elixir | Phoenix | PostgreSQL + Redis |

### Infrastructure
| Technology | Version | Purpose |
|------------|---------|---------|
| Docker | 26.x | Containerization |
| Kubernetes | 1.29 | Orchestration |
| Terraform | 1.7 | Infrastructure as Code |
| PostgreSQL | 16 | Primary Database |
| Redis | 7.2 | Caching + Pub/Sub |
| Elasticsearch | 8.12 | Search Engine |
| Prometheus | latest | Metrics Collection |
| Grafana | latest | Visualization |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    🎯 FRONTEND LAYER                         │
│  Web (Next.js 16) + Mobile (React Native) + Desktop (Tauri)  │
├─────────────────────────────────────────────────────────────┤
│                    🌐 API GATEWAY                             │
│              GraphQL Federation (Apollo)                     │
├─────────────────────────────────────────────────────────────┤
│                    ⚙️ MICROSERVICES LAYER                     │
│  Auth (Go) · User (Node) · Job (Python) · Payment (Java)    │
│  Messaging (Elixir) · Video (C++) · IDE (Rust)              │
├─────────────────────────────────────────────────────────────┤
│                    💾 DATA LAYER                               │
│  PostgreSQL · Redis · Elasticsearch · S3                    │
├─────────────────────────────────────────────────────────────┤
│                    ☁️ INFRASTRUCTURE                          │
│  Docker · Kubernetes · AWS · Cloudflare · GitHub Actions    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- pnpm 9.0+
- Docker & Docker Compose
- Go 1.22+ (for auth service)
- Python 3.12+ (for job service)
- Java 21+ (for payment service)

### Local Development

```bash
# Clone the repository
git clone https://github.com/el-verse/my-space-fpa.git
cd my-space-fpa

# Install dependencies
pnpm install

# Start infrastructure (PostgreSQL, Redis, Elasticsearch)
pnpm docker:up

# Run all services in development mode
pnpm dev

# Or run individual services
pnpm dev:web          # Frontend
pnpm --filter api-gateway dev
pnpm --filter user-service dev
pnpm --filter job-service dev
```

### Access Points

| Service | URL | Description |
|---------|-----|-------------|
| Web App | http://localhost:3000 | Main application |
| API Gateway | http://localhost:4000/graphql | GraphQL API |
| User Service | http://localhost:3001 | User management |
| Job Service | http://localhost:3002 | Job management |
| Grafana | http://localhost:3005 | Monitoring dashboard |

---

## 📁 Project Structure

```
my-space-fpa/
├── apps/
│   └── web/                    # Next.js web application
│       ├── app/                # App Router pages
│       ├── components/         # React components
│       └── Dockerfile
│
├── packages/
│   ├── ui/                     # Shared UI components
│   └── config/                 # Shared configurations
│
├── services/
│   ├── api-gateway/            # GraphQL Gateway (Node.js)
│   ├── auth-service/           # Authentication (Go)
│   ├── user-service/           # User management (Node.js)
│   ├── job-service/            # Job management (Python)
│   ├── payment-service/        # Payments (Java)
│   └── messaging-service/      # Real-time chat (Elixir)
│
├── infrastructure/
│   ├── terraform/              # Terraform configurations
│   ├── k8s/                    # Kubernetes manifests
│   └── monitoring/             # Prometheus/Grafana configs
│
├── docker-compose.yml          # Local development stack
└── package.json                # Monorepo root
```

---

## 📚 API Documentation

### GraphQL Schema

The API Gateway exposes a GraphQL endpoint at `http://localhost:4000/graphql`

#### Key Queries

```graphql
# Get current user
query {
  me {
    id
    msf_id
    email
    display_name
    wallet_balance
  }
}

# Search jobs
query {
  jobs(limit: 10, status: OPEN) {
    msf_id
    title
    budget_min
    skills_required
    ai_match_score
  }
}

# Get wallet
query {
  wallet {
    balance_ngn
    balance_usd
    tier
    kyc_verified
  }
}
```

#### Key Mutations

```graphql
# Create job
mutation {
  createJob(input: {
    title: "Full-Stack Developer"
    description: "..."
    budget_min: 250000
    skills_required: ["React", "Node.js"]
  }) {
    msf_id
    title
  }
}

# Submit proposal
mutation {
  createProposal(input: {
    job_id: "1"
    cover_letter: "..."
    proposed_budget: 200000
  }) {
    id
    status
  }
}
```

### REST APIs

Each microservice also exposes REST endpoints:

- **User Service**: `http://localhost:3001/api/docs` (Swagger)
- **Job Service**: `http://localhost:3002/docs` (FastAPI)
- **Auth Service**: `http://localhost:3000/health`

---

## 🌐 Deployment

### Production Deployment

```bash
# Build all Docker images
pnpm docker:build

# Apply Terraform infrastructure
cd infrastructure/terraform
terraform init
terraform apply

# Deploy to Kubernetes
kubectl apply -f infrastructure/k8s/

# Monitor rollout
kubectl rollout status deployment/api-gateway -n my-space-fpa
```

### Environment Variables

Create `.env` files in each service directory:

```env
# API Gateway
PORT=4000
JWT_SECRET=your-secret-key
AUTH_SERVICE_URL=http://auth-service:3000
USER_SERVICE_URL=http://user-service:3001
JOB_SERVICE_URL=http://job-service:3002

# Database
DATABASE_URL=postgresql://user:pass@host:5432/my_space_fpa
REDIS_URL=redis://:password@host:6379
```

---

## 📊 Monitoring

### Prometheus Metrics

- API response times (p50, p95, p99)
- Error rates per service
- Database connection pool usage
- Cache hit/miss ratios
- Business metrics (jobs posted, proposals, transactions)

### Grafana Dashboards

Access Grafana at `http://localhost:3005` (admin/admin)

Pre-configured dashboards:
- System Overview
- Service Health
- Database Performance
- Business Metrics
- Error Tracking

---

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests for specific service
pnpm --filter user-service test

# Run E2E tests
pnpm test:e2e

# Run performance tests
pnpm test:perf
```

---

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- TypeScript/JavaScript: ESLint + Prettier
- Python: Black + Ruff
- Go: gofmt + golangci-lint
- Commit messages: Conventional Commits

---

## 📄 License

This project is proprietary software owned by EL VERSE. All rights reserved.

---

## 👥 Team

- **Product Director**: Jerry Cebastian
- **CEO**: Supreme Elyon
- **Head of AI**: Leonard Ola
- **UX Director**: Ezekiel Ahmed
- **Security Lead**: Yusuf Jamal

---

## 📞 Support

For support, email support@myspacefpa.com or join our Discord community.

---

**© 2026 EL VERSE - My Space FPA**
*"Shaping Visions in the Digital Age"*
