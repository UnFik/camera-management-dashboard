import { AppSidebar } from '@/components/layout/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import useGetUser from '@/query/use-get-user'
import { useAuth } from '@/stores/auth-store'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  const { accessToken, user, setUser } = useAuth()
  const navigate = useNavigate()

  const shouldFetch = !user && !!accessToken

  const { data: userData } = useGetUser({
    key: "user-profile",
    config: {
      enabled: shouldFetch
    }
  })

  useEffect(() => {
    if (userData && !user) {
      setUser(userData)
    }

    if (!user && !accessToken) {
      navigate({ to: '/' })
    }
  }, [userData, user, setUser])


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col min-h-screen overflow-auto">
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}