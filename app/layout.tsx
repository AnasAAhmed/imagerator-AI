import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import Sidebar from "@/components/shared/Sidebar";
import MobNav from "@/components/shared/MobNav";
import { Toaster } from "@/components/ui/toaster";
import ProgressBar from "@/components/shared/ProgressBar";
import { Suspense } from "react";

const IBMPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex'
});

export const metadata: Metadata = {
  title: "Imaginify",
  description: "AI-powered image generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      variables: { colorPrimary: '#624cf5' }
    }}>
      <html lang="en">
        <body className={cn("font-IBMPlex antialiased", IBMPlex.variable)}>
          <Suspense fallback={''}>
            <ProgressBar />
          </Suspense>
          <main className="root">
            <Sidebar />
            <MobNav />
            <div className="root-container">
              <div className="wrapper">
                {children}
              </div>
            </div>
            <Toaster />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}