import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  ImagePlus,
  Loader2,
  MapPin,
  Package,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
  UploadCloud,
} from "lucide-react";

import { AccountSidebar, MobileBottomNavigation } from "@/components/navigation/app-navigation";
import { SiteHeader } from "@/components/navigation/site-header";
import { Container } from "@/components/layout/container";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Photo = { id: string; name: string; url: string };
type WizardData = {
  title: string;
  description: string;
  category: string;
  condition: string;
  dailyRate: string;
  weeklyRate: string;
  monthlyRate: string;
  availableDates: Date[];
  address: string;
  locality: string;
};

const initialData: WizardData = { title: "", description: "", category: "", condition: "", dailyRate: "", weeklyRate: "", monthlyRate: "", availableDates: [], address: "", locality: "" };
const steps = [
  { name: "Details", icon: Package },
  { name: "Photos", icon: Camera },
  { name: "Pricing", icon: CircleDollarSign },
  { name: "Availability", icon: CalendarDays },
  { name: "Location", icon: MapPin },
  { name: "Preview", icon: Sparkles },
];
const categories = ["Tools", "Electronics", "Camping", "Photography", "Sports", "Events", "Home & garden", "Other"];
const conditions = [
  { value: "Like new", detail: "Barely used, with no visible wear" },
  { value: "Good", detail: "Light wear, works exactly as expected" },
  { value: "Fair", detail: "Visible wear, fully functional" },
];
const detailsSchema = z.object({
  title: z.string().trim().min(5, "Use at least 5 characters").max(80, "Keep the title under 80 characters"),
  description: z.string().trim().min(30, "Add at least 30 characters so borrowers know what to expect").max(1000, "Keep the description under 1,000 characters"),
  category: z.string().min(1, "Choose a category"),
  condition: z.string().min(1, "Choose the item condition"),
});
const pricingSchema = z.object({
  dailyRate: z.coerce.number().positive("Enter a daily rate").max(10000),
  weeklyRate: z.coerce.number().positive("Enter a weekly rate").max(50000),
  monthlyRate: z.coerce.number().positive("Enter a monthly rate").max(100000),
});
const locationSchema = z.object({ address: z.string().trim().min(5, "Enter a pickup address").max(150), locality: z.string().trim().min(2, "Enter a city or neighborhood").max(80) });

