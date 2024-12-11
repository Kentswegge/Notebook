console.log("Fetching images JSON...");
fetch('https://raw.githubusercontent.com/Kentswegge/Notebook/refs/heads/main/images.json?nocache=' + new Date().getTime())
  .then(response => response.json())
  .then(data => {
    images = data;
    console.log("Images loaded:", images);
    showRandomImage(); // Show a random image initially
  })
  .catch(error => console.error("Error fetching images:", error));


fetch('https://raw.githubusercontent.com/Kentswegge/Notebook/refs/heads/main/images.json?nocache=' + new Date().getTime())
  .then(response => response.json())
  .then(data => {
    images = data;
    console.log("Images loaded:", images);
    showRandomImage(); // Show a random image initially
  })
  .catch(error => console.error("Error fetching images:", error));

console.log("Fetching images JSON...");
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
  if (!images || images.length === 0) {
    console.log("No images loaded or `images` is undefined.");
    return;
  }
  ...
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

  // Update the current index for the next round
  currentIndex = randomIndex;
}

// Event listener for the button
document.getElementById("next-button").addEventListener("click", showRandomImage);
