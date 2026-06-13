import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { DateRange } from "react-day-picker";
import {
  BadgeCheck,
  CalendarDays,
  Camera,
  Check,
  ChevronRight,
  Clock3,
  Heart,
  Leaf,
  MapPin,
  MessageCircle,
  PackageCheck,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

import drillMain from "@/assets/listing-drill.jpg";
import drillKit from "@/assets/drill-detail-kit.jpg";
import drillUse from "@/assets/drill-detail-use.jpg";
import drillClose from "@/assets/drill-detail-close.jpg";
import ownerMaya from "@/assets/owner-maya.jpg";
import cleanerImage from "@/assets/listing-cleaner.jpg";
import mixerImage from "@/assets/listing-mixer.jpg";
import campingImage from "@/assets/listing-camping.jpg";
import { Container } from "@/components/layout/container";
import { SiteHeader } from "@/components/navigation/site-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const gallery = [
  { src: drillMain, alt: "Cordless drill kit on a workbench" },
  { src: drillKit, alt: "Drill kit with batteries and drill bits" },
  { src: drillUse, alt: "Cordless drill being used to assemble a shelf" },
  { src: drillClose, alt: "Close-up of the drill and accessories" },
];

const related = [
  { id: "carpet-cleaner", title: "Deep carpet cleaner", image: cleanerImage, price: 20, rating: 4.6, distance: 1.4 },
  { id: "stand-mixer", title: "Professional stand mixer", image: mixerImage, price: 16, rating: 4.9, distance: 2.1 },
  { id: "camping-tent", title: "4-person camping set", image: campingImage, price: 24, rating: 5, distance: 2.5 },
];

const reviews = [
  { initials: "JL", name: "Jordan L.", date: "May 2026", text: "Exactly as described and in excellent condition. Maya gave me a quick walkthrough and pickup was effortless." },
  { initials: "AK", name: "Amira K.", date: "April 2026", text: "The battery lasted through my whole shelving project. Great kit, clear instructions, and a genuinely kind owner." },
  { initials: "TM", name: "Theo M.", date: "March 2026", text: "Everything was clean, charged, and ready to go. This saved me from buying a tool I would only use once." },
];

const blockedDates = [new Date(2026, 5, 16), new Date(2026, 5, 17), new Date(2026, 5, 25), new Date(2026, 5, 26)];
const formatShort = (date?: Date) => date ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date) : "Add date";

