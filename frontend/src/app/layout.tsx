import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeMentor AI",
  description: "A project made with loves",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
