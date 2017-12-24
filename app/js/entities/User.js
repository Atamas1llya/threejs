import * as THREE from 'three';
import CANNON from 'cannon';
import config from '../config/user';

import controlsMixin from '../mixins/controls';
import Cube from './Cube';

import Player from './Player';

class User extends Player {
  constructor(props) {
    super(props);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);

    const [x, y, z] = props.position;
    this.camera.position.set(x, y, z);
    this.camera.rotation.order = 'YXZ'; // default is 'XYZ'

    this._initializeControls.call(this);

    this.stepState = 20;
    this.stepSize = 9;
    this.stepRange = 0.5 / 100;
    this.toggled = true;
  }

  updateCameraPosition = () => {
    this.camera.position.copy(this.mesh.position);
    this.camera.position.y = this.body.position.y + 1;
  }
}

Object.assign(User.prototype, controlsMixin);

export default User;
