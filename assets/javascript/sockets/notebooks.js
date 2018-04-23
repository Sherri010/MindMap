import Socket  from './socket.js';
const notebooks = new Socket('notebooks');

export function search(args){
    console.log('args', args)
    return notebooks.emit('search',args);
}

export function post(args){
    return notebooks.emit('post', args);
}
