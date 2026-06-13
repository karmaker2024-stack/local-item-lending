import { createFileRoute } from "@tanstack/react-router";
import drillImage from "@/assets/listing-drill.jpg";
import { ItemDetails } from "@/components/item/item-details";

export const Route = createFileRoute("/item/$id")({
  head: () => ({
    meta: [
      { title: "Cordless Drill Kit Rental | Flex My Stuff" },
      { name: "description", content: "Rent a complete cordless drill kit from a verified local owner for $12 per day." },
      { property: "og:title", content: "Cordless Drill Kit Rental | Flex My Stuff" },
      { property: "og:description", content: "A complete, highly rated cordless drill kit available near Oakwood." },
      { property: "og:image", content: drillImage },
      { name: "twitter:image", content: drillImage },
    ],
  }),
  component: ItemDetails,
});