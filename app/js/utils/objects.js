import * as THREE from 'three';

export const createBall = size => new THREE.Mesh(
  new THREE.SphereGeometry(size, 500, 500),
  new THREE.MeshLambertMaterial({ color: '#212121' })
);


export const createLight = ({ position, intensivity = 1, range = 18 }) => {
  const light = new THREE.PointLight('white', intensivity, range);
  light.position.set(position.x, position.y, position.z);
  light.castShadow = true;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 25;

  return light;
}


export const createCube = (width, height, depth, color) => new THREE.Mesh(
  new THREE.BoxGeometry(width, height, depth),
  new THREE.MeshLambertMaterial({ color }),
);
