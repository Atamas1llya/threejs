import * as THREE from 'three';

export default class Renderer {
  constructor({ player }) {
    this.player = player;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog('#212121', 0, 400);
    this.scene.add(new THREE.AxesHelper(15));

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor('#212121', 1);

    window.addEventListener('resize', this._resize);
  }

  init = (container) => {
    container.appendChild(this.renderer.domElement);

    this._resize();
    this._animate();
  };

  render = element => this.scene.add(element);

  // game loop
  _animate = () => {
    requestAnimationFrame(this._animate);

    this.player.animateMovementTick();

    this.renderer.render(this.scene, this.player.camera);
  };

  // helpers
  _resize = () => {
    this.player.camera.aspect = window.innerWidth / window.innerHeight;
    this.player.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
}
