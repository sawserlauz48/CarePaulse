import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import {cn} from '@/lib/uitls'
import { ThemeProvider } from "@/components/ui/theme-provider";

const fontStans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
weight:["300","400","500","600","700",],
variable: '--font-sans' });

export const metadata: Metadata = {
  title: "CarePulse",
  description: "A healthcare mangement system",
}; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-dark-300 fonst-snas antialiased', fontStans.variable)}>
        <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        >
        {children}
        </ThemeProvider>
</body>
    </html>
  );
}
