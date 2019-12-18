import React from 'react';
import Home from './components/Home';
import UrlShortener from './components/UrlShortener';
import XSSDemo from './components/XSSDemo';
import ErrorPage from './components/ErrorPage';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/url-shortener',
    component: UrlShortener,
  },
  {
    path: '/xss-demo',
    component: XSSDemo,
  },
  {
    render: ({ staticContext }) => {
      if (staticContext) {
        staticContext.statusCode = 404;
      }
      return (
        <ErrorPage
          webStatus={404}
        />
      );
    },
  },
];


export default routes;
