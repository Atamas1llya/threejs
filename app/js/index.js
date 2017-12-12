import 'normalize.css';
import * as THREE from 'three';

import Renderer from './Renderer';
import User from './entities/User';
import Block from './entities/Block';

import map from './maps/simple';

import { createCube, createLight } from './utils/objects';

// const cube = createCube(1, 1, 1, 'red');
// const cube2 = createCube(1, 1, 1, 'blue');

const light = createLight(2000, 1000, 1000);

Renderer.render();
Renderer.renderElement(light);

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    const block = new Block({
      position: {
        x: i,
        y: -1,
        z: j,
      },
      height: map[i][j],
      color: '#212121',
    })
    Renderer.renderElement(block.entity);
  }
}
