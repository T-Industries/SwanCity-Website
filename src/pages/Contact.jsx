import { useState } from 'react';
import { FiPhone, FiMapPin, FiClock, FiMail } from 'react-icons/fi';
import { GiHorseshoe } from 'react-icons/gi';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Swan City Roadhouse — Message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:hello@swancityroadhouse.ca?subject=${subject}&body=${body}`;
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
                <p><a href="tel:+15873220786">+1 (587) 322-0786</a></p>
              </div>
            </div>

            <div className="contact-item">
              <FiMapPin size={26} />
              <div>
                <h4>Location</h4>
                <p>Grande Prairie, Alberta, Canada</p>
              </div>
            </div>

            <div className="contact-item">
              <FiClock size={26} />
              <div>
                <h4>Business Hours</h4>
                <p>Monday – Sunday</p>
                <p className="muted">9:00 AM – 10:00 PM</p>
              </div>
            </div>

            <div className="horseshoe-note">
              <GiHorseshoe size={24} />
              <span>Reservations welcome · Walk-ins too</span>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-corner tl">★</div>
            <div className="form-corner tr">★</div>
            <span className="eyebrow">— Write to Us —</span>
            <h2>Send a Message</h2>
            <div className="star-rule"><span className="star">★ ★ ★</span></div>

            <label>
              <span>Name</span>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label>
              <span>Message</span>
              <textarea
                rows="5"
                required
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
              />
            </label>
            <button type="submit" className="btn btn-primary">
              <FiMail /> Send Message
            </button>
          </form>
        </div>
      </section>

      <section className="map-section">
        <iframe
          title="Swan City Roadhouse — Grande Prairie"
          src="https://www.google.com/maps?q=Grande+Prairie+Alberta+Canada&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
}
