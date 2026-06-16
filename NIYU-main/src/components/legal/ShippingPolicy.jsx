import LegalLayout from './LegalLayout'

export default function ShippingPolicy() {
  return (
    <LegalLayout title="Shipping Policy" lastUpdated="June 17, 2026">
      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">1. Shipping Coverage</h2>
        <p>
          NIYU Perfumes ships to all addresses across India. We currently do not offer international shipping.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">2. Shipping Charges</h2>
        <p>
          We offer <strong>free standard shipping</strong> on all orders across India. There are no hidden fees or additional shipping charges.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">3. Estimated Delivery Time</h2>
        <p>Standard delivery timelines are as follows:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Metro cities:</strong> 3-5 business days</li>
          <li><strong>Tier 2 & 3 cities:</strong> 5-7 business days</li>
          <li><strong>Remote areas:</strong> 7-10 business days</li>
        </ul>
        <p className="mt-2">
          Business days are Monday to Saturday, excluding public holidays. Delivery timelines are estimates and may vary due to unforeseen circumstances, natural disasters, strikes, or high-demand periods (festivals, sales).
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">4. Order Processing</h2>
        <p>
          Orders are typically processed within 1-2 business days after payment confirmation. You will receive a confirmation message via email or WhatsApp once your order has been dispatched, along with tracking information where available.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">5. Shipping Partners</h2>
        <p>
          We partner with reputed courier services including Delhivery, BlueDart, India Post, and other reliable logistics providers. The shipping partner is selected based on your pincode and order weight to ensure the fastest and safest delivery.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">6. Order Tracking</h2>
        <p>
          Once your order is dispatched, you will receive a tracking link via WhatsApp or email. You can use this link to track your shipment in real-time. If you face any issues with tracking, please contact our support team.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">7. Delivery Address</h2>
        <p>
          Please ensure your shipping address is complete and accurate, including:
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Full name</li>
          <li>House/flat number, building name, street</li>
          <li>Landmark (if any)</li>
          <li>City, State, Pincode</li>
          <li>Valid phone number for delivery coordination</li>
        </ul>
        <p className="mt-2">
          NIYU Perfumes is not responsible for deliveries to incorrect or incomplete addresses provided by the customer. Re-shipping charges may apply for returned packages due to address issues.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">8. Failed Deliveries</h2>
        <p>
          If a delivery attempt fails due to the customer being unavailable or incorrect address details:
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>The courier will typically make 2-3 delivery attempts</li>
          <li>If undeliverable, the package will be returned to us</li>
          <li>Re-shipping will be arranged at no additional cost for the first attempt</li>
          <li>Subsequent re-shipping may incur a nominal fee</li>
        </ul>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">9. Cash on Delivery (COD)</h2>
        <p>
          Currently, we only accept UPI payments. Cash on Delivery (COD) is not available at this time.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">10. Contact Us</h2>
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
