import { createFileRoute } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { RoutePage } from "@/components/layout/route-page";
export const Route = createFileRoute("/_authenticated/profile")({ component: () => <RoutePage privateArea title="Your profile" description="Build trust with a friendly introduction, verification, reviews, and sharing history." icon={UserRound} /> });