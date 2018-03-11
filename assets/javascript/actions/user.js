export function fetchUser(name){
    return {
        user: { name: 'sherri' },
        type: 'GET_USER',
        data: { name }
    };
}
