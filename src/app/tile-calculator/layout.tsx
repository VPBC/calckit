import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tile Calculator — How Many Tiles Do I Need?",
  description: "Free tile calculator. Enter room size and tile dimensions to calculate exactly how many tiles you need, including waste allowance for cuts and breakage.",
  keywords: ["tile calculator", "how many tiles do I need", "tile estimator", "floor tile calculator", "wall tile calculator", "ceramic tile calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
