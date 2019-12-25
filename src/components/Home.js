import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './Home.scss';
import MasonryBlock from './MasonryBlock';


const MOCK_DATA_CARDS = [
  {
    headerText: 'URL Shortener',
    imgSrc: '/assets/landscape.jpeg',
    content: 'this is long content this is long content',
    redirectUrl: '/url-shortener',
  },
  {
    headerText: 'XSS Demo',
    imgSrc: '/assets/hacker.png',
    content: 'this is XXS Demo, which contains three basic XSS examples as following. 1. Stored XSS 2. Reflected XSS 3. DOM-Based XSS',
    redirectUrl: '/xss-demo',
  },
  {
    headerText: 'darhboard',
    imgSrc: '/assets/landscape.jpeg',
    content: 'the dashboard that implement sigin/up process fully',
    redirectUrl: '/dashboard',
  },
  {
    headerText: 'Side Project',
    imgSrc: '/assets/landscape.jpeg',
    content: 'this is test content',
    redirectUrl: '',
  },
  {
    headerText: 'Side Project',
    imgSrc: '/assets/landscape.jpeg',
    content: 'this is test content this is test content this is test content',
    redirectUrl: '',
  },
  {
    headerText: 'Side Project',
    imgSrc: '/assets/landscape.jpeg',
    content: 'this is test content',
    redirectUrl: '',
  },
];

const Home = ({ history }) => (
  <div className={styles.container}>
    <h1>Han-Yu Tseng(曾涵郁)</h1>
    <div className={styles.text}>I am terrible at drawing. Once I figure it out that I am able to make drawing with Front-end web development, I can't stop myself from learning more.</div>
    <div className={styles.girdSection}>
      <h2>Side/Practice Projects</h2>
      <MasonryBlock
        history={history}
        data={MOCK_DATA_CARDS}
      />
    </div>
  </div>
);


export default withStyles(styles)(Home);
