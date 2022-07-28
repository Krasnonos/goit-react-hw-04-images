import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com';
const API_KEY = '27491593-aa922f21d022df769349f5779';

export const getInfoFromApi = async (queryString, page) => {
  const respons = await axios(
    `/api/?q=${queryString}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return respons.data.hits;
};
