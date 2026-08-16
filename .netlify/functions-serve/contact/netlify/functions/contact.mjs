
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// ../netlify/functions/contact.mts
import { Resend } from "resend";

// ../netlify/functions/_lib/anti-spam.ts
var MIN_SUBMIT_MS = 1500;
function isSpam({ honeypot, formLoadedAt }) {
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return true;
  }
  if (typeof formLoadedAt !== "number") {
    return true;
  }
  if (Date.now() - formLoadedAt < MIN_SUBMIT_MS) {
    return true;
  }
  return false;
}

// ../netlify/functions/contact.mts
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
function validate(body) {
  const { name, email, message } = body;
  if (typeof name !== "string" || !name.trim()) {
    return { ok: false, error: "Name is required" };
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return { ok: false, error: "A valid email is required" };
  }
  if (typeof message !== "string" || !message.trim()) {
    return { ok: false, error: "Message is required" };
  }
  return {
    ok: true,
    value: { name: name.trim(), email: email.trim(), message: message.trim() }
  };
}
var contact_default = async (req, _context) => {
  if (req.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }
  let body;
  try {
    body = await req.json();
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body" });
  }
  if (typeof body !== "object" || body === null) {
    return jsonResponse(400, { error: "Invalid request body" });
  }
  const record = body;
  if (isSpam({
    honeypot: record.company,
    formLoadedAt: record.formLoadedAt
  })) {
    console.log("Spam submission dropped (honeypot/time-trap)", {
      company: record.company,
      formLoadedAt: record.formLoadedAt
    });
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
      "Missing contact form env vars: RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL"
    );
    return jsonResponse(500, {
      error: "Server is not configured to send email"
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
        id: "untitled-template",
        variables: {
          email_address: email,
          MESSAGE: message,
          Name: name
        }
      }
    });
    if (error) {
      console.error("Resend API error", error);
      return jsonResponse(502, { error: "Failed to send message" });
    }
    return jsonResponse(200, { ok: true });
  } catch (err) {
    console.error("Unexpected error sending contact email", err);
    return jsonResponse(500, { error: "Unexpected server error" });
  }
};
export {
  contact_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbmV0bGlmeS9mdW5jdGlvbnMvY29udGFjdC5tdHMiLCAiLi4vbmV0bGlmeS9mdW5jdGlvbnMvX2xpYi9hbnRpLXNwYW0udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB0eXBlIHsgQ29udGV4dCB9IGZyb20gJ0BuZXRsaWZ5L2Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBSZXNlbmQgfSBmcm9tICdyZXNlbmQnO1xuXG5pbXBvcnQgeyBpc1NwYW0gfSBmcm9tICcuL19saWIvYW50aS1zcGFtJztcblxuaW50ZXJmYWNlIENvbnRhY3RQYXlsb2FkIHtcbiAgbmFtZTogc3RyaW5nO1xuICBlbWFpbDogc3RyaW5nO1xuICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmNvbnN0IEVNQUlMX1JFID0gL15bXlxcc0BdK0BbXlxcc0BdK1xcLlteXFxzQF0rJC87XG5cbmZ1bmN0aW9uIGpzb25SZXNwb25zZShzdGF0dXM6IG51bWJlciwgYm9keTogdW5rbm93bikge1xuICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KGJvZHkpLCB7XG4gICAgc3RhdHVzLFxuICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICB9KTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGUoXG4gIGJvZHk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxuKTogeyBvazogdHJ1ZTsgdmFsdWU6IENvbnRhY3RQYXlsb2FkIH0gfCB7IG9rOiBmYWxzZTsgZXJyb3I6IHN0cmluZyB9IHtcbiAgY29uc3QgeyBuYW1lLCBlbWFpbCwgbWVzc2FnZSB9ID0gYm9keTtcbiAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJyB8fCAhbmFtZS50cmltKCkpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnTmFtZSBpcyByZXF1aXJlZCcgfTtcbiAgfVxuICBpZiAodHlwZW9mIGVtYWlsICE9PSAnc3RyaW5nJyB8fCAhRU1BSUxfUkUudGVzdChlbWFpbCkpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnQSB2YWxpZCBlbWFpbCBpcyByZXF1aXJlZCcgfTtcbiAgfVxuICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09ICdzdHJpbmcnIHx8ICFtZXNzYWdlLnRyaW0oKSkge1xuICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6ICdNZXNzYWdlIGlzIHJlcXVpcmVkJyB9O1xuICB9XG4gIHJldHVybiB7XG4gICAgb2s6IHRydWUsXG4gICAgdmFsdWU6IHsgbmFtZTogbmFtZS50cmltKCksIGVtYWlsOiBlbWFpbC50cmltKCksIG1lc3NhZ2U6IG1lc3NhZ2UudHJpbSgpIH0sXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXE6IFJlcXVlc3QsIF9jb250ZXh0OiBDb250ZXh0KSA9PiB7XG4gIGlmIChyZXEubWV0aG9kICE9PSAnUE9TVCcpIHtcbiAgICByZXR1cm4ganNvblJlc3BvbnNlKDQwNSwgeyBlcnJvcjogJ01ldGhvZCBub3QgYWxsb3dlZCcgfSk7XG4gIH1cblxuICBsZXQgYm9keTogdW5rbm93bjtcbiAgdHJ5IHtcbiAgICBib2R5ID0gYXdhaXQgcmVxLmpzb24oKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGpzb25SZXNwb25zZSg0MDAsIHsgZXJyb3I6ICdJbnZhbGlkIEpTT04gYm9keScgfSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGJvZHkgIT09ICdvYmplY3QnIHx8IGJvZHkgPT09IG51bGwpIHtcbiAgICByZXR1cm4ganNvblJlc3BvbnNlKDQwMCwgeyBlcnJvcjogJ0ludmFsaWQgcmVxdWVzdCBib2R5JyB9KTtcbiAgfVxuICBjb25zdCByZWNvcmQgPSBib2R5IGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuXG4gIGlmIChcbiAgICBpc1NwYW0oe1xuICAgICAgaG9uZXlwb3Q6IHJlY29yZC5jb21wYW55LFxuICAgICAgZm9ybUxvYWRlZEF0OiByZWNvcmQuZm9ybUxvYWRlZEF0LFxuICAgIH0pXG4gICkge1xuICAgIGNvbnNvbGUubG9nKCdTcGFtIHN1Ym1pc3Npb24gZHJvcHBlZCAoaG9uZXlwb3QvdGltZS10cmFwKScsIHtcbiAgICAgIGNvbXBhbnk6IHJlY29yZC5jb21wYW55LFxuICAgICAgZm9ybUxvYWRlZEF0OiByZWNvcmQuZm9ybUxvYWRlZEF0LFxuICAgIH0pO1xuICAgIC8vIFJlcG9ydCBzdWNjZXNzIHdpdGhvdXQgc2VuZGluZyBhbiBlbWFpbCwgc28gYm90cyBkb24ndCBhZGFwdC9yZXRyeS5cbiAgICByZXR1cm4ganNvblJlc3BvbnNlKDIwMCwgeyBvazogdHJ1ZSB9KTtcbiAgfVxuXG4gIGNvbnN0IHJlc3VsdCA9IHZhbGlkYXRlKHJlY29yZCk7XG4gIGlmICghcmVzdWx0Lm9rKSB7XG4gICAgcmV0dXJuIGpzb25SZXNwb25zZSg0MDAsIHsgZXJyb3I6IHJlc3VsdC5lcnJvciB9KTtcbiAgfVxuXG4gIGNvbnN0IGFwaUtleSA9IHByb2Nlc3MuZW52LlJFU0VORF9BUElfS0VZO1xuICBjb25zdCB0b0VtYWlsID0gcHJvY2Vzcy5lbnYuQ09OVEFDVF9UT19FTUFJTDtcbiAgY29uc3QgZnJvbUVtYWlsID0gcHJvY2Vzcy5lbnYuQ09OVEFDVF9GUk9NX0VNQUlMO1xuXG4gIGlmICghYXBpS2V5IHx8ICF0b0VtYWlsIHx8ICFmcm9tRW1haWwpIHtcbiAgICBjb25zb2xlLmVycm9yKFxuICAgICAgJ01pc3NpbmcgY29udGFjdCBmb3JtIGVudiB2YXJzOiBSRVNFTkRfQVBJX0tFWSAvIENPTlRBQ1RfVE9fRU1BSUwgLyBDT05UQUNUX0ZST01fRU1BSUwnLFxuICAgICk7XG4gICAgcmV0dXJuIGpzb25SZXNwb25zZSg1MDAsIHtcbiAgICAgIGVycm9yOiAnU2VydmVyIGlzIG5vdCBjb25maWd1cmVkIHRvIHNlbmQgZW1haWwnLFxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgeyBuYW1lLCBlbWFpbCwgbWVzc2FnZSB9ID0gcmVzdWx0LnZhbHVlO1xuICBjb25zdCByZXNlbmQgPSBuZXcgUmVzZW5kKGFwaUtleSk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCByZXNlbmQuZW1haWxzLnNlbmQoe1xuICAgICAgZnJvbTogZnJvbUVtYWlsLFxuICAgICAgdG86IHRvRW1haWwsXG4gICAgICByZXBseVRvOiBlbWFpbCxcbiAgICAgIHN1YmplY3Q6IGBQb3J0Zm9saW8gY29udGFjdCBmb3JtOiAke25hbWV9YCxcbiAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgIGlkOiAndW50aXRsZWQtdGVtcGxhdGUnLFxuICAgICAgICB2YXJpYWJsZXM6IHtcbiAgICAgICAgICBlbWFpbF9hZGRyZXNzOiBlbWFpbCxcbiAgICAgICAgICBNRVNTQUdFOiBtZXNzYWdlLFxuICAgICAgICAgIE5hbWU6IG5hbWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdSZXNlbmQgQVBJIGVycm9yJywgZXJyb3IpO1xuICAgICAgcmV0dXJuIGpzb25SZXNwb25zZSg1MDIsIHsgZXJyb3I6ICdGYWlsZWQgdG8gc2VuZCBtZXNzYWdlJyB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4ganNvblJlc3BvbnNlKDIwMCwgeyBvazogdHJ1ZSB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignVW5leHBlY3RlZCBlcnJvciBzZW5kaW5nIGNvbnRhY3QgZW1haWwnLCBlcnIpO1xuICAgIHJldHVybiBqc29uUmVzcG9uc2UoNTAwLCB7IGVycm9yOiAnVW5leHBlY3RlZCBzZXJ2ZXIgZXJyb3InIH0pO1xuICB9XG59O1xuIiwgIi8qKlxuICogWmVyby1kZXBlbmRlbmN5IHNwYW0gY2hlY2tzOiBhIGhvbmV5cG90IGZpZWxkIHJlYWwgdXNlcnMgbmV2ZXIgc2VlL2ZpbGwsXG4gKiBwbHVzIGEgbWluaW11bSB0aW1lLXRvLXN1Ym1pdCAoYm90cyBwb3N0aW5nIGRpcmVjdGx5IGNhbid0IGhhdmUgXCJsb2FkZWRcIlxuICogdGhlIGZvcm0gZm9yIGFueSBsZW5ndGggb2YgdGltZSkuIEJvdGggYXJlIGNoZWFwLCBubyBBUEkga2V5cywgbm9cbiAqIHRoaXJkLXBhcnR5IHNjcmlwdC5cbiAqXG4gKiBFeHRlbnNpb24gcG9pbnQ6IHRvIGFkZCBDbG91ZGZsYXJlIFR1cm5zdGlsZSAob3Igc2ltaWxhcikgbGF0ZXIsIG1ha2UgdGhpc1xuICogZnVuY3Rpb24gYXN5bmMsIHZlcmlmeSBhIGB0dXJuc3RpbGVUb2tlbmAgZmllbGQgYWdhaW5zdCBUdXJuc3RpbGUnc1xuICogc2l0ZXZlcmlmeSBlbmRwb2ludCwgYW5kIE9SIGl0cyByZXN1bHQgaW50byB0aGUgcmV0dXJuIHZhbHVlIGJlbG93IFx1MjAxNCB0aGVcbiAqIGNhbGwgc2l0ZSBpbiBjb250YWN0Lm10cyBkb2Vzbid0IG5lZWQgdG8gY2hhbmdlLlxuICovXG5cbi8vIFJlYWwgdXNlcnMgdGFrZSBhdCBsZWFzdCB0aGlzIGxvbmcgdG8gZmlsbCBhIDMtZmllbGQgZm9ybTsgYSBib3QgcG9zdGluZ1xuLy8gc3RyYWlnaHQgdG8gdGhlIGVuZHBvaW50IHJlcG9ydHMgMCBlbGFwc2VkIHRpbWUgKG9yIG9taXRzIHRoZSBmaWVsZCkuXG5leHBvcnQgY29uc3QgTUlOX1NVQk1JVF9NUyA9IDE1MDA7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQW50aVNwYW1GaWVsZHMge1xuICAvKiogSG9uZXlwb3QgdmFsdWUgXHUyMDE0IGFueSBub24tZW1wdHkgdmFsdWUgbWVhbnMgYSBib3QgZmlsbGVkIGl0IGluLiAqL1xuICBob25leXBvdDogdW5rbm93bjtcbiAgLyoqIGVwb2NoIG1zIGNhcHR1cmVkIHdoZW4gdGhlIHJlYWwgZm9ybSByZW5kZXJlZCwgc2VudCBiYWNrIG9uIHN1Ym1pdC4gKi9cbiAgZm9ybUxvYWRlZEF0OiB1bmtub3duO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTcGFtKHsgaG9uZXlwb3QsIGZvcm1Mb2FkZWRBdCB9OiBBbnRpU3BhbUZpZWxkcyk6IGJvb2xlYW4ge1xuICBpZiAodHlwZW9mIGhvbmV5cG90ID09PSAnc3RyaW5nJyAmJiBob25leXBvdC50cmltKCkgIT09ICcnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKHR5cGVvZiBmb3JtTG9hZGVkQXQgIT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKERhdGUubm93KCkgLSBmb3JtTG9hZGVkQXQgPCBNSU5fU1VCTUlUX01TKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUNBLFNBQVMsY0FBYzs7O0FDYWhCLElBQU0sZ0JBQWdCO0FBU3RCLFNBQVMsT0FBTyxFQUFFLFVBQVUsYUFBYSxHQUE0QjtBQUMxRSxNQUFJLE9BQU8sYUFBYSxZQUFZLFNBQVMsS0FBSyxNQUFNLElBQUk7QUFDMUQsV0FBTztBQUFBLEVBQ1Q7QUFDQSxNQUFJLE9BQU8saUJBQWlCLFVBQVU7QUFDcEMsV0FBTztBQUFBLEVBQ1Q7QUFDQSxNQUFJLEtBQUssSUFBSSxJQUFJLGVBQWUsZUFBZTtBQUM3QyxXQUFPO0FBQUEsRUFDVDtBQUNBLFNBQU87QUFDVDs7O0FEdkJBLElBQU0sV0FBVztBQUVqQixTQUFTLGFBQWEsUUFBZ0IsTUFBZTtBQUNuRCxTQUFPLElBQUksU0FBUyxLQUFLLFVBQVUsSUFBSSxHQUFHO0FBQUEsSUFDeEM7QUFBQSxJQUNBLFNBQVMsRUFBRSxnQkFBZ0IsbUJBQW1CO0FBQUEsRUFDaEQsQ0FBQztBQUNIO0FBRUEsU0FBUyxTQUNQLE1BQ29FO0FBQ3BFLFFBQU0sRUFBRSxNQUFNLE9BQU8sUUFBUSxJQUFJO0FBQ2pDLE1BQUksT0FBTyxTQUFTLFlBQVksQ0FBQyxLQUFLLEtBQUssR0FBRztBQUM1QyxXQUFPLEVBQUUsSUFBSSxPQUFPLE9BQU8sbUJBQW1CO0FBQUEsRUFDaEQ7QUFDQSxNQUFJLE9BQU8sVUFBVSxZQUFZ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
