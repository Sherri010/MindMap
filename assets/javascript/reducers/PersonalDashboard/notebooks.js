import {
    FETCH_NOTEBOOKS,
    FETCH_NOTEBOOKS_SUCCESS,
    FETCH_NOTEBOOKS_ERROR,
} from '../../actions';


const initialState = {
    noteBooks: [],
};

export default function notebooks(state = initialState, action){
    switch(action.type){
        case FETCH_NOTEBOOKS:
            return {
                ...state,
                isFetching: true,
            };
        case FETCH_NOTEBOOKS_SUCCESS:
            return {
                ...state,
                notebooks: [],
            };
        case FETCH_NOTEBOOKS_ERROR:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}
