"use client";

import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard, Globe } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useCurrency, currencies } from "./currency-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { currency, changeCurrency } = useCurrency();

  return (
    <header className="fixed top-0 w-full z-50 border-b border-border/60 bg-background/80 shadow-sm backdrop-blur-xl">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="Welth Logo"
            width={200}
            height={60}
            className="h-11 w-auto object-contain"
          />
        </Link>

        {/* Navigation Links - Different for signed in/out users */}
        <div className="hidden md:flex items-center space-x-8">
          <SignedOut>
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Testimonials
            </a>
          </SignedOut>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-1.5 px-2">
                <Globe size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium">{currency.code}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {currencies.map((c) => (
                <DropdownMenuItem
                  key={c.code}
                  onClick={() => changeCurrency(c.code)}
                  className={`flex items-center justify-between cursor-pointer ${currency.code === c.code ? "bg-muted" : ""}`}
                >
                  <span>{c.label}</span>
                  <span className="font-semibold">{c.symbol}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <SignedIn>
            <Link href="/dashboard">
              <Button variant="outline" className="bg-background/50">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
            <a href="/transaction/create">
              <Button className="flex items-center gap-2 shadow-sm">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </a>
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-primary/10",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
