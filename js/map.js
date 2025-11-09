import L from "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet-src.esm.js";

// دالة لحساب المسافة بين نقطتين (Haversine formula)
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // كم
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

// تهيئة الخريطة + إضافة جميع المطاعم
export const initMap = (restaurants) => {
  const mapContainer = document.getElementById("map");
  mapContainer.innerHTML = ""; // تنظيف قبل كل تحميل جديد

  const map = L.map(mapContainer).setView([60.1699, 24.9384], 12); // Helsinki by default

  // Tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://osm.org">OpenStreetMap</a> contributors',
  }).addTo(map);

  // إضافة جميع المطاعم كمؤشرات
  const markers = [];
  restaurants.forEach((r) => {
    const lat = r.location?.coordinates?.[1];
    const lon = r.location?.coordinates?.[0];
    if (!lat || !lon) return;

    const marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup(`<b>${r.name}</b><br>${r.company}<br>${r.city}`);
    markers.push({ marker, lat, lon, name: r.name });
  });

  // ضبط الإطار ليشمل كل المؤشرات
  if (markers.length > 0) {
    const group = L.featureGroup(markers.map((m) => m.marker));
    map.fitBounds(group.getBounds().pad(0.1));
  }

  // تحديد موقع المستخدم
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const userMarker = L.circleMarker([latitude, longitude], {
          radius: 8,
          color: "#2fb27b",
          fillColor: "#2fb27b",
          fillOpacity: 0.8,
        })
          .addTo(map)
          .bindPopup("You are here 📍");

        // حساب أقرب مطعم
        let nearest = null;
        let minDist = Infinity;
        markers.forEach((m) => {
          const dist = haversine(latitude, longitude, m.lat, m.lon);
          if (dist < minDist) {
            minDist = dist;
            nearest = m;
          }
        });

        // تلوين أقرب مطعم
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
      (err) => {
        console.warn("Geolocation denied or failed:", err.message);
      }
    );
  }

  return map;
};
