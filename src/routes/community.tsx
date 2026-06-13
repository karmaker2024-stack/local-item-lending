import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { RoutePage } from "@/components/layout/route-page";
export const Route = createFileRoute("/community")({ head: () => ({ meta: [{ title: "Our Community | Flex My Stuff" }, { name: "description", content: "Meet the local community making sharing work." }] }), component: () => <RoutePage title="Stronger neighborhoods" description="See how people nearby are saving money, reducing waste, and helping each other." icon={Users} /> });