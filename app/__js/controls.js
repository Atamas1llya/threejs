import * as THREE from 'three'

import { camera } from './render';

export const BUTTON_LEFT = 37;
export const BUTTON_RIGHT = 39;
export const BUTTON_TOP = 38;
export const BUTTON_DOWN = 40;

// export const moveLeft = distance => camera.position.x -= distance;
// export const moveRight = distance => camera.position.x += distance;
//
// export const moveForward = distance => camera.position.z -= distance;
// export const moveBack = distance => camera.position.z += distance;
//
// export const initializeControls = () => {
//   document.addEventListener('keydown', ({ keyCode }) => {
//     switch (keyCode) {
//       case BUTTON_LEFT:
//         moveLeft(0.1);
//         break;
//       case BUTTON_RIGHT:
//         moveRight(0.1);
//         break;
//       case BUTTON_TOP:
//         moveForward(0.1);
//         break;
//       case BUTTON_DOWN:
//         moveBack(0.1);
//         break;
//     }
//   });
// }

class Controls {
  constructor() {
    this.controls.target.set(0, 0, 0)
  }
  position = {
    x: 0,
    y: 0,
    z: 35,
  }

  controls = new THREE.TrackballControls( camera );
}
