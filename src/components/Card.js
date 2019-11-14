import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.scss';

const Card = ({
  onCardRef,
  onClickCard,
  headerText,
  imgSrc,
  content,
  redirectUrl,
}) => (
  <div
    className={styles.cardContainer}
    ref={(node) => {
      if (node) {
        onCardRef(node);
        // this.gridItems.push(node);
      }
    }}
    role="button"
    tabIndex={0}
    onClick={() => {
      onClickCard(redirectUrl);
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
);

Card.defaultProps = {
  onCardRef: () => {},
  onClickCard: () => {},
};

Card.propTypes = {
  onCardRef: PropTypes.func,
  onClickCard: PropTypes.func,
  headerText: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  redirectUrl: PropTypes.string.isRequired,
};

export default Card;
