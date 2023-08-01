import Axios, { AuthAxios } from './axios';
import { LOGIN, MY_DATA, SIGN_UP } from './endpoints';
import { AUTH_TOKEN_KEY } from '../utils/enums';

export const login = async ({ email, password }) => {
  try {
    const response = await Axios.post(LOGIN, { email, password });
    const { accessToken, userData } = response.data.data;
    localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
    return userData;
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data.error);
    } else {
      throw new Error('Some unknown error occurred!');
    }
  }
};

export const signUp = async ({ email, fullName, password }) => {
  try {
    await Axios.post(SIGN_UP, { email, password, fullName });
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data.error);
    } else {
      throw new Error('Some unknown error occurred!');
    }
  }
};

export const getMyData = async () => {
  try {
    const response = await AuthAxios.get(MY_DATA);
    return response.data.data.user;
  } catch (e) {
    return null;
  }
};
