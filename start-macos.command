#!/bin/bash

clear
echo "============================================"
echo "       Smart Home Builder Launcher"
echo "============================================"
echo
echo "Starting the application..."
echo "This may take a moment on the first launch."
echo

# Backend
cd "$(dirname "$0")/bundler-backend" || exit
npm install >/dev/null
osascript -e 'tell application "Terminal" to do script "cd \"'"$(pwd)"'\" && npm run start:dev"'

# Frontend
cd ../bundle-builder || exit
npm install >/dev/null
osascript -e 'tell application "Terminal" to do script "cd \"'"$(pwd)"'\" && npm run dev"'

echo
echo "Waiting for the frontend to start..."
sleep 8

open http://localhost:5173

echo
echo "The application has been launched successfully."
echo "You can close this window."
sleep 3
exit