import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sarwzya Karki — Creative Developer",
  description: "The portfolio of Sarwzya Karki: selected work, creative development and digital experiences.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
