Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Set-Location (Split-Path -Parent $PSScriptRoot)

$map = [ordered]@{
    generatedAt = (Get-Date).ToString('s')
    root = (Get-Location).Path
    apk = [ordered]@{
        root = 'apk'
        keyFiles = @(
            'apk/package.json',
            'apk/vite.config.ts',
            'apk/capacitor.config.json',
            'apk/src/App.tsx',
            'apk/src/main.tsx'
        )
    }
    exe = [ordered]@{
        root = 'exe/GestionReservations'
        project = 'exe/GestionReservations/GestionReservations.csproj'
        layers = [ordered]@{
            models = (Get-ChildItem 'exe/GestionReservations/Models' -File | Select-Object -ExpandProperty Name)
            services = (Get-ChildItem 'exe/GestionReservations/Services' -File | Select-Object -ExpandProperty Name)
            viewModels = (Get-ChildItem 'exe/GestionReservations/ViewModels' -File | Select-Object -ExpandProperty Name)
            views = (Get-ChildItem 'exe/GestionReservations/Views' -File | Select-Object -ExpandProperty Name)
            documents = (Get-ChildItem 'exe/GestionReservations/Documents' -File | Select-Object -ExpandProperty Name)
        }
    }
    serveur = [ordered]@{
        root = 'serveur'
        mode = 'embedded-in-exe'
        endpoint = 'http://localhost:5001/webhook/reservation'
    }
    compileurs = [ordered]@{
        root = 'compileurs'
        scripts = @(
            'compileurs/Build-All.ps1',
            'compileurs/Generate-InfrastructureMap.ps1'
        )
    }
}

$target = 'compileurs/infrastructure-map.json'
$map | ConvertTo-Json -Depth 8 | Set-Content $target -Encoding UTF8
Write-Host "Infrastructure map generated: $target"
