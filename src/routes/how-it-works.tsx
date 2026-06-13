import { createFileRoute } from "@tanstack/react-router";
import { CircleHelp } from "lucide-react";
import { RoutePage } from "@/components/layout/route-page";
export const Route = createFileRoute("/how-it-works")({ head: () => ({ meta: [{ title: "How It Works | Flex My Stuff" }, { name: "description", content: "Learn how borrowing, lending, and renting works." }] }), component: () => <RoutePage title="Sharing made simple" description="Find it, request it, pick it up, and return it—with trust built into every step." icon={CircleHelp} /> });