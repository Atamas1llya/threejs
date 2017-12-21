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
renderer.renderElement(new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5)); // add ambient light


const sun = new THREE.DirectionalLight(0xffffff, 5, 100);
sun.position.set(100, 100, 100);
sun.castShadow = true;
sun.shadow.mapSize.width = 1024 * 4;
sun.shadow.mapSize.height = 1024 * 4;
// renderer.renderElement(sun) // sun... sun?



const lightning = new THREE.PointLight( 0xff0000, 10, 1000 );
lightning.castShadow = true;
renderer.renderElement(lightning);


const cube = new THREE.Mesh(
  new THREE.BoxGeometry( 1, 1, 1 ),
  new THREE.MeshLambertMaterial({ color: 'white' }),
);
cube.castShadow = true;
renderer.renderElement(cube)

var plane = new THREE.Mesh(
  new THREE.PlaneGeometry( 5, 5, 5 ),
  new THREE.MeshLambertMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide
  })
);

plane.receiveShadow = true;
renderer.renderElement(plane)

cube.position.set(0, 15, 0);
plane.position.set(10, 10, 0)
plane.rotation.set(90 * (Math.PI / 180), 0, 0)
lightning.position.set(0, 20, 0);

const helper = new THREE.CameraHelper( lightning.shadow.camera );
renderer.renderElement(helper);


renderer.renderMap();



// dev
window.renderer = renderer;
