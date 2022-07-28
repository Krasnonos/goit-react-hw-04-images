import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Wrap } from './App.styled';
import { SeacrhBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ButtonShowMore } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';

export const App = () => {
  const [queryString, setQueryString] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [modalCard, setModalCard] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (queryString === '') {
      return;
    }
    const getInfoFromApi = async (queryString, page) => {
      const respons = await axios(
        `https://pixabay.com/api/?q=${queryString}&page=${page}&key=27491593-aa922f21d022df769349f5779&image_type=photo&orientation=horizontal&per_page=12`
      );
      return respons.data.hits;
    };

    try {
      setStatus('pending');
      getInfoFromApi(queryString, page).then(res => {
        setImages(state => [...state, ...res]);
        setStatus('resolved');
      });
    } catch (error) {
      setStatus('rejected');
    }
  }, [page, queryString]);

  const submitForm = ({ queryString }, { resetForm }) => {
    if (!queryString.trim()) {
      toast('Query string is empty');
      resetForm();
      return;
    }
    setImages([]);
    setPage(1);
    setQueryString(queryString);
    resetForm();
  };

  const showMore = () => {
    setPage(state => state + 1);
  };

  const openModal = id => {
    setShowModal(true);
    const modalCard = images.find(image => image.id === id);
    setModalCard(modalCard);
  };

  return (
    <Wrap>
      <SeacrhBar submitForm={submitForm} />;
      {status === 'resolved' && (
        <ImageGallery images={images} showModal={openModal} />
      )}
      {status === 'resolved' && images.length / page === 12 && (
        <ButtonShowMore showMore={showMore} />
      )}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <h1>Please try again</h1>}
      {showModal && <Modal modalCard={modalCard} closeModal={setShowModal} />}
      <ToastContainer autoClose={2000} />
    </Wrap>
  );
};
