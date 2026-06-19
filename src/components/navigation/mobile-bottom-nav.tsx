import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, Home, MessageCircle, PlusCircle, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

type NavItem = {
  label: string;
  to: string;
  icon: typeof Home;
  exact?: boolean;
  authTo?: string;
};

const items: NavItem[] = [
  { label: "Home", to: "/", icon: Home, exact: true },
  { label: "Find", to: "/explore", icon: Compass },
  { label: "Flex", to: "/add-listing", icon: PlusCircle },
  { label: "Messages", to: "/messages", icon: MessageCircle, authTo: "/login" },
  { label: "Account", to: "/dashboard", icon: UserRound, authTo: "/login" },
];

export function MobileBottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { isAuthenticated } = useAuth();

  return (
    <nav
      aria-label="Primary mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;
          const target =
            "authTo" in item && !isAuthenticated ? item.authTo! : item.to;
          const active = item.exact
            ? pathname === item.to
            : pathname === item.to || pathname.startsWith(item.to + "/");
          return (
            <li key={item.label}>
              <Link
                to={target}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors",
                  active ? "text-highlight" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className={cn("h-5 w-5", active && "stroke-[2.5]")} />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
