import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { format, formatDistanceToNow } from "date-fns";
import {
  ArrowRight,
  CalendarClock,
  Check,
  CheckCircle2,
  CircleDot,
  Clock,
  CreditCard,
  MapPin,
  MessageSquare,
  Package,
  PackageCheck,
  ShieldCheck,
  Star,
  Truck,
  User,
  XCircle,
} from "lucide-react";

import drillImage from "@/assets/listing-drill.jpg";
import campingImage from "@/assets/listing-camping.jpg";
import cameraImage from "@/assets/listing-camera.jpg";
import mixerImage from "@/assets/listing-mixer.jpg";
import projectorImage from "@/assets/listing-projector.jpg";
import paddleboardImage from "@/assets/listing-paddleboard.jpg";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type FlexStatus =
  | "request-pending"
  | "approved"
  | "scheduled-pickup"
  | "active"
  | "return-scheduled"
  | "completed"
  | "cancelled"
  | "late-return";

type Stage = {
  key: "requested" | "approved" | "pickup" | "return-scheduled" | "returned";
  label: string;
  icon: typeof Package;
  at?: string; // ISO datetime, present = completed
};

type Flex = {
  id: string;
  itemId: string;
  title: string;
  image: string;
  category: string;
  counterpart: { name: string; rating: number; city: string };
  pricePerDay: number;
  deposit: number;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  pickupNotes: string;
  returnNotes: string;
  status: FlexStatus;
  stages: Stage[];
  paid: number;
  depositHeld: boolean;
  unreadMessages: number;
};

const STATUS: Record<FlexStatus, { label: string; tone: string }> = {
  "request-pending":   { label: "Request Pending",   tone: "bg-muted text-foreground border-border" },
  "approved":          { label: "Approved",          tone: "bg-accent/15 text-accent border-accent/30" },
  "scheduled-pickup":  { label: "Scheduled Pickup",  tone: "bg-secondary/15 text-secondary border-secondary/30" },
  "active":            { label: "Active Flex",       tone: "bg-highlight/25 text-highlight-foreground border-highlight" },
  "return-scheduled":  { label: "Return Scheduled",  tone: "bg-secondary/15 text-secondary border-secondary/30" },
  "completed":         { label: "Completed",         tone: "bg-success/15 text-success border-success/30" },
  "cancelled":         { label: "Cancelled",         tone: "bg-destructive/10 text-destructive border-destructive/30" },
  "late-return":       { label: "Late Return",       tone: "bg-destructive/15 text-destructive border-destructive/40" },
};

const stage = (key: Stage["key"], label: string, icon: Stage["icon"], at?: string): Stage => ({ key, label, icon, at });

const ISO = (d: string) => new Date(d).toISOString();

const borrowing: Flex[] = [
  {
    id: "flx-b-001",
    itemId: "cordless-drill-kit",
    title: "Cordless drill kit",
    image: drillImage,
    category: "Tools",
    counterpart: { name: "Maya R.", rating: 4.9, city: "Denver" },
    pricePerDay: 12,
    deposit: 60,
    startDate: ISO("2026-06-22T09:00:00"),
    endDate: ISO("2026-06-24T18:00:00"),
    pickupLocation: "1421 Larimer St, Denver",
    pickupNotes: "Buzz unit 3B. Bring a tote — comes in a hard case.",
    returnNotes: "Drop in the front lobby box, charger included.",
    status: "active",
    stages: [
      stage("requested",        "Request Submitted",        Package,      ISO("2026-06-18T10:14:00")),
      stage("approved",         "Approved by Flexer",       CheckCircle2, ISO("2026-06-18T11:02:00")),
      stage("pickup",           "Picked Up",                Truck,        ISO("2026-06-22T09:05:00")),
      stage("return-scheduled", "Scheduled Return",         CalendarClock),
      stage("returned",         "Return Confirmed",         PackageCheck),
    ],
    paid: 24,
    depositHeld: true,
    unreadMessages: 2,
  },
  {
    id: "flx-b-002",
    itemId: "mirrorless-camera",
    title: "Mirrorless camera kit",
    image: cameraImage,
    category: "Photography",
    counterpart: { name: "Priya S.", rating: 4.8, city: "Denver" },
    pricePerDay: 38,
    deposit: 250,
    startDate: ISO("2026-06-28T12:00:00"),
    endDate: ISO("2026-07-01T12:00:00"),
    pickupLocation: "Highlands meetup — 32nd & Lowell",
    pickupNotes: "Meet at the coffee shop on the corner.",
    returnNotes: "Same location, same time of day.",
    status: "approved",
    stages: [
      stage("requested",        "Request Submitted", Package,      ISO("2026-06-19T08:40:00")),
      stage("approved",         "Approved by Flexer", CheckCircle2, ISO("2026-06-19T15:22:00")),
      stage("pickup",           "Picked Up",          Truck),
      stage("return-scheduled", "Scheduled Return",   CalendarClock),
      stage("returned",         "Return Confirmed",   PackageCheck),
    ],
    paid: 114,
    depositHeld: true,
    unreadMessages: 0,
  },
  {
    id: "flx-b-003",
    itemId: "paddleboards",
    title: "Paddle board pair",
    image: paddleboardImage,
    category: "Sports",
    counterpart: { name: "Nia T.", rating: 4.9, city: "Golden" },
    pricePerDay: 32,
    deposit: 200,
    startDate: ISO("2026-05-10T08:00:00"),
    endDate: ISO("2026-05-12T18:00:00"),
    pickupLocation: "Golden — Clear Creek lot",
    pickupNotes: "",
    returnNotes: "",
    status: "completed",
    stages: [
      stage("requested",        "Request Submitted", Package,      ISO("2026-05-04T14:30:00")),
      stage("approved",         "Approved by Flexer", CheckCircle2, ISO("2026-05-04T17:10:00")),
      stage("pickup",           "Picked Up",          Truck,        ISO("2026-05-10T08:12:00")),
      stage("return-scheduled", "Scheduled Return",   CalendarClock, ISO("2026-05-12T17:30:00")),
      stage("returned",         "Return Confirmed",   PackageCheck,  ISO("2026-05-12T18:05:00")),
    ],
    paid: 96,
    depositHeld: false,
    unreadMessages: 0,
  },
];

