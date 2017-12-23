import * as THREE from 'three';

export default class Sun {
  constructor({ time, mapSize }) {
    this.light = new THREE.DirectionalLight(0xffffff, 0.8);
    this.light.position.set(10, 20, 15);

    this.light.shadow.mapSize.width = 1024 * 4;
    this.light.shadow.mapSize.height = 1024 * 4;

    this.light.shadow.camera.left = -40;
    this.light.shadow.camera.top = 40;
    this.light.shadow.camera.right = 40;
    this.light.shadow.camera.bottom = -40;

    this.light.castShadow = true;
  }

  get entity () {
    return this.light;
  }
}
