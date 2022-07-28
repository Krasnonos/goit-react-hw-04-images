import PropTypes from 'prop-types';
import { ImageList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, showModal }) => {
  return (
    <ImageList>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          card={image}
          showModal={showModal}
          id={image.id}
        />
      ))}
    </ImageList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape).isRequired,
  showModal: PropTypes.func.isRequired,
};
