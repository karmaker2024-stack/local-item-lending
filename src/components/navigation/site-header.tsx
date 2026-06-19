import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Compass,
  CircleHelp,
  Home,
  LogOut,
  Mail,
  MessageCircle,
  Menu,
  PlusCircle,
  Settings,
  Tags,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { BrandLogo } from "@/components/brand/brand-logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { publicNavigation } from "@/lib/navigation";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

const loggedOutMenu = [
  { label: "Home", to: "/", icon: Home },
  { label: "Find a Flex", to: "/explore", icon: Compass },
  { label: "How It Works", to: "/how-it-works", icon: CircleHelp },
  { label: "Flex an Item", to: "/add-listing", icon: PlusCircle },
  { label: "Contact", to: "/contact", icon: Mail },
] as const;

const loggedInMenu = [
  { label: "Home", to: "/", icon: Home },
  { label: "Find a Flex", to: "/explore", icon: Compass },
  { label: "How It Works", to: "/how-it-works", icon: CircleHelp },
  { label: "Flex an Item", to: "/add-listing", icon: PlusCircle },
  { label: "Messages", to: "/messages", icon: MessageCircle },
  { label: "My Flexes", to: "/my-listings", icon: Tags },
  { label: "Account", to: "/dashboard", icon: UserRound },
  { label: "Settings", to: "/settings", icon: Settings },
  { label: "Contact", to: "/contact", icon: Mail },
] as const;

export function SiteHeader() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const menu = isAuthenticated ? loggedInMenu : loggedOutMenu;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/92 backdrop-blur-xl">
      <Container className="grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:h-20 sm:flex sm:justify-between">
        <Link
          to="/"
          aria-label="Flex My Stuff home"
          className="group flex min-w-0 items-center rounded-xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
        >
          <BrandLogo className="transition-transform duration-300 group-hover:scale-[1.03]" />
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
          {publicNavigation.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              activeProps={{ className: "text-foreground after:scale-x-100" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="relative py-2 text-sm font-bold transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-highlight after:transition-transform hover:text-foreground hover:after:scale-x-100"
            >
              {label}
            </Link>
          ))}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Button asChild size="sm" variant="ghost" className="rounded-full">
                <Link to="/messages" aria-label="Messages"><MessageCircle /></Link>
              </Button>
              <Button asChild size="sm" variant="ghost" className="rounded-full">
                <Link to="/dashboard">My Account</Link>
              </Button>
              <Button asChild size="icon" variant="ghost" className="rounded-full" aria-label="Profile">
                <Link to="/profile"><UserRound /></Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild size="sm" variant="ghost" className="rounded-full px-4">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="rounded-full px-5">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              aria-label="Open menu"
              className="md:hidden"
              size="icon"
              variant="ghost"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] max-w-sm p-0">
            <SheetHeader className="border-b border-border/60 px-6 py-5">
              <SheetTitle className="text-left">
                <BrandLogo />
              </SheetTitle>
            </SheetHeader>
            <div className="flex h-[calc(100%-5rem)] flex-col">
              <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="flex flex-col gap-1">
                  {menu.map(({ label, to, icon: Icon }) => (
                    <li key={to}>
                      <SheetClose asChild>
                        <Link
                          to={to}
                          activeProps={{ className: "bg-accent text-foreground" }}
                          inactiveProps={{ className: "text-muted-foreground" }}
                          className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-semibold transition-colors hover:bg-accent hover:text-foreground"
                        >
                          <Icon className="h-5 w-5" />
                          {label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="border-t border-border/60 px-6 py-4">
                {isAuthenticated ? (
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full rounded-full"
                  >
                    <LogOut /> Logout
                  </Button>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <SheetClose asChild>
                      <Button asChild variant="outline" className="rounded-full">
                        <Link to="/login">Login</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild className="rounded-full">
                        <Link to="/signup">Sign Up</Link>
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
