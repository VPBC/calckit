import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flooring Calculator — How Much Flooring Do I Need?",
  description: "Free flooring calculator for hardwood, laminate, vinyl, and engineered wood. Get square footage, box count, and cost estimates.",
  keywords: ["flooring calculator", "how much flooring do I need", "hardwood calculator", "laminate calculator", "vinyl plank calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
