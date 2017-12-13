import * as THREE from 'three';
import CANNON from 'cannon';

import Renderer from './engine/Renderer';
import Physic from './engine/Physic';

class Game {
  constructor() {
    this.renderer = new Renderer();
    this.physic = new Physic();
  }

  init = (options) => { // init game
    const { map, container } = options;
  }

  loop = () => { // game loop

  }
}

export default new Game();
