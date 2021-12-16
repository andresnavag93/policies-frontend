import { Modal } from 'antd';
import { TYPES } from 'context/types';

const { CLEAR_STORE } = TYPES;

export const handleErrors = (err, dispatch) => {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (err.response.status === 401 || err.response.status === 403) {
      Modal.error({
        content: 'Lo sentimos, su sesión se ha expirado',
      });
      dispatch({ type: CLEAR_STORE, payload: { token: null, role_id: null } });
    } else if (
      err.response.data.message === 'auth_email_unique' ||
      err.response.data.message === 'clients_email_unique'
    ) {
      Modal.error({
        content: 'Lo sentimos, el correo ya existe en el sistema',
      });
    } else if (err.response.data.message) {
      Modal.error({
        content: err.response.data.message,
      });
    } else {
      Modal.error({
        content: 'Lo sentimos, hubo un error',
      });
    }
  } else if (err.request) {
    // The request was made but no response was received
    console.log('Error no response', err.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error general request', err.message);
  }
};
