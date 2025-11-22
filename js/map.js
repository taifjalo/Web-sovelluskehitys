import * as L from "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet-src.esm.js";

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const initMap = (restaurants) => {
  const mapContainer = document.getElementById("map");
  if (!mapContainer) return;
  mapContainer.innerHTML = "";
  const map = L.map(mapContainer).setView([60.1699, 24.9384], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  const markers = [];
  restaurants.forEach((r) => {
    const lat = r.location?.coordinates?.[1];
    const lon = r.location?.coordinates?.[0];
    if (!lat || !lon) return;
    const m = L.marker([lat, lon]).addTo(map);
    m.bindPopup(`<b>${r.name}</b><br>${r.company}<br>${r.city}`);
    markers.push({ marker: m, lat, lon });
  });

  if (markers.length) {
    const group = L.featureGroup(markers.map((m) => m.marker));
    map.fitBounds(group.getBounds().pad(0.1));
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const userMark = L.circleMarker([latitude, longitude], {
          radius: 8,
        }).addTo(map);
        userMark.bindPopup("You are here");
        // nearest
        let nearest = null;
        let minD = Infinity;
        markers.forEach((m) => {
          const d = haversine(latitude, longitude, m.lat, m.lon);
          if (d < minD) {
            minD = d;
            nearest = m;
          }
        });
        if (nearest) {
          nearest.marker.setIcon(
            L.divIcon({
              html: "⭐",
              className: "nearest-marker",
              iconSize: [24, 24],
            })
          );
          nearest.marker.openPopup();
        }
      },
      (err) => console.warn("Geolocation failed:", err.message)
    );
  }

  return map;
};
