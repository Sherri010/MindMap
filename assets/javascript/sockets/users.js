import socket  from './socket.js';

export function get(cb, args){
    return socket.emit('user',args, cb);
}
