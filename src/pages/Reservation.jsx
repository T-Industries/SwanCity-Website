import { useState } from 'react';
import { FiCalendar, FiClock, FiUsers, FiPhone, FiMail, FiUser, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { GiHorseshoe } from 'react-icons/gi';
import './Reservation.css';

const today = () => new Date().toISOString().split('T')[0];

const initialForm = {
  name: '', phone: '', email: '',
  date: '', time: '', partySize: '2', notes: '',
};

export default function Reservation() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [serverError, setServerError] = useState('');

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setServerError('');
    try {
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
    } catch {
      setStatus('error');
      setServerError("Couldn't submit your reservation. Please try again or call +1 (866) 658-4755.");
    }
  };

  const reset = () => {
    setForm(initialForm);
    setStatus('idle');
    setServerError('');
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

          {status === 'success' ? (
            <div className="res-form res-success">
              <FiCheckCircle size={48} className="success-icon" />
              <h2>Reservation Requested</h2>
              <div className="star-rule"><span className="star">★ ★ ★</span></div>
              <p>Thanks! We've sent your request to the Roadhouse. We'll confirm by phone or email shortly.</p>
              <button type="button" onClick={reset} className="btn btn-primary">
                Make Another Reservation
              </button>
            </div>
          ) : (
            <form className="res-form" onSubmit={handleSubmit}>
              <div className="form-corner tl">★</div>
              <div className="form-corner tr">★</div>
              <span className="eyebrow">— Reserve a Table —</span>
              <h2>Your Details</h2>
              <div className="star-rule"><span className="star">★ ★ ★</span></div>

              {status === 'error' && (
                <div className="form-banner error">
                  <FiAlertCircle /> <span>{serverError}</span>
                </div>
              )}

              <div className="row">
                <label>
                  <span><FiUser /> Full Name</span>
                  <input type="text" required value={form.name} onChange={handleChange('name')} disabled={status === 'sending'} />
                </label>
                <label>
                  <span><FiUsers /> Party Size</span>
                  <select required value={form.partySize} onChange={handleChange('partySize')} disabled={status === 'sending'}>
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
                  <input type="tel" required value={form.phone} onChange={handleChange('phone')} disabled={status === 'sending'} />
                </label>
                <label>
                  <span><FiMail /> Email</span>
                  <input type="email" required value={form.email} onChange={handleChange('email')} disabled={status === 'sending'} />
                </label>
              </div>

              <div className="row">
                <label>
                  <span><FiCalendar /> Date</span>
                  <input type="date" required min={today()} value={form.date} onChange={handleChange('date')} disabled={status === 'sending'} />
                </label>
                <label>
                  <span><FiClock /> Time</span>
                  <input type="time" required value={form.time} onChange={handleChange('time')} disabled={status === 'sending'} />
                </label>
              </div>

              <label>
                <span>Special Requests <em>(optional)</em></span>
                <textarea rows="4" value={form.notes} onChange={handleChange('notes')} disabled={status === 'sending'}
                  placeholder="Birthdays, dietary needs, seating preferences..." />
              </label>

              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                <FiCalendar /> {status === 'sending' ? 'Sending…' : 'Request Reservation'}
              </button>
              <p className="res-disclaimer">
                We'll send your request straight to the Roadhouse and follow up to confirm.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
