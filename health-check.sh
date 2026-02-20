#!/bin/bash

# MySpace 2.0 - Health Check Script
# Verifies all services are running and connected

set -e

echo "🏥 MySpace 2.0 - Health Check"
echo "=============================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0

# Check function
check_service() {
    local name=$1
    local url=$2
    local expected_code=${3:-200}
    
    echo -n "Checking $name... "
    
    if response=$(curl -s -w "\n%{http_code}" "$url" 2>/dev/null); then
        http_code=$(echo "$response" | tail -n1)
        if [ "$http_code" = "$expected_code" ]; then
            echo -e "${GREEN}✓${NC}"
            ((PASSED++))
        else
            echo -e "${RED}✗${NC} (HTTP $http_code)"
            ((FAILED++))
        fi
    else
        echo -e "${RED}✗${NC} (Connection refused)"
        ((FAILED++))
    fi
}

echo -e "${BLUE}🌐 Frontend Services${NC}"
check_service "Frontend (Next.js)" "http://localhost:3000" 200

echo ""
echo -e "${BLUE}🔌 Backend Services${NC}"
check_service "API Gateway (GraphQL)" "http://localhost:4000/health" 200
check_service "Auth Service" "http://localhost:3002/health" 200

echo ""
echo -e "${BLUE}💾 Data Services${NC}"

# Check PostgreSQL
echo -n "Checking PostgreSQL... "
if docker-compose -f my-space-fpa/docker-compose.yml exec -T postgres pg_isready -U myspace_user > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC}"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠${NC} (PostgreSQL not available via docker-compose)"
fi

# Check Redis
echo -n "Checking Redis... "
if docker-compose -f my-space-fpa/docker-compose.yml exec -T redis redis-cli ping > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC}"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠${NC} (Redis not available via docker-compose)"
fi

echo ""
echo -e "${BLUE}🔗 Connection Tests${NC}"

# Test GraphQL connection
echo -n "Testing GraphQL endpoint... "
if curl -s -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __typename }"}' | grep -q "data"; then
    echo -e "${GREEN}✓${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗${NC}"
    ((FAILED++))
fi

# Test Auth Service connection
echo -n "Testing Auth Service... "
if curl -s http://localhost:3002/health | grep -q "running"; then
    echo -e "${GREEN}✓${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗${NC}"
    ((FAILED++))
fi

echo ""
echo "=============================="
echo -e "Results: ${GREEN}$PASSED passed${NC}, ${RED}$FAILED failed${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All systems operational!${NC}"
    echo ""
    echo "🌐 Application URLs:"
    echo "   Frontend:    http://localhost:3000"
    echo "   GraphQL API: http://localhost:4000/graphql"
    echo "   Auth API:    http://localhost:3002"
    echo ""
    exit 0
else
    echo -e "${RED}✗ Some services are not responding${NC}"
    echo ""
    echo "Troubleshooting:"
    echo "1. Check if Docker containers are running:"
    echo "   docker-compose -f my-space-fpa/docker-compose.yml ps"
    echo ""
    echo "2. View service logs:"
    echo "   docker-compose -f my-space-fpa/docker-compose.yml logs -f"
    echo ""
    echo "3. Make sure ports are not in use:"
    echo "   lsof -i :3000"
    echo "   lsof -i :4000"
    echo "   lsof -i :3002"
    echo ""
    exit 1
fi
