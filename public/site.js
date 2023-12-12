document.addEventListener('DOMContentLoaded', () => {
    loadArtworkWithImage();
    initializeMap();
    document.getElementById('myForm').addEventListener('submit', submitForm);
});

let objectIDs = [];
let currentArtworkIndex = 0;
const maxArtworksToShow = 10;

function loadArtworkWithImage() {
    if (currentArtworkIndex >= maxArtworksToShow) {
        displayEndMessage();
        return;
    }

fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects')
        .then(response => response.json())
        .then(data => {
            objectIDs = data.objectIDs;
            tryLoadArtwork();
        });
}

function tryLoadArtwork() {
    if (currentArtworkIndex >= maxArtworksToShow) {
        displayEndMessage();
        return;
    }

    const randomIndex = Math.floor(Math.random() * objectIDs.length);
    const artId = objectIDs[randomIndex];

    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}`)
        .then(response => response.json())
        .then(artData => {
            if (artData.primaryImage && artData.country) {
                updateArtworkDisplay(artData);
                currentArtworkIndex++;
            } else {
                tryLoadArtwork();
            }
        });
}

function updateArtworkDisplay(artworkData) {
    document.getElementById('artImage').src = artworkData.primaryImage;
    document.getElementById('artInfo').innerText = `${artworkData.title}\n${artworkData.artistDisplayName}\n${artworkData.objectDate}\nCountry: ${artworkData.country}`;

    const coordinates = countryCoordinates[artworkData.country];
    if (coordinates) {
        updateMapWithArtworkCity(coordinates.latitude, coordinates.longitude);
    }
}

function displayEndMessage() {
    document.getElementById('artContainer').innerHTML = 'END - No more artworks for today!';
}

let map;

function initializeMap() {
    map = L.map('mapid').setView([40.7128, -74.0060], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

function updateMapWithArtworkCity(latitude, longitude) {
    if (map) {
        map.setView([latitude, longitude], 13);
    }
}

const countryCoordinates = {
    "USA": { latitude: 37.0902, longitude: -95.7129 },
"UK": { latitude: 55.3781, longitude: -3.4360 },
"France": { latitude: 46.2276, longitude: 2.2137 },
"Italy": { latitude: 41.8719, longitude: 12.5674 },
"Greece": { latitude: 39.0742, longitude: 21.8243 },
"Germany": { latitude: 51.1657, longitude: 10.4515 },
"Egypt": { latitude: 26.8206, longitude: 30.8025 },
"Japan": { latitude: 36.2048, longitude: 138.2529 },
"China": { latitude: 35.8617, longitude: 104.1954 },
    "Mexico": { latitude: 23.6345, longitude: -102.5528 },
    "India": { latitude: 20.5937, longitude: 78.9629 },
    "Turkey": { latitude: 38.9637, longitude: 35.2433 },
    "Russia": { latitude: 61.5240, longitude: 105.3188 },
    "Brazil": { latitude: -14.2350, longitude: -51.9253 },
    "Canada": { latitude: 56.1304, longitude: -106.3468 },
    "Australia": { latitude: -25.2744, longitude: 133.7751 },
    "South Africa": { latitude: -30.5595, longitude: 22.9375 },
    "Spain": { latitude: 40.4637, longitude: -3.7492 },
    "Netherlands": { latitude: 52.1326, longitude: 5.2913 },
    "South Korea": { latitude: 35.9078, longitude: 127.7669 },
    "Argentina": { latitude: -38.4161, longitude: -63.6167 },
    "Sweden": { latitude: 60.1282, longitude: 18.6435 },
    "Norway": { latitude: 60.4720, longitude: 8.4689 },

    
};

async function submitForm(event) {
    event.preventDefault();

    // 获取表单中的数据
    const someField = document.getElementById('someFieldId').value;

    const response = await fetch('/someEndpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ someField }),
    });

    if (response.ok) {
        const jsonData = await response.json();
        // 处理返回的数据
        updateArtworkAndMap(jsonData);
    } else {
        console.error('Error in submitting data.');
    }
}

function updateMapWithArtworkCity(latitude, longitude) {
    if (map) {
    map.setView([latitude, longitude], 13);
    }
    }
