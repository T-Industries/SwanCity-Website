// Thin wrapper around SMTP2Go's send API with attachment support.
// Returns { ok: true } on success or { ok: false, error } on failure.

export async function sendEmail({ to, subject, html, text, replyTo, attachments }) {
  if (!process.env.SMTP2GO_API_KEY) {
    console.log('[sendEmail] No SMTP2GO_API_KEY — dev fallback. Would send:');
    console.log({ to, subject, replyTo, hasHtml: !!html, hasText: !!text, attachmentCount: attachments?.length || 0 });
    return { ok: true, dev: true };
  }

  const senderEnv = process.env.SMTP2GO_SENDER_EMAIL;
  const sender = (senderEnv && senderEnv.includes('@'))
    ? senderEnv
    : 'roadhouse@bluecilantro.ca';

  const payload = {
    api_key: process.env.SMTP2GO_API_KEY,
    to: Array.isArray(to) ? to : [to],
    sender,
    subject,
    html_body: html,
    text_body: text,
  };

  if (replyTo) payload.reply_to = Array.isArray(replyTo) ? replyTo : [replyTo];

  if (attachments?.length) {
    payload.attachments = attachments.map(a => ({
      filename: a.filename,
      fileblob: Buffer.from(a.content, 'utf8').toString('base64'),
      mimetype: a.mimetype || 'application/octet-stream',
    }));
  }

  try {
    const response = await fetch('https://api.smtp2go.com/v3/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok || data.data?.error) {
      console.error('[sendEmail] SMTP2Go error:', JSON.stringify(data));
      return { ok: false, error: data };
    }
    return { ok: true, data };
  } catch (err) {
    console.error('[sendEmail] fetch error:', err);
    return { ok: false, error: String(err) };
  }
}
