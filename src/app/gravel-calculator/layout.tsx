import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gravel Calculator — How Much Gravel Do I Need?",
  description: "Free gravel calculator. Calculate tons and cubic yards of gravel, crushed stone, sand, or topsoil for driveways, patios, and landscaping.",
  keywords: ["gravel calculator", "how much gravel do I need", "crushed stone calculator", "sand calculator", "driveway gravel calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
