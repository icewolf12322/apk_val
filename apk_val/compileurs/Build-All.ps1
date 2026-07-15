Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Set-Location (Split-Path -Parent $PSScriptRoot)

Write-Host '==> Build EXE (.NET)'
dotnet build '.\exe\GestionReservations\GestionReservations.csproj'

Write-Host '==> Build APK (Vite)'
if (Test-Path '.\apk\package.json') {
    if (Get-Command pnpm -ErrorAction SilentlyContinue) {
        pnpm --dir '.\apk' build
    }
    elseif (Get-Command npm -ErrorAction SilentlyContinue) {
        npm --prefix '.\apk' run build
    }
    else {
        Write-Warning 'Neither pnpm nor npm is available. APK build skipped.'
    }
}

Write-Host '==> Generate infrastructure map'
powershell -ExecutionPolicy Bypass -File '.\compileurs\Generate-InfrastructureMap.ps1'
