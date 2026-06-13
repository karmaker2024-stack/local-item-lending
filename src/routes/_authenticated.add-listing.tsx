import { createFileRoute } from "@tanstack/react-router";
import { ListingWizard } from "@/components/listing/listing-wizard";

export const Route = createFileRoute("/_authenticated/add-listing")({
  head: () => ({
    meta: [
      { title: "List an Item | Flex My Stuff" },
      { name: "description", content: "Create and publish a trusted local rental listing in six guided steps." },
      { property: "og:title", content: "List an Item | Flex My Stuff" },
      { property: "og:description", content: "Share useful items with your community through a simple guided listing flow." },
    ],
  }),
  component: ListingWizard,
});