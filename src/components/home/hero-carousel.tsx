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
    position: "object-center",
  },
  {
    src: baseballShare.url,
    alt: "A neighbor lending a baseball bat to a player",
    label: "Game day starts next door",
    position: "object-center",
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
    <section aria-roledescription="carousel" aria-label="Neighbors sharing useful gear" className="relative overflow-hidden bg-primary text-primary-foreground lg:min-h-[calc(100svh-5rem)]">
      <div className="relative aspect-[941/900] w-full bg-primary sm:aspect-[941/820] lg:absolute lg:inset-y-0 lg:right-0 lg:w-[68%] lg:aspect-auto">
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={index === active ? slide.alt : ""}
            aria-hidden={index !== active}
            fetchPriority={index === 0 ? "high" : "auto"}
            className={cn(
              "absolute inset-0 size-full object-contain object-center transition-all duration-1000 ease-out lg:object-contain lg:object-right",
              slide.position,
              index === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary via-primary/45 to-transparent lg:inset-y-0 lg:left-0 lg:right-auto lg:h-auto lg:w-1/2 lg:bg-gradient-to-r lg:from-primary lg:via-primary/75 lg:to-transparent" />
      </div>

      <div className="relative z-10 mx-auto -mt-28 flex w-full max-w-7xl px-4 pb-28 pt-0 sm:-mt-36 sm:px-6 sm:pb-32 lg:mt-0 lg:min-h-[calc(100svh-5rem)] lg:items-center lg:px-8 lg:py-20">
        <div className="max-w-2xl lg:w-[55%] lg:max-w-none xl:w-[52%]">
          <p className="mb-5 inline-flex rounded-full border border-primary-foreground/25 bg-primary-foreground/8 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] sm:text-xs">
            {slides[active].label}
          </p>
          <h1 className="max-w-[8.5ch] text-5xl font-extrabold leading-[0.94] tracking-[-0.05em] text-primary-foreground sm:text-6xl lg:text-7xl xl:text-[5rem]">
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

      <div className="absolute bottom-5 left-4 right-4 z-10 mx-auto flex max-w-7xl items-center justify-between sm:bottom-7 sm:px-2">
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