import socket  from './socket.js';

export function getUser(cb, args){
    return socket.emit('user',args, cb);
}
