import { AxiosResponse } from 'axios'
import { useQuery } from '@tanstack/react-query'
import request from '@/utils/request'

export interface CameraOverview {
    total_cameras: string
    active_cameras: string[]
    inactive_cameras: string[]
}

export const fetchCamera = ({
    queryKey,
}: {
    queryKey: [string, any]
}) => {
    const params = queryKey[1]
    return request({
        url: `/camera`,
        method: 'get',
        params,
    })
}

const useGetCamera = ({
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
        queryFn: fetchCamera,
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

export default useGetCamera
