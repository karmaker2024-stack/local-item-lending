import { createFileRoute } from "@tanstack/react-router";
import { PackageSearch } from "lucide-react";
import { RoutePage } from "@/components/layout/route-page";
export const Route = createFileRoute("/item/$id")({ head: ({ params }) => ({ meta: [{ title: `Item ${params.id} | Flex My Stuff` }, { name: "description", content: "View availability, owner details, and rental terms." }] }), component: ItemPage });
function ItemPage() { const { id } = Route.useParams(); return <RoutePage title={`Item ${id}`} description="Review availability, rental terms, pickup details, and the owner’s reputation." icon={PackageSearch} eyebrow="Item details" />; }