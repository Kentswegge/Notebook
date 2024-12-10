let images = [];

fetch("images.json")
  .then(response => response.json())
  .then(data => {
    images = data;
    console.log("Images loaded:", images); // Debug line
  })
  .catch(error => console.error("Error loading images.json:", error));


function showRandomImage() {
  console.log("Button clicked!"); // Debug line
  if (images.length === 0) {
    console.log("Images not loaded yet.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * images.length);
  const image = images[randomIndex];
  console.log("Selected image:", image); // Debug line

  const imageElement = document.getElementById("random-image");
  const descriptionElement = document.getElementById("image-description");

  imageElement.src = image.src;
  imageElement.alt = image.description;
  descriptionElement.textContent = image.description;
}




// Attach event listener to the button
document.getElementById("next-button").addEventListener("click", showRandomImage);