export function ItemDetails() {
  const [saved, setSaved] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>({ from: new Date(2026, 5, 20), to: new Date(2026, 5, 22) });
  const days = useMemo(() => {
    if (!range?.from || !range.to) return 1;
    return Math.max(1, Math.round((range.to.getTime() - range.from.getTime()) / 86_400_000) + 1);
  }, [range]);
  const rental = days * 12;
  const fee = Math.max(4, Math.round(rental * 0.12));
  const total = rental + fee;

  const chooseDates = (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-auto w-full justify-start rounded-xl px-4 py-3 text-left">
          <CalendarDays className="size-5 text-primary" />
          <span className="grid flex-1 grid-cols-2 gap-3">
            <span><span className="block text-[.65rem] font-bold uppercase tracking-wider text-muted-foreground">Start</span>{formatShort(range?.from)}</span>
            <span className="border-l border-border pl-3"><span className="block text-[.65rem] font-bold uppercase tracking-wider text-muted-foreground">End</span>{formatShort(range?.to)}</span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-0">
        <Calendar mode="range" selected={range} onSelect={setRange} disabled={[{ before: new Date(2026, 5, 13) }, ...blockedDates]} defaultMonth={new Date(2026, 5, 1)} className="pointer-events-auto p-3" />
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <SiteHeader />
      <Container className="py-5 sm:py-8">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/explore" className="hover:text-foreground">Explore</Link><ChevronRight className="size-4" /><span>Tools</span><ChevronRight className="size-4" /><span className="truncate text-foreground">Cordless drill kit</span>
        </nav>

        <header className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2"><Badge className="border-0 bg-highlight/25 text-highlight-foreground hover:bg-highlight/25">Available now</Badge><span className="text-sm text-muted-foreground">Like new</span></div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Cordless drill kit</h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="flex items-center gap-1 font-bold"><Star className="size-4 fill-highlight text-highlight-foreground" />4.9</span>
              <a href="#reviews" className="underline underline-offset-4">32 reviews</a>
              <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="size-4" />0.8 mi away · Oakwood</span>
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" size="icon" aria-label="Share listing"><Share2 /></Button>
            <Button variant="outline" size="icon" aria-label={saved ? "Remove from saved" : "Save listing"} aria-pressed={saved} onClick={() => setSaved((value) => !value)}><Heart className={saved ? "fill-destructive text-destructive" : ""} /></Button>
          </div>
        </header>

        <Gallery />

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-16">
          <div className="min-w-0">
            <section className="border-b border-border pb-9">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-5">
                <div className="min-w-0"><p className="text-sm font-semibold text-secondary">Owned by Maya</p><h2 className="mt-1 text-2xl font-bold">Ready for your next project</h2></div>
                <Avatar className="size-16 ring-4 ring-highlight/25"><AvatarImage src={ownerMaya} alt="Maya, the owner" /><AvatarFallback>MY</AvatarFallback></Avatar>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Feature icon={PackageCheck} title="Complete kit" text="Drill, 2 batteries & 30 bits" />
                <Feature icon={ShieldCheck} title="Damage protection" text="Included in your booking" />
                <Feature icon={MapPin} title="Easy pickup" text="Exact address after booking" />
              </div>
              <p className="mt-7 leading-7 text-muted-foreground">A powerful, lightweight 20V cordless drill for shelves, furniture assembly, repairs, and everyday DIY. Both batteries are fully charged before pickup, and the hard case keeps the full kit organized.</p>
              <h3 className="mt-7 font-bold">What’s included</h3>
              <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">{["20V cordless drill", "Two rechargeable batteries", "30-piece bit set", "Charger and hard case"].map((item) => <li key={item} className="flex items-center gap-2"><Check className="size-4 text-success" />{item}</li>)}</ul>
            </section>

            <OwnerSection />
            <Availability range={range} setRange={setRange} />
            <Reviews />
            <Impact />
          </div>

          <aside id="reserve" className="sticky top-24 hidden lg:block">
            <ReserveCard range={range} days={days} rental={rental} fee={fee} total={total} chooseDates={chooseDates} reserved={reserved} onReserve={() => setReserved(true)} />
          </aside>
        </div>

        <RelatedListings />
      </Container>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-xl lg:hidden">
        <Container className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-0">
          <p className="min-w-0"><strong className="text-xl">$12</strong><span className="text-sm text-muted-foreground"> / day</span><span className="block truncate text-xs text-muted-foreground">{formatShort(range?.from)} – {formatShort(range?.to)} · ${total} total</span></p>
          <Dialog><DialogTrigger asChild><Button variant="highlight" size="lg">Reserve</Button></DialogTrigger><DialogContent className="max-h-[92dvh] overflow-y-auto rounded-3xl"><DialogTitle className="text-2xl">Reserve this item</DialogTitle><ReserveCard range={range} days={days} rental={rental} fee={fee} total={total} chooseDates={chooseDates} reserved={reserved} onReserve={() => setReserved(true)} mobile /></DialogContent></Dialog>
        </Container>
      </div>
    </div>
  );
}

