import { deepExtend } from './utils';

export default function combineReducers(reducers){
  const reducerKeys = Object.keys(reducers);

  return function combination(preState = {}, action){
    const stateDiff = {};
    let nextState;
    let hasChanged = false;

    for(let i=0; i<reducerKeys.length; i++){
      let reducerKey = reducerKeys[i];

      // execute the booto way reducers
      if(action.type === reducerKey && isBootoActionType(reducerKey)){
        const { module, state } = splitActionType(action.type);
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

      // support redux way reducer
      if(!isBootoActionType(reducerKey)){
        const reducer = reducers[reducerKey];
        const preStateForKey = preState[reducerKey];
        const nextStateForKey = reducer(preStateForKey, action);
        stateDiff[reducerKey] = nextStateForKey;
        hasChanged = hasChanged || nextStateForKey !== preStateForKey;
        break;
      }
    }
    nextState = deepExtend({}, preState, stateDiff);
    return hasChanged ? nextState : preState;
  }
}

/**
 * analyse booto type to {path state method}
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

function isBootoActionType(actionType) {
  if(!actionType) return false;
  return actionType.split('/').length === 3;
}
