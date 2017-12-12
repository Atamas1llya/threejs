import * as THREE from 'three';

import Block from './entities/Block';

export default class Renderer {
  constructor({ user }) {
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AxesHelper(5));
    this.user = user;

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    this.scene.fog = new THREE.Fog(0x222233, 0, 20000);
    this.renderer.setClearColor('#212121', 1);

    window.addEventListener('resize', this._resize);
  }


  init = (element) => {
    element.appendChild(this.renderer.domElement);
    this.element = element;

    this._resize();
    this._animate();
  }


  renderElement = element => this.scene.add(element);


  renderMap = (map) => {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        for (let k = 0; k < map[i][j]; k++) {
          const block = new Block({
            size: [1, 1, 1],
            position: [i, k, j],
            color: 'green',
          })
          this.renderElement(block.mesh);
        }
      }
    }
  }


  _animate = () => {
    requestAnimationFrame(this._animate);

    this.user.animateMovementTick();

    this.renderer.render(this.scene, this.user.camera);
  }


  _resize = () => {
    this.user.camera.aspect = window.innerWidth / window.innerHeight;
    this.user.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

}
