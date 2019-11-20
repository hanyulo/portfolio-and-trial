import React from 'react';
import styles from './Home.scss';
import MasonryBlock from './MasonryBlock';
import withStyles from 'isomorphic-style-loader/withStyles';



const MOCK_DATA_CARDS = [
  {
    headerText: 'URL Shortener',
    imgSrc: '/assets/landscape.jpeg',
    content: 'this is long content this is long content',
    redirectUrl: '/url-shortener',
  },
  {
    headerText: 'Side Project',
    imgSrc: '/assets/landscape.jpeg',
    content: 'this is long content this is long content this is long content this is long content this is long content ',
  },
  {
    headerText: 'Side Project',
    imgSrc: '/assets/landscape.jpeg',
    content: 'this is test content this is test content this is test content this is test content this is test content',
  },
  {
    headerText: 'Side Project',
    imgSrc: '/assets/landscape.jpeg',
    content: 'this is test content',
  },
  {
    headerText: 'Side Project',
    imgSrc: '/assets/landscape.jpeg',
    content: 'this is test content this is test content this is test content',
  },
  {
    headerText: 'Side Project',
    imgSrc: '/assets/landscape.jpeg',
    content: 'this is test content',
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
