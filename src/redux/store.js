import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import mylocationReducer from './locationSlice';

const store = configureStore({
  reducer: {
    mylocation: mylocationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
