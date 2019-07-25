import { isPlainObject, isString } from './utils';

export const wadDispatch = dispatch => wadAction => {
  if(!isString(wadAction) && !isPlainObject(wadAction)){
    throw new Error('action must be string | plainObject');
  }

  let action = isString(wadAction) ? formatStringAction(wadAction) : formatObjectAction(wadAction);
  dispatch(action);
};

function formatStringAction(wadAction){
  return { type: wadAction }
}

function formatObjectAction(wadAction) {
  const { actionType, payload } = wadAction;
  // let typeStrArr = actionType.split('/');
  // if(typeStrArr.length !== 3){
  //   throw new Error('actionType must be [module]/[type]/[reducer method]');
  // }
  // let type = typeStrArr[1];
  return wadAction;
}