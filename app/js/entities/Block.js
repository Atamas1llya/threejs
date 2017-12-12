import * as THREE from 'three';
import CANNON from 'cannon';

export default class Block {
  constructor({ size, position, color }) {
    const [width, height, depth] = size;
    const [x, y, z] = position;

    const geometry = new THREE.CubeGeometry(width, height, depth);
    const material = new THREE.MeshLambertMaterial({ color });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    const boxShape = new CANNON.Box(new CANNON.Vec3(0.5,0.5,0.5));
    const boxBody = new CANNON.Body({ mass: 0 });

    boxBody.position.set(x, y, z);
    boxBody.addShape(boxShape);

    this.physic = boxBody;
    this.mesh = mesh;
  }

  updatePosition = () => {
    // console.log(this.physic.position);
    this.mesh.position.copy(this.physic.position);
    this.mesh.quaternion.copy(this.physic.quaternion);
  }
}
