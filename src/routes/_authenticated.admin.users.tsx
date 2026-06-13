import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { RoutePage } from "@/components/layout/route-page";
export const Route = createFileRoute("/_authenticated/admin/users")({ component: () => <RoutePage privateArea admin title="User management" description="Review member status, verification, activity, and account actions." icon={Users} searchPlaceholder="Search users" /> });