// Wait for the DOM to load before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Mapping of neighborhood keys to image file paths
  const neighborhoodImages = {
    allston: "neighborhood_race_pie_charts/allston_racial_proportions.png",
    backbay: "neighborhood_race_pie_charts/back_bay_racial_proportions.png",
    beaconhill:
      "neighborhood_race_pie_charts/beacon_hill_racial_proportions.png",
    boston: "neighborhood_race_pie_charts/boston_racial_proportions.png",
    brighton: "neighborhood_race_pie_charts/brighton_racial_proportions.png",
    charlestown:
      "neighborhood_race_pie_charts/charlestown_racial_proportions.png",
    dorchester:
      "neighborhood_race_pie_charts/dorchester_racial_proportions.png",
    downtown: "neighborhood_race_pie_charts/downtown_racial_proportions.png",
    eastboston:
      "neighborhood_race_pie_charts/east_boston_racial_proportions.png",
    fenway: "neighborhood_race_pie_charts/fenway_racial_proportions.png",
    hydepark: "neighborhood_race_pie_charts/hyde_park_racial_proportions.png",
    jamaicaplain:
      "neighborhood_race_pie_charts/jamaica_plain_racial_proportions.png",
    mattapan: "neighborhood_race_pie_charts/mattapan_racial_proportions.png",
    missionhill:
      "neighborhood_race_pie_charts/mission_hill_racial_proportions.png",
    roslindale:
      "neighborhood_race_pie_charts/roslindale_racial_proportions.png",
    roxbury: "neighborhood_race_pie_charts/roxbury_racial_proportions.png",
    southboston:
      "neighborhood_race_pie_charts/south_boston_racial_proportions.png",
    southend: "neighborhood_race_pie_charts/south_end_racial_proportions.png",
    westroxbury:
      "neighborhood_race_pie_charts/west_roxbury_racial_proportions.png",
  };

  // Get references to the dropdown and image elements
  const selectElement = document.getElementById("neighborhoodSelect");
  const imageElement = document.getElementById("neighborhoodImage");

  // If the select element isn't found, log an error and exit
  if (!selectElement) {
    console.error('Element with id "neighborhoodSelect" not found.');
    return;
  }

  // Listen for changes on the dropdown menu
  selectElement.addEventListener("change", function () {
    const selectedNeighborhood = this.value;
    if (selectedNeighborhood && neighborhoodImages[selectedNeighborhood]) {
      // Update the image source to show the corresponding neighborhood image
      imageElement.src = neighborhoodImages[selectedNeighborhood];
      imageElement.style.display = "block";
    } else {
      // Hide the image if no valid neighborhood is selected
      imageElement.style.display = "none";
    }
  });
});
