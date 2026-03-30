import React from 'react';
import './Footer.css';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="app-footer">
      <div className="footer-columns">
        {/* Column 1: App Navigation */}
        <div className="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li onClick={() => onNavigate('home')}>Home</li>
            <li onClick={() => onNavigate('squad')}>The Squad</li>
            <li onClick={() => onNavigate('calendar')}>Match Calendar</li>
            <li onClick={() => onNavigate('stats')}>Season Stats</li>
          </ul>
        </div>

        {/* Column 2: Club Identity */}
        <div className="footer-col">
          <h4>The Club</h4>
          <ul>
            <li>Spotify Camp Nou</li>
            <li>La Masia</li>
            <li>Club Anthem</li>
            <li>Més que un club</li>
          </ul>
        </div>

        {/* Column 3: Iconic Eras */}
        <div className="footer-col">
          <h4>History</h4>
          <ul>
            <li>The Dream Team</li>
            <li>The Pep Era</li>
            <li>The MSN Treble</li>
            <li>125th Anniversary</li>
          </ul>
        </div>

        {/* Column 4: Support */}
        <div className="footer-col">
          <h4>Help</h4>
          <ul>
            <li>Contact Us</li>
            <li>Support / FAQs</li>
            <li>Privacy Policy</li>
            <li>Legal Terms</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="fb-left">
          <div className="footer-brand">
            <img src="/crest.svg" alt="Crest" />
            <span>FC BARCELONA</span>
          </div>
          <p>© Copyright FC Barcelona — Official Fan Dashboard</p>
        </div>
        
        <div className="fb-right">
          <span className="barca-huge-text">BARÇA</span>
        </div>
      </div>

      <div className="footer-legal-links">
        <span>Legal Terms</span>
        <span>Privacy Policy</span>
        <span>Cookies</span>
        <span>Accessibility</span>
        <span>Consent management</span>
      </div>
    </footer>
  );
};

export default Footer;