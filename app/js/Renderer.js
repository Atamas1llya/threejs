import * as THREE from 'three';
import CANNON from 'cannon';

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

    const world = new CANNON.World();
    world.gravity.set(0,-2, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    this.timeStep = 1 / 60;
    this.world = world;

    const boxShape = new CANNON.Box(new CANNON.Vec3(1,1,1));
    const boxBody = new CANNON.Body({ mass: 1 });
    boxBody.position.set(5, 10, 5);
    boxBody.addShape(boxShape);
    this.box = boxBody;
    this.world.add(boxBody);

    const boxShape2 = new CANNON.Box(new CANNON.Vec3(1,1,1));
    const boxBody2 = new CANNON.Body({ mass: 0 });
    boxBody2.position.set(5, 5, 5);
    boxBody2.addShape(boxShape2);
    this.box2 = boxBody2;
    this.world.add(boxBody2);

    const block = new Block({
      size: [1, 1, 1],
      position: [3, 3, 3],
      color: 'green',
    })
    this.renderElement(block.mesh);
    this.block = block.mesh


    window.addEventListener('resize', this._resize);
  }


  init = (element) => {
    element.appendChild(this.renderer.domElement);
    this.element = element;

    this._resize();
    this._animate();
  }


  renderElement = element => {
    const { x, y, z } = element.scale;
    this.scene.add(element);
  };


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

  _updatePhysics = () => {
      this.world.step(1/60);
      // Copy coordinates from Cannon.js to Three.js
      this.block.position.copy(this.box.position);
      this.block.quaternion.copy(this.box.quaternion);
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
