import { createFileRoute } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { RoutePage } from "@/components/layout/route-page";
export const Route = createFileRoute("/_authenticated/impact-dashboard")({ component: () => <RoutePage privateArea title="Your impact" description="Track money saved, items shared, purchases avoided, and local connections made." icon={Leaf} eyebrow="Sustainability impact" /> });