import * as THREE from 'three';

import Camera from './Camera';

class Renderer {
  constructor() {
    this.rootElement = document.querySelector('#root');
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ alpha: true });

    window.addEventListener('resize', this._resize);
  }

  render = () => {
    this.rootElement.appendChild(this.renderer.domElement);

    this._resize();
    this._animate();
  }

  renderElement = element => this.scene.add(element);

  _animate = () => {
    requestAnimationFrame(this._animate);

    this.renderer.render(this.scene, Camera.camera);
  }

  _resize = () => {
    Camera.camera.aspect = window.innerWidth / window.innerHeight;
    Camera.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }
}

export default new Renderer();
