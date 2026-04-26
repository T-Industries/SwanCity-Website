// Branded HTML response page shown after staff clicks Confirm/Decline.

export function responsePage({ status, title, message, details }) {
  const accent = status === 'confirmed' ? '#1A8A1A'
    : status === 'declined' ? '#888888'
    : '#C8102E';
  const icon = status === 'confirmed' ? '✓'
    : status === 'declined' ? '✗'
    : '!';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} — Swan City Roadhouse</title>
  <link href="https://fonts.googleapis.com/css2?family=Rye&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    body { margin:0; padding:0; font-family: 'Inter', -apple-system, sans-serif; background:#F4F4F4; color:#1A1A1A; min-height:100vh; display:flex; align-items:center; justify-content:center; }
    .card { max-width: 540px; width: calc(100% - 32px); background:#fff; border-radius:8px; box-shadow: 0 14px 40px rgba(0,0,0,0.18); overflow:hidden; }
    .header { background:#111; color:#fff; padding:28px 32px; text-align:center; border-bottom:4px solid #C8102E; }
    .header .eyebrow { font-family: 'Rye', Georgia, serif; color:#C8102E; font-size:11px; letter-spacing:4px; text-transform:uppercase; }
    .header h1 { margin:6px 0 0; font-family:'Rye', Georgia, serif; font-size:22px; letter-spacing:3px; text-transform:uppercase; font-weight:normal; }
    .body { padding:36px 32px; text-align:center; }
    .icon { width:80px; height:80px; border-radius:50%; background:${accent}; color:#fff; display:flex; align-items:center; justify-content:center; font-size:42px; margin:0 auto 20px; box-shadow:0 0 0 6px rgba(0,0,0,0.04); font-weight:bold; }
    h2 { font-family:'Rye', Georgia, serif; font-size:24px; letter-spacing:2px; text-transform:uppercase; margin:0 0 12px; font-weight:normal; }
    .msg { color:#5E5E5E; font-size:15px; line-height:1.65; margin:0 0 18px; }
    .details { background:#F1E3C2; border-left:5px solid #C8102E; border-radius:4px; padding:14px 18px; margin:16px 0 0; font-size:14px; line-height:1.55; text-align:left; color:#1A1A1A; }
    .footer { background:#111; color:#A8A8A8; padding:14px 32px; text-align:center; font-size:12px; }
    .footer a { color:#C8102E; text-decoration:none; }
    .close-hint { color:#888; font-size:12px; margin-top:24px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="eyebrow">— Swan City Roadhouse —</div>
      <h1>${title}</h1>
    </div>
    <div class="body">
      <div class="icon">${icon}</div>
      <h2>${title}</h2>
      <p class="msg">${message}</p>
      ${details ? `<div class="details">${details}</div>` : ''}
      <p class="close-hint">You can close this tab now.</p>
    </div>
    <div class="footer">
      11401 100 Ave., Grande Prairie, AB · <a href="tel:+18666584755">+1 (866) 658-4755</a>
    </div>
  </div>
</body>
</html>`;
}
