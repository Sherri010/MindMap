import {
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
} from '../actions';


const initialState = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    image: null,
    isFetching: false,
};

export default function user(state = initialState, action){
    switch(action.type){
        case GET_USER:
            return {
                ...state,
                isFetching: true,
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                id: action.id,
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                image: action.image,
                isFetching: false,
            };
        case GET_USER_ERROR:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}