function Gallery() {
  return <section aria-label="Item photos" className="relative grid gap-2 overflow-hidden rounded-3xl sm:grid-cols-2 sm:grid-rows-2">
    <img src={gallery[0].src} alt={gallery[0].alt} width={1024} height={768} className="aspect-[4/3] size-full object-cover sm:row-span-2" />
    {gallery.slice(1, 3).map((image) => <img key={image.alt} src={image.src} alt={image.alt} width={1024} height={768} loading="lazy" className="hidden size-full object-cover sm:block" />)}
    <Dialog><DialogTrigger asChild><Button variant="secondary" className="absolute bottom-4 right-4"><Camera />Show all photos</Button></DialogTrigger><DialogContent className="max-h-[90dvh] max-w-5xl overflow-y-auto"><DialogTitle>All photos</DialogTitle><div className="grid gap-3 sm:grid-cols-2">{gallery.map((image) => <img key={image.alt} src={image.src} alt={image.alt} width={1024} height={768} loading="lazy" className="w-full rounded-2xl object-cover" />)}</div></DialogContent></Dialog>
  </section>;
}

function Feature({ icon: Icon, title, text }: { icon: typeof PackageCheck; title: string; text: string }) { return <div className="rounded-2xl bg-muted/70 p-4"><Icon className="size-5 text-primary" /><p className="mt-3 font-bold">{title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p></div>; }

function OwnerSection() { return <section className="border-b border-border py-10"><p className="text-xs font-bold uppercase tracking-[.18em] text-secondary">Meet your owner</p><div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start"><Avatar className="size-24"><AvatarImage src={ownerMaya} alt="Maya" /><AvatarFallback>MY</AvatarFallback></Avatar><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="text-2xl font-bold">Maya R.</h2><BadgeCheck className="size-5 text-accent" /></div><p className="mt-1 text-sm text-muted-foreground">Oakwood neighbor · Member since 2023</p><div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm"><span className="flex items-center gap-1.5 font-semibold"><Star className="size-4 fill-highlight text-highlight-foreground" />4.9 owner rating</span><span className="flex items-center gap-1.5"><Clock3 className="size-4 text-muted-foreground" />Responds within 20 min</span></div><div className="mt-4 flex flex-wrap gap-2"><Badge variant="outline"><BadgeCheck className="mr-1 size-3.5" />Identity verified</Badge><Badge variant="outline"><ShieldCheck className="mr-1 size-3.5" />Phone verified</Badge><Badge variant="outline"><Sparkles className="mr-1 size-3.5" />Top lender</Badge></div><Button variant="outline" className="mt-5"><MessageCircle />Message Maya</Button></div></div></section>; }

function Availability({ range, setRange }: { range: DateRange | undefined; setRange: (range: DateRange | undefined) => void }) { return <section className="border-b border-border py-10"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-secondary">Availability</p><h2 className="mt-2 text-2xl font-bold">Choose your dates</h2></div><span className="hidden text-sm text-muted-foreground sm:block">Unavailable dates are faded</span></div><div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card p-2"><Calendar mode="range" selected={range} onSelect={setRange} disabled={[{ before: new Date(2026, 5, 13) }, ...blockedDates]} defaultMonth={new Date(2026, 5, 1)} className="pointer-events-auto mx-auto [--cell-size:2.55rem]" /></div></section>; }

function Reviews() { return <section id="reviews" className="scroll-mt-24 border-b border-border py-10"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-secondary">Community reviews</p><h2 className="mt-2 flex items-center gap-2 text-2xl font-bold"><Star className="size-5 fill-highlight text-highlight-foreground" />4.9 · 32 reviews</h2></div><Button variant="outline">See all reviews</Button></div><div className="mt-7 grid gap-7 sm:grid-cols-2">{reviews.slice(0,2).map((review) => <article key={review.name}><div className="flex items-center gap-3"><Avatar><AvatarFallback className="bg-highlight/30 font-bold">{review.initials}</AvatarFallback></Avatar><div><h3 className="font-bold">{review.name}</h3><p className="text-xs text-muted-foreground">{review.date}</p></div></div><div className="mt-3 flex gap-0.5" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-highlight text-highlight-foreground" />)}</div><p className="mt-3 text-sm leading-6 text-muted-foreground">{review.text}</p></article>)}</div></section>; }

