"use client";

import { useState } from "react";
import CalculatorShell, {
  NumberInput,
  SelectInput,
  ResultCard,
} from "@/components/CalculatorShell";

export default function TileCalculator() {
  const [unit, setUnit] = useState("ft");
  const [roomLength, setRoomLength] = useState(12);
  const [roomWidth, setRoomWidth] = useState(10);
  const [tileLength, setTileLength] = useState(12);
  const [tileWidth, setTileWidth] = useState(12);
  const [waste, setWaste] = useState(10);
  const [gapSize, setGapSize] = useState(0.125);

  const dimUnit = unit === "ft" ? "ft" : "m";
  const tileUnit = unit === "ft" ? "in" : "cm";

  const roomAreaSqFt =
    unit === "ft"
      ? roomLength * roomWidth
      : roomLength * roomWidth * 10.7639;
  const roomAreaSqM =
    unit === "m"
      ? roomLength * roomWidth
      : roomLength * roomWidth / 10.7639;

  const tileSqInches = tileLength * tileWidth;
  const tileSqFt =
    unit === "ft"
      ? tileSqInches / 144
      : (tileLength * tileWidth) / 10000;
  const effectiveTileSqFt =
    unit === "ft"
      ? ((tileLength + gapSize) * (tileWidth + gapSize)) / 144
      : ((tileLength + gapSize * 2.54) * (tileWidth + gapSize * 2.54)) / 10000;

  const tilesNeeded = Math.ceil(
    (unit === "ft" ? roomAreaSqFt : roomAreaSqM) / (effectiveTileSqFt || 1)
  );
  const tilesWithWaste = Math.ceil(tilesNeeded * (1 + waste / 100));
  const boxesOf10 = Math.ceil(tilesWithWaste / 10);

  return (
    <CalculatorShell
      title="Tile Calculator — How Many Tiles Do I Need?"
      description="Enter your room size and tile dimensions to calculate exactly how many tiles you need, including waste allowance for cuts and breakage."
      currentPath="/tile-calculator"
      faqItems={[
        {
          q: "How much extra tile should I buy for waste?",
          a: "For straight layouts, add 10% waste. For diagonal or herringbone patterns, add 15-20%. Complex rooms with many cuts may need 20% or more.",
        },
        {
          q: "How do I measure a room for tiles?",
          a: "Measure the length and width of the room at the widest points. For L-shaped rooms, divide into rectangles, calculate each separately, and add them together.",
        },
        {
          q: "What grout gap size should I use?",
          a: "Standard grout gaps are 1/8 inch (3mm) for wall tiles and 3/16 inch (5mm) for floor tiles. Larger tiles may use 1/16 inch (1.5mm) gaps for a minimal look.",
        },
        {
          q: "How many tiles come in a box?",
          a: "Most tile boxes contain 10-15 tiles, but this varies by manufacturer and tile size. Check the coverage area (sq ft / sq m) printed on the box.",
        },
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <SelectInput
            label="Measurement Unit"
            value={unit}
            onChange={setUnit}
            options={[
              { value: "ft", label: "Imperial (ft / in)" },
              { value: "m", label: "Metric (m / cm)" },
            ]}
          />
          <NumberInput
            label="Waste Allowance"
            value={waste}
            onChange={setWaste}
            unit="%"
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Room Dimensions</h3>
          <div className="grid grid-cols-2 gap-4">
            <NumberInput label="Room Length" value={roomLength} onChange={setRoomLength} unit={dimUnit} />
            <NumberInput label="Room Width" value={roomWidth} onChange={setRoomWidth} unit={dimUnit} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Tile Dimensions</h3>
          <div className="grid grid-cols-3 gap-4">
            <NumberInput label="Tile Length" value={tileLength} onChange={setTileLength} unit={tileUnit} />
            <NumberInput label="Tile Width" value={tileWidth} onChange={setTileWidth} unit={tileUnit} />
            <NumberInput label="Grout Gap" value={gapSize} onChange={setGapSize} unit={unit === "ft" ? "in" : "cm"} step={0.0625} />
          </div>
        </div>

        <hr className="border-gray-200" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ResultCard label="Room Area" value={unit === "ft" ? roomAreaSqFt.toFixed(1) : roomAreaSqM.toFixed(1)} unit={unit === "ft" ? "sq ft" : "sq m"} />
          <ResultCard label="Tiles Needed" value={tilesNeeded} unit="tiles" />
          <ResultCard label="With Waste" value={tilesWithWaste} unit="tiles" highlight />
          <ResultCard label="Boxes (10/box)" value={boxesOf10} unit="boxes" />
        </div>
      </div>
    </CalculatorShell>
  );
}
