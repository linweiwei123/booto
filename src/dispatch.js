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
  return bootoAction;
}