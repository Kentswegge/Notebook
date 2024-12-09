// List of images and descriptions
const images = [
    { src: "https://raw.githubusercontent.com/kentswegge/Notebook/main/images/image1.jpg", description: "Description for image 1" },
    { src: "https://raw.githubusercontent.com/kentswegge/Notebook/main/images/image2.jpg", description: "Description for image 2" },
    { src: "https://raw.githubusercontent.com/kentswegge/Notebook/main/images/image3.jpg", description: "Description for image 3" },
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
