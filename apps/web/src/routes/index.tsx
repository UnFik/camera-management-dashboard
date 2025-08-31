import Login from "@/features/login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Login,
});
