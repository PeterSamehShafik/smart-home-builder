@echo off
title Smart Home Builder Launcher
color 0A

echo ============================================
echo        Smart Home Builder Launcher
echo ============================================
echo.
echo Starting the application...
echo This may take a moment on the first launch.
echo.

cd bundler-backend
call npm install >nul
start "Backend" cmd /k "npm run start:dev"

cd ..

cd bundle-builder
call npm install >nul
start "Frontend" cmd /k "npm run dev"

echo.
echo Waiting for the frontend to start...
timeout /t 8 /nobreak >nul

start "" http://localhost:5173

echo.
echo The application has been launched successfully.
echo You can close this window.
timeout /t 3 >nul
exit