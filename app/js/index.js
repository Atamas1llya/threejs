import 'normalize.css';
import * as THREE from 'three';

import Renderer from './Renderer';
import User from './entities/User';
import Block from './entities/Block';

import map from './maps/advanced';

import { createCube, createLight } from './utils/objects';

const light = createLight({
  position: {
    x: 5,
    y: 15,
    z: 10,
  },
  intensivity: 1.2,
  range: 25,
});
const lightBlock = new Block({
  position: {
    x: 5,
    y: 4,
    z: 10,
  },
  height: 0,
  color: '#212121',
})

Renderer.render();
Renderer.renderElement(light);
Renderer.renderElement(lightBlock.entity);

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    const block = new Block({
      position: {
        x: i,
        y: -1,
        z: j,
      },
      height: map[i][j],
      color: 'green',
    })
    Renderer.renderElement(block.entity);
  }
}
