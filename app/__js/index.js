import 'normalize.css';
import * as THREE from 'three';
import { scene, render, resizeRenderer, camera } from './render';
import { createBall, createCube, createLight } from './objects';
import { initializeControls } from './controls';

resizeRenderer();
window.addEventListener('resize', resizeRenderer);

const ball = createBall(5);
const cube = createCube(5, 5, 5, '#353535');
const light = createLight(-1000, 0, 1000);

cube.position.x = 15;
cube.position.y = -5;

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10 * 0.95, 30, 10, 1),
  new THREE.MeshLambertMaterial({ color: '#212121' })
);

plane.position.z = -15;
plane.rotation.x = 50 * Math.PI / 180;

camera.position.x += 40;
camera.position.y += 5;
camera.position.z -= 5;
camera.rotation.y = 45 * Math.PI / 180;


scene.add(plane);
// scene.add(ball);
scene.add(cube);
scene.add(light);

render();
initializeControls();
