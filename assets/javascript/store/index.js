import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import socketsMiddleware from '../middleware/sockets';

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk,
        socketsMiddleware,
        logger,
    ),
);

export default store;
