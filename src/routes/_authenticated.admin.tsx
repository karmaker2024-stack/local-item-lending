import { createFileRoute } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { RoutePage } from "@/components/layout/route-page";
export const Route = createFileRoute("/_authenticated/admin")({ component: () => <RoutePage privateArea admin title="Admin overview" description="Monitor marketplace health, trust signals, moderation workload, and member activity." icon={Shield} /> });