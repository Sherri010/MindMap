import io from 'socket.io-client';

const socket = io.connect('http://localhost:4567', { rejectUnauthorized : false });
console.log('SETTING UP SOCKETS')

socket.on('connection', function () {
    socket.emit('greet', { message: 'client connets' });
});

export default socket;
