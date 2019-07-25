>
# booto ![images](./icon.png) 
[![NPM](https://img.shields.io/npm/v/booto.svg)](https://www.npmjs.com/package/booto) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[English](./README.md) | 中文

Booto 是一个极易使用的为react应用设计的框架，他基于react、redux、react-router。主要解决redux繁琐使用的问题，如果你也认为redux概念太多，使用繁琐🙁，并且经常把编程思路打乱那么booto可能是你的菜。他跟[Dva](https://github.com/dvajs/dva)、[mirror](https://github.com/mirrorjs/mirror)有点类似，但是实现更佳简单，易于理解，便于快速开发react应用。

## Warning
booto目前仅用了2天时间开发完成，它还需与时间去锤炼

## Features
🎽 只有3个api
🕋 按模块划分state与reducer
🎭 支持同步、异步action
🛣️ 方便访问路由状态
🌆 任何redux的方法和属性都能访问，容易扩展
🎨 保留中间件机制，兼容redux社区中间件，自定义中间件等

## Install

```bash
npm install --save booto
```

## Import
```jsx
import booto from 'booto';
```

## Useage

最简使用案例代码：加减计数器案例

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

## API介绍

### setup
```jsx
booto.setup([
  {
    module: 'counter',   //模块1
    state: {             //模块下的state对象
      count: 0,          
      times: 0
    },
    reducers: {
      count: {           //count对应reducer方法，此处有3个
        add: count => count + 1,
        minus: count => count - 1,
        resetCount: (count, payload) => payload
      },
      times: {           //times对应reducer方法，此处有1个
        add: (time = 0) => time + 1,
      }
    }
  },
  {
    module: 'user',       //模块2
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
setup支持单个对象，也支持数组。某个对象是一个模块。
- module 字符串 模块名，用于划分模块，作为命名空间。dispatch对应需要加上模块名；
- state 对象 对应模块的state，需要初始化值；
- reducer 对象 子属性对应各个state的reducer，异步的reducer目前默认；支持promise的方式，如需其他需要在中间件重扩展，请查看use api；

### use

#### 使用社区中间件
use是使用中间件的方法，与redux的中间件使用方式无异
```javascript
import { createLogger } from 'redux-logger';

booto.use(createLogger());
```

#### 内置promise中间件的使用
内置promise中间件，即异步action, 使用特别简单
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
只需将异步promise对象传递给payload，payload会在promise的then方法重调用'counter/count/add'对应的同步action。（😊注：不要被同步异步搞混了，实际上就是调用时机的问题，异步的需要promise的then方法触发后调用同步方法，仅此而已）

#### 自定义中间件
自定义中间件与redux一样，
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
上面是一个记录所有action的中间件，除了记录用的'user/history/add'本身外，所有的action操作与操作时间都会被记录

### start
```jsx
booto.start(<App/>,'#root');
```
### 其他原生api

#### store对象
```javascript
const store = booto.store;
store.subscribe(() => {
  console.log(store.getState());
});
```
可以获取store对象，访问getState、subscribe、dispatch、replaceReducer等方法，即store自身有的方法

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
