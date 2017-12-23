import * as THREE from 'three';
import CANNON from 'cannon';

import Stats from 'stats-js';


var stats = new Stats();

stats.setMode(0); // 0: fps, 1: ms
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild(stats.domElement);



export default class Renderer {
  constructor({ user }) {
    this.user = user;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x87CEFA, 0, 400);
    this.scene.add(new THREE.AxesHelper(15));

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0x87CEFA, 1);

    this.world = new CANNON.World();
    this.world.gravity.set(0, -9.8, 0);
    this.world.broadphase = new CANNON.NaiveBroadphase();

    this.objects = [];

    window.addEventListener('resize', this._resize);
  }

  init = (container) => {
    container.appendChild(this.renderer.domElement);

    this._resize();
    this._animate();
  }

  renderElement = element => this.scene.add(element);

  renderPhysic = element => this.world.add(element);

  renderObject = (object) => {
    this.scene.add(object.mesh);
    this.world.add(object.body);
    this.objects.push(object);
  }


  // game loop
  _animate = () => {
    stats.begin();

    this.world.step(1/60);
    requestAnimationFrame(this._animate);

    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].updatePosition();
    }
    this.user.animateMovementTick();
    this.renderer.render(this.scene, this.user.camera);

     stats.end();
  }

  // helpers
  _resize = () => {
    this.user.camera.aspect = window.innerWidth / window.innerHeight;
    this.user.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

}
