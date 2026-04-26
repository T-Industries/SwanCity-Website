import { verifyToken } from '../_utils/token.js';
import { sendEmail } from '../_utils/sendEmail.js';
import { buildIcs } from '../_utils/ics.js';
import {
  guestConfirmEmail, guestConfirmText,
  roadhouseRecordEmail,
} from '../_utils/emails.js';
import { responsePage } from '../_utils/responsePage.js';

const RECIPIENT = 'roadhouse@bluecilantro.ca';

const formatDate = (iso) => {
  try {
    return new Date(iso + 'T00:00:00').toLocaleDateString('en-CA', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch { return iso; }
};
const formatTime = (t) => {
  const [h, m] = t.split(':');
  const hr = parseInt(h, 10);
  const period = hr >= 12 ? 'PM' : 'AM';
  return `${hr % 12 || 12}:${m} ${period}`;
};

export default async function handler(req, res) {
  const token = req.query?.token || (new URL(req.url, 'http://x').searchParams.get('token'));
  const { ok, payload, reason } = verifyToken(token);

  if (!ok) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(400).send(responsePage({
      status: 'error',
      title: 'Link Invalid',
      message: reason === 'expired'
        ? 'This reservation link has expired (7-day window). Please contact the guest directly to confirm.'
        : 'This reservation link is invalid or has been tampered with.',
    }));
  }

  const { name, phone, email, date, time, partySize, notes } = payload;

  // Build .ics for the confirmed event
  const ics = buildIcs({ name, email, date, time, partySize, notes, durationHours: 2 });

  // 1) Send confirmation email to the guest (with .ics attached)
  const guestRes = await sendEmail({
    to: email,
    replyTo: RECIPIENT,
    subject: `Your reservation is confirmed — Swan City Roadhouse`,
    html: guestConfirmEmail({ name, date, time, partySize }),
    text: guestConfirmText({ name, date, time, partySize }),
    attachments: [{
      filename: 'reservation.ics',
      content: ics,
      mimetype: 'text/calendar; method=REQUEST; charset=utf-8',
    }],
  });

  // 2) Send internal record email to roadhouse (with .ics attached for their calendar)
  const internalRes = await sendEmail({
    to: RECIPIENT,
    subject: `[Swan City] Confirmed: ${name} — ${formatDate(date)} @ ${formatTime(time)} (${partySize})`,
    html: roadhouseRecordEmail({ action: 'confirmed', name, phone, email, date, time, partySize, notes }),
    text: `Reservation CONFIRMED for ${name} (party of ${partySize}) on ${formatDate(date)} at ${formatTime(time)}. Calendar invite attached.`,
    attachments: [{
      filename: 'reservation.ics',
      content: ics,
      mimetype: 'text/calendar; method=REQUEST; charset=utf-8',
    }],
  });

  if (!guestRes.ok || !internalRes.ok) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(500).send(responsePage({
      status: 'error',
      title: 'Send Failed',
      message: "We couldn't send the confirmation emails. Please try the link again — if it keeps failing, contact the guest directly.",
    }));
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(responsePage({
    status: 'confirmed',
    title: 'Reservation Confirmed',
    message: `${name} has been notified by email. A calendar invite has been sent to both of you.`,
    details: `<strong>${partySize}</strong> ${String(partySize) === '1' ? 'person' : 'people'} · ${formatDate(date)} at ${formatTime(time)}`,
  }));
}
