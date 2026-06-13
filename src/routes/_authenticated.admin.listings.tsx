import { createFileRoute } from "@tanstack/react-router";
import { List } from "lucide-react";
import { RoutePage } from "@/components/layout/route-page";
export const Route = createFileRoute("/_authenticated/admin/listings")({ component: () => <RoutePage privateArea admin title="Listing moderation" description="Review active, flagged, removed, and pending marketplace listings." icon={List} searchPlaceholder="Search listings" /> });