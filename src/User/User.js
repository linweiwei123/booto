import React from 'react';
import { connect } from '../wad';

const User = (props) => {

  return (<div>
    <h1>用户操作时间记录</h1>
    <ul>
      {props.updateTimes.map(time => <li>{time}</li>)}
    </ul>
    <div></div>
  </div>)
};

export default connect(({user}) =>({updateTimes: user.updateTimes}))(User)