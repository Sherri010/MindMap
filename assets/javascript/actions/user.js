export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export function fetchUser(){
    return {
        type: [GET_USER, GET_USER_SUCCESS, GET_USER_ERROR],
        middlewareType: 'sockets',
        sockets: 'users',
        socketEvent: 'get',
    };
}
