import React from 'react';
import { connect } from 'booto';

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