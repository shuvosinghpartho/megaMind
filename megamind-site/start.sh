#!/usr/bin/env bash

# Resolve project directory
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

PID_FILE="$PROJECT_DIR/.server.pid"
LOG_FILE="$PROJECT_DIR/server.log"

# Colors for terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if server is already running via PID file
if [ -f "$PID_FILE" ]; then
  PID=$(cat "$PID_FILE")
  if ps -p "$PID" > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Megamind site server is already running (PID: $PID)${NC}"
    echo -e "   🌐 Local URL:    ${BLUE}http://localhost:5173${NC}"
    echo -e "   📝 View logs:    ${BLUE}tail -f server.log${NC}"
    echo -e "   🛑 Stop command: ${BLUE}./stop.sh${NC}"
    exit 0
  else
    rm -f "$PID_FILE"
  fi
fi

# Check if port 5173 is already in use by another process
PORT_PID=$(lsof -ti :5173 2>/dev/null || true)
if [ -n "$PORT_PID" ]; then
  echo -e "${YELLOW}⚠️  Port 5173 is currently in use by PID: $PORT_PID${NC}"
  echo -e "   Run ${RED}./stop.sh${NC} first to stop it."
  exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}📦 node_modules not found. Installing dependencies...${NC}"
  npm install
fi

# Support foreground mode via -f or --foreground
if [ "$1" == "--foreground" ] || [ "$1" == "-f" ]; then
  echo -e "${GREEN}🚀 Starting Megamind site in foreground mode...${NC}"
  echo -e "   Press ${YELLOW}Ctrl+C${NC} to stop."
  exec ./node_modules/.bin/vite
fi

echo -e "${BLUE}🚀 Starting Megamind site server...${NC}"

# Start detached daemon in a new session (survives terminal close)
if command -v python3 >/dev/null 2>&1; then
  python3 -c "
import subprocess
log = open('$LOG_FILE', 'a')
proc = subprocess.Popen(['./node_modules/.bin/vite'], stdin=subprocess.DEVNULL, stdout=log, stderr=subprocess.STDOUT, start_new_session=True)
with open('$PID_FILE', 'w') as f:
    f.write(str(proc.pid))
"
else
  nohup ./node_modules/.bin/vite < /dev/null >> "$LOG_FILE" 2>&1 &
  echo $! > "$PID_FILE"
fi

# Wait for server to spin up and verify health
sleep 2

if [ -f "$PID_FILE" ]; then
  SERVER_PID=$(cat "$PID_FILE")
else
  SERVER_PID=""
fi

if [ -z "$SERVER_PID" ] || ! ps -p "$SERVER_PID" > /dev/null 2>&1; then
  echo -e "${RED}❌ Server failed to start! Check logs below:${NC}"
  if [ -f "$LOG_FILE" ]; then
    tail -n 25 "$LOG_FILE"
  fi
  rm -f "$PID_FILE"
  exit 1
fi

echo -e "${GREEN}✅ Megamind site server started successfully!${NC}"
echo -e "   🆔 Process PID:  ${SERVER_PID}"
echo -e "   🌐 Local URL:     ${BLUE}http://localhost:5173${NC}"
echo -e "   📝 Live logs:     ${BLUE}tail -f server.log${NC}"
echo -e "   🛑 Stop command:  ${BLUE}./stop.sh${NC}"
