import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import combineReducers from './combineReducers';
import configStore from './configStore';
import { promiseMiddle } from './middleware';
import { isArray, isFunction, isObject } from './utils';
import * as helper from './helper';
export { wadConnect as connect} from './connect';
// import { ConnectedRouter } from "connected-react-router";

var WadNumber = 0;

function Wad(){

  if(WadNumber === 1){
    throw new Error('Wad can new only once!');
  }

  WadNumber = 1;

  this.middleWares = [promiseMiddle];
  this.history = createBrowserHistory();
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
Wad.prototype.setup = function(conf){

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
  this.reducers = combineReducers(stateReducerMap);

};

Wad.prototype.use = function (middleWares) {
  if(isArray(middleWares)){
    this.middleWares = this.middleWares.concat(middleWares)
  }
  else if(isFunction(middleWares)){
    this.middleWares.push(middleWares)
  }
};

Wad.prototype.start = function (AppComponent, root) {
  // 创建store
  this.store = configStore(this.state, this.reducers, this.middleWares);

  let rootElement = document.querySelector(root);
  const AppWrapper = (
    <Provider store={this.store}>
      <Router history={this.history}>
        <Switch>
          <Route path={"/"} exact={true} component={AppComponent}></Route>
        </Switch>
      </Router>
    </Provider>
  );
  ReactDOM.render(AppWrapper, rootElement);
};

const wad = new Wad();

export default wad;
