export const FETCH_NOTEBOOKS = 'FETCH_NOTEBOOKS';
export const FETCH_NOTEBOOKS_SUCCESS = 'FETCH_NOTEBOOKS_SUCCESS';
export const FETCH_NOTEBOOKS_ERROR = 'FETCH_NOTEBOOKS_ERROR';


export function fetchUserNoteBooks(data){
    return {
        type: [FETCH_NOTEBOOKS, FETCH_NOTEBOOKS_SUCCESS, FETCH_NOTEBOOKS_ERROR],
        middlewareType: 'sockets',
        socketNamespace: 'notebooks',
        socketEvent: 'search',
        data,
    }
}

export const POST_NOTEBOOK = 'POST_NOTEBOOK';
export const POST_NOTEBOOK_SUCCESS = 'POST_NOTEBOOK_SUCCESS';
export const POST_NOTEBOOK_ERROR = 'POST_NOTEBOOK_ERROR';

export function postUserNoteBook(data){
    return {
        type: [POST_NOTEBOOK, POST_NOTEBOOK_SUCCESS, POST_NOTEBOOK_ERROR],
        middlewareType: 'sockets',
        socketNamespace: 'notebooks',
        socketEvent: 'post',
        data,
    }
}

export const PATCH_NOTEBOOK = 'PATCH_NOTEBOOK';
export const PATCH_NOTEBOOK_SUCCESS = 'PATCH_NOTEBOOK_SUCCESS';
export const PATCH_NOTEBOOK_ERROR = 'PATCH_NOTEBOOK_ERROR';

export function patchUserNoteBook(data){
	return {
		type: [PATCH_NOTEBOOK, PATCH_NOTEBOOK_SUCCESS, PATCH_NOTEBOOK_ERROR],
		middlewareType: 'sockets',
        socketNamespace: 'notebooks',
        socketEvent: 'patch',
        data,
	}
}
