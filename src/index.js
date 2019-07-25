import React from 'react';
import './index.css';
import booto from './booto/index';
import App from './App';
import { createLogger } from 'redux-logger';
import { actionRecordMiddleWare } from './middleware';

booto.setup([
  {
    module: 'counter',
    state: {
      count: 0
    },
    reducers: {
      count: {
        add: count => count + 1,
        minus: count => count - 1,
        resetCount: (count, payload) => payload
      }
    }
  },
  {
    module: 'user',
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

booto.use(createLogger());
booto.use(actionRecordMiddleWare);
booto.start(<App/>,'#root');

const store = booto.store;
store.subscribe(() => {
  console.log('变化了');
  console.log(store.getState());
});

console.log('booto',booto);