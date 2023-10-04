import { createSlice } from '@reduxjs/toolkit';

const bookSlice = createSlice({
  name: 'books',
  initialState: [],
  reducers: {
    setBooks: (state, action) => {
      return action.payload;
    },
    addBook: (state, action) => {
      state.push(action.payload);
    },
    updateBook: (state, action) => {
      const index = state.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteBook: (state, action) => {
      const bookId = action.payload;
      return state.filter(book => book.id !== bookId);
    }
  },
});

export const { setBooks, addBook, deleteBook, updateBook } = bookSlice.actions;
export default bookSlice.reducer;
