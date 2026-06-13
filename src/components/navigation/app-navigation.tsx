import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { accountNavigation, adminNavigation, mobileNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function AccountSidebar({ admin = false }: { admin?: boolean }) {
  const items = admin ? adminNavigation : accountNavigation;
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border/70 pr-6 lg:block">
      <p className="mb-4 px-3 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{admin ? "Administration" : "Your account"}</p>
      <nav aria-label={admin ? "Admin navigation" : "Account navigation"} className="space-y-1">
        {items.map(({ label, to, icon: Icon }) => (
          <Link key={to} to={to} activeProps={{ className: "bg-primary text-primary-foreground" }} inactiveProps={{ className: "text-muted-foreground hover:bg-muted hover:text-foreground" }} className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors">
            <Icon className="size-4" /><span className="min-w-0 flex-1 truncate">{label}</span><ChevronRight className="size-4 opacity-50" />
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export function MobileBottomNavigation() {
  return (
    <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-border bg-card/95 px-1 pb-[env(safe-area-inset-bottom)] shadow-marketplace backdrop-blur-xl lg:hidden">
      {mobileNavigation.map(({ label, to, icon: Icon }) => (
        <Link key={to} to={to} activeProps={{ className: "text-primary" }} inactiveProps={{ className: "text-muted-foreground" }} className={cn("flex min-h-16 flex-col items-center justify-center gap-1 text-[0.65rem] font-semibold")}>
          <Icon className="size-5" /><span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}