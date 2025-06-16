import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { GameRoomProvider } from "@/contexts/game-room-context";
import { ThemeProvider } from '@/contexts/ThemeContext';

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
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          <AuthProvider>
            <GameRoomProvider>
              {children}
            </GameRoomProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
