import { verifyToken } from '../_utils/token.js';
import { sendEmail } from '../_utils/sendEmail.js';
import { buildIcs } from '../_utils/ics.js';
import {
  guestDeclineEmail, guestDeclineText,
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
        ? 'This reservation link has expired (7-day window). Please contact the guest directly.'
        : 'This reservation link is invalid or has been tampered with.',
    }));
  }

  const { name, phone, email, date, time, partySize, notes } = payload;

  // CANCEL .ics — same deterministic UID as the (possible) prior CONFIRMED event,
  // SEQUENCE:1 so calendar apps treat it as an update that removes the event.
  const cancelIcs = buildIcs({
    name, email, date, time, partySize, notes,
    method: 'CANCEL',
    sequence: 1,
  });

  const cancelAttachment = {
    filename: 'reservation-cancelled.ics',
    content: cancelIcs,
    mimetype: 'text/calendar; method=CANCEL; charset=utf-8',
  };

  // 1) Send polite decline to guest (with CANCEL .ics — removes from their calendar if previously added)
  const guestRes = await sendEmail({
    to: email,
    replyTo: RECIPIENT,
    subject: `About your reservation request — Swan City Roadhouse`,
    html: guestDeclineEmail({ name, date, time, partySize }),
    text: guestDeclineText({ name, date, time, partySize }),
    attachments: [cancelAttachment],
  });

  // 2) Send brief internal log to roadhouse (with CANCEL .ics so their calendar updates too)
  const internalRes = await sendEmail({
    to: RECIPIENT,
    subject: `[Swan City] Declined: ${name} — ${formatDate(date)} @ ${formatTime(time)} (${partySize})`,
    html: roadhouseRecordEmail({ action: 'declined', name, phone, email, date, time, partySize, notes }),
    text: `Reservation DECLINED for ${name} (party of ${partySize}) on ${formatDate(date)} at ${formatTime(time)}. Guest has been notified. Calendar cancellation attached.`,
    attachments: [cancelAttachment],
  });

  if (!guestRes.ok || !internalRes.ok) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(500).send(responsePage({
      status: 'error',
      title: 'Send Failed',
      message: "We couldn't send the notification emails. Please try the link again — if it keeps failing, contact the guest directly.",
    }));
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(responsePage({
    status: 'declined',
    title: 'Reservation Declined',
    message: `${name} has been notified by email and asked to call to discuss alternatives.`,
    details: `<strong>${partySize}</strong> ${String(partySize) === '1' ? 'person' : 'people'} · ${formatDate(date)} at ${formatTime(time)}`,
  }));
}
