import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';


const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">Smart Diagnosis</h1>
      <nav>
        <NavLink to="/" className="header1" activeClassName="active">Home</NavLink>           {/* Link to Home */}
        <NavLink to="/heart" className="header1" activeClassName="active">Heart</NavLink>     {/* Link to Heart page */}
        <NavLink to="/stroke" className="header1" activeClassName="active">Stroke</NavLink>
      </nav>
    </header>
  );
};

export default Header;
