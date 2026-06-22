import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";

import { MyFlexes } from "@/components/flexes/my-flexes";
import { Container } from "@/components/layout/container";
import { AccountSidebar, MobileBottomNavigation } from "@/components/navigation/app-navigation";
import { SiteHeader } from "@/components/navigation/site-header";

export const Route = createFileRoute("/_authenticated/my-rentals")({
  head: () => ({
    meta: [
      { title: "My Flexes | Flex My Stuff" },
      { name: "description", content: "Track every Flex you're borrowing or lending — status, timeline, pickup, return, deposit hold, and full details." },
    ],
  }),
  component: MyFlexesPage,
});

function MyFlexesPage() {
  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <SiteHeader />
      <Container className="flex gap-8 py-8 sm:py-12">
        <AccountSidebar />
        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-b border-border pb-8">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Flex My Stuff</p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">My Flexes</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Track every Flex you're borrowing or lending. See live status, timeline progress, pickup and return details, deposit holds, and full transaction history.
              </p>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent/12 text-accent sm:size-14"><CalendarDays className="size-6" /></span>
          </div>
          <div className="mt-8">
            <MyFlexes />
          </div>
        </div>
      </Container>
      <MobileBottomNavigation />
    </div>
  );
}
