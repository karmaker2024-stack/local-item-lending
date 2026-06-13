import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async () => {
    const { data, error } = await supabase.from("user_roles").select("role").eq("role", "admin").maybeSingle();
    if (error || data?.role !== "admin") throw redirect({ to: "/dashboard" });
  },
  component: () => <Outlet />,
});