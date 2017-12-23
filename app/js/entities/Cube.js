import * as THREE from 'three';
import CANNON from 'cannon';

import objectGenerator from '../utils/objectGenerator';

export default class Cube {
  constructor({ size, position, color, texture, mass }) {
    this.mesh = objectGenerator({
      geometry: new THREE.BoxGeometry(...size),
      material: new THREE.MeshLambertMaterial({ color }),
      texture: texture,
      position: position,
      params: {
        castShadow: true,
      }
    });

    const cubeShape = new CANNON.Box(new CANNON.Vec3(size[0] / 2, size[1] / 2, size[2] / 2));
    this.body = new CANNON.Body({
      mass: mass,
      shape: cubeShape,
    });
    this.body.position.set(...position);
  }

  updatePosition = () => {
    this.mesh.position.copy(this.body.position);
  }
}
