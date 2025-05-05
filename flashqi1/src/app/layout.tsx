import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { GameRoomProvider } from "@/contexts/game-room-context";

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
        <AuthProvider>
          <GameRoomProvider>
            {children}
          </GameRoomProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
