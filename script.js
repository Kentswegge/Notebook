
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



// Array to keep track of shown images
let shownImages = [];

// Function to get a random image that hasn't been shown
function getRandomImage() {
  // Check if all images have been shown
  if (shownImages.length === imageData.length) {
    shownImages = []; // Reset the shown images array
  }

  // Filter unseen images
  const unseenImages = imageData.filter(img => !shownImages.includes(img));

  // Select a random image from unseen images
  const randomIndex = Math.floor(Math.random() * unseenImages.length);
  const selectedImage = unseenImages[randomIndex];

  // Mark this image as shown
  shownImages.push(selectedImage);

  return selectedImage;
}

// Function to show an image
function showImage(imageData) {
  // Update the displayed image and descriptions
  const imageElement = document.getElementById("random-image");
  const shortDescElement = document.getElementById("short-description");
  const longDescElement = document.getElementById("image-description");

  imageElement.src = imageData.url;
  imageElement.alt = imageData.shortDescription || "Image description";

  shortDescElement.innerHTML = `<strong>${imageData.shortDescription || "No description available."}</strong>`;
  if (imageData.longDescription) {
    longDescElement.textContent = imageData.longDescription;
    longDescElement.style.display = "block"; // Show long description
  } else {
    longDescElement.style.display = "none"; // Hide if no long description
  }

  // Adjust the image's orientation
  adjustImageOrientation(imageElement);
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
document.getElementById("next-button").addEventListener("click", () => {
  const nextImage = getRandomImage();
  showImage(nextImage);
});

// Initialize a random image when the page loads
window.onload = () => {
  const initialImage = getRandomImage();
  showImage(initialImage);
};
