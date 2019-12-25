import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import routes from './routes';
import AppShell from './containers/AppShell';
import { AuthContextManager } from './utils/localStorage';

const { fetchAuthContext } = AuthContextManager();


// TODO: need to be used in SSR
function PrivateRoute({ key, path, component: Component, authorization }) {
  const renderHandler = ({ location, history }) => {
    const { ok } = fetchAuthContext();
    if (ok) {
      return (
        <Component
          history={history}
        />
      );
    }
    return (
      <Redirect
        to={{
          pathname: '/signin',
          state: { from: location },
        }}
      />
    );
  };
  return (
    <Route
      render={renderHandler}
    />
  );
}

// TODO: userProfile is the props that should be passed by the server-side (not yet impleneted)
const App = ({ userProfile }) => {
  return (
    <Route
      render={({ location, history }) => {
        return (
          <AppShell
            location={location}
            history={history}
            userProfile={userProfile}
          >
            <Switch>
              {
                routes.map((route, routeIndex) => {
                  // TODO: need to be used in SSR
                  // if (route.authorization) {
                  //   return (
                  //     <PrivateRoute
                  //       key={`react-route-${routeIndex}`}
                  //       {...route}
                  //     />
                  //   );
                  // }
                  return (
                    <Route
                      key={`react-route-${routeIndex}`}
                      {...route}
                    />
                  );
                })
              }
            </Switch>
          </AppShell>
        );
      }}
    />
  );
}

const exportedApp = module.hot ? hot(App) : App;
export default exportedApp;
