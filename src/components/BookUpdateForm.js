import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBook } from '../slices/bookSlice';

const BookUpdateForm = ({ book, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: book.name,
    author: book.author
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateBook = () => {
    dispatch(updateBook({ id: book.id, ...formData }));
    onClose(); // Close the form after updating
  };

  return (
    <div>
      <h2>Update Book</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleUpdateBook}>Update Book</button>
    
    </div>
  );
};

export default BookUpdateForm;
