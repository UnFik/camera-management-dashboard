import * as React from "react"
import {
  LayoutDashboard,
  Settings,
  Camera,
  User,
  Settings2
} from "lucide-react"

import { NavMain } from "@/components/layout/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SidebarData } from "@/types/sidebar"

// Camera Management Navigation Data
const sidebarData: SidebarData = {
  navGroups: [
    {
      title: "Main",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          title: "Settings",
          icon: Settings,
          items: [
            {
              title: "General Settings", 
              url: "/settings",
              icon: Settings2,
            },
          ],
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" className="!bg-white" {...props}>
      <SidebarHeader>
        <div className="flex flex-col items-center">
          <img src="/logo.svg" alt="Logo Asta Vision Computer" />
          <span className="text-sm font-bold group-data-[collapsible=offcanvas]:hidden">
            ASTA COMPUTER VISION
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain navGroups={sidebarData.navGroups} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
