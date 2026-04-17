"use client";

import { useState } from "react";
import CalculatorShell, {
  NumberInput,
  SelectInput,
  ResultCard,
} from "@/components/CalculatorShell";

export default function PaintCalculator() {
  const [unit, setUnit] = useState("ft");
  const [roomLength, setRoomLength] = useState(14);
  const [roomWidth, setRoomWidth] = useState(12);
  const [wallHeight, setWallHeight] = useState(unit === "ft" ? 8 : 2.5);
  const [doors, setDoors] = useState(1);
  const [windows, setWindows] = useState(2);
  const [coats, setCoats] = useState(2);

  const dimUnit = unit === "ft" ? "ft" : "m";

  const doorArea = unit === "ft" ? 21 : 1.95; // sq ft or sq m per door
  const windowArea = unit === "ft" ? 12 : 1.1; // sq ft or sq m per window

  const perimeter = 2 * (roomLength + roomWidth);
  const grossWallArea = perimeter * wallHeight;
  const deductions = doors * doorArea + windows * windowArea;
  const netArea = Math.max(grossWallArea - deductions, 0);
  const totalArea = netArea * coats;

  // Coverage: 1 gallon = 350 sq ft, 1 liter = 10 sq m
  const gallons = unit === "ft" ? totalArea / 350 : (totalArea * 10.7639) / 350;
  const liters = unit === "m" ? totalArea / 10 : totalArea / 37.16;

  return (
    <CalculatorShell
      title="Paint Calculator — How Much Paint Do I Need?"
      description="Calculate how many gallons or liters of paint you need for walls, accounting for doors, windows, and multiple coats."
      currentPath="/paint-calculator"
      faqItems={[
        {
          q: "How much area does a gallon of paint cover?",
          a: "One gallon of paint covers approximately 350-400 square feet (33-37 square meters) on smooth surfaces. Textured or porous surfaces may require more paint.",
        },
        {
          q: "How many coats of paint do I need?",
          a: "Most paint jobs require 2 coats. If you're covering a dark color with a lighter one, you may need a primer coat plus 2 finish coats. Fresh drywall typically needs a primer plus 2 coats.",
        },
        {
          q: "Should I buy extra paint?",
          a: "Always buy 10-15% more than calculated. You'll need extra for touch-ups, cutting in around trim, and paint left in rollers and trays. Keep leftover paint for future touch-ups.",
        },
        {
          q: "How do I calculate paint for a ceiling?",
          a: "For ceiling paint, simply use the room length × room width as the area. Ceilings typically need the same coverage per square foot as walls.",
        },
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <SelectInput
            label="Unit"
            value={unit}
            onChange={(v) => {
              setUnit(v);
              setWallHeight(v === "ft" ? 8 : 2.5);
            }}
            options={[
              { value: "ft", label: "Imperial (ft)" },
              { value: "m", label: "Metric (m)" },
            ]}
          />
          <NumberInput label="Number of Coats" value={coats} onChange={setCoats} min={1} step={1} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Room Dimensions</h3>
          <div className="grid grid-cols-3 gap-4">
            <NumberInput label="Room Length" value={roomLength} onChange={setRoomLength} unit={dimUnit} />
            <NumberInput label="Room Width" value={roomWidth} onChange={setRoomWidth} unit={dimUnit} />
            <NumberInput label="Wall Height" value={wallHeight} onChange={setWallHeight} unit={dimUnit} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Deductions</h3>
          <div className="grid grid-cols-2 gap-4">
            <NumberInput label="Doors" value={doors} onChange={setDoors} step={1} min={0} />
            <NumberInput label="Windows" value={windows} onChange={setWindows} step={1} min={0} />
          </div>
        </div>

        <hr className="border-gray-200" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ResultCard label="Wall Area" value={netArea.toFixed(0)} unit={unit === "ft" ? "sq ft" : "sq m"} />
          <ResultCard label="Total (with coats)" value={totalArea.toFixed(0)} unit={unit === "ft" ? "sq ft" : "sq m"} />
          <ResultCard label="Paint Needed" value={Math.ceil(gallons * 10) / 10} unit="gallons" highlight />
          <ResultCard label="Paint Needed" value={Math.ceil(liters * 10) / 10} unit="liters" />
        </div>
      </div>
    </CalculatorShell>
  );
}
