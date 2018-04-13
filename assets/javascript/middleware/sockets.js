import * as sockets from '../sockets/index.js';

export default store => next => action => {
  const { socketNamespace, socketEvent, data } = action;

  if(!action.middlewareType || action.middlewareType !== 'sockets'){
      return next(action);
  }

  const [actionType, actionTypeSuccess, actionTypeError] = action.type;

  next({ type: actionType });
  console.log('---->', sockets[socketNamespace][socketEvent])
  const res = sockets[socketNamespace][socketEvent](response) => {
      return next({
             ...response,
             type: actionTypeSuccess,
             receivedAt: new Date(),
         });
  }, action.data);

}
