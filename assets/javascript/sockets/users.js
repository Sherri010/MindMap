import Socket  from './socket.js';
const users = new Socket('users');

    console.log('USERS socket', users)
export function get(args){
    console.log('------> USER', args)
    return users.emit('get');
}
