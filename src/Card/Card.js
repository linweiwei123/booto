import React from 'react';
import { connect } from '../booto';

const Card = (props) => {

  const reset = (payload) => {
    props.dispatch({
      type: 'counter/count/resetCount',
      payload
    })
  };

  const asyncAdd = () =>{
    console.log('start Time', new Date().getTime());
    let p = new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve(1)
      }, 1000)
    });
    props.dispatch({
      type: 'counter/count/add',
      payload:p
    })
  };

  return (<div>
    <button onClick={()=> reset(0)}>reset count</button>
    <div>
      <button onClick={()=> asyncAdd() }>async Add</button>
    </div>
  </div>)
};

export default connect()(Card)