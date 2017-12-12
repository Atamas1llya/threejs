import * as THREE from 'three';
import lock from 'pointer-lock';

import constants, { ROOT } from './constants';

class User {
  constructor({ x, y, z }) {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.x = x;
    this.camera.position.y = y;
    this.camera.position.z = z;
    this.keyboard = {};

    this.pointer = lock(ROOT);
    this.pointer.on('attain', this._setupPointer);

    document.addEventListener('keydown', this._onKeyDown);
    document.addEventListener('keyup', this._onKeyUp);
  }

  _setupPointer = (movements) => {
    const initial = { x: 0, y: 0 }

    movements.on('data', (move) => {
      initial.x += move.dx;
      initial.y += move.dy;

      // this.camera.position.x = initial.x;
      // this.camera.position.y = initial.y;

      this.camera.rotation.y = -(initial.x * Math.PI / 180);
      // this.camera.rotation.x = -(initial.y * Math.PI / 180);
      this.camera.updateProjectionMatrix();
    })
  }

  _onKeyDown = ({ keyCode }) => this.keyboard[keyCode] = true;
  _onKeyUp = ({ keyCode }) => this.keyboard[keyCode] = false;
}

export default new User({
  x: 0,
  y: 0,
  z: 10,
});
