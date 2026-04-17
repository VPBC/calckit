import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CalcKit — Free Construction & Home Improvement Calculators",
  description:
    "Calculate how much tile, concrete, paint, flooring, gravel, mulch, wallpaper, or drywall you need. Free, instant, accurate material estimates.",
};

const calculators = [
  {
    href: "/tile-calculator",
    title: "Tile Calculator",
    description: "How many tiles do you need? Enter room dimensions and tile size to get an exact count with waste allowance.",
    icon: "🔲",
  },
  {
    href: "/concrete-calculator",
    title: "Concrete Calculator",
    description: "Calculate cubic yards/meters of concrete for slabs, footings, columns, and steps.",
    icon: "🧱",
  },
  {
    href: "/paint-calculator",
    title: "Paint Calculator",
    description: "How many gallons or liters of paint do you need? Accounts for doors, windows, and coats.",
    icon: "🎨",
  },
  {
    href: "/flooring-calculator",
    title: "Flooring Calculator",
    description: "Estimate hardwood, laminate, or vinyl flooring needed for any room shape.",
    icon: "🪵",
  },
  {
    href: "/gravel-calculator",
    title: "Gravel Calculator",
    description: "Calculate tons of gravel, crushed stone, or sand for driveways, paths, and landscaping.",
    icon: "⛰️",
  },
  {
    href: "/mulch-calculator",
    title: "Mulch Calculator",
    description: "How many bags or cubic yards of mulch for your garden beds?",
    icon: "🌿",
  },
  {
    href: "/wallpaper-calculator",
    title: "Wallpaper Calculator",
    description: "Calculate rolls of wallpaper needed including pattern repeat waste.",
    icon: "🖼️",
  },
  {
    href: "/drywall-calculator",
    title: "Drywall Calculator",
    description: "Estimate drywall sheets, joint compound, and screws for walls and ceilings.",
    icon: "📐",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Free Construction Calculators
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Accurately estimate materials for your next project. No sign-up required. Instant results.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        {calculators.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="block p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{calc.icon}</span>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {calc.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {calc.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-16 prose prose-gray max-w-none">
        <h2>Why Use CalcKit?</h2>
        <p>
          Ordering too much material wastes money. Ordering too little means extra trips
          and project delays. CalcKit gives you accurate estimates in seconds so you buy
          exactly what you need.
        </p>
        <h3>How Our Calculators Work</h3>
        <p>
          Enter your room or project dimensions, select your material, and get an instant
          estimate including a recommended waste allowance. All calculations follow
          industry-standard formulas used by professional contractors.
        </p>
        <h3>Trusted by DIYers and Professionals</h3>
        <p>
          Whether you&apos;re renovating a bathroom, building a patio, or planning a
          commercial project, CalcKit helps you estimate materials quickly and accurately.
          All calculators support both metric (meters, cm) and imperial (feet, inches)
          measurements.
        </p>
      </section>
    </div>
  );
}
