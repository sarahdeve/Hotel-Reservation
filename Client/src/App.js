import React from 'react';
import { Routes } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import List from './pages/list/List';
import Login from './pages/login/Login';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/hotels' element={<List/>}/>
        <Route path='/hotel' element={<Hotel/>}/>
        <Route path='/hotels/:id' element={<Hotel/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
  );
}

export default App;
