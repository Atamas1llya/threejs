import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';

OBJLoader(THREE);

module.exports.loadObj = (url) => {
  return new Promise((resolve, reject) => {
    const loader = new THREE.OBJLoader();
    loader.load(url,
      resolve,
      (xhr) => {
        console.log(xhr.loaded / xhr.total * 100 + '% loaded');
      },
      reject,
    );
  });
};
