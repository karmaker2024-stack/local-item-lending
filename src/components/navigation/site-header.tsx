import { Link } from "@tanstack/react-router";
import { Menu, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <Container className="grid h-18 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary font-display text-lg font-bold text-primary-foreground">F</span>
          <span className="truncate font-display text-xl font-bold tracking-tight text-foreground">Flex My Stuff</span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="#foundations">Foundations</a>
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="#components">Components</a>
          <Button size="sm"><Plus />List an item</Button>
        </nav>
        <Button aria-label="Open navigation menu" className="md:hidden" size="icon" variant="ghost"><Menu /></Button>
      </Container>
    </header>
  );
}