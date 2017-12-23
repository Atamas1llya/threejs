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
    this.body = new CANNON.Body({
      mass: 10,
      shape: shape,
    });
    this.body.linearDamping = 0;
    this.body.angularDumping = 0;
  }

  updatePhysic = () => {
    this.body.angularVelocity.set(0, 0, 0);

    this.body.velocity.x = 0;
    this.body.velocity.z = 0;
    
    this.mesh.position.copy(this.body.position)
  }
}
