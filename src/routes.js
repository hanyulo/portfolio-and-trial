import Home from './components/Home';
import UrlShortener from './components/UrlShortener';

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
];


export default routes;
