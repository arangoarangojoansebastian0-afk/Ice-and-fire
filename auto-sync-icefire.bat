@echo off
setlocal enabledelayedexpansion

REM ============================================================
REM  Auto-sincronizacion de Ice and Fire
REM  Revisa si hay cambios nuevos publicados desde /admin/ (CMS)
REM  y actualiza esta carpeta local automaticamente.
REM ============================================================

set "REPO_PATH=C:\Users\PC\Downloads\icefire-web"

cd /d "%REPO_PATH%" || exit /b 1

REM Trae la info del remoto sin tocar nada local todavia
git fetch origin main >nul 2>&1

REM Cuenta cuantos commits nuevos hay en GitHub que tu no tienes
set "NEW_COMMITS=0"
for /f %%c in ('git rev-list HEAD..origin/main --count 2^>nul') do set "NEW_COMMITS=%%c"

if "%NEW_COMMITS%"=="0" (
    REM No hay nada nuevo, no hacemos nada
    exit /b 0
)

REM Si tienes cambios locales sin guardar, no tocamos nada
REM (para no arriesgarnos a perder o mezclar mal tu trabajo)
set "DIRTY="
for /f %%i in ('git status --porcelain 2^>nul') do set "DIRTY=1"

if defined DIRTY (
    powershell -NoProfile -Command "Add-Type -AssemblyName PresentationFramework; [System.Windows.MessageBox]::Show('Hay cambios nuevos publicados en la pagina, pero tienes ediciones locales sin guardar (git status). Guarda o descarta tus cambios (git add / git commit, o git checkout) y esto se sincronizara solo en el proximo intento.', 'Ice and Fire - Sincronizacion')" >nul 2>&1
    exit /b 1
)

REM Trae los cambios. --ff-only = solo si se puede hacer limpio,
REM nunca intenta mezclar ni crear conflictos por su cuenta.
git pull --ff-only origin main >nul 2>&1

if !errorlevel!==0 (
    powershell -NoProfile -Command "Add-Type -AssemblyName PresentationFramework; [System.Windows.MessageBox]::Show('Se actualizo tu carpeta local con !NEW_COMMITS! cambio(s) nuevo(s) publicados en la pagina.', 'Ice and Fire - Sincronizacion')" >nul 2>&1
) else (
    powershell -NoProfile -Command "Add-Type -AssemblyName PresentationFramework; [System.Windows.MessageBox]::Show('Habia cambios nuevos pero no se pudieron traer automaticamente (probablemente por un conflicto). Abre la terminal en la carpeta del proyecto y corre: git pull', 'Ice and Fire - Sincronizacion')" >nul 2>&1
)

endlocal
