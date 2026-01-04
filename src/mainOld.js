import './style.css'
import GUI from 'lil-gui';
import * as THREE from 'three';
import gsap from 'gsap';
import Plane from './Plane.js';

// base scene
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.setClearColor( 0xffffff, 0);
renderer.toneMappingExposure = 1.2;
document.body.appendChild( renderer.domElement );




const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 20;
camera.position.x = -30;


const params = { 
  lights: 800,
  metalness: 0,
  roughness: 0,
}


// //light 
// const ambientlight = new THREE.AmbientLight(0xffffff, params.lights)
// pointlight.position.set(10, 10, 10)
// pointlight.castShadow = true;
// scene.add(pointlight)

const ambientlight = new THREE.AmbientLight(0xffffff, 10)
scene.add(ambientlight)


const planes = [];
const segmentCount = 18;
const loader = new THREE.TextureLoader();
const texturePaths = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg",];


const projects = document.querySelector("#nb-project");
projects.innerHTML = segmentCount;

const archives = document.querySelector("#nb-archive");
archives.innerHTML = segmentCount;

const textures = texturePaths.map((path) => {
  const tex = loader.load(`/img/${path}`);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;

  return tex;
});


function calculateRadius() {
  const distanceToCenter = Math.sqrt(
    camera.position.x * camera.position.x + 
    camera.position.y * camera.position.y + 
    camera.position.z * camera.position.z
  );
  
  const vFOV = THREE.MathUtils.degToRad(camera.fov);
  const visibleHeight = 2 * Math.tan(vFOV / 2) * distanceToCenter;
  
  return visibleHeight / 2;
}


const radius = calculateRadius();
// const radius = 20;
const radiusX = radius * 1.5;
const radiusY = radius ;



function positionPlanes() {
  planes.forEach(({ instance, angle }) => {
    gsap.to(instance.getMesh().position, {
      x: Math.cos(angle) * radiusX,
      y: Math.sin(angle) * radiusY,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
}


for (let i = 0; i < segmentCount; i++) {
  const plane = new Plane({ 
    size1: 10,
    size2: 14, 
    texture: textures[i],
    textures,
    position: new THREE.Vector3(0, 0, -i * 0.1),
    delay: i * 50
  });
  scene.add(plane.getMesh());
  planes.push({
    instance: plane,
    angle: (i / segmentCount) * Math.PI * 2
  });
}

// Position initiale
positionPlanes();

const scroll = {
  ease: 0.05,
  current: 0,
  target: 0,
  last: 0
};

//on scroll event
window.addEventListener('wheel', (e) => {
  scroll.target += e.deltaY * 0.001;
});

function animate() {
  requestAnimationFrame(animate);

  scroll.current += (scroll.target - scroll.current) * scroll.ease;

  planes.forEach(({ instance, angle }) => {
    const a = angle + scroll.current;

    instance.getMesh().position.x = Math.cos(a) * radiusX;
    instance.getMesh().position.y = Math.sin(a) * radiusY;

    // instance.rotate(a);
  });


  renderer.render(scene, camera);
}

animate();





// lil gui
const gui = new GUI();
gui.add( params, 'lights', 0, 2000, 1 ).onChange( value => {
	pointlight.intensity = value;
});

gui.add( params, 'metalness', 0, 1, 0.001 ).onChange( value => {
  planes.forEach((plane) => {
    plane.setMetalness(value);
  });
});

gui.add( params, 'roughness', 0, 1, 0.001 ).onChange( value => {
  planes.forEach((plane) => {
    plane.setRoughness(value);
  });
});


window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});