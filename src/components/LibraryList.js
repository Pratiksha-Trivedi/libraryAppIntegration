import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLibraries, deleteLibrary, updateLibrary } from '../slices/librarySlice';
import '../styles/styles.css';
import axios from 'axios';

import { Link } from 'react-router-dom';

const LibraryList = () => {
  const dispatch = useDispatch();
  const libraries = useSelector(state => state.libraries);
  const [editingLibrary, setEditingLibrary] = useState({ id: '', name: '', ownerName: '', books: [] });
  const [selectedLibrary, setSelectedLibrary] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/library');
      dispatch(setLibraries(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditLibrary = (selectedLibrary) => {
    setEditingLibrary(selectedLibrary);
  };

  const handleUpdateLibrary = async (id) => {
    const confirmUpdate = window.confirm('Are you sure you want to update this library?');
    if (confirmUpdate) {
      if (editingLibrary.name.trim() === '' || editingLibrary.ownerName.trim() === '') {
        alert('Please fill the data correctly');
        return;
      }
      try {
        const response = await axios.put(`http://localhost:8080/library/${id}`, editingLibrary);
        const updatedLibrary = { ...editingLibrary };
        dispatch(updateLibrary(updatedLibrary));
        setEditingLibrary({ id: '', name: '', ownerName: '', books: [] });
        alert('Library updated successfully');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteLibrary = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this library?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:8080/library/${id}`);
        dispatch(deleteLibrary(id));
        alert('Library deleted successfully');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h2>Library List</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Owner Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {libraries && libraries.map(library => (
            editingLibrary.id === library.id ? (
              <tr key={library.id}>
                <td>{library.id}</td>
                <td><input type="text" value={editingLibrary.name} onChange={(event) => setEditingLibrary({ ...editingLibrary, name: event.target.value })} /></td>
                <td><input type="text" value={editingLibrary.ownerName} onChange={(event) => setEditingLibrary({ ...editingLibrary, ownerName: event.target.value })} /></td>
                <td>
                  <button onClick={() => handleUpdateLibrary(library.id)} className="btn btn-success">Update</button>
                  <button onClick={() => setEditingLibrary({ id: '', name: '', ownerName: '', books: [] })} className="btn btn-warning">Back</button>
                </td>
              </tr>
            ) : (
              <tr key={library.id}>
                <td>{library.id}</td>
                <td>{library.name}</td>
                <td>{library.ownerName}</td>
                <td>
                  <button><Link to={`/addBook/${library.id}`}  className="btn btn-sm btn-info" >Add Book</Link></button>
                  <button><Link to={`/books/${library.id}`}>Show Books</Link></button>
                  <button onClick={() => handleEditLibrary(library)}>Edit</button>
                  <button onClick={() => handleDeleteLibrary(library.id)}>Delete</button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LibraryList;
