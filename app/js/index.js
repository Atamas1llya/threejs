import 'normalize.css';

import Renderer from './Renderer';
import User from './entities/User';
import Block from './entities/Block';

import map from './maps/simple';

import '../css/index.css'

const user = new User({
  position: [0, 2, 20],
});
const renderer = new Renderer({ user });

renderer.init(document.querySelector('#root'));
renderer.renderMap(map);
