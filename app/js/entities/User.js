import * as THREE from 'three';
import config from '../config/user';

import controlsMixin from '../mixins/controls';

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
  }
}

Object.assign(User.prototype, controlsMixin);

export default User;
