$ErrorActionPreference = "Stop"

$RepoPath = "C:\Users\PC\Downloads\icefire-web"
$Cloudflared = Join-Path $RepoPath "cloudflared.exe"

$WebhookId = "671713082"
$Repo = "arangoarangojoansebastian0-afk/Ice-and-fire"

# Debe coincidir con webhook-server.cjs
$Secret = "e86d80a2bcebff5b34b91f6857acc268e007dae003b7a1a5"

Write-Host "==============================================="
Write-Host " Ice and Fire - Webhook Auto Updater"
Write-Host "==============================================="
Write-Host ""

# ============================================================
# 1. Comprobar GitHub CLI
# ============================================================

Write-Host "[1/4] Comprobando GitHub CLI..."

gh auth status

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] GitHub CLI no esta autenticado."
    exit 1
}

Write-Host "[OK] GitHub CLI autenticado."
Write-Host ""

# ============================================================
# 2. Comprobar / iniciar servidor webhook
# ============================================================

Write-Host "[2/4] Comprobando servidor webhook..."

$nodeProcess = Get-CimInstance Win32_Process -Filter "Name = 'node.exe'" |
    Where-Object {
        $_.CommandLine -like "*webhook-server.cjs*"
    }

if ($nodeProcess) {

    Write-Host "[OK] webhook-server.cjs ya esta ejecutandose."

}
else {

    Write-Host "Iniciando webhook-server.cjs..."

    Start-Process `
        -FilePath "node.exe" `
        -ArgumentList "`"$RepoPath\webhook-server.cjs`"" `
        -WorkingDirectory $RepoPath `
        -WindowStyle Minimized

    Start-Sleep -Seconds 3

    Write-Host "[OK] Servidor iniciado."
}

Write-Host ""

# ============================================================
# 3. Iniciar Cloudflare
# ============================================================

Write-Host "[3/4] Iniciando Cloudflare Tunnel..."

# Cerrar cualquier cloudflared anterior
Get-Process cloudflared -ErrorAction SilentlyContinue |
    Stop-Process -Force -ErrorAction SilentlyContinue

Start-Sleep -Seconds 1

$LogFile = Join-Path $env:TEMP "icefire-cloudflared.log"
$ErrFile = Join-Path $env:TEMP "icefire-cloudflared-error.log"

Remove-Item $LogFile -Force -ErrorAction SilentlyContinue
Remove-Item $ErrFile -Force -ErrorAction SilentlyContinue

$cloudflared = Start-Process `
    -FilePath $Cloudflared `
    -ArgumentList "tunnel --url http://localhost:3939" `
    -WorkingDirectory $RepoPath `
    -RedirectStandardOutput $LogFile `
    -RedirectStandardError $ErrFile `
    -PassThru `
    -WindowStyle Hidden

Write-Host "[OK] Cloudflare iniciado."
Write-Host "PID: $($cloudflared.Id)"
Write-Host ""

# ============================================================
# 4. Esperar URL de Cloudflare
# ============================================================

Write-Host "Esperando URL publica de Cloudflare..."
Write-Host ""

$PublicUrl = $null
$Timeout = 60

for ($i = 1; $i -le $Timeout; $i++) {

    Start-Sleep -Seconds 1

    $Text = ""

    if (Test-Path $LogFile) {
        $Text += Get-Content $LogFile -Raw -ErrorAction SilentlyContinue
    }

    if (Test-Path $ErrFile) {
        $Text += Get-Content $ErrFile -Raw -ErrorAction SilentlyContinue
    }

    $Match = [regex]::Match(
        $Text,
        'https://[a-zA-Z0-9-]+\.trycloudflare\.com'
    )

    if ($Match.Success) {
        $PublicUrl = $Match.Value
        break
    }

    Write-Host "`rEsperando Cloudflare... $i/$Timeout segundos" -NoNewline
}

Write-Host ""
Write-Host ""

if (-not $PublicUrl) {

    Write-Host "[ERROR] No se pudo detectar la URL de Cloudflare."
    Write-Host ""

    if (Test-Path $LogFile) {
        Write-Host "===== CLOUDflared STDOUT ====="
        Get-Content $LogFile
    }

    if (Test-Path $ErrFile) {
        Write-Host "===== CLOUDflared STDERR ====="
        Get-Content $ErrFile
    }

    exit 1
}

$WebhookUrl = "$PublicUrl/webhook"

Write-Host "[OK] URL detectada:"
Write-Host $PublicUrl
Write-Host ""

Write-Host "Webhook:"
Write-Host $WebhookUrl
Write-Host ""

# ============================================================
# 5. Actualizar configuracion del webhook de GitHub
# ============================================================

Write-Host "[4/4] Actualizando webhook de GitHub..."
Write-Host ""

gh api `
    --method PATCH `
    "repos/$Repo/hooks/$WebhookId/config" `
    -f "url=$WebhookUrl" `
    -f "content_type=json" `
    -f "insecure_ssl=0" `
    -f "secret=$Secret"

if ($LASTEXITCODE -ne 0) {

    Write-Host ""
    Write-Host "[ERROR] No se pudo actualizar el webhook de GitHub."
    exit 1
}

Write-Host ""
Write-Host "==============================================="
Write-Host " WEBHOOK ACTUALIZADO CORRECTAMENTE"
Write-Host "==============================================="
Write-Host ""
Write-Host "Nueva URL:"
Write-Host $WebhookUrl
Write-Host ""
Write-Host "GitHub -> Cloudflare -> localhost:3939"
Write-Host ""
Write-Host "El sistema ya esta funcionando."
Write-Host ""
# ============================================================
# Mantener el script vivo mientras Cloudflare siga funcionando
# ============================================================

while (-not $cloudflared.HasExited) {
    Start-Sleep -Seconds 5
}

Write-Host ""
Write-Host "[!] Cloudflare Tunnel se cerro."