import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Resend } from "resend";

const inputSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(160),
  organisation: z.string().trim().max(160).optional().or(z.literal("")),
  inquiryType: z.string().trim().min(1).max(80),
  message: z.string().trim().min(10).max(2000),
});

export type ContactFormInput = z.infer<typeof inputSchema>;

const TO_EMAIL = "Info@raylab.health";
const FROM_EMAIL = "Ray Lab Group <noreply@raylab.health>";

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const buildHtml = (data: ContactFormInput) => {
  const rows: Array<[string, string]> = [
    ["First Name", data.firstName],
    ["Last Name", data.lastName],
    ["Email", data.email],
    ["Organisation", data.organisation && data.organisation.length > 0 ? data.organisation : "—"],
    ["Inquiry Type", data.inquiryType],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;background:#f6f7f6;font-weight:600;color:#1f2937;width:160px;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;color:#111827;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html>
  <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#ffffff;color:#111827;padding:24px;">
    <div style="max-width:640px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="background:#4F9907;color:#ffffff;padding:20px 24px;">
        <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:0.85;">Ray Lab Group · Website Inquiry</div>
        <div style="font-size:20px;font-weight:700;margin-top:4px;">New Contact Form Submission</div>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${rowsHtml}
      </table>
      <div style="padding:16px 12px;border-top:1px solid #e5e7eb;">
        <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#6b7280;margin-bottom:8px;">Message</div>
        <div style="white-space:pre-wrap;line-height:1.6;color:#111827;">${escapeHtml(data.message)}</div>
      </div>
      <div style="padding:12px 16px;background:#f9fafb;font-size:12px;color:#6b7280;">
        Reply directly to this email to respond to ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}.
      </div>
    </div>
  </body>
</html>`;
};

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("Email service is not configured. Please contact us directly.");
    }

    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email,
      subject: `[${data.inquiryType}] New inquiry from ${data.firstName} ${data.lastName}`,
      html: buildHtml(data),
    });

    if (result.error) {
      throw new Error(result.error.message || "Failed to send message. Please try again.");
    }

    return { success: true as const, id: result.data?.id };
  });
