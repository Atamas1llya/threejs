import * as THREE from 'three';
import CANNON from 'cannon';

import objectGenerator from '../utils/objectGenerator';

export default class Player {
  constructor() {
    this.mesh = objectGenerator({
      geometry: new THREE.BoxGeometry(1, 2, 1),
      material: new THREE.MeshLambertMaterial({ color: 'red' }),
      params: {
        castShadow: true,
      }
    });

    const shape = new CANNON.Box(new CANNON.Vec3(0.5, 1, 0.5));
    const material = new CANNON.Material();
    material.friction = 0;

    this.body = new CANNON.Body({
      mass: 10,
      shape: shape,
      material: material,
    });
    this.body.linearDamping = 0;
    this.body.angularDumping = 0;
  }

  updatePosition = () => {
    this.body.angularVelocity.set(0, 0, 0);
    this.body.velocity.set(0, this.body.velocity.y, 0);
    this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), this.mesh.rotation.y);

    this.mesh.position.copy(this.body.position);

    if (this.updateCameraPosition) {
      this.updateCameraPosition();
    }
  }
}
