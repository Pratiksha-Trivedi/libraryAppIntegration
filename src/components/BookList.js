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
  console.log(books)
  const [editingBook, setEditingBook] = useState({ id: '', name: '', author: '' });
  const [selectedBook, setSelectedBook] = useState(null);
  const { libraryId } = useParams(); // Extract libraryId from URL

  useEffect(() => {
    axios.get(`http://localhost:8080/library/${libraryId}/books`) 
      .then(res => {
        console.log("data comes here", res.data);
        dispatch(setBooks(res.data));
      })
      .catch(error => console.log(error));
  }, []);

  const handleEditBook = (selectedBook) => {
    setEditingBook(selectedBook);
  };

  const handleUpdateBook = (id) => {
    const confirmUpdate = window.confirm('Are you sure you want to update this book?');
    if (confirmUpdate) {
      if (editingBook.name.trim() === '' || editingBook.author.trim() === '') {
        alert('Please fill the data correctly');
        return;
      }
      axios.put(`http://localhost:8080/library/books/${id}`, editingBook)
        .then(res => {
          const updatedBook = { ...editingBook };
          dispatch(updateBook(updatedBook));
          setEditingBook({ id: '', name: '', author: '' });
          setSelectedBook(null);
          alert('Book updated successfully');
        })
        .catch(error => console.log(error));
    }
  };

  const handleDeleteBook = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (confirmDelete) {
      axios.delete(`http://localhost:8080/library/books/${id}`)
        .then(res => {
          dispatch(deleteBook(id));
          alert('Book deleted successfully');
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div>
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
            editingBook.id === book.id ? (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td><input type="text" value={editingBook.name} onChange={(event) => setEditingBook({ ...editingBook, name: event.target.value })} /></td>
                <td><input type="text" value={editingBook.author} onChange={(event) => setEditingBook({ ...editingBook, author: event.target.value })} /></td>
                <td>
                  <button onClick={() => handleUpdateBook(book.id)} className="btn btn-success">Update</button>
                  <button onClick={() => setEditingBook({ id: '', name: '', author: '' })} className="btn btn-warning">Back</button>
                </td>
              </tr>
            ) : (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>
                  <button onClick={() => handleEditBook(book)}>Edit</button>
                  <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>

    
    </div>
  );
};

export default BookList;
