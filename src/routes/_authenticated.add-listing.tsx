import { createFileRoute } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";
import { RoutePage } from "@/components/layout/route-page";
export const Route = createFileRoute("/_authenticated/add-listing")({ component: () => <RoutePage privateArea title="List an item" description="Share the essentials, set your terms, and make something useful available nearby." icon={PlusCircle} /> });