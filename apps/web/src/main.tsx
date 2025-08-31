import { StrictMode } from "react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import Loader from "./components/loader";
import { routeTree } from "./routeTree.gen";
import {
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { handleServerError } from "./lib/handle-server-error";
import { toast } from "sonner"

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: (failureCount, error) => {
				if (import.meta.env.DEV) console.log({ failureCount, error })

				if (failureCount >= 0 && import.meta.env.DEV) return false
				if (failureCount > 3 && import.meta.env.PROD) return false

				return !(
					error instanceof AxiosError &&
					[401, 403].includes(error.response?.status ?? 0)
				)
			},
			refetchOnWindowFocus: import.meta.env.PROD,
			staleTime: 10 * 1000,
		},
		mutations: {
			onError: (error) => {
				handleServerError(error)

				if (error instanceof AxiosError) {
					if (error.response?.status === 304) {
						toast.error('Content not modified!', {
							description: 'Konten tidak diubah',
						})
					}
				}
			},
		},
	},
	queryCache: new QueryCache({
		onError: (error) => {
			if (error instanceof AxiosError) {
				if (error.response?.status === 401) {
					toast.error('Session expired!', {
						description: 'Sesi anda telah kadaluarsa, silahkan login kembali',
					})
					
					router.navigate({ to: "/" })
				}
				if (error.response?.status === 500) {
					toast.error('Internal Server Error!', {
						description: 'Terjadi kesalahan pada server, silahkan coba lagi nanti',
					})
				}
			}
		},
	}),
})

const router = createRouter({
	routeTree,
	context: { queryClient },
	defaultPreload: 'intent',
	defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app");

if (!rootElement) {
	throw new Error("Root element not found");
}

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
			</QueryClientProvider>
		</StrictMode>
	)
}
