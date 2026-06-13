import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/dashboard/dashboard";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Dashboard — Flex My Stuff" },
      { name: "description", content: "Your personal sharing hub. Manage rentals, listings, messages, and track your sustainability impact." },
    ],
  }),
});
