import * as THREE from 'three';
import constants from './constants';

import User from './User';

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
    this._checkMovement(User.keyboard);

    this.renderer.render(this.scene, User.camera);
  }

  _resize = () => {
    User.camera.aspect = window.innerWidth / window.innerHeight;
    User.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  _checkMovement = (keyboard) => {
    if (keyboard[constants.BUTTON_LEFT]) {
      User.camera.rotation.y += Math.PI * 0.01;
    }
    if (keyboard[constants.BUTTON_RIGHT]) {
      User.camera.rotation.y -= Math.PI * 0.01;
    }
    if (keyboard[constants.BUTTON_LEFT_A]) {
      User.camera.position.x += Math.sin(User.camera.rotation.y - Math.PI / 2) * 0.1;
      User.camera.position.z += Math.cos(User.camera.rotation.y - Math.PI / 2) * 0.1;
    }
    if (keyboard[constants.BUTTON_RIGHT_D]) {
      User.camera.position.x -= Math.sin(User.camera.rotation.y - Math.PI / 2) * 0.1;
      User.camera.position.z -= Math.cos(User.camera.rotation.y - Math.PI / 2) * 0.1;
    }
    if (keyboard[constants.BUTTON_TOP_W]) {
      User.camera.position.x -= Math.sin(User.camera.rotation.y) * 0.1;
      User.camera.position.z -= Math.cos(User.camera.rotation.y) * 0.1;
    }
    if (keyboard[constants.BUTTON_DOWN_S]) {
      User.camera.position.x += Math.sin(User.camera.rotation.y) * 0.1;
      User.camera.position.z += Math.cos(User.camera.rotation.y) * 0.1;
    }
  }
}

export default new Renderer();
