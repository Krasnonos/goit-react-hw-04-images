import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { BsSearch } from 'react-icons/bs';
import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const SeacrhBar = ({ submitForm }) => {
  return (
    <Searchbar>
      <Formik initialValues={{ queryString: '' }} onSubmit={submitForm}>
        <SearchForm>
          <SearchFormButton type="submit">
            <BsSearch size="30" />
          </SearchFormButton>

          <SearchFormInput
            name="queryString"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </Searchbar>
  );
};

SeacrhBar.propTypes = {
  submitForm: PropTypes.func.isRequired,
};
