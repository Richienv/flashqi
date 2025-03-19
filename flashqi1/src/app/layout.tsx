import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: " - Chinese Flashcard App",
  description: "Learn Chinese with spaced repetition flashcards",
  keywords: ["Chinese", "Mandarin", "flashcards", "language learning", "spaced repetition"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 min-h-full`}
      >
        <div className="flex min-h-full flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
