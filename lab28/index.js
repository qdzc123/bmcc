const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('Client connected:', socket.id);

  socket.on('chat message', ({ user, text, room }) => {
    const msg = { user, text };
    if (room) {
      socket.join(room);
      io.to(room).emit('chat message', msg);
    } else {
      io.emit('chat message', msg);
    }
  });

  socket.on('join room', room => {
    socket.join(room);
    socket.emit('chat message', { user: 'Server', text: `Joined room: ${room}` });
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});