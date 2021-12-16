import axios from 'axios';
import { APP_API_URL } from './api';

// DEFAULTS CONFIGURATION
axios.defaults.baseURL = APP_API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
export const axiosInstance = axios.create();

export const headerAuthorization = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
