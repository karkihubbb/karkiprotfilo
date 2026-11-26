import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sarwzya Karki — Creative Developer",
  description: "The personal portfolio of Sarwzya Karki.",
  metadataBase: new URL("https://karkiprotfilo.vercel.app")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}