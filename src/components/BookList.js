import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../slices/bookSlice';

import '../styles/styles.css'; 
const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector(state => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>{book.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
