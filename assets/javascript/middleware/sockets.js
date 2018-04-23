import * as sockets from '../sockets/index.js';

export default store => next => action => {
  const { socketNamespace, socketEvent, data } = action;

  if(!action.middlewareType || action.middlewareType !== 'sockets'){
      return next(action);
  }

  const [actionType, actionTypeSuccess, actionTypeError] = action.type;

  next({ type: actionType });
  console.log('socket', sockets[socketNamespace][socketEvent], data)
  sockets[socketNamespace][socketEvent](data)
  .then((response) => {
      return next({
          ...response,
          type: actionTypeSuccess,
          receivedAt: new Date(),
      });
  })
  .catch((err) => {
      return next({
          err,
          type: actionTypeError,
          receivedAt: new Date(),
      });
  });
}
