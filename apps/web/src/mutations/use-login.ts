import { useMutation } from '@tanstack/react-query'
import request from '@/utils/request'
import { AxiosError, AxiosResponse } from 'axios'

export interface LoginInput {
  username: string
  password: string
}

export const login = (input: LoginInput) => {
  return request({
    url: `/login`,
    method: 'post',
    data: input,
  })
}

type CallbackParams = {
  onSuccess?: (
    data: AxiosResponse,
    variables: LoginInput,
    context: unknown
  ) => void
  onError?: (
    error: AxiosError,
    variables: LoginInput,
    context: unknown
  ) => void
  onSettled?: (
    data: AxiosResponse | undefined,
    error: AxiosError | null,
    variables: LoginInput,
    context: unknown
  ) => void
  config?: object
}

const useLogin = ({
  onSuccess,
  onError,
  onSettled,
  config = {},
}: CallbackParams = {}) => {
  return useMutation({
    mutationFn: login,
    onSuccess,
    onError,
    onSettled,
    ...config,
  })
}

export default useLogin
