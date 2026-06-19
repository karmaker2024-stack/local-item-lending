import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Camera,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Handshake,
  HelpCircle,
  Lock,
  MapPin,
  MessageCircle,
  PackageCheck,
  Receipt,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Upload,
  Wallet,
} from "lucide-react";

import { Container, Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/home/homepage";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works | Flex My Stuff" },
      {
        name: "description",
        content:
          "Learn how borrowing, lending, payments, deposit holds, and trust & safety work on Flex My Stuff — the peer-to-peer rental marketplace.",
      },
      { property: "og:title", content: "How Flex My Stuff Works" },
      {
        property: "og:description",
        content:
          "Everything you need to know about borrowing, lending, payments, deposits, and returning items safely.",
      },
    ],
  }),
  component: HowItWorksPage,
});

const borrowingSteps = [
  {
    n: "01",
    icon: Search,
    title: "Find a Flex",
    body: "Search items near you. Filter by location, dates, category, condition, price, and rating to find the right Flex.",
  },
  {
    n: "02",
    icon: CalendarCheck,
    title: "Request the Item",
    body: "Choose your pickup and return dates and times, review the refundable deposit hold, then send your request to the Flexer.",
  },
  {
    n: "03",
    icon: Handshake,
    title: "Pick Up & Use",
    body: "Coordinate pickup or delivery in-app. Inspect the item, snap a quick handover photo, and enjoy your Flex.",
  },
  {
    n: "04",
    icon: PackageCheck,
    title: "Return the Item",
    body: "Return the item on the agreed schedule and capture return photos right inside the app for a clean handoff.",
  },
  {
    n: "05",
    icon: RefreshCw,
    title: "Deposit Released",
    body: "Once the return is verified, the deposit hold is released back to your card automatically.",
  },
] as const;

const lendingSteps = [
  {
    n: "01",
    icon: Upload,
    title: "Flex an Item",
    body: "Take clear photos and write an honest description. A complete listing takes about two minutes.",
  },
  {
    n: "02",
    icon: Receipt,
    title: "Set Pricing & Availability",
    body: "Configure your daily rate, deposit amount, pickup windows, delivery options, and blackout dates.",
  },
  {
    n: "03",
    icon: MessageCircle,
    title: "Receive Requests",
    body: "Chat with Borrowers, review their profile and reviews, and approve or decline requests.",
  },
  {
    n: "04",
    icon: Handshake,
    title: "Hand Over the Item",
    body: "Meet your Borrower at the agreed time and place, or arrange delivery. They confirm receipt to start the Flex.",
  },
  {
    n: "05",
    icon: Wallet,
    title: "Get Paid",
    body: "After a successful return, your payout is sent securely through Stripe.",
  },
] as const;

const depositPoints = [
  {
    icon: Lock,
    title: "What it is",
    body: "A refundable authorization hold placed on the Borrower's card — never an upfront charge.",
  },
  {
    icon: ShieldCheck,
    title: "Protects Flexers",
    body: "If an item is damaged, lost, or returned significantly late, the Flexer can file a dispute within 7 days.",
  },
  {
    icon: BadgeCheck,
    title: "Protects Borrowers",
    body: "Funds aren't moved unless something goes wrong. A smooth return means the hold is simply released.",
  },
  {
    icon: RefreshCw,
    title: "When it releases",
    body: "Automatically after the Flexer verifies the return — typically within a couple of business days.",
  },
] as const;

const paymentPoints = [
  {
    icon: CircleDollarSign,
    title: "Secure online payments",
    body: "All transactions are processed in-platform. Never pay or transact off-app.",
  },
  {
    icon: Lock,
    title: "Powered by Stripe",
    body: "Payments, holds, and payouts run on Stripe's industry-leading infrastructure.",
  },
  {
    icon: BadgeCheck,
    title: "Verified transactions",
    body: "Every Flex is tied to a verified profile, payment method, and rental agreement.",
  },
  {
    icon: Wallet,
    title: "Reliable payouts",
    body: "Flexers receive payouts to their Stripe account after each successful Flex.",
  },
] as const;

const trustPoints = [
  { icon: BadgeCheck, label: "Verified member profiles" },
  { icon: CircleDollarSign, label: "Secure payments" },
  { icon: ShieldCheck, label: "Deposit protection" },
  { icon: Star, label: "Transparent reviews" },
  { icon: ClipboardList, label: "Clear rental agreements" },
  { icon: Camera, label: "In-app handover photos" },
  { icon: MessageCircle, label: "On-platform messaging" },
  { icon: MapPin, label: "Safe meet-up guidance" },
] as const;

type FaqGroup = { category: string; items: { q: string; a: string }[] };

