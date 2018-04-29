import {
    FETCH_NOTEBOOKS,
    FETCH_NOTEBOOKS_SUCCESS,
    FETCH_NOTEBOOKS_ERROR,
    POST_NOTEBOOK,
    POST_NOTEBOOK_SUCCESS,
    POST_NOTEBOOK_ERROR,
} from '../../actions';


const initialState = {
    notebooks: [],
    isFetching: false,
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
                notebooks: action.notebooks,
            };
        case FETCH_NOTEBOOKS_ERROR:
            return {
                ...state,
                error: action.error,
            }
        case POST_NOTEBOOK:
            return {
                ...state,
                isFetching: true,
            };
        case POST_NOTEBOOK_SUCCESS:
            return {
                ...state,
                notebooks: [].concat(state.notebooks, [action.notebook]),
            };
        case POST_NOTEBOOK_ERROR:
            return {
                ...state,
                isFetching: false,
            }
        default:
            return state;
    }
}
