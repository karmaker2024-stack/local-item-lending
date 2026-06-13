import { createFileRoute } from "@tanstack/react-router";
import { MessagingSystem } from "@/components/messages/messaging-system";

export const Route = createFileRoute("/_authenticated/messages/")({
  component: () => <MessagingSystem />,
  head: () => ({
    meta: [
      { title: "Messages — Flex My Stuff" },
      { name: "description", content: "Coordinate bookings, pickups, returns, and questions with your community." },
    ],
  }),
});