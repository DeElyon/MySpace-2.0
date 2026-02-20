#!/bin/bash

# MySpace 2.0 - Stop Script
# This script stops the entire application stack

set -e

echo "🛑 MySpace 2.0 - Stopping Application Stack"
echo "==========================================="

cd my-space-fpa

echo "Stopping services..."
docker-compose down

echo ""
echo "✓ All services stopped"
echo ""
echo "To view logs of stopped containers:"
echo "  docker-compose logs"
echo ""
echo "To remove all data (including database):"
echo "  docker-compose down -v"
