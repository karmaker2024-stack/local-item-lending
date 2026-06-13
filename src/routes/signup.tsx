import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/auth/auth-page";
export const Route = createFileRoute("/signup")({ head: () => ({ meta: [{ title: "Join Flex My Stuff" }, { name: "description", content: "Create an account and start sharing with your community." }] }), component: () => <AuthPage mode="signup" /> });