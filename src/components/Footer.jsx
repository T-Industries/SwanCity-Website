import { Link } from 'react-router-dom';
import { FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-col">
          <img src="/SwanCity_Logo.png" alt="Swan City Roadhouse" className="footer-logo" />
          <p className="footer-tagline">Eats · Drinks · Relax</p>
          <p className="footer-muted">
            A neighborhood roadhouse in Grande Prairie — come hungry, leave happy.
          </p>
        </div>

        <div className="footer-col">
          <h4>Visit</h4>
          <p><FiMapPin /> 11401 100 Ave., Grande Prairie, AB T8V 5M6, Canada</p>
          <p><FiPhone /> <a href="tel:+15873220786">+1 (587) 322-0786</a></p>
        </div>

        <div className="footer-col">
          <h4>Hours</h4>
          <p><FiClock /> Monday – Sunday</p>
          <p className="footer-muted">9:00 AM – 10:00 PM</p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© {year} Swan City Roadhouse. All rights reserved.</span>
      </div>
    </footer>
  );
}