export function ListingWizard() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(initialData);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState(false);
  const [saved, setSaved] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("flex-listing-draft");
    if (!stored) return;
    try {
      const draft = JSON.parse(stored) as { data?: Omit<WizardData, "availableDates"> & { availableDates?: string[] }; step?: number };
      if (draft.data) setData({ ...initialData, ...draft.data, availableDates: (draft.data.availableDates ?? []).map((date) => new Date(date)) });
      if (typeof draft.step === "number") setStep(Math.min(5, Math.max(0, draft.step)));
    } catch { window.localStorage.removeItem("flex-listing-draft"); }
  }, []);

  const update = (field: keyof WizardData, value: string | Date[]) => {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => { const next = { ...current }; delete next[field]; return next; });
    setSaved(false);
  };
  const validate = () => {
    let result: z.SafeParseReturnType<unknown, unknown> | undefined;
    if (step === 0) result = detailsSchema.safeParse(data);
    if (step === 1 && photos.length === 0) { setErrors({ photos: "Add at least one clear photo" }); return false; }
    if (step === 2) result = pricingSchema.safeParse(data);
    if (step === 3 && data.availableDates.length === 0) { setErrors({ availableDates: "Select at least one available date" }); return false; }
    if (step === 4) result = locationSchema.safeParse(data);
    if (result && !result.success) {
      setErrors(Object.fromEntries(result.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return false;
    }
    setErrors({});
    return true;
  };
  const next = () => { if (validate()) { setStep((current) => Math.min(5, current + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); } };
  const back = () => { setErrors({}); setStep((current) => Math.max(0, current - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const saveDraft = () => {
    window.localStorage.setItem("flex-listing-draft", JSON.stringify({ data, step }));
    setSaved(true);
  };
  const addPhotos = (files: FileList | File[]) => {
    const accepted = Array.from(files).filter((file) => file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024).slice(0, 8 - photos.length);
    setPhotos((current) => [...current, ...accepted.map((file) => ({ id: crypto.randomUUID(), name: file.name, url: URL.createObjectURL(file) }))]);
    setErrors((current) => { const next = { ...current }; delete next.photos; return next; });
  };
  const removePhoto = (id: string) => setPhotos((current) => { const target = current.find((photo) => photo.id === id); if (target) URL.revokeObjectURL(target.url); return current.filter((photo) => photo.id !== id); });
  const publish = () => {
    setPublishing(true);
    window.setTimeout(() => { window.localStorage.removeItem("flex-listing-draft"); setPublishing(false); setPublished(true); }, 900);
  };

  return <div className="min-h-screen bg-background pb-20 lg:pb-0">
    <SiteHeader />
    <Container className="flex gap-8 py-7 sm:py-10">
      <AccountSidebar />
      <div className="min-w-0 flex-1">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <div className="min-w-0"><p className="text-xs font-bold uppercase tracking-[.18em] text-secondary">Create a listing</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Share something useful</h1><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">A thoughtful listing helps the right neighbor find your item.</p></div>
          <Button variant="outline" onClick={saveDraft}><Save /> <span className="hidden sm:inline">{saved ? "Draft saved" : "Save draft"}</span></Button>
        </header>

        <div className="mt-8"><div className="mb-3 flex items-center justify-between text-xs font-semibold"><span>Step {step + 1} of {steps.length}</span><span className="text-muted-foreground">{Math.round(((step + 1) / steps.length) * 100)}% complete</span></div><Progress value={((step + 1) / steps.length) * 100} className="h-1.5 [&>div]:bg-highlight" /></div>
        <ol className="mt-5 grid grid-cols-6 gap-1" aria-label="Listing progress">{steps.map(({ name, icon: Icon }, index) => <li key={name}><button type="button" onClick={() => index < step && setStep(index)} disabled={index > step} className={cn("flex w-full flex-col items-center gap-2 rounded-xl px-1 py-2 text-[.65rem] font-semibold transition-colors sm:text-xs", index === step ? "bg-primary text-primary-foreground" : index < step ? "text-primary hover:bg-muted" : "text-muted-foreground/60")}><span className={cn("grid size-7 place-items-center rounded-full", index < step && "bg-highlight text-highlight-foreground")} >{index < step ? <Check className="size-4" /> : <Icon className="size-4" />}</span><span className="hidden sm:block">{name}</span></button></li>)}</ol>

        <section className="mt-7 rounded-3xl border border-border bg-card p-5 shadow-subtle sm:p-8">
          {step === 0 && <DetailsStep data={data} update={update} errors={errors} />}
          {step === 1 && <PhotosStep photos={photos} error={errors.photos} dragging={dragging} setDragging={setDragging} addPhotos={addPhotos} removePhoto={removePhoto} inputRef={inputRef} />}
          {step === 2 && <PricingStep data={data} update={update} errors={errors} />}
          {step === 3 && <AvailabilityStep dates={data.availableDates} update={(dates) => update("availableDates", dates)} error={errors.availableDates} />}
          {step === 4 && <LocationStep data={data} update={update} errors={errors} />}
          {step === 5 && <PreviewStep data={data} photos={photos} published={published} />}
        </section>

        <footer className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 sm:flex sm:justify-between">
          <Button variant="ghost" onClick={back} disabled={step === 0}><ArrowLeft />Back</Button>
          <div className="flex min-w-0 justify-end gap-3"><Button variant="outline" onClick={saveDraft} className="hidden sm:inline-flex"><Save />{saved ? "Saved" : "Save draft"}</Button>{step < 5 ? <Button variant="highlight" onClick={next}>Continue<ArrowRight /></Button> : <Button variant="highlight" onClick={publish} disabled={publishing || published}>{publishing ? <><Loader2 className="animate-spin" />Publishing…</> : published ? <><CheckCircle2 />Published</> : <>Publish listing<Check /></>}</Button>}</div>
        </footer>
        {published && <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-highlight bg-highlight/15 p-5"><div><p className="font-bold">Your listing is live.</p><p className="text-sm text-muted-foreground">Neighbors can now discover and request your item.</p></div><Button onClick={() => navigate({ to: "/my-listings" })}>View my listings</Button></div>}
      </div>
    </Container>
    <MobileBottomNavigation />
  </div>;
}

function StepHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) { return <div className="mb-7"><p className="text-xs font-bold uppercase tracking-[.18em] text-secondary">{eyebrow}</p><h2 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p></div>; }
function FieldError({ message }: { message?: string }) { return message ? <p className="mt-1.5 text-xs font-medium text-destructive">{message}</p> : null; }

function DetailsStep({ data, update, errors }: { data: WizardData; update: (field: keyof WizardData, value: string) => void; errors: Record<string, string> }) { return <><StepHeading eyebrow="Step 1 · Item details" title="Tell neighbors what you’re sharing" description="Use a clear, specific title and include everything a borrower should know." /><div className="space-y-6"><div><Label htmlFor="title">Listing title</Label><Input id="title" value={data.title} onChange={(event) => update("title", event.target.value)} maxLength={80} aria-invalid={Boolean(errors.title)} placeholder="e.g. Cordless drill kit with 2 batteries" className="mt-2" /><div className="flex justify-between"><FieldError message={errors.title} /><span className="ml-auto mt-1.5 text-xs text-muted-foreground">{data.title.length}/80</span></div></div><div><Label htmlFor="description">Description</Label><Textarea id="description" value={data.description} onChange={(event) => update("description", event.target.value)} maxLength={1000} aria-invalid={Boolean(errors.description)} placeholder="Describe what’s included, how it works, and anything borrowers should know…" className="mt-2 min-h-36 resize-y" /><div className="flex justify-between"><FieldError message={errors.description} /><span className="ml-auto mt-1.5 text-xs text-muted-foreground">{data.description.length}/1,000</span></div></div><div className="grid gap-6 sm:grid-cols-2"><div><Label>Category</Label><Select value={data.category} onValueChange={(value) => update("category", value)}><SelectTrigger className="mt-2 w-full" aria-invalid={Boolean(errors.category)}><SelectValue placeholder="Choose a category" /></SelectTrigger><SelectContent>{categories.map((category) => <SelectItem key={category} value={category}>{category}</SelectItem>)}</SelectContent></Select><FieldError message={errors.category} /></div><div><Label>Condition</Label><RadioGroup value={data.condition} onValueChange={(value) => update("condition", value)} className="mt-2 gap-2">{conditions.map((condition) => <label key={condition.value} className={cn("flex cursor-pointer items-center gap-3 rounded-xl border p-3", data.condition === condition.value ? "border-primary bg-muted" : "hover:bg-muted/60")}><RadioGroupItem value={condition.value} /><span><span className="block text-sm font-bold">{condition.value}</span><span className="text-xs text-muted-foreground">{condition.detail}</span></span></label>)}</RadioGroup><FieldError message={errors.condition} /></div></div></div></>; }

function PhotosStep({ photos, error, dragging, setDragging, addPhotos, removePhoto, inputRef }: { photos: Photo[]; error?: string; dragging: boolean; setDragging: (value: boolean) => void; addPhotos: (files: FileList | File[]) => void; removePhoto: (id: string) => void; inputRef: React.RefObject<HTMLInputElement | null> }) { return <><StepHeading eyebrow="Step 2 · Photos" title="Show the item at its best" description="Add up to 8 well-lit photos. Your first image will be the listing cover." /><input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" onChange={(event) => event.target.files && addPhotos(event.target.files)} /><button type="button" onClick={() => inputRef.current?.click()} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); addPhotos(event.dataTransfer.files); }} className={cn("grid w-full place-items-center rounded-2xl border-2 border-dashed px-5 py-12 text-center transition-colors", dragging ? "border-highlight bg-highlight/15" : "border-border bg-muted/35 hover:bg-muted/70")}><span className="grid size-14 place-items-center rounded-2xl bg-highlight/25 text-primary"><UploadCloud /></span><strong className="mt-4">Drop photos here or click to browse</strong><span className="mt-1 text-xs text-muted-foreground">JPG, PNG or WebP · 10 MB maximum each</span></button><FieldError message={error} />{photos.length > 0 && <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{photos.map((photo, index) => <div key={photo.id} className="group relative overflow-hidden rounded-2xl bg-muted"><img src={photo.url} alt={`Listing upload ${index + 1}`} className="aspect-square w-full object-cover" />{index === 0 && <Badge className="absolute left-2 top-2 bg-card text-card-foreground hover:bg-card">Cover</Badge>}<Button type="button" variant="secondary" size="icon" onClick={() => removePhoto(photo.id)} className="absolute bottom-2 right-2" aria-label={`Remove ${photo.name}`}><Trash2 /></Button></div>)}{photos.length < 8 && <button type="button" onClick={() => inputRef.current?.click()} className="grid aspect-square place-items-center rounded-2xl border border-dashed border-border text-sm font-semibold text-muted-foreground hover:bg-muted"><span className="grid justify-items-center gap-2"><ImagePlus /><span>Add more</span></span></button>}</div>}<Alert className="mt-6 bg-muted/40"><ShieldCheck /><AlertDescription>For your safety, avoid including house numbers, documents, or people in listing photos.</AlertDescription></Alert></>; }

function PricingStep({ data, update, errors }: { data: WizardData; update: (field: keyof WizardData, value: string) => void; errors: Record<string, string> }) { return <><StepHeading eyebrow="Step 3 · Pricing" title="Set simple, fair rates" description="Offer longer-term savings to make your listing more attractive. You can change these rates later." /><div className="grid gap-5 sm:grid-cols-3">{[{ field: "dailyRate" as const, label: "Daily rate", suffix: "/ day", hint: "Most common" }, { field: "weeklyRate" as const, label: "Weekly rate", suffix: "/ week", hint: "Suggest 6× daily" }, { field: "monthlyRate" as const, label: "Monthly rate", suffix: "/ month", hint: "Suggest 3× weekly" }].map((rate) => <div key={rate.field}><Label htmlFor={rate.field}>{rate.label}</Label><div className="relative mt-2"><span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold">$</span><Input id={rate.field} type="number" min="1" max="100000" step="1" inputMode="decimal" value={data[rate.field]} onChange={(event) => update(rate.field, event.target.value)} className="pl-8 pr-16" aria-invalid={Boolean(errors[rate.field])} /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{rate.suffix}</span></div><FieldError message={errors[rate.field]} /><p className="mt-1.5 text-xs text-muted-foreground">{rate.hint}</p></div>)}</div><div className="mt-8 rounded-2xl bg-primary p-6 text-primary-foreground"><p className="text-xs font-bold uppercase tracking-wider text-highlight">Your estimated earnings</p><div className="mt-4 grid grid-cols-3 gap-3 text-center"><div><strong className="block text-xl">${Number(data.dailyRate || 0) * 4}</strong><span className="text-xs text-primary-foreground/70">4 days / month</span></div><div className="border-x border-primary-foreground/15"><strong className="block text-xl">${Number(data.dailyRate || 0) * 8}</strong><span className="text-xs text-primary-foreground/70">8 days / month</span></div><div><strong className="block text-xl">${Number(data.dailyRate || 0) * 12}</strong><span className="text-xs text-primary-foreground/70">12 days / month</span></div></div></div></>; }

function AvailabilityStep({ dates, update, error }: { dates: Date[]; update: (dates: Date[]) => void; error?: string }) { return <><StepHeading eyebrow="Step 4 · Availability" title="When can neighbors borrow it?" description="Select every date the item is available. You’ll always approve requests before a rental is confirmed." /><div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_15rem]"><div className="overflow-x-auto rounded-2xl border border-border bg-background p-2"><Calendar mode="multiple" selected={dates} onSelect={(value) => update(value ?? [])} disabled={{ before: new Date(2026, 5, 13) }} defaultMonth={new Date(2026, 5, 1)} className="pointer-events-auto mx-auto [--cell-size:2.65rem]" /></div><aside className="rounded-2xl bg-muted/60 p-5"><p className="font-bold">{dates.length} dates selected</p><p className="mt-2 text-xs leading-5 text-muted-foreground">Selected dates appear highlighted. You can block or add dates anytime from My listings.</p><Button type="button" variant="outline" className="mt-5 w-full" onClick={() => update([])}>Clear dates</Button></aside></div><FieldError message={error} /></>; }

function LocationStep({ data, update, errors }: { data: WizardData; update: (field: keyof WizardData, value: string) => void; errors: Record<string, string> }) { return <><StepHeading eyebrow="Step 5 · Location" title="Set a convenient pickup spot" description="Your exact address stays private until you approve a booking. Browsers only see the approximate neighborhood." /><div className="grid gap-7 md:grid-cols-[minmax(0,1fr)_minmax(18rem,.9fr)]"><div className="space-y-5"><div><Label htmlFor="address">Pickup address</Label><Input id="address" autoComplete="street-address" value={data.address} onChange={(event) => update("address", event.target.value)} placeholder="123 Oak Street" className="mt-2" aria-invalid={Boolean(errors.address)} /><FieldError message={errors.address} /></div><div><Label htmlFor="locality">City or neighborhood</Label><Input id="locality" autoComplete="address-level2" value={data.locality} onChange={(event) => update("locality", event.target.value)} placeholder="Oakwood" className="mt-2" aria-invalid={Boolean(errors.locality)} /><FieldError message={errors.locality} /></div><Alert className="bg-highlight/10"><ShieldCheck /><AlertDescription>Only the approximate area is shown publicly. Your address is shared with a borrower after you accept.</AlertDescription></Alert></div><div className="relative min-h-72 overflow-hidden rounded-2xl border border-border bg-muted"><div className="absolute inset-0 opacity-45 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:32px_32px]" /><div className="absolute left-[12%] top-[22%] h-2 w-[76%] rotate-12 rounded-full bg-background shadow-subtle" /><div className="absolute left-[44%] top-[8%] h-[85%] w-3 -rotate-12 rounded-full bg-background shadow-subtle" /><div className="absolute left-1/2 top-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-highlight/30"><span className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-marketplace"><MapPin /></span></div><div className="absolute inset-x-4 bottom-4 rounded-xl bg-card/90 p-3 text-center text-xs font-semibold shadow-marketplace backdrop-blur">{data.locality || "Your approximate pickup area"}</div></div></div></>; }

function PreviewStep({ data, photos, published }: { data: WizardData; photos: Photo[]; published: boolean }) { return <><StepHeading eyebrow="Step 6 · Preview" title="One last look before publishing" description="Review how your listing will appear to neighbors. Go back to any step to make changes." />{published && <Alert className="mb-6 border-highlight bg-highlight/15"><CheckCircle2 /><AlertDescription><strong>Published successfully.</strong> Your item is now visible in the marketplace.</AlertDescription></Alert>}<article className="overflow-hidden rounded-3xl border border-border bg-background"><div className="grid sm:grid-cols-2">{photos[0] ? <img src={photos[0].url} alt="Listing cover preview" className="aspect-[4/3] size-full object-cover" /> : <div className="grid aspect-[4/3] place-items-center bg-muted text-muted-foreground"><FileText className="size-10" /></div>}<div className="p-6 sm:p-8"><div className="flex flex-wrap gap-2"><Badge className="bg-highlight/25 text-highlight-foreground hover:bg-highlight/25">{data.category || "Category"}</Badge><Badge variant="outline">{data.condition || "Condition"}</Badge></div><h3 className="mt-5 text-3xl font-bold">{data.title || "Your item title"}</h3><p className="mt-3 line-clamp-4 text-sm leading-6 text-muted-foreground">{data.description || "Your item description will appear here."}</p><p className="mt-6 flex items-center gap-2 text-sm"><MapPin className="size-4 text-accent" />Near {data.locality || "your neighborhood"}</p><div className="mt-6 flex items-end justify-between border-t border-border pt-5"><p><strong className="text-2xl">${data.dailyRate || "—"}</strong><span className="text-sm text-muted-foreground"> / day</span></p><span className="text-xs font-semibold text-success">{data.availableDates.length} available dates</span></div></div></div></article><div className="mt-6 grid gap-3 sm:grid-cols-3"><Summary label="Weekly" value={`$${data.weeklyRate || "—"}`} /><Summary label="Monthly" value={`$${data.monthlyRate || "—"}`} /><Summary label="Photos" value={`${photos.length} uploaded`} /></div></>; }
function Summary({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl bg-muted/60 p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 font-bold">{value}</p></div>; }