let images = [];

// Fetch the JSON file
fetch("images.json")
  .then(response => response.json())
  .then(data => {
    images = data;
    showRandomImage(); // Show an initial random image once the data is loaded
  })
  .catch(error => console.error("Error loading images:", error));

function showRandomImage() {
  if (images.length === 0) return; // Wait until images are loaded

  const randomIndex = Math.floor(Math.random() * images.length);
  const image = images[randomIndex];

  const imageElement = document.getElementById("random-image");
  const descriptionElement = document.getElementById("image-description");

  imageElement.src = image.src;
  imageElement.alt = image.description;
  descriptionElement.textContent = image.description; // Update text from JSON
}


// Attach event listener to the button
document.getElementById("random-button").addEventListener("click", showRandomImage);
