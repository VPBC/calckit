"use client";

import { useState } from "react";
import CalculatorShell, {
  NumberInput,
  SelectInput,
  ResultCard,
} from "@/components/CalculatorShell";

export default function ConcreteCalculator() {
  const [unit, setUnit] = useState("ft");
  const [shape, setShape] = useState("slab");
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(10);
  const [depth, setDepth] = useState(4);
  const [diameter, setDiameter] = useState(12);

  const dimUnit = unit === "ft" ? "ft" : "m";
  const depthUnit = unit === "ft" ? "in" : "cm";

  let volumeCuFt = 0;
  if (shape === "slab" || shape === "footing") {
    const depthFt = unit === "ft" ? depth / 12 : depth / 100;
    const l = unit === "ft" ? length : length;
    const w = unit === "ft" ? width : width;
    volumeCuFt = unit === "ft" ? l * w * depthFt : l * w * depthFt * 35.3147;
  } else if (shape === "column") {
    const depthFt = unit === "ft" ? depth / 12 : depth / 100;
    const r = unit === "ft" ? diameter / 24 : diameter / 200;
    const heightVal = length;
    const vol = Math.PI * r * r * heightVal;
    volumeCuFt = unit === "ft" ? vol : vol * 35.3147;
  }

  const cuYards = volumeCuFt / 27;
  const cuMeters = cuYards * 0.7646;
  const bags60lb = Math.ceil(cuYards * 60);
  const bags80lb = Math.ceil(cuYards * 45);
  const withWaste = cuYards * 1.1;

  return (
    <CalculatorShell
      title="Concrete Calculator — How Much Concrete Do I Need?"
      description="Calculate the volume of concrete needed for slabs, footings, and columns. Get results in cubic yards, cubic meters, and number of bags."
      currentPath="/concrete-calculator"
      faqItems={[
        {
          q: "How do I calculate concrete for a slab?",
          a: "Multiply length × width × depth. Convert depth from inches to feet first (divide by 12). The result is cubic feet — divide by 27 to get cubic yards.",
        },
        {
          q: "How many bags of concrete do I need?",
          a: "One cubic yard requires approximately 45 bags of 80-lb concrete mix, or 60 bags of 60-lb mix. For small projects, bags are practical. For anything over 1 cubic yard, consider ordering ready-mix delivery.",
        },
        {
          q: "How thick should a concrete slab be?",
          a: "Standard residential slabs are 4 inches thick. Garage slabs and driveways should be 5-6 inches. Heavy-load areas may require 6-8 inches with rebar reinforcement.",
        },
        {
          q: "Should I add extra concrete for waste?",
          a: "Yes, always order 10% extra to account for spillage, uneven ground, and form variations. Our calculator includes a 10% waste factor in the results.",
        },
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <SelectInput
            label="Unit"
            value={unit}
            onChange={setUnit}
            options={[
              { value: "ft", label: "Imperial (ft / in)" },
              { value: "m", label: "Metric (m / cm)" },
            ]}
          />
          <SelectInput
            label="Shape"
            value={shape}
            onChange={setShape}
            options={[
              { value: "slab", label: "Slab / Rectangle" },
              { value: "footing", label: "Footing / Wall" },
              { value: "column", label: "Round Column" },
            ]}
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Dimensions</h3>
          <div className="grid grid-cols-3 gap-4">
            {shape === "column" ? (
              <>
                <NumberInput label="Height" value={length} onChange={setLength} unit={dimUnit} />
                <NumberInput label="Diameter" value={diameter} onChange={setDiameter} unit={depthUnit} />
                <NumberInput label="Quantity" value={width} onChange={setWidth} unit="columns" min={1} step={1} />
              </>
            ) : (
              <>
                <NumberInput label="Length" value={length} onChange={setLength} unit={dimUnit} />
                <NumberInput label="Width" value={width} onChange={setWidth} unit={dimUnit} />
                <NumberInput label="Depth" value={depth} onChange={setDepth} unit={depthUnit} />
              </>
            )}
          </div>
        </div>

        <hr className="border-gray-200" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ResultCard label="Volume" value={cuYards.toFixed(2)} unit="cu yd" />
          <ResultCard label="Volume" value={cuMeters.toFixed(2)} unit="cu m" />
          <ResultCard label="With 10% Waste" value={withWaste.toFixed(2)} unit="cu yd" highlight />
          <ResultCard label="80-lb Bags" value={bags80lb} unit="bags" />
        </div>
      </div>
    </CalculatorShell>
  );
}
