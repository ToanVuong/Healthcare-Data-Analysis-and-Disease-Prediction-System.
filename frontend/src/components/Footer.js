import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h2 className="footer-logo">Smart Diagnosis</h2>
        <p className="footer-description">This is where the future of healthcare technology begins—where innovation meets the power of early diagnosis, and the potential to save lives is unlocked. Our app represents the next step in medical advancements, empowering individuals and healthcare professionals with tools to predict, prevent, and better understand diseases, starting with heart disease, diabetes, and breast cancer. Together, we’re shaping a healthier tomorrow, one diagnosis at a time.</p>
        <div className="social-icons">
          <a href="#facebook" className="social-icon">F</a>
          <a href="#google" className="social-icon">G+</a>
          <a href="#linkedin" className="social-icon">in</a>
        </div>
      </div>

      <div className="footer-right">
        <ul className="footer-links">
          <Link to="/"><li><a href="#home">Home</a></li></Link>
          <Link to="/heart"><li><a href="#heart">Heart</a></li></Link>
          <Link to="/stroke"><li><a href="#breast">Stroke</a></li></Link>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
