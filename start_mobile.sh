#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR/mobile"

echo "=================================================="
echo "  Starting Platonus 2.0 Mobile App (Expo Go)      "
echo "  Scan the QR code with Expo Go on your phone     "
echo "=================================================="

npx expo start

