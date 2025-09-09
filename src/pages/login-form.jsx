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


import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import {
  Alert,
  AlertDescription,
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

/**
 * LoginForm Component
 * Handles user login with Email/Password or Google Authentication.
 * Includes validation using React Hook Form + Zod.
 */

const LoginForm = ({ className, ...props }) => { 
  
  // Local state for form fields and error handling
  const [error, setError] = useState("")

  // React Hook Form setup with Zod schema
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  })

  // Router navigation hook
  const navigate = useNavigate()

  /**
   * Handle login with email and password
   */
  const onSubmit = async (data) => {
    console.log("Login Data:", data)
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      navigate("/dashboard") // Redirect to dashboard after successful login
    } catch (err) {
      setError(err.message)
    }
  }

  /**
   * Handle login with Google provider
   */
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      navigate("/dashboard") // Redirect to dashboard after successful login
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
      <Card className="p-6 shadow-2xl rounded-2xl border border-gray-200 bg-white/90 backdrop-blur">
        {/* Header */}
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Login to your account
          </CardTitle>
          <CardDescription className="text-gray-600">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        {error && (<Alert variant="destructive">
        <CheckCircle2Icon />
        <AlertTitle>{error}</AlertTitle>
      </Alert>)}

        {/* Content */}
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-6">
              {/* Email Field */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  {...register("email")}
                  placeholder="m@example.com"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  type="password"
                  {...register("password")}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}

                {/* Forgot Password Link */}
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={!isValid}>
                  Login
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleLogin}
                  className="w-full"
                  
                >
                  Login with Google
                </Button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-4 text-center text-sm">
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

export default LoginForm;