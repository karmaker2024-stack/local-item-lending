import { createFileRoute } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { RoutePage } from "@/components/layout/route-page";
export const Route = createFileRoute("/explore")({ head: () => ({ meta: [{ title: "Explore Nearby Items | Flex My Stuff" }, { name: "description", content: "Browse useful items available to rent near you." }] }), component: () => <RoutePage title="Explore nearby" description="Discover useful things shared by trusted people in your community." icon={Compass} searchPlaceholder="Search items, categories, or neighborhoods" /> });