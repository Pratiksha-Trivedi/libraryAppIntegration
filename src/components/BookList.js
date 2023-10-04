import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks, deleteBook, updateBook } from '../slices/bookSlice';
import '../styles/styles.css';
import axios from 'axios';
import BookUpdateForm from './BookUpdateForm';
import { Link, useParams } from 'react-router-dom';

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector(state => state.books);
  const [editingBook, setEditingBook] = useState({ id: '', name: '', author: '' });
  const [selectedBook, setSelectedBook] = useState(null);
  const { libraryId } = useParams(); // Extract libraryId from URL
console.log(books)
  useEffect(() => {
    axios.get(`http://localhost:8080/library/${libraryId}/books`) 
      .then(res => {
        console.log("data comes here", res.data);
        dispatch(setBooks(res.data));
      })
      .catch(error => console.log(error));
  }, [dispatch, libraryId]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/library/books/${id}`)
      .then(res => {
        console.log("hiiiiiii");
        dispatch(deleteBook(id));
      })
      .catch(error => console.log(error));
  };

  const handleUpdateClick = (book) => {
    setSelectedBook(book);
    setEditingBook(book);
  };

  const handleCancelUpdate = () => {
    setSelectedBook(null);
    setEditingBook({ id: '', name: '', author: '' });
  };

  return (
    <div>
                   <button>

             
 
  <Link to="/add-book">Add Books</Link>
  </button>
      <h2>Book List</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books && books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>
                <button onClick={() => handleUpdateClick(book)}>Update</button>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedBook && (
        <BookUpdateForm
          book={selectedBook}
          onClose={handleCancelUpdate}
        />
      )}
    </div>
  );
};

export default BookList;
