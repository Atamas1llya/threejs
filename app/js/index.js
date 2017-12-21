import 'normalize.css';
import * as THREE from 'three';

import Renderer from './Renderer';
import User from './entities/User';

import userConfig from './config/user';
import './plugins/Terrain';

import '../css/index.css'

const user = new User({
  position: [0, 1, 20],
  permissions: {
    fly: true,
  }
});
const renderer = new Renderer({ user });

renderer.init(document.querySelector('#root'));
renderer.renderElement(new THREE.HemisphereLight(0xffffbb, 0x080820, 1));
// renderer.renderElement(new THREE.AmbientLight('white'))

const sun = new THREE.DirectionalLight(0xffffff, 1.2);
sun.position.set(1, 1, 5);
sun.castShadow = true;
sun.shadow.mapSize.width = 1024 * 4;
sun.shadow.mapSize.height = 1024 * 4;
renderer.renderElement(sun) // sun... sun?


const cube = new THREE.Mesh(
  new THREE.BoxGeometry( 2, 5, 2 ),
  new THREE.MeshLambertMaterial({ color: 'yellow' }),
);
cube.castShadow = true;
cube.position.set(1, 1, 1)
renderer.renderElement(cube)

renderer.renderMap();



// dev
window.renderer = renderer;
