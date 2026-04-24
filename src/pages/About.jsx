import { Link } from 'react-router-dom';
import { GiCook, GiBeerStein, GiHorseshoe, GiCowboyBoot } from 'react-icons/gi';
import './About.css';

export default function About() {
  return (
    <div className="page-wrap about-page">
      <header className="page-header">
        <div className="container">
          <span className="subtitle">— Our Story —</span>
          <h1>About the Roadhouse</h1>
          <div className="star-rule light"><span className="star">★ ★ ★</span></div>
        </div>
      </header>

      <section className="section story-section">
        <div className="container about-story">
          <div className="about-story-text">
            <span className="eyebrow">— Since Day One —</span>
            <h2>A Proper Saloon</h2>
            <div className="star-rule"><span className="star">★ ★ ★</span></div>
            <p>
              Swan City Roadhouse is Grande Prairie's spot for honest food, cold drinks,
              and a warm welcome. We opened our doors with a simple idea: make the kind
              of place we'd want to spend an evening in — great plates, a proper bar,
              and none of the fuss.
            </p>
            <p>
              Whether you're stopping in for lunch, meeting friends for drinks, or
              settling in for dinner, our crew is here to make it easy. Pull up a chair,
              stay a while — there's always room at the Roadhouse.
            </p>
            <Link to="/menu" className="btn btn-primary">Browse the Menu</Link>
          </div>
          <div className="about-story-art">
            <div className="poster">
              <div className="poster-corner tl">★</div>
              <div className="poster-corner tr">★</div>
              <div className="poster-corner bl">★</div>
              <div className="poster-corner br">★</div>
              <span className="poster-top">— Welcome to —</span>
              <img src="/SwanCity_Roadhouse_Logo.png" alt="Swan City Roadhouse" />
              <span className="poster-bottom">Eats · Drinks · Relax</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">— The House Rules —</span>
            <h2>What We Stand For</h2>
            <div className="star-rule"><span className="star">★ ★ ★</span></div>
          </div>
          <div className="values">
            <div className="value-card">
              <div className="value-icon-wrap"><GiCook size={42} /></div>
              <h3>Honest Food</h3>
              <p>Made to order from good ingredients, served the way you like it.</p>
            </div>
            <div className="value-card">
              <div className="value-icon-wrap"><GiBeerStein size={42} /></div>
              <h3>Proper Drinks</h3>
              <p>A full bar with cold beer, real cocktails, and a list worth explorin'.</p>
            </div>
            <div className="value-card">
              <div className="value-icon-wrap"><GiHorseshoe size={42} /></div>
              <h3>Community First</h3>
              <p>Neighbors, regulars, and first-timers — everyone's welcome at the Roadhouse.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-inner">
          <GiCowboyBoot size={42} className="cta-icon" />
          <h2>Ready to Mosey On Down?</h2>
          <p>Open seven days a week, 11 AM to 1 AM. We'll keep a seat warm.</p>
          <div className="cta-buttons">
            <Link to="/menu" className="btn btn-primary">View Menu</Link>
            <Link to="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
