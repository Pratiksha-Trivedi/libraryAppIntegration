import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const bookSlice = createSlice({
  name: 'books',
  initialState: [],
  reducers: {
    setBooks(state, action) {
      return action.payload;
    },
    addBook(state, action) {
      state.push(action.payload);
    },
    updateBook(state, action) {
      const { id, title, author, genre } = action.payload;
      const existingBook = state.find(book => book.id === id);
      if (existingBook) {
        existingBook.title = title;
        existingBook.author = author;
        existingBook.genre = genre;
      }
    },
    deleteBook(state, action) {
      return state.filter(book => book.id !== action.payload);
    },
  },
});

export const fetchBooks = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/books'); // Replace with your actual API endpoint
    dispatch(setBooks(response.data));
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

export const fetchBookById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/books/${id}`);
    dispatch(setBooks([response.data]));
  } catch (error) {
    console.error('Error fetching book by id:', error);
  }
}

export const { setBooks, addBook, updateBook, deleteBook } = bookSlice.actions;
export default bookSlice.reducer;
