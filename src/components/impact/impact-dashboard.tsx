import {
  Award,
  Bike,
  Car,
  ChevronRight,
  CircleDollarSign,
  Leaf,
  PackageCheck,
  Recycle,
  Sparkles,
  Sprout,
  TreePine,
  Users,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Container } from "@/components/layout/container";
import { AccountSidebar, MobileBottomNavigation } from "@/components/navigation/app-navigation";
import { SiteHeader } from "@/components/navigation/site-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const metrics = [
  { label: "CO₂ saved", value: "128 kg", note: "+23 kg this month", icon: Leaf, tone: "bg-success/10 text-success" },
  { label: "Waste reduced", value: "86 kg", note: "12 items reused", icon: Recycle, tone: "bg-accent/10 text-accent" },
  { label: "Items shared", value: "34", note: "+5 this month", icon: PackageCheck, tone: "bg-primary/10 text-primary" },
  { label: "Money saved", value: "$892", note: "$146 this month", icon: CircleDollarSign, tone: "bg-highlight/20 text-highlight-foreground" },
];

const chartData = [
  { month: "Jan", carbon: 12, waste: 8 },
  { month: "Feb", carbon: 27, waste: 16 },
  { month: "Mar", carbon: 43, waste: 29 },
  { month: "Apr", carbon: 67, waste: 42 },
  { month: "May", carbon: 96, waste: 63 },
  { month: "Jun", carbon: 128, waste: 86 },
];

const chartConfig = {
  carbon: { label: "CO₂ saved", color: "var(--color-success)" },
  waste: { label: "Waste reduced", color: "var(--color-accent)" },
} satisfies ChartConfig;

const equivalents = [
  { icon: TreePine, value: "14 trees", label: "Equivalent to planting", tone: "bg-success/10 text-success" },
  { icon: Car, value: "120 miles", label: "Equivalent to removing", suffix: "of driving", tone: "bg-accent/10 text-accent" },
  { icon: Bike, value: "51 trips", label: "Like choosing a bike for", tone: "bg-highlight/20 text-highlight-foreground" },
];

const badges = [
  { name: "First Share", detail: "Shared your first item", icon: Sparkles, unlocked: true },
  { name: "Waste Warrior", detail: "Reduced 50 kg of waste", icon: Recycle, unlocked: true },
  { name: "Community Hero", detail: "Helped 25 neighbors", icon: Users, unlocked: true },
  { name: "Planet Protector", detail: "Save 250 kg of CO₂", icon: Sprout, unlocked: false },
];

const timeline = [
  { date: "Jun 12", title: "Shared a cordless drill", impact: "4.2 kg CO₂ avoided", icon: PackageCheck },
  { date: "Jun 4", title: "Community milestone reached", impact: "25 neighbors helped", icon: Award },
  { date: "May 26", title: "Rented a camping tent", impact: "$84 saved · 6.8 kg waste avoided", icon: TreePine },
  { date: "May 11", title: "Shared a stand mixer", impact: "3.1 kg CO₂ avoided", icon: PackageCheck },
];