function Impact() { return <section className="py-10"><div className="overflow-hidden rounded-3xl bg-primary p-7 text-primary-foreground sm:p-9"><div className="grid items-center gap-7 sm:grid-cols-[minmax(0,1fr)_auto]"><div><span className="inline-flex size-11 items-center justify-center rounded-2xl bg-highlight text-highlight-foreground"><Leaf /></span><p className="mt-5 text-xs font-bold uppercase tracking-[.18em] text-highlight">Sustainability impact</p><h2 className="mt-2 text-2xl font-bold">One rental. Less waste.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-primary-foreground/75">Borrowing this drill instead of buying new helps keep useful equipment in circulation and reduces demand for resource-heavy manufacturing.</p></div><div className="grid grid-cols-2 gap-3 text-center"><div className="rounded-2xl bg-primary-foreground/10 p-5"><strong className="block text-2xl text-highlight">8.2 kg</strong><span className="text-xs text-primary-foreground/70">CO₂ avoided</span></div><div className="rounded-2xl bg-primary-foreground/10 p-5"><strong className="block text-2xl text-highlight">$76</strong><span className="text-xs text-primary-foreground/70">saved vs. buying</span></div></div></div></div></section>; }

function ReserveCard({ days, rental, fee, total, chooseDates, reserved, onReserve, mobile = false }: { range: DateRange | undefined; days: number; rental: number; fee: number; total: number; chooseDates: React.ReactNode; reserved: boolean; onReserve: () => void; mobile?: boolean }) { return <div className={mobile ? "" : "rounded-3xl border border-border bg-card p-6 shadow-marketplace"}><div className="flex items-end justify-between"><p><strong className="text-2xl">$12</strong><span className="text-sm text-muted-foreground"> / day</span></p><span className="flex items-center gap-1 text-sm font-semibold"><Star className="size-4 fill-highlight text-highlight-foreground" />4.9</span></div><div className="mt-5">{chooseDates}</div><div className="mt-6 space-y-3 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">$12 × {days} days</span><span>${rental}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Community protection fee</span><span>${fee}</span></div><div className="border-t border-border pt-3 font-bold"><div className="flex justify-between"><span>Total</span><span>${total}</span></div></div></div><Button onClick={onReserve} disabled={reserved} variant="highlight" size="lg" className="mt-6 w-full">{reserved ? <><Check />Request sent</> : "Reserve for these dates"}</Button><p className="mt-3 text-center text-xs text-muted-foreground">You won’t be charged until Maya accepts.</p><div className="mt-5 flex items-start gap-3 rounded-xl bg-muted/70 p-3 text-xs text-muted-foreground"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" /><span>Every booking includes community protection and secure payments.</span></div></div>; }

function RelatedListings() { return <section className="border-t border-border py-12"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-secondary">Keep exploring</p><h2 className="mt-2 text-2xl font-bold sm:text-3xl">More useful things nearby</h2></div><Button asChild variant="ghost"><Link to="/explore">View all <ChevronRight /></Link></Button></div><div className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <article key={item.id} className="group"><Link to="/item/$id" params={{ id: item.id }}><img src={item.image} alt={item.title} width={768} height={768} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover transition-transform duration-300 group-hover:scale-[1.01]" /><div className="mt-4 flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="truncate text-lg font-bold group-hover:underline group-hover:decoration-highlight">{item.title}</h3><p className="mt-1 text-sm text-muted-foreground">{item.distance} mi away</p></div><span className="flex shrink-0 items-center gap-1 text-sm"><Star className="size-4 fill-highlight text-highlight-foreground" />{item.rating}</span></div><p className="mt-2"><strong>${item.price}</strong><span className="text-sm text-muted-foreground"> / day</span></p></Link></article>)}</div></section>; }