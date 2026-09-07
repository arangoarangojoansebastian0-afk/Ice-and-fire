Set WshShell = CreateObject("WScript.Shell")

repo = "C:\Users\PC\Downloads\icefire-web"

WshShell.CurrentDirectory = repo

' Iniciar todo el sistema de webhook de forma oculta.
' El BAT se encarga de:
' 1. Comprobar GitHub CLI
' 2. Iniciar webhook-server.cjs
' 3. Iniciar Cloudflare Tunnel
' 4. Detectar la nueva URL trycloudflare.com
' 5. Actualizar automaticamente el webhook de GitHub

WshShell.Run "cmd.exe /c """ & repo & "\start-webhook-system.bat""", 0, False