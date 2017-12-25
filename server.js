var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const uuidV1 = require('uuid/v1');
const filterObject = require('filter-object');

const users = {};

io.on('connection', (socket) => {
  const user = {
    position: [0, 0, 0],
    _id: uuidV1(),
  }
  users[user._id] = user;

  socket.emit('connected', user._id);
  socket.on('disconnect', () => {
    delete users[user._id];
    socket.broadcast.emit('user_disconnected', user._id);
  })

  socket.on('user_position_updated', ({ position, _id }) => {
    users[_id].position = Object.values(position);
  })

  setInterval(() => {
    socket.emit('user_positions', filterObject(users, [`!${user._id}`]));
  }, 1000/60);
});

http.listen(3000, () => {
  console.log('listening on 3000...');
});
