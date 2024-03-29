import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './Home/Home';
import User from './User/User';
import connect from 'react-redux/es/connect/connect';

const routes = [
  {
    path: '/',
    component: Home,
    options: {
      exact: true
    }
  },
  {
    path: '/user',
    component: User,
  },
];

function App() {
  return (
    <div>
      <header className="App-header">
        Learn Booto
      </header>
      <div className="main">
        <Switch>
          {
            routes.map((item, index) =>
              <Route
                key={index}
                path={item.path}
                component={item.component}
                {...item.options}
              /> )
          }
        </Switch>
      </div>
    </div>
  );
}

export default connect()(App);
