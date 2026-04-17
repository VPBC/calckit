"use client";

import { useState } from "react";
import CalculatorShell, {
  NumberInput,
  SelectInput,
  ResultCard,
} from "@/components/CalculatorShell";

export default function GravelCalculator() {
  const [unit, setUnit] = useState("ft");
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(10);
  const [depth, setDepth] = useState(3);
  const [material, setMaterial] = useState("gravel");

  const dimUnit = unit === "ft" ? "ft" : "m";
  const depthUnit = unit === "ft" ? "in" : "cm";

  // Density in tons per cubic yard
  const densities: Record<string, number> = {
    gravel: 1.4,
    crushed_stone: 1.4,
    sand: 1.35,
    topsoil: 1.1,
    decomposed_granite: 1.5,
    river_rock: 1.3,
    pea_gravel: 1.35,
  };

  const depthFt = unit === "ft" ? depth / 12 : depth / 100;
  const volCuFt = unit === "ft" ? length * width * depthFt : length * width * depthFt * 35.3147;
  const cuYards = volCuFt / 27;
  const cuMeters = cuYards * 0.7646;
  const tons = cuYards * (densities[material] || 1.4);
  const cuYardsWithWaste = cuYards * 1.1;
  const tonsWithWaste = tons * 1.1;

  return (
    <CalculatorShell
      title="Gravel Calculator — How Much Gravel Do I Need?"
      description="Calculate the tons and cubic yards of gravel, crushed stone, sand, or topsoil for driveways, patios, paths, and landscaping projects."
      currentPath="/gravel-calculator"
      faqItems={[
        {
          q: "How deep should gravel be for a driveway?",
          a: "A standard gravel driveway needs 4-6 inches of depth for proper drainage and stability. For a walkway, 2-3 inches is sufficient. Heavy traffic areas may need up to 8 inches.",
        },
        {
          q: "How many tons of gravel in a cubic yard?",
          a: "Gravel weighs approximately 1.4 tons (2,800 lbs) per cubic yard. Crushed stone is similar, while sand is slightly lighter at 1.35 tons per cubic yard.",
        },
        {
          q: "How much gravel for a 10x20 driveway?",
          a: "A 10ft × 20ft driveway at 4 inches deep needs approximately 2.5 cubic yards or 3.5 tons of gravel. Add 10% for waste and settling.",
        },
        {
          q: "Should I order gravel by ton or cubic yard?",
          a: "Most suppliers sell by the ton. Cubic yards are easier to calculate but weight varies by material. Our calculator provides both measurements.",
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
            label="Material"
            value={material}
            onChange={setMaterial}
            options={[
              { value: "gravel", label: "Gravel" },
              { value: "crushed_stone", label: "Crushed Stone" },
              { value: "sand", label: "Sand" },
              { value: "topsoil", label: "Topsoil" },
              { value: "decomposed_granite", label: "Decomposed Granite" },
              { value: "river_rock", label: "River Rock" },
              { value: "pea_gravel", label: "Pea Gravel" },
            ]}
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Area Dimensions</h3>
          <div className="grid grid-cols-3 gap-4">
            <NumberInput label="Length" value={length} onChange={setLength} unit={dimUnit} />
            <NumberInput label="Width" value={width} onChange={setWidth} unit={dimUnit} />
            <NumberInput label="Depth" value={depth} onChange={setDepth} unit={depthUnit} />
          </div>
        </div>

        <hr className="border-gray-200" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ResultCard label="Volume" value={cuYards.toFixed(2)} unit="cu yd" />
          <ResultCard label="Volume" value={cuMeters.toFixed(2)} unit="cu m" />
          <ResultCard label="Weight" value={tonsWithWaste.toFixed(2)} unit="tons" highlight />
          <ResultCard label="+10% Waste" value={cuYardsWithWaste.toFixed(2)} unit="cu yd" />
        </div>
      </div>
    </CalculatorShell>
  );
}
