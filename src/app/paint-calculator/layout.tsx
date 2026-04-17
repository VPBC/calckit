import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paint Calculator — How Much Paint Do I Need?",
  description: "Free paint calculator. Calculate gallons or liters of paint needed for walls, accounting for doors, windows, and multiple coats.",
  keywords: ["paint calculator", "how much paint do I need", "wall paint calculator", "paint estimator", "room paint calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
