
export const actionRecordMiddleWare = store => next => action =>{
  if(action.type !== 'user/history/add'){
    store.dispatch({
      type: 'user/history/add',
      payload: {
        action: action.type,
        time: new Date().getTime()
      }
    });
    next(action)
  }
  else {
    next(action)
  }
};