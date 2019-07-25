import { applyMiddleware, compose, createStore } from 'redux';

const getMiddleWares = (middleWares) => {
  if(middleWares && middleWares.length >0){
    return applyMiddleware(...middleWares)
  }
  return applyMiddleware()
};

const configStore = (preloadState, reducers, middleWares) => {
  const store = createStore(
    reducers,
    preloadState,
    compose(getMiddleWares(middleWares))
  );
  return store;
};

export default configStore;