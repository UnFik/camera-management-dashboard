import { Bell } from "lucide-react"
import { Header } from "@/components/layout/header"
import { ProfileDropdown } from "@/components/layout/profile-dropdown"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import StatsOverview from "./components/stats-overview"
import GraphOverview from "./components/graph-overview"
import { useAuth } from "@/stores/auth-store"
import { Skeleton } from "@/components/ui/skeleton"

export default function Dashboard() {
  const { user } = useAuth()

  const isAdmin = user?.username === "admin"
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
      <div className="space-y-6 pt-4">
        <Card>
          <CardContent>
            <h1 className="text-2xl font-bold">Hello,  {user?.username} {!user && <span className="inline-block"><Skeleton className="w-20 h-7"></Skeleton></span>} </h1>
            <p className="text-muted-foreground">Have a great working day</p>
          </CardContent>
        </Card>
        
        {/* Stats Cards */}
        <StatsOverview />

        {/* Charts */}
        <GraphOverview isAdmin={isAdmin} />

        {/* Footer */}
        <div className="text-left text-sm text-muted-foreground">
          Copyright © 2025 <span className="font-semibold">Nusapala Berkah Autonomous</span>
        </div>
      </div>
    </>
  )
}
