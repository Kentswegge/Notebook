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
  if (images.length === 0) return; // Ensure images are loaded before proceeding

  const randomIndex = Math.floor(Math.random() * images.length);
  const image = images[randomIndex];

  const imageElement = document.getElementById("random-image");
  const descriptionElement = document.getElementById("image-description");

  imageElement.src = image.src; // Update the image source
  imageElement.alt = image.description; // Update the alt text
  descriptionElement.textContent = image.description; // Update the description text
}



// Attach event listener to the button
document.getElementById("next-button").addEventListener("click", showRandomImage);
