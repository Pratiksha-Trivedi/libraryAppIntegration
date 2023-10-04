// store.js

import { configureStore } from '@reduxjs/toolkit';
import libraryReducer from './slices/librarySlice';
import bookReducer from './slices/bookSlice';
const store = configureStore({
  reducer: {
    libraries: libraryReducer,
    books: bookReducer, 
  },
});


export default store;
