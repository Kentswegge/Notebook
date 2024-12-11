// Fetch the images.json file with cache-busting
fetch('https://raw.githubusercontent.com/Kentswegge/Notebook/refs/heads/main/images.json?nocache=' + new Date().getTime())
  .then(response => response.json())
  .then(data => {
    images = data;
    console.log("Images loaded:", images);
    showRandomImage(); // Show a random image initially
  })
  .catch(error => console.error("Error fetching images:", error));

let currentIndex = -1; // Track the current image index

// Function to show a random image and handle aspect ratio
function showRandomImage() {
  if (images.length === 0) {
    console.log("No images loaded.");
    return;
  }

  let randomIndex;
  
  // Ensure the random index is different from the current one
  do {
    randomIndex = Math.floor(Math.random() * images.length);
  } while (randomIndex === currentIndex);

  console.log("Current index:", currentIndex);  // Log the current image index
  console.log("Random index chosen:", randomIndex);  // Log the new random image index

  const image = images[randomIndex];

  const imageElement = document.getElementById("random-image");
  const descriptionElement = document.getElementById("image-description");

  imageElement.src = image.src;
  imageElement.alt = image.description;
  descriptionElement.textContent = image.description;

  // Adjust the image based on its aspect ratio
  adjustImageOrientation(imageElement);

  // Update the current index for the next round
  currentIndex = randomIndex;
}

// Adjust image orientation based on aspect ratio
function adjustImageOrientation(image) {
  const aspectRatio = image.naturalWidth / image.naturalHeight;

  if (aspectRatio > 1) {
    // Landscape image: Scale width and adjust height
    image.style.height = 'auto';
    image.style.width = '100%';
  } else {
    // Portrait image: Scale height and adjust width
    image.style.width = 'auto';
    image.style.height = '100%';
  }
}

// Event listener for the button
document.getElementById("next-button").addEventListener("click", showRandomImage);
