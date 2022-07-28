import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalBlock } from './Modal.styled';

const rootRef = document.querySelector('#modal-root');

export const Modal = ({ closeModal, modalCard }) => {
  useEffect(() => {
    const closeModalByBackdrop = e => {
      if (e.target === e.currentTarget) {
        closeModal(false);
      }
    };

    const closeModalByEsc = e => {
      e.preventDefault();
      if (e.code === 'Escape') {
        closeModal(false);
      }
    };

    const modalRef = document.querySelector('[data-modal="wrap"]');
    modalRef.addEventListener('click', closeModalByBackdrop);
    window.addEventListener('keydown', closeModalByEsc);

    return () => {
      modalRef.removeEventListener('click', closeModalByBackdrop);
      window.removeEventListener('keydown', closeModalByEsc);
    };
  }, [closeModal]);

  return createPortal(
    <Overlay data-modal="wrap">
      <ModalBlock>
        <img src={modalCard.largeImageURL} alt={modalCard.tags} />
      </ModalBlock>
    </Overlay>,
    rootRef
  );
};

Modal.propTypes = {
  modalCard: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
