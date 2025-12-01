@echo off
echo Installing Surge...
npm install -g surge

echo Deploying to Surge...
cd /d "%~dp0"
surge . pixel-store.surge.sh

pause
