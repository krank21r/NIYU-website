import LegalLayout from './LegalLayout'

export default function ShippingPolicy() {
  return (
    <LegalLayout title="Shipping Policy" lastUpdated="June 23, 2026">
      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">1. Shipping Coverage</h2>
        <p>
          Currently, NIYU Perfumes ships exclusively within <strong>Hyderabad city</strong> and its surrounding areas. We are working to expand our shipping network to more cities soon.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">2. Shipping Charges</h2>
        <p>
          We offer <strong>free standard shipping</strong> on all orders within Hyderabad. There are no hidden fees or additional shipping charges.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">3. Estimated Delivery Time</h2>
        <p>
          Orders are delivered within <strong>1-3 business days</strong> within Hyderabad city limits. Business days are Monday to Saturday, excluding public holidays.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">4. Order Processing</h2>
        <p>
          Orders are typically processed within 1-2 business days after payment confirmation. You will receive a confirmation message via email or WhatsApp once your order has been dispatched.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">5. Delivery Address</h2>
        <p>
          Please ensure your shipping address is complete and accurate, including:
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Full name</li>
          <li>House/flat number, building name, street</li>
          <li>Landmark (if any)</li>
          <li>Area / Locality, Hyderabad — Pincode</li>
          <li>Valid phone number for delivery coordination</li>
        </ul>
        <p className="mt-2">
          NIYU Perfumes is not responsible for deliveries to incorrect or incomplete addresses provided by the customer. Re-shipping charges may apply for returned packages due to address issues.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">6. Failed Deliveries</h2>
        <p>
          If a delivery attempt fails due to the customer being unavailable or incorrect address details:
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>We will contact you via WhatsApp or phone to coordinate re-delivery</li>
          <li>If undeliverable, the package will be returned to us</li>
          <li>Re-shipping will be arranged at no additional cost for the first attempt</li>
          <li>Subsequent re-shipping may incur a nominal fee</li>
        </ul>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">7. Cash on Delivery (COD)</h2>
        <p>
          Currently, we only accept UPI payments. Cash on Delivery (COD) is not available at this time.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">8. Contact Us</h2>
        <p>
          For any shipping-related queries, please contact us:
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
