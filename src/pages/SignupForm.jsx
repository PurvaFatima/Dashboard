// Import UI utilities and components
import { cn } from "@/lib/utils"
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

// Import form handling and validation
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema } from "../validationSchemas"

// Firebase authentication
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "@/firebase"

// Router
import { useNavigate, Link } from "react-router-dom"

/**
 * SignupForm Component
 * Handles new user registration with email/password or Google account.
 * Includes validation using React Hook Form + Zod.
 */
const SignupForm = ({ className, ...props }) => {
  const navigate = useNavigate()

  // React Hook Form setup with Zod schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  })

  /**
   * Handle signup with email/password
   */
  const onSubmit = async (data) => {
    console.log("Signup Data:", data)
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password)
      alert("Account created successfully!")
      navigate("/dashboard") // Redirect after signup
    } catch (err) {
      alert(err.message)
    }
  }

  /**
   * Handle Google Sign Up
   */
  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      alert("Google sign-up successful!")
      navigate("/dashboard") // Redirect after signup
    } catch (err) {
      alert(err.message)
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
            Create an account
          </CardTitle>
          <CardDescription className="text-gray-600">
            Fill in the details below to sign up
          </CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
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
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input type="password" {...register("password")} required />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="grid gap-3">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input type="password" {...register("confirmPassword")} required />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignup}
                className="w-full"
              >
                Sign Up with Google
              </Button>
            </div>

            {/* Login Link */}
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignupForm
