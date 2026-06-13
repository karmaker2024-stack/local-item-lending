import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/auth/auth-page";
export const Route = createFileRoute("/login")({ head: () => ({ meta: [{ title: "Sign In | Flex My Stuff" }, { name: "description", content: "Sign in to manage your local sharing activity." }] }), component: () => <AuthPage mode="login" /> });