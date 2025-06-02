import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HSL TEST",
  description: "Test for HSL test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
