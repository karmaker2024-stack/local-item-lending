import { createFileRoute } from "@tanstack/react-router";
import { Tags } from "lucide-react";
import { RoutePage } from "@/components/layout/route-page";
export const Route = createFileRoute("/categories")({ head: () => ({ meta: [{ title: "Item Categories | Flex My Stuff" }, { name: "description", content: "Browse local rentals by category." }] }), component: () => <RoutePage title="Browse categories" description="From power tools to party gear, find what you need without buying it." icon={Tags} /> });