import { Video, VideoOff } from "lucide-react"
import { StatsCard } from "@/components/stats-card"
import { Skeleton } from "@/components/ui/skeleton"
import useGetCamera, { CameraOverview } from "@/query/use-get-camera"
import { Card, CardContent } from "@/components/ui/card"

import { AlertTriangle, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function StatsOverview() {
    const { data, isPending, isError, error, refetch } = useGetCamera({
        key: "camera-overview",
        config: {},
        extract: true,
    })

    const cameraData: CameraOverview = data

    if (isPending) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index}>
                        <CardContent>
                            <div className="flex items-center space-x-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full text-white">
                                    <Skeleton className="h-13 w-13 rounded-full" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-6 w-6 rounded" />
                                    <Skeleton className="h-4 w-26 rounded" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    if (isError) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1 md:col-span-3 p-8 border rounded-lg bg-red-100 flex flex-col items-center justify-center gap-4 shadow-lg">
                    <AlertTriangle className='size-8 text-destructive animate-bounce' />
                    <div className='text-center'>
                        <p className='text-sm text-muted-foreground'>{error?.message}</p>
                    </div>
                    <Button
                        variant='destructive'
                        size='icon'
                        className="flex items-center gap-2 px-6 py-2 rounded-full shadow transition-all duration-200"
                        onClick={() => refetch()}
                    >
                        <RefreshCcw className='size-5' />
                    </Button>
                </Card>
            </div>
        )
    }


return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
            title="Camera Total"
            value={cameraData.total_cameras}
            icon={<Video className="h-6 w-6 text-foreground" />}
            iconBgColor="bg-yellow-400"
        />
        <StatsCard
            title="Active Camera"
            value={cameraData.active_cameras.length}
            icon={<Video className="h-6 w-6" />}
            iconBgColor="bg-green-500"
        />
        <StatsCard
            title="Inactive Camera"
            value={cameraData.inactive_cameras.length}
            icon={<VideoOff className="h-6 w-6" />}
            iconBgColor="bg-red-500"
        />
    </div>
)
}
