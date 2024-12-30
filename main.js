import * as THREE from 'three';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
function setRendererSize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
renderer.setPixelRatio(window.devicePixelRatio); 
document.body.appendChild(renderer.domElement);

// Initial setup
setRendererSize();

// Handle window resizing
window.addEventListener('resize', setRendererSize);

// Set up lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 20);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Create Earth
const earthTexture = new THREE.TextureLoader().load('image.jpeg');
const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture });
const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), earthMaterial);
scene.add(earth);

// Create starfield
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

const starVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Set camera position
camera.position.z = 5;

// Set rotation speed
const rotationSpeed = 0.003;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate Earth
    earth.rotation.y += rotationSpeed;

    // Rotate the starfield
    stars.rotation.y += 0.0001;
    stars.rotation.x += 0.00005;

    renderer.render(scene, camera);
}

// Handle window resizing


// Start the animation
animate();
