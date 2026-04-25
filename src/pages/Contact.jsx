import { useState } from 'react';
import { FiPhone, FiMapPin, FiClock, FiMail, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { GiHorseshoe } from 'react-icons/gi';
import './Contact.css';

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [serverError, setServerError] = useState('');

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Please enter a valid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setStatus('sending');
    setServerError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
    } catch {
      setStatus('error');
      setServerError("Something went wrong. Please try again or call +1 (866) 658-4755.");
    }
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setStatus('idle');
    setServerError('');
  };

  return (
    <div className="page-wrap contact-page">
      <header className="page-header">
        <div className="container">
          <span className="subtitle">— Drop Us a Line —</span>
          <h1>Contact Us</h1>
          <div className="star-rule light"><span className="star">★ ★ ★</span></div>
        </div>
      </header>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <span className="eyebrow">— Howdy —</span>
            <h2>Get in Touch</h2>
            <div className="star-rule"><span className="star">★ ★ ★</span></div>

            <div className="contact-item">
              <FiPhone size={26} />
              <div>
                <h4>Phone</h4>
                <p><a href="tel:+18666584755">+1 (866) 658-4755</a></p>
              </div>
            </div>

            <div className="contact-item">
              <FiMapPin size={26} />
              <div>
                <h4>Location</h4>
                <p>11401 100 Ave.</p>
                <p>Grande Prairie, AB T8V 5M6</p>
                <p className="muted">Canada</p>
              </div>
            </div>

            <div className="contact-item">
              <FiClock size={26} />
              <div>
                <h4>Business Hours</h4>
                <p>Monday – Sunday</p>
                <p className="muted">11:00 AM – 1:00 AM</p>
              </div>
            </div>

            <div className="horseshoe-note">
              <GiHorseshoe size={24} />
              <span>Reservations welcome · Walk-ins too</span>
            </div>
          </div>

          {status === 'success' ? (
            <div className="contact-form contact-success">
              <FiCheckCircle size={48} className="success-icon" />
              <h2>Message Sent</h2>
              <div className="star-rule"><span className="star">★ ★ ★</span></div>
              <p>Thanks for reaching out. We'll get back to you shortly.</p>
              <button type="button" onClick={reset} className="btn btn-primary">
                Send Another
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-corner tl">★</div>
              <div className="form-corner tr">★</div>
              <span className="eyebrow">— Write to Us —</span>
              <h2>Send a Message</h2>
              <div className="star-rule"><span className="star">★ ★ ★</span></div>

              {status === 'error' && (
                <div className="form-banner error">
                  <FiAlertCircle /> <span>{serverError}</span>
                </div>
              )}

              <label>
                <span>Name</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  className={errors.name ? 'has-error' : ''}
                  disabled={status === 'sending'}
                />
                {errors.name && <small className="field-error">{errors.name}</small>}
              </label>

              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  className={errors.email ? 'has-error' : ''}
                  disabled={status === 'sending'}
                />
                {errors.email && <small className="field-error">{errors.email}</small>}
              </label>

              <label>
                <span>Subject</span>
                <input
                  type="text"
                  value={form.subject}
                  onChange={handleChange('subject')}
                  className={errors.subject ? 'has-error' : ''}
                  disabled={status === 'sending'}
                  placeholder="What's this about?"
                />
                {errors.subject && <small className="field-error">{errors.subject}</small>}
              </label>

              <label>
                <span>Message</span>
                <textarea
                  rows="5"
                  value={form.message}
                  onChange={handleChange('message')}
                  className={errors.message ? 'has-error' : ''}
                  disabled={status === 'sending'}
                />
                {errors.message && <small className="field-error">{errors.message}</small>}
              </label>

              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                <FiMail /> {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="map-section">
        <iframe
          title="Swan City Roadhouse — Grande Prairie"
          src="https://www.google.com/maps?q=11401+100+Ave,+Grande+Prairie,+AB+T8V+5M6,+Canada&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
}
