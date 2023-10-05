import React from 'react';

import AddLibrary from './components/AddLibrary';
import LibraryList from './components/LibraryList';
import BookList from './components/BookList';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import AddBook from './components/AddBook';
function App() {
  return (
   
      <Router>
        <div className="App">
      
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div class="container-fluid">

    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link to="/add" class="nav-link btn btn-primary">Add Library</Link>
        </li>
        <li class="nav-item">
          <Link to="/list" class="nav-link btn btn-primary">Library List</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

          <Routes>
            <Route path="/add" element={<AddLibrary />} />
            <Route path="/list" element={<LibraryList />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/books/:libraryId" element={<BookList/>} />
            <Route path="/addBook/:libraryId" element={<AddBook/>}/>

          </Routes>
        </div>
      </Router>
      

  );
}

export default App;
