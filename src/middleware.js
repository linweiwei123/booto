
export const actionRecordMiddleWare = store => next => action =>{
  console.log(action);
  if(action.type !== 'user/history/add'){
    // store.dispatch(action)
  }
  // else{
  //   store.dispatch({
  //     type: 'user/history/add',
  //     payload: new Date().getTime()
  //   });
  // }
};