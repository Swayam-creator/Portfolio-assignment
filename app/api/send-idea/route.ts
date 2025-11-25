import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)


function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()

  const realIp = req.headers.get("x-real-ip")
  if (realIp) return realIp

  const cfIp = req.headers.get("cf-connecting-ip")
  if (cfIp) return cfIp

  return "0.0.0.0"
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5

const ipRequestLog = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW_MS

  const timestamps = ipRequestLog.get(ip) || []
  const recent = timestamps.filter((t) => t > windowStart)
  recent.push(now)

  ipRequestLog.set(ip, recent)

  return recent.length > RATE_LIMIT_MAX_REQUESTS
}

export async function POST(request: NextRequest) {
  try {
    
    const ip = getClientIp(request)

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      )
    }

    const { name, email, idea, category } = await request.json()

    if (!name || !email || !idea) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const ideaData = {
      name,
      email,
      idea,
      category,
      submittedAt: new Date().toISOString(),
    }

    

    const htmlBody = `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color:#0b1220; padding:24px; color:#e5e7eb;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px; margin:0 auto; background:#020617; border-radius:16px; border:1px solid #22d3ee33; overflow:hidden;">
          <tr>
            <td style="padding:24px 24px 16px 24px; border-bottom:1px solid #1f2937;">
              <h1 style="margin:0; font-size:20px; color:#e5e7eb;">🚀 New Idea Submission</h1>
              <p style="margin:8px 0 0 0; font-size:13px; color:#9ca3af;">
                Someone just submitted a new idea through your portfolio.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px; color:#d1d5db;">
                <tr>
                  <td style="padding-bottom:8px; width:35%; color:#9ca3af;">👤 Name</td>
                  <td style="padding-bottom:8px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding-bottom:8px; color:#9ca3af;">✉️ Email</td>
                  <td style="padding-bottom:8px;">
                    <a href="mailto:${email}" style="color:#22d3ee; text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:8px; color:#9ca3af;">🏷️ Category</td>
                  <td style="padding-bottom:8px; text-transform:capitalize;">${category}</td>
                </tr>
                <tr>
                  <td style="padding-bottom:16px; color:#9ca3af;">📅 Submitted</td>
                  <td style="padding-bottom:16px;">${new Date().toLocaleString()}</td>
                </tr>
              </table>

              <div style="border-radius:12px; border:1px solid #22d3ee33; background:linear-gradient(135deg, #020617, #020617, #0f172a); padding:16px 18px;">
                <p style="margin:0 0 8px 0; font-size:13px; font-weight:600; color:#e5e7eb;">
                  💡 Idea
                </p>
                <p style="margin:0; font-size:13px; line-height:1.6; white-space:pre-wrap; color:#d1d5db;">
                  ${idea}
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 24px 20px 24px; border-top:1px solid #1f2937; background:#020617;">
              <p style="margin:0; font-size:11px; color:#6b7280;">
                You received this email because someone used the <strong>“Share Your Idea”</strong> form on your website.
              </p>
            </td>
          </tr>
        </table>
      </div>
    `

    await resend.emails.send({
      from: "Idea Box <onboarding@resend.dev>",
      to: `${process.env.MY_EMAIL_ADDRESS}`,
      subject: `New Idea from ${name}`,
      html: htmlBody,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Idea submitted successfully. Swayam will review it soon!",
        data: ideaData,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[send-idea] Error in API:", error)
    return NextResponse.json({ error: "Failed to submit idea" }, { status: 500 })
  }
}
