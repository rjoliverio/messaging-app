import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.min.js";
import { Routes, Route} from "react-router-dom";
import HomeComponent from './routes/HomeComponent.js';

function App() {
  return (
    <div className='App'>
      <h1 className='text-white mt-5'>Omingle</h1>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
      </Routes>
    </div>
  );
}

export default App;
