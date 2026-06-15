import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Afridi Tasks",
  description: "Task management by IB Afridi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "min-h-screen bg-background antialiased flex flex-col")}>
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="py-6 text-center text-sm text-muted-foreground border-t">
          <p>Created by IB Afridi | © 2026 IB Afridi. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
