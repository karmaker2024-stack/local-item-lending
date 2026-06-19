import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

import cameraHandoff from "@/assets/hero-camera-handoff.jpg";
import snowboardHandoff from "@/assets/hero-snowboard-handoff.jpg";
import bicycleHandoff from "@/assets/hero-bicycle-handoff.jpg";
import powertoolHandoff from "@/assets/hero-powertool-handoff.jpg";
import campingHandoff from "@/assets/hero-camping-handoff.jpg";
import projectorHandoff from "@/assets/hero-projector-handoff.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  { src: cameraHandoff, alt: "Neighbors handing off a camera", label: "Capture the moment, borrowed" },
  { src: snowboardHandoff, alt: "Neighbors passing a snowboard", label: "Adventure gear, shared locally" },
  { src: bicycleHandoff, alt: "A bicycle being handed over", label: "Get rolling, neighbor to neighbor" },
  { src: powertoolHandoff, alt: "Picking up a cordless drill", label: "The right tool, right next door" },
  { src: campingHandoff, alt: "Camping gear exchange", label: "Pack light, borrow local" },
  { src: projectorHandoff, alt: "Picking up a portable projector", label: "Movie night, sorted" },
] as const;

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  const selectSlide = (index: number) => setActive((index + slides.length) % slides.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Neighbors sharing useful gear"
      className="relative isolate overflow-hidden bg-primary text-primary-foreground min-h-[640px] lg:h-[calc(100svh-5rem)] lg:min-h-[640px] lg:max-h-[860px]"
    >
      {/* Full-bleed photo layer */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={index === active ? slide.alt : ""}
            aria-hidden={index !== active}
            fetchPriority={index === 0 ? "high" : "auto"}
            loading={index === 0 ? "eager" : "lazy"}
            width={1920}
            height={1080}
            className={cn(
              "absolute inset-0 size-full object-cover object-center transition-all duration-[1200ms] ease-out",
              index === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
            )}
          />
        ))}
        {/* Readability gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/10 lg:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-primary via-primary/80 to-transparent lg:block" />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-primary/60 via-transparent to-transparent lg:block" />
      </div>

      {/* Text content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-end px-4 pb-24 pt-72 sm:px-6 sm:pb-28 sm:pt-80 lg:items-center lg:px-8 lg:py-20">
        <div className="max-w-2xl lg:w-[55%] lg:max-w-none xl:w-[52%]">
          <p className="mb-5 inline-flex rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] backdrop-blur-sm sm:text-xs">
            {slides[active].label}
          </p>
          <h1 className="max-w-[8.5ch] text-5xl font-extrabold leading-[0.94] tracking-[-0.05em] text-primary-foreground drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)] sm:text-6xl lg:text-7xl xl:text-[5rem]">
            Borrow more.<br /><span className="text-highlight">Buy less.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base font-semibold leading-7 text-primary-foreground/90 sm:text-xl sm:leading-8">
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

      {/* Slide dots */}
      <div className="absolute bottom-5 left-4 right-4 z-20 mx-auto flex max-w-7xl items-center sm:bottom-7 sm:px-2">
        <div className="flex gap-2" role="tablist" aria-label="Choose hero image">
          {slides.map((slide, index) => (
            <Button key={slide.src} type="button" size="icon" variant="ghost" role="tab" aria-selected={index === active} aria-label={`Show slide ${index + 1}`} onClick={() => selectSlide(index)} className="size-11 rounded-full hover:bg-primary-foreground/15">
              <span className={cn("h-1.5 rounded-full transition-all", index === active ? "w-7 bg-highlight" : "w-3 bg-primary-foreground/55")} />
            </Button>
          ))}
        </div>
      </div>

      {/* Prev / Next arrows over the image */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-2 sm:px-4 lg:px-6">
        <div className="pointer-events-auto">
          <Button type="button" size="icon" variant="secondary" className="size-11 rounded-full shadow-lg" aria-label="Previous image" onClick={() => selectSlide(active - 1)}><ArrowLeft /></Button>
        </div>
        <div className="pointer-events-auto">
          <Button type="button" size="icon" variant="secondary" className="size-11 rounded-full shadow-lg" aria-label="Next image" onClick={() => selectSlide(active + 1)}><ArrowRight /></Button>
        </div>
      </div>
    </section>
  );
}
