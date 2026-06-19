import { createFileRoute } from "@tanstack/react-router";
import { ExploreMarketplace } from "@/components/explore/explore-marketplace";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Find a Flex | Flex My Stuff" },
      { name: "description", content: "Find a Flex near you — search available Flexes by date, location, category, condition, price, and rating." },
      { property: "og:title", content: "Find a Flex | Flex My Stuff" },
      { property: "og:description", content: "Browse available Flexes near you. Filter by date, location, condition, price, and rating." },
    ],
  }),
  component: ExploreMarketplace,
});
