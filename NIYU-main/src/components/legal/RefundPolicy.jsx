import LegalLayout from './LegalLayout'

export default function RefundPolicy() {
  return (
    <LegalLayout title="Refund & Return Policy" lastUpdated="June 17, 2026">
      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">1. Return Eligibility</h2>
        <p>
          We offer a 7-day hassle-free return policy from the date of delivery. To be eligible for a return, your item must meet the following conditions:
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Unused and in the same condition as received</li>
          <li>In its original packaging</li>
          <li>Accompanied by the order confirmation or receipt</li>
          <li>Free from damage caused by the customer</li>
        </ul>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">2. Non-Returnable Items</h2>
        <p>The following items cannot be returned or exchanged:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Products that have been used, opened, or damaged by the customer</li>
          <li>Products without original packaging</li>
          <li>Gift cards</li>
          <li>Items purchased during special sales or clearance events (unless defective)</li>
        </ul>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">3. How to Initiate a Return</h2>
        <p>To start a return, please contact us within 7 days of delivery:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>WhatsApp:</strong> +91 6302040779 (with your order ID and reason for return)</li>
          <li><strong>Email:</strong> niyuperfumes2907@gmail.com</li>
        </ul>
        <p className="mt-2">
          Our team will review your request and provide instructions for returning the product. Please do not send products back without contacting us first.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">4. Return Shipping</h2>
        <p>
          For defective or damaged products, NIYU Perfumes will arrange and bear the return shipping cost. For all other returns (change of mind, wrong selection, etc.), the customer is responsible for return shipping costs.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">5. Refund Process</h2>
        <p>Once we receive and inspect your returned item:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>We will notify you of the approval or rejection of your refund</li>
          <li>If approved, the refund will be processed within 5-7 business days</li>
          <li>Refunds will be credited to the original UPI account used for payment</li>
          <li>Processing time may vary depending on your UPI provider</li>
        </ul>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">6. Partial Refunds</h2>
        <p>Partial refunds may be granted in the following cases:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Products returned with visible signs of use or damage</li>
          <li>Products returned without original packaging</li>
          <li>Products returned after the 7-day window (case-by-case basis)</li>
        </ul>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">7. Exchanges</h2>
        <p>
          We only replace items if they are defective or damaged. If you need to exchange a product for the same item, contact us at niyuperfumes2907@gmail.com with your order details and photos of the defect.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">8. Damaged or Defective Products</h2>
        <p>
          If you receive a damaged or defective product, please contact us within 48 hours of delivery with:
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Your order ID</li>
          <li>Photos of the damaged/defective product</li>
          <li>A brief description of the issue</li>
        </ul>
        <p className="mt-2">
          We will arrange a replacement or full refund at no additional cost to you.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">9. Cancellation Policy</h2>
        <p>
          Orders can be cancelled before they are shipped. Once an order has been dispatched, it cannot be cancelled and will be subject to our return policy. To cancel an order, contact us immediately via WhatsApp or email.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">10. Contact Us</h2>
        <p>
          For any questions about returns, refunds, or exchanges, please reach out to us:
        </p>
        <p className="mt-2">
          <strong>NIYU Perfumes</strong><br />
          Email: niyuperfumes2907@gmail.com<br />
          WhatsApp: +91 6302040779
        </p>
      </section>
    </LegalLayout>
  )
}
