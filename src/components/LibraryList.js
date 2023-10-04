import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLibraries, deleteLibrary, updateLibrary } from '../slices/librarySlice';
import '../styles/styles.css';
import axios from 'axios';
import LibraryUpdateForm from './LibraryUpdateForm';

const LibraryList = () => {
  const dispatch = useDispatch();
  const libraries = useSelector(state => state.libraries);
  const [editingLibrary, setEditingLibrary] = useState({ id: '', name: '', ownername: '', books: [] });
  const [selectedLibrary, setSelectedLibrary] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/library')
    .then(res => {
      console.log("data comes here", res.data);
      dispatch(setLibraries(res.data));
    })
    .catch(error => console.log(error));
   
  }, [dispatch]);
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/library/${id}`)
      .then(res => {
        console.log("hiiiiiii");
        dispatch(deleteLibrary(id));
     
      })
      .catch(error => console.log(error));
  };

  const handleUpdateClick = (library) => {
    setSelectedLibrary(library);
    setEditingLibrary(library);
  };

  const handleCancelUpdate = () => {
    setSelectedLibrary(null);
    setEditingLibrary({ id: '', name: '', ownername: '', books: [] });
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
            <tr key={library.id}>
              <td>{library.id}</td>
              <td>
               
                  {library.name}
              
              </td>
              <td>{library.ownerName}</td>
              <td>
               
              <button onClick>Add Books</button>
                
                  <button onClick={() => handleUpdateClick(library)}>Update</button>
                
                <button onClick={() => handleDelete(library.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLibrary && (
        <LibraryUpdateForm
          library={selectedLibrary}
          onClose={handleCancelUpdate}
        />
      )}
    </div>
  );
};

export default LibraryList;
