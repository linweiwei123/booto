import { deepExtend } from './utils';

export default function combineReducers(reducers){

  let isFirstReduce = true;

  return function combination(preState = {}, action){

    var nextState;
    const stateDiff = {};
    let hasChanged = false;

    if(isFirstReduce){
      isFirstReduce = false;
      return preState;
    }

    const { module, state } = splitActionType(action.type);

    let reducerKeys = Object.keys(reducers);

    for(let i=0; i<reducerKeys.length; i++){
      let reducerKey = reducerKeys[i];

      // find the target action
      if(action.type === reducerKey){
        const iModule = splitActionType(reducerKey).module;
        const iState = splitActionType(reducerKey).state;
        if(typeof stateDiff[iModule] === 'undefined'){
          stateDiff[iModule] = {};
        }
        if(typeof stateDiff[iModule][iState] === 'undefined'){
          stateDiff[iModule][iState] = {};
        }
        let preStateForKey = preState[module][state];
        let nextStateForKey = stateDiff[iModule][iState] = reducers[reducerKey](preStateForKey, action.payload);
        hasChanged = hasChanged || nextStateForKey !== preStateForKey;
        break;
      }
    }

    nextState = deepExtend({}, preState, stateDiff);

    return hasChanged ? nextState : preState;
  }

}

/**
 * 解析成path、state、method
 * @param actionType
 * @return {*|string}
 */
function splitActionType(actionType) {
  let typeStrArr = actionType.split('/');
  if(typeStrArr.length !== 3){
    throw new Error('actionType must be [module]/[type]/[reducer method]');
  }
  const [module, state, reducerName] = typeStrArr;
  return {
    statePath: `${module}/${state}`,
    module: module,
    state,
    reducerName
  };
}
