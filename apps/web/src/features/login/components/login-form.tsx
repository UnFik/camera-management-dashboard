"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useState } from "react"
import { AlertTriangle, Loader2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import useLogin from "@/mutations/use-login"
import { useNavigate } from "@tanstack/react-router"
import { useAuth } from "@/stores/auth-store"
import useGetUser from "@/query/use-get-user"

const LoginSchema = z.object({
  username: z.string().min(1, {
    message: "Email/Username harus diisi.",
  }).refine((value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value) || value.length >= 3
  }, {
    message: "Masukkan email yang valid atau username minimal 3 karakter.",
  }),
  password: z.string().min(1, {
    message: "Password harus diisi.",
  }),
})

export function LoginForm() {
  const navigate = useNavigate()
  const { setAccessToken } = useAuth()
  const [loginError, setLoginError] = useState<string | null>(null)
  
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const { mutate, isPending, isSuccess } = useLogin({
    onSuccess: async (data) => {
      toast.success("Login berhasil!", {
        description: `Selamat datang`,
      })
      setAccessToken(data.data.token)
      navigate({ to: "/dashboard" })
    },
    onError: (data) => {
      console.log(data)
      setLoginError("Check your Email/Username or Password again")
    }
  })


  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col items-start gap-4 text-center">
          <div className="flex flex-row items-end gap-3">
            <img src="/logo.svg" alt="Logo Nusapala Berkah Autonomous" />
            <h1 className="text-7xl font-bold">Login</h1>
          </div>
          <p className="text-4xl font-bold">Login Page</p>
        </div>
        <div className="grid gap-4 ">
          {loginError && (
            <Alert variant="destructive" className="relative">
              <AlertDescription className="!text-black pr-8">
                {loginError}
              </AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 h-6 w-6 p-0 hover:bg-transparent"
                onClick={() => setLoginError(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email/Username</FormLabel>
                <FormControl>
                  <Input placeholder="Email/Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className='mr-2 w-4 h-4 animate-spin' />
            ) : (
              'Login'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
