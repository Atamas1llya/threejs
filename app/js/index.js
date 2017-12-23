import 'normalize.css';
import '../css/index.css'

import * as THREE from 'three';

import Renderer from './engine/Renderer';
import User from './entities/User';
import Sun from './entities/Sun';

import objectCreator from './utils/objectGenerator';

const user = new User({
  position: [0, 2, 20],
  permissions: {
    fly: true,
  }
});

const renderer = new Renderer({ user });
renderer.init(document.querySelector('#root'));
renderer.renderElement(new THREE.HemisphereLight(0xffffbb, 0x080820, 0.2));
renderer.renderElement(new THREE.AmbientLight( 0x808080 ));

// render sun
const sun = new Sun({
  time: 1000,
  mapSize: {
    width: 1024 * 4,
    height: 1024 * 4,
  }
})


renderer.renderElement(sun.entity);


const ground = objectCreator({
  geometry: new THREE.PlaneGeometry(1024, 1024, 1024),
  material: new THREE.MeshLambertMaterial({ side: THREE.DoubleSide }),
  textureUrl: './textures/grass3.jpg',
  rotation: [90, 0, 0],
  position: [0, -0.501, 0],
  params: {
    receiveShadow: true,
  },
})

const cube = objectCreator({
  geometry: new THREE.BoxGeometry(1, 1, 1),
  material: new THREE.MeshLambertMaterial({ color: 'yellow' }),
  params: {
    castShadow: true,
  }
})

renderer.renderElement(ground);
renderer.renderElement(cube);


// dev
window.renderer = renderer;
