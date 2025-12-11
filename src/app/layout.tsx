import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeShare - Share Code Snippets & Documentation",
  description: "A modern platform for sharing code snippets and markdown documentation with the community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

