"use client";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import { AuthContextProvider } from "@/context/AuthContext";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "@/components/ui/toaster";

export const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable
        )}
      >
        <AuthContextProvider>
          <CookiesProvider>
            <Navbar />
            {children}
          </CookiesProvider>
        </AuthContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
