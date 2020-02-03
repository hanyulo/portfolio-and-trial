import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './MasonryBlock.scss';
import Card from './Card';

class MasonryBlock extends Component {
  constructor(props) {
    super(props);
    this.gridContainer = null;
    this.gridItems = [];
    this.onCardRef = this._onCardRef.bind(this);
    this.onClickCard = this._onClickCard.bind(this);
  }

  componentDidMount() {
    this._resizeAllGridItems();
  }

  _onCardRef(node) {
    this.gridItems.push(node);
  }

  _onClickCard(redirectUrl) {
    const { history } = this.props;
    history.push(redirectUrl);
  }

  _resizeGridItem(item, rowHeight, rowGap) {
    const rowSpan = Math.ceil((+item.firstChild.offsetHeight + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = `span ${rowSpan}`;
  }

  _resizeAllGridItems() {
    if (this.gridContainer) {
      const grid = this.gridContainer;
      const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'), 10);
      const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'), 10);
      this.gridItems.forEach((gridItem) => {
        this._resizeGridItem(gridItem, rowHeight, rowGap);
      });
    }
  }

  render() {
    const { data } = this.props;
    const Cards = data.map(({
      headerText,
      imgSrc,
      content,
      redirectUrl,
      externalLink,
    }, index) => {
      const Wrapper = ({children}) => {
        if (redirectUrl) {
          return (
            <div>
              <Link to={redirectUrl}>
                {children}
              </Link>
            </div>
          );
        }
        return (
          <div>
            <a target="_blank" rel="noopener noreferrer" href={externalLink}>
              {children}
            </a>
          </div>
        );
      };

      return (
        <div
          ref={this.onCardRef}
          key={`masonery_block_${index}`}
        >
          <Wrapper>
            <Card
              headerText={headerText}
              imgSrc={imgSrc}
              content={content}
              redirectUrl={redirectUrl}
            />
          </Wrapper>
        </div>
      );
    });
    return (
      <div
        className={styles.gridContainer}
        ref={(node) => {
          if (!this.gridContainer) {
            this.gridContainer = node;
          }
        }}
      >
        {Cards}
      </div>
    );
  }
}


MasonryBlock.defaultProps = {
  data: {
    headerText: '',
    imgSrc: '',
    content: '',
    redirectUrl: '',
  },
};

MasonryBlock.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      headerText: PropTypes.string,
      imgSrc: PropTypes.string,
      content: PropTypes.string,
      redirectUrl: PropTypes.string,
    }),
  ),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styles)(MasonryBlock);
