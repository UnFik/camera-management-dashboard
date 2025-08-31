import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import {
	HeadContent,
	Outlet,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import "../index.css";

export interface RouterAppContext {

}

export const Route = createRootRouteWithContext<RouterAppContext>()({
	component: RootComponent,
	head: () => ({
		meta: [
			{
				title: "Asta Computer Vision",
			},
			{
				name: "description",
				content: "Asta Computer Vision is a web application",
			},
		],
		links: [
			{
				rel: "icon",
				href: "/favicon.ico",
			},
		],
	}),
});

function RootComponent() {
	return (
		<>
			<HeadContent />
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				disableTransitionOnChange
				storageKey="vite-ui-theme"
			>
				<div className="min-h-screen font-sans">
					<Outlet />
				</div>
				<Toaster richColors />
			</ThemeProvider>
			{import.meta.env.MODE === 'development' && (
				<>
					<ReactQueryDevtools buttonPosition='bottom-left' />
					<TanStackRouterDevtools position='bottom-right' />
				</>
			)}
		</>
	);
}
