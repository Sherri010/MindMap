import * as sockets from '../sockets/index.js';

export default store => next => async action => {
  const { socketNamespace, socketEvent, data } = action;

  if(!action.middlewareType || action.middlewareType !== 'sockets'){
      return next(action);
  }

  const [actionType, actionTypeSuccess, actionTypeError] = action.type;

  next({ type: actionType });

  const res = await sockets[socketNamespace][socketEvent](action.data);
  console.log('res', res)
  return next({
    ...res,
    type: actionTypeSuccess,
    receivedAt: new Date(),
    });
}
