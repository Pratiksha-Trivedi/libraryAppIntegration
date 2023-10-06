import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks, deleteBook, updateBook } from '../slices/bookSlice';
import '../styles/styles.css';
import axios from 'axios';

import { Link, useParams } from 'react-router-dom';

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector(state => state.books);
  const [editingBook, setEditingBook] = useState({ id: '', name: '', author: '' });
  const [selectedBook, setSelectedBook] = useState(null);
  const [filterText, setFilterText] = useState('');
  const { libraryId } = useParams(); // Extract libraryId from URL

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/library/${libraryId}/books`);
      console.log("data comes here", response.data);
      dispatch(setBooks(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditBook = (selectedBook) => {
    setEditingBook(selectedBook);
  };

  const handleUpdateBook = async (id) => {
    const confirmUpdate = window.confirm('Are you sure you want to update this book?');
    if (confirmUpdate) {
      if (editingBook.name.trim() === '' || editingBook.author.trim() === '') {
        alert('Please fill the data correctly');
        return;
      }
      try {
        const response = await axios.put(`http://localhost:8080/library/books/${id}`, editingBook);
        const updatedBook = { ...editingBook };
        dispatch(updateBook(updatedBook));
        setEditingBook({ id: '', name: '', author: '' });
        setSelectedBook(null);
        alert('Book updated successfully');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteBook = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:8080/library/books/${id}`);
        dispatch(deleteBook(id));
        alert('Book deleted successfully');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Book List</h2>
      <div>
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Filter by name..."
        />
      </div>
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
          {books
            .filter(book => book.name.toLowerCase().startsWith(filterText.toLowerCase()))
            .map(book => (
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
