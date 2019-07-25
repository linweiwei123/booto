import { isPlainObject, isString } from './utils';

export const bootoDispatch = dispatch => bootoAction => {
  if(!isString(bootoAction) && !isPlainObject(bootoAction)){
    throw new Error('action must be string | plainObject');
  }

  let action = isString(bootoAction) ? formatStringAction(bootoAction) : formatObjectAction(bootoAction);
  dispatch(action);
};

function formatStringAction(bootoAction){
  return { type: bootoAction }
}

function formatObjectAction(bootoAction) {
  const { actionType, payload } = bootoAction;
  // let typeStrArr = actionType.split('/');
  // if(typeStrArr.length !== 3){
  //   throw new Error('actionType must be [module]/[type]/[reducer method]');
  // }
  // let type = typeStrArr[1];
  return bootoAction;
}