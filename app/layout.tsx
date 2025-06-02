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
      <body className="bg-white text-black flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full px-4 py-5 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
