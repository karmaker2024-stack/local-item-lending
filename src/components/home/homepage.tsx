import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Camera, ChevronRight, CircleDollarSign, Facebook, Gamepad2, Heart, Instagram, Leaf, Linkedin, Mail, MessageSquareQuote, PencilLine, Phone, Send, ShieldCheck, Star, TentTree, Trophy, Twitter, Wrench, Youtube, Zap } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import drillImage from "@/assets/listing-drill.jpg";
import campingImage from "@/assets/listing-camping.jpg";
import cameraImage from "@/assets/listing-camera.jpg";
import mixerImage from "@/assets/listing-mixer.jpg";
import { Container, Section } from "@/components/layout/container";
import { BrandLogo } from "@/components/brand/brand-logo";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { SiteHeader } from "@/components/navigation/site-header";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

const categories = [{ label: "Tools", icon: Wrench }, { label: "Electronics", icon: Zap }, { label: "Camping", icon: TentTree }, { label: "Photography", icon: Camera }, { label: "Sports", icon: Trophy }, { label: "Events", icon: Gamepad2 }];
const listings = [
  { id: "cordless-drill-kit", title: "Cordless drill kit", image: drillImage, price: "$12", location: "0.8 mi" },
  { id: "camping-tent", title: "4-person camping set", image: campingImage, price: "$24", location: "1.2 mi" },
  { id: "mirrorless-camera", title: "Mirrorless camera kit", image: cameraImage, price: "$38", location: "1.6 mi" },
  { id: "stand-mixer", title: "Professional stand mixer", image: mixerImage, price: "$16", location: "2.1 mi" },
];

