
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

  console.log("Current index:", currentIndex); // Log the current image index
  console.log("Random index chosen:", randomIndex); // Log the new random image index

  const image = images[randomIndex];

  // Select HTML elements
  const imageElement = document.getElementById("random-image");
  const shortDescElement = document.getElementById("short-description");
  const longDescElement = document.getElementById("image-description");

  // Update image source and alt text
  imageElement.src = image.src;
  imageElement.alt = image.shortDescription || "Image description";

  // Update short description (always shown in bold)
  shortDescElement.innerHTML = `<strong>${image.shortDescription || "No description available."}</strong>`;

  // Update long description (conditionally shown)
  if (image.longDescription) {
    longDescElement.textContent = image.longDescription;
    longDescElement.style.display = "block"; // Ensure it is visible
  } else {
    longDescElement.style.display = "none"; // Hide if no long description
  }

  // Adjust the image based on its aspect ratio
  adjustImageOrientation(imageElement);

  // Update the current index for the next round
  currentIndex = randomIndex;
}

// Adjust image orientation based on aspect ratio
function adjustImageOrientation(image) {
  image.onload = () => { // Ensure the image is fully loaded
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
  };
}

// Event listener for the button
document.getElementById("next-button").addEventListener("click", showRandomImage);
