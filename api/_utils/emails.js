// Shared email templates — branded SwanCity styling.
// All HTML uses inline CSS only (email-client safe).

export const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const ADDRESS = '11401 100 Ave., Grande Prairie, AB';
const PHONE = '+1 (866) 658-4755';

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

// Shared shell: header + footer wrapping a body block
const shell = ({ eyebrow, subtitle, body }) => `<!DOCTYPE html>
<html><head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#F4F4F4;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F4F4;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;box-shadow:0 4px 16px rgba(0,0,0,0.08);">
        <tr><td style="background:#111111;padding:32px 40px;text-align:center;border-bottom:4px solid #C8102E;">
          <div style="font-family:Georgia,serif;font-size:11px;letter-spacing:4px;color:#C8102E;text-transform:uppercase;margin-bottom:6px;">— ${eyebrow} —</div>
          <h1 style="margin:0;color:#FFFFFF;font-family:Georgia,serif;font-size:26px;letter-spacing:3px;text-transform:uppercase;font-weight:normal;">Swan City Roadhouse</h1>
          <p style="margin:8px 0 0;color:#A8A8A8;font-size:13px;font-family:Arial,sans-serif;">${subtitle}</p>
        </td></tr>
        ${body}
        <tr><td style="background:#111111;padding:18px 40px;text-align:center;font-family:Arial,sans-serif;color:#A8A8A8;font-size:12px;">
          <div style="color:#C8102E;font-family:Georgia,serif;letter-spacing:3px;text-transform:uppercase;font-size:11px;margin-bottom:6px;">— Eats · Drinks · Relax —</div>
          <div>${ADDRESS} · ${PHONE}</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

// ====== Guest: confirmation email ======
export function guestConfirmEmail({ name, date, time, partySize }) {
  const safe = {
    name: escapeHtml(name),
    date: escapeHtml(formatDate(date)),
    time: escapeHtml(formatTime(time)),
    partySize: escapeHtml(String(partySize)),
  };
  const peopleLabel = String(partySize) === '1' ? 'person' : 'people';

  const body = `
    <tr><td style="padding:32px 40px 16px;text-align:center;">
      <div style="font-size:48px;color:#1A8A1A;margin-bottom:8px;">✓</div>
      <h2 style="margin:0;font-family:Georgia,serif;font-size:24px;color:#1A1A1A;letter-spacing:2px;text-transform:uppercase;font-weight:normal;">Reservation Confirmed</h2>
    </td></tr>
    <tr><td style="padding:8px 40px 0;text-align:center;font-family:Arial,sans-serif;color:#5E5E5E;font-size:15px;line-height:1.6;">
      Howdy ${safe.name} — we're lookin' forward to having you at the Roadhouse.
    </td></tr>
    <tr><td style="padding:24px 40px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#F1E3C2;border:1px solid #DDC896;border-left:5px solid #C8102E;">
        <tr><td style="padding:18px 22px;text-align:center;">
          <div style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;color:#C8102E;text-transform:uppercase;margin-bottom:8px;">Your Booking</div>
          <div style="font-family:Georgia,serif;font-size:22px;color:#1A1A1A;line-height:1.4;">
            <strong>${safe.partySize}</strong> ${peopleLabel}<br/>
            ${safe.date}<br/>
            <span style="color:#C8102E;">at ${safe.time}</span>
          </div>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:24px 40px;font-family:Arial,sans-serif;color:#1A1A1A;font-size:14px;line-height:1.7;">
      <p style="margin:0 0 12px;"><strong>Where:</strong> ${ADDRESS}</p>
      <p style="margin:0 0 12px;"><strong>Phone:</strong> <a href="tel:+18666584755" style="color:#C8102E;text-decoration:none;">${PHONE}</a></p>
      <p style="margin:16px 0 0;color:#5E5E5E;font-size:13px;">A calendar invite is attached — open it to add the reservation to your phone or computer calendar.</p>
      <p style="margin:8px 0 0;color:#5E5E5E;font-size:13px;">Need to change anything? Give us a ring at the number above.</p>
    </td></tr>
  `;

  return shell({
    eyebrow: 'You\'re on the List',
    subtitle: 'Your reservation is confirmed',
    body,
  });
}

export function guestConfirmText({ name, date, time, partySize }) {
  const peopleLabel = String(partySize) === '1' ? 'person' : 'people';
  return [
    `Reservation Confirmed — Swan City Roadhouse`,
    ``,
    `Howdy ${name},`,
    ``,
    `Your reservation is confirmed:`,
    `  ${partySize} ${peopleLabel}`,
    `  ${formatDate(date)}`,
    `  at ${formatTime(time)}`,
    ``,
    `Where: ${ADDRESS}`,
    `Phone: ${PHONE}`,
    ``,
    `A calendar invite is attached. Need changes? Give us a call.`,
    ``,
    `— Swan City Roadhouse`,
  ].join('\n');
}

// ====== Guest: decline email ======
export function guestDeclineEmail({ name, date, time, partySize }) {
  const safe = {
    name: escapeHtml(name),
    date: escapeHtml(formatDate(date)),
    time: escapeHtml(formatTime(time)),
    partySize: escapeHtml(String(partySize)),
  };
  const peopleLabel = String(partySize) === '1' ? 'person' : 'people';

  const body = `
    <tr><td style="padding:32px 40px 16px;text-align:center;">
      <h2 style="margin:0;font-family:Georgia,serif;font-size:22px;color:#1A1A1A;letter-spacing:2px;text-transform:uppercase;font-weight:normal;">About Your Reservation</h2>
    </td></tr>
    <tr><td style="padding:8px 40px 0;text-align:center;font-family:Arial,sans-serif;color:#5E5E5E;font-size:15px;line-height:1.6;">
      Howdy ${safe.name} — thanks for the request.
    </td></tr>
    <tr><td style="padding:24px 40px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F4F4;border:1px solid #E0E0E0;border-left:5px solid #888888;">
        <tr><td style="padding:18px 22px;text-align:center;">
          <div style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;color:#888;text-transform:uppercase;margin-bottom:8px;">Requested</div>
          <div style="font-family:Georgia,serif;font-size:18px;color:#1A1A1A;line-height:1.4;">
            ${safe.partySize} ${peopleLabel}<br/>
            ${safe.date} at ${safe.time}
          </div>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:24px 40px;font-family:Arial,sans-serif;color:#1A1A1A;font-size:14px;line-height:1.7;">
      <p style="margin:0 0 12px;">Unfortunately we couldn't accommodate this booking. We'd love to fit you in another time — please give us a call so we can find something that works.</p>
      <p style="margin:16px 0 0;text-align:center;">
        <a href="tel:+18666584755" style="display:inline-block;background:#C8102E;color:#FFFFFF;padding:12px 24px;font-family:Arial,sans-serif;font-size:14px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;text-decoration:none;border-radius:4px;">Call ${PHONE}</a>
      </p>
      <p style="margin:24px 0 0;color:#5E5E5E;font-size:13px;text-align:center;">Walk-ins are always welcome too — open Mon–Sun, 11 AM–1 AM.</p>
    </td></tr>
  `;

  return shell({
    eyebrow: 'A Quick Note',
    subtitle: 'About your reservation request',
    body,
  });
}

export function guestDeclineText({ name, date, time, partySize }) {
  const peopleLabel = String(partySize) === '1' ? 'person' : 'people';
  return [
    `About Your Reservation — Swan City Roadhouse`,
    ``,
    `Howdy ${name},`,
    ``,
    `Thanks for the request. Unfortunately we couldn't accommodate:`,
    `  ${partySize} ${peopleLabel} — ${formatDate(date)} at ${formatTime(time)}`,
    ``,
    `Give us a call at ${PHONE} so we can find a time that works.`,
    `Walk-ins always welcome too — Mon–Sun, 11 AM–1 AM.`,
    ``,
    `— Swan City Roadhouse`,
  ].join('\n');
}

