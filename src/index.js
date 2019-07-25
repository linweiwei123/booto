import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from "connected-react-router";
import combineReducers from './combineReducers';
import configStore from './configStore';
import { promiseMiddle } from './middleware';
import { isArray, isFunction, isObject } from './utils';
import * as helper from './helper';
export { bootoConnect as connect} from './connect';

let BootoNumber = 0;

function Booto(){

  if(BootoNumber === 1){
    throw new Error('Booto can new only once!');
  }

  BootoNumber = 1;

  this.history = createBrowserHistory();
  this.middleWares = [routerMiddleware(this.history),promiseMiddle];
}

/**
 * confg
 * {
 *   module: 'key',
 *   state: value,
 *   reducers:
 * }
 * @param conf
 */
Booto.prototype.setup = function(conf){

  if(!isArray(conf) && !isObject(conf)){
    throw new Error('conf must be array or object');
  }

  let stateReducerMap = {};

  // single module type
  if(isObject(conf)){
    this.state = helper.createSingleModuleState(conf);
    stateReducerMap = helper.createSingleSRMap(conf);
  }
  // multiple module type
  else {
    this.state = helper.createMultiModuleState(conf);
    stateReducerMap = helper.createMultiSRMap(conf);
  }

  // reducers combine
  let finalStateReducerMap = helper.withRouterSR(stateReducerMap, this.history);
  this.reducers = combineReducers(finalStateReducerMap);

};

Booto.prototype.use = function (middleWares) {
  if(isArray(middleWares)){
    this.middleWares = this.middleWares.concat(middleWares)
  }
  else if(isFunction(middleWares)){
    this.middleWares.push(middleWares)
  }
};

Booto.prototype.start = function (AppComponent, root) {
  // 创建store
  this.store = configStore(this.state, this.reducers, this.middleWares);

  let rootElement = document.querySelector(root);
  const AppWrapper = (
    <Provider store={this.store}>
      <ConnectedRouter history={this.history}>
        {AppComponent}
      </ConnectedRouter >
    </Provider>
  );
  ReactDOM.render(AppWrapper, rootElement);
};

const booto = new Booto();

export default booto;
