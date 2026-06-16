import LegalLayout from './LegalLayout'

export default function Terms() {
  return (
    <LegalLayout title="Terms & Conditions" lastUpdated="June 17, 2026">
      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">1. Acceptance of Terms</h2>
        <p>
          By accessing or using the NIYU Perfumes website (niyuperfumes.com) and our services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">2. Products & Services</h2>
        <p>
          NIYU Perfumes sells handcrafted perfumes, attars, and car fragrances. All product images are for illustration purposes only. Actual products may vary slightly in color, packaging, or appearance due to the handmade nature of our products.
        </p>
        <p>
          We reserve the right to modify or discontinue any product at any time without prior notice. We shall not be liable to you or any third party for any modification, price change, suspension, or discontinuance of a product.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">3. Pricing & Payment</h2>
        <p>
          All prices displayed on the website are in Indian Rupees (INR). Prices are subject to change without notice. We accept payments exclusively through UPI (Unified Payments Interface).
        </p>
        <p>
          While we strive to display accurate pricing, errors may occur. If we discover a pricing error for an order you have placed, we will inform you and give you the option to cancel the order or proceed at the correct price.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">4. Orders & Acceptance</h2>
        <p>
          Placing an order on our website constitutes an offer to purchase. We reserve the right to accept or decline any order at our sole discretion. An order is only confirmed once you receive an order confirmation email or WhatsApp message from us.
        </p>
        <p>
          We may limit the quantity of items purchased per person, per household, or per order.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">5. Shipping & Delivery</h2>
        <p>
          We offer free shipping across India. Estimated delivery timelines are provided at checkout and are estimates only. Delays may occur due to unforeseen circumstances, courier issues, or high-demand periods. NIYU Perfumes is not responsible for delays caused by third-party shipping partners.
        </p>
        <p>
          Please refer to our <button onClick={() => window.location.href = '/shipping'} className="text-gold hover:underline">Shipping Policy</button> for detailed information.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">6. Returns & Refunds</h2>
        <p>
          We offer a 7-day hassle-free return policy for eligible products. To be eligible for a return, the product must be unused, in its original packaging, and in the same condition you received it.
        </p>
        <p>
          Please refer to our <button onClick={() => window.location.href = '/refund'} className="text-gold hover:underline">Refund Policy</button> for detailed information on returns, refunds, and exchanges.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">7. User Accounts</h2>
        <p>
          You may browse our website and make purchases as a guest. If you create an account, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">8. Intellectual Property</h2>
        <p>
          All content on this website, including text, graphics, logos, images, and software, is the property of NIYU Perfumes and is protected by Indian and international copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">9. Limitation of Liability</h2>
        <p>
          NIYU Perfumes shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products. Our total liability shall not exceed the amount paid by you for the specific product giving rise to the claim.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">10. Governing Law</h2>
        <p>
          These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in India.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">11. Grievance Officer</h2>
        <p>
          In accordance with the Information Technology Act, 2000 and the Consumer Protection (E-Commerce) Rules, 2020, the name and contact details of our Grievance Officer are provided below:
        </p>
        <p className="mt-2">
          <strong>NIYU Perfumes</strong><br />
          Email: niyuperfumes2907@gmail.com<br />
          WhatsApp: +91 6302040779
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">12. Changes to Terms</h2>
        <p>
          We reserve the right to update these Terms and Conditions at any time. Changes will be effective immediately upon posting on this page. Your continued use of the website after changes constitutes acceptance of the updated terms.
        </p>
      </section>
    </LegalLayout>
  )
}
