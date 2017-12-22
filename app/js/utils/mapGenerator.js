import * as THREE from 'three'

export const generate = (texture) => {
  const material = new THREE.MeshLambertMaterial({color: 0x5566aa});

  if (texture) {
    const textureObject = new THREE.TextureLoader().load(texture);

    textureObject.wrapS = THREE.RepeatWrapping;
    textureObject.wrapT = THREE.RepeatWrapping;
    textureObject.repeat.set(128 * 3, 128 * 3);

    material.map = textureObject;
  } else {
    material.wireframe = true;
  }

  const terrainScene = THREE.Terrain({
    easing: THREE.Terrain.Linear,
    frequency: 1,
    heightmap: THREE.Terrain.PerlinDiamond,
    material: material,
    maxHeight: 60,
    minHeight: -60,
    steps: 1,
    useBufferGeometry: false,
    xSegments: 63,
    xSize: 1024,
    ySegments: 63,
    ySize: 1024,
  });

  terrainScene.children[0].receiveShadow = true;
  terrainScene.children[0].castShadow = false;

  return terrainScene;
}
