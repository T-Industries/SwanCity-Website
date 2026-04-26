import crypto from 'node:crypto';

const ROADHOUSE_EMAIL = 'roadhouse@bluecilantro.ca';
const ROADHOUSE_NAME = 'Swan City Roadhouse';
const LOCATION = '11401 100 Ave., Grande Prairie, AB T8V 5M6, Canada';

const pad = (n) => String(n).padStart(2, '0');

// "2026-05-02" + "19:00" → "20260502T190000"
const formatLocalIcs = (dateStr, timeStr) => {
  const [y, m, d] = dateStr.split('-');
  const [h, min] = timeStr.split(':');
  return `${y}${pad(m)}${pad(d)}T${pad(h)}${pad(min)}00`;
};

const formatUtcStamp = (date = new Date()) => {
  const y = date.getUTCFullYear();
  const m = pad(date.getUTCMonth() + 1);
  const d = pad(date.getUTCDate());
  const h = pad(date.getUTCHours());
  const mi = pad(date.getUTCMinutes());
  const s = pad(date.getUTCSeconds());
  return `${y}${m}${d}T${h}${mi}${s}Z`;
};

const escapeIcs = (str = '') =>
  String(str)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');

// Fold lines at 75 octets per RFC 5545
const fold = (line) => {
  if (line.length <= 75) return line;
  const chunks = [];
  let i = 0;
  while (i < line.length) {
    chunks.push((i === 0 ? '' : ' ') + line.slice(i, i + 74));
    i += 74;
  }
  return chunks.join('\r\n');
};

// Deterministic UID — same reservation data always produces the same UID,
// so a CANCEL update can target the original event.
export function reservationUid({ email, date, time, name, partySize }) {
  const fingerprint = `${email}|${date}|${time}|${name}|${partySize}`;
  const hash = crypto.createHash('sha1').update(fingerprint).digest('hex').slice(0, 24);
  return `${hash}@swancityroadhouse.ca`;
}

// Build .ics file content.
// method: 'REQUEST' (new/update) or 'CANCEL' (remove from calendar)
// sequence: 0 for first send, must increment for updates (CANCEL uses 1)
export function buildIcs({
  name, email, date, time, partySize, notes,
  durationHours = 2,
  method = 'REQUEST',
  sequence = 0,
  uid = null,
}) {
  const dtStart = formatLocalIcs(date, time);
  // add hours
  const [h, m] = time.split(':').map(Number);
  const endH = h + durationHours;
  const dtEndTime = `${pad(endH).slice(-2)}:${pad(m)}`;
  const dtEnd = formatLocalIcs(date, endH >= 24 ? '23:59' : dtEndTime);

  const eventUid = uid || reservationUid({ email, date, time, name, partySize });
  const stamp = formatUtcStamp();
  const isCancel = method === 'CANCEL';
  const status = isCancel ? 'CANCELLED' : 'CONFIRMED';

  const summary = escapeIcs(
    `${isCancel ? '[CANCELLED] ' : ''}Swan City Roadhouse — ${name} (party of ${partySize})`
  );
  const description = escapeIcs(
    [
      isCancel
        ? `This reservation has been cancelled.`
        : `Reservation at Swan City Roadhouse`,
      `Guest: ${name}`,
      `Party size: ${partySize}`,
      notes ? `Notes: ${notes}` : null,
      ``,
      `Phone: +1 (866) 658-4755`,
      `Address: ${LOCATION}`,
    ].filter(Boolean).join('\n')
  );

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Swan City Roadhouse//Reservation//EN',
    'CALSCALE:GREGORIAN',
    `METHOD:${method}`,
    'BEGIN:VEVENT',
    `UID:${eventUid}`,
    `DTSTAMP:${stamp}`,
    `SEQUENCE:${sequence}`,
    `DTSTART;TZID=America/Edmonton:${dtStart}`,
    `DTEND;TZID=America/Edmonton:${dtEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${escapeIcs(LOCATION)}`,
    `ORGANIZER;CN=${ROADHOUSE_NAME}:mailto:${ROADHOUSE_EMAIL}`,
    `ATTENDEE;CN=${escapeIcs(name)};RSVP=TRUE;PARTSTAT=${isCancel ? 'DECLINED' : 'NEEDS-ACTION'};ROLE=REQ-PARTICIPANT:mailto:${email}`,
    `STATUS:${status}`,
    'TRANSP:OPAQUE',
    ...(isCancel ? [] : [
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reservation reminder — Swan City Roadhouse',
      'TRIGGER:-PT1H',
      'END:VALARM',
    ]),
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.map(fold).join('\r\n');
}
