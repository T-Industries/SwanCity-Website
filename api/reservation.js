import { signToken } from './_utils/token.js';
import { sendEmail } from './_utils/sendEmail.js';
import { incomingReservationEmail } from './_utils/emails.js';

const RECIPIENT = 'roadhouse@bluecilantro.ca';

const formatDate = (iso) => {
  if (!iso) return '';
  try {
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-CA', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch { return iso; }
};

const formatTime = (t) => {
  if (!t) return '';
  const [h, m] = t.split(':');
  const hr = parseInt(h, 10);
  const period = hr >= 12 ? 'PM' : 'AM';
  const hr12 = hr % 12 || 12;
  return `${hr12}:${m} ${period}`;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, date, time, partySize, notes } = req.body || {};

  if (!name || !phone || !email || !date || !time || !partySize) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Sign a token containing the reservation data — used by confirm/decline links
  const token = signToken({ name, phone, email, date, time, partySize, notes }, 7);

  // Build the absolute base URL from request headers
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const base = `${proto}://${host}`;
  const confirmUrl = `${base}/api/reservation/confirm?token=${encodeURIComponent(token)}`;
  const declineUrl = `${base}/api/reservation/decline?token=${encodeURIComponent(token)}`;

  const html = incomingReservationEmail({
    name, phone, email, date, time, partySize, notes,
    confirmUrl, declineUrl,
  });

  const text = [
    `New Reservation Request — Swan City Roadhouse`,
    ``,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Date: ${formatDate(date)}`,
    `Time: ${formatTime(time)}`,
    `Party size: ${partySize}`,
    `Notes: ${notes || '(none)'}`,
    ``,
    `Confirm: ${confirmUrl}`,
    `Decline: ${declineUrl}`,
    ``,
    `Links expire in 7 days.`,
  ].join('\n');

  const result = await sendEmail({
    to: RECIPIENT,
    replyTo: email,
    subject: `[Swan City Reservation] ${name} — ${formatDate(date)} @ ${formatTime(time)} (${partySize})`,
    html,
    text,
  });

  if (!result.ok) {
    return res.status(500).json({ error: 'Failed to send email' });
  }
  return res.status(200).json({ success: true });
}
