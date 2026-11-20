#!/usr/bin/env bash

# Resolve project directory
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

PID_FILE="$PROJECT_DIR/.server.pid"

# Colors for terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

STOPPED=false

# 1. Stop process using PID file
if [ -f "$PID_FILE" ]; then
  PID=$(cat "$PID_FILE")
  if ps -p "$PID" > /dev/null 2>&1; then
    echo -e "${BLUE}🛑 Stopping server (PID: $PID)...${NC}"
    # Kill child processes if any
    pkill -P "$PID" 2>/dev/null || true
    kill "$PID" 2>/dev/null || true

    # Wait up to 5 seconds for graceful shutdown
    COUNT=0
    while ps -p "$PID" > /dev/null 2>&1 && [ $COUNT -lt 5 ]; do
      sleep 1
      COUNT=$((COUNT + 1))
    done

    # Force kill if still running
    if ps -p "$PID" > /dev/null 2>&1; then
      echo -e "${YELLOW}⚠️ Process did not exit gracefully, force killing (PID: $PID)...${NC}"
      kill -9 "$PID" 2>/dev/null || true
    fi

    STOPPED=true
  fi
  rm -f "$PID_FILE"
fi

# 2. Check for any remaining processes on port 5173
PORT_PIDS=$(lsof -ti :5173 2>/dev/null || true)
if [ -n "$PORT_PIDS" ]; then
  echo -e "${YELLOW}🛑 Cleaning up remaining process(es) on port 5173 (PID: $PORT_PIDS)...${NC}"
  for P in $PORT_PIDS; do
    kill "$P" 2>/dev/null || true
  done
  sleep 1
  for P in $PORT_PIDS; do
    if ps -p "$P" > /dev/null 2>&1; then
      kill -9 "$P" 2>/dev/null || true
    fi
  done
  STOPPED=true
fi

# 3. Clean up any lingering vite process for this specific project folder
LINGERING_PIDS=$(pgrep -f "vite.*megamind-site" 2>/dev/null || true)
if [ -n "$LINGERING_PIDS" ]; then
  for P in $LINGERING_PIDS; do
    kill "$P" 2>/dev/null || true
  done
  STOPPED=true
fi

if [ "$STOPPED" = true ]; then
  echo -e "${GREEN}✅ Megamind site server has been stopped.${NC}"
else
  echo -e "${YELLOW}ℹ️  No running Megamind site server found.${NC}"
fi
