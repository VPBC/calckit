import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose prose-gray">
      <h1>Privacy Policy</h1>
      <p><strong>Last updated:</strong> April 18, 2026</p>
      <h2>What Data We Collect</h2>
      <p>SiteCalc does not collect, store, or transmit any personal data. All calculations are performed entirely in your web browser. No data leaves your device.</p>
      <h2>Cookies</h2>
      <p>SiteCalc does not use cookies. If we integrate third-party advertising in the future, those services may use cookies. We will update this policy accordingly.</p>
      <h2>Analytics</h2>
      <p>We may use privacy-respecting analytics (such as Plausible or simple server logs) to understand which calculators are most used. No personally identifiable information is collected.</p>
      <h2>Third-Party Services</h2>
      <p>SiteCalc may display advertisements through Google AdSense or similar services. These services have their own privacy policies. We do not control their data practices.</p>
      <h2>Contact</h2>
      <p>For privacy questions, contact us at privacy@sitecalc.app.</p>
    </div>
  );
}
