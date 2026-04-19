import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="nav">
      <div className="nav-inner container">
        <Link to="/" className="nav-logo" onClick={close}>
          <img src="/SwanCity_Logo.png" alt="Swan City Roadhouse" />
          <span className="nav-logo-text">
            <strong>Swan City</strong>
            <small>Roadhouse</small>
          </span>
        </Link>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen(v => !v)}
        >
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                onClick={close}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
