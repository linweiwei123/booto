import { connect } from 'react-redux';
import { isFunction } from './utils';
import { wadDispatch } from './dispatch';

export function wadConnect(mapStateToProps, mapDispatchToProps) {

  let mapDispatchToPropsWrapper;

  if(isFunction(mapDispatchToProps)){
    mapDispatchToPropsWrapper = (dispatch) => {
      let props = mapDispatchToProps();
      props.dispatch = dispatch;
      return props
    };
  }
  else {
    mapDispatchToPropsWrapper = (dispatch) => ({dispatch: wadDispatch(dispatch)})
  }

  return connect(mapStateToProps, mapDispatchToPropsWrapper);
}


