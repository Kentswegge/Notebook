fetch('https://raw.githubusercontent.com/Kentswegge/Notebook/refs/heads/main/images.json?nocache=' + new Date().getTime())
  .then(response => response.json())
  .then(data => {
    images = data;
    console.log("Images loaded:", images);
    showRandomImage(); // Show a random image initially
  })
  .catch(error => console.error("Error fetching images:", error));



let currentIndex = -1; // Track the current image index

function showRandomImage() {
  if (images.length === 0) {
    console.error("No images loaded."); // Error if no images
    return;
  }

  const randomIndex = Math.floor(Math.random() * images.length);
  console.log("Random index:", randomIndex); // Log the index
  console.log("Image object:", images[randomIndex]); // Log the image object

  const image = images[randomIndex];

  const imageElement = document.getElementById("random-image");
  const descriptionElement = document.getElementById("image-description");

  if (!imageElement || !descriptionElement) {
    console.error("Image or description element not found in DOM.");
    return;
  }

  imageElement.src = image.src; // Update the image source
  imageElement.alt = image.description;
  descriptionElement.textContent = image.description; // Update description
  console.log("Updated image and description:", image.src, image.description);
}
