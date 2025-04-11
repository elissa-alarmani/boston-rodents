// Create a Leaflet map centered on Boston
const map = L.map("map").setView([42.36, -71.06], 13);

// Add Jawg.Sunny tile layer to the map
L.tileLayer(
  "https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=HYMk9xl71FLXhzPodW32GowAavigUQJldDTriyp50JsWrq5sTzaMrLQI6QvC22PQ",
  {
    attribution:
      '<a href="https://jawg.io" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 22,
  }
).addTo(map);

// Neighborhood boundaries layer
fetch("boston_neighborhoods.geojson")
  .then((response) => response.json())
  .then((geojson) => {
    L.geoJSON(geojson, {
      style: {
        color: "#696969",
        weight: 1.5,
        fillOpacity: 0.05,
      },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(
          `<strong>Neighborhood:</strong> ${feature.properties.name}`
        );
      },
    }).addTo(map);
  })
  .catch((error) => {
    console.error("Error loading GeoJSON:", error);
  });

// Load rodent data and plot markers
d3.csv("rodent_data_with_neighborhoods.csv")
  .then((data) => {
    data = data.filter((d) => d.latitude && d.longitude);
    data.forEach((d) => {
      d.latitude = +d.latitude;
      d.longitude = +d.longitude;
    });

    data.forEach((d) => {
      const color = "#db7093";
      const marker = L.circleMarker([d.latitude, d.longitude], {
        radius: 3,
        fillColor: color,
        color: color,
        weight: 1,
        opacity: 0.7,
        fillOpacity: 0.3,
      }).addTo(map);

      marker.bindPopup(
        `<strong>Case ID:</strong> ${d.case_enquiry_id}<br/>
         <strong>Neighborhood:</strong> ${d.neighborhood}<br/>
         <strong>Street:</strong> ${d.location_street_name}<br/>
         <strong>Ward:</strong> ${d.ward}`
      );
    });
  })
  .catch((error) => console.error("Error loading data:", error));
