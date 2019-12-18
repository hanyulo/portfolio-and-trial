import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import routes from './routes';

const App = () => (
  <Switch>
    {
      routes.map((route, routeIndex) => (
        <Route
          key={`react-route-${routeIndex}`}
          {...route}
        />
      ))
    }
  </Switch>
);

const exportedApp = module.hot ? hot(App) : App;
export default exportedApp;
