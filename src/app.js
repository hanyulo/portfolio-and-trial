import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import routes from './routes';
import AppShell from './containers/AppShell';

const App = ({ userProfile }) => (
  <Route
    render={(props) => {
      return (
        <AppShell
          location={props.location}
          userProfile={userProfile}
        >
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
        </AppShell>
      );
    }}
  />
);

const exportedApp = module.hot ? hot(App) : App;
export default exportedApp;
