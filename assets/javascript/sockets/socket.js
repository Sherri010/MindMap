import io from 'socket.io-client';

const socket = io.connect('http://localhost:4567', { rejectUnauthorized : false });
console.log('SETTING UP SOCKETS')

socket.on('connection', function () {
    console.log('connet')
    socket.emit('greet', { message: 'client connets' });
});

export default socket;






// export function createNoteBook(args, cb){
//   return socket.emit('noteBook', args, cb);
// }
//
//
// export function deleteNoteBook({ id }){
//   return socket.emit('notebook', id, function(data){
//     console.log('delete notebook', data);
//   })
// }
//
//
// export
