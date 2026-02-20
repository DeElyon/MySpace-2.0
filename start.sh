#!/bin/bash

# MySpace 2.0 - Startup Script
# This script starts the entire application stack

set -e

echo "🚀 MySpace 2.0 - Starting Application Stack"
echo "==========================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker is not installed${NC}"
    echo "Please install Docker from https://www.docker.com"
    exit 1
fi

# Check if Docker daemon is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Docker daemon is not running${NC}"
    echo "Please start Docker Desktop or Docker daemon"
    exit 1
fi

# Navigate to my-space-fpa directory
cd my-space-fpa

echo -e "${BLUE}📦 Starting Docker Compose services...${NC}"
docker-compose up -d

# Wait for services to be healthy
echo -e "${BLUE}⏳ Waiting for services to start...${NC}"
sleep 5

# Check if services are running
echo -e "${BLUE}🔍 Checking service health...${NC}"

services=("postgres" "redis" "auth-service" "api-gateway" "web")
all_healthy=true

for service in "${services[@]}"; do
    if docker-compose ps "$service" | grep -q "Up"; then
        echo -e "${GREEN}✓${NC} $service is running"
    else
        echo -e "${YELLOW}✗${NC} $service failed to start"
        all_healthy=false
    fi
done

if [ "$all_healthy" = true ]; then
    echo ""
    echo -e "${GREEN}✓ All services are running!${NC}"
    echo ""
    echo "🌐 Application URLs:"
    echo -e "   ${BLUE}Frontend:${NC}     http://localhost:3000"
    echo -e "   ${BLUE}GraphQL API:${NC}  http://localhost:4000/graphql"
    echo -e "   ${BLUE}Auth Service:${NC} http://localhost:3002/health"
    echo ""
    echo "💾 Database:"
    echo -e "   ${BLUE}PostgreSQL:${NC} localhost:5432 (user: myspace_user)"
    echo -e "   ${BLUE}Redis:${NC}      localhost:6379"
    echo ""
    echo "📊 View logs:"
    echo -e "   ${BLUE}All:${NC}     docker-compose logs -f"
    echo -e "   ${BLUE}Service:${NC} docker-compose logs -f <service-name>"
    echo ""
    echo "⛔ Stop services:"
    echo -e "   ${BLUE}Command:${NC} docker-compose down"
    echo ""
else
    echo -e "${YELLOW}⚠️  Some services failed to start${NC}"
    echo "View detailed logs:"
    echo "  docker-compose logs"
    exit 1
fi
