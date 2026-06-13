import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home/homepage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Borrow More. Buy Less. | Flex My Stuff" },
      { name: "description", content: "Rent tools, gear, equipment and everyday items from trusted people in your community." },
      { property: "og:title", content: "Borrow More. Buy Less. | Flex My Stuff" },
      { property: "og:description", content: "Find useful items nearby, save money, and help your community waste less." },
    ],
  }),
  component: HomePage,
});
