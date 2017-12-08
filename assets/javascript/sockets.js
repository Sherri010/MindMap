import io from 'socket.io-client';

const socket = io('http://localhost:4567');
socket.on('connect', function(data){
  socket.emit('join', 'hi----');
});

const body = document.getElementsByTagName('body');
const el = document.createElement('p');
el.innerText = ' hi from webpack :) ';
// body.appendChild(el);

console.log('webapck says hi not', el)
