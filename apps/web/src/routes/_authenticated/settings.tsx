import { createFileRoute } from '@tanstack/react-router'
import { Bell } from "lucide-react"
import { Header } from "@/components/layout/header"
import { ProfileDropdown } from "@/components/layout/profile-dropdown"
import { Button } from "@/components/ui/button"


export const Route = createFileRoute('/_authenticated/settings')({
  component: Settings,
})

function Settings() {
  return (
    <>
    <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <Button variant='ghost' size="icon" className='hover:bg-accent hover:text-accent-foreground rounded'>
            <Bell />
          </Button>
          <ProfileDropdown />
        </div>
      </Header>
    <div className="p-6">
      
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p>Settings page content will be here.</p>
    </div>
    </>
  )
}