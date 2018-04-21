import Socket  from './socket.js';
const users = new Socket('users');

export function get(args, cb){
     return  users.emit('get', args, cb);
}
