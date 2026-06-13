import { createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { RoutePage } from "@/components/layout/route-page";
export const Route = createFileRoute("/_authenticated/saved-items")({ component: () => <RoutePage privateArea title="Saved items" description="Keep promising local listings close for when you need them." icon={Heart} /> });