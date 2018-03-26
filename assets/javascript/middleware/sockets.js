import * as users from '../sockets/users';

export default store => next => action => {
  if(!action.middlewareType || action.middlewareType !== 'sockets'){
      return next(action);
  }

  const [actionType, actionTypeSuccess, actionTypeError] = action.type;

  next({ type: actionType });
  const res = users.get((response) => {
      return next({
             ...response,
             type: actionTypeSuccess,
             receivedAt: new Date(),
         });
  }, action.data);
}
