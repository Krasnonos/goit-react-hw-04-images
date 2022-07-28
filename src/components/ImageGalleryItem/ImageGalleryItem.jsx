import PropTypes from 'prop-types';
import { ImageGalleryCard, ImageGalleryImage } from './ImageGalerryItem.styled';

export const ImageGalleryItem = ({ card, showModal, id }) => {
  return (
    <ImageGalleryCard
      onClick={() => {
        showModal(id);
      }}
    >
      <ImageGalleryImage src={card.webformatURL} alt={card.tags} />
    </ImageGalleryCard>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  showModal: PropTypes.func.isRequired,
  card: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
