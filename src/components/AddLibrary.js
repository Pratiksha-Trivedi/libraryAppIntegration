import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addLibrary } from '../slices/librarySlice';

const AddLibrary = () => {
  const [name, setName] = useState('');
  const [ownerName, setOwnerName] = useState(''); 

  const dispatch = useDispatch();

  const handleAddLibrary = async () => {
    try {
      console.log(name, ownerName);
      const response = await axios.post('http://localhost:8080/library', {
        name: name,
        ownerName: ownerName, 
      });
  
      dispatch(addLibrary(response.data));
  
      window.alert(`Library "${name}" added successfully!`);
  
      setName('');
      setOwnerName('');
    } catch (error) {
      console.error(error);
    }
  };
  
  
  return (
    <div>
      <h2>Add Library</h2>
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
        <label>Owner Name:</label>
        <input
          type="text"
          className="form-input"
          value={ownerName}
          onChange={e => setOwnerName(e.target.value)} // Update ownerName state
        />
      </div>
      <button className="button" onClick={handleAddLibrary}>Add Library</button>
    </div>
  );
}

export default AddLibrary;
