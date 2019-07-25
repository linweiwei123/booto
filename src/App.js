import React from 'react';
import './App.css';
import Card from './Card/Card'
import User from './User/User'
import { connect } from './wad';

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        Learn React
      </header>
      <div>{props.count}</div>
      <button onClick={() => props.dispatch('counter/count/add')}>Add</button>
      <button onClick={() => props.dispatch('counter/count/minus')}>minus</button>
      <Card/>
      <User/>
    </div>
  );
}

export default connect(
  ({counter}) => ({count: counter.count})
)(App);
