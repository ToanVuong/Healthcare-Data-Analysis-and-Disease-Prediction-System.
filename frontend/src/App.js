// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Profile from './components/Profile';
import Heart from './components/Heart';
import Stroke from './components/Stroke';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Profile />} />        {/* Home page */}
          <Route path="/heart" element={<Heart />} />      {/* Heart page */}
          <Route path="/stroke" element={<Stroke />} />      {/* Heart page */}

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
