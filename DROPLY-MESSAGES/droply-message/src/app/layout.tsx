"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "../context/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "True Feedback",
//   description: "Real feedback from real people.",
// };

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          {children}
          <Toaster
            position="bottom-right"
           
            toastOptions={{
              classNames: {
                toast: "!bg-black !text-white border border-white/10",
                title: "!text-white font-semibold",
                description: "!text-gray-300",
                actionButton: "bg-white text-black",
                cancelButton: "bg-neutral-800 text-white",
              },
            }}
          />
        </body>
      </AuthProvider>
    </html>
  );
}
