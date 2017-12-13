import * as THREE from 'three';
import CANNON from 'cannon';
import Stats from 'stats.js';

var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

import Renderer from './engine/Renderer';
import Player from './entities/Player';

class Game {
  constructor() {
    this.renderer = new Renderer();
    this.player = new Player({
      position: [0, 50, 800],
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
    stats.begin();
    requestAnimationFrame(this.tick);

    this.renderer.tick(this.player)
    stats.end();
  }

  _resize = () => {
    this.player.camera.aspect = window.innerWidth / window.innerHeight;
    this.player.camera.updateProjectionMatrix();

    this.renderer.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

export default new Game();
