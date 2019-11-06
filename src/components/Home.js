import React from 'react';
import styles from './Home.scss';
import MasonryBlock from './MasonryBlock';


const MOCK_DATA_CARDS = [
  {
    headerText: 'Side Project',
    imgSrc: '/assets/landscape.jpeg',
    content: 'this is long content this is long content',
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

const Home = () => (
  <div className={styles.container}>
    <h2>Han-Yu Tseng(曾涵郁)</h2>
    <div className={styles.text}>I am terrible at drawing. Once I figure it out that I am able to make drawing with Front-end web development, I can't stop myself from learning more.</div>
    <div className={styles.girdSection}>
      <MasonryBlock
        data={MOCK_DATA_CARDS}
      />
    </div>
  </div>
);


export default Home;
