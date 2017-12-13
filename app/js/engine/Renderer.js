import * as THREE from 'three';
import CANNON from 'cannon';


export default class Renderer {
  constructor() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setClearColor('#212121', 1);
  }

  init = (container) => {
    container.appendChild(this.renderer.domElement);
  }

  renderMap = (map) => {

  }

  tick = (player) => {
    this.renderer.render(this.scene, player.camera)
  }
}
