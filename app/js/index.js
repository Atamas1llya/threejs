import 'normalize.css';
import * as THREE from 'three';

import Renderer from './Renderer';
import User from './entities/User';
import Block from './entities/Block';

import userConfig from './config/user';

import map from './maps/simple';
import map3d from './maps/3d';

import '../css/index.css'

const user = new User({
  position: [0, userConfig.height, 20],
  permissions: {
    fly: true,
  }
});
const renderer = new Renderer({ user });

renderer.init(document.querySelector('#root'));
// renderer.renderMap(map);
renderer.render3dMap(map3d);
renderer.renderElement(new THREE.HemisphereLight(0xffffbb, 0x080820, 1)); // add ambient light
renderer.renderElement(new THREE.DirectionalLight(0xffffff, 0.2)) // sun... sun?
renderer.renderUser(user);


// dev

window.renderer = renderer;
