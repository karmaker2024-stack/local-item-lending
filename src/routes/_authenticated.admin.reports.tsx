import { createFileRoute } from "@tanstack/react-router";
import { Flag } from "lucide-react";
import { RoutePage } from "@/components/layout/route-page";
export const Route = createFileRoute("/_authenticated/admin/reports")({ component: () => <RoutePage privateArea admin title="Reports & safety" description="Triage member reports, listing concerns, disputes, and trust incidents." icon={Flag} /> });