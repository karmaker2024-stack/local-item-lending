import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Banknote,
  Bike,
  Camera,
  CheckCircle2,
  Clock,
  Drill,
  MessageCircle,
  Package,
  PackageCheck,
  PiggyBank,
  Repeat,
  Send,
  TreePine,
  TrendingUp,
  Wrench,
} from "lucide-react";

import { AccountSidebar, MobileBottomNavigation } from "@/components/navigation/app-navigation";
import { SiteHeader } from "@/components/navigation/site-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

/* ─── Demo data ─── */
const quickStats = [
  { label: "Revenue earned", value: "$1,247", change: "+12%", icon: Banknote, color: "text-success", bg: "bg-success/10" },
  { label: "Money saved", value: "$892", change: "+8%", icon: PiggyBank, color: "text-accent", bg: "bg-accent/10" },
  { label: "Items shared", value: "34", change: "+5", icon: Package, color: "text-primary", bg: "bg-primary/10" },
  { label: "CO₂ saved", value: "128 kg", change: "+23 kg", icon: TreePine, color: "text-success", bg: "bg-success/10" },
];

const activeRentals = [
  { id: 1, item: "Cordless Drill Kit", owner: "Maya R.", image: "/src/assets/listing-drill.jpg", status: "Active", daysLeft: 2, due: "Jun 15" },
  { id: 2, item: "Canon DSLR Camera", owner: "James T.", image: "/src/assets/listing-camera.jpg", status: "Active", daysLeft: 5, due: "Jun 18" },
  { id: 3, item: "Camping Tent 4P", owner: "Priya S.", image: "/src/assets/listing-camping.jpg", status: "Upcoming", daysLeft: 0, due: "Jun 13" },
];

const myListings = [
  { id: 1, title: "DeWalt 20V Drill Set", status: "Rented", price: "$18/day", image: "/src/assets/listing-drill.jpg", requests: 3 },
  { id: 2, title: "KitchenAid Mixer", status: "Available", price: "$12/day", image: "/src/assets/listing-mixer.jpg", requests: 1 },
  { id: 3, title: "Canon EOS R6", status: "Rented", price: "$45/day", image: "/src/assets/listing-camera.jpg", requests: 7 },
  { id: 4, title: "Inflatable Paddleboard", status: "Available", price: "$22/day", image: "/src/assets/listing-paddleboard.jpg", requests: 2 },
];

const upcomingReturns = [
  { id: 1, item: "Cordless Drill Kit", renter: "Alex M.", returnDate: "Tomorrow", status: "returning" },
  { id: 2, item: "Canon DSLR Camera", renter: "Sarah L.", returnDate: "Jun 18", status: "late" },
  { id: 3, item: "Camping Tent 4P", renter: "David K.", returnDate: "Jun 20", status: "on-time" },
];

const messages = [
  { id: 1, name: "Maya R.", avatar: "MR", text: "Can I extend the drill rental for 2 more days?", time: "10 min ago", unread: true },
  { id: 2, name: "James T.", avatar: "JT", text: "Camera is ready for pickup at 3pm", time: "1 hr ago", unread: true },
  { id: 3, name: "Priya S.", avatar: "PS", text: "Thanks for the quick return!", time: "3 hr ago", unread: false },
];

const impactData = [
  { label: "Money saved", value: 892, max: 2000, color: "bg-accent", icon: PiggyBank },
  { label: "Items shared", value: 34, max: 100, color: "bg-primary", icon: PackageCheck },
  { label: "CO₂ saved (kg)", value: 128, max: 500, color: "bg-success", icon: TreePine },
];

/* ─── Helper components ─── */
function SectionTitle({ title, action }: { title: string; action?: { label: string; to: string } }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
      <h2 className="truncate text-lg font-bold tracking-tight text-foreground">{title}</h2>
      {action && (
        <Button asChild variant="ghost" size="sm" className="shrink-0 gap-1 text-xs font-semibold">
          <Link to={action.to}>{action.label}<ArrowRight className="size-3.5" /></Link>
        </Button>
      )}
    </div>
  );
}

