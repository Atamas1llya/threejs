import * as THREE from 'three';
import CANNON from 'cannon';

export default class Renderer {
  constructor() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setClearColor('#212121', 1);
  }

  init = (container) => {
    container.appendChild(this.renderer.domElement);
  }

  renderMap = (map) => {
    // const geometry = new THREE.PlaneGeometry(map.length - 1, map.length - 1, map.length - 1, map.length - 1);
    //
    // for (let i = 0; i < map.length; i++) {
    //
    //   for (let j = 0; j < map[i].length; j++) {
    //     geometry.vertices[(i * map.length) + j].z = -map[i][j];
    //   }
    // }
    //
    // const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    // material.wireframe = true;
    // const plane = new THREE.Mesh(geometry, material);
    //
    // plane.rotation.x = 90 * Math.PI / 180;
    // plane.rotation.z = 45 * Math.PI / 180;
    // this.scene.add( plane );
    var xS = 63, yS = 63;

    const material = new THREE.MeshBasicMaterial({color: 0x5566aa});
    material.wireframe = true;

    const terrainScene = THREE.Terrain({
      easing: THREE.Terrain.Linear,
      frequency: 2.5,
      heightmap: THREE.Terrain.DiamondSquare,
      material: material,
      maxHeight: 100,
      minHeight: -100,
      steps: 1,
      useBufferGeometry: false,
      xSegments: xS,
      xSize: 1024,
      ySegments: yS,
      ySize: 1024,
    });

    this.scene.add(terrainScene)
  }

  tick = (player) => {
    this.renderer.render(this.scene, player.camera)
  }
}
