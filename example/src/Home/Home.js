import React from 'react';
import Card from '../Card/Card'
import { connect } from 'booto';
import { push } from 'connected-react-router';

function Home(props) {

  const { dispatch, push} = props;

  return (
    <div className="home">
      <div>{props.count}</div>
      <button onClick={() => props.dispatch('counter/count/add')}>Add</button>
      <button onClick={() => props.dispatch('counter/count/minus')}>minus</button>
      <Card/>
      <div className="link" onClick={()=> dispatch(push('/user'))}>goto User history</div>
    </div>
  );
}

export default connect(
  ({counter}) => ({count: counter.count}), { push }
)(Home);
