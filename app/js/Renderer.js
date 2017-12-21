import * as THREE from 'three';
import Stats from 'stats-js';

var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

// Align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild(stats.domElement);

export default class Renderer {
  constructor({ user }) {
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AxesHelper(5));
    this.user = user;
    this.elements = [];

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene.fog = new THREE.Fog(0x222233, 0, 20000);
    this.renderer.setClearColor('#212121', 1);

    window.addEventListener('resize', this._resize);
  }

  renderMap = () => {
    const material = new THREE.MeshLambertMaterial({color: 0x5566aa});

    const textureObject = new THREE.TextureLoader().load('./textures/grass.jpg');
    textureObject.wrapS = THREE.RepeatWrapping;
    textureObject.wrapT = THREE.RepeatWrapping;
    textureObject.repeat.set(128, 128);

    material.map = textureObject;
    // material.wireframe = true;

    const terrainScene = THREE.Terrain({
      easing: THREE.Terrain.Linear,
      frequency: 1,
      heightmap: THREE.Terrain.PerlinDiamond,
      material: material,
      maxHeight: 100,
      minHeight: -100,
      steps: 1,
      useBufferGeometry: false,
      xSegments: 63,
      xSize: 1024,
      ySegments: 63,
      ySize: 1024,
    });

    console.log(terrainScene.children[0]);
    terrainScene.children[0].receiveShadow = true;
    terrainScene.children[0].castShadow = true;

    terrainScene.receiveShadow = true;


    this.scene.add(terrainScene);
  }

  renderElement = element => this.scene.add(element);

  init = (element) => {
    element.appendChild(this.renderer.domElement);
    this.element = element;

    this._resize();
    this._animate();

    // this.renderMap();
  }

  _animate = () => {
    stats.begin();

    requestAnimationFrame(this._animate);

    this.user.animateMovementTick();

    this.renderer.render(this.scene, this.user.camera);

     stats.end();
  }


  _resize = () => {
    this.user.camera.aspect = window.innerWidth / window.innerHeight;
    this.user.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

}
