import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-inter"
});
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { GameRoomProvider } from "@/contexts/game-room-context";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { QueryProvider } from '@/providers/QueryProvider';

export const metadata: Metadata = {
  title: "FlashQi - Learn Chinese with Flashcards",
  description: "Practice Chinese with spaced repetition flashcards, pronunciation, and writing",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen antialiased ${inter.variable} font-sans`}>
        <QueryProvider>
        <ThemeProvider>
          <AuthProvider>
            <GameRoomProvider>
              {children}
            </GameRoomProvider>
          </AuthProvider>
        </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
