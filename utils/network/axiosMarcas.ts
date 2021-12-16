import axios from 'axios';
import { APP_BRAND_API_URL } from './api';

// DEFAULTS CONFIGURATION
axios.defaults.baseURL = APP_BRAND_API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
export const axiosMarcas = axios.create();

export const headerAuthorization = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
