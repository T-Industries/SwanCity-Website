import { Link } from 'react-router-dom';
import { FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import { GiSteak, GiBrandyBottle, GiCampfire } from 'react-icons/gi';
import './Home.css';

export default function Home() {
  return (
    <div className="page-wrap home">
      <section className="hero">
        <div className="hero-planks" />
        <div className="hero-vignette" />
        <div className="hero-content container">
          {/* <img src="/SwanCity_Roadhouse_Logo.png" alt="Swan City Roadhouse" className="hero-logo" /> */}
          <h1>Swan City <span className="neon">Roadhouse</span></h1>
          <div className="star-rule light">
            <span className="star">★ ★ ★</span>
          </div>
          <p className="hero-tagline">Eat · Drink · Relax</p>
          <p className="hero-sub">
            A proper cowboy saloon in Grande Prairie — hearty plates, a stocked bar, and
            the kind of welcome that keeps folks coming back.
          </p>
          <div className="hero-cta">
            <Link to="/menu" className="btn btn-primary">See the Menu</Link>
            <Link to="/contact" className="btn btn-outline">Swing By</Link>
          </div>
        </div>
      </section>

      <section className="section welcome-section">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">— Howdy, Partner —</span>
            <h2>Pull Up a Chair</h2>
            <div className="star-rule"><span className="star">★ ★ ★</span></div>
          </div>
          <p className="welcome-text">
            Swan City Roadhouse is where neighbors become regulars. Drop in for a plate
            off our kitchen, a drink from the bar, and the kind of easy atmosphere that
            makes an hour turn into three. No fuss — just good food, cold drinks, and
            warm company.
          </p>
        </div>
      </section>

      <section className="section highlights-section">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">— What's On Offer —</span>
            <h2>Why Folks Keep Comin' Back</h2>
            <div className="star-rule"><span className="star">★ ★ ★</span></div>
          </div>
          <div className="highlights">
            <div className="highlight-card">
              <div className="highlight-icon-wrap"><GiSteak size={42} /></div>
              <h3>Great Eats</h3>
              <p>Roadhouse classics done right — shareables, burgers, steaks, and pub favorites straight off the grill.</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon-wrap"><GiBrandyBottle size={42} /></div>
              <h3>Full Bar</h3>
              <p>Cold beer, signature cocktails, bourbon, and a curated wine & spirits list.</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon-wrap"><GiCampfire size={42} /></div>
              <h3>Warm Welcome</h3>
              <p>Cozy seating, easy music, and room to unwind after a long day on the range.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section info-strip">
        <div className="info-planks" />
        <div className="container info-grid">
          <div className="info-item">
            <FiMapPin size={28} />
            <div>
              <h4>Find Us</h4>
              <p>11401 100 Ave., Grande Prairie, AB T8V 5M6, Canada</p>
            </div>
          </div>
          <div className="info-item">
            <FiClock size={28} />
            <div>
              <h4>Open Daily</h4>
              <p>Mon – Sun · 11:00 AM – 1:00 AM</p>
            </div>
          </div>
          <div className="info-item">
            <FiPhone size={28} />
            <div>
              <h4>Ring Us Up</h4>
              <p><a href="tel:+18666584755">+1 (866) 658-4755</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
