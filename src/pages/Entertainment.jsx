import { Link } from 'react-router-dom';
import { GiMicrophone, GiGuitar, GiCardAceSpades, GiAmericanFootballBall, GiPartyPopper } from 'react-icons/gi';
import { FiCalendar } from 'react-icons/fi';
import './Entertainment.css';

const EVENTS = [
  {
    icon: GiGuitar,
    day: 'Friday & Saturday',
    title: 'Live Music',
    time: '8:00 PM – Midnight',
    blurb: 'Local bands taking the stage every weekend — country, rock, and everything in between.',
  },
  {
    icon: GiMicrophone,
    day: 'Thursday',
    title: 'Karaoke Night',
    time: '9:00 PM – 1:00 AM',
    blurb: 'Grab the mic, grab a drink. Sing your heart out — cowboy classics strongly encouraged.',
  },
  {
    icon: GiCardAceSpades,
    day: 'Wednesday',
    title: 'Trivia Night',
    time: '7:30 PM – 9:30 PM',
    blurb: 'Round up your crew and play for bragging rights and house prizes.',
  },
  {
    icon: GiAmericanFootballBall,
    day: 'Every Game Day',
    title: 'Big Game Viewing',
    time: 'All game hours',
    blurb: 'NHL, NFL, UFC, and more on the big screens. Cold beer and shareables on tap.',
  },
];

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

      <section className="section">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">— What's Happening —</span>
            <h2>The Weekly Lineup</h2>
            <div className="star-rule"><span className="star">★ ★ ★</span></div>
            <p className="ent-intro">
              From live bands to karaoke, trivia to big-game nights — there's always
              somethin' going on at the Roadhouse. Pull up a chair and stay a while.
            </p>
          </div>

          <div className="events">
            {EVENTS.map((e, i) => {
              const Icon = e.icon;
              return (
                <article key={i} className="event-card">
                  <div className="event-corner tl">★</div>
                  <div className="event-corner tr">★</div>
                  <div className="event-corner bl">★</div>
                  <div className="event-corner br">★</div>
                  <div className="event-icon-wrap"><Icon size={42} /></div>
                  <span className="event-day">{e.day}</span>
                  <h3>{e.title}</h3>
                  <p className="event-time">{e.time}</p>
                  <p className="event-blurb">{e.blurb}</p>
                </article>
              );
            })}
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
