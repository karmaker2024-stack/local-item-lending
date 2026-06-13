import { createFileRoute } from "@tanstack/react-router";
import { List } from "lucide-react";
import { RoutePage } from "@/components/layout/route-page";
export const Route = createFileRoute("/_authenticated/my-listings")({ component: () => <RoutePage privateArea title="My listings" description="Manage availability, pricing, photos, and incoming requests." icon={List} /> });