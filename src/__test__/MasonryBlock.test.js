import React from 'react';
import { createBrowserHistory } from 'history';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MasonryBlock from '../components/MasonryBlock';
import Card from '../components/Card';

const history = createBrowserHistory();

configure({ adapter: new Adapter() });


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
    redirectUrl: '/test-url/',
  },
  {
    headerText: 'Side Project',
    imgSrc: '/assets/landscape.jpeg',
    content: 'this is test content this is test content this is test content this is test content this is test content',
    redirectUrl: '/test-url/',
  },
  {
    headerText: 'Side Project',
    imgSrc: '/assets/landscape.jpeg',
    content: 'this is test content',
    redirectUrl: '/test-url/',
  },
  {
    headerText: 'Side Project',
    imgSrc: '/assets/landscape.jpeg',
    content: 'this is test content this is test content this is test content',
    redirectUrl: '/test-url/',
  },
  {
    headerText: 'Side Project',
    imgSrc: '/assets/landscape.jpeg',
    content: 'this is test content',
    redirectUrl: '/test-url/',
  },
];


describe('<MasonryBlock />', () => {
  it('render 6 Cards in the MasonryBlock', () => {
    const wrapper = mount(<MasonryBlock data={MOCK_DATA_CARDS} history={history} />);
    // this is mocah syntax!!!!
    // expect(wrapper.find('div.cardContainer')).to.have.lengthOf(6);
    expect(wrapper.find(Card)).toHaveLength(6);
  });
});