// ====== Roadhouse: internal record after staff action ======
export function roadhouseRecordEmail({ action, name, phone, email, date, time, partySize, notes }) {
  const safe = {
    action: escapeHtml(action),
    name: escapeHtml(name),
    phone: escapeHtml(phone),
    email: escapeHtml(email),
    date: escapeHtml(formatDate(date)),
    time: escapeHtml(formatTime(time)),
    partySize: escapeHtml(String(partySize)),
    notes: escapeHtml(notes || ''),
  };
  const peopleLabel = String(partySize) === '1' ? 'person' : 'people';
  const isConfirm = action === 'confirmed';
  const accent = isConfirm ? '#1A8A1A' : '#888888';

  const body = `
    <tr><td style="padding:24px 40px 0;">
      <span style="display:inline-block;background:${accent};color:#FFFFFF;padding:8px 18px;border-radius:999px;font-size:12px;font-family:Arial,sans-serif;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">${safe.action}</span>
    </td></tr>
    <tr><td style="padding:20px 40px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#F1E3C2;border:1px solid #DDC896;border-left:5px solid #C8102E;">
        <tr><td style="padding:18px 22px;">
          <div style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;color:#C8102E;text-transform:uppercase;margin-bottom:8px;">Reservation</div>
          <div style="font-family:Georgia,serif;font-size:20px;color:#1A1A1A;line-height:1.4;">
            <strong>${safe.partySize}</strong> ${peopleLabel}<br/>
            ${safe.date}<br/>
            <span style="color:#C8102E;">at ${safe.time}</span>
          </div>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:20px 40px 0;">
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:1.5px;color:#C8102E;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:bold;">Guest Details</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr><td style="padding:10px 0;border-bottom:1px solid #E5E5E5;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#888;width:120px;font-family:Arial,sans-serif;">Name</td>
            <td style="padding:10px 0;border-bottom:1px solid #E5E5E5;font-size:14px;color:#1A1A1A;font-family:Arial,sans-serif;">${safe.name}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #E5E5E5;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#888;font-family:Arial,sans-serif;">Phone</td>
            <td style="padding:10px 0;border-bottom:1px solid #E5E5E5;font-size:14px;color:#1A1A1A;font-family:Arial,sans-serif;"><a href="tel:${safe.phone}" style="color:#C8102E;text-decoration:none;">${safe.phone}</a></td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #E5E5E5;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#888;font-family:Arial,sans-serif;">Email</td>
            <td style="padding:10px 0;border-bottom:1px solid #E5E5E5;font-size:14px;color:#1A1A1A;font-family:Arial,sans-serif;"><a href="mailto:${safe.email}" style="color:#C8102E;text-decoration:none;">${safe.email}</a></td></tr>
      </table>
    </td></tr>
    ${safe.notes ? `
    <tr><td style="padding:20px 40px 0;">
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:1.5px;color:#C8102E;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:bold;">Special Requests</p>
      <div style="background:#F1E3C2;border-left:4px solid #C8102E;padding:14px 18px;font-size:14px;font-family:Arial,sans-serif;color:#1A1A1A;line-height:1.6;white-space:pre-wrap;">${safe.notes}</div>
    </td></tr>` : ''}
    <tr><td style="padding:24px 40px 32px;text-align:center;font-family:Arial,sans-serif;color:#5E5E5E;font-size:13px;">
      ${isConfirm ? 'Calendar invite attached — open to add to your roadhouse calendar.' : 'Guest has been notified by email.'}
    </td></tr>
  `;

  return shell({
    eyebrow: isConfirm ? 'Confirmed' : 'Declined',
    subtitle: `Reservation ${action}`,
    body,
  });
}

