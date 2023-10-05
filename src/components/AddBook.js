import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { useNavigate, useParams, Link } from 'react-router-dom';
import { addBook } from '../slices/bookSlice';

const AddBook = () => {
  const navigate = useNavigate();
  const {libraryId } = useParams();
  const [book, setBook] = useState({ name: '', author: '' });
  const dispatch = useDispatch();

  const handleAddBook = async () => {
    if (book.name.trim() === '' || book.author.trim() === '') {
      alert('Please fill the data correctly');
      return;
    }

    const newBook = { ...book, library_id: libraryId };

    try {
      const response = await axios.post(`http://localhost:8080/library/${libraryId}`, newBook, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      newBook.id = response.data.id;
      dispatch(addBook(newBook));
      alert('Book added Successfully');
      setBook({ name: '', author: '' });
      navigate(`/books/${libraryId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add Book for Student whose id is {libraryId}</h2>

      <input
        type="text"
        placeholder="Name"
        value={book.name}
        onChange={(event) => setBook({ ...book, name: event.target.value })}
      />
      <br />
      <input
        type="text"
        placeholder="Author"
        value={book.author}
        onChange={(event) => setBook({ ...book, author: event.target.value })}
      />
      <br />
      <button onClick={handleAddBook} className="btn btn-success">
        Add
      </button>
      <br />
      <Link to="/students" className="btn btn-sm btn-primary">
        Back
      </Link>
    </div>
  );
};

export default AddBook;
