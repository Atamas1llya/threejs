import * as THREE from 'three';
import CANNON from 'cannon';
import config from '../config/user';

import controlsMixin from '../mixins/controls';
import Cube from './Cube';

class User {
  constructor({ position, permissions }) {
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);

    this.permissions = permissions || {};

    const [x, y, z] = position;
    this.camera.position.set(x, y, z);
    this.camera.rotation.order = 'YXZ'; // default is 'XYZ'

    this._initializeControls.call(this);

    this.stepState = 20;
    this.stepSize = 9;
    this.stepRange = 0.5 / 100;
    this.toggled = true;

    const cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 1, 0.5));
    this.body = new CANNON.Body({
      mass: 1,
      shape: cubeShape,
    });
    this.body.position.set(...position);
  }

  updatePosition = () => {
    this.camera.position.copy(this.body.position);
    // this.camera.quaternion.copy(this.body.quaternion);
    this.body.quaternion.x = 0;
    this.body.quaternion.y = 0;
    this.body.quaternion.z = 0;
    this.camera.position.y = this.body.position.y + 1;
  }
}

Object.assign(User.prototype, controlsMixin);

export default User;
