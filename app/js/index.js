import 'normalize.css';
import '../css/index.css'

import * as THREE from 'three';
import CANNON from 'cannon';

import Renderer from './engine/Renderer';

import User from './entities/User';
import Player from './entities/Player';

import Sun from './entities/Sun';
import Cube from './entities/Cube';

import objectCreator from './utils/objectGenerator';

const user = new User({
  position: [1, 1, 1],
  permissions: {
    fly: true,
  }
});

const sun = new Sun({
  time: 1000,
  mapSize: {
    width: 1024 * 4,
    height: 1024 * 4,
  }
})


const renderer = new Renderer({ user, sun });
renderer.init(document.querySelector('#root'));
renderer.renderElement(new THREE.HemisphereLight(0xffffbb, 0x080820, 0.2));
renderer.renderElement(new THREE.AmbientLight( 0x808080 ));



for (var i = 0; i < 10; i++) {
  const cube = new Cube({
    size: [1, 1, 1],
    position: [1, 0, i],
    color: 'red',
    mass: 0,
  })
  renderer.renderObject(cube)
}

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
renderer.renderElement(ground);

const groundShape = new CANNON.Plane();
const groundBody = new CANNON.Body({
  mass: 0,
  shape: groundShape,
});
groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
groundBody.position.set(0, -0.5, 0)

renderer.renderPhysic(groundBody);

const anotherPlayer = new Player();
anotherPlayer.body.position.set(5, 5, 5);

renderer.renderObject(anotherPlayer);


// dev
window.renderer = renderer;
