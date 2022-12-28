import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageList } from './ImageGalleryStyled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images }) => {
  // const getURL = largeImage => {
  //   console.log(largeImage);
  // };
  return (
    <ImageList>
      {images.map(image => {
        return <ImageGalleryItem image={image} key={image.id} />;
      })}
    </ImageList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
