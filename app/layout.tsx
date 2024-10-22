import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://zapdrive.vercel.app"),
  title: "Zapdrive",
  description:
    "Easily upload, manage, and share files with seamless user experience and robust cloud storage integration.",

  keywords: [
    "ZapDrive",
    "file storage",
    "cloud storage",
    "file sharing",
    "upload files online",
    "secure file storage",
    "file management",
    "file sharing platform",
    "cloud file sharing",
    "online file storage",
    "file storage solution",
    "file upload",
    "file download",
    "cloud file management",
    "secure file sharing",
    "file storage app",
    "Next.js file sharing",
    "Firebase storage",
    "cloud storage platform",
    "fast file sharing",
    "Email file sharing",
  ],
  authors: {
    name: "Deepak Sharma",
  },
  openGraph: {
    title: "ZapDrive - Secure and Fast File Storage & Sharing Platform",
    description:
      "ZapDrive is a secure and user-friendly platform for storing, managing, and sharing files. Enjoy fast uploads, cloud integration, and seamless file sharing with just a few clicks.",
  },
};

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
