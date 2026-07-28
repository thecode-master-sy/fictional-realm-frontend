"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/google-icon";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { motion } from "motion/react";
import { useState } from "react";
import { loginUserAction } from "../actions";
import { showErrorToast } from "@/features/shared/ui/show-error";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const loginFormVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: {
    opacity: 0,
    y: -10,
  },
};

export const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setPending(true);
    e.preventDefault(); // Prevents automatic form reset
    const formData = new FormData(e.currentTarget);

    const response = await loginUserAction({
      email: formData.get("email")?.toString() ?? "",
      password: formData.get("password")?.toString() ?? "",
    });
    setPending(false);
    if (!response.success) {
      return showErrorToast({
        errorDetail: response.message,
      });
    }

    router.push("/");
  };

  return (
    <motion.div
      transition={{
        duration: 0.4,
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      variants={loginFormVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"

      className="w-full flex flex-col items-center justify-center space-y-8"
    >
      <div className="space-y-1">
        <h1 className="text-[24px] font-bold text-foreground tracking-[-1px] text-center">
          Login to your account
        </h1>
        <p className="text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="max-w-108 w-full space-y-4">
        <form onSubmit={handleSubmit} className="w-full  space-y-2">
          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email" className="font-medium text-base">
              Email
            </Label>
            <Input placeholder="m@example.com" name="email" />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-base font-medium">
                Password
              </Label>
              <Link
                href="/reset-password"
                className="text-sm transition underline text-muted-foreground hover:text-foreground"
              >
                Forgot your password?
              </Link>
            </div>
            <InputGroup>
              <InputGroupInput
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                name="password"
              />
              <InputGroupAddon align="inline-end">
                <button
                  type="button"

                  onClick={togglePasswordVisibility}
                  className="cursor-pointer text-muted-foreground hover:text-foreground focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeIcon className="w-4 h-4" />
                  ) : (
                    <EyeOffIcon className="w-4 h-4" />
                  )}
                </button>
              </InputGroupAddon>
            </InputGroup>
          </div>

          {/* Login Button */}
          <Button
            disabled={pending}
            type="submit"
            size="lg"
            className="bg-accent-green w-full text-foreground cursor-pointer border border-black/20 text-base hover:bg-[#87c88d]"
          >
            {pending ? <Spinner /> : "Login"}
          </Button>
        </form>

        {/* Divider */}
        <div className="w-full max-w-md relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-zinc-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Third Party Login */}
        <div className="w-full max-w-md">
          <Button
            size="lg"
            className="w-full border border-black/20 text-base  bg-white cursor-pointer text-foreground hover:bg-white/80"
          >
            {/* Google Icon Component */}
            <GoogleIcon className="w-4 h-4" />
            <span>Continue with google</span>
          </Button>
        </div>

        {/* Footer */}
        <p className="w-full max-w-md text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-foreground hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </motion.div>
  );
};
