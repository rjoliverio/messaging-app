import React from 'react';
import './App.css';
import { Routes, Route} from "react-router-dom";
import HomeComponent from './routes/HomeComponent.js';
import ChatComponent from './routes/ChatComponent.js';
import io from "socket.io-client";

const socket = io.connect('/');
function App() {
  return (
    <div className='App'>
      <div className="mt-5"></div>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/chat/:room/:user" element={<ChatComponent socket={socket} />} />
      </Routes>
    </div>
  );
}

export default App;
