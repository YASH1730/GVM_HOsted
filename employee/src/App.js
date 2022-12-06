import React from 'react';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom'
import './App.css';
import { CssBaseline } from "@mui/material";
// importing components
import Home from './components/Home';
import Form from './components/Form'
import List from './components/List'
import AlertBar from './components/utility/AlertBar';
function App() {

  function Path() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/list' element={<List />} />
        </Routes>
      </BrowserRouter>
    )

  }

  return (
    <>
      <AlertBar/>
    <Path/>
      <Form/>
    </>
  );
}

export default App;
