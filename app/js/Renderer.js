import * as THREE from 'three';
import CANNON from 'cannon';

import Block from './entities/Block';

export default class Renderer {
  constructor({ user }) {
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AxesHelper(5));
    this.user = user;
    this.elements = [];

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    this.scene.fog = new THREE.Fog(0x222233, 0, 20000);
    this.renderer.setClearColor('#212121', 1);

    const world = new CANNON.World();
    world.gravity.set(0,-18, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;
    this.world = world;

    window.addEventListener('resize', this._resize);
  }


  init = (element) => {
    element.appendChild(this.renderer.domElement);
    this.element = element;

    this._resize();
    this._animate();
  }


  renderElement = element => {
    this.scene.add(element);
  }

  renderUser = (user) => {
    this.world.add(user.physic);
    this.scene.add(user.mesh);
  }


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
          this.world.add(block.physic);
          this.elements.push(block);
        }
      }
    }
  }

  render3dMap = (map) => {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        for (let k = 0; k < map[i][j].length; k++) {
          if (map[i][j][k]) {
            const block = new Block({
              size: [1, 1, 1],
              position: [k, i, j],
              color: 'green',
            })
            this.renderElement(block.mesh);
            this.world.add(block.physic);
            this.elements.push(block);
          }
        }
      }
    }
  }

  _updatePhysics = () => {
    this.world.step(1/60);
    this.elements.forEach(element => element.updatePosition());
    this.user.updatePosition();
  }


  _animate = () => {
    requestAnimationFrame(this._animate);
    this._updatePhysics();

    this.user.animateMovementTick();

    this.renderer.render(this.scene, this.user.camera);
  }


  _resize = () => {
    this.user.camera.aspect = window.innerWidth / window.innerHeight;
    this.user.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

}