export function HomePage() {
  const { isAuthenticated } = useAuth();
  return <div className="min-h-screen overflow-hidden bg-background">
    <SiteHeader />
    <HeroCarousel isAuthenticated={isAuthenticated} />

    <Section><Container><SectionHeading eyebrow="Find your thing" title="A little less buying. A lot more doing." link="/categories" /><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{categories.map(({ label, icon: Icon }) => <Link key={label} to="/categories" className="premium-lift group rounded-2xl border border-border/70 bg-card p-5 hover:border-highlight"><span className="grid size-11 place-items-center rounded-xl bg-muted text-primary transition-colors group-hover:bg-highlight"><Icon className="size-5" /></span><h3 className="mt-5 font-display text-lg font-bold">{label}</h3><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">Explore <ChevronRight className="size-3 transition-transform group-hover:translate-x-1" /></p></Link>)}</div></Container></Section>

    <Section className="bg-muted/55"><Container><SectionHeading eyebrow="Around the corner" title="Popular near you" link="/explore" /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{listings.map((item) => <Link key={item.id} to="/item/$id" params={{ id: item.id }} className="group min-w-0"><div className="relative overflow-hidden rounded-2xl bg-card"><img src={item.image} alt={item.title} width={768} height={768} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" /><span className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-card/90 shadow-subtle backdrop-blur"><Heart className="size-5" /></span></div><div className="pt-4"><h3 className="min-w-0 truncate font-display text-lg font-bold">{item.title}</h3><p className="mt-1 text-sm text-muted-foreground">{item.location} away</p><p className="mt-2"><strong className="font-display text-lg">{item.price}</strong><span className="text-sm text-muted-foreground"> / day</span></p></div></Link>)}</div></Container></Section>

    <Section><Container><div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start"><div className="lg:sticky lg:top-28"><p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Simple by design</p><h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">From "I need one" to "all done."</h2><p className="mt-5 max-w-md leading-7 text-muted-foreground">Borrow in four straightforward steps, with clear communication at every point.</p><Button asChild className="mt-7" variant="highlight"><Link to="/how-it-works">How it works <ArrowRight /></Link></Button></div><ol className="grid gap-4 sm:grid-cols-2">{[["01","Find","Search useful things near you."],["02","Reserve","Choose your dates and send a request."],["03","Use","Meet nearby and enjoy what you borrowed."],["04","Return","Bring it back and share a quick review."]].map(([number,title,copy]) => <li key={number} className="rounded-3xl border border-border bg-card p-6 shadow-subtle"><span className="font-display text-sm font-bold text-secondary">{number}</span><h3 className="mt-10 text-2xl font-bold">{title}</h3><p className="mt-2 leading-6 text-muted-foreground">{copy}</p></li>)}</ol></div></Container></Section>

    <Section className="bg-primary text-primary-foreground"><Container><div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-highlight">Trust comes first</p><h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Share with people, not strangers.</h2><p className="mt-5 max-w-xl leading-7 text-primary-foreground/70">Profiles, payments, messaging, and reviews work together so every exchange feels clear and accountable.</p></div><div className="grid gap-4 sm:grid-cols-3">{[[ShieldCheck,"Verified members","Know who you're meeting."],[CircleDollarSign,"Secure payments","Protected, simple transactions."],[Star,"Community reviews","Real trust built over time."]].map(([Icon,title,copy]) => { const TrustIcon = Icon as typeof ShieldCheck; return <div key={String(title)} className="rounded-2xl bg-primary-foreground/8 p-5"><TrustIcon className="size-6 text-highlight" /><h3 className="mt-8 font-display text-lg font-bold">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-primary-foreground/65">{String(copy)}</p></div>; })}</div></div></Container></Section>

    <Section><Container><div className="grid overflow-hidden rounded-[2rem] bg-highlight lg:grid-cols-2"><div className="p-8 sm:p-12 lg:p-16"><Leaf className="size-10 text-highlight-foreground" /><p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-highlight-foreground/65">Your impact adds up</p><h2 className="mt-3 text-4xl font-bold text-highlight-foreground sm:text-5xl">Good for your wallet. Better for the planet.</h2><p className="mt-5 max-w-xl leading-7 text-highlight-foreground/75">Every borrowed item means one less rushed purchase, more value from things already made, and a stronger local network.</p><Button asChild className="mt-8" size="lg"><Link to="/impact-dashboard">Track your impact <ArrowRight /></Link></Button></div><div className="relative hidden min-h-[320px] items-center justify-center bg-highlight-foreground/5 p-12 lg:flex"><div className="grid grid-cols-2 gap-4 opacity-70">{[Leaf, CircleDollarSign, Heart, ShieldCheck].map((Icon, i) => <div key={i} className="grid size-28 place-items-center rounded-2xl bg-highlight-foreground/10"><Icon className="size-10 text-highlight-foreground/70" /></div>)}</div></div></div></Container></Section>

    <Section className="bg-card"><Container><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Community Feedback</p><h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">What Our Community Thinks</h2><p className="mt-5 leading-7 text-muted-foreground">Reviews from Flex My Stuff members will appear here.</p><div className="mt-12 grid gap-4 sm:grid-cols-3">{[0,1,2].map((i) => <div key={i} className="flex min-h-44 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/40 p-6 text-center"><MessageSquareQuote className="size-7 text-muted-foreground/50" /><p className="text-xs leading-5 text-muted-foreground/70">Awaiting member reviews</p></div>)}</div><div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"><Button asChild variant="highlight" size="lg"><Link to="/community"><PencilLine /> Write a Review</Link></Button><Button asChild variant="outline" size="lg"><Link to="/how-it-works">Learn How Flexing Works <ArrowRight /></Link></Button></div></div></Container></Section>

    <Section className="bg-primary text-primary-foreground"><Container><div className="mx-auto max-w-3xl text-center"><h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{isAuthenticated ? "Ready for Your Next Flex?" : "Ready to Start Flexing?"}</h2><div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">{isAuthenticated ? (<><Button asChild size="lg" variant="highlight"><Link to="/explore">Find a Flex <ArrowRight /></Link></Button><Button asChild size="lg" variant="secondary"><Link to="/add-listing">Flex an Item</Link></Button><Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"><Link to="/dashboard">Go to Dashboard</Link></Button></>) : (<><Button asChild size="lg" variant="highlight"><Link to="/explore">Find a Flex <ArrowRight /></Link></Button><Button asChild size="lg" variant="secondary"><Link to="/signup">Create Account</Link></Button></>)}</div></div></Container></Section>

    <ContactConnectSection />

    <SiteFooter isAuthenticated={isAuthenticated} />
  </div>;
}

function SectionHeading({ eyebrow, title, link }: { eyebrow: string; title: string; link: "/explore" | "/categories" }) { return <div className="mb-9 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div className="min-w-0"><p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">{eyebrow}</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2></div><Button asChild className="hidden sm:inline-flex" variant="ghost"><Link to={link}>View all <ArrowRight /></Link></Button></div>; }

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  subject: z.string().trim().min(1, "Please add a subject").max(150),
  message: z.string().trim().min(1, "Please write a message").max(1000),
});

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "X / Twitter", href: "https://x.com", Icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
  { label: "TikTok", href: "https://tiktok.com", Icon: MessageSquareQuote },
  { label: "YouTube", href: "https://youtube.com", Icon: Youtube },
] as const;

function ContactConnectSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent — we'll get back to you soon.");
    }, 600);
  }

  return (
    <Section id="contact" className="bg-card">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Contact</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Have a Question?</h2>
            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
              Need help with borrowing, lending, deposits, payments, or anything else? We'd love to hear from you.
            </p>
            <form onSubmit={onSubmit} className="mt-8 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" id="contact-name">
                  <input id="contact-name" type="text" required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-highlight focus:ring-2 focus:ring-highlight/30" />
                </Field>
                <Field label="Email Address" id="contact-email">
                  <input id="contact-email" type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-highlight focus:ring-2 focus:ring-highlight/30" />
                </Field>
              </div>
              <Field label="Subject" id="contact-subject">
                <input id="contact-subject" type="text" required maxLength={150} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-highlight focus:ring-2 focus:ring-highlight/30" />
              </Field>
              <Field label="Message" id="contact-message">
                <textarea id="contact-message" required maxLength={1000} rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-highlight focus:ring-2 focus:ring-highlight/30" />
              </Field>
              <div>
                <Button type="submit" size="lg" variant="highlight" disabled={submitting}>
                  {submitting ? "Sending…" : (<>Send Message <Send /></>)}
                </Button>
              </div>
            </form>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Social</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Connect With Us</h2>
            <p className="mt-5 leading-7 text-muted-foreground">Follow along for new listings, member stories, and product updates.</p>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="group flex items-center gap-3 rounded-2xl border border-border bg-background p-4 transition-all hover:border-highlight hover:bg-highlight/10 hover:text-highlight-foreground">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-primary transition-colors group-hover:bg-highlight group-hover:text-highlight-foreground">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0 truncate text-sm font-semibold">{label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-border bg-background p-6">
              <p className="font-display font-bold">Reach us directly</p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-3"><Mail className="size-4 text-highlight" /><a className="hover:text-foreground" href="mailto:support@flexmystuff.com">support@flexmystuff.com</a></li>
                <li className="flex items-center gap-3"><Mail className="size-4 text-highlight" /><a className="hover:text-foreground" href="mailto:hello@flexmystuff.com">hello@flexmystuff.com</a></li>
                <li className="flex items-center gap-3"><Phone className="size-4 text-highlight" /><a className="hover:text-foreground" href="tel:+18005550199">+1 (800) 555-0199</a></li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-sm font-semibold text-foreground">{label}</span>
      {children}
    </label>
  );
}

import whiteLogoAsset from "@/assets/flex-my-stuff-logo-white.png.asset.json";

function SiteFooter({ isAuthenticated }: { isAuthenticated: boolean }) {
  const quickLinks = [
    { label: "Find a Flex", href: "/explore" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Flex an Item", href: "/add-listing" },
    { label: "My Account", href: isAuthenticated ? "/dashboard" : "/signin" },
    { label: "Contact", href: "#contact" },
  ] as const;

  const socials = [
    { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
    { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
    { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
    { label: "X / Twitter", href: "https://x.com", Icon: Twitter },
  ] as const;

  return (
    <footer className="bg-[#111111] py-14 text-white">
      <Container>
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
          {/* Left — Logo & description */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Link to="/" aria-label="Flex My Stuff home" className="inline-block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BDD328]/50">
              <img
                src={whiteLogoAsset.url}
                alt="Flex My Stuff"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">
              Flex My Stuff helps people access what they need and earn from what they own through a trusted peer-to-peer rental marketplace.
            </p>
          </div>

          {/* Middle — Quick Links */}
          <div className="text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#BDD328]">Quick Links</p>
            <ul className="mt-5 space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  {href.startsWith("#") ? (
                    <a href={href} className="text-sm text-white/60 transition-colors hover:text-[#BDD328]">{label}</a>
                  ) : (
                    <Link to={href} className="text-sm text-white/60 transition-colors hover:text-[#BDD328]">{label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Social */}
          <div className="text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#BDD328]">Social Media</p>
            <ul className="mt-5 flex items-center justify-center gap-3 md:justify-start">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-full bg-white/8 text-white/70 transition-colors hover:bg-[#BDD328] hover:text-[#111111]"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Flex My Stuff. All Rights Reserved.</p>
          <p>Borrow more. Buy less. Live better.</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: readonly [string, string][] }) { return <div><p className="font-display font-bold">{title}</p><ul className="mt-4 space-y-3">{links.map(([label, href]) => <li key={label}><a className="text-sm text-primary-foreground/60 transition-colors hover:text-highlight" href={href}>{label}</a></li>)}</ul></div>; }