// ====== Builds the original incoming-reservation email (with confirm/decline buttons) ======
export function incomingReservationEmail({ name, phone, email, date, time, partySize, notes, confirmUrl, declineUrl }) {
  const safe = {
    name: escapeHtml(name),
    phone: escapeHtml(phone),
    email: escapeHtml(email),
    date: escapeHtml(formatDate(date)),
    time: escapeHtml(formatTime(time)),
    partySize: escapeHtml(String(partySize)),
    notes: escapeHtml(notes || ''),
  };
  const peopleLabel = String(partySize) === '1' ? 'person' : 'people';

  const body = `
    <tr><td style="padding:24px 40px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#F1E3C2;border:1px solid #DDC896;border-left:5px solid #C8102E;">
        <tr><td style="padding:18px 22px;">
          <div style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;color:#C8102E;text-transform:uppercase;margin-bottom:8px;">Reservation Request</div>
          <div style="font-family:Georgia,serif;font-size:20px;color:#1A1A1A;line-height:1.4;">
            <strong>${safe.partySize}</strong> ${peopleLabel}<br/>
            ${safe.date}<br/>
            <span style="color:#C8102E;">at ${safe.time}</span>
          </div>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:20px 40px 0;">
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:1.5px;color:#C8102E;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:bold;">Guest Details</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr><td style="padding:10px 0;border-bottom:1px solid #E5E5E5;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#888;width:120px;font-family:Arial,sans-serif;">Name</td>
            <td style="padding:10px 0;border-bottom:1px solid #E5E5E5;font-size:14px;color:#1A1A1A;font-family:Arial,sans-serif;">${safe.name}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #E5E5E5;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#888;font-family:Arial,sans-serif;">Phone</td>
            <td style="padding:10px 0;border-bottom:1px solid #E5E5E5;font-size:14px;color:#1A1A1A;font-family:Arial,sans-serif;"><a href="tel:${safe.phone}" style="color:#C8102E;text-decoration:none;">${safe.phone}</a></td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #E5E5E5;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#888;font-family:Arial,sans-serif;">Email</td>
            <td style="padding:10px 0;border-bottom:1px solid #E5E5E5;font-size:14px;color:#1A1A1A;font-family:Arial,sans-serif;"><a href="mailto:${safe.email}" style="color:#C8102E;text-decoration:none;">${safe.email}</a></td></tr>
      </table>
    </td></tr>
    ${safe.notes ? `
    <tr><td style="padding:20px 40px 0;">
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:1.5px;color:#C8102E;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:bold;">Special Requests</p>
      <div style="background:#F1E3C2;border-left:4px solid #C8102E;padding:14px 18px;font-size:14px;font-family:Arial,sans-serif;color:#1A1A1A;line-height:1.6;white-space:pre-wrap;">${safe.notes}</div>
    </td></tr>` : ''}
    <tr><td style="padding:32px 40px;text-align:center;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
        <tr>
          <td style="padding:0 8px;">
            <a href="${confirmUrl}" style="display:inline-block;background:#C8102E;color:#FFFFFF;padding:14px 28px;font-family:Arial,sans-serif;font-size:14px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;text-decoration:none;border-radius:4px;box-shadow:0 4px 0 #A40E22;">✓ Confirm Reservation</a>
          </td>
          <td style="padding:0 8px;">
            <a href="${declineUrl}" style="display:inline-block;background:#FFFFFF;color:#444;padding:14px 28px;font-family:Arial,sans-serif;font-size:14px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;text-decoration:none;border-radius:4px;border:2px solid #888;">✗ Decline</a>
          </td>
        </tr>
      </table>
      <p style="margin:18px 0 0;font-family:Arial,sans-serif;color:#888;font-size:11px;">Links expire in 7 days.</p>
    </td></tr>
  `;

  return shell({
    eyebrow: 'Save Your Seat',
    subtitle: 'New reservation request',
    body,
  });
}
