import { Link } from 'react-router-dom';
import { FiPhone, FiMapPin } from 'react-icons/fi';
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
          <p><FiPhone /> <a href="tel:+15874950804">+1 (587) 495-0804</a></p>
        </div>

        <div className="footer-col">
          <h4>Hours</h4>
          <p>Mon – Thu: 3:30 PM – 12:00 AM</p>
          <p className="footer-muted">Fri – Sat: 3:30 PM – 1:00 AM</p>
          <p className="footer-muted">Sun: 3:30 PM – 2:00 AM</p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            {/* <li><Link to="/menu">Menu</Link></li> */}
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/reservation">Reservation</Link></li>
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
