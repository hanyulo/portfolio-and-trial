import React from 'react';
import styled from 'styled-components';
// import styles from './Home.scss';
import MasonryBlock from './MasonryBlock';


const sideProjects = [
  {
    headerText: 'URL Shortener',
    imgSrc: '/assets/url_shortener_icon.png',
    content: 'the small project for getting familiar with node.js',
    redirectUrl: '/url-shortener',
  },
  {
    headerText: 'XSS Demo',
    imgSrc: '/assets/hacker.png',
    content: 'this is XXS Demo, which contains three basic XSS examples as following. 1. Stored XSS 2. Reflected XSS 3. DOM-Based XSS',
    redirectUrl: '/xss-demo',
  },
  {
    headerText: 'Dashboard',
    imgSrc: '/assets/authorization_icon.png',
    content: 'the dashboard that implement sigin/up process fully',
    redirectUrl: '/dashboard',
  },
  {
    headerText: 'D3 - Demo',
    imgSrc: '/assets/china_d3_demo_map.png',
    content: 'D3 map demo for coronavirus data-visualization',
    externalLink: 'https://hanyulo.github.io/coronavirus-outbreak/',
  },
  {
    headerText: 'Test',
    imgSrc: '/assets/landscape.jpeg',
    content: 'this is test content this is test content this is test content',
    redirectUrl: '',
  },
  {
    headerText: 'Test',
    imgSrc: '/assets/landscape.jpeg',
    content: 'this is test content',
    redirectUrl: '',
  },
];

const works = [
  {
    headerText: 'TheReporter',
    imgSrc: '/assets/twreporter_icon.png',
    content: 'The home page of TheReporter official website',
    externalLink: 'https://www.twreporter.org/',
  },
  {
    headerText: 'Suicide Survivors',
    imgSrc: '/assets/suicide_survivors_icon.png',
    content: 'Suicide survivors share their stories and tell us how they face grief and questions',
    externalLink: 'https://www.twreporter.org/i/walk-with-survivor-of-suicide-gcs',
  },
  {
    headerText: 'PRO360',
    imgSrc: '/assets/pro360_icon.png',
    content: 'PRO360 Official Website',
    externalLink: 'https://www.pro360.com.tw/',
  },
  {
    headerText: 'COVID19 in China',
    imgSrc: '/assets/chinaoutbreak.png',
    content: 'COVID19 outbreak in china from Taiwan Public Television Service',
    externalLink: 'https://newmedia.pts.org.tw/chinaoutbreak/',
  },
  {
    headerText: 'COVID19 in China - part2',
    imgSrc: '/assets/sub-chinaoutbreak.png',
    content: 'COVID19 day-by-day outbreak analysis in china. from Taiwan Public Television Service',
    externalLink: 'https://newmedia.pts.org.tw/sub-chinaoutbreak/',
  },
  {
    headerText: 'COVID19 in China - part3',
    imgSrc: '/assets/sub-chinaoutbreak-taishang.png',
    content: 'Taishang Exodus caused by COVID-19 outbreak in China',
    externalLink: 'https://newmedia.pts.org.tw/sub-chinaoutbreak-3-/',
  },
];

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px;
`;

const Text = styled.div`
  font-size: 16px;
  max-width: 600px;
`;

const GridSection = styled.div`
  margin: 30px 0;
`;

const Title = styled.h1`
  color: ${props => props.theme.h1Color};
`;

const SubTitle = styled.h2`
  font-weight: 700;
`;

const Home = ({ history }) => (
  <Container>
    <Title>Hello!</Title>
    <SubTitle>My Name is Han-Yu Tseng（曾涵郁）and I'm a Front-end developer</SubTitle>
    <Text>I am terrible at drawing. Once I figure it out that I am able to make drawing with Front-end web development, I can't stop myself from learning more.</Text>
    <hr />
    <GridSection>
      <h2>Works</h2>
      <MasonryBlock
        history={history}
        data={works}
      />
    </GridSection>
    <GridSection>
      <h2>Side/Practice Projects</h2>
      <MasonryBlock
        history={history}
        data={sideProjects}
      />
    </GridSection>
  </Container>
);


export default (Home);
