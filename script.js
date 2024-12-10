fetch('https://raw.githubusercontent.com/Kentswegge/Notebook/refs/heads/main/images.json?nocache=' + new Date().getTime())
  .then(response => response.json())
  .then(data => {
    images = data;
    console.log("Images loaded:", images);
    showRandomImage(); // Show a random image initially
  })
  .catch(error => console.error("Error fetching images:", error));


function showRandomImage() {
  if (images.length === 0) {
    console.log("No images loaded.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * images.length);
  console.log("Random index:", randomIndex, "Image:", images[randomIndex]);

  const image = images[randomIndex];

  const imageElement = document.getElementById("random-image");
  const descriptionElement = document.getElementById("image-description");

  imageElement.src = image.src;
  imageElement.alt = image.description;
  descriptionElement.textContent = image.description;
}



document.getElementById("next-button").addEventListener("click", showRandomImage);
