import LegalLayout from './LegalLayout'

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="June 17, 2026">
      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">1. Introduction</h2>
        <p>
          NIYU Perfumes ("we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and purchase our products. This policy complies with the Digital Personal Data Protection Act (DPDPA), 2023 and GDPR where applicable.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">2. Information We Collect</h2>
        <p className="font-medium text-ink">Personal Information:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Name, email address, phone number</li>
          <li>Shipping and billing address</li>
          <li>UPI payment identifiers (processed securely, not stored)</li>
          <li>Order history and preferences</li>
        </ul>
        <p className="font-medium text-ink mt-3">Automatically Collected Information:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Browser type and version</li>
          <li>Device type and operating system</li>
          <li>IP address and approximate location</li>
          <li>Pages visited, time spent, and navigation patterns</li>
          <li>Referring website or source</li>
        </ul>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">3. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Process and fulfill your orders</li>
          <li>Send order confirmations and delivery updates</li>
          <li>Provide customer support via WhatsApp or email</li>
          <li>Improve our website, products, and services</li>
          <li>Send promotional communications (only with your consent)</li>
          <li>Detect and prevent fraud or unauthorized transactions</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">4. Data Sharing</h2>
        <p>We may share your information with:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Shipping partners:</strong> To deliver your orders (name, address, phone)</li>
          <li><strong>Payment processors:</strong> To securely process UPI payments</li>
          <li><strong>Analytics providers:</strong> To understand website usage (anonymized data)</li>
          <li><strong>Legal authorities:</strong> When required by law or to protect our rights</li>
        </ul>
        <p className="mt-2">
          We do NOT sell, rent, or trade your personal information to third parties for their marketing purposes.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">5. Cookies & Tracking</h2>
        <p>
          We use essential cookies to operate our website and analytics cookies to understand how visitors interact with our site. You can control cookie preferences through your browser settings. We use cookies for:
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Shopping cart persistence</li>
          <li>Website analytics (page views, traffic sources)</li>
          <li>Remembering your preferences</li>
        </ul>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">6. Data Security</h2>
        <p>
          We implement industry-standard security measures including SSL/TLS encryption, secure server infrastructure, and access controls. However, no method of electronic transmission or storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">7. Data Retention</h2>
        <p>
          We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law. Order data is retained for a minimum of 7 years as required under Indian tax laws.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">8. Your Rights</h2>
        <p>Under the DPDPA 2023, you have the right to:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate or incomplete data</li>
          <li>Request deletion of your personal data</li>
          <li>Withdraw consent for data processing at any time</li>
          <li>Grievance redressal for data-related concerns</li>
        </ul>
        <p className="mt-2">
          To exercise any of these rights, please contact us at niyuperfumes2907@gmail.com.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">9. Children's Privacy</h2>
        <p>
          Our website is not intended for children under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-lg tracking-[0.1em] text-ink mb-3">11. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or our data practices, please contact us:
        </p>
        <p className="mt-2">
          <strong>NIYU Perfumes</strong><br />
          Email: niyuperfumes2907@gmail.com<br />
          WhatsApp: +91 6302040779<br />
          Instagram: @niyuperfumes24
        </p>
      </section>
    </LegalLayout>
  )
}
