import * as THREE from 'three';
import CANNON from 'cannon';

import Renderer from './engine/Renderer';
import Player from './entities/Player';

class Game {
  constructor() {
    this.renderer = new Renderer();
    this.player = new Player({
      position: [0, 0, 0]
    });
  }

  init = (options) => { // init game
    const { map, container } = options;

    this.renderer.init(container);
    this.renderer.renderMap(map);

    this._resize();
    window.addEventListener('resize', this._resize);

    this.tick();
  }

  tick = () => { // game loop
    requestAnimationFrame(this.tick);

    this.renderer.tick(this.player)
  }

  _resize = () => {
    this.player.camera.aspect = window.innerWidth / window.innerHeight;
    this.player.camera.updateProjectionMatrix();

    this.renderer.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

export default new Game();
