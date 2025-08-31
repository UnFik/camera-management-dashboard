import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function DashboardHeader() {
  return (
    <header className="flex h-14 items-center justify-between bg-green-600 px-4 text-white">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-white hover:bg-green-700" />
      </div>
      
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative text-white hover:bg-green-700"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-xs rounded-full flex items-center justify-center">
            0
          </span>
        </Button>
      </div>
    </header>
  )
}
