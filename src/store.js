// store.js

import { configureStore } from '@reduxjs/toolkit';
import libraryReducer from './slices/librarySlice';
const store = configureStore({
  reducer: {
    libraries: libraryReducer,
  },
});


export default store;
