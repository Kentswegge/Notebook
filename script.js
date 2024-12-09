// List of images and descriptions
const images = [
    { src: "https://raw.githubusercontent.com/Kentswegge/Notebook/main/images/Amangiri-Resort_5.jpg", description: "Description for image 1" },
    { src: "https://raw.githubusercontent.com/Kentswegge/Notebook/main/images/Comet Hale-Bopp, April 1, 1997-Sebastian Voltmer-2.jpg", description: "Description for image 2" },
    { src: "https://raw.githubusercontent.com/Kentswegge/Notebook/main/images/DLEW.jpg", description: "Description for image 3" },
    // Add more images here
];

function showRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    const image = images[randomIndex];

    // Update image and description
    document.getElementById("random-image").src = image.src;
    document.getElementById("random-image").alt = image.description;
    document.getElementById("image-description").textContent = image.description;
}


// Event listener for the button
document.getElementById("next-button").addEventListener("click", showRandomImage);

// Show a random image when the page loads
showRandomImage();
