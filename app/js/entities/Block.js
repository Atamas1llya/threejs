import * as THREE from 'three';

export default class Block {
  constructor({ size, position, color }) {
    const [width, height, depth] = size;
    const [x, y, z] = position;

    const geometry = new THREE.CubeGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ color });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    this.mesh = mesh;
  }
}
