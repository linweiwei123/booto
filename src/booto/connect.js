import { connect } from 'react-redux';
import { isFunction, isObject } from './utils';
import { bootoDispatch } from './dispatch';

export function bootoConnect(mapStateToProps, mapDispatchToProps) {

  let mapDispatchToPropsWrapper;

  if(isFunction(mapDispatchToProps)){
    mapDispatchToPropsWrapper = (dispatch) => {
      let props = mapDispatchToProps();
      props.dispatch = dispatch;
      return props
    };
  }
  else if(isObject(mapDispatchToProps)){
    mapDispatchToPropsWrapper = (dispatch) => (Object.assign(mapDispatchToProps,{dispatch: bootoDispatch(dispatch)}))
  }
  else {
    mapDispatchToPropsWrapper = (dispatch) => ({dispatch: bootoDispatch(dispatch)})
  }

  return connect(mapStateToProps, mapDispatchToPropsWrapper);
}


