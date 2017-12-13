import 'normalize.css';
import * as THREE from 'three';
window.THREE = THREE;

import './plugins/threeTerrain';

import Game from './Game';

import mapGenerator from './utils/mapGenerator'

const map = mapGenerator(10);

Game.init({
  container: document.querySelector('#root'),
  map: map,
});
