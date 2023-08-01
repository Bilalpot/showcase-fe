import axios from 'axios';
import { AUTH_TOKEN_KEY } from '../utils/enums';

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const AuthAxios = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
  },
});

export default Axios;
