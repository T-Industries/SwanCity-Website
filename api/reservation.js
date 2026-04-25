const RECIPIENT = 'roadhouse@bluecilantro.ca';

const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const formatDate = (iso) => {
  if (!iso) return '';
  try {
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-CA', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch {
    return iso;
  }
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

  if (!process.env.SMTP2GO_API_KEY) {
    console.log('[reservation] No SMTP2GO_API_KEY set — console fallback:');
    console.log({ name, phone, email, date, time, partySize, notes });
    return res.status(200).json({ success: true, dev: true });
  }

  const niceDate = formatDate(date);
  const niceTime = formatTime(time);

  const textBody = [
    `New Reservation Request — Swan City Roadhouse`,
    ``,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Date: ${niceDate}`,
    `Time: ${niceTime}`,
    `Party size: ${partySize}`,
    `Notes: ${notes || '(none)'}`,
    ``,
    `— Submitted via swancityroadhouse.ca`,
  ].join('\n');

  const safe = {
    name: escapeHtml(name),
    phone: escapeHtml(phone),
    email: escapeHtml(email),
    date: escapeHtml(niceDate),
    time: escapeHtml(niceTime),
    partySize: escapeHtml(String(partySize)),
    notes: escapeHtml(notes || ''),
  };

  const htmlBody = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>New Reservation — Swan City Roadhouse</title>
</head>
<body style="margin:0;padding:0;background:#F4F4F4;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F4F4;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;box-shadow:0 4px 16px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr><td style="background:#111111;padding:32px 40px;text-align:center;border-bottom:4px solid #C8102E;">
          <div style="font-family:Georgia,serif;font-size:11px;letter-spacing:4px;color:#C8102E;text-transform:uppercase;margin-bottom:6px;">— Save Your Seat —</div>
          <h1 style="margin:0;color:#FFFFFF;font-family:Georgia,serif;font-size:26px;letter-spacing:3px;text-transform:uppercase;font-weight:normal;">Swan City Roadhouse</h1>
          <p style="margin:8px 0 0;color:#A8A8A8;font-size:13px;font-family:Arial,sans-serif;">New reservation request</p>
        </td></tr>

        <!-- Reservation summary card -->
        <tr><td style="padding:24px 40px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#F1E3C2;border:1px solid #DDC896;border-left:5px solid #C8102E;">
            <tr><td style="padding:18px 22px;">
              <div style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;color:#C8102E;text-transform:uppercase;margin-bottom:8px;">Reservation</div>
              <div style="font-family:Georgia,serif;font-size:20px;color:#1A1A1A;line-height:1.4;">
                <strong>${safe.partySize}</strong> ${Number(partySize) === 1 ? 'person' : 'people'}<br/>
                ${safe.date}<br/>
                <span style="color:#C8102E;">at ${safe.time}</span>
              </div>
            </td></tr>
          </table>
        </td></tr>

        <!-- Guest details -->
        <tr><td style="padding:20px 40px 0;">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:1.5px;color:#C8102E;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:bold;">Guest Details</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #E5E5E5;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#888;width:120px;font-family:Arial,sans-serif;">Name</td>
              <td style="padding:10px 0;border-bottom:1px solid #E5E5E5;font-size:14px;color:#1A1A1A;font-family:Arial,sans-serif;">${safe.name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #E5E5E5;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#888;font-family:Arial,sans-serif;">Phone</td>
              <td style="padding:10px 0;border-bottom:1px solid #E5E5E5;font-size:14px;color:#1A1A1A;font-family:Arial,sans-serif;"><a href="tel:${safe.phone}" style="color:#C8102E;text-decoration:none;">${safe.phone}</a></td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #E5E5E5;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#888;font-family:Arial,sans-serif;">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #E5E5E5;font-size:14px;color:#1A1A1A;font-family:Arial,sans-serif;"><a href="mailto:${safe.email}" style="color:#C8102E;text-decoration:none;">${safe.email}</a></td>
            </tr>
          </table>
        </td></tr>

        ${safe.notes ? `
        <!-- Notes -->
        <tr><td style="padding:24px 40px 0;">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:1.5px;color:#C8102E;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:bold;">Special Requests</p>
          <div style="background:#F1E3C2;border-left:4px solid #C8102E;padding:14px 18px;font-size:14px;font-family:Arial,sans-serif;color:#1A1A1A;line-height:1.6;white-space:pre-wrap;">${safe.notes}</div>
        </td></tr>` : ''}

        <!-- Action prompt -->
        <tr><td style="padding:28px 40px 32px;text-align:center;">
          <div style="display:inline-block;background:#C8102E;color:#FFFFFF;padding:12px 24px;font-family:Arial,sans-serif;font-size:13px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">Please confirm with the guest</div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#111111;padding:18px 40px;text-align:center;font-family:Arial,sans-serif;color:#A8A8A8;font-size:12px;">
          <div style="color:#C8102E;font-family:Georgia,serif;letter-spacing:3px;text-transform:uppercase;font-size:11px;margin-bottom:6px;">— Swan City Roadhouse —</div>
          <div>11401 100 Ave., Grande Prairie, AB · +1 (866) 658-4755</div>
          <div style="margin-top:6px;color:#666;font-size:10px;">Submitted via swancityroadhouse.ca</div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const payload = {
    api_key: process.env.SMTP2GO_API_KEY,
    to: [RECIPIENT],
    sender: process.env.SMTP2GO_SENDER_EMAIL || RECIPIENT,
    reply_to: [email],
    subject: `[Swan City Reservation] ${name} — ${niceDate} @ ${niceTime} (${partySize})`,
    text_body: textBody,
    html_body: htmlBody,
  };

  try {
    const response = await fetch('https://api.smtp2go.com/v3/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok || data.data?.error) {
      console.error('[reservation] SMTP2Go error:', JSON.stringify(data));
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[reservation] fetch error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
