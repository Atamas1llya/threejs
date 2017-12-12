import * as THREE from 'three';
import lock from 'pointer-lock';

export default class User {
  constructor({ position }) {
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);

    const [x, y, z] = position;
    this.camera.position.set(x, y, z);
    this.camera.rotation.order = 'YXZ'; // default is 'XYZ'

    this.movement = {
      forward: false,
      back: false,
      left: false,
      right: false,
      top: false,
      bottom: false,
    }

    this._initializeControls();

    this.pointer = lock(document.body);
    this.pointer.on('attain', this._setupPointer);
  }

  animateMovementTick = () => {
    const { movement } = this;

    // FIXME: semidirectional movement is faster than onedirectional

    if (movement.forward) {
      this.camera.position.x -= Math.sin(this.camera.rotation.y) * 0.1;
      this.camera.position.z -= Math.cos(this.camera.rotation.y) * 0.1;
    }
    if (movement.back) {
      this.camera.position.x += Math.sin(this.camera.rotation.y) * 0.1;
      this.camera.position.z += Math.cos(this.camera.rotation.y) * 0.1;
    }
    if (movement.left) {
      this.camera.position.x += Math.sin(this.camera.rotation.y - Math.PI / 2) * 0.1;
      this.camera.position.z += Math.cos(this.camera.rotation.y - Math.PI / 2) * 0.1;
    }
    if (movement.right) {
      this.camera.position.x -= Math.sin(this.camera.rotation.y - Math.PI / 2) * 0.1;
      this.camera.position.z -= Math.cos(this.camera.rotation.y - Math.PI / 2) * 0.1;
    }
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
}
