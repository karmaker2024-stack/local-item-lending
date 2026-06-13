import { createFileRoute } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { RoutePage } from "@/components/layout/route-page";
export const Route = createFileRoute("/_authenticated/edit-listing")({ component: () => <RoutePage privateArea title="Edit listing" description="Update your item details, availability, price, and pickup preferences." icon={Pencil} /> });