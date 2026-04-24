import { useState } from 'react';
import { FiCalendar, FiClock, FiUsers, FiPhone, FiMail, FiUser } from 'react-icons/fi';
import { GiHorseshoe } from 'react-icons/gi';
import './Reservation.css';

const today = () => new Date().toISOString().split('T')[0];

export default function Reservation() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    date: '', time: '', partySize: '2', notes: '',
  });

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Swan City Roadhouse — Reservation request for ${form.name} (${form.date} @ ${form.time})`
    );
    const body = encodeURIComponent(
      `Reservation Request\n\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Email: ${form.email}\n` +
      `Date: ${form.date}\n` +
      `Time: ${form.time}\n` +
      `Party size: ${form.partySize}\n` +
      `Notes: ${form.notes || '(none)'}\n`
    );
    window.location.href = `mailto:hello@swancityroadhouse.ca?subject=${subject}&body=${body}`;
  };

  return (
    <div className="page-wrap res-page">
      <header className="page-header">
        <div className="container">
          <span className="subtitle">— Save Your Seat —</span>
          <h1>Reservations</h1>
          <div className="star-rule light"><span className="star">★ ★ ★</span></div>
        </div>
      </header>

      <section className="section">
        <div className="container res-grid">
          <aside className="res-info">
            <span className="eyebrow">— Good To Know —</span>
            <h2>Before You Book</h2>
            <div className="star-rule"><span className="star">★ ★ ★</span></div>
            <ul className="res-notes">
              <li>Walk-ins always welcome — reservations recommended on weekends and game nights.</li>
              <li>For parties of <strong>8 or more</strong>, please call us directly at <a href="tel:+18666584755">+1 (866) 658-4755</a>.</li>
              <li>Hours: Mon – Sun · 11:00 AM – 1:00 AM.</li>
              <li>We'll confirm your booking by phone or email within a few hours.</li>
            </ul>
            <div className="horseshoe-note">
              <GiHorseshoe size={22} />
              <span>Can't wait to have y'all over</span>
            </div>
          </aside>

          <form className="res-form" onSubmit={handleSubmit}>
            <div className="form-corner tl">★</div>
            <div className="form-corner tr">★</div>
            <span className="eyebrow">— Reserve a Table —</span>
            <h2>Your Details</h2>
            <div className="star-rule"><span className="star">★ ★ ★</span></div>

            <div className="row">
              <label>
                <span><FiUser /> Full Name</span>
                <input type="text" required value={form.name} onChange={handleChange('name')} />
              </label>
              <label>
                <span><FiUsers /> Party Size</span>
                <select required value={form.partySize} onChange={handleChange('partySize')}>
                  {[1,2,3,4,5,6,7,8].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
                  ))}
                  <option value="8+">8 or more (call us)</option>
                </select>
              </label>
            </div>

            <div className="row">
              <label>
                <span><FiPhone /> Phone</span>
                <input type="tel" required value={form.phone} onChange={handleChange('phone')} />
              </label>
              <label>
                <span><FiMail /> Email</span>
                <input type="email" required value={form.email} onChange={handleChange('email')} />
              </label>
            </div>

            <div className="row">
              <label>
                <span><FiCalendar /> Date</span>
                <input type="date" required min={today()} value={form.date} onChange={handleChange('date')} />
              </label>
              <label>
                <span><FiClock /> Time</span>
                <input type="time" required value={form.time} onChange={handleChange('time')} />
              </label>
            </div>

            <label>
              <span>Special Requests <em>(optional)</em></span>
              <textarea rows="4" value={form.notes} onChange={handleChange('notes')}
                placeholder="Birthdays, dietary needs, seating preferences..." />
            </label>

            <button type="submit" className="btn btn-primary">
              <FiCalendar /> Request Reservation
            </button>
            <p className="res-disclaimer">
              Submitting will open your email app with a pre-filled message — send it and
              we'll confirm shortly.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
