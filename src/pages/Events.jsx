import './Events.css';

const schedule = [
  {
    days: 'Monday & Tuesday',
    emoji: '🎱',
    title: 'Pool League & Pool Competition Night',
    lines: [
      'Join us for friendly competition, league play, and great food and drinks.',
    ],
  },
  {
    days: 'Wednesday',
    emoji: '🎤',
    title: 'Karaoke Night',
    lines: [
      { label: 'Time', text: '8:00 PM – 12:00 AM' },
      'Come sing your favorite songs and enjoy an exciting evening with friends.',
    ],
  },
  {
    days: 'Thursday',
    emoji: '🎲',
    title: 'Bingo & Bollywood Night',
    lines: [
      { label: 'Bingo Night', text: 'Starting in the evening until approximately 9:00 PM – 10:00 PM.' },
      { label: 'Bollywood DJ Night', text: 'Begins after Bingo and continues late into the night with the best Bollywood music and dancing.' },
    ],
  },
  {
    days: 'Friday',
    emoji: '💃',
    title: 'Latino Night',
    lines: [
      'Experience energetic Latin music, dancing, and great nightlife vibes.',
    ],
  },
  {
    days: 'Saturday',
    emoji: '🎤',
    title: 'Karaoke Night',
    lines: [
      { label: 'Time', text: '8:00 PM – 12:00 AM' },
      'Another exciting evening of music, entertainment, and fun.',
    ],
  },
  {
    days: 'Sunday',
    emoji: '🎧',
    title: 'After Shift Party – DJ Night',
    lines: [
      'Every Sunday night, join us for our After Shift Party featuring live DJ entertainment, great music, and an exciting atmosphere.',
    ],
  },
];

export default function Events() {
  return (
    <div className="page-wrap events-page">
      <header className="page-header">
        <div className="container">
          <span className="subtitle">— What's Happening —</span>
          <h1>Weekly Entertainment Schedule</h1>
          <div className="star-rule light"><span className="star">★ ★ ★</span></div>
        </div>
      </header>

      <section className="section">
        <div className="container events-grid">
          {schedule.map((day) => (
            <article className="event-card" key={day.days}>
              <div className="event-card-head">
                <span className="event-emoji" aria-hidden="true">{day.emoji}</span>
                <div>
                  <span className="event-days">{day.days}</span>
                  <h2>{day.title}</h2>
                </div>
              </div>
              <div className="event-card-body">
                {day.lines.map((line, i) =>
                  typeof line === 'string' ? (
                    <p key={i}>{line}</p>
                  ) : (
                    <p key={i}><strong>{line.label}:</strong> {line.text}</p>
                  )
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