const lending: Flex[] = [
  {
    id: "flx-l-001",
    itemId: "stand-mixer",
    title: "Professional stand mixer",
    image: mixerImage,
    category: "Events",
    counterpart: { name: "Jordan L.", rating: 4.7, city: "Denver" },
    pricePerDay: 16,
    deposit: 80,
    startDate: ISO("2026-06-25T10:00:00"),
    endDate: ISO("2026-06-27T19:00:00"),
    pickupLocation: "Your place — Cap Hill",
    pickupNotes: "Borrower will text 30 min before pickup.",
    returnNotes: "Wipe down the bowl before returning, please.",
    status: "scheduled-pickup",
    stages: [
      stage("requested",        "Request Submitted",   Package,      ISO("2026-06-20T19:10:00")),
      stage("approved",         "Approved by You",     CheckCircle2, ISO("2026-06-20T21:00:00")),
      stage("pickup",           "Picked Up",           Truck),
      stage("return-scheduled", "Scheduled Return",    CalendarClock),
      stage("returned",         "Return Confirmed",    PackageCheck),
    ],
    paid: 32,
    depositHeld: true,
    unreadMessages: 1,
  },
  {
    id: "flx-l-002",
    itemId: "projector",
    title: "Portable HD projector",
    image: projectorImage,
    category: "Electronics",
    counterpart: { name: "Sam P.", rating: 4.6, city: "Boulder" },
    pricePerDay: 28,
    deposit: 150,
    startDate: ISO("2026-06-21T18:00:00"),
    endDate: ISO("2026-06-23T10:00:00"),
    pickupLocation: "Boulder — Pearl St",
    pickupNotes: "",
    returnNotes: "",
    status: "request-pending",
    stages: [
      stage("requested",        "Request Submitted",   Package,      ISO("2026-06-21T07:55:00")),
      stage("approved",         "Approved by You",     CheckCircle2),
      stage("pickup",           "Picked Up",           Truck),
      stage("return-scheduled", "Scheduled Return",    CalendarClock),
      stage("returned",         "Return Confirmed",    PackageCheck),
    ],
    paid: 0,
    depositHeld: false,
    unreadMessages: 3,
  },
  {
    id: "flx-l-003",
    itemId: "camping-tent",
    title: "4-person camping set",
    image: campingImage,
    category: "Camping",
    counterpart: { name: "Avery K.", rating: 4.9, city: "Boulder" },
    pricePerDay: 24,
    deposit: 120,
    startDate: ISO("2026-04-18T07:00:00"),
    endDate: ISO("2026-04-21T20:00:00"),
    pickupLocation: "Your place",
    pickupNotes: "",
    returnNotes: "",
    status: "completed",
    stages: [
      stage("requested",        "Request Submitted",  Package,      ISO("2026-04-12T11:00:00")),
      stage("approved",         "Approved by You",    CheckCircle2, ISO("2026-04-12T12:14:00")),
      stage("pickup",           "Picked Up",          Truck,        ISO("2026-04-18T07:30:00")),
      stage("return-scheduled", "Scheduled Return",   CalendarClock, ISO("2026-04-21T19:45:00")),
      stage("returned",         "Return Confirmed",   PackageCheck,  ISO("2026-04-21T20:11:00")),
    ],
    paid: 96,
    depositHeld: false,
    unreadMessages: 0,
  },
];

