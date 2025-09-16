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

const SignupForm = ({ className, ...props }) => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password)
      alert("Please sign in!")
      navigate("/login")
    } catch (err) {
      alert(err.message)
    }
  }

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      alert("Please sign in!")
      navigate("/login")
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
      {/* CHANGED: card now supports dark mode */}
      <Card className="p-6 shadow-2xl rounded-2xl border border-gray-200 bg-white/90 backdrop-blur 
        dark:bg-[#25314d]/90 dark:border-gray-700 dark:shadow-lg">
        
        {/* Header */}
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Create an account
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Fill in the details below to sign up
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
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
              <Label htmlFor="password" className="dark:text-gray-200">Password</Label>
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
            </div>

            {/* Confirm Password Field */}
            <div className="grid gap-3">
              <Label htmlFor="confirmPassword" className="dark:text-gray-200">Confirm Password</Label>
              <Input
                type="password"
                {...register("confirmPassword")}
                required
                className="dark:bg-[#1f2a44] dark:text-white dark:placeholder-gray-400 
                  dark:border-gray-600 focus:dark:border-blue-400"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <Button 
                type="submit" 
                className="w-full hover:shadow-md dark:hover:shadow-blue-900/50"
              >
                Sign Up
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignup}
                className="w-full 
                  dark:bg-blue-600 dark:hover:bg-blue-700 dark:border-none text-white
                  hover:shadow-md dark:hover:shadow-blue-900/50"
              >
                Sign Up with Google
              </Button>
            </div>

            {/* Login Link */}
            <div className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
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
