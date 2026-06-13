import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { RoutePage } from "@/components/layout/route-page";
export const Route = createFileRoute("/_authenticated/settings")({ component: () => <RoutePage privateArea title="Settings" description="Manage account security, notifications, privacy, payments, and location preferences." icon={Settings} /> });