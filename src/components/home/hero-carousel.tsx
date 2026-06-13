import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

import skiShare from "@/assets/hero-ski-share.png.asset.json";
import baseballShare from "@/assets/hero-baseball-share.png.asset.json";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    src: skiShare.url,
    alt: "A neighbor lending ski poles to a skier",
    label: "Adventure gear, shared locally",
    position: "object-[48%_center]",
  },
  {
    src: baseballShare.url,
    alt: "A neighbor lending a baseball bat to a player",
    label: "Game day starts next door",
    position: "object-[52%_center]",
  },
] as const;

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  const selectSlide = (index: number) => setActive((index + slides.length) % slides.length);

  return (
    <section aria-roledescription="carousel" aria-label="Neighbors sharing useful gear" className="relative min-h-[calc(100svh-4.5rem)] overflow-hidden bg-primary text-primary-foreground lg:min-h-[calc(100svh-5rem)]">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={index === active ? slide.alt : ""}
            aria-hidden={index !== active}
            fetchPriority={index === 0 ? "high" : "auto"}
            className={cn(
              "absolute inset-0 size-full object-cover transition-all duration-1000 ease-out",
              slide.position,
              index === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/25 via-primary/15 to-primary/90 sm:bg-gradient-to-r sm:from-primary/90 sm:via-primary/55 sm:to-primary/10" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-7xl items-end px-4 pb-24 pt-24 sm:items-center sm:px-6 sm:pb-28 lg:min-h-[calc(100svh-5rem)] lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex rounded-full border border-primary-foreground/25 bg-primary/35 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] backdrop-blur-md">
            {slides[active].label}
          </p>
          <h1 className="text-5xl font-extrabold leading-[0.94] tracking-[-0.05em] text-primary-foreground sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
            Borrow more.<br /><span className="text-highlight">Buy less.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base font-semibold leading-7 text-primary-foreground/85 sm:text-xl sm:leading-8">
            Rent quality gear and everyday items from verified neighbors. Make more stories with the things already around you.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="highlight" className="rounded-full px-8"><Link to="/explore">Browse items <ArrowRight /></Link></Button>
            <Button asChild size="lg" variant="secondary" className="rounded-full px-8"><Link to="/add-listing">List your item</Link></Button>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-primary-foreground/90">
            <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-highlight" />Verified neighbors</span>
            <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-highlight" />Secure rentals</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-4 right-4 z-10 mx-auto flex max-w-7xl items-center justify-between sm:bottom-8 sm:px-2">
        <div className="flex gap-2" role="tablist" aria-label="Choose hero image">
          {slides.map((slide, index) => (
            <Button key={slide.src} type="button" size="icon" variant="ghost" role="tab" aria-selected={index === active} aria-label={`Show slide ${index + 1}`} onClick={() => selectSlide(index)} className="size-11 rounded-full hover:bg-primary-foreground/15">
              <span className={cn("h-1.5 rounded-full transition-all", index === active ? "w-7 bg-highlight" : "w-3 bg-primary-foreground/55")} />
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button type="button" size="icon" variant="secondary" className="size-11 rounded-full" aria-label="Previous image" onClick={() => selectSlide(active - 1)}><ArrowLeft /></Button>
          <Button type="button" size="icon" variant="secondary" className="size-11 rounded-full" aria-label="Next image" onClick={() => selectSlide(active + 1)}><ArrowRight /></Button>
        </div>
      </div>
    </section>
  );
}