export function ImpactDashboard() {
  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <SiteHeader />
      <Container className="flex gap-8 py-8 sm:py-12">
        <AccountSidebar />
        <main className="min-w-0 flex-1 space-y-8">
          <section className="relative overflow-hidden rounded-3xl bg-primary px-6 py-8 text-primary-foreground shadow-marketplace sm:px-10 sm:py-10">
            <div className="absolute -right-12 -top-16 size-56 rounded-full bg-highlight/20 blur-3xl" />
            <div className="relative max-w-2xl">
              <Badge className="mb-5 border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/10">
                <Sparkles className="mr-1.5 size-3.5" /> Your 2026 impact
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Small shares. Remarkable impact.</h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-primary-foreground/75 sm:text-base">
                Together, your 34 shared items have kept useful things in circulation and helped your community consume less.
              </p>
              <div className="mt-7 flex items-center gap-4">
                <div className="grid size-12 place-items-center rounded-full bg-highlight text-highlight-foreground"><Award className="size-6" /></div>
                <div><p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">Community rank</p><p className="font-display text-xl font-bold">Top 10% of sharers</p></div>
              </div>
            </div>
          </section>

          <section aria-labelledby="impact-overview">
            <h2 id="impact-overview" className="sr-only">Impact overview</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map(({ label, value, note, icon: Icon, tone }) => (
                <Card key={label} className="overflow-hidden">
                  <CardContent className="p-5">
                    <div className={cn("mb-5 grid size-10 place-items-center rounded-xl", tone)}><Icon className="size-5" /></div>
                    <p className="text-3xl font-bold tracking-tight">{value}</p>
                    <p className="mt-1 text-sm font-semibold">{label}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(18rem,.75fr)]">
            <Card>
              <CardHeader className="flex-row items-start justify-between space-y-0">
                <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">Your progress</p><CardTitle className="mt-2 text-xl">Impact over time</CardTitle></div>
                <Badge variant="secondary">Last 6 months</Badge>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-72 w-full aspect-auto">
                  <AreaChart data={chartData} margin={{ left: -14, right: 8, top: 10 }}>
                    <defs>
                      <linearGradient id="carbonFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--color-carbon)" stopOpacity={0.34} /><stop offset="95%" stopColor="var(--color-carbon)" stopOpacity={0} /></linearGradient>
                      <linearGradient id="wasteFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--color-waste)" stopOpacity={0.24} /><stop offset="95%" stopColor="var(--color-waste)" stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="4 4" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} unit=" kg" width={54} />
                    <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                    <Area type="monotone" dataKey="carbon" stroke="var(--color-carbon)" fill="url(#carbonFill)" strokeWidth={3} />
                    <Area type="monotone" dataKey="waste" stroke="var(--color-waste)" fill="url(#wasteFill)" strokeWidth={2} />
                  </AreaChart>
                </ChartContainer>
                <div className="mt-4 flex flex-wrap gap-5 text-xs font-semibold text-muted-foreground">
                  <span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-success" />CO₂ saved</span>
                  <span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-accent" />Waste reduced</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/40">
              <CardHeader><p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">Next milestone</p><CardTitle className="text-xl">Planet Protector</CardTitle></CardHeader>
              <CardContent>
                <div className="mx-auto grid size-28 place-items-center rounded-full border-8 border-success/15 bg-card shadow-subtle"><Sprout className="size-12 text-success" /></div>
                <div className="mt-6 flex items-end justify-between"><div><p className="text-2xl font-bold">128 kg</p><p className="text-xs text-muted-foreground">of 250 kg CO₂ goal</p></div><span className="text-sm font-bold text-success">51%</span></div>
                <Progress value={51} className="mt-3 h-3" />
                <p className="mt-5 text-sm leading-6 text-muted-foreground">Share about 18 more household items to unlock your next badge.</p>
              </CardContent>
            </Card>
          </div>

          <section className="space-y-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">Put it in perspective</p><h2 className="mt-1 text-2xl font-bold tracking-tight">Your environmental equivalents</h2></div>
            <div className="grid gap-4 md:grid-cols-3">
              {equivalents.map(({ icon: Icon, value, label, suffix, tone }) => (
                <Card key={value}><CardContent className="flex items-center gap-4 p-5"><div className={cn("grid size-12 shrink-0 place-items-center rounded-2xl", tone)}><Icon className="size-6" /></div><div><p className="text-xs text-muted-foreground">{label}</p><p className="text-xl font-bold">{value}</p>{suffix && <p className="text-xs text-muted-foreground">{suffix}</p>}</div></CardContent></Card>
              ))}
            </div>
          </section>

          <div className="grid gap-8 xl:grid-cols-2">
            <section className="space-y-4">
              <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">Collect your wins</p><h2 className="mt-1 text-2xl font-bold tracking-tight">Achievement badges</h2></div>
              <div className="grid grid-cols-2 gap-3">
                {badges.map(({ name, detail, icon: Icon, unlocked }) => (
                  <Card key={name} className={cn(!unlocked && "opacity-55")}><CardContent className="p-4 sm:p-5"><div className={cn("mb-4 grid size-11 place-items-center rounded-full", unlocked ? "bg-highlight/25 text-highlight-foreground" : "bg-muted text-muted-foreground")}><Icon className="size-5" /></div><div className="flex items-center gap-1.5"><h3 className="text-sm font-bold">{name}</h3>{unlocked && <Sparkles className="size-3 text-success" />}</div><p className="mt-1 text-xs leading-5 text-muted-foreground">{detail}</p></CardContent></Card>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">Every action counts</p><h2 className="mt-1 text-2xl font-bold tracking-tight">Impact timeline</h2></div>
              <Card><CardContent className="p-5">
                <div className="space-y-0">
                  {timeline.map(({ date, title, impact, icon: Icon }, index) => (
                    <div key={title} className="grid grid-cols-[2.75rem_1fr] gap-4">
                      <div className="flex flex-col items-center"><div className="grid size-9 place-items-center rounded-full bg-success/10 text-success"><Icon className="size-4" /></div>{index < timeline.length - 1 && <div className="min-h-12 w-px flex-1 bg-border" />}</div>
                      <div className="pb-6"><p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">{date}</p><h3 className="mt-0.5 text-sm font-bold">{title}</h3><p className="mt-1 text-xs text-success">{impact}</p></div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between rounded-xl bg-primary p-4 text-primary-foreground"><div className="flex items-center gap-3"><Users className="size-5" /><div><p className="text-xs text-primary-foreground/65">Community impact</p><p className="text-sm font-bold">25 neighbors helped</p></div></div><ChevronRight className="size-4" /></div>
              </CardContent></Card>
            </section>
          </div>
        </main>
      </Container>
      <MobileBottomNavigation />
    </div>
  );
}