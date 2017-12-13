import * as THREE from 'three';
import CANNON from 'cannon';

export default class Player {
  constructor({ position, permissions }) {
    const [x, y, z] = position;

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(x, y, z);

    this.camera = camera;
  }
}
