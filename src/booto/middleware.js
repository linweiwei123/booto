import { isPromise } from './utils';

export const promiseMiddle = (store) => (next) => (action) => {
  if(!isPromise(action.payload)){
    return next(action);
  }

  // 预留：dispatch 请求开始
  action.payload
    .then((res) => {
      action.payload = res;
      // 预留：dispatch 请求结束
      store.dispatch(action);
    })
    .catch((err) => {
      action.isError = true;
      action.payload = err;
      console.log('请求失败');
      // 预留：dispatch 请求结束
      store.dispatch(action);
    })

};