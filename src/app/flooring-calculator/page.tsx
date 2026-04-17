"use client";

import { useState } from "react";
import CalculatorShell, {
  NumberInput,
  SelectInput,
  ResultCard,
} from "@/components/CalculatorShell";

export default function FlooringCalculator() {
  const [unit, setUnit] = useState("ft");
  const [roomLength, setRoomLength] = useState(14);
  const [roomWidth, setRoomWidth] = useState(12);
  const [waste, setWaste] = useState(10);
  const [flooringType, setFlooringType] = useState("hardwood");

  const dimUnit = unit === "ft" ? "ft" : "m";

  const areaSqFt = unit === "ft" ? roomLength * roomWidth : roomLength * roomWidth * 10.7639;
  const areaSqM = unit === "m" ? roomLength * roomWidth : roomLength * roomWidth / 10.7639;
  const areaWithWaste = areaSqFt * (1 + waste / 100);

  const pricePerSqFt: Record<string, [number, number]> = {
    hardwood: [6, 12],
    laminate: [2, 5],
    vinyl: [2, 7],
    engineered: [4, 10],
    bamboo: [3, 8],
  };

  const [priceLow, priceHigh] = pricePerSqFt[flooringType] || [0, 0];
  const costLow = Math.round(areaWithWaste * priceLow);
  const costHigh = Math.round(areaWithWaste * priceHigh);

  // Standard box covers ~20 sq ft for most flooring
  const boxes = Math.ceil(areaWithWaste / 20);

  return (
    <CalculatorShell
      title="Flooring Calculator — How Much Flooring Do I Need?"
      description="Calculate the square footage of flooring needed for hardwood, laminate, vinyl, or engineered wood, including waste allowance and cost estimate."
      currentPath="/flooring-calculator"
      faqItems={[
        {
          q: "How much waste should I add for flooring?",
          a: "Add 10% waste for standard rectangular rooms. For rooms with many angles, alcoves, or if using a diagonal or herringbone pattern, add 15-20%.",
        },
        {
          q: "How do I calculate flooring for an L-shaped room?",
          a: "Break the room into two or more rectangles. Calculate each rectangle's area separately and add them together. Apply waste percentage to the total.",
        },
        {
          q: "What is the cheapest type of flooring?",
          a: "Vinyl plank (LVP) and laminate are the most affordable at $2-5/sq ft installed. Hardwood and engineered wood cost $6-12/sq ft. Prices vary by region and quality.",
        },
        {
          q: "How many boxes of flooring do I need?",
          a: "Most flooring boxes cover approximately 20 square feet (about 1.85 sq m). Check the coverage area on the specific product packaging — it varies by plank size.",
        },
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <SelectInput
            label="Unit"
            value={unit}
            onChange={setUnit}
            options={[
              { value: "ft", label: "Imperial (ft)" },
              { value: "m", label: "Metric (m)" },
            ]}
          />
          <SelectInput
            label="Flooring Type"
            value={flooringType}
            onChange={setFlooringType}
            options={[
              { value: "hardwood", label: "Hardwood" },
              { value: "laminate", label: "Laminate" },
              { value: "vinyl", label: "Vinyl / LVP" },
              { value: "engineered", label: "Engineered Wood" },
              { value: "bamboo", label: "Bamboo" },
            ]}
          />
          <NumberInput label="Waste %" value={waste} onChange={setWaste} unit="%" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Room Dimensions</h3>
          <div className="grid grid-cols-2 gap-4">
            <NumberInput label="Room Length" value={roomLength} onChange={setRoomLength} unit={dimUnit} />
            <NumberInput label="Room Width" value={roomWidth} onChange={setRoomWidth} unit={dimUnit} />
          </div>
        </div>

        <hr className="border-gray-200" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ResultCard label="Room Area" value={areaSqFt.toFixed(0)} unit="sq ft" />
          <ResultCard label="With Waste" value={areaWithWaste.toFixed(0)} unit="sq ft" highlight />
          <ResultCard label="Boxes (~20 sq ft)" value={boxes} unit="boxes" />
          <ResultCard label="Est. Cost" value={`$${costLow.toLocaleString()}-$${costHigh.toLocaleString()}`} />
        </div>
      </div>
    </CalculatorShell>
  );
}
