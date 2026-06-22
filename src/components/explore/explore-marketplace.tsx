import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { CalendarIcon, Filter, Heart, MapPin, Search, ShieldCheck, SlidersHorizontal, Star, X } from "lucide-react";

import drillImage from "@/assets/listing-drill.jpg";
import campingImage from "@/assets/listing-camping.jpg";
import cameraImage from "@/assets/listing-camera.jpg";
import mixerImage from "@/assets/listing-mixer.jpg";
import projectorImage from "@/assets/listing-projector.jpg";
import paddleboardImage from "@/assets/listing-paddleboard.jpg";
import cleanerImage from "@/assets/listing-cleaner.jpg";
import eventImage from "@/assets/listing-event.jpg";
import { Container } from "@/components/layout/container";
import { SiteHeader } from "@/components/navigation/site-header";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

type Listing = {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number;
  deposit: number;
  city: string;
  distance: number;
  rating: number;
  owner: string;
  condition: string;
  score: number;
  available: boolean;
  nextAvailable: string; // ISO date
};

const listings: Listing[] = [
  { id: "cordless-drill-kit", title: "Cordless drill kit", category: "Tools", image: drillImage, price: 12, deposit: 60, city: "Denver", distance: 0.8, rating: 4.9, owner: "Maya", condition: "Like New", score: 92, available: true, nextAvailable: "2026-06-19" },
  { id: "camping-tent", title: "4-person camping set", category: "Camping", image: campingImage, price: 24, deposit: 120, city: "Boulder", distance: 1.2, rating: 5, owner: "Jon", condition: "Good", score: 88, available: true, nextAvailable: "2026-06-20" },
  { id: "mirrorless-camera", title: "Mirrorless camera kit", category: "Photography", image: cameraImage, price: 38, deposit: 250, city: "Denver", distance: 1.6, rating: 4.8, owner: "Priya", condition: "Like New", score: 84, available: false, nextAvailable: "2026-06-28" },
  { id: "stand-mixer", title: "Professional stand mixer", category: "Events", image: mixerImage, price: 16, deposit: 80, city: "Denver", distance: 2.1, rating: 4.9, owner: "Alex", condition: "Good", score: 90, available: true, nextAvailable: "2026-06-21" },
  { id: "projector", title: "Portable HD projector", category: "Electronics", image: projectorImage, price: 28, deposit: 150, city: "Boulder", distance: 2.4, rating: 4.7, owner: "Luis", condition: "New", score: 79, available: true, nextAvailable: "2026-06-19" },
  { id: "paddleboards", title: "Paddle board pair", category: "Sports", image: paddleboardImage, price: 32, deposit: 200, city: "Golden", distance: 3.2, rating: 4.9, owner: "Nia", condition: "Good", score: 94, available: true, nextAvailable: "2026-06-22" },
  { id: "carpet-cleaner", title: "Deep carpet cleaner", category: "Tools", image: cleanerImage, price: 20, deposit: 100, city: "Denver", distance: 3.8, rating: 4.6, owner: "Sam", condition: "Fair", score: 87, available: true, nextAvailable: "2026-06-19" },
  { id: "garden-party-set", title: "Garden table & chairs", category: "Events", image: eventImage, price: 26, deposit: 130, city: "Golden", distance: 4.5, rating: 4.8, owner: "Grace", condition: "Good", score: 91, available: false, nextAvailable: "2026-07-02" },
];

const categories = ["Tools", "Electronics", "Camping", "Photography", "Sports", "Events"];
const conditions = ["New", "Like New", "Good", "Fair"] as const;
const ratingOptions = [
  { value: 5, label: "5 Stars" },
  { value: 4, label: "4+ Stars" },
  { value: 3, label: "3+ Stars" },
] as const;
const locations = ["All locations", "Denver", "Boulder", "Golden"];

const DEFAULT_PRICE: [number, number] = [0, 50];

