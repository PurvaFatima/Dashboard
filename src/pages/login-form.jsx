import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./validationSchemas";
import { z } from "zod";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { auth, googleProvider } from "@/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const LoginForm = ({
  className,
  ...props
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
    } catch (err) {
      setError(err.message);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google login successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
      <div className={cn("flex min-h-svh w-full items-center justify-center p-6 md:p-10", className)} {...props}>
      <Card className="p-6 shadow-2xl rounded-2xl border border-gray-200 bg-white/90 backdrop-blur">
        <CardHeader className="space-y-2 text-center">
          <CardTitle  className="text-2xl font-bold text-gray-900">Login to your account</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input {...register("email")} placeholder="Email@example.com" className="border p-2 rounded" required/>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  
                </div>
                <Input type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
                <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
              </div>
              <div className="flex flex-col gap-3">
             {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">Login</Button>
            <Button type="button" variant="outline" onClick={handleGoogleLogin} className="w-full">
              Login with Google
            </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don’t have an account?{" "}
              <a href="/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;