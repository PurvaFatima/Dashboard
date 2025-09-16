// Import utility function for conditional class names
import { cn } from "@/lib/utils"

// Import UI components
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { CheckCircle2Icon } from "lucide-react"
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"

// Import form handling and validation
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../validationSchemas"

// React and state management
import { useState } from "react"

// Firebase authentication
import { auth, googleProvider } from "@/firebase"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"

// Router
import { useNavigate, Link } from "react-router-dom"

const LoginForm = ({ className, ...props }) => { 
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  })

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div
      className={cn(
        "flex min-h-svh w-full items-center justify-center p-6 md:p-10",
        className
      )}
      {...props}
    >
      {/* CHANGED: card now adapts to dark mode */}
      <Card className="w-full sm:w-1/2 lg:w-1/3 p-6 shadow-2xl rounded-2xl border border-gray-200 
        bg-white/90 backdrop-blur 
        dark:bg-[#25314d]/90 dark:border-gray-700 dark:shadow-lg">
        
        {/* Header */}
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Login to your account
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        {error && (
          <Alert variant="destructive">
            <CheckCircle2Icon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-6">
              {/* Email Field */}
              <div className="grid gap-3">
                <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
                {/* CHANGED: input styles for dark mode */}
                <Input
                  type="email"
                  {...register("email")}
                  placeholder="m@example.com"
                  required
                  className="dark:bg-[#1f2a44] dark:text-white dark:placeholder-gray-400 
                    dark:border-gray-600 focus:dark:border-blue-400"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password" className="dark:text-gray-200">Password</Label>
                </div>
                <Input
                  type="password"
                  {...register("password")}
                  required
                  className="dark:bg-[#1f2a44] dark:text-white dark:placeholder-gray-400 
                    dark:border-gray-600 focus:dark:border-blue-400"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}

                {/* Forgot Password */}
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline
                    text-gray-700 dark:text-gray-300"
                >
                  Forgot your password?
                </a>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <Button 
                  type="submit" 
                  className="w-full hover:shadow-md dark:hover:shadow-blue-900/50" 
                  disabled={!isValid}
                >
                  Login
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleLogin}
                  className="w-full text-white 
                    dark:bg-blue-600 dark:hover:bg-blue-700 dark:border-none 
                    hover:shadow-md dark:hover:shadow-blue-900/50"
                >
                  Login with Google
                </Button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
              Don’t have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginForm
