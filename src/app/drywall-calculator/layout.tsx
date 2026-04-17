import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drywall Calculator — How Many Sheets Do I Need?",
  description: "Free drywall calculator. Estimate sheets, screws, joint compound, and tape needed for walls and ceilings.",
  keywords: ["drywall calculator", "how many sheets of drywall", "drywall estimator", "sheetrock calculator", "drywall mud calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
