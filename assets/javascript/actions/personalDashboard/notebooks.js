export const FETCH_NOTEBOOKS = 'FETCH_NOTEBOOKS';
export const FETCH_NOTEBOOKS_SUCCESS = 'FETCH_NOTEBOOKS_SUCCESS';
export const FETCH_NOTEBOOKS_ERROR = 'FETCH_NOTEBOOKS_ERROR';

export const function fetchNoteBooks({}){
    return {
        type: [FETCH_NOTEBOOKS, FETCH_NOTEBOOKS_SUCCESS, FETCH_NOTEBOOKS_ERROR],
        middlewareType: 'sockets',
        socketNamespace: 'notebooks',
        socketEvent: 'search',
    }
}
