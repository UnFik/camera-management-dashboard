import { AxiosResponse } from 'axios'
import { useQuery } from '@tanstack/react-query'
import request from '@/utils/request'

export const fetchCpuGraph = ({
    queryKey,
}: {
    queryKey: [string, any]
}) => {
    const params = queryKey[1]
    return request({
        url: `/graph/cpu`,
        method: 'get',
        params,
    })
}

const useGetCpuGraph = ({
    key,
    params = {},
    config = {},
    extract = true,
}: {
    key: string
    params?: Record<string, any>
    config?: Record<string, any>
    extract?: boolean
}) => {
    return useQuery({
        queryKey: [key, params],
        queryFn: fetchCpuGraph,
        select: (data: AxiosResponse<any, any>) => {
            if (!data) return
            if (extract) {
                return data.data
            }
            return data
        },
        ...config,
    })
}

export default useGetCpuGraph
