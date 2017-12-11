import * as THREE from 'three';
const ROOT = document.querySelector('#root');


export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 35;
// camera.position.y = 20;

// camera.rotation.x = -30 * Math.PI / 180;

export const renderer = new THREE.WebGLRenderer({ alpha: true });


const animate = () => {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
};


export const resizeRenderer = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
};


export const render = () => {
  ROOT.appendChild(renderer.domElement);
  animate();
}
