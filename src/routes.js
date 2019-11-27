import Home from './components/Home';
import UrlShortener from './components/UrlShortener';
import XSSDemo from './components/XSSDemo';

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
];


export default routes;
