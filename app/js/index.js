import 'normalize.css';
import '../css/index.css';

// dependencies
import * as THREE from 'three';

// engine
import Renderer from './engine/Renderer';

// entities
import Player from './entities/Player';

// utils
import utils from './utils';


// ================================================
// ===================== SCENE =====================
// ================================================

const player = new Player({
  position: [0, 0, 20],
});

const renderer = new Renderer({
  player: player,
});

renderer.init(document.querySelector('#root'));


utils.loader.loadObj('./models/torus.obj')
  .then((obj) => {
    obj.scale.set(0.01, 0.01, 0.01);
    obj.children[0].material = new THREE.MeshBasicMaterial({ color: 'red' })
    renderer.render(obj);
  })
