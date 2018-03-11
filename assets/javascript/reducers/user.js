
const initialState = {
    user: null,
    name: '',
};

export default function user(state = initialState, action){
    switch(action.type){
        case 'GET_USER':
            return {
                ...state,
                name: action.name,
            }
        default:
            return state;
    }
}