const faqGroups: FaqGroup[] = [
  {
    category: "Borrowing",
    items: [
      {
        q: "How do I request a Flex?",
        a: "Open the listing, pick your pickup and return dates and times, review the refundable deposit hold, and send your request. The Flexer will review and approve.",
      },
      {
        q: "Can I message the Flexer before booking?",
        a: "Yes. Use in-app messaging to ask about pickup location, condition, included accessories, or timing before you submit a request.",
      },
      {
        q: "What if I need to extend a rental mid-booking?",
        a: "Send an extension request through the app. The Flexer can approve it if the item is still available.",
      },
    ],
  },
  {
    category: "Lending",
    items: [
      {
        q: "How do I create my first listing?",
        a: 'Tap "Flex an Item" and follow the guided steps: photos, description, category, daily rate, deposit, availability, and pickup options. Most listings take under two minutes.',
      },
      {
        q: "How do I price my item?",
        a: "We suggest a daily rate based on item type, condition, and local demand. You can always adjust pricing later.",
      },
      {
        q: "Can I pause my listing?",
        a: "Yes — pause your listing from your dashboard at any time without deleting it, then reactivate when you're ready.",
      },
      {
        q: "Can I set blackout dates?",
        a: "Yes. Block off dates when the item isn't available so Borrowers can only request open windows.",
      },
    ],
  },
  {
    category: "Payments",
    items: [
      {
        q: "What payment methods are accepted?",
        a: "Major credit and debit cards through Stripe. All payments and holds happen inside the app.",
      },
      {
        q: "When do I get paid as a Flexer?",
        a: "Payouts are released through Stripe after a successful return is verified.",
      },
      {
        q: "Are there any fees to list an item?",
        a: "No. Listing is free. A small platform fee applies only when a Flex is completed.",
      },
      {
        q: "What happens if a payment fails?",
        a: "The booking won't be confirmed until payment and the deposit hold succeed. Update your payment method to try again.",
      },
    ],
  },
  {
    category: "Deposits",
    items: [
      {
        q: "What is the deposit hold on my card?",
        a: "It's a temporary authorization — not a charge. The funds are reserved on your card until the Flex is returned and verified.",
      },
      {
        q: "When is the deposit released?",
        a: "Automatically once the Flexer verifies the return. Most banks release the hold within a couple of business days.",
      },
      {
        q: "When can a deposit be charged?",
        a: "Only if the Flexer files a successful dispute within 7 days for damage, loss, or a significantly late return.",
      },
    ],
  },
  {
    category: "Returns",
    items: [
      {
        q: "How do returns work?",
        a: "Meet at the agreed time and place. Both parties capture return photos in the app so the condition is documented.",
      },
      {
        q: "What if the Borrower doesn't return my item?",
        a: "Reach out through in-app messaging first. If the item isn't returned, file a dispute and our team will help recover the deposit.",
      },
      {
        q: "What happens with late returns?",
        a: "Late returns may incur additional daily fees, and significant delays can trigger a deposit claim.",
      },
    ],
  },
  {
    category: "Cancellations",
    items: [
      {
        q: "Can I cancel a booking?",
        a: "Yes. Cancellation terms depend on how close you are to the pickup time — see your booking details for the exact policy.",
      },
      {
        q: "What if the Flexer cancels last minute?",
        a: "You'll be refunded in full and the deposit hold is released. Repeated last-minute cancellations affect a Flexer's rating.",
      },
      {
        q: "Does cancelling affect my rating?",
        a: "Occasional cancellations are fine. Frequent cancellations can impact your visibility and trust on the platform.",
      },
    ],
  },
  {
    category: "Late Fees & Disputes",
    items: [
      {
        q: "How do late fees work?",
        a: "If an item is returned late, daily late fees apply based on the listing's daily rate until the item is returned.",
      },
      {
        q: "How do I file a dispute?",
        a: "Open the booking, choose 'File a dispute,' upload your return photos and evidence, and our team will review within a few business days.",
      },
      {
        q: "What if someone leaves an unfair review?",
        a: "You can flag reviews that violate our guidelines. We review and remove reviews that break the rules.",
      },
    ],
  },
  {
    category: "Account & Trust",
    items: [
      {
        q: "How are Flexers and Borrowers verified?",
        a: "Every member sets up a verified profile with confirmed identity, payment method, and contact details.",
      },
      {
        q: "Can I block another user?",
        a: "Yes. You can block any member from your account settings; they won't be able to message or request your items.",
      },
      {
        q: "Is Flex My Stuff free to join?",
        a: "Yes. Creating an account and listing items is always free.",
      },
    ],
  },
];

