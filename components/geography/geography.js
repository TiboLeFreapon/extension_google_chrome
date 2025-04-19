// Liste des villes françaises avec leurs coordonnées
const frenchCities = [
    { name: 'Paris', lat: 48.8566, lng: 2.3522 },
    { name: 'Marseille', lat: 43.2965, lng: 5.3698 },
    { name: 'Lyon', lat: 45.7640, lng: 4.8357 },
    { name: 'Toulouse', lat: 43.6047, lng: 1.4442 },
    { name: 'Nice', lat: 43.7102, lng: 7.2620 },
    { name: 'Nantes', lat: 47.2184, lng: -1.5536 },
    { name: 'Strasbourg', lat: 48.5734, lng: 7.7521 },
    { name: 'Montpellier', lat: 43.6108, lng: 3.8767 },
    { name: 'Bordeaux', lat: 44.8378, lng: -0.5792 },
    { name: 'Lille', lat: 50.6292, lng: 3.0573 },
    { name: 'Rennes', lat: 48.1173, lng: -1.6778 },
    { name: 'Reims', lat: 49.2583, lng: 4.0317 },
    { name: 'Le Havre', lat: 49.4944, lng: 0.1079 },
    { name: 'Saint-Étienne', lat: 45.4397, lng: 4.3872 },
    { name: 'Toulon', lat: 43.1242, lng: 5.9280 }
];

export function initGeographyGame() {
    const geoScoreElement = document.getElementById('geo-score');
    const currentCityElement = document.getElementById('current-city');
    const newCityButton = document.getElementById('new-city');
    const checkPositionButton = document.getElementById('check-position');
    const geoResultMessage = document.getElementById('geo-result-message');

    let map;
    let marker;
    let currentCity;
    let geoScore = 0;

    // Initialiser la carte
    function initMap() {
        if (map) {
            map.remove();
        }
        
        map = L.map('map').setView([46.6031, 1.8883], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 8,
            minZoom: 5
        }).addTo(map);

        // Ajouter un marqueur au clic
        map.on('click', function(e) {
            if (marker) {
                map.removeLayer(marker);
            }
            marker = L.marker(e.latlng).addTo(map);
        });
    }

    // Afficher une nouvelle ville
    function displayNewCity() {
        currentCity = frenchCities[Math.floor(Math.random() * frenchCities.length)];
        currentCityElement.textContent = `Trouvez ${currentCity.name}`;
        
        if (marker) {
            map.removeLayer(marker);
            marker = null;
        }
        
        geoResultMessage.textContent = '';
    }

    // Vérifier la position
    function checkPosition() {
        if (!marker || !currentCity) return;

        const userLatLng = marker.getLatLng();
        const distance = calculateDistance(
            userLatLng.lat,
            userLatLng.lng,
            currentCity.lat,
            currentCity.lng
        );

        if (distance < 50) { // 50 km de tolérance
            geoScore++;
            geoScoreElement.textContent = geoScore;
            geoResultMessage.textContent = 'Correct !';
            geoResultMessage.className = 'correct';
        } else {
            geoResultMessage.textContent = `Incorrect. La distance était de ${Math.round(distance)} km`;
            geoResultMessage.className = 'incorrect';
        }

        // Afficher la position correcte
        L.marker([currentCity.lat, currentCity.lng], {
            icon: L.divIcon({
                className: 'correct-marker',
                html: '📍',
                iconSize: [30, 30]
            })
        }).addTo(map);
    }

    // Calculer la distance entre deux points en kilomètres
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Rayon de la Terre en km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    function toRad(value) {
        return value * Math.PI / 180;
    }

    // Gestionnaires d'événements
    newCityButton.addEventListener('click', displayNewCity);
    checkPositionButton.addEventListener('click', checkPosition);

    // Initialisation
    initMap();
    displayNewCity();
} 