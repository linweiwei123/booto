import { deepExtendArrayType } from './utils';
import { connectRouter } from 'connected-react-router'

export function createSingleModuleState(conf){
  const { module, state } = conf;
  return {
    [module]: state
  };
}

export function createSingleSRMap(conf) {
  const { module, reducers } = conf;
  const reducerKeys = Object.keys(reducers);
  const stateReducerMap = {};

  // 将多层级转换为一级map形式，type-reducer形式
  reducerKeys.forEach(key => {
    let fnsObj = reducers[key];
    let fnNames = Object.keys(fnsObj);

    fnNames.forEach( fnName => {
      let actionType = `${module}/${key}/${fnName}`;
      stateReducerMap[actionType] = fnsObj[fnName];
    });
  });

  return stateReducerMap;
}

export function createMultiModuleState(conf){
  let mergedState = {};
  for(let i = 0; i < conf.length; i++){
    let {module, state} = conf[i];
    mergedState[module] = state
  }
  return mergedState;
}

export function createMultiSRMap(conf){
  let mergedReducerArr = [];
  let mergedReducer = {};
  for(let i = 0; i < conf.length; i++){
    mergedReducerArr.push(createSingleSRMap(conf[i]));
  }

  deepExtendArrayType(mergedReducer, mergedReducerArr);

  return mergedReducer;
}

export function withRouterSR(reducer, history) {
  let routerReducer = {
    router: connectRouter(history),
  };
  return Object.assign(reducer, routerReducer);
}