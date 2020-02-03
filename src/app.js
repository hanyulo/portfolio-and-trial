import { hot } from 'react-hot-loader/root';
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components'
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

const theme = {
  navBarBackgroundColor: '#242831',
  dark: '#333740',
  light: '#FBFBFB',
  h1Color: '#F8DA35',
  masonryHeader: '#efd254',
  fontFamily: '"Times New Roman", Times, serif',
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.location.pathname === '/' ? props.theme.dark : props.theme.light};
    color: ${props => props.location.pathname === '/' ? 'white' : 'black'};
    font-family: ${props => props.theme.fontFamily};
    input {
      background-color: ${props => props.theme.light};
    }
  }
`;

// TODO: userProfile is the props that should be passed by the server-side (not yet impleneted)
const App = ({ userProfile }) => {
  return (
      <Route
        render={({ location, history }) => {
          return (
            <ThemeProvider
              theme={theme}
            >
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
              <GlobalStyle
                location={location}
              />
            </ThemeProvider>
          );
        }}
      />
  );
}

const exportedApp = module.hot ? hot(App) : App;
export default exportedApp;
