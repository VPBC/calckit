import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mulch Calculator — How Much Mulch Do I Need?",
  description: "Free mulch calculator. Calculate bags or cubic yards of mulch for garden beds and landscaping. Compare bulk vs. bagged costs.",
  keywords: ["mulch calculator", "how much mulch do I need", "mulch estimator", "garden mulch calculator", "cubic yards mulch"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
