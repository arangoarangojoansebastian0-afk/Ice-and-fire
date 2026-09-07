@echo off
setlocal

set "REPO_PATH=C:\Users\PC\Downloads\icefire-web"

cd /d "%REPO_PATH%" || exit /b 1

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%REPO_PATH%\update-cloudflare-webhook.ps1"

endlocal