import socket  from './socket.js';

export function search(cb, args){
    return socket.emit('search',args, cb);
}

export function post(cb, args){
    return socket.emit('post', args, cb);
}
