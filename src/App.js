import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AddLibrary from './components/AddLibrary';
import LibraryList from './components/LibraryList';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LibraryUpdateForm from './components/LibraryUpdateForm';

function App() {
  return (
    <Provider store={store}>
     
      <Router>
        <div className="App">
          {/* <nav>
            <ul>
              <li>
                <Link to="/add" class="btn btn-primary">Add Library</Link>
              </li>
              <li>
                <Link to="/list" class="btn btn-primary mt-2">Library List</Link>
              </li>
            </ul>
          </nav> */}
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
            
          </Routes>
        </div>
      </Router>
      
    </Provider>
  );
}

export default App;
