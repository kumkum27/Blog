import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Our Blog</h3>
          <p>Discover the latest trends, insights, and stories in the world of blogging and digital content creation.</p>
        </div>
        <nav className="footer-nav">
          <h3>Quick Links</h3>
          <Link to="#">About</Link>
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms of Service</Link>
        </nav>
        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} My Blog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;