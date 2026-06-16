import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, name, phone, orderId, items, subtotal, address, pincode } = req.body

  if (!email || !name || !items?.length) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const safeName = escapeHtml(name)
  const safePhone = escapeHtml(phone)
  const safeAddress = escapeHtml(address)
  const safePincode = escapeHtml(pincode)
  const safeOrderId = escapeHtml(orderId)

  const itemRows = items.map(item =>
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
    <p style="font-family:Georgia,serif;font-size:14px;color:#666;margin:0 0 24px;">Thank you for your order, ${safeName}. We'll dispatch it shortly.</p>

    ${safeOrderId ? `<p style="font-family:Georgia,serif;font-size:12px;color:#999;margin:0 0 24px;letter-spacing:0.05em;">Order #${safeOrderId}</p>` : ''}

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
      <p style="font-family:Georgia,serif;font-size:14px;color:#1a1a1a;margin:0;">${safeAddress}, ${safePincode}</p>
    </div>

    <div style="text-align:center;">
      <p style="font-family:Georgia,serif;font-size:12px;color:#999;margin:0;">Payment Method: UPI</p>
    </div>

    <div style="border-top:1px solid #f0ece4;margin-top:32px;padding-top:24px;text-align:center;">
      <p style="font-family:Georgia,serif;font-size:12px;color:#bbb;margin:0;">NIYU Perfumes &mdash; Luxury, distilled.</p>
    </div>
  </div>
  `

  try {
    await resend.emails.send({
      from: 'NIYU Perfumes <onboarding@resend.dev>',
      to: [email],
      subject: `Order Confirmed — NIYU Perfumes`,
      html,
    })

    await resend.emails.send({
      from: 'NIYU Perfumes <onboarding@resend.dev>',
      to: ['niyuperfumes2907@gmail.com'],
      subject: `NEW ORDER — ${safeName} — ₹${Number(subtotal)}`,
      html: html.replace(
        'Thank you for your order',
        `New order from <strong>${safeName}</strong> — Phone: <strong>${safePhone || 'N/A'}</strong><br/><br/>Thank you for your order`
      ),
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('[NIYU] Resend error:', error)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
