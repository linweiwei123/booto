>
# booto ![images](./icon.png) 
[![NPM](https://img.shields.io/npm/v/booto.svg)](https://www.npmjs.com/package/booto) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

English | [中文](./README_ZH.md)

Booto is a easy to use framework for react applications. It's base by react, redux and react-router.If you think redux is too cumbersome and your programming ideas are often interrupted, booto is design for you. Booto is a little same like [Dva](https://github.com/dvajs/dva) and [mirror](https://github.com/mirrorjs/mirror), but booto is much more simple, easy to learn, and seamless to use if you are a react user already. 

## Author speak
It's written by simple way and no magic, just about 200 lines of easy code, please be pleasure to try.  

## Features
🎽 Just 3 simple api  
🕋 Divide state and reducer by module   
🎭 Support sync and async action(of course, it's easy)  
🛣️ Easy to use history api to route  
🌆 All the redux api can be accessed  
🎨 Retain middleware, support redux community middlewares and customer.

## Install

```bash
npm install --save booto
```

## Import
```jsx
import booto from 'booto';
```

## Useage

The simple useage - A counter demo;
[The full use]

```jsx
import React from 'react';
import booto, { connect } from 'booto';

booto.setup(
  {
    module: 'counter',
    state: {
      count: 0
    },
    reducers: {
      count: {
        add: count => count + 1,
        minus: count => count - 1
      }
    }
  }
);

const App = connect(counter => counter)(props => (
    <div className="App">
      <div>{props.counter.count}</div>
      <button onClick={() => props.dispatch('counter/count/add')}>Add</button>
      <button onClick={() => props.dispatch('counter/count/minus')}>minus</button>
    </div>
  )
);

booto.start(<App/>,'#root');

```

## API

### setup
```jsx
booto.setup([
  {
    module: 'counter',   //module counter
    state: {             //module counter's state
      count: 0,          
      times: 0
    },
    reducers: {
      count: {           //count's reducer function. this get 3
        add: count => count + 1,
        minus: count => count - 1,
        resetCount: (count, payload) => payload
      },
      times: {           //times's reducer function. this get 1
        add: (time = 0) => time + 1,
      }
    }
  },
  {
    module: 'user',       //mmodule user
    state: {
      history: []
    },
    reducers: {
      history: {
        add: (history = [], payload) => payload ? [...history, payload] : history
      }
    }
  }
]);
```
setup support Object and Array too, object is a module.
- module String, the module name. use for namespace. when dispatch it need specify the module.
- state Object, state in a module, need the initial data
- reducer Object each state has reducers. async action is supported be default in a promise way, If you need the other way of async action, see the use api as followed.

### use

#### Use community middlewares
use is a function to use middlewares, It's just the same as redux.
```javascript
import { createLogger } from 'redux-logger';

booto.use(createLogger());
```

#### Use of built-in promise Middleware
Built-in promise middleware, asynchronous action, is particularly simple to use

```jsx
import React from 'react';
import { connect } from '../booto';

const Card = (props) => {
  const asyncAdd = () =>{
    props.dispatch({
      type: 'counter/count/add',
      payload: new Promise(resolve => setTimeout(()=>resolve(1), 1000))
    })
  };
  return (<button onClick={()=> asyncAdd() }>async Add</button>)
};

export default connect()(Card)
```
Simply pass the asynchronous promise object to the payload, and the payload will call the synchronous action corresponding to 'counter/count/add' in the then method of the promise. (😊Note: Don't be confused by synchronous or asynchronous, it is actually the problem of calling timing. Asynchronous needs the method of the then method of the promise to trigger the synchronous method, and nothing more)

#### Use ustom middleware
It's the same as redux.
```javascript
const actionRecordMiddleWare = store => next => action =>{
  if(action.type !== 'user/history/add'){
    store.dispatch({
      type: 'user/history/add',
      payload: {
        action: action.type,
        time: new Date().getTime()
      }
    });
    next(action)
  }
  else {
    next(action)
  }
};

booto.use(actionRecordMiddleWare);
```
The above is a middleware that records all actions. All action operations and operation time will be recorded except for the 'user/history/add' itself.

### start
```jsx
booto.start(<App/>,'#root');
```
### Other native api

#### store
```javascript
const store = booto.store;
store.subscribe(() => {
  console.log(store.getState());
});
```
You can get the store object, access the getState, subscribe, dispatch, replaceReducer and other methods, that is, the method that the store itself has

#### history
```javascript
const history = booto.history;
```

## todo
- 🌐 booto-cli
- 🚊 booto-router
- 🏞️ booto-realworld-app
- 💯 Integrate in [multipages-generator(A fast CLI for mobile H5)](https://github.com/linweiwei123/multipages-generator)

## License

MIT © [](https://github.com/)
