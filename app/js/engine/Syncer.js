import io from 'socket.io-client';

import Player from '../entities/Player';

export default class Syncer {
  constructor(renderer) {
    this.position = {x: 0, y: 0, z: 0};
    this.renderer = renderer;
    this._id = '';
    this.socket = io('http://localhost:3000');

    this.socket.on('connected', _id => {
      setInterval(() => {
        if (this.updated) {
          this.socket.emit('user_position_updated', {
            position: this.renderer.user.body.position,
            _id: this._id,
          })
        }
        this.position = Object.assign({}, this.renderer.user.body.position);
      }, 1000 / 30);

      this._id = _id;
    });

    this.socket.on('user_positions', (users) => {
      // console.log(users);
      Object.keys(users).forEach((key) => {
        if (!this.renderer.objects.find(p => p && p._id === key)) {
          const newPlayer = new Player();
          newPlayer._id = key;

          this.renderer.renderObject(newPlayer);
        } else {
          this.renderer.objects = this.renderer.objects.map((o) => {
            if (o._id === key) {
              console.log(users[key].position);
              o.body.position.set(...users[key].position);
            }
            return o;
          })
        }
      })
    })

    this.socket.on('user_disconnected', (_id) => {
      this.renderer.removeObjectById(_id);
    })


  }

  sync = () => {

  }

  get updated () {
    return !!(
      this.renderer.user.body.position.x.toFixed(4) !== this.position.x.toFixed(4)
      || this.renderer.user.body.position.y.toFixed(4) !== this.position.y.toFixed(4)
      || this.renderer.user.body.position.z.toFixed(4) !== this.position.z.toFixed(4)
    )
  }
}
