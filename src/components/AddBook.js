// AddBook.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../slices/bookSlice';

const AddBook = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ title: '', author: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddBook = () => {
    dispatch(addBook(formData));
    setFormData({ title: '', author: '' }); // Reset form after adding book
  };

  return (
    <div>
      <h2>Add Book</h2>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
      </div>
      <div>
        <label>Author:</label>
        <input type="text" name="author" value={formData.author} onChange={handleInputChange} />
      </div>
      <button onClick={handleAddBook}>Add Book</button>
    </div>
  );
};

export default AddBook;
