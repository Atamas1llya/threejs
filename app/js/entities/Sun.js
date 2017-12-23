import * as THREE from 'three';

export default class Sun {
  constructor({ time, mapSize }) {
    this.light = new THREE.DirectionalLight(0xffffff, 0.8);
    this.light.position.set(1, 1, 1.2);

    this.light.shadow.mapSize.width = mapSize.width;
    this.light.shadow.mapSize.height = mapSize.height;

    this.light.castShadow = true;
  }

  get entity () {
    return this.light;
  }
}
