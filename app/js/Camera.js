import * as THREE from 'three';
import lock from 'pointer-lock';

import constants, { ROOT } from './constants';

class Camera {
  constructor({ x, y, z }) {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = z;

    this.pointer = lock(ROOT);
    this.pointer.on('attain', this._setupPointer);

    document.addEventListener('keydown', this._moveCamera);
  }

  _setupPointer = (movements) => {
    const initial = { x: 0, y: 0 }

    movements.on('data', (move) => {
      initial.x += move.dx;
      initial.y += move.dy;

      // this.camera.position.x = initial.x;
      // this.camera.position.y = initial.y;

      this.camera.rotation.y = -(initial.x * Math.PI / 180);
      this.camera.rotation.x = -(initial.y * Math.PI / 180);
      this.camera.updateProjectionMatrix();
    })
  }

  _moveCamera = ({ keyCode }) => {
    switch (keyCode) {
      case constants.BUTTON_LEFT:
      case constants.BUTTON_LEFT_A:
        this.camera.position.x -= 1;
        break;
      case constants.BUTTON_RIGHT:
      case constants.BUTTON_RIGHT_D:
        this.camera.position.x += 1;
        break;
      case constants.BUTTON_TOP:
      case constants.BUTTON_TOP_W:
        this.camera.position.z -= 1;
        break;
      case constants.BUTTON_DOWN:
      case constants.BUTTON_DOWN_S:
        this.camera.position.z += 1;
        break;
    }
  }
}

export default new Camera({
  x: 0,
  y: 0,
  z: 10,
});
