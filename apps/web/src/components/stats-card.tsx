import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  iconBgColor?: string
  className?: string
}

export function StatsCard({ 
  title, 
  value, 
  icon, 
  iconBgColor = "bg-blue-500",
  className 
}: StatsCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full text-white",
            iconBgColor
          )}>
            {icon}
          </div>
          <div className="flex-1 ">
            <p className="text-2xl font-bold text-primary">{value}</p>
            <p className="text-sm text-muted-foreground font-semibold">{title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
