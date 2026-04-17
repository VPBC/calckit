import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wallpaper Calculator — How Many Rolls Do I Need?",
  description: "Free wallpaper calculator. Calculate rolls of wallpaper needed including pattern repeat waste, for both US and European roll sizes.",
  keywords: ["wallpaper calculator", "how many rolls of wallpaper", "wallpaper estimator", "wallpaper roll calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
