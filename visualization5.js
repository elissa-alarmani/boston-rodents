// Create a Leaflet map centered on Boston
const map = L.map("map").setView([42.36, -71.06], 13);

// Add OpenStreetMap tile layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Create a D3 ordinal scale to assign colors to different neighborhoods
const colorScale = d3.scaleOrdinal().range(d3.schemeSet1);

d3.csv("rodent_data_with_neighborhoods.csv")
  .then((data) => {
    // Filter out rows without valid latitude/longitude values
    data = data.filter((d) => d.latitude && d.longitude);

    // Convert latitude and longitude from strings to numbers
    data.forEach((d) => {
      d.latitude = +d.latitude;
      d.longitude = +d.longitude;
    });

    // Update the color scale domain using the unique neighborhood values
    colorScale.domain([...new Set(data.map((d) => d.neighborhood))]);

    // For each individual case, create a circle marker on the map
    data.forEach((d) => {
      const color = colorScale(d.neighborhood);
      // Create a circle marker with Leaflet for each case
      const marker = L.circleMarker([d.latitude, d.longitude], {
        radius: 5,
        fillColor: color,
        color: color,
        weight: 1,
        opacity: 1,
        fillOpacity: 0.7,
      }).addTo(map);

      // Bind a popup to display case details when the marker is clicked
      marker.bindPopup(
        `<strong>Case ID:</strong> ${d.case_enquiry_id}<br/>
         <strong>Neighborhood:</strong> ${d.neighborhood}<br/>
         <strong>Street:</strong> ${d.location_street_name}<br/>
         <strong>Ward:</strong> ${d.ward}`
      );
    });
  })
  .catch((error) => {
    console.error("Error loading CSV data:", error);
  });
