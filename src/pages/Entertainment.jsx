import { Link } from 'react-router-dom';
import { GiMicrophone, GiPartyPopper } from 'react-icons/gi';
import { FiCalendar } from 'react-icons/fi';
import EventbriteCheckoutEmbed from '../components/EventbriteCheckoutEmbed.jsx';
import './Entertainment.css';

const KARAOKE_EVENTBRITE_ID = '1990185338923';
const KARAOKE_EVENTBRITE_URL = `https://www.eventbrite.com/e/karaoke-night-tickets-${KARAOKE_EVENTBRITE_ID}`;

export default function Entertainment() {
  return (
    <div className="page-wrap ent-page">
      <header className="page-header">
        <div className="container">
          <span className="subtitle">— Live at the Roadhouse —</span>
          <h1>Entertainment</h1>
          <div className="star-rule light"><span className="star">★ ★ ★</span></div>
        </div>
      </header>

      <section className="section karaoke-ticket-section">
        <div className="container karaoke-ticket-inner">
          <div className="karaoke-ticket-card">
            <div className="event-corner tl">★</div>
            <div className="event-corner tr">★</div>
            <div className="event-corner bl">★</div>
            <div className="event-corner br">★</div>
            <div className="karaoke-icon-wrap"><GiMicrophone size={48} /></div>
            <span className="eyebrow">— This Thursday —</span>
            <h2>Karaoke Night — Grab the Mic</h2>
            <div className="star-rule"><span className="star">★ ★ ★</span></div>
            <p className="karaoke-blurb">
              Thursday nights belong to you and the spotlight. Sing your heart out,
              cheer on your friends, and keep the drinks flowin' from 9 PM till 1 AM.
              Reserve your spot in advance — tickets go fast.
            </p>
            <div className="karaoke-ticket-cta">
              <a
                href={KARAOKE_EVENTBRITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Buy Tickets on Eventbrite
              </a>
            </div>
            <div className="karaoke-embed-wrap">
              <EventbriteCheckoutEmbed eventId={KARAOKE_EVENTBRITE_ID} height={500} />
            </div>
            <p className="karaoke-powered">Secure checkout powered by Eventbrite</p>
          </div>
        </div>
      </section>

      <section className="section ent-cta-section">
        <div className="container ent-cta-inner">
          <GiPartyPopper size={44} className="ent-cta-icon" />
          <h2>Bookin' a Birthday or Big Night?</h2>
          <p>
            Private events, group parties, and special nights welcome. Drop us a line and
            we'll hold the best seat in the house.
          </p>
          <div className="ent-cta-buttons">
            <Link to="/reservation" className="btn btn-primary">
              <FiCalendar /> Reserve a Table
            </Link>
            <Link to="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
