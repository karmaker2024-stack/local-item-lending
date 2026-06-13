import { createFileRoute } from "@tanstack/react-router";
import { MessagingSystem } from "@/components/messages/messaging-system";

export const Route = createFileRoute("/_authenticated/messages/$threadId")({
  component: MessageThread,
  head: () => ({
    meta: [
      { title: "Conversation — Flex My Stuff" },
      { name: "description", content: "Coordinate a Flex My Stuff booking securely." },
    ],
  }),
});

function MessageThread() {
  const { threadId } = Route.useParams();
  return <MessagingSystem key={threadId} threadId={threadId} />;
}
