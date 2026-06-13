import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Eye, EyeOff, KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrandLogo } from "@/components/brand/brand-logo";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";

export function AuthPage({ mode }: { mode: "login" | "signup" }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const signup = mode === "signup";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setMessage("");
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    const result = signup ? await supabase.auth.signUp({ email, password }) : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (result.error) { setMessage(result.error.message); return; }
    if (signup && !result.data.session) { setMessage("Check your email to confirm your account."); return; }
    navigate({ to: "/dashboard" });
  }

  async function handleGoogle() {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/dashboard` });
    if (result.error) setMessage(result.error.message);
    if (!result.redirected && !result.error) navigate({ to: "/dashboard" });
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col p-6 sm:p-10">
        <Link to="/" aria-label="Flex My Stuff home" className="w-fit rounded-xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"><BrandLogo className="h-18 w-32" /></Link>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">{signup ? "Join your neighborhood" : "Welcome back"}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">{signup ? "Create your account" : "Sign in to keep sharing"}</h1>
          <p className="mt-3 text-muted-foreground">{signup ? "Borrow more. Buy less. Meet good people nearby." : "Manage your listings, rentals, and conversations."}</p>
          <Button className="mt-8 w-full" onClick={handleGoogle} type="button" variant="outline">Continue with Google</Button>
          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground"><span className="h-px flex-1 bg-border" />or email<span className="h-px flex-1 bg-border" /></div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div><label className="mb-2 block text-sm font-semibold" htmlFor="email">Email address</label><Input autoComplete="email" id="email" name="email" placeholder="you@example.com" required type="email" /></div>
            <div><label className="mb-2 block text-sm font-semibold" htmlFor="password">Password</label><div className="relative"><Input autoComplete={signup ? "new-password" : "current-password"} id="password" minLength={8} name="password" required type={showPassword ? "text" : "password"} /><Button aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-1 top-1/2 -translate-y-1/2" onClick={() => setShowPassword((value) => !value)} size="icon" type="button" variant="ghost">{showPassword ? <EyeOff /> : <Eye />}</Button></div></div>
            {message && <p aria-live="polite" className="rounded-xl bg-muted p-3 text-sm text-foreground">{message}</p>}
            <Button className="w-full" disabled={loading} size="lg" type="submit">{loading ? "Please wait…" : signup ? "Create account" : "Sign in"}<ArrowRight /></Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">{signup ? "Already a member?" : "New to Flex My Stuff?"} <Link className="font-bold text-primary underline-offset-4 hover:underline" to={signup ? "/login" : "/signup"}>{signup ? "Sign in" : "Create an account"}</Link></p>
        </div>
      </div>
      <div className="hidden place-items-center bg-primary p-12 text-primary-foreground lg:grid"><div className="max-w-lg"><KeyRound className="size-12 text-highlight" /><p className="mt-8 font-display text-4xl font-semibold leading-tight">Trust starts with knowing who you’re sharing with.</p><p className="mt-5 leading-7 text-primary-foreground/75">Secure accounts help neighbors build reputations, communicate clearly, and share with confidence.</p></div></div>
    </div>
  );
}