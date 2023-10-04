// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/NavBar';
import LibraryList from './components/LibraryList';
import LibraryDetails from './components/LibraryDetails';
import AddLibrary from './components/AddLibrary';
import UpdateLibrary from './components/UpdateLibrary';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';

const App = () => {
  return (
   <LibraryList></LibraryList>
  );
}

export default App;
