"use client";

import { useState } from "react";
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

export const SignUpComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-[24px] font-bold text-foreground tracking-[-1px] text-center">
          Create an account
        </h1>
        <p className="text-muted-foreground">
          Please fill in the form to create an account.
        </p>
      </div>

      <div className="max-w-112.5 w-full ">
        <form className="w-full  space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium text-base">
              Email
            </Label>
            <Input placeholder="m@example.com" name="email" />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-base font-medium">
              Password
            </Label>

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
            type="submit"
            size="lg"
            className="bg-accent-green w-full text-foreground cursor-pointer border border-black/20 text-base hover:bg-[#87c88d]"
          >
            Create an account
          </Button>
        </form>

        {/* Divider */}
        <div className="w-full max-w-md my-6 relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-zinc-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#F5F1E8] px-2 text-muted-foreground">
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
            <GoogleIcon className="w-4 h-4" />
            <span>Continue with google</span>
          </Button>
        </div>

        {/* Footer */}
        <p className="w-full max-w-md text-center mt-4 text-muted-foreground">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-foreground hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </>
  );
};
