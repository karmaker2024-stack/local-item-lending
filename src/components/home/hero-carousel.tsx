import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import skiShareImage from "@/assets/hero-ski-share.jpeg";
import sportsShareImage from "@/assets/hero-sports-share.jpeg";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const slides = [
  { src: skiShareImage, alt: "A skier borrowing ski poles from a local community member" },
  { src: sportsShareImage, alt: "A baseball player borrowing a bat from a neighbor" },
];

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;
    const update = () => setCurrent(api.selectedScrollSnap());
    update();
    api.on("select", update);
    return () => { api.off("select", update); };
  }, [api]);

  React.useEffect(() => {
    if (!api || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => api.scrollNext(), 6000);
    return () => window.clearInterval(timer);
  }, [api, paused]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true }}
      aria-label="Community sharing stories"
      className="group overflow-hidden rounded-[2.75rem] bg-muted shadow-marketplace"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <CarouselContent className="ml-0">
        {slides.map((slide, index) => (
          <CarouselItem key={slide.src} className="pl-0">
            <img
              src={slide.src}
              alt={slide.alt}
              width={1600}
              height={900}
              fetchPriority={index === 0 ? "high" : "auto"}
              loading={index === 0 ? "eager" : "lazy"}
              className="aspect-[4/3] w-full object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="absolute inset-x-4 bottom-4 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
        <Button type="button" size="icon" variant="secondary" aria-label="Previous hero image" className="rounded-full bg-card/90 shadow-subtle backdrop-blur" onClick={() => api?.scrollPrev()}><ChevronLeft /></Button>
        <div className="flex min-w-0 justify-center gap-2" aria-label={`Slide ${current + 1} of ${slides.length}`}>
          {slides.map((slide, index) => (
            <Button key={slide.src} type="button" size="icon" variant="ghost" aria-label={`Show slide ${index + 1}`} onClick={() => api?.scrollTo(index)} className="size-8 rounded-full hover:bg-card/80">
              <span className={cn("h-2 rounded-full bg-card/70 transition-all", current === index ? "w-6 bg-highlight" : "w-2")} />
            </Button>
          ))}
        </div>
        <Button type="button" size="icon" variant="secondary" aria-label="Next hero image" className="rounded-full bg-card/90 shadow-subtle backdrop-blur" onClick={() => api?.scrollNext()}><ChevronRight /></Button>
      </div>
    </Carousel>
  );
}