import React, { createContext, useReducer } from 'react';
import { initialState } from './initialState';
import { TYPES } from './types';

const store = createContext(initialState);
const { Provider } = store;
const { SET_VALUES, CLEAR_STORE } = TYPES;

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    const { type, payload } = action;
    switch (type) {
      case SET_VALUES:
        return {
          ...state,
          ...payload,
        };
      case CLEAR_STORE:
        return {
          ...state,
          ...payload,
        };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}> {children} </Provider>;
};

export { store, ContextProvider };
