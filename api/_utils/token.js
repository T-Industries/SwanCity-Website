import crypto from 'node:crypto';

const SECRET = () =>
  process.env.RESERVATION_TOKEN_SECRET ||
  'dev-secret-do-not-use-in-prod-please';

const b64urlEncode = (buf) =>
  Buffer.from(buf).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

const b64urlDecode = (str) => {
  const pad = 4 - (str.length % 4);
  const padded = pad < 4 ? str + '='.repeat(pad) : str;
  return Buffer.from(padded.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
};

const sign = (data) =>
  crypto.createHmac('sha256', SECRET()).update(data).digest();

export function signToken(payload, ttlDays = 7) {
  const exp = Date.now() + ttlDays * 24 * 60 * 60 * 1000;
  const body = JSON.stringify({ ...payload, exp });
  const bodyB64 = b64urlEncode(body);
  const sigB64 = b64urlEncode(sign(bodyB64));
  return `${bodyB64}.${sigB64}`;
}

export function verifyToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    return { ok: false, reason: 'malformed' };
  }
  const [bodyB64, sigB64] = token.split('.');
  const expected = b64urlEncode(sign(bodyB64));
  if (sigB64 !== expected) return { ok: false, reason: 'bad-signature' };
  let payload;
  try {
    payload = JSON.parse(b64urlDecode(bodyB64).toString('utf8'));
  } catch {
    return { ok: false, reason: 'bad-payload' };
  }
  if (!payload.exp || Date.now() > payload.exp) {
    return { ok: false, reason: 'expired' };
  }
  return { ok: true, payload };
}
