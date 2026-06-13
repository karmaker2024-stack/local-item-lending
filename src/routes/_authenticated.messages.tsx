import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { RoutePage } from "@/components/layout/route-page";
export const Route = createFileRoute("/_authenticated/messages")({ component: () => <RoutePage privateArea title="Messages" description="Coordinate requests, handoffs, returns, and questions with owners and renters." icon={MessageCircle} searchPlaceholder="Search conversations" /> });