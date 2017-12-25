import * as THREE from 'three';

import controlsMixin from '../mixins/controls';

class Player {
  constructor({ position }) {
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);

    const [x, y, z] = position;
    this.camera.position.set(x, y, z);
    this.camera.rotation.order = 'YXZ'; // default is 'XYZ'

    this._initializeControls.call(this);
  }
}

Object.assign(Player.prototype, controlsMixin);

export default Player;
