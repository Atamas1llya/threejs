import 'normalize.css';
import * as THREE from 'three';
import './lib/PointerLockControls';

import Renderer from './Renderer';
import Camera from './Camera';
import { createCube, createLight } from './objects';

const cube = createCube(2, 2, 2, 'red');
const light = createLight(-1000, 0, 1000);

Renderer.render();
Renderer.renderElement(cube);
Renderer.renderElement(light);
