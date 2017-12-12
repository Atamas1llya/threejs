import * as THREE from 'three';

export default class User {
  constructor({ position }) {
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);

    const [x, y, z] = position;
    this.camera.position.set(x, y, z);
  }
}
