import Cookies from 'js-cookie'

import { AuthUser } from '@/types/auth-user'
import { create } from 'zustand'

export const ACCESS_TOKEN = '4utht0k3n'

interface AuthState {
    auth: {
        user: AuthUser | null
        accessToken: string | null
        setAccessToken: (accessToken: string | null) => void
        setUser: (user: AuthUser | null) => void
        reset: () => void
    }
}

export const useAuthStore = create<AuthState>()((set) => {
    const cookieState = Cookies.get(ACCESS_TOKEN)
    const initToken = cookieState ? cookieState : ''

    // const initUser = 
    return {
        auth: {
            user: null,
            accessToken: initToken,
            setUser: (user) => {
                set((state) => ({
                    ...state,
                    auth: {
                        ...state.auth,
                        user
                    }
                }))
            },
            setAccessToken: (accessToken) =>
                set((state) => {
                  Cookies.set(ACCESS_TOKEN, accessToken!, { expires: 1/24 })
                  return { ...state, auth: { ...state.auth, accessToken } }
                }),
            reset: () =>
                set((state) => {
                    Cookies.remove(ACCESS_TOKEN)
                    
                    return {
                        ...state,
                        auth: { ...state.auth, user: null, accessToken: null },
                    }
                }),
        },
    }
})

export const useAuth = () => useAuthStore((state) => state.auth)
