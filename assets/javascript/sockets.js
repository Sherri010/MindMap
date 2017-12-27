import io from 'socket.io-client';

const socket = io('http://localhost:4567');

export function createNoteBook(args, cb){
  return socket.emit('noteBook', args, cb);
}


export function deleteNoteBook({ id }){
  return socket.emit('notebook', id, function(data){
    console.log('delete notebook', data);
  })
}
