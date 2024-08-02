let scene, camera, renderer, globe, globeMaterial;
let baseRotationSpeed = 0.001;
let currentRotationSpeed = baseRotationSpeed;
let isHovering = false;
let isInitialized = false;


function init() {
    if (isInitialized) return; // Prevent multiple initializations
    isInitialized = true;

    const globeElement = document.getElementById('globe');
    
    if (globeElement) {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(200, 200);
        globeElement.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(0.8, 12, 8);
        globeMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00BFFF,
            wireframe: true,
            wireframeLinewidth: 2
        });
        globe = new THREE.Mesh(geometry, globeMaterial);
        scene.add(globe);

        camera.position.z = 2;

        window.addEventListener('resize', onWindowResize, false);
        window.addEventListener('scroll', onScroll, false);

        globeElement.addEventListener('mouseenter', onGlobeHover, false);
        globeElement.addEventListener('mouseleave', onGlobeLeave, false);

        animate();
    }

    const themeToggle = document.getElementById('checkbox');
    themeToggle.addEventListener('change', toggleTheme, false);
    loadTheme();
}

function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += currentRotationSpeed;
    renderer.render(scene, camera);
}

function onWindowResize() {
    // Keep the globe size constant
    renderer.setSize(200, 200);
}

function onScroll() {
    if (!isHovering) {
        currentRotationSpeed = baseRotationSpeed + (window.scrollY * 0.00001);
    }
}

function onGlobeHover() {
    isHovering = true;
    currentRotationSpeed = baseRotationSpeed * 5;
}

function onGlobeLeave() {
    isHovering = false;
    currentRotationSpeed = baseRotationSpeed + (window.scrollY * 0.00001);
}

function toggleTheme() {
    document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
    updateGlobeColor();
}

function updateGlobeColor() {
    const isLightMode = document.documentElement.classList.contains('light');
    globeMaterial.color.setHex(isLightMode ? 0x1E90FF : 0x00BFFF);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.classList.toggle('light', savedTheme === 'light');
    }
    updateGlobeColor(); // Update globe color based on loaded theme
}



document.addEventListener('DOMContentLoaded', init);
