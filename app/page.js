import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/hero";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-20">
        <div className="section-shell">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {statsData.map((stat, index) => (
              <div key={index} className="fin-card border-none shadow-sm rounded-xl p-8 text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="mb-2 text-4xl font-extrabold text-foreground font-heading">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="section-shell">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="section-kicker text-primary font-semibold tracking-wider uppercase mb-3">Features</div>
            <h2 className="text-3xl font-extrabold text-foreground md:text-5xl font-heading tracking-tight">
            Everything you need to manage your finances
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature, index) => (
              <Card className="fin-card border-none group p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10" key={index}>
                <CardContent className="space-y-5 p-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground font-heading tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground font-medium">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="section-shell">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="section-kicker text-primary font-semibold tracking-wider uppercase mb-3">Workflow</div>
            <h2 className="text-3xl font-extrabold text-foreground md:text-5xl font-heading tracking-tight">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {howItWorksData.map((step, index) => (
              <div key={index} className="fin-card border-none rounded-xl p-8 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-indigo-600 text-white shadow-xl shadow-primary/20 transform transition-transform duration-500 group-hover:scale-110">
                    {step.icon}
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-foreground font-heading tracking-tight">
                    {step.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground font-medium">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-muted/30">
        <div className="section-shell">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="section-kicker text-primary font-semibold tracking-wider uppercase mb-3">Stories</div>
            <h2 className="text-3xl font-extrabold text-foreground md:text-5xl font-heading tracking-tight">
            What Our Users Say
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonialsData.map((testimonial, index) => (
              <Card key={index} className="fin-card border-none p-8 hover:-translate-y-1 transition-transform duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="font-bold text-foreground font-heading tracking-tight">
                        {testimonial.name}
                      </div>
                      <div className="text-sm font-medium text-primary">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="leading-relaxed text-muted-foreground font-medium italic">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="container mx-auto rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-800 px-6 py-20 text-center shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="mb-6 text-3xl font-extrabold text-white md:text-5xl font-heading tracking-tight">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 font-medium leading-relaxed">
              Join thousands of users who are already managing their finances
              smarter with Welth
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="h-14 px-10 text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white text-slate-900 hover:bg-slate-50"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
