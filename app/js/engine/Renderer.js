import * as THREE from 'three';
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

    window.addEventListener('resize', this._resize);
  }

  init = (container) => {
    container.appendChild(this.renderer.domElement);

    this._resize();
    this._animate();
  }



  renderElement = element => this.scene.add(element);


  // game loop
  _animate = () => {
    stats.begin();

    requestAnimationFrame(this._animate);

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
