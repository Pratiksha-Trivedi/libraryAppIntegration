import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../slices/bookSlice';
import '../styles/styles.css'; 
const AddBook = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');

  const handleAddBook = () => {
    dispatch(addBook({ name, author }));
  };

  return (
    <div>
      <h2>Add Book</h2>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          className="form-input"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Author:</label>
        <input
          type="text"
          className="form-input"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
      </div>
      <button className="button" onClick={handleAddBook}>Add Book</button>
    </div>
  );
}

export default AddBook;
