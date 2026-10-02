const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Configure Socket.io with a 10MB buffer for photo and audio uploads
const io = new Server(server, {
    maxHttpBufferSize: 1e7
});

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    socket.on('joinRoom', (room) => {
        socket.join(room);
    });

    socket.on('chatMessage', (data) => {
        io.to(data.room).emit('message', data);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Live Arena Chat server running on port ${PORT}`);
});
