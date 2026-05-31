import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Simple in-memory rate limiter (resets on cold start)
const rateLimit = new Map()
const RATE_LIMIT_WINDOW = 60000 // 1 minute
const RATE_LIMIT_MAX = 5 // max requests per window

function isRateLimited(ip) {
  const now = Date.now()
  const record = rateLimit.get(ip)
  if (!record || now - record.start > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { start: now, count: 1 })
    return false
  }
  record.count++
  return record.count > RATE_LIMIT_MAX
}

function escapeHtml(str) {
  if (typeof str !== 'string') return String(str)
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

function sanitizeInput(email, name, phone, address, pincode) {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !EMAIL_RE.test(email)) return { error: 'Invalid email format' }
  if (!name || name.length > 200) return { error: 'Invalid name' }
  if (phone && (!/^\d{10,15}$/.test(phone))) return { error: 'Invalid phone number' }
  if (address && address.length > 500) return { error: 'Address too long' }
  if (pincode && !/^\d{4,10}$/.test(pincode)) return { error: 'Invalid pincode' }
  return { error: null }
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://niyuperfumes.vercel.app')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Rate limiting
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' })
  }

  const { email, name, phone, orderId, items, subtotal, address, pincode, transactionRef } = req.body

  if (!email || !name || !items?.length) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Validate and sanitize inputs
  const validation = sanitizeInput(email, name, phone, address, pincode)
  if (validation.error) {
    return res.status(400).json({ error: validation.error })
  }

  // Sanitize all values for HTML output
  const sName = escapeHtml(name)
  const sEmail = escapeHtml(email)
  const sPhone = escapeHtml(phone || '')
  const sAddress = escapeHtml(address || '')
  const sPincode = escapeHtml(pincode || '')
  const sOrderId = escapeHtml(orderId || '')

  const itemRows = items.slice(0, 50).map(item =>
    `<tr>
      <td style="padding:12px 16px;border-bottom:1px solid #f0ece4;font-family:Georgia,serif;color:#1a1a1a;">${escapeHtml(item.name)}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #f0ece4;font-family:Georgia,serif;color:#666;text-align:center;">${escapeHtml(item.size)}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #f0ece4;font-family:Georgia,serif;color:#666;text-align:center;">${Number(item.qty)}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #f0ece4;font-family:Georgia,serif;color:#1a1a1a;text-align:right;">&#8377;${Number(item.price) * Number(item.qty)}</td>
    </tr>`
  ).join('')

  const html = `
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;background:#faf8f4;">
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="font-family:Georgia,serif;font-size:28px;color:#1a1a1a;margin:0 0 8px;letter-spacing:0.05em;">NIYU</h1>
      <p style="font-family:Georgia,serif;font-size:12px;color:#999;letter-spacing:0.15em;text-transform:uppercase;margin:0;">Perfumes</p>
    </div>

    <div style="border-top:1px solid #d4c9a8;margin-bottom:32px;"></div>

    <h2 style="font-family:Georgia,serif;font-size:20px;color:#1a1a1a;margin:0 0 8px;">Order Confirmed</h2>
    <p style="font-family:Georgia,serif;font-size:14px;color:#666;margin:0 0 24px;">Thank you for your order, ${sName}. We'll dispatch it shortly.</p>

    ${sOrderId ? `<p style="font-family:Georgia,serif;font-size:12px;color:#999;margin:0 0 24px;letter-spacing:0.05em;">Order #${sOrderId}</p>` : ''}

    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <thead>
        <tr>
          <th style="padding:12px 16px;border-bottom:2px solid #d4c9a8;font-family:Georgia,serif;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999;text-align:left;">Item</th>
          <th style="padding:12px 16px;border-bottom:2px solid #d4c9a8;font-family:Georgia,serif;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999;text-align:center;">Size</th>
          <th style="padding:12px 16px;border-bottom:2px solid #d4c9a8;font-family:Georgia,serif;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999;text-align:center;">Qty</th>
          <th style="padding:12px 16px;border-bottom:2px solid #d4c9a8;font-family:Georgia,serif;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999;text-align:right;">Price</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
    </table>

    <div style="border-top:2px solid #d4c9a8;padding-top:16px;margin-bottom:32px;text-align:right;">
      <span style="font-family:Georgia,serif;font-size:14px;color:#666;">Total: </span>
      <span style="font-family:Georgia,serif;font-size:20px;color:#1a1a1a;font-weight:bold;">&#8377;${Number(subtotal)}</span>
    </div>

    <div style="background:#f0ece4;padding:20px;margin-bottom:32px;">
      <p style="font-family:Georgia,serif;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999;margin:0 0 8px;">Delivery Address</p>
      <p style="font-family:Georgia,serif;font-size:14px;color:#1a1a1a;margin:0;">${sAddress}, ${sPincode}</p>
    </div>

    <div style="text-align:center;margin-bottom:8px;">
      <p style="font-family:Georgia,serif;font-size:12px;color:#999;margin:0;">Payment Method: UPI</p>
    </div>

    ${transactionRef ? `<div style="text-align:center;margin-bottom:24px;">
      <p style="font-family:Georgia,serif;font-size:12px;color:#999;margin:0;">UPI Reference: <span style="color:#1a1a1a;font-family:monospace;">${escapeHtml(transactionRef)}</span></p>
    </div>` : ''}

    <div style="border-top:1px solid #f0ece4;margin-top:32px;padding-top:24px;text-align:center;">
      <p style="font-family:Georgia,serif;font-size:12px;color:#bbb;margin:0;">NIYU Perfumes &mdash; Luxury, distilled.</p>
    </div>
  </div>
  `

  try {
    // Send confirmation to customer
    await resend.emails.send({
      from: 'NIYU Perfumes <onboarding@resend.dev>',
      to: [sEmail],
      subject: `Order Confirmed — NIYU Perfumes`,
      html,
    })

    // Send notification to store owner
    await resend.emails.send({
      from: 'NIYU Perfumes <onboarding@resend.dev>',
      to: ['niyuperfumes2907@gmail.com'],
      subject: `NEW ORDER — ${sName} — ₹${Number(subtotal)}`,
      html: html.replace(
        'Thank you for your order',
        `New order from <strong>${sName}</strong> — Phone: <strong>${sPhone || 'N/A'}</strong><br/><br/>Thank you for your order`
      ),
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('[NIYU] Resend error:', error.message)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
