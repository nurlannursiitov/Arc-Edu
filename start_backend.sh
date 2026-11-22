#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR/backend"

echo "=================================================="
echo "  Starting Arc Edu TypeScript Backend (Express)   "
echo "  URL: http://127.0.0.1:8000                      "
echo "=================================================="

npm run dev
