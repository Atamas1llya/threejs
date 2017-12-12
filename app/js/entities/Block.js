import * as THREE from 'three';

export default class Block {
  constructor({ position, height, color }) {
    this.cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, height, 1),
      new THREE.MeshLambertMaterial({ color }),
    );
    this.cube.position.x = position.x;
    this.cube.position.y = position.y + height / 2;
    this.cube.position.z = position.z;
    this.cube.receiveShadow = true;
    this.cube.castShadow = true;
  }

  get entity() {
    return this.cube;
  }
}
