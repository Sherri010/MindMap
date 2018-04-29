import Socket  from './socket.js';
const notebooks = new Socket('notebooks');

export function search(args){
    return notebooks.emit('search',args);
}

export function post(args){
    return notebooks.emit('post', args);
}
