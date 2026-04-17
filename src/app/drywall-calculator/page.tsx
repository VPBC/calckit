"use client";

import { useState } from "react";
import CalculatorShell, {
  NumberInput,
  SelectInput,
  ResultCard,
} from "@/components/CalculatorShell";

export default function DrywallCalculator() {
  const [unit, setUnit] = useState("ft");
  const [roomLength, setRoomLength] = useState(14);
  const [roomWidth, setRoomWidth] = useState(12);
  const [wallHeight, setWallHeight] = useState(8);
  const [includeCeiling, setIncludeCeiling] = useState("no");
  const [doors, setDoors] = useState(1);
  const [windows, setWindows] = useState(2);
  const [sheetSize, setSheetSize] = useState("4x8");

  const dimUnit = unit === "ft" ? "ft" : "m";

  const doorArea = unit === "ft" ? 21 : 1.95;
  const windowArea = unit === "ft" ? 12 : 1.1;

  const perimeter = 2 * (roomLength + roomWidth);
  const wallArea = perimeter * wallHeight;
  const ceilingArea = includeCeiling === "yes" ? roomLength * roomWidth : 0;
  const deductions = doors * doorArea + windows * windowArea;
  const netArea = Math.max(wallArea + ceilingArea - deductions, 0);

  // Sheet sizes in sq ft
  const sheetSizes: Record<string, number> = {
    "4x8": 32,
    "4x10": 40,
    "4x12": 48,
  };
  const sheetArea = sheetSizes[sheetSize] || 32;

  const sheetsNeeded = Math.ceil(netArea / sheetArea);
  const sheetsWithWaste = Math.ceil(sheetsNeeded * 1.1);

  // Accessories per sheet
  const screws = sheetsWithWaste * 32; // ~32 screws per sheet
  const jointTapeFt = sheetsWithWaste * 12; // ~12 ft tape per sheet
  const jointCompoundLbs = sheetsWithWaste * 7; // ~7 lbs per sheet
  const jointCompoundBuckets = Math.ceil(jointCompoundLbs / 62); // 62 lb bucket

  return (
    <CalculatorShell
      title="Drywall Calculator — How Many Sheets Do I Need?"
      description="Calculate drywall sheets, screws, joint compound, and tape needed for walls and ceilings."
      currentPath="/drywall-calculator"
      faqItems={[
        {
          q: "What size drywall sheets should I use?",
          a: "4×8 ft sheets are standard and easiest to handle. Use 4×12 ft sheets for rooms with 9-10 ft ceilings to eliminate a horizontal seam. Longer sheets are heavier and harder to install solo.",
        },
        {
          q: "How many screws per sheet of drywall?",
          a: "Use approximately 32 drywall screws per 4×8 sheet. Screws should be placed every 8 inches along edges and every 12 inches in the field (center area).",
        },
        {
          q: "How much joint compound do I need?",
          a: "Plan for approximately 7 lbs of joint compound per 4×8 sheet. A standard 62-lb bucket covers about 8-9 sheets. For textured finishes, you'll need significantly more.",
        },
        {
          q: "Should I use 1/2 inch or 5/8 inch drywall?",
          a: "Use 1/2 inch for standard walls and ceilings. Use 5/8 inch for fire-rated walls (garages, shared walls), ceilings with 24-inch joist spacing, and areas requiring extra soundproofing.",
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
            label="Sheet Size"
            value={sheetSize}
            onChange={setSheetSize}
            options={[
              { value: "4x8", label: "4 × 8 ft (32 sq ft)" },
              { value: "4x10", label: "4 × 10 ft (40 sq ft)" },
              { value: "4x12", label: "4 × 12 ft (48 sq ft)" },
            ]}
          />
          <SelectInput
            label="Include Ceiling"
            value={includeCeiling}
            onChange={setIncludeCeiling}
            options={[
              { value: "no", label: "Walls Only" },
              { value: "yes", label: "Walls + Ceiling" },
            ]}
          />
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <ResultCard label="Total Area" value={netArea.toFixed(0)} unit="sq ft" />
          <ResultCard label="Sheets (+10%)" value={sheetsWithWaste} unit="sheets" highlight />
          <ResultCard label="Screws" value={screws.toLocaleString()} unit="pcs" />
          <ResultCard label="Joint Tape" value={jointTapeFt} unit="ft" />
          <ResultCard label="Joint Compound" value={jointCompoundBuckets} unit="buckets" />
        </div>
      </div>
    </CalculatorShell>
  );
}
