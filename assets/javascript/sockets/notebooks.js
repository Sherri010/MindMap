import socket  from './socket.js';

export function search(cb, args){
    return socket.emit('userNoteBooks',args, cb);
}
