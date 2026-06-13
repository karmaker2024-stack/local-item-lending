import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";
import { RoutePage } from "@/components/layout/route-page";
export const Route = createFileRoute("/_authenticated/my-rentals")({ component: () => <RoutePage privateArea title="My rentals" description="Track requests, upcoming pickups, active rentals, and returns." icon={CalendarDays} /> });