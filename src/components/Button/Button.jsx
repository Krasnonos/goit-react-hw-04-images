import PropTypes from 'prop-types';
import { BtnLoadMore } from './Button.styled';

export const ButtonShowMore = ({ showMore }) => {
  return (
    <BtnLoadMore type="button" onClick={showMore}>
      Load more
    </BtnLoadMore>
  );
};

ButtonShowMore.propTypes = {
  showMore: PropTypes.func.isRequired,
};
