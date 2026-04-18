import type { Metadata } from "next";

export const metadata: Metadata = { title: "About SiteCalc" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose prose-gray">
      <h1>About SiteCalc</h1>
      <p>SiteCalc provides free, accurate construction and home improvement calculators. Whether you&apos;re a DIY homeowner or a professional contractor, our tools help you estimate materials quickly so you can buy exactly what you need.</p>
      <h2>Our Calculators</h2>
      <p>We offer calculators for tile, concrete, paint, flooring, gravel, mulch, wallpaper, and drywall — with more coming soon. Each calculator supports both imperial and metric measurements and includes industry-standard waste allowances.</p>
      <h2>How We Work</h2>
      <p>All calculations run entirely in your browser — nothing is sent to a server. We use the same formulas professional contractors use, with sensible defaults for waste, coverage rates, and material densities.</p>
      <h2>Contact Us</h2>
      <p>Questions or suggestions? Email us at hello@sitecalc.app.</p>
    </div>
  );
}
