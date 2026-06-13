import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard } from "lucide-react";
import { RoutePage } from "@/components/layout/route-page";
export const Route = createFileRoute("/_authenticated/dashboard")({ component: () => <RoutePage privateArea title="Your sharing hub" description="See requests, upcoming handoffs, messages, and activity at a glance." icon={LayoutDashboard} eyebrow="Dashboard" /> });