function HowItWorksPage() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <SiteHeader />

      {/* Hero */}
      <Section className="relative isolate overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/85 text-primary-foreground">
        <div aria-hidden className="absolute -right-32 -top-32 size-[28rem] rounded-full bg-highlight/25 blur-3xl" />
        <div aria-hidden className="absolute -bottom-40 -left-24 size-[26rem] rounded-full bg-highlight/15 blur-3xl" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/8 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-highlight">
              <Sparkles className="size-3.5" /> Learn how Flex My Stuff works
            </p>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">How Flex My Stuff Works</h1>
            <p className="mt-5 text-lg leading-8 text-primary-foreground/75">
              Everything you need to know about borrowing, lending, payments, deposits, and returning items safely.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="highlight">
                <Link to="/explore">
                  Find a Flex <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/add-listing">Flex an Item</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* How Borrowing Works */}
      <StepsSection
        eyebrow="For Borrowers"
        title="How borrowing works"
        description="Five clear steps from finding the right Flex to getting your deposit released."
        steps={borrowingSteps}
        ctaLabel="Find a Flex"
        ctaTo="/explore"
      />

      {/* How Lending Works */}
      <StepsSection
        eyebrow="For Flexers"
        title="How lending works"
        description="Earn from things you already own. Here's the lender journey, end to end."
        steps={lendingSteps}
        ctaLabel="Flex an Item"
        ctaTo="/add-listing"
        tone="muted"
      />

      {/* Deposit Hold Protection */}
      <Section className="bg-highlight text-highlight-foreground">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-highlight-foreground/70">Deposit hold protection</p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">A hold, not a charge.</h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-highlight-foreground/85">
                Every Flex is backed by a refundable deposit hold — one of the strongest trust features on the platform. It's
                designed so Flexers feel confident lending and Borrowers know exactly how it works.
              </p>
              <div className="mt-7 rounded-2xl border border-highlight-foreground/15 bg-highlight-foreground/8 p-5 text-sm leading-6 text-highlight-foreground/90">
                <strong className="font-display">Important:</strong> the deposit is <em>held</em>, not charged — unless the item is
                damaged, lost, or returned significantly late.
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {depositPoints.map(({ icon: Icon, title, body }) => (
                <li key={title} className="rounded-2xl bg-highlight-foreground/8 p-6">
                  <Icon className="size-6" />
                  <h3 className="mt-6 font-display text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-highlight-foreground/85">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Payments & Security */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Payments & security</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Built on secure payments.</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Payments, holds, and payouts are all handled in-platform through Stripe — so every Flex stays accountable and traceable.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {paymentPoints.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-subtle">
                <span className="grid size-11 place-items-center rounded-xl bg-highlight/15 text-highlight-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-6 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Trust & Safety */}
      <Section className="bg-primary text-primary-foreground">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-highlight">Trust & safety</p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Built on accountability.</h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-primary-foreground/75">
                Profiles, payments, messaging, reviews, and rental agreements all work together so every Flex feels clear and safe.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {trustPoints.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 rounded-2xl bg-primary-foreground/8 p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-highlight text-highlight-foreground">
                    <Icon className="size-5" />
                  </span>
                  <div className="flex items-center gap-2 font-display text-base font-bold">
                    <CheckCircle2 className="size-4 text-highlight" /> {label}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* FAQs */}
      <Section className="bg-card">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">FAQs</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Frequently asked questions</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Quick answers across borrowing, lending, payments, deposits, returns, and more.
            </p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {faqGroups.map((group) => (
              <div key={group.category} className="rounded-3xl border border-border bg-background p-6 sm:p-8">
                <h3 className="font-display text-xl font-bold">{group.category}</h3>
                <Accordion type="single" collapsible className="mt-3">
                  {group.items.map((item, i) => (
                    <AccordionItem key={item.q} value={`${group.category}-${i}`}>
                      <AccordionTrigger className="text-left text-sm font-bold">{item.q}</AccordionTrigger>
                      <AccordionContent className="text-sm leading-6 text-muted-foreground">{item.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section>
        <Container>
          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-primary/85 px-8 py-14 text-center text-primary-foreground sm:px-12 sm:py-16">
            <span className="inline-grid size-12 place-items-center rounded-2xl bg-highlight text-highlight-foreground">
              <HelpCircle className="size-6" />
            </span>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">Still have questions?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-primary-foreground/75">
              Our team is here to help with borrowing, lending, deposits, payments, or anything else.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="highlight">
                <Link to="/" hash="contact">
                  Contact Us <Send />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/explore">
                  Find a Flex <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter isAuthenticated={isAuthenticated} />
    </div>
  );
}

type StepItem = { n: string; icon: typeof Search; title: string; body: string };

function StepsSection({
  eyebrow,
  title,
  description,
  steps,
  ctaLabel,
  ctaTo,
  tone = "default",
}: {
  eyebrow: string;
  title: string;
  description: string;
  steps: readonly StepItem[];
  ctaLabel: string;
  ctaTo: "/explore" | "/add-listing";
  tone?: "default" | "muted";
}) {
  return (
    <Section className={tone === "muted" ? "bg-muted/55" : undefined}>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">{eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{description}</p>
        </div>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(({ n, icon: Icon, title: stepTitle, body }) => (
            <li key={n} className="relative flex flex-col rounded-3xl border border-border bg-card p-6 shadow-subtle">
              <span className="font-display text-sm font-bold text-secondary">{n}</span>
              <span className="mt-4 grid size-11 place-items-center rounded-xl bg-highlight/15 text-highlight-foreground">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">{stepTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" variant="highlight">
            <Link to={ctaTo}>
              {ctaLabel} <ArrowRight />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
