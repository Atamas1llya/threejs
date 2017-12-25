import * as THREE from 'three';
import CANNON from 'cannon';
import Stats from 'stats-js';

export default class Renderer {
  constructor({ user, sun }) {
    this.user = user;
    this.sun = sun;

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
    this.world.gravity.set(0, -20, 0);
    this.world.broadphase = new CANNON.NaiveBroadphase();

    this.objects = [];
    this.players = [];

    window.addEventListener('resize', this._resize);
  }

  init = (container) => {
    container.appendChild(this.renderer.domElement);
    this.renderElement(this.sun.entity);
    this.renderPhysic(this.user.body);

    this._initStats();
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

  removeObjectById = (_id) => {
    const body = this.objects.find(e => e._id === _id);
    this.world.remove(body.body);
    this.scene.remove(body.mesh)
  }

  _initStats = () => {
    this.stats = new Stats();

    this.stats.setMode(0); // 0: fps, 1: ms
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.top = '0px';

    document.body.appendChild(this.stats.domElement);
  }

  // game loop
  _animate = () => {
    this.stats.begin();

    this.world.step(1/60);
    requestAnimationFrame(this._animate);

    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].updatePosition();
    }

    for (var i = 0; i < this.players.length; i++) {
      this.players[i].updatePhysic();
      this.players[i].body.position.x += 0.01;
    }

    this.user.animateMovementTick();
    this.user.updatePosition();
    this.renderer.render(this.scene, this.user.camera);

    this.stats.end();
  }

  // helpers
  _resize = () => {
    this.user.camera.aspect = window.innerWidth / window.innerHeight;
    this.user.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

}
