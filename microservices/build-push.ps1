$services = @("gateway", "auth", "service", "booking", "designer", "transaction", "review", "gallery")
$acrLoginServer = "nailsalonacr.azurecr.io"
$tag = "latest"

foreach ($service in $services) {
    Write-Host "🚧 Building $service ..."
    docker build -t $service ".\$service"

    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed for $service. Skipping tag/push."
        continue
    }

    Write-Host "🧱 Tagging $service ..."
    docker tag $service "${acrLoginServer}/${service}:${tag}"

    Write-Host "🚀 Pushing $service..."
    docker push "${acrLoginServer}/${service}:${tag}"

    Write-Host "✅ Done with $service"
    Write-Host "----------------------"
}
