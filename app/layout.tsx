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
import Script from "next/script";

const IBMPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex'
});

export const metadata: Metadata = {
  title: {
    default: "Imaginify - AI-powered image editing",
    template: "%s | Imaginify"
  },
  description: "Imaginify lets you transform your images using AI generative fill, remove backgrounds, change object colors, and remove unwanted objects with Cloudinary AI integration.",
  keywords: [
    "AI image editor",
    "generative fill",
    "remove background",
    "object removal",
    "image color change",
    "Cloudinary AI",
    "image generator",
    "photo editor online",
    "AI photo editing"
  ],
  authors: [{ name: "Anas Ahmed", url: "https://anasahmed-portfolio.vercel.app/" }],
  creator: "Imaginify",
  publisher: "Imaginify",
  applicationName: "Imaginify",
  metadataBase: new URL("https://imagerator-ai.vercel.app/"),
  openGraph: {
    title: "Imaginify - AI-powered image editing",
    description: "Transform your images with AI: generative fill, object removal, background removal, and color changes, powered by Cloudinary AI.",
    url: "https://imagerator-ai.vercel.app/",
    siteName: "Imaginify",
    images: [
      {
        url: "/assets/images/hero.webp",
        width: 1200,
        height: 630,
        alt: "Imaginify - AI-powered image editing"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Imaginify - AI-powered image editing",
    description: "Transform your images with AI generative fill, object removal, and more using Cloudinary AI.",
    images: ["https://imagerator-ai.vercel.app/assets/images/hero.webp"], // replace with actual image
    creator: "@anasahmedd"
  },
  manifest: "/manifest.webmanifest",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false
    }
  }
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
          <Script id="sw-register" strategy="afterInteractive">
            {`
            if ("serviceWorker" in navigator) {
              navigator.serviceWorker
                .register("/sw.js")
                .then(reg => console.log("SW registered:", reg))
                .catch(err => console.error("SW registration failed:", err));
            }
          `}
          </Script>
        </body>
      </html>
    </ClerkProvider>
  );
}