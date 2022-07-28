import React, { PureComponent } from 'react';
import { getInfoFromApi } from '../../utils/Api';
import { Wrap } from './App.styled';
import { SeacrhBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ButtonShowMore } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';

export class App extends PureComponent {
  state = {
    queryString: '',
    page: 1,
    images: [],
    modalCard: null,
    status: 'idle',
    showModal: false,
    totalHits: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { queryString, page } = this.state;

    if (prevState.queryString !== queryString || prevState.page !== page) {
      try {
        this.setState({ status: 'pending' });
        const response = await getInfoFromApi(queryString, page);
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...response],
            status: 'resolved',
          };
        });
      } catch (error) {
        this.setState({ status: 'rejected' });
        console.log(error);
      }
    }
  }

  submitForm = ({ queryString }, { resetForm }) => {
    if (!queryString.trim()) {
      resetForm();
      return;
    }
    if (queryString === this.state.queryString) {
      resetForm();
      return;
    }
    this.setState({ images: [], page: 1, queryString: queryString });
    resetForm();
  };

  showMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  showModal = id => {
    this.setState({ showModal: true });
    const modalCard = this.state.images.find(image => image.id === id);
    this.setState({ modalCard });
  };

  render() {
    const { images, page, status, showModal, modalCard } = this.state;

    return (
      <Wrap>
        <SeacrhBar submitForm={this.submitForm} />;
        {status === 'resolved' && (
          <ImageGallery images={images} showModal={this.showModal} />
        )}
        {status === 'resolved' && images.length / page === 12 && (
          <ButtonShowMore showMore={this.showMore} />
        )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <h1>Please try again</h1>}
        {showModal && (
          <Modal modalCard={modalCard} closeModal={this.closeModal} />
        )}
      </Wrap>
    );
  }
}
