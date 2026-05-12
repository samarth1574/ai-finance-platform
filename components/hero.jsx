"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, PlayCircle, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-40">
      <div className="pointer-events-none absolute inset-x-0 top-20 mx-auto h-96 max-w-4xl rounded-full bg-primary/20 blur-[100px] -z-10" />
      <div className="container relative mx-auto text-center z-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/50 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur-md transition-colors hover:bg-background/80 cursor-pointer">
          <Sparkles className="h-4 w-4" />
          AI-powered finance clarity
        </div>

        <h1 className="mx-auto max-w-6xl text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-[96px] font-heading">
          Manage money with
          <span className="block bg-gradient-to-r from-primary via-indigo-500 to-primary bg-clip-text text-transparent pb-2 mt-2">real financial intelligence.</span>
        </h1>

        <p className="mx-auto mb-10 mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl font-medium">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/dashboard">
            <Button size="lg" className="h-14 px-8 text-base shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 text-left text-sm font-medium text-foreground sm:mx-auto sm:max-w-3xl sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/50 px-5 py-4 shadow-sm backdrop-blur-md hover:bg-background/80 transition-colors">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            Bank-grade security
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/50 px-5 py-4 shadow-sm backdrop-blur-md hover:bg-background/80 transition-colors">
            <TrendingUp className="h-5 w-5 text-primary" />
            Live spending insights
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/50 px-5 py-4 shadow-sm backdrop-blur-md hover:bg-background/80 transition-colors">
            <Sparkles className="h-5 w-5 text-indigo-500" />
            AI receipt scanning
          </div>
        </div>

        <div className="hero-image-wrapper mt-16 perspective-[2000px]">
          <div ref={imageRef} className="hero-image relative transform-gpu transition-all duration-700 ease-out hover:rotate-x-0 hover:scale-[1.02]">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-b from-primary/30 to-indigo-500/10 blur-2xl -z-10" />
            <div className="rounded-xl ring-1 ring-border/50 bg-background p-2 shadow-2xl overflow-hidden">
              <Image
                src="/banner.jpeg"
                width={1280}
                height={720}
                alt="Dashboard Preview"
                className="relative mx-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
