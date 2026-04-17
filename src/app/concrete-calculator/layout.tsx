import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concrete Calculator — How Much Concrete Do I Need?",
  description: "Free concrete calculator. Calculate cubic yards and bags of concrete for slabs, footings, and columns. Includes waste allowance.",
  keywords: ["concrete calculator", "how much concrete do I need", "cubic yard calculator", "concrete slab calculator", "concrete bags calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
