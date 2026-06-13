import { Link } from "@tanstack/react-router";
import { Plus, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { publicNavigation } from "@/lib/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <Container className="grid h-18 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary font-display text-lg font-bold text-primary-foreground">F</span>
          <span className="truncate font-display text-xl font-bold tracking-tight text-foreground">Flex My Stuff</span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
          {publicNavigation.map(({ label, to }) => <Link key={to} to={to} activeProps={{ className: "text-foreground" }} inactiveProps={{ className: "text-muted-foreground" }} className="text-sm font-medium transition-colors hover:text-foreground">{label}</Link>)}
          <Button asChild size="sm"><Link to="/add-listing"><Plus />List an item</Link></Button>
        </nav>
        <Button asChild aria-label="Open account" className="md:hidden" size="icon" variant="ghost"><Link to="/dashboard"><UserRound /></Link></Button>
      </Container>
    </header>
  );
}