export function ExploreMarketplace() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All locations");
  const [availabilityDate, setAvailabilityDate] = useState<Date | undefined>(undefined);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>(DEFAULT_PRICE);
  const [condition, setCondition] = useState<string[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);
  const [sort, setSort] = useState("recommended");
  const [saved, setSaved] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 500);
    return () => window.clearTimeout(timer);
  }, []);

  const minRating = ratings.length ? Math.min(...ratings) : 0;
  const priceTouched = price[0] !== DEFAULT_PRICE[0] || price[1] !== DEFAULT_PRICE[1];

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = listings.filter((item) => {
      if (normalized && !`${item.title} ${item.category}`.toLowerCase().includes(normalized)) return false;
      if (location !== "All locations" && item.city !== location) return false;
      if (selectedCategories.length && !selectedCategories.includes(item.category)) return false;
      if (item.price < price[0] || item.price > price[1]) return false;
      if (condition.length && !condition.includes(item.condition)) return false;
      if (minRating && item.rating < minRating) return false;
      if (availabilityDate) {
        const next = new Date(item.nextAvailable);
        if (next > availabilityDate) return false;
      }
      return true;
    });
    return [...filtered].sort((a, b) =>
      sort === "price-low" ? a.price - b.price :
      sort === "distance" ? a.distance - b.distance :
      sort === "rating" ? b.rating - a.rating :
      b.score - a.score,
    );
  }, [query, location, availabilityDate, selectedCategories, price, condition, minRating, sort]);

  const activeChips: { key: string; label: string; clear: () => void }[] = [];
  if (location !== "All locations") activeChips.push({ key: "location", label: `Location: ${location}`, clear: () => setLocation("All locations") });
  if (availabilityDate) activeChips.push({ key: "date", label: `Available by ${format(availabilityDate, "MMM d")}`, clear: () => setAvailabilityDate(undefined) });
  selectedCategories.forEach((c) => activeChips.push({ key: `cat-${c}`, label: `Category: ${c}`, clear: () => setSelectedCategories((s) => s.filter((v) => v !== c)) }));
  if (priceTouched) activeChips.push({ key: "price", label: `Price: $${price[0]}–$${price[1]}`, clear: () => setPrice(DEFAULT_PRICE) });
  condition.forEach((c) => activeChips.push({ key: `cond-${c}`, label: `Condition: ${c}`, clear: () => setCondition((s) => s.filter((v) => v !== c)) }));
  ratings.forEach((r) => {
    const opt = ratingOptions.find((o) => o.value === r);
    if (opt) activeChips.push({ key: `rating-${r}`, label: `Rating: ${opt.label}`, clear: () => setRatings((s) => s.filter((v) => v !== r)) });
  });

  const clearFilters = () => {
    setSelectedCategories([]);
    setPrice(DEFAULT_PRICE);
    setCondition([]);
    setRatings([]);
    setLocation("All locations");
    setAvailabilityDate(undefined);
  };

  const filterProps: FilterProps = {
    location, setLocation,
    availabilityDate, setAvailabilityDate,
    selectedCategories, setSelectedCategories,
    price, setPrice,
    condition, setCondition,
    ratings, setRatings,
    sort, setSort,
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="sticky top-18 z-40 border-b border-border/70 bg-background/95 py-3 backdrop-blur-xl">
        <Container>
          <div className="grid gap-2 rounded-3xl border border-border bg-card p-2 shadow-marketplace md:grid-cols-[minmax(0,1.4fr)_minmax(0,.9fr)_minmax(0,.9fr)_auto] md:rounded-full">
            <label className="relative min-w-0">
              <span className="sr-only">Search Flexes</span>
              <Search className="absolute left-4 top-1/2 z-10 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="border-0 bg-transparent pl-12 shadow-none focus-visible:ring-0"
                placeholder="Search Flexes by item name or keyword"
              />
              {query && (
                <Button aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-1 top-1/2 -translate-y-1/2" size="icon" variant="ghost">
                  <X />
                </Button>
              )}
            </label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger aria-label="Location" className="min-h-12 border-0 bg-muted/60 px-4 shadow-none md:rounded-full">
                <MapPin className="mr-2 size-4 text-accent" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("min-h-12 justify-start border-0 bg-muted/60 px-4 font-normal md:rounded-full", !availabilityDate && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 size-4 text-accent" />
                  {availabilityDate ? format(availabilityDate, "PPP") : "Availability date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={availabilityDate} onSelect={setAvailabilityDate} initialFocus className={cn("p-3 pointer-events-auto")} />
              </PopoverContent>
            </Popover>
            <Button size="lg" variant="highlight">Find a Flex</Button>
          </div>
        </Container>
      </div>

      <Container className="py-7">
        <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-secondary">Find a Flex</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Available Flexes near you.</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {loading ? "Finding the best local Flexes…" : `${results.length} ${results.length === 1 ? "Flex" : "Flexes"} match your search`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <MobileFilters activeFilters={activeChips.length} clearFilters={clearFilters}>
              <Filters {...filterProps} />
            </MobileFilters>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger aria-label="Sort Flexes" className="hidden min-h-11 w-44 bg-card sm:flex"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="distance">Nearest first</SelectItem>
                <SelectItem value="price-low">Price: low to high</SelectItem>
                <SelectItem value="rating">Highest rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {activeChips.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {activeChips.map((chip) => (
              <button
                key={chip.key}
                onClick={chip.clear}
                className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold transition-colors hover:border-highlight hover:bg-highlight/15"
              >
                {chip.label}
                <X className="size-3.5 text-muted-foreground group-hover:text-foreground" />
              </button>
            ))}
            <Button onClick={clearFilters} size="sm" variant="ghost" className="text-xs">Clear all filters</Button>
          </div>
        )}

        <div className="grid items-start gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="sticky top-44 hidden max-h-[calc(100dvh-12rem)] overflow-y-auto border-r border-border pr-7 lg:block">
            <div className="mb-5 flex items-center justify-between">
              <span className="flex items-center gap-2 font-display text-lg font-bold">
                <SlidersHorizontal className="size-5" />Filters
              </span>
              {activeChips.length > 0 && (
                <Button onClick={clearFilters} size="sm" variant="link" className="px-1 text-xs">Clear all</Button>
              )}
            </div>
            <Filters {...filterProps} />
          </aside>

          <div className="min-w-0" aria-busy={loading} aria-live="polite">
            {loading ? (
              <ListingSkeleton />
            ) : results.length ? (
              <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((item) => (
                  <FlexCard
                    key={item.id}
                    item={item}
                    saved={saved.includes(item.id)}
                    onSave={() => setSaved((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id])}
                  />
                ))}
              </div>
            ) : (
              <EmptyState clearFilters={clearFilters} />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

type FilterProps = {
  location: string;
  setLocation: (value: string) => void;
  availabilityDate: Date | undefined;
  setAvailabilityDate: (value: Date | undefined) => void;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  price: [number, number];
  setPrice: (value: [number, number]) => void;
  condition: string[];
  setCondition: React.Dispatch<React.SetStateAction<string[]>>;
  ratings: number[];
  setRatings: React.Dispatch<React.SetStateAction<number[]>>;
};

function Filters(props: FilterProps) {
  return (
    <div className="space-y-7">
      <FilterGroup title="Location">
        <Select value={props.location} onValueChange={props.setLocation}>
          <SelectTrigger className="min-h-11 bg-card"><SelectValue /></SelectTrigger>
          <SelectContent>
            {locations.map((loc) => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
          </SelectContent>
        </Select>
      </FilterGroup>

      <FilterGroup title="Availability date">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("min-h-11 w-full justify-start bg-card font-normal", !props.availabilityDate && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 size-4" />
              {props.availabilityDate ? format(props.availabilityDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={props.availabilityDate} onSelect={props.setAvailabilityDate} initialFocus className={cn("p-3 pointer-events-auto")} />
          </PopoverContent>
        </Popover>
        {props.availabilityDate && (
          <Button variant="link" size="sm" className="mt-2 h-auto px-0 text-xs" onClick={() => props.setAvailabilityDate(undefined)}>Clear date</Button>
        )}
      </FilterGroup>

      <FilterGroup title="Category">
        {categories.map((item) => (
          <CheckRow
            key={item}
            label={item}
            checked={props.selectedCategories.includes(item)}
            onChange={(checked) => props.setSelectedCategories((prev) => checked ? [...prev, item] : prev.filter((value) => value !== item))}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price per day">
        <div className="mb-4 flex items-center justify-between text-sm font-semibold">
          <span>${props.price[0]}</span>
          <span>${props.price[1]}+</span>
        </div>
        <Slider min={0} max={50} step={2} value={props.price} onValueChange={(v) => props.setPrice([v[0], v[1]] as [number, number])} aria-label="Price range" />
      </FilterGroup>

      <FilterGroup title="Condition">
        {conditions.map((item) => (
          <CheckRow
            key={item}
            label={item}
            checked={props.condition.includes(item)}
            onChange={(checked) => props.setCondition((prev) => checked ? [...prev, item] : prev.filter((value) => value !== item))}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Rating">
        {ratingOptions.map((opt) => (
          <CheckRow
            key={opt.value}
            label={opt.label}
            icon={<Star className="size-4 fill-highlight text-highlight-foreground" />}
            checked={props.ratings.includes(opt.value)}
            onChange={(checked) => props.setRatings((prev) => checked ? [...prev, opt.value] : prev.filter((v) => v !== opt.value))}
          />
        ))}
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-b border-border pb-7 last:border-0">
      <legend className="mb-4 font-display font-bold">{title}</legend>
      <div className="space-y-2">{children}</div>
    </fieldset>
  );
}

function CheckRow({ label, checked, onChange, icon }: { label: string; checked: boolean; onChange: (checked: boolean) => void; icon?: React.ReactNode }) {
  const id = `filter-${label.replaceAll(" ", "-").toLowerCase()}`;
  return (
    <label htmlFor={id} className="flex min-h-10 cursor-pointer items-center gap-3 rounded-lg px-2 text-sm hover:bg-muted">
      <Checkbox id={id} checked={checked} onCheckedChange={(value) => onChange(value === true)} />
      {icon}
      <span>{label}</span>
    </label>
  );
}

function FlexCard({ item, saved, onSave }: { item: Listing; saved: boolean; onSave: () => void }) {
  return (
    <article className="premium-lift group flex min-w-0 flex-col rounded-2xl">
      <div className="relative overflow-hidden rounded-2xl bg-muted">
        <Link to="/item/$id" params={{ id: item.id }}>
          <img src={item.image} alt={item.title} width={768} height={768} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        </Link>
        <Button
          aria-label={saved ? `Remove ${item.title} from saved Flexes` : `Save ${item.title}`}
          aria-pressed={saved}
          onClick={onSave}
          className={`absolute right-3 top-3 bg-card/90 backdrop-blur hover:bg-card ${saved ? "text-destructive" : "text-foreground"}`}
          size="icon"
          variant="ghost"
        >
          <Heart className={saved ? "fill-current" : ""} />
        </Button>
        <span className={`absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold shadow-subtle backdrop-blur ${item.available ? "bg-card/90 text-success" : "bg-card/90 text-muted-foreground"}`}>
          <ShieldCheck className="size-3.5" />
          {item.available ? "Available now" : `Next: ${format(new Date(item.nextAvailable), "MMM d")}`}
        </span>
      </div>

      <Link to="/item/$id" params={{ id: item.id }} className="block pt-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="min-w-0 truncate font-display text-lg font-bold group-hover:underline group-hover:decoration-highlight group-hover:decoration-2 group-hover:underline-offset-4">{item.title}</h2>
          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold">
            <Star className="size-4 fill-highlight text-highlight-foreground" />{item.rating}
          </span>
        </div>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-3.5" />{item.city} · {item.distance} mi
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-muted px-2.5 py-1 font-semibold">{item.condition}</span>
          <span className="rounded-full bg-highlight/20 px-2.5 py-1 font-semibold text-highlight-foreground">Deposit ${item.deposit}</span>
        </div>
        <div className="mt-3">
          <strong className="font-display text-xl">${item.price}</strong>
          <span className="text-sm text-muted-foreground"> / day</span>
        </div>
      </Link>

      <div className="mt-4 flex items-center gap-2">
        <Button asChild variant="highlight" className="flex-1">
          <Link to="/item/$id" params={{ id: item.id }}>View Flex</Link>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link to="/item/$id" params={{ id: item.id }} hash="request">Request Flex</Link>
        </Button>
      </div>
    </article>
  );
}

function MobileFilters({ children, activeFilters, clearFilters }: { children: React.ReactNode; activeFilters: number; clearFilters: () => void }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative lg:hidden" variant="outline">
          <Filter />Filters
          {activeFilters > 0 && (
            <span className="grid size-5 place-items-center rounded-full bg-highlight text-[.65rem] text-highlight-foreground">{activeFilters}</span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-md overflow-y-auto sm:w-[420px]">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Filter Flexes</SheetTitle>
        </SheetHeader>
        <div className="mt-6">{children}</div>
        <SheetFooter className="sticky bottom-0 mt-6 grid grid-cols-2 gap-3 bg-background py-4">
          <Button onClick={clearFilters} variant="outline">Clear all</Button>
          <SheetClose asChild><Button variant="highlight">Show Flexes</Button></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function ListingSkeleton() {
  return (
    <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index}>
          <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
          <Skeleton className="mt-4 h-5 w-3/4" />
          <Skeleton className="mt-2 h-4 w-1/2" />
          <div className="mt-4 flex justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ clearFilters }: { clearFilters: () => void }) {
  return (
    <div className="grid min-h-96 place-items-center rounded-3xl border border-dashed border-border bg-card p-8 text-center">
      <div>
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-highlight/25 text-primary"><Search /></span>
        <h2 className="mt-5 text-2xl font-bold">No Flexes match yet</h2>
        <p className="mx-auto mt-2 max-w-sm text-muted-foreground">Try a different date, widen your location, or clear a few filters.</p>
        <Button onClick={clearFilters} className="mt-6" variant="highlight">Clear all filters</Button>
      </div>
    </div>
  );
}
