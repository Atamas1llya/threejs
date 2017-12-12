import 'normalize.css';
import * as THREE from 'three';

import Renderer from './Renderer';
import User from './User';
import { createCube, createLight } from './objects';

const cube = createCube(2, 2, 2, 'red');
const light = createLight(-1000, 0, 1000);

Renderer.render();
Renderer.renderElement(cube);
Renderer.renderElement(light);
