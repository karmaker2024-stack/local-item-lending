import { Link } from "@tanstack/react-router";
import { MessageCircle, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { BrandLogo } from "@/components/brand/brand-logo";
import { publicNavigation } from "@/lib/navigation";
import { useAuth } from "@/hooks/use-auth";

export function SiteHeader() {
  const { isAuthenticated } = useAuth();
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/92 backdrop-blur-xl">
      <Container className="grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <Link to="/" aria-label="Flex My Stuff home" className="group flex min-w-0 items-center rounded-xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40">
          <BrandLogo className="transition-transform duration-300 group-hover:scale-[1.03]" />
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
          {publicNavigation.map(({ label, to }) => (
            <Link key={to} to={to} activeProps={{ className: "text-foreground after:scale-x-100" }} inactiveProps={{ className: "text-muted-foreground" }} className="relative py-2 text-sm font-bold transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-highlight after:transition-transform hover:text-foreground hover:after:scale-x-100">
              {label}
            </Link>
          ))}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Button asChild size="sm" variant="ghost" className="rounded-full"><Link to="/messages" aria-label="Messages"><MessageCircle /></Link></Button>
              <Button asChild size="sm" variant="ghost" className="rounded-full"><Link to="/dashboard">My Account</Link></Button>
              <Button asChild size="icon" variant="ghost" className="rounded-full" aria-label="Profile"><Link to="/profile"><UserRound /></Link></Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild size="sm" variant="ghost" className="rounded-full px-4"><Link to="/login">Login</Link></Button>
              <Button asChild size="sm" className="rounded-full px-5"><Link to="/signup">Sign Up</Link></Button>
            </div>
          )}
        </nav>
        <Button asChild aria-label="Open account" className="md:hidden" size="icon" variant="ghost"><Link to={isAuthenticated ? "/dashboard" : "/login"}><UserRound /></Link></Button>
      </Container>
    </header>
  );
}
