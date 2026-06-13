import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, MapPin, Search, ShieldCheck, Sparkles } from "lucide-react";

import { Container, Section } from "@/components/layout/container";
import { SiteHeader } from "@/components/navigation/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flex My Stuff | Design System" },
      { name: "description", content: "The warm, trusted design foundation for a local peer-to-peer sharing marketplace." },
      { property: "og:title", content: "Flex My Stuff Design System" },
      { property: "og:description", content: "A premium, approachable foundation for community sharing." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Section className="overflow-hidden border-b border-border/70">
        <Container>
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.6fr)]">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-highlight/25 px-4 py-2 text-sm font-semibold text-primary">
                <Sparkles className="size-4" /> Design system foundations
              </div>
              <h1 className="text-5xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">Built for sharing.<br /><span className="text-accent">Designed for trust.</span></h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">A warm, local-first system for the people who lend, borrow, and make better use of the things already around them.</p>
            </div>
            <div className="rounded-3xl bg-primary p-6 text-primary-foreground shadow-marketplace">
              <p className="font-display text-2xl font-semibold">Foundation v1.0</p>
              <p className="mt-2 text-sm leading-6 text-primary-foreground/75">Accessible components, mobile-first layouts, semantic tokens, and restrained marketplace depth.</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold"><Check className="size-4" /> Ready to build on</div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="foundations">
        <Container>
          <div className="mb-10"><p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">01 · Foundations</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A grounded, human palette</h2></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["Primary", "bg-primary", "#1F3C2E"], ["Secondary", "bg-secondary", "#757E59"], ["Accent", "bg-accent", "#5B7E88"], ["Success", "bg-success", "#466A32"], ["Highlight", "bg-highlight", "#BDD328"],
            ].map(([name, color, hex]) => <div key={name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-subtle"><div className={`h-28 ${color}`} /><div className="p-4"><p className="font-semibold">{name}</p><p className="mt-1 text-sm text-muted-foreground">{hex}</p></div></div>)}
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <Card><CardHeader><CardDescription>Display · Helvena fallback</CardDescription><CardTitle className="text-4xl sm:text-5xl">Neighbors have great stuff.</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Outfit provides the geometric warmth until licensed Helvena files are available.</p></CardContent></Card>
            <Card><CardHeader><CardDescription>Body & UI · Gotham fallback</CardDescription><CardTitle>Clear at every size</CardTitle></CardHeader><CardContent><p className="leading-7 text-muted-foreground">Manrope supports friendly, highly legible interface copy while preserving Gotham’s practical character.</p></CardContent></Card>
          </div>
        </Container>
      </Section>

      <Section id="components" className="bg-muted/55">
        <Container>
          <div className="mb-10"><p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">02 · Components</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Practical, polished primitives</h2></div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card><CardHeader><CardTitle>Actions</CardTitle><CardDescription>Strong hierarchy with generous touch targets.</CardDescription></CardHeader><CardContent className="flex flex-wrap gap-3"><Button>Explore nearby <ArrowRight /></Button><Button variant="secondary">List an item</Button><Button variant="outline">Learn more</Button><Button variant="ghost">Save for later</Button></CardContent></Card>
            <Card><CardHeader><CardTitle>Search & location</CardTitle><CardDescription>Calm inputs designed for real marketplace tasks.</CardDescription></CardHeader><CardContent className="space-y-3"><div className="relative"><Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input aria-label="Search items" className="pl-11" placeholder="What do you need?" /></div><div className="relative"><MapPin className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input aria-label="Location" className="pl-11" placeholder="Neighborhood or postcode" /></div></CardContent></Card>
            <Card className="lg:col-span-2"><CardContent className="grid gap-6 p-6 sm:grid-cols-3">{[[ShieldCheck,"Verified people","Identity and reputation cues feel reassuring, never clinical."],[MapPin,"Local by default","Distance and neighborhood context stay close to every decision."],[Sparkles,"Less waste","Celebrate useful exchanges without leaning on eco clichés."]].map(([Icon,title,copy]) => { const ItemIcon = Icon as typeof ShieldCheck; return <div key={String(title)} className="flex gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/12 text-accent"><ItemIcon className="size-5" /></span><div><h3 className="font-display text-lg font-semibold">{String(title)}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{String(copy)}</p></div></div>; })}</CardContent></Card>
          </div>
        </Container>
      </Section>
    </div>
  );
}
