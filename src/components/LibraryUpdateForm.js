import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateLibrary } from '../slices/librarySlice';

const LibraryUpdateForm = ({ library, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: library.name,
    ownerName: library.ownerName,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateLibrary({ id: library.id, ...formData }));
    onClose(); // Close the modal or navigate back
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Owner Name:
        <input
          type="text"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update Library</button>
    </form>
  );
};

export default LibraryUpdateForm;
