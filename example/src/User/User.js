import React from 'react';
import { connect } from 'booto';
import { push } from 'connected-react-router';

// time format function
export function formatDate2(date) {
  let d = date,
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hour = '' + d.getHours(),
    minute = '' + d.getMinutes(),
    second = '' + d.getSeconds();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  if (hour.length < 2) hour = '0' + hour.toString();
  if (minute.length < 2) minute = '0' + minute.toString();
  if (second.length < 2) second = '0' + second.toString();
  return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':');
}

const User = (props) => {
  const { dispatch, push} = props;
  return (
    <div>
      <div className="link" onClick={()=> dispatch(push('/'))}>goto back</div>
      <h1>user option records：</h1>
      <ul>
        {props.history.map((item, index) => (
          <li key={index}>
            <span className="time">{formatDate2(new Date(item.time))}</span>
            <span>{item.action}</span>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default connect(({user}) =>({history: user.history}), {push})(User)