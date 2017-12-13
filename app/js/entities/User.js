import * as THREE from 'three';
import CANNON from 'cannon';
import lock from 'pointer-lock';
import config from '../config/user';

export default class User {
  constructor({ position, permissions }) {
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);

    this.permissions = permissions || {};

    const [x, y, z] = position;
    this.camera.position.set(x, y, z);
    this.camera.rotation.order = 'YXZ'; // default is 'XYZ'

    this.movement = {}
    this._initializePhysics(position, permissions);
    this._initializeControls();

    this.pointer = lock(document.body);
    this.pointer.on('attain', this._setupPointer);
  }

  animateMovementTick = () => {
    const { movement } = this;

    // FIXME: semidirectional movement is faster than onedirectional

    if (movement.forward) {
      this.physic.position.x -= Math.sin(this.camera.rotation.y) * 0.1;
      this.physic.position.z -= Math.cos(this.camera.rotation.y) * 0.1;
    }
    if (movement.back) {
      this.physic.position.x += Math.sin(this.camera.rotation.y) * 0.1;
      this.physic.position.z += Math.cos(this.camera.rotation.y) * 0.1;
    }
    if (movement.left) {
      this.physic.position.x += Math.sin(this.camera.rotation.y - Math.PI / 2) * 0.1;
      this.physic.position.z += Math.cos(this.camera.rotation.y - Math.PI / 2) * 0.1;
    }
    if (movement.right) {
      this.physic.position.x -= Math.sin(this.camera.rotation.y - Math.PI / 2) * 0.1;
      this.physic.position.z -= Math.cos(this.camera.rotation.y - Math.PI / 2) * 0.1;
    }
    if (movement.top) {
      if (this.permissions.fly) {
        this.physic.velocity.y = 0;
        this.physic.position.y += 0.2
      } else {
        this.physic.velocity.y = 5;
      }
    }
    if (movement.bottom) {
      if (this.permissions.fly) {
        this.physic.velocity.y = 0;
        this.physic.position.y -= 0.2;
      } else {

      }
    }
  }

  _initializePhysics = (position, permissions) => {
    const [x, y, z] = position;

    const geometry = new THREE.CubeGeometry(1, 2, 1);
    const material = new THREE.MeshLambertMaterial({ color: 'red' });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    const boxShape = new CANNON.Box(new CANNON.Vec3(0.5,1,0.5));
    const boxBody = new CANNON.Body({ mass: 9.81 });
    boxBody.linearDamping = 0;
    // boxBody.velocity.z = -1;

    boxBody.position.set(x, y + config.height, z);
    boxBody.addShape(boxShape);

    this.physic = boxBody;
    this.mesh = mesh;
  }

  updatePosition = () => {
    // 1st person camera
    this.camera.position.copy(this.physic.position)
    this.camera.position.y = this.physic.position.y + config.height;

    // fake 3d person camera
    // this.camera.position.x = this.physic.position.x + 3;
    // this.camera.position.y = this.physic.position.y + 3;
    // this.camera.position.z = this.physic.position.z + 3;
    //
    this.mesh.position.copy(this.physic.position);
    // this.physic.quaternion.copy(this.mesh.quaternion);
    this.physic.quaternion.x = 0;
    this.physic.quaternion.y = 0;
    this.physic.quaternion.z = 0;
    this.physic.velocity.x = 0;
    // this.physic.velocity.y = 0;
    this.physic.velocity.z = 0;

    // console.log(this.physic.position);
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
      if (initial.y + move.dy < 90 && initial.y + move.dy > -90) {
        initial.y += move.dy;
      }

      this.camera.rotation.y = -(initial.x * Math.PI / 180);
      this.camera.rotation.x = -(initial.y * Math.PI / 180);

      this.camera.updateProjectionMatrix();
    })
  }
}
