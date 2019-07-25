import React from 'react';
import './index.css';
import wad from './wad/index';
import App from './App';
import { createLogger } from 'redux-logger';
import { actionRecordMiddleWare } from './middleware';

// 设置App全局状态
wad.setup([
  {
    module: 'counter',
    state: {
      count: 0
    },
    reducers: {
      count: {
        add: count => {
          console.log('运行了add', new Date().getTime());
          return count + 1;
        },
        minus: count => {
          console.log('运行了minus');
          return count - 1;
        },
        resetCount: (count, payload) => {
          return payload
        }
      }
    }
  },
  {
    module: 'user',
    state: {
      updateTimes: []
    },
    reducers: {
      history: {
        add: (updateTimes, payload) => payload ? [...updateTimes, payload] : updateTimes
      }
    }
  }
]);

wad.use([createLogger()]);
// wad.use(actionRecordMiddleWare);

//app.router();

// 渲染页面
wad.start(App,'#root');

const store = wad.store;
store.subscribe(() => {
  console.log('变化了');
  console.log(store.getState());
});

console.log(wad);