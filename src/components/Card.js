import React from 'react';
import PropTypes from 'prop-types';
// import styles from './Card.scss';
import styled from 'styled-components';


const Container = styled.div`
  cursor: pointer;
  background-color: white;
  outline: none;
`;

const Header = styled.div`
  padding: 10px;
  font-size: 18px;
  color: #333;
  background-color: ${props => props.theme.masonryHeader};
`;

const Content = styled.div`
  padding: 10px;
  background-color: white;
  color: black;
`;

const ImgWrapper = styled.div`
  height: 140px;
  background-color: #FBFBFB;
  > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Card = ({
  headerText,
  imgSrc,
  content,
}) => (
  <Container
    role="button"
    tabIndex={0}
    onKeyPress={() => {}}
  >
    <div>
      <Header>{headerText}</Header>
      <ImgWrapper>
        <img src={imgSrc} alt={`project_${headerText}_thumbnail`} />
      </ImgWrapper>
      <Content>{content}</Content>
    </div>
  </Container>
);

Card.defaultProps = {
};

Card.propTypes = {
  headerText: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Card;
