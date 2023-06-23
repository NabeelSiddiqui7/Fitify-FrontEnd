import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from './Pages/Main';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/meals" element={<Main />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
