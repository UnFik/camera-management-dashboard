import { LoginForm } from './components/login-form'

export default function Login() {
  return (
    <div className="relative min-h-svh flex flex-col">
      <div className="grid flex-1 lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">          
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-lg">
              <LoginForm />
            </div>
          </div>
        </div>
        
        <div className="relative hidden lg:block ">
          <img
            src="/assets/illustration.svg"
            alt="Login Illustration"
            className="absolute inset-0 h-[103%] w-full object-cover"
          />
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 py-4 ">
        Copyright © 2025 <span className='font-bold'>Nusapala Berkah Autonomous</span>
      </div>
    </div>
  )
}
