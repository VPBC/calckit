"use client";

import { useState } from "react";
import CalculatorShell, {
  NumberInput,
  SelectInput,
  ResultCard,
} from "@/components/CalculatorShell";

export default function MulchCalculator() {
  const [unit, setUnit] = useState("ft");
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(4);
  const [depth, setDepth] = useState(3);

  const dimUnit = unit === "ft" ? "ft" : "m";
  const depthUnit = unit === "ft" ? "in" : "cm";

  const depthFt = unit === "ft" ? depth / 12 : depth / 100;
  const volCuFt = unit === "ft" ? length * width * depthFt : length * width * depthFt * 35.3147;
  const cuYards = volCuFt / 27;
  const cuMeters = cuYards * 0.7646;

  // Standard bag is 2 cu ft
  const bags2cuft = Math.ceil(volCuFt / 2);
  const bags3cuft = Math.ceil(volCuFt / 3);

  const costBulk = cuYards * 35; // ~$35/cu yd bulk
  const costBags = bags2cuft * 4.5; // ~$4.50/bag

  return (
    <CalculatorShell
      title="Mulch Calculator — How Much Mulch Do I Need?"
      description="Calculate bags or cubic yards of mulch needed for garden beds, trees, and landscaping. Compare bulk delivery vs. bagged mulch costs."
      currentPath="/mulch-calculator"
      faqItems={[
        {
          q: "How deep should mulch be?",
          a: "Apply mulch 2-4 inches deep. Use 2 inches for fine mulch (shredded) and 3-4 inches for coarser mulch (wood chips). Keep mulch 3-6 inches away from plant stems and tree trunks.",
        },
        {
          q: "Is bulk mulch cheaper than bags?",
          a: "Yes, significantly. Bulk mulch costs $25-45 per cubic yard delivered. Bagged mulch at $4-6 per 2-cubic-foot bag works out to $54-81 per cubic yard. Bulk saves 30-50% on large projects.",
        },
        {
          q: "How many bags of mulch in a cubic yard?",
          a: "One cubic yard equals 27 cubic feet. That's 13.5 bags of 2-cubic-foot mulch, or 9 bags of 3-cubic-foot mulch.",
        },
        {
          q: "How often should I replace mulch?",
          a: "Organic mulch breaks down over time. Refresh annually by adding 1-2 inches on top. Completely replace every 2-3 years. Rubber or stone mulch lasts much longer.",
        },
      ]}
    >
      <div className="space-y-6">
        <SelectInput
          label="Unit"
          value={unit}
          onChange={setUnit}
          options={[
            { value: "ft", label: "Imperial (ft / in)" },
            { value: "m", label: "Metric (m / cm)" },
          ]}
        />

        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Bed Dimensions</h3>
          <div className="grid grid-cols-3 gap-4">
            <NumberInput label="Length" value={length} onChange={setLength} unit={dimUnit} />
            <NumberInput label="Width" value={width} onChange={setWidth} unit={dimUnit} />
            <NumberInput label="Depth" value={depth} onChange={setDepth} unit={depthUnit} />
          </div>
        </div>

        <hr className="border-gray-200" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ResultCard label="Volume" value={cuYards.toFixed(2)} unit="cu yd" highlight />
          <ResultCard label="2 cu ft Bags" value={bags2cuft} unit="bags" />
          <ResultCard label="Bulk Cost" value={`$${Math.round(costBulk)}`} unit="estimate" />
          <ResultCard label="Bag Cost" value={`$${Math.round(costBags)}`} unit="estimate" />
        </div>
      </div>
    </CalculatorShell>
  );
}
