import { createFileRoute } from "@tanstack/react-router";
import { ListingWizard } from "@/components/listing/listing-wizard";

export const Route = createFileRoute("/_authenticated/add-listing")({
  head: () => ({
    meta: [
      { title: "Flex an Item | Flex My Stuff" },
      { name: "description", content: "Flex an item with your community in six guided steps." },
      { property: "og:title", content: "Flex an Item | Flex My Stuff" },
      { property: "og:description", content: "Share useful items with your community through a simple guided listing flow." },
    ],
  }),
  component: ListingWizard,
});