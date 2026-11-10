import type { Context } from '@netlify/functions';
import { Resend } from 'resend';

import { isSpam } from './_lib/anti-spam';

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function validate(
  body: Record<string, unknown>,
): { ok: true; value: ContactPayload } | { ok: false; error: string } {
  const { name, email, message } = body;
  if (typeof name !== 'string' || !name.trim()) {
    return { ok: false, error: 'Name is required' };
  }
  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return { ok: false, error: 'A valid email is required' };
  }
  if (typeof message !== 'string' || !message.trim()) {
    return { ok: false, error: 'Message is required' };
  }
  return {
    ok: true,
    value: { name: name.trim(), email: email.trim(), message: message.trim() },
  };
}

export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonResponse(400, { error: 'Invalid JSON body' });
  }

  if (typeof body !== 'object' || body === null) {
    return jsonResponse(400, { error: 'Invalid request body' });
  }
  const record = body as Record<string, unknown>;

  if (
    isSpam({
      honeypot: record.company,
      formLoadedAt: record.formLoadedAt,
    })
  ) {
    console.log('Spam submission dropped (honeypot/time-trap)', {
      company: record.company,
      formLoadedAt: record.formLoadedAt,
    });
    // Report success without sending an email, so bots don't adapt/retry.
    return jsonResponse(200, { ok: true });
  }

  const result = validate(record);
  if (!result.ok) {
    return jsonResponse(400, { error: result.error });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error(
      'Missing contact form env vars: RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL',
    );
    return jsonResponse(500, {
      error: 'Server is not configured to send email',
    });
  }

  const { name, email, message } = result.value;
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Portfolio contact form: ${name}`,
      template: {
        id: 'untitled-template',
        variables: {
          email_address: email,
          MESSAGE: message,
          Name: name,
        },
      },
    });

    if (error) {
      console.error('Resend API error', error);
      return jsonResponse(502, { error: 'Failed to send message' });
    }

    return jsonResponse(200, { ok: true });
  } catch (err) {
    console.error('Unexpected error sending contact email', err);
    return jsonResponse(500, { error: 'Unexpected server error' });
  }
};
