import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './MasonryBlock.scss';

class MasonryBlock extends Component {
  constructor(props) {
    super(props);
    this.gridContainer = null;
    this.gridItems = [];
  }

  componentDidMount() {
    this._resizeAllGridItems();
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
    }, index) => (
      <div
        key={`masonery_block_${index}`}
        className={styles.cardContainer}
        ref={(node) => {
          if (node) {
            this.gridItems.push(node);
          }
        }}
        role="button"
        tabIndex={0}
        onClick={() => {
          this._onClickCard(redirectUrl);
        }}
        onKeyPress={() => {}}
      >
        <div>
          <div className={styles.cardHeader}>{headerText}</div>
          <div className={styles.imgWrapper}>
            <img src={imgSrc} alt={`project_${headerText}_thumbnail`} />
          </div>
          <div className={styles.cardContent}>{content}</div>
        </div>
      </div>
    ));
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

export default MasonryBlock;
