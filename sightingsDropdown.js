document.addEventListener("DOMContentLoaded", () => {
  const sightingsImages = {
    asian: "sightings_racial_top_3_bottom_3/sightings_by_high_low_Asian.png",
    black: "sightings_racial_top_3_bottom_3/sightings_by_high_low_Black.png",
    hispanic:
      "sightings_racial_top_3_bottom_3/sightings_by_high_low_Hispanic.png",
    white: "sightings_racial_top_3_bottom_3/sightings_by_high_low_White.png",
  };

  const selectElement = document.getElementById("sightingsSelect");
  const imageElement = document.getElementById("sightingImage");

  if (!selectElement) {
    console.error('Element with id "sightingsSelect" not found.');
    return;
  }

  selectElement.addEventListener("change", function () {
    const selectedSighting = this.value;
    if (selectedSighting && sightingsImages[selectedSighting]) {
      imageElement.src = sightingsImages[selectedSighting];
      imageElement.style.display = "block";
    } else {
      imageElement.style.display = "none";
    }
  });
});
