// Create a Leaflet map centered on Boston
const map = L.map("map").setView([42.36, -71.06], 13);

// Add OpenStreetMap tile layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Create a D3 ordinal scale to assign colors to different case_status values
const colorScale = d3.scaleOrdinal().range(d3.schemeSet1);

// Function to parse date strings (e.g., "2021-05-10T15:30:00")
const parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S");

// Load CSV data (ensure rodent_data.csv is in the same directory or update the path)
d3.csv("rodent_data.csv")
  .then((data) => {
    // Filter out rows without valid latitude/longitude values
    data = data.filter((d) => d.latitude && d.longitude);

    // Process each row: convert date strings to Date objects and compute completion_time
    data.forEach((d) => {
      d.open_dt = parseDate(d.open_dt);
      d.closed_dt = parseDate(d.closed_dt);
      if (d.open_dt && d.closed_dt) {
        // Calculate the difference in days
        d.completion_time = (d.closed_dt - d.open_dt) / (1000 * 60 * 60 * 24);
      } else {
        d.completion_time = "N/A";
      }
      // Convert latitude and longitude from strings to numbers
      d.latitude = +d.latitude;
      d.longitude = +d.longitude;
    });

    // Update the color scale domain using the unique case_status values
    colorScale.domain([...new Set(data.map((d) => d.case_status))]);

    // For each data point, create a circle marker on the map
    data.forEach((d) => {
      const color = colorScale(d.case_status);
      // Create a circle marker with Leaflet
      const marker = L.circleMarker([d.latitude, d.longitude], {
        radius: 5,
        fillColor: color,
        color: color,
        weight: 1,
        opacity: 1,
        fillOpacity: 0.7,
      }).addTo(map);

      // Bind a popup to display details on click
      marker.bindPopup(
        `<strong>Case ID:</strong> ${d.case_enquiry_id}<br/>
       <strong>Status:</strong> ${d.case_status}<br/>
       <strong>Completion Time:</strong> ${
         d.completion_time !== "N/A"
           ? d.completion_time.toFixed(1) + " days"
           : "N/A"
       }<br/>
       <strong>Neighborhood:</strong> ${d.neighborhood}<br/>
       <strong>Street:</strong> ${d.location_street_name}<br/>
       <strong>Ward:</strong> ${d.ward}`
      );
    });
  })
  .catch((error) => {
    console.error("Error loading CSV data:", error);
  });