function StatCard({ label, value, change, icon: Icon, color, bg }: typeof quickStats[number]) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-5">
        <div className={cn("mb-3 grid size-9 place-items-center rounded-lg", bg)}>
          <Icon className={cn("size-4", color)} />
        </div>
        <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <Badge variant="secondary" className="text-[0.65rem] font-semibold">{change}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function RentalRow({ rental }: { rental: typeof activeRentals[number] }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border/60 p-3 transition-colors hover:bg-muted/40">
      <div className={cn("grid size-12 shrink-0 place-items-center rounded-xl text-lg", rental.status === "Active" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent")}>
        {rental.status === "Active" ? <CheckCircle2 className="size-5" /> : <Clock className="size-5" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-foreground">{rental.item}</p>
        <p className="text-xs text-muted-foreground">{rental.owner} &middot; {rental.daysLeft > 0 ? `${rental.daysLeft} days left` : "Starts today"}</p>
      </div>
      <div className="shrink-0 text-right">
        <Badge variant={rental.status === "Active" ? "default" : "secondary"} className="text-xs">
          {rental.status}
        </Badge>
        <p className="mt-0.5 text-[0.65rem] text-muted-foreground">Due {rental.due}</p>
      </div>
    </div>
  );
}

function ListingCard({ listing }: { listing: typeof myListings[number] }) {
  const statusColor = listing.status === "Available" ? "bg-success/10 text-success" : "bg-highlight/20 text-primary";
  return (
    <Card className="overflow-hidden">
      <div className="relative h-28 bg-muted">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
          {listing.title.includes("Drill") ? <Drill className="size-10" /> :
           listing.title.includes("Camera") ? <Camera className="size-10" /> :
           listing.title.includes("Paddleboard") ? <Bike className="size-10" /> :
           <Wrench className="size-10" />}
        </div>
        <div className="absolute right-2 top-2">
          <Badge className={cn("text-[0.65rem] font-semibold", statusColor)}>{listing.status}</Badge>
        </div>
      </div>
      <CardContent className="p-4 pt-3">
        <p className="truncate font-semibold text-foreground">{listing.title}</p>
        <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>{listing.price}</span>
          <span className="flex items-center gap-1"><Send className="size-3" />{listing.requests} requests</span>
        </div>
      </CardContent>
    </Card>
  );
}

function MessagePreview({ msg }: { msg: typeof messages[number] }) {
  return (
    <div className={cn("flex items-start gap-3 rounded-xl border p-3 transition-colors", msg.unread ? "border-highlight/40 bg-highlight/5" : "border-border/60 hover:bg-muted/40")}>
      <Avatar className="size-9 shrink-0">
        <AvatarFallback className="bg-primary text-[0.7rem] font-bold text-primary-foreground">{msg.avatar}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-semibold text-foreground">{msg.name}</p>
          <span className="shrink-0 text-[0.65rem] text-muted-foreground">{msg.time}</span>
        </div>
        <p className="truncate text-xs text-muted-foreground">{msg.text}</p>
      </div>
      {msg.unread && <div className="mt-1.5 size-2 shrink-0 rounded-full bg-highlight" />}
    </div>
  );
}

/* ─── Main component ─── */
export function Dashboard() {
  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <SiteHeader />
      <Container className="flex gap-8 py-8 sm:py-12">
        <AccountSidebar />
        <div className="min-w-0 flex-1 space-y-10">

          {/* ── Welcome Header ── */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Dashboard</p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Welcome back, Alex</h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Here&apos;s what&apos;s happening with your rentals, listings, and community impact.
            </p>
          </div>

          {/* ── Quick Stats ── */}
          <section className="space-y-4">
            <SectionTitle title="Quick Stats" />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {quickStats.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>
          </section>

          <div className="grid gap-10 lg:grid-cols-2 xl:gap-12">
            <div className="space-y-10">
              {/* ── Active Rentals ── */}
              <section className="space-y-4">
                <SectionTitle title="Active Rentals" action={{ label: "All rentals", to: "/my-rentals" }} />
                <div className="space-y-3">
                  {activeRentals.map((r) => (
                    <RentalRow key={r.id} rental={r} />
                  ))}
                </div>
              </section>

              {/* ── My Listings ── */}
              <section className="space-y-4">
                <SectionTitle title="My Listings" action={{ label: "All listings", to: "/my-listings" }} />
                <div className="grid gap-4 sm:grid-cols-2">
                  {myListings.map((l) => (
                    <ListingCard key={l.id} listing={l} />
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-10">
              {/* ── Upcoming Returns ── */}
              <section className="space-y-4">
                <SectionTitle title="Upcoming Returns" />
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {upcomingReturns.map((r) => (
                        <div key={r.id} className="flex items-center gap-3 rounded-lg border border-border/50 p-3">
                          <div className={cn("grid size-10 shrink-0 place-items-center rounded-lg", r.status === "late" ? "bg-destructive/10 text-destructive" : r.status === "returning" ? "bg-highlight/20 text-primary" : "bg-muted text-muted-foreground")}>
                            {r.status === "late" ? <Clock className="size-4" /> : <Repeat className="size-4" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-foreground">{r.item}</p>
                            <p className="text-xs text-muted-foreground">{r.renter}</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <Badge variant={r.status === "late" ? "destructive" : "secondary"} className="text-[0.65rem]">
                              {r.status === "late" ? "Overdue" : r.returnDate}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* ── Messages ── */}
              <section className="space-y-4">
                <SectionTitle title="Messages" action={{ label: "Inbox", to: "/messages" }} />
                <div className="space-y-2">
                  {messages.map((m) => (
                    <MessagePreview key={m.id} msg={m} />
                  ))}
                </div>
              </section>

              {/* ── Impact Summary ── */}
              <section className="space-y-4">
                <SectionTitle title="Impact Summary" action={{ label: "Full report", to: "/impact-dashboard" }} />
                <Card className="overflow-hidden">
                  <CardContent className="space-y-5 p-5">
                    {impactData.map((d) => (
                      <div key={d.label} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <d.icon className="size-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground">{d.label}</span>
                          </div>
                          <span className="text-sm font-bold text-foreground">{d.value}</span>
                        </div>
                        <Progress value={(d.value / d.max) * 100} className="h-2" />
                      </div>
                    ))}
                    <div className="flex items-center gap-2 rounded-lg bg-success/10 p-3 text-sm text-success">
                      <TrendingUp className="size-4" />
                      <span className="font-medium">You&apos;re in the top 10% of contributors this month!</span>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>

        </div>
      </Container>
      <MobileBottomNavigation />
    </div>
  );
}
