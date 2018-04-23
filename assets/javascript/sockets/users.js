import Socket  from './socket.js';
const users = new Socket('users');

export function get(args){
     return  users.emit('get', args);
}
