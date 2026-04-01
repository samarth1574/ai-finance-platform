import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { CommandPalette } from "@/components/command-palette";
import { CurrencyProvider } from "@/components/currency-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  title: "Welth",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
        </head>
        <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
          <CurrencyProvider>
            <Header />
            <CommandPalette />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            <footer className="border-t border-white/70 bg-slate-950 py-10 text-slate-300">
              <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 text-center text-sm sm:flex-row sm:text-left">
                <p className="font-semibold text-white">Welth</p>
                <p>Built by Samarth for smarter personal finance.</p>
              </div>
            </footer>
          </CurrencyProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
