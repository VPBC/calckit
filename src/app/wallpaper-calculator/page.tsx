"use client";

import { useState } from "react";
import CalculatorShell, {
  NumberInput,
  SelectInput,
  ResultCard,
} from "@/components/CalculatorShell";

export default function WallpaperCalculator() {
  const [unit, setUnit] = useState("ft");
  const [roomLength, setRoomLength] = useState(14);
  const [roomWidth, setRoomWidth] = useState(12);
  const [wallHeight, setWallHeight] = useState(unit === "ft" ? 8 : 2.5);
  const [doors, setDoors] = useState(1);
  const [windows, setWindows] = useState(2);
  const [rollType, setRollType] = useState("us");
  const [patternRepeat, setPatternRepeat] = useState(0);

  const dimUnit = unit === "ft" ? "ft" : "m";

  const doorArea = unit === "ft" ? 21 : 1.95;
  const windowArea = unit === "ft" ? 12 : 1.1;

  const perimeter = 2 * (roomLength + roomWidth);
  const grossArea = perimeter * wallHeight;
  const netArea = Math.max(grossArea - (doors * doorArea + windows * windowArea), 0);

  // US roll: 27 sq ft usable / Euro roll: 57 sq ft usable
  const rollCoverage = rollType === "us" ? 27 : 57;

  // Pattern repeat waste factor
  const repeatWaste = patternRepeat > 0 ? 1.15 : 1.0;
  const adjustedArea = netArea * repeatWaste;

  const rollsNeeded = Math.ceil(adjustedArea / rollCoverage);

  // Typical pricing
  const costLow = rollsNeeded * (rollType === "us" ? 25 : 40);
  const costHigh = rollsNeeded * (rollType === "us" ? 60 : 100);

  return (
    <CalculatorShell
      title="Wallpaper Calculator — How Many Rolls Do I Need?"
      description="Calculate the number of wallpaper rolls needed for your room, accounting for doors, windows, and pattern repeat waste."
      currentPath="/wallpaper-calculator"
      faqItems={[
        {
          q: "What is a pattern repeat and why does it matter?",
          a: "Pattern repeat is the vertical distance between identical points in the wallpaper design. Larger repeats mean more waste when matching patterns between strips. A 12-inch repeat typically adds 15% waste.",
        },
        {
          q: "What is the difference between US and European rolls?",
          a: "US standard rolls are 27 inches wide × 27 feet long (≈27 sq ft usable). European/metric rolls are 53cm wide × 10m long (≈57 sq ft usable). Always check which type you're buying.",
        },
        {
          q: "Should I buy extra rolls?",
          a: "Always buy 1-2 extra rolls from the same batch/dye lot. This covers mistakes, future repairs, and ensures consistent color. Different batches may have slight color variations.",
        },
        {
          q: "How do I wallpaper around corners?",
          a: "Never wrap wallpaper around a corner in one piece. Cut the strip so it wraps 1/2 inch past the corner, then start the next strip overlapping that 1/2 inch. This prevents bubbling and peeling.",
        },
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
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
          <SelectInput
            label="Roll Type"
            value={rollType}
            onChange={setRollType}
            options={[
              { value: "us", label: "US Standard (27 sq ft)" },
              { value: "euro", label: "European (57 sq ft)" },
            ]}
          />
          <NumberInput label="Pattern Repeat" value={patternRepeat} onChange={setPatternRepeat} unit={unit === "ft" ? "in" : "cm"} />
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
          <ResultCard label="Rolls Needed" value={rollsNeeded} unit="rolls" highlight />
          <ResultCard label="Est. Cost (Low)" value={`$${costLow}`} />
          <ResultCard label="Est. Cost (High)" value={`$${costHigh}`} />
        </div>
      </div>
    </CalculatorShell>
  );
}
