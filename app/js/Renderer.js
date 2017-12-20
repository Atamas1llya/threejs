import * as THREE from 'three';

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

    this.scene.fog = new THREE.Fog(0x222233, 0, 20000);
    this.renderer.setClearColor('#212121', 1);

    window.addEventListener('resize', this._resize);



    this.createTexture({
      size: [30, 30, 30],
      rotation: [90, 0, 0],
      position: [0, 0, 0],
    })

    this.createTexture({
      size: [30, 30, 30],
      rotation: [90, 0, 0],
      position: [0, 8, 0],
    })

    this.createTexture({
      size: [8, 30, 30],
      rotation: [90, 90, 0],
      position: [15, 4, 0],
    })

    this.createTexture({
      size: [30, 8, 30],
      rotation: [0, 0, 0],
      position: [0, 4, 15],
    })

    this.createTexture({
      size: [8, 30, 30],
      rotation: [90, 90, 0],
      position: [-15, 4, 0],
    })

    this.createTexture({
      size: [30, 8, 30],
      rotation: [0, 0, 0],
      position: [0, 4, -15],
    })
  }


  createTexture = ({ size, position, rotation }) => {
    rotation = rotation.map(e => (e * Math.PI) / 180)

    console.log(rotation);
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(...size),
      new THREE.MeshBasicMaterial({
        color: 0xffff00,
        side: THREE.DoubleSide,
        wireframe: true,
      })
    );

    plane.position.set(...position);
    plane.rotation.set(...rotation);

    this.scene.add(plane);
  }


  init = (element) => {
    element.appendChild(this.renderer.domElement);
    this.element = element;

    this._resize();
    this._animate();
  }

  _animate = () => {
    requestAnimationFrame(this._animate);

    this.user.animateMovementTick();

    this.renderer.render(this.scene, this.user.camera);
  }


  _resize = () => {
    this.user.camera.aspect = window.innerWidth / window.innerHeight;
    this.user.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

}
