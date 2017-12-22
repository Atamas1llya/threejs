import 'normalize.css';
import * as THREE from 'three';

import Renderer from './Renderer';
import User from './entities/User';

import userConfig from './config/user';
import './plugins/Terrain';

import '../css/index.css'

const user = new User({
  position: [0, 2, 20],
  permissions: {
    fly: true,
  }
});
const renderer = new Renderer({ user });


// init
renderer.init(document.querySelector('#root'));
renderer.renderElement(new THREE.HemisphereLight(0xffffbb, 0x080820, 0.2));
renderer.renderElement(new THREE.AmbientLight( 0x808080 ));


// render sun
const sun = new THREE.DirectionalLight(0xffffff, 0.8);
sun.position.set(1, 1.5, 1.5);
sun.castShadow = true;
sun.shadow.mapSize.width = 1024 * 4;
sun.shadow.mapSize.height = 1024 * 4;
renderer.renderElement(sun); // sun... sun?



// render cube
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshLambertMaterial({ color: 'yellow' }),
);
cube.castShadow = true;
cube.position.set(0, 0, 0);
renderer.renderElement(cube);



// render simple ground

const material = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide })
const textureObject = new THREE.TextureLoader().load('./textures/grass3.jpg');
textureObject.wrapS = THREE.RepeatWrapping;
textureObject.wrapT = THREE.RepeatWrapping;
textureObject.repeat.set(1024, 1024);
material.map = textureObject;

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(1024, 1024, 1024),
  material,
);
ground.rotation.x = 90 * (Math.PI / 180);
ground.position.set(0, -0.501, 0);
ground.receiveShadow = true;

renderer.renderElement(ground);


// dev
window.renderer = renderer;
