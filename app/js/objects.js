import * as THREE from 'three';

export const createBall = size => new THREE.Mesh(
  new THREE.SphereGeometry(size, 500, 500),
  new THREE.MeshLambertMaterial({ color: '#212121' })
);


export const createLight = (x, y, z) => {
  const light = new THREE.PointLight('white');

  light.position.x = x;
  light.position.y = y;
  light.position.z = z;
  light.intensity = 2.9;
  light.distance = 10000;

  return light;
}


export const createCube = (width, height, depth, color) => new THREE.Mesh(
  new THREE.BoxGeometry(width, height, depth),
  new THREE.MeshLambertMaterial({ color }),
);
