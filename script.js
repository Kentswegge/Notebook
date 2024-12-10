let images = [];

fetch("images.json")
  .then(response => response.json())
  .then(data => {
    images = data;
    console.log("Images loaded:", images);
  })
  .catch(error => console.error("Error loading images.json:", error));

function showRandomImage() {
  if (images.length === 0) return; // Ensure the array is loaded

  const randomIndex = Math.floor(Math.random() * images.length);
  const image = images[randomIndex];

  const imageElement = document.getElementById("random-image");
  const descriptionElement = document.getElementById("image-description");

  imageElement.src = image.src; // Update the image source
  imageElement.alt = image.description; // Update the alt text
  descriptionElement.textContent = image.description; // Update the description
}


document.getElementById("next-button").addEventListener("click", showRandomImage);
