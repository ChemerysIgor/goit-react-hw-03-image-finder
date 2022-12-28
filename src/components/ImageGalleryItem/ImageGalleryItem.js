import { Pic, ListItem } from './ImageGalleryItemStyled';
import Modal from 'react-modal';
import { Component } from 'react';
import PropTypes from 'prop-types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: `fixed`,
  },
  top: `0`,
  left: `0`,
  width: `100vw`,
  height: `100vh`,
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  backgroundColor: `rgba(0, 0, 0, 0.8)`,
  zIndex: `1200`,
  maxWidth: `calc(100vw - 48px)`,
  maxHeight: `calc(100vh - 24px)`,
};

Modal.setAppElement('#root');

export default class ImageGalleryItem extends Component {
  state = { selected: false };
  isOpenModal = () => {
    this.setState({ selected: true });
  };
  isCloseModal = () => {
    this.setState({ selected: false });
  };
  render() {
    const { image } = this.props;

    return (
      <>
        <ListItem key={image.id}>
          <Pic
            src={image.smallImage}
            alt={image.tag}
            onClick={this.isOpenModal}
          />
        </ListItem>
        <Modal
          isOpen={this.state.selected}
          onRequestClose={this.isCloseModal}
          style={customStyles}
        >
          <div>
            <img src={image.largeImage} alt={image.tag} />
          </div>
        </Modal>
      </>
    );
  }
}

ImageGalleryItem.propTypes = { image: PropTypes.object.isRequired };
