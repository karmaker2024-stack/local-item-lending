import type { LucideIcon } from "lucide-react";
import { ArrowRight, Construction, Search } from "lucide-react";

import { AccountSidebar, MobileBottomNavigation } from "@/components/navigation/app-navigation";
import { SiteHeader } from "@/components/navigation/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Container, Section } from "./container";

interface RoutePageProps {
  title: string;
  description: string;
  icon: LucideIcon;
  eyebrow?: string;
  privateArea?: boolean;
  admin?: boolean;
  searchPlaceholder?: string;
}

export function RoutePage({ title, description, icon: Icon, eyebrow = "Flex My Stuff", privateArea, admin, searchPlaceholder }: RoutePageProps) {
  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <SiteHeader />
      <Container className="flex gap-8 py-8 sm:py-12">
        {privateArea && <AccountSidebar admin={admin} />}
        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-b border-border pb-8">
            <div className="min-w-0"><p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">{eyebrow}</p><h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{title}</h1><p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{description}</p></div>
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent/12 text-accent sm:size-14"><Icon className="size-6" /></span>
          </div>
          {searchPlaceholder && <div className="relative mt-8 max-w-2xl"><Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" /><Input aria-label={searchPlaceholder} className="pl-12" placeholder={searchPlaceholder} /></div>}
          <Section className="py-8 sm:py-10">
            <Card className="border-dashed bg-card/60 shadow-subtle"><CardHeader><span className="mb-2 grid size-10 place-items-center rounded-xl bg-highlight/20 text-primary"><Construction className="size-5" /></span><CardTitle>{title} workspace</CardTitle><CardDescription>This route is structured and ready for its product workflow and data layer.</CardDescription></CardHeader><CardContent><Button variant="outline">View architecture <ArrowRight /></Button></CardContent></Card>
          </Section>
        </div>
      </Container>
      {privateArea && <MobileBottomNavigation />}
    </div>
  );
}