import { UtilizationChart } from "@/components/utilization-chart"
import { Skeleton } from "@/components/ui/skeleton"
import useGetCamera from "@/query/use-get-camera"
import useGetCpuGraph from "@/query/graph/use-get-cpu-graph"
import useGetMemoryGraph from "@/query/graph/use-get-memory-graph"
import useGetStorageGraph from "@/query/graph/use-get-storage"
import { GraphData } from "@/types/graph"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCcw } from "lucide-react"

interface GraphOverviewProps {
    isAdmin: boolean
}

export default function GraphOverview({ isAdmin }: GraphOverviewProps) {
    // Using the same query to detect loading state
    const { data: cpuData, isPending: isPendingCpu, isError: isErrorCpu, refetch: refetchCpu, error: errorCpu } = useGetCpuGraph({
        key: "cpu-graph",
        config: {},
        extract: true,
    })

    const { data: memoryData, isPending: isPendingMemory, isError: isErrorMemory, refetch: refetchMemory, error: errorMemory } = useGetMemoryGraph({
        key: "memory-graph",
        config: {},
        extract: true,
    })

    const { data: storageData, isPending: isPendingStorage, isError: isErrorStorage, refetch: refetchStorage, error: errorStorage } = useGetStorageGraph({
        key: "storage-graph",
        config: {},
        extract: true,
    })

    if (isPendingCpu || isPendingMemory || isPendingStorage) {
        return (
            <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="p-6 border rounded-lg space-y-2">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-50 w-full" />
                    </Card>
                    <Card className="p-6 border rounded-lg space-y-2">
                        <Skeleton className="h-6 w-36" />
                        <Skeleton className="h-50 w-full" />
                    </Card>
                    <Card className="p-6 border rounded-lg space-y-2">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-50 w-full" />
                    </Card>
                </div>

                {/* <div className="w-full">
          <Card className="p-6 border rounded-lg space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-50 w-full" />
          </Card>
        </div> */}
            </>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isAdmin && (
                <>
                </>
            )}
            {isErrorCpu ? (
                <Card className="p-10 border rounded-lg space-y-2 bg-red-100 flex flex-col items-center justify-center gap-4 shadow-lg">
                    <AlertTriangle className='size-12 text-destructive animate-bounce' />
                    <div className='text-center'>
                        <h3 className='text-lg font-semibold'>Terjadi Kesalahan</h3>
                        <p className='text-sm text-muted-foreground'>{errorCpu?.message}</p>
                    </div>
                    <Button
                        variant='destructive'
                        size='sm'
                        className="flex items-center gap-2 px-6 py-2 rounded-full shadow transition-all duration-200"
                        onClick={() => refetchCpu()}
                    >
                        <RefreshCcw className='size-5' />
                        <span className="font-semibold">Coba Muat Ulang</span>
                    </Button>
                </Card>
            ) : (
                <UtilizationChart
                    title="CPU Utilization"
                    data={cpuData}
                />
            )}

            {isErrorMemory ? (
                <Card className="p-10 border rounded-lg space-y-2 bg-red-100 flex flex-col items-center justify-center gap-4 shadow-lg">
                    <AlertTriangle className='size-12 text-destructive animate-bounce' />
                    <div className='text-center'>
                        <h3 className='text-lg font-semibold'>Terjadi Kesalahan</h3>
                        <p className='text-sm text-muted-foreground'>{errorMemory?.message}</p>
                    </div>
                    <Button
                        variant='destructive'
                        size='sm'
                        className="flex items-center gap-2 px-6 py-2 rounded-full shadow transition-all duration-200"
                        onClick={() => refetchMemory()}
                    >
                        <RefreshCcw className='size-5' />
                        <span className="font-semibold">Coba Muat Ulang</span>
                    </Button>
                </Card>
            ) : (
                <UtilizationChart
                    title="Memory Utilization"
                    data={memoryData}
                />
            )}

            {isErrorStorage ? (
                <Card className="p-10 border rounded-lg space-y-2 bg-red-100 flex flex-col items-center justify-center gap-4 shadow-lg">
                    <AlertTriangle className='size-12 text-destructive animate-bounce' />
                    <div className='text-center'>
                        <h3 className='text-lg font-semibold'>Terjadi Kesalahan</h3>
                        <p className='text-sm text-muted-foreground'>{errorStorage?.message}</p>
                    </div>
                    <Button
                        variant='destructive'
                        size='sm'
                        className="flex items-center gap-2 px-6 py-2 rounded-full shadow transition-all duration-200"
                        onClick={() => refetchStorage()}
                    >
                        <RefreshCcw className='size-5' />
                        <span className="font-semibold">Coba Muat Ulang</span>
                    </Button>
                </Card>
            ) : (
                <UtilizationChart
                    title="Storage Utilization"
                    data={storageData}
                />
            )}
        </div>
    )
}