type Role = "borrowing" | "lending";

export function MyFlexes() {
  const [role, setRole] = useState<Role>("borrowing");
  const data = role === "borrowing" ? borrowing : lending;

  const groups = useMemo(() => ({
    active: data.filter((f) => !["completed", "cancelled"].includes(f.status)),
    completed: data.filter((f) => f.status === "completed"),
    cancelled: data.filter((f) => f.status === "cancelled"),
  }), [data]);

  return (
    <div className="space-y-7">
      <Tabs value={role} onValueChange={(v) => setRole(v as Role)} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:max-w-md">
          <TabsTrigger value="borrowing">Borrowing</TabsTrigger>
          <TabsTrigger value="lending">Lending</TabsTrigger>
        </TabsList>
      </Tabs>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="flex flex-wrap gap-1 bg-muted/60">
          <TabsTrigger value="active">Active <span className="ml-2 rounded-full bg-background/80 px-2 text-xs">{groups.active.length}</span></TabsTrigger>
          <TabsTrigger value="completed">Completed <span className="ml-2 rounded-full bg-background/80 px-2 text-xs">{groups.completed.length}</span></TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled <span className="ml-2 rounded-full bg-background/80 px-2 text-xs">{groups.cancelled.length}</span></TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6 space-y-5">
          {groups.active.length ? groups.active.map((f) => <FlexCard key={f.id} flex={f} role={role} />) : <EmptyState role={role} kind="active" />}
        </TabsContent>
        <TabsContent value="completed" className="mt-6 space-y-5">
          {groups.completed.length ? groups.completed.map((f) => <FlexCard key={f.id} flex={f} role={role} completed />) : <EmptyState role={role} kind="completed" />}
        </TabsContent>
        <TabsContent value="cancelled" className="mt-6 space-y-5">
          {groups.cancelled.length ? groups.cancelled.map((f) => <FlexCard key={f.id} flex={f} role={role} />) : <EmptyState role={role} kind="cancelled" />}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function FlexCard({ flex, role, completed }: { flex: Flex; role: Role; completed?: boolean }) {
  const status = STATUS[flex.status];
  return (
    <Card className="overflow-hidden border-border/70 p-0 shadow-subtle">
      <div className="grid gap-0 md:grid-cols-[12rem_minmax(0,1fr)]">
        <Link to="/item/$id" params={{ id: flex.itemId }} className="block">
          <img src={flex.image} alt={flex.title} className="aspect-[4/3] h-full w-full object-cover md:aspect-auto" loading="lazy" />
        </Link>
        <div className="flex flex-col gap-5 p-5">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{flex.category}</p>
              <h3 className="mt-1 truncate font-display text-xl font-bold">{flex.title}</h3>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1"><User className="size-3.5" />{role === "borrowing" ? "Flexer" : "Borrower"}: <strong className="font-semibold text-foreground">{flex.counterpart.name}</strong></span>
                <span className="inline-flex items-center gap-1"><Star className="size-3.5 fill-highlight text-highlight-foreground" />{flex.counterpart.rating}</span>
                <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" />{flex.counterpart.city}</span>
              </p>
            </div>
            <Badge variant="outline" className={cn("shrink-0 border px-3 py-1 text-xs font-semibold", status.tone)}>{status.label}</Badge>
          </div>

          <div className="grid gap-2 text-sm sm:grid-cols-3">
            <Info icon={CalendarClock} label="Pickup" value={format(new Date(flex.startDate), "EEE MMM d · h:mma")} />
            <Info icon={CalendarClock} label="Return" value={format(new Date(flex.endDate), "EEE MMM d · h:mma")} />
            <Info icon={CreditCard} label={completed ? "Paid" : flex.depositHeld ? "Deposit held" : "Total"} value={completed ? `$${flex.paid}` : flex.depositHeld ? `$${flex.deposit}` : `$${flex.paid}`} />
          </div>

          <HorizontalTimeline stages={flex.stages} />

          <div className="flex flex-wrap items-center gap-2">
            <FlexDetailsTrigger flex={flex} role={role} />
            <Button variant="outline" size="sm" asChild>
              <Link to="/messages">
                <MessageSquare /> Contact {role === "borrowing" ? "Flexer" : "Borrower"}
                {flex.unreadMessages > 0 && <span className="ml-1 grid size-5 place-items-center rounded-full bg-highlight text-[.65rem] font-bold text-highlight-foreground">{flex.unreadMessages}</span>}
              </Link>
            </Button>
            {completed && (
              <Button variant="ghost" size="sm"><Star /> Leave a review</Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

function Info({ icon: Icon, label, value }: { icon: typeof Package; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 rounded-xl bg-muted/50 px-3 py-2">
      <Icon className="mt-0.5 size-4 shrink-0 text-accent" />
      <div className="min-w-0">
        <p className="text-[.7rem] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}

function HorizontalTimeline({ stages }: { stages: Stage[] }) {
  const lastDoneIdx = stages.map((s) => !!s.at).lastIndexOf(true);
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-display text-sm font-bold">Flex Timeline</p>
        <p className="text-xs text-muted-foreground">{lastDoneIdx + 1} of {stages.length}</p>
      </div>
      {/* Mobile: vertical */}
      <ol className="space-y-3 sm:hidden">
        {stages.map((s, i) => <VerticalStep key={s.key} stage={s} done={!!s.at} current={i === lastDoneIdx + 1} last={i === stages.length - 1} />)}
      </ol>
      {/* Desktop: horizontal */}
      <ol className="hidden items-start sm:grid" style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}>
        {stages.map((s, i) => {
          const done = !!s.at;
          const current = i === lastDoneIdx + 1;
          const Icon = s.icon;
          return (
            <li key={s.key} className="relative flex flex-col items-center px-1 text-center">
              {i > 0 && <span className={cn("absolute right-1/2 top-4 -z-0 h-0.5 w-full -translate-y-1/2", i <= lastDoneIdx ? "bg-success" : "bg-border")} />}
              <span className={cn(
                "relative z-10 grid size-8 place-items-center rounded-full border-2 transition-colors",
                done ? "border-success bg-success text-success-foreground"
                  : current ? "border-highlight bg-highlight text-highlight-foreground"
                  : "border-border bg-muted text-muted-foreground",
              )}>
                {done ? <Check className="size-4" /> : current ? <CircleDot className="size-4" /> : <Icon className="size-4" />}
              </span>
              <p className={cn("mt-2 text-xs font-semibold leading-tight", done || current ? "text-foreground" : "text-muted-foreground")}>{s.label}</p>
              <p className="mt-0.5 text-[.7rem] text-muted-foreground">{s.at ? format(new Date(s.at), "MMM d · h:mma") : current ? "In progress" : "Pending"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function VerticalStep({ stage, done, current, last }: { stage: Stage; done: boolean; current: boolean; last: boolean }) {
  const Icon = stage.icon;
  return (
    <li className="relative flex gap-3">
      {!last && <span className={cn("absolute left-4 top-8 h-[calc(100%-1rem)] w-0.5", done ? "bg-success" : "bg-border")} />}
      <span className={cn(
        "relative z-10 grid size-8 shrink-0 place-items-center rounded-full border-2",
        done ? "border-success bg-success text-success-foreground"
          : current ? "border-highlight bg-highlight text-highlight-foreground"
          : "border-border bg-muted text-muted-foreground",
      )}>
        {done ? <Check className="size-4" /> : current ? <CircleDot className="size-4" /> : <Icon className="size-4" />}
      </span>
      <div className="min-w-0 pb-2">
        <p className={cn("text-sm font-semibold", done || current ? "text-foreground" : "text-muted-foreground")}>{stage.label}</p>
        <p className="text-xs text-muted-foreground">{stage.at ? format(new Date(stage.at), "EEE MMM d · h:mma") : current ? "In progress" : "Pending"}</p>
      </div>
    </li>
  );
}

function FlexDetailsTrigger({ flex, role }: { flex: Flex; role: Role }) {
  const status = STATUS[flex.status];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="highlight" size="sm"><Package /> View Details <ArrowRight /></Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader className="text-left">
          <SheetTitle className="font-display text-2xl">{flex.title}</SheetTitle>
          <SheetDescription className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={cn("border px-2 py-0.5 text-xs font-semibold", status.tone)}>{status.label}</Badge>
            <span>Flex ID {flex.id}</span>
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <img src={flex.image} alt={flex.title} className="aspect-[16/10] w-full rounded-2xl object-cover" />

          <DetailSection title="Item information" icon={Package}>
            <Row label="Item">{flex.title}</Row>
            <Row label="Category">{flex.category}</Row>
            <Row label="Listing"><Link to="/item/$id" params={{ id: flex.itemId }} className="font-semibold text-accent underline-offset-4 hover:underline">View listing</Link></Row>
          </DetailSection>

          <DetailSection title={role === "borrowing" ? "Flexer (owner)" : "Borrower"} icon={User}>
            <Row label="Name">{flex.counterpart.name}</Row>
            <Row label="Rating"><span className="inline-flex items-center gap-1"><Star className="size-4 fill-highlight text-highlight-foreground" />{flex.counterpart.rating}</span></Row>
            <Row label="City">{flex.counterpart.city}</Row>
          </DetailSection>

          <DetailSection title="Pickup details" icon={Truck}>
            <Row label="When">{format(new Date(flex.startDate), "EEEE, MMM d · h:mma")}</Row>
            <Row label="Where">{flex.pickupLocation}</Row>
            {flex.pickupNotes && <Row label="Notes">{flex.pickupNotes}</Row>}
          </DetailSection>

          <DetailSection title="Return details" icon={CalendarClock}>
            <Row label="When">{format(new Date(flex.endDate), "EEEE, MMM d · h:mma")}</Row>
            {flex.returnNotes && <Row label="Notes">{flex.returnNotes}</Row>}
          </DetailSection>

          <DetailSection title="Payment" icon={CreditCard}>
            <Row label="Rate">${flex.pricePerDay} / day</Row>
            <Row label={flex.status === "completed" ? "Total paid" : "Charged"}>${flex.paid}</Row>
          </DetailSection>

          <DetailSection title="Deposit hold" icon={ShieldCheck}>
            <Row label="Amount">${flex.deposit}</Row>
            <Row label="Status">{flex.depositHeld ? "Held — releases after return" : "Released"}</Row>
          </DetailSection>

          <DetailSection title="Messages" icon={MessageSquare}>
            <p className="text-sm text-muted-foreground">{flex.unreadMessages > 0 ? `${flex.unreadMessages} unread message${flex.unreadMessages === 1 ? "" : "s"} in this thread.` : "No new messages."}</p>
            <Button asChild variant="outline" size="sm" className="mt-3"><Link to="/messages">Open thread <ArrowRight /></Link></Button>
          </DetailSection>

          <DetailSection title="Timeline history" icon={Clock}>
            <ol className="space-y-3">
              {flex.stages.map((s, i, arr) => {
                const lastDoneIdx = arr.map((x) => !!x.at).lastIndexOf(true);
                return <VerticalStep key={s.key} stage={s} done={!!s.at} current={i === lastDoneIdx + 1} last={i === arr.length - 1} />;
              })}
            </ol>
          </DetailSection>

          {flex.status === "completed" && (
            <div className="rounded-2xl border border-border bg-muted/40 p-4">
              <p className="font-display font-bold">Flex wrapped {formatDistanceToNow(new Date(flex.endDate), { addSuffix: true })}</p>
              <p className="mt-1 text-sm text-muted-foreground">Leave a review to help future Flexers and borrowers.</p>
              <Button className="mt-3" variant="highlight" size="sm"><Star /> Leave a review</Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function DetailSection({ title, icon: Icon, children }: { title: string; icon: typeof Package; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-xl bg-accent/12 text-accent"><Icon className="size-4" /></span>
        <h4 className="font-display text-base font-bold">{title}</h4>
      </div>
      <div className="space-y-1.5 rounded-2xl border border-border/70 bg-card p-4">{children}</div>
      <Separator className="mt-6" />
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[8rem_minmax(0,1fr)] gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="min-w-0 font-medium">{children}</span>
    </div>
  );
}

function EmptyState({ role, kind }: { role: Role; kind: "active" | "completed" | "cancelled" }) {
  const copy = {
    active:    role === "borrowing" ? "You don't have any active Flexes right now." : "You're not flexing out any items right now.",
    completed: "No completed Flexes yet — your history will appear here.",
    cancelled: "No cancelled Flexes.",
  }[kind];
  return (
    <Card className="grid place-items-center border-dashed bg-card/60 p-10 text-center">
      <div className="max-w-sm">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-highlight/20 text-primary"><Package /></span>
        <p className="mt-4 font-display text-lg font-bold">Nothing here yet</p>
        <p className="mt-1 text-sm text-muted-foreground">{copy}</p>
        {kind === "active" && (
          <Button asChild className="mt-5" variant="highlight">
            <Link to={role === "borrowing" ? "/explore" : "/add-listing"}>{role === "borrowing" ? "Find a Flex" : "Flex an item"} <ArrowRight /></Link>
          </Button>
        )}
      </div>
    </Card>
  );
}

export function XCircleIcon() { return <XCircle />; }
