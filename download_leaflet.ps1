$leafletVersion = "1.9.4"
$baseUrl = "https://unpkg.com/leaflet@$leafletVersion/dist"

# Télécharger leaflet.css
Invoke-WebRequest -Uri "$baseUrl/leaflet.css" -OutFile "lib/leaflet.css"

# Télécharger leaflet.js
Invoke-WebRequest -Uri "$baseUrl/leaflet.js" -OutFile "lib/leaflet.js" 