import { isPromise } from './utils';

export const promiseMiddle = (store) => (next) => (action) => {
  if(!isPromise(action.payload)){
    return next(action);
  }

  action.payload
    .then((res) => {
      action.payload = res;
      store.dispatch(action);
    })
    .catch((err) => {
      action.isError = true;
      action.payload = err;
      store.dispatch(action);
    })

};