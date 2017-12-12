import * as THREE from 'three';

export default class User {
  constructor({ position }) {
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);

    const [x, y, z] = position;
    this.camera.position.set(x, y, z);

    this.movement = {
      forward: false,
      back: false,
      left: false,
      right: false,
      top: false,
      bottom: false,
    }

    this._initializeControls();
  }

  animateMovementTick = () => {
    const { movement } = this;

    // FIXME: semidirectional movement is faster than onedirectional

    if (movement.forward) this.camera.position.z -= 0.2;
    if (movement.back) this.camera.position.z += 0.2;
    if (movement.left) this.camera.position.x -= 0.2;
    if (movement.right) this.camera.position.x += 0.2;
    if (movement.top) this.camera.position.y += 0.2;
    if (movement.bottom) this.camera.position.y -= 0.2;
  }

  _initializeControls = () => {
    window.addEventListener('keydown', ({ keyCode }) => {
      const { movement } = this;
      switch (keyCode) {
        case 87: movement.forward = true; break;
        case 83: movement.back = true; break;
        case 65: movement.left = true; break;
        case 68: movement.right = true; break;
        case 32: movement.top = true; break;
        case 16: movement.bottom = true; break;
      }
      this.movement = movement;
    })

    window.addEventListener('keyup', ({ keyCode }) => {
      const { movement } = this;
      switch (keyCode) {
        case 87: movement.forward = false; break;
        case 83: movement.back = false; break;
        case 65: movement.left = false; break;
        case 68: movement.right = false; break;
        case 32: movement.top = false; break;
        case 16: movement.bottom = false; break;
      }
      this.movement = movement;
    })
  }
}
