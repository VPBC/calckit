import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose prose-gray">
      <h1>Terms of Use</h1>
      <p><strong>Last updated:</strong> April 18, 2026</p>
      <h2>Disclaimer</h2>
      <p>SiteCalc provides construction material calculators for estimation purposes only. Results are approximate and should be verified by a qualified professional before purchasing materials or beginning construction.</p>
      <h2>No Warranty</h2>
      <p>Calculators are provided &ldquo;as is&rdquo; without warranty of any kind. We do not guarantee the accuracy of any calculation. Material requirements vary based on site conditions, installation methods, and material specifications not accounted for in these tools.</p>
      <h2>Limitation of Liability</h2>
      <p>SiteCalc is not liable for any damages arising from the use of these calculators, including but not limited to incorrect material orders, project delays, or financial losses.</p>
      <h2>Use of Service</h2>
      <p>You may use SiteCalc for personal and commercial estimation purposes. You may not scrape, copy, or redistribute our calculators without permission.</p>
    </div>
  );
}
