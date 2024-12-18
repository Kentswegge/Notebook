
// Particle animation function
function initParticles() {
  const app = new Vue({
    el: "#app",
    data() {
      return {
        particles: []
      };
    },
    methods: {
      makeParticles() {
        const tex = new THREE.TextureLoader().load(
          "https://s3-us-west-2.amazonaws.com/s.cdpn.io/141041/particle.jpg"
        );

        for (let zpos = -1000; zpos < 1000; zpos += 2) {
        let random = _.random(0, 100);

        let color, scale;

        if (random > 99) {
          color = 0xffd16e;
          scale = 3;
        } else if (random > 90 && random < 99) {
          color = _.sample([0x5370ff, 0x53a6ff]);
          scale = 2;
        } else {
          color = 0xfff3f3;
          scale = 2;
        }

          let material = new THREE.MeshBasicMaterial({
            color: color,
            alphaMap: tex,
            transparent: true
          });

          let particle = new THREE.Sprite(material);

          particle.position.x = Math.random() * 1000 - 500;
          particle.position.y = Math.random() * 1000 - 500;

          particle.position.z = zpos;

          particle.scale.x = particle.scale.y = scale;

          this.scene.add(particle);

          this.particles.push(particle);
        }
      }
    },
    mounted() {
      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(
        80,
        window.innerWidth / window.innerHeight,
        1,
        4000
      );

      this.camera.position.z = 1000;

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      document.getElementById("app").appendChild(this.renderer.domElement);

      this.makeParticles();

      const animate = () => {
        requestAnimationFrame(animate);

        this.particles.forEach((particle) => {
          particle.position.z += 0.5;

          if (particle.position.z > 1000) {
            particle.position.z -= 2000;
          }
        });

        this.renderer.render(this.scene, this.camera);
      };

      animate();
    }
  });
}

// Initialize the particles
initParticles();






// Array of images with their short and long descriptions
const images = [
  { src: "images/image1.jpg", shortDescription: "Short description 1", longDescription: "Long description 1" },
  { src: "images/image2.jpg", shortDescription: "Short description 2", longDescription: "Long description 2" },
  { src: "images/image3.jpg", shortDescription: "Short description 3", longDescription: "Long description 3" },
  { src: "images/image4.jpg", shortDescription: "Short description 4", longDescription: "Long description 4" }
];

// Array to keep track of shown images
let shownImages = [];

// Function to shuffle an array (optional, if you want randomness)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to show the next image
function showNextImage() {
  // If all images have been shown, reset and shuffle for a fresh cycle
  if (shownImages.length === images.length) {
    shownImages = [];
    shuffleArray(images); // Shuffle only if desired
  }

  // Find the next image that hasn't been shown
  const nextImage = images.find(img => !shownImages.includes(img));

  // Update the displayed image and descriptions
  const imageElement = document.getElementById("random-image");
  const shortDescElement = document.getElementById("short-description");
  const longDescElement = document.getElementById("image-description");

  imageElement.src = nextImage.src;
  imageElement.alt = nextImage.shortDescription || "Image description";

  shortDescElement.innerHTML = `<strong>${nextImage.shortDescription || "No description available."}</strong>`;
  if (nextImage.longDescription) {
    longDescElement.textContent = nextImage.longDescription;
    longDescElement.style.display = "block"; // Show long description
  } else {
    longDescElement.style.display = "none"; // Hide if no long description
  }

  // Adjust the image's orientation
  adjustImageOrientation(imageElement);

  // Mark this image as shown
  shownImages.push(nextImage);
}

// Function to adjust the image's orientation based on its aspect ratio
function adjustImageOrientation(image) {
  image.onload = () => {
    const aspectRatio = image.naturalWidth / image.naturalHeight;

    if (aspectRatio > 1) {
      // Landscape: Full width, auto height
      image.style.width = "100%";
      image.style.height = "auto";
    } else {
      // Portrait: Full height, auto width
      image.style.width = "auto";
      image.style.height = "100%";
    }
  };
}

// Event listener for the "Next Image" button
document.getElementById("next-button").addEventListener("click", showNextImage);

// Initialize the first image when the page loads
window.onload = showNextImage;
