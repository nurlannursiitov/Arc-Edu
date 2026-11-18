#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR/backend"

echo "=================================================="
echo "  Starting Platonus 2.0 NextGen FastAPI Backend   "
echo "  Swagger UI: http://127.0.0.1:8000/docs          "
echo "=================================================="

./venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

