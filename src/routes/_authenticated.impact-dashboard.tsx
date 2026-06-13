import { createFileRoute } from "@tanstack/react-router";
import { ImpactDashboard } from "@/components/impact/impact-dashboard";

export const Route = createFileRoute("/_authenticated/impact-dashboard")({
  component: ImpactDashboard,
  head: () => ({
    meta: [
      { title: "Sustainability Impact — Flex My Stuff" },
      { name: "description", content: "Track the carbon, waste, savings, and community impact created by sharing useful items." },
    ],
  